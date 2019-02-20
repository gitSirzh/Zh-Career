/**
 * Created by jszh on 2018/12/29.
 */
import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Slider, ActivityIndicator, Modal, Platform} from 'react-native'
import Video from 'react-native-video'
import Orientation from 'react-native-orientation'
import {commonStyle} from '../../../utils/commonStyle'
import Icon from 'react-native-vector-icons/Ionicons'
import {Actions} from 'react-native-router-flux'
import {formatTime} from '../../../utils/formatTime'
import deviceInfo from '../../../utils/deviceInfo'
import {MessageBarManager} from 'react-native-message-bar'
import {BlurView, VibrancyView} from "react-native-blur";
// import {StyleSheet} from '../../common'
const playerHeight = 250;
export default class MoviePlayer extends Component {

    constructor(props) {
        super(props);
        this.player = null;
        this.state = {
            rate: 1,
            slideValue: 0.00,
            currentTime: 0.00,
            duration: 0.00,
            paused: false,
            playIcon: 'ios-pause',
            isTouchedScreen: true,
            modalVisible: true,
            isLock: false
        }
    }

    componentWillMount() {
        const init = Orientation.getInitialOrientation();
        this.setState({
            init,
            orientation: init,
            specificOrientation: init,
        })
    }

    componentDidMount() {
        Orientation.addOrientationListener(this._updateOrientation);
        Orientation.addSpecificOrientationListener(this._updateSpecificOrientation);
        this.isSetTimeout();
    }

    componentWillUnmount() {
        Orientation.removeOrientationListener(this._updateOrientation);
        Orientation.removeSpecificOrientationListener(this._updateSpecificOrientation);
    }

    _updateOrientation = orientation => this.setState({orientation});
    _updateSpecificOrientation = specificOrientation => this.setState({specificOrientation});

    loadStart(data) {
        console.log('loadStart', data);
    }

    setDuration(duration) {
        this.setState({duration: duration.duration});
    }

    setTime(data) {
        let sliderValue = parseInt(this.state.currentTime);
        this.setState({
            slideValue: sliderValue,
            currentTime: data.currentTime,
            modalVisible: false
        })
    }

    onEnd(data) {
        this.player.seek(0)
    }

    videoError(error) {
        this.showMessageBar('播放器报错啦！')(error.error.domain)('error');
        this.setState({
            modalVisible: false
        })
    }

    onBuffer(data) {
        console.log('onBuffer', data)
    }

    onTimedMetadata(data) {
        console.log('onTimedMetadata', data)
    }

    showMessageBar = title => msg => type => {
        MessageBarManager.showAlert({
            title: title,
            message: msg,
            alertType: type,
        })
    };

    play() {
        this.setState({
            paused: !this.state.paused,
            playIcon: this.state.paused ? 'ios-pause' : 'ios-play'
        })
    }

    renderModal() {
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => alert("Modal has been closed.")}
            >
                <View style={styles.indicator}>
                    <ActivityIndicator
                        animating={true}
                        style={[{height: 80}]}
                        color={commonStyle.red}
                        size="large"
                    />
                </View>
            </Modal>
        )
    }

    isTouchedScreen(){
        clearTimeout(this.isSetTimeout());
        if(this.state.isTouchedScreen){
            this.isSetTimeout();
        }else {
            this.setState({isTouchedScreen: true});
        }
    }

    isSetTimeout(){
        setTimeout(()=>{
            if (this.state.isTouchedScreen){
                this.setState({isTouchedScreen: false});
            }
        },3000)
    }

    render() {
        const {orientation, isLock} = this.state;
        const {url, title} = this.props;
        return (
            <View>
                {/*导航头*/}
                <View style={styles.bgContainer}>
                    {
                        Platform.OS === 'ios' ?
                            <VibrancyView
                                blurType={'light'}
                                blurAmount={10}
                                style={styles.container}
                            /> :
                            <BlurView
                                style={styles.absolute}
                                viewRef={this.state.viewRef}
                                blurType="light"
                                blurAmount={10}
                            />
                    }
                </View>
                {/*播放内容*/}
                <TouchableOpacity
                    activeOpacity={1}
                    style={[styles.movieContainer, { //横屏适配
                        height: orientation === 'PORTRAIT' ? playerHeight : deviceInfo.deviceWidth,
                        marginTop: orientation === 'PORTRAIT' ? Platform.OS === 'ios' ? (deviceInfo.isIphoneX ? 40 : 20) : 0 : 0
                    }]}
                    onPress={() => {this.isTouchedScreen()}}>
                    <Video source={{uri: url}}
                           ref={ref => this.player = ref}
                           rate={this.state.rate}
                           volume={1.0}
                           muted={false}
                           paused={this.state.paused}
                           resizeMode="cover"
                           repeat={true}
                           playInBackground={false}
                           playWhenInactive={false}
                           ignoreSilentSwitch={"ignore"}
                           progressUpdateInterval={250.0}
                           onLoadStart={(data) => this.loadStart(data)}
                           onLoad={data => this.setDuration(data)}
                           onProgress={(data) => this.setTime(data)}
                           onEnd={(data) => this.onEnd(data)}
                           onError={(data) => this.videoError(data)}
                           onBuffer={(data) => this.onBuffer(data)}
                           onTimedMetadata={(data) => this.onTimedMetadata(data)}
                           style={[styles.videoPlayer]}
                    />
                    {
                        !isLock ?
                            <View style={styles.navContentStyle}>
                                <View style={{flexDirection: 'row', alignItems: commonStyle.center, flex: 1}}>
                                    <TouchableOpacity
                                        style={{
                                            height: 26,
                                            backgroundColor: commonStyle.clear,
                                            flexDirection: 'row',
                                            alignItems: commonStyle.center
                                        }}
                                        onPress={orientation === 'PORTRAIT' ? () => Actions.pop() : Orientation.lockToPortrait}>
                                        <Icon name={'ios-arrow-back'} size={26} color={commonStyle.white}/>
                                    </TouchableOpacity>
                                    {/*<View style={{borderWidth:1,borderColor:'#fff'}}>*/}
                                    <Text style={{
                                        backgroundColor: commonStyle.clear,
                                        color: commonStyle.white,
                                        marginLeft: 10
                                    }}>{title}</Text>
                                    {/*</View>*/}
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: commonStyle.center,
                                    justifyContent: commonStyle.between
                                }}>
                                    <TouchableOpacity
                                        style={styles.navToolBar}
                                        onPress={() => alert('投影到电视！')}>
                                        <Icon name={'ios-desktop'} size={20} color={commonStyle.white}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.navToolBar}
                                        onPress={() => alert('开启VR！')}>
                                        <Icon name={'md-color-fill'} size={20} color={commonStyle.white}/>
                                    </TouchableOpacity>
                                    {
                                        orientation !== 'PORTRAIT' ?
                                            <View style={{
                                                flexDirection: commonStyle.row,
                                                alignItems: commonStyle.center
                                            }}>
                                                <TouchableOpacity
                                                    style={[styles.navToolBar, {
                                                        borderColor: commonStyle.white,
                                                        borderWidth: 0.5,
                                                        padding: 3
                                                    }]}
                                                    onPress={() => alert('开启弹幕！')}>
                                                    <Text style={{color: commonStyle.white, fontSize: 11}}>弹</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.navToolBar}
                                                    onPress={() => alert('设置画面！')}>
                                                    <Icon name={'ios-construct-outline'} size={20}
                                                          color={commonStyle.white}/>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.navToolBar}
                                                    onPress={() => alert('下载！')}>
                                                    <Icon name={'ios-cloud-download-outline'} size={20}
                                                          color={commonStyle.white}/>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.navToolBar}
                                                    onPress={() => alert('分享！')}>
                                                    <Icon name={'ios-share-alt'} size={20} color={commonStyle.white}/>
                                                </TouchableOpacity>

                                            </View> : null
                                    }
                                </View>
                            </View> :
                            <View style={{height: commonStyle.navContentHeight, backgroundColor: commonStyle.black}}/>
                    }
                    {
                        orientation !== 'PORTRAIT' ?
                            <TouchableOpacity
                                style={{
                                    marginHorizontal: 10,
                                    backgroundColor: commonStyle.clear,
                                    width: 30,
                                    height: 30,
                                    alignItems: commonStyle.center,
                                    justifyContent: commonStyle.center
                                }}
                                onPress={() => this.setState({isLock: !this.state.isLock})}
                            >
                                <Icon name={`${this.state.isLock ? 'md-lock' : 'ios-unlock'}`} size={20}
                                      color={commonStyle.white} style={{backgroundColor: commonStyle.clear}}/>
                            </TouchableOpacity> : null
                    }
                    {
                        this.state.isTouchedScreen && !isLock ?
                            <View
                                style={[styles.toolBarStyle, {marginBottom: Platform.OS === 'ios' ? 0 : orientation !== 'PORTRAIT' ? 25 : 0}]}>
                                <TouchableOpacity onPress={() => this.play()}>
                                    <Icon name={`${this.state.playIcon}`} size={18} color={commonStyle.white}/>
                                </TouchableOpacity>
                                <View style={styles.progressStyle}>
                                    <Text
                                        style={styles.timeStyle}>{formatTime.formatMediaTime(Math.floor(this.state.currentTime))}</Text>
                                    <Slider
                                        style={styles.slider}
                                        value={this.state.slideValue}
                                        maximumValue={this.state.duration}
                                        minimumTrackTintColor={commonStyle.themeColor}
                                        maximumTrackTintColor={commonStyle.iconGray}
                                        step={1}
                                        onValueChange={value => this.setState({currentTime: value})}
                                        onSlidingComplete={value => this.player.seek(value)}
                                    />
                                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', width: 35}}>
                                        <Text style={{
                                            color: commonStyle.white,
                                            fontSize: 12
                                        }}>{formatTime.formatMediaTime(Math.floor(this.state.duration))}</Text>
                                    </View>
                                </View>
                                {
                                    orientation === 'PORTRAIT' ?
                                        <TouchableOpacity onPress={Orientation.lockToLandscapeLeft}>
                                            <Icon name={'ios-expand'} size={18} color={commonStyle.white}/>
                                        </TouchableOpacity> :
                                        <TouchableOpacity onPress={Orientation.lockToPortrait}>
                                            <Icon name={'ios-contract'} size={18} color={commonStyle.white}/>
                                        </TouchableOpacity>
                                }
                            </View> : <View style={{height: 40}}/>
                    }
                    {this.renderModal()}
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bgContainer: {
        // position: 'absolute',
        // height: 20,
        // backgroundColor:'#000',
        // width: deviceInfo.deviceWidth
    },
    movieContainer: {
        justifyContent: 'space-between'
    },
    videoPlayer: {
        position: 'absolute',
        top: 44,
        left: 0,
        bottom: 0,
        right: 0,
    },
    navContentStyle: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: commonStyle.black
    },
    toolBarStyle: {
        backgroundColor: commonStyle.blackTranslucent,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-around',
        marginTop: 10,
        height: 30
    },
    timeStyle: {
        width: 35,
        color: commonStyle.white,
        fontSize: 12
    },
    slider: {
        flex: 1,
        marginHorizontal: 5,
        height: 20
    },
    progressStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginHorizontal: 10
    },
    indicator: {
        height: playerHeight,
        width: deviceInfo.deviceWidth,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navToolBar: {
        backgroundColor: commonStyle.clear,
        marginHorizontal: 5
    }
});
