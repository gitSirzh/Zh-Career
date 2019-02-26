
/**
 * Created by jszh on 2019/2/21
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Animated,
    Image,
    ImageBackground,
    ScrollView,
    Easing,
    Alert
} from 'react-native';

import {MessageBarManager} from 'react-native-message-bar'
import {Toast} from '../../../utils/toast/index'
import Modal from 'react-native-modal'
import Slider from 'react-native-slider'
import Icon from 'react-native-vector-icons/Ionicons'
import {Normal, Tip} from "../../../utils/a_player_util/TextComponent"
import {commonStyle} from '../../../utils/commonStyle'
import deviceInfo from '../../../utils/deviceInfo'
import Video from 'react-native-video'
import Navbar from './component/navbar'
import {Actions} from "react-native-router-flux"
import {formatTime} from "../../../utils/formatTime"
import Line from './component/line'

//musicData
import mockList from '../../../assets/data/musicList1'

class musicPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollOffset:0,
            show:false,                         //列表是否显示
            duration: 0.00,                     //总时间
            slideValue: 0.00,                   //进度条
            currentTime: 0.00,                  //进行时间
            currentIndex: this.props.music_id,  //子ID-选中ID
            playMode: 0,                        //播放方式
            imgRotate: new Animated.Value(0),   //开始 初始化0
            showLyic: false,                    //初次显示旋转图片
            times: 0,                           //模拟时间进度
            playing: true,                      //播放
            loadings: true,                     //*已废弃*
            paused: false,                      // false: 播放，true: 暂停
            playModeIcon: 'ios-repeat-outline', //初始播放方式图标
        };
        //旋转动画
        this.isGoing = true;                    //为真旋转
        this.myAnimate = Animated.timing(this.state.imgRotate, {
            toValue: 1,
            duration: 12000,                    //转速
            easing: Easing.linear,              //Easing.inOut(Easing.linear) 线性函数，和Easing.linear 一样并且这个效果更好点
        });
        this.player = '';                       //初始player
    }

    componentWillMount() {

    }

    //播放方式
    playMode(playMode) {
        playMode ++;
        playMode = playMode === 3 ? playMode = 0 : playMode;
        switch (playMode) {
            case 0:
                Toast.show('列表循环');
                this.setState({playMode, playModeIcon: 'ios-repeat'});          //列表循环
                break;
            case 1:
                Toast.show('单曲循环');
                this.setState({playMode, playModeIcon: 'ios-radio'});           //单曲循环
                break;
            case 2:
                Toast.show('随机播放');
                this.setState({playMode, playModeIcon: 'ios-infinite'});        //随机播放
                break;
            default:
                break;
        }
    }

    //进行时间
    setDuration(duration) {
        this.setState({duration: duration.duration})
    }

    //时间
    setTime(data) {
        let sliderValue = parseInt(this.state.currentTime);
        this.setState({
            slideValue: sliderValue,
            currentTime: data.currentTime
        })
    }

    //下一首
    nextSong(currentIndex) {
        if (currentIndex <= mockList.list.length - 1){
            this.reset();
            this.setState({currentIndex : currentIndex});  //this.setState({currentIndex: currentIndex >= mockList.list.length - 1 ? 0 : currentIndex})
        } else {
            // this.showMessageBar('消息')('已帮你切换到第一首')('fuccess');
            Toast.show('已帮你切换到第一首')
            this.setState({currentIndex:0});
        }
    }

    //上一首
    preSong(currentIndex) {
        if (currentIndex >= 0 ){
            this.reset();
            this.setState({currentIndex : currentIndex});  //this.setState({currentIndex: currentIndex <= 0 ? mockList.list.length - 1 : currentIndex})
        }else {
            // this.showMessageBar('消息')('已经到第一首了呦')('fuccess');
            Toast.show('已经到第一首了呦');
        }
    }

    //播放完，切换下一首
    onEnd(data) {
        // this.showMessageBar('消息')('已帮你切换到下一首')('fuccess');
        Toast.show('已帮你切换到下一首');
        if (this.state.playMode === 0) {
            this.nextSong(this.state.currentIndex + 1)
        } else if (this.state.playMode === 1) {
            this.player.seek(0)
        } else {
            this.nextSong(Math.floor(Math.random() * mockList.list.length))
        }
    }

    //报错
    videoError(error) {
        this.showMessageBar('播放器报错啦！')(error)('error')
    }

    //提示信息(顶部弹窗)
    showMessageBar = (title) => (msg) => (type) => {
        MessageBarManager.showAlert({
            title: title,
            message: msg,
            alertType: type,
        })
    };

    //切歌重置时间
    reset() {
        this.setState({
            currentTime: 0.00,
            slideValue: 0.00
        })
    }

    //动画-执行
    imgMoving = () => {
        if (this.isGoing) {
            this.state.imgRotate.setValue(0);
            this.myAnimate.start(() => {
                this.imgMoving()
            });
        }
    };

    //播放 / 暂停
    playing() {
        this.setState({playing: !this.state.playing, loadings: !this.state.loadings,paused: !this.state.paused});//  ,paused: !this.state.paused    音乐播放 paused
        //在显示歌词状态时 暂停动画 showLyic=true 是显示歌词
        if (!this.state.showLyic) {
            this.animated();
        }
    };

    //旋转图片 / 歌词  & 胶片显示/隐藏
    showLyric() {
        this.setState({showLyic: !this.state.showLyic});
        //切换歌词之前通过播放按钮确认是否在播放，若为播放则 暂停动画
        if (this.state.playing) {
            this.animated();
        }
    };

    //旋转 / 暂停旋转
    animated() {
        this.isGoing = !this.isGoing;
        if (this.isGoing) {
            this.myAnimate.start(() => {
                this.myAnimate = Animated.timing(this.state.imgRotate, {
                    toValue: 1,
                    duration: 12000,
                    easing: Easing.linear,
                });
                this.imgMoving()
            })
        } else {
            this.state.imgRotate.stopAnimation((oneTimeRotate) => {
                //根据时间计算角度比例
                this.myAnimate = Animated.timing(this.state.imgRotate, {
                    toValue: 1,
                    duration: (1 - oneTimeRotate) * 12000,
                    easing: Easing.linear,
                });
            });
        }
    }

    //退出事件
    isPop(){
        Alert.alert(
            '恒果提示',
            '不看下右下角的列表吗?\n退出去音乐也停止播放了呦!',
            [
                {text: '再听听', onPress: () => '再听听', style: 'cancel'},
                {text: '退出', onPress: () => {Actions.pop()}},
            ],
            { cancelable: false }
        )
    }

    render() {
        /**
         * 为了播放页面的流畅，从父组件拿出几个必要的参数
         * 1.背景图片/胶片 共用一个
         * 2.歌曲名称 为title
         * 3.歌手名字
         **/

        //动画范围 * 360度旋转一周
        let interpolatedAnimation = this.state.imgRotate.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });

        //开始暂停
        let st = this.state.playing ? 'ios-pause-outline' : 'ios-play-outline';

        let musicInfo = mockList.list[this.state.currentIndex] || {};

        return (
            <ImageBackground
                blurRadius={66}
                source={{uri: musicInfo.cover}}
                style={{flex:1, alignItems: 'center'}}
            >
                {/*导航条*/}
                <Navbar backCallback={()=>{this.isPop()}} centerColor={commonStyle.transparent} textColor={commonStyle.white} title={musicInfo.xsong_name}/>
                {/*分割线 line*/}
                <Line/>
                {/*中部 - 旋转*/}
                <View style={{flex: 1, justifyContent: commonStyle.center, alignItems: commonStyle.center}}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            this.showLyric()
                        }}
                        style={styles.cdContainer}
                    >
                        {this.state.showLyic ?
                            (//歌词
                                <View style={styles.cdContainer}>
                                    <ScrollView
                                        style={{width: deviceInfo.deviceWidth}}
                                        contentContainerStyle={{alignItems: commonStyle.center}}  //alignItems: 'center',paddingTop: '30%', paddingBottom: '30%'
                                        ref={lyricScroll => this.lyricScroll = lyricScroll}
                                    >
                                        <Text style={{marginTop: 260, fontSize: 12, color: commonStyle.white}}>这里是歌词，正在实现此功能</Text>
                                        {/*{lyricArr.map((v, i) => (*/}
                                            {/*<Normal color={v === currentLrc ?commonStyle.main?commonStyle.main:'#0882ff':'#fff'} key={i} style={{paddingTop: 5, paddingBottom: 5}}>{v.replace(/\[.*\]/g, '')}</Normal>*/}
                                        {/*))}*/}
                                    </ScrollView>
                                </View>)
                            ://胶片
                            (<View style={styles.cdContainer}>
                                <View style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 34,
                                    width: deviceInfo.deviceWidth,
                                    alignItems: 'center',
                                    zIndex: 1
                                }}>
                                    <Image source={require('../../../assets/images/music_needle-ip6.png')}
                                           style={{width: 100, height: 140}}/>
                                </View>
                                <ImageBackground source={require('../../../assets/images/music_disc-ip6.png')} style={{
                                    width: deviceInfo.deviceWidth - 40,
                                    height: deviceInfo.deviceWidth - 40,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Animated.Image
                                        //source={{uri: detail.al && detail.al.picUrl + '?param=200y200'}}
                                        source={{uri: musicInfo.cover}}
                                        style={[{
                                            width: deviceInfo.deviceWidth - 152,
                                            height: deviceInfo.deviceWidth - 152,
                                            borderRadius: (deviceInfo.deviceWidth - 152) / 2
                                        },
                                            {
                                                transform: [
                                                    {rotate: interpolatedAnimation},
                                                ]
                                            }
                                        ]}
                                    />
                                </ImageBackground>
                            </View>)
                        }
                    </TouchableOpacity>
                    <View style={{height: 30}}/>
                    {/*进度条*/}
                    <View style={styles.sliderBtn}>
                        <Tip style={{width: 35}} color={commonStyle.white}>{formatTime.formatMediaTime(Math.floor(this.state.currentTime))}</Tip>
                        <Slider
                            maximumTrackTintColor={commonStyle.white}
                            minimumTrackTintColor={commonStyle.main}
                            thumbStyle={{width: 20, height: 20, backgroundColor: commonStyle.main, borderColor: commonStyle.white, borderWidth: 7, borderRadius: 10}}
                            trackStyle={{height: 2}}
                            style={{width: deviceInfo.deviceWidth - 100}}
                            value={this.state.slideValue}
                            maximumValue={this.state.duration}
                            onValueChange={value => this.setState({currentTime: value})}
                            onSlidingComplete={value => this.player.seek(value)}
                        />
                        <Tip style={{marginLeft: 10, width: 35}} color={commonStyle.white}>{formatTime.formatMediaTime(Math.floor(this.state.duration))}</Tip>
                    </View>
                    {/*底部条*/}
                    {/*底部按钮*/}
                    <View style={styles.footerBtn}>
                        {/*播放方式*/}
                        <TouchableOpacity
                            onPress={() =>{this.playMode(this.state.playMode)}}
                            style={styles.playBtn}
                        >
                            <Icon name={this.state.playModeIcon} size={30} color={commonStyle.white}/>
                        </TouchableOpacity>
                        {/*上一首*/}
                        <TouchableOpacity
                            onPress={() =>{
                                //切换上一首并播放
                                this.preSong(this.state.currentIndex - 1);
                                //延迟播放
                                setTimeout(()=>{
                                    if(this.state.paused){
                                        this.playing();
                                    }
                                },300);
                            }}
                            style={styles.playBtn}
                        >
                            <Icon name="ios-skip-backward-outline" size={30} color={commonStyle.white}/>
                        </TouchableOpacity>
                        {/*模拟 播放和暂停*/}
                        <TouchableOpacity
                            onPress={() => this.playing()}
                            style={styles.playBtn}
                        >
                            <Icon name={st} size={30} color={commonStyle.white}/>
                        </TouchableOpacity>
                        {/*下一首*/}
                        <TouchableOpacity
                            onPress={() =>{
                                //切换下一首并播放
                                this.nextSong(this.state.currentIndex + 1);
                                //延迟播放
                                setTimeout(()=>{
                                    if(this.state.paused){
                                        this.playing();
                                    }
                                },300);
                            }}
                            style={styles.playBtn}
                        >
                            <Icon name="ios-skip-forward-outline" size={30} color={commonStyle.white}/>
                        </TouchableOpacity>
                        {/*播放列表*/}
                        <TouchableOpacity
                            onPress={() =>{this.showModal()}}
                            style={styles.playBtn}
                        >
                            <Icon name="ios-list-outline" size={30} color={commonStyle.white}/>
                        </TouchableOpacity>
                    </View>
                    {/*播放器组件*/}
                    <Video
                        ref={video => this.player = video}
                        source={{uri: musicInfo.url}}
                        volume={1.0}
                        paused={this.state.paused}
                        onLoadStart={this.loadStart}
                        onLoad={data => this.setDuration(data)}
                        onProgress={(data) => this.setTime(data)}
                        onEnd={(data) => this.onEnd(data)}
                        onError={(data) => this.videoError(data)}
                        onBuffer={this.onBuffer}
                        onTimedMetadata={this.onTimedMetadata}
                        ignoreSilentSwitch={'ignore'} //控制iOS静默开关行为: inherit - （默认） - 使用默认的AVPlayer行为;  ignore - 即使设置了静音开关也播放音频;obey - 如果设置了静音开关，则不播放音频
                        playInBackground={true}
                    />
                </View>
                {/*列表弹窗*/}
                <Modal
                    isVisible={this.state.show}
                    style={styles.modal}
                    backdropOpacity={0.2}
                    // onSwipe={() => this.setState({ show: false })}
                    // swipeDirection={'down'}
                    // scrollTo={this.handleScrollTo}
                    // scrollOffset={this.state.scrollOffset}
                    // scrollOffsetMax={40*mockList.list.length-400} // content height - ScrollView height
                >
                    <View style={styles.modalView}>
                        <View style={styles.modalTitleView}>
                            {/*<Icon style={{marginTop: 3}} name="ios-arrow-dropdown" size={22} color={commonStyle.white}/>*/}
                            {/*<Text style={{color: commonStyle.white,fontSize: 14}}> 向下滑动关闭</Text>*/}
                            <Text style={{color: commonStyle.lightGray,fontSize: 15}}>所有歌曲都在这里哟</Text>
                        </View>
                        <ScrollView
                            ref={ref => (this.scrollViewRef = ref)}
                            onScroll={this.handleOnScroll}
                            scrollEventThrottle={0}
                            style={{width:deviceInfo.deviceWidth}}
                        >
                            {mockList.list.map((data,index)=>{
                                return(
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.scrollableModalContent}
                                        onPress={() =>{
                                            this.setState({currentIndex:index,show: false});
                                            //延迟播放
                                            setTimeout(()=>{
                                                if(this.state.paused){
                                                    this.playing();
                                                }
                                            },300);
                                        }}
                                    >
                                        <View><Text style={[styles.musicName,{color: this.state.currentIndex === index?commonStyle.cyan:commonStyle.lightGray}]}>{data.xsong_name}</Text></View>
                                        <View><Text style={[styles.musicName,{color: this.state.currentIndex === index?commonStyle.cyan:commonStyle.lightGray}]}> - {data.xsinger_name}</Text></View>
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={styles.closeBtn}
                            onPress={() =>{this.setState({show: false })}}
                        >
                            <Text style={styles.closeText}>关闭</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </ImageBackground>
        );
    }
    //ScrollView回调
    handleScrollTo = p => {
        if (this.scrollViewRef) {
            this.scrollViewRef.scrollTo(p);
        }
    };
    handleOnScroll = event => {
        this.setState({
            scrollOffset: event.nativeEvent.contentOffset.y,
        });
    };

    //显示/隐藏 播放列表
    showModal(){
        this.setState({show:!this.state.show})
    }

    componentDidMount() {
        //初始加载
        this.imgMoving();
    }

    componentWillUnmount() {

    }
}

const styles = StyleSheet.create({
    cdContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sliderBtn: {
        height: 40,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    thumb: {
        width: 20,
        height: 20,
        backgroundColor: commonStyle.main ? commonStyle.main : '#0882ff',
        borderColor: commonStyle.white,
        borderWidth: 7,
        borderRadius: 10,
    },
    footerBtn: {
        height: 50,
        width: deviceInfo.deviceWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    playBtn: {
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        justifyContent:commonStyle.end,
        margin: 0
    },
    modalView: {
        width:deviceInfo.deviceWidth,
        height:400,
        backgroundColor: 'rgba(0,0,0,0.9)',
        alignItems:commonStyle.center,
        borderTopLeftRadius:6,
        borderTopRightRadius:6
    },
    modalTitleView: {
        height:35,
        width:deviceInfo.deviceWidth,
        justifyContent:commonStyle.center,
        alignItems:commonStyle.center,
        flexDirection:commonStyle.row,
        borderBottomWidth:0.5,
        borderColor:commonStyle.drakGray
    },
    scrollableModalContent: {
        width:deviceInfo.deviceWidth,
        height: 35,
        alignItems: commonStyle.center,
        flexDirection:commonStyle.row,
        marginLeft: 10
    },
    closeBtn: {
        width:deviceInfo.deviceWidth,
        height: 45,
        alignItems: commonStyle.center,
        justifyContent:commonStyle.center,
        borderTopWidth: 0.5,
        borderColor:commonStyle.drakGray
    },
    closeText: {
        fontSize:16,
        color:commonStyle.lightGray
    },
    musicName:{
        fontSize:14
    }
});

export default  musicPlayer
