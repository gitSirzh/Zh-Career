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
} from 'react-native';

import {MessageBarManager} from 'react-native-message-bar'
import Slider from 'react-native-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import {Normal, Tip} from "../../../utils/a_player_util/TextComponent";
import {commonStyle} from '../../../utils/commonStyle';
import deviceInfo from '../../../utils/deviceInfo';
import Video from 'react-native-video';
import Navbar from './component/navbar';
import {Actions} from "react-native-router-flux";
import {formatTime} from "../../../utils/formatTime";

//音乐数据
import mockList from '../../../assets/data/musicList1';

class musicPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            duration: 0.00,                     //进行时间
            slideValue: 0.00,
            currentTime: 0.00,
            currentIndex: 0,
            imgRotate: new Animated.Value(0),   //开始 初始化0
            showLyic: false,                    //初次显示旋转图片
            times: 0,                           //模拟时间进度
            playing: true,                      //播放
            loadings: true,                     //
            paused: false,                       // false: 播放，true: 暂停

        };
        this.isGoing = true; //为真旋转
        this.myAnimate = Animated.timing(this.state.imgRotate, {
            toValue: 1,
            duration: 12000, //转速
            easing: Easing.linear, //Easing.inOut(Easing.linear) 线性函数，和Easing.linear 一样并且这个效果更好点
        });
        this.player = '';
    }

    componentWillMount() {
        //TODO
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
        this.reset();
        this.setState({currentIndex: currentIndex >= mockList.list.length ? 0 : currentIndex})
    }

    //上一首
    preSong(currentIndex) {
        this.reset();
        this.setState({currentIndex: currentIndex < 0 ? mockList.list.length - 1 : currentIndex})
    }

    //播放完，切换下一首
    onEnd(data) {
        this.showMessageBar('亲！')('已帮你切换到下一首')('fuccess');
        if (this.state.playMode === 0) {
            this.nextSong(this.state.currentIndex + 1)
        } else if (this.state.playMode === 1) {
            this.player.seek(0)
        } else {
            this.nextSong(Math.floor(Math.random() * this.props.musicList.length))
        }
    }

    //报错
    videoError(error) {
        this.showMessageBar('播放器报错啦！')(error)('error')
    }

    //提示信息
    showMessageBar = (title) => (msg) => (type) => {
        MessageBarManager.showAlert({
            title: title,
            message: msg,
            alertType: type,
        })
    };

    //切歌重置时间
    reset() {
        this.props.resetMusicInfo();
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
        // this.musicPlayer.seek(0);
        this.setState({playing: !this.state.playing, loadings: !this.state.loadings,paused: !this.state.paused});//  ,paused: !this.state.paused    音乐播放 paused
        //在显示歌词状态时 暂停动画 showLyic=true 是显示歌词
        if (!this.state.showLyic) {
            this.animated();
        }
    };

    //旋转图片 / 歌词
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
                //计算角度比例
                this.myAnimate = Animated.timing(this.state.imgRotate, {
                    toValue: 1,
                    duration: (1 - oneTimeRotate) * 12000,
                    easing: Easing.linear,
                });
            });
        }
    }

    render() {
        /**
         * 为了播放页面的流畅，从父组件拿出几个必要的参数
         * 1.背景图片/胶片 共用一个
         * 2.歌曲名称 为title
         * 3.歌手名字
         **/
        let datas = this.props;
        // let mu_title = this.props.mu_title;
        // let mu_gName = this.props.mu_gName;

        //动画范围 * 360度旋转一周
        let interpolatedAnimation = this.state.imgRotate.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });

        //开始暂停
        let st = this.state.playing ? 'ios-pause-outline' : 'ios-play-outline';

        // let musicInfo = mockList.list[this.state.currentIndex] || {}

        return (
            <ImageBackground
                blurRadius={8}
                source={{uri: datas.cover}}
                style={{width: deviceInfo.deviceWidth, height: deviceInfo.deviceHeight, alignItems: 'center'}}
            >
                {/*导航条*/}
                <Navbar backCallback={()=>{Actions.pop()}} centerColor={'rgba(0,0,0,0)'} textColor={'#fff'} title={datas.xsong_name}/>
                {/*分割线*/}
                <View style={{
                    width: deviceInfo.deviceWidth - 100,
                    height: 0.34811,
                    backgroundColor: 'rgba(220,220,220,0.5)',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <View style={{
                        width: deviceInfo.deviceWidth - 110,
                        height: 0.34812,
                        backgroundColor: 'rgba(220,220,220,0.5)',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            width: deviceInfo.deviceWidth - 140,
                            height: 0.34813,
                            backgroundColor: 'rgba(220,220,220,0.7)',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <View style={{
                                width: deviceInfo.deviceWidth - 200,
                                height: 0.7,
                                backgroundColor: 'rgba(220,220,220,0.8)'
                            }}/>
                        </View>
                    </View>
                </View>
                {/*中部 - 旋转*/}
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            this.showLyric()
                        }}
                        style={styles.cdContainer}
                    >
                        {this.state.showLyic ? (
                                //歌词
                                <View style={styles.cdContainer}>
                                    <ScrollView
                                        style={{width: deviceInfo.deviceWidth}}
                                        contentContainerStyle={{alignItems: 'center',}}  //alignItems: 'center',paddingTop: '30%', paddingBottom: '30%'
                                        ref={lyricScroll => this.lyricScroll = lyricScroll}
                                    >
                                        <Text style={{
                                            marginTop: 260,
                                            fontSize: 12,
                                            color: '#fff'
                                        }}>这里是歌词，正在实现此功能呦</Text>
                                        {/*{*/}
                                        {/*lyricArr.map((v, i) => (*/}
                                        {/*<Normal color={v === currentLrc ?commonStyle.main?commonStyle.main:'#0882ff':'#fff'} key={i} style={{paddingTop: 5, paddingBottom: 5}}>{v.replace(/\[.*\]/g, '')}</Normal>*/}
                                        {/*))*/}
                                        {/*}*/}
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
                                        source={{uri: datas.cover}}
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
                    {/*底部条*/}
                    {/*伪进度条静态  --  有歌曲的时候在回填数据*/}
                    <View style={styles.sliderBtn}>
                        <Tip style={{width: 35}} color={'#fff'}>{formatTime.formatMediaTime(Math.floor(this.state.currentTime))}</Tip>
                        <Slider
                            maximumTrackTintColor={commonStyle.white}
                            minimumTrackTintColor={commonStyle.main ? commonStyle.main : '#0882ff'}
                            thumbStyle={{
                                width: 20, height: 20,
                                backgroundColor: commonStyle.main ? commonStyle.main : '#0882ff',
                                borderColor: commonStyle.white, borderWidth: 7, borderRadius: 10,
                            }}
                            trackStyle={{height: 2}}
                            style={{width: deviceInfo.deviceWidth - 100}}
                            value={this.state.slideValue}
                            maximumValue={this.state.duration}
                            onValueChange={value => this.setState({currentTime: value})}
                            onSlidingComplete={value => this.player.seek(value)}
                        />
                        <Tip style={{marginLeft: 10, width: 35}} color="#fff">{formatTime.formatMediaTime(Math.floor(this.state.duration))}</Tip>
                    </View>
                    {/*底部按钮 //TODO */}
                    <View style={styles.footerBtn}>
                        {/*<TouchableOpacity*/}
                        {/*onPress={() =>{send('showBlackAlert', {show: true, title: "后续实现"});}}*/}
                        {/*>*/}
                        {/*<Icon name="ios-repeat-outline" size={30} color={commonStyle.white} />*/}
                        {/*</TouchableOpacity>*/}
                        <Icon name="ios-repeat-outline" size={30} color={commonStyle.white}/>
                        <Icon name="ios-skip-backward-outline" size={30} color={commonStyle.white}/>
                        {/*模拟 播放和暂停*/}
                        <TouchableOpacity onPress={() => this.playing()} style={styles.playBtn}>
                            <Icon name={st} size={30} color={commonStyle.white}/>
                        </TouchableOpacity>
                        <Icon name="ios-skip-forward-outline" size={30} color={commonStyle.white}/>
                        <Icon name="ios-list-outline" size={30} color={commonStyle.white}/>
                    </View>
                    {/*播放组件*/}
                    <Video
                        ref={video => this.player = video}
                        source={{uri: datas.url}}
                        volume={1.0}
                        paused={this.state.paused}
                        playInBackground={true}
                        onLoadStart={this.loadStart}
                        onLoad={data => this.setDuration(data)}
                        onProgress={(data) => this.setTime(data)}
                        onEnd={(data) => this.onEnd(data)}
                        onError={(data) => this.videoError(data)}
                        onBuffer={this.onBuffer}
                        onTimedMetadata={this.onTimedMetadata}
                    />
                </View>
            </ImageBackground>
        );
    }

    setDuration(duration) {
        this.setState({duration: duration.duration})
    }

    //进度条
    sliderChange(value) {
        // const { currentPlay, dispatch } = this.props;
        // dispatch(setPlaySong({sliderProgress: value, ff: currentPlay.duration * value}));
        // alert(value);
        // setInterval(()=>{
        //     this.setState({times:value+0.01})
        // },1000)
    };

    componentDidMount() {
        //初始加载
        this.requestWeather(null);
        this.imgMoving();
    }

    requestWeather() {

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
    //进度条上的点
    thumb: {
        width: 20,
        height: 20,
        backgroundColor: commonStyle.main ? commonStyle.main : '#0882ff',
        borderColor: commonStyle.white,
        borderWidth: 7,
        borderRadius: 10,
    },
    //底部按钮
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
    }
});

export default  musicPlayer
