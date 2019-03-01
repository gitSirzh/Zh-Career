/**
 * Created by jszh on 2018/12/29.
 */
import React, {Component} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Platform, findNodeHandle} from 'react-native'
import {commonStyle} from '../../../utils/commonStyle'
import {VibrancyView, BlurView} from 'react-native-blur'
import deviceInfo from '../../../utils/deviceInfo'
import Icon from 'react-native-vector-icons/Ionicons'
import MiniComment from './comment/miniCommentCell'
import PlusComment from './comment/plusCommentCell'
import {Actions} from 'react-native-router-flux'
import {ShareModal} from '../../../components/common/shareModal'

export default class MovieDetail extends Component {

    constructor(props) {
        super(props);
        this.navBar = null;
        this.state = {
            viewRef: null,
            modalVisible: false,
        }
    }

    componentDidMount() {
        this.props.getMovieDetail({movieId: this.props.id});
        this.props.getMovieComment({movieId: this.props.id})
    }

    renderActorList(arr, id) {
        return arr.map((item, index) => (
            <TouchableOpacity
                key={index}
                style={{marginLeft: 10, width: 80, alignItems: 'center'}}
                onPress={() => Actions.actorList({id: id})}
            >
                <Image
                    style={{width: 80, height: 80}}
                    source={{uri: item.img?item.img:''}}
                />
                <Text numberOfLines={1} style={styles.actorStyle}>{item.name}</Text>
                <Text numberOfLines={1} style={styles.actorStyle}>{item.nameEn}</Text>
                <Text numberOfLines={1} style={styles.actorStyle}>{item.roleName}</Text>
            </TouchableOpacity>
        ))
    }

    renderGoodsList(arr) {
        return arr.map((item, index) => (
            <TouchableOpacity
                key={index}
                style={{marginLeft: 10, width: 102}}
                onPress={() => Actions.webView({url: item.goodsUrl, title: item.name})}
            >
                <View style={{borderColor: commonStyle.lineColor, borderWidth: 1}}>
                    <Image
                        style={{width: 100, height: 100}}
                        source={{uri: item.image?item.image:''}}
                    />
                    <Text style={{
                        position: 'absolute',
                        color: commonStyle.white,
                        fontSize: 12,
                        backgroundColor: '#1B9DB1',
                        padding: 2
                    }}>新品</Text>
                </View>
                <Text style={styles.goodsStyle}>{item.name}</Text>
                <Text style={[styles.goodsStyle, {
                    color: '#FD7108',
                    marginBottom: 5
                }]}>{`￥${item.minSalePriceFormat}`}</Text>
            </TouchableOpacity>
        ))
    }

    renderMiniComment(arr) {
        return arr.map((item, index) => (
            <MiniComment key={index} miniData={item}/>
        ))
    }

    renderPlusComment(arr) {
        return arr.map((item, index) => (
            <PlusComment key={index} plusData={item}/>
        ))
    }

    renderStory(arr) {
        return (
            arr.map((item, index) => (
                <Text key={index}
                      style={{color: commonStyle.textBlockColor, fontSize: 13, marginTop: 3}}>{`${item} `}</Text>
            ))
        )
    }

    //导航条
    _onScroll(event) {
        let y = event.nativeEvent.contentOffset.y;
        let opacityPercent = y / 64;
        if (y < 64) {
            this.navBar.setNativeProps({
                style: {opacity: opacityPercent}
            })
        } else {
            this.navBar.setNativeProps({
                style: {opacity: 1}
            })
        }
    }

    imageLoaded() {
        this.setState({viewRef: findNodeHandle(this.backgroundImage)})
    }

    renderContent() {
        let data = this.props.movieDetail;
        let basic = data.basic;
        let boxOffice = data.boxOffice;
        let live = data.live;
        let related = data.related;
        let video = basic.video;
        let miniData = this.props.commentData.mini;
        let plusData = this.props.commentData.plus;

        //格式化时间
        let date = basic.releaseDate;
        let year = date[0]+date[1]+date[2]+date[3];
        let month = date[4]+date[5];
        let day = date[6]+date[7];
        date = `${year}-${month}-${day}`;
        return (
            <View style={styles.container}>
                <ScrollView
                    onScroll={this._onScroll.bind(this)}
                    scrollEventThrottle={20}
                    bounces={false}
                >
                    <Image
                        ref={(img) => {
                            this.backgroundImage = img
                        }}
                        style={styles.bgContainer}
                        source={{uri: basic.img?basic.img:''}}
                        // resizeMode='stretch'
                        onLoadEnd={() => this.imageLoaded()}
                        blurRadius={Platform.OS === 'ios'?0:20}
                    />
                    <View style={styles.bgContainer}>
                        {
                            Platform.OS === 'ios' ?
                                <VibrancyView
                                    blurType={'light'}
                                    blurAmount={10}
                                    style={styles.container}
                                /> : null
                        }
                        {/*<BlurView*/}
                            {/*style={styles.absolute}*/}
                            {/*viewRef={this.state.viewRef}*/}
                            {/*blurType="light"*/}
                            {/*blurAmount={10}*/}
                        {/*/>*/}
                    </View>
                    <View style={styles.contentStyle}>
                        <View style={styles.headerStyle}>
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: commonStyle.clear
                                }}
                                onPress={() => Actions.trailerList({id: basic.movieId})}
                            >
                                <Image
                                    style={styles.img}
                                    source={{uri: basic.img?basic.img:''}}
                                    resizeMode='contain'
                                />
                                <View style={{position: commonStyle.absolute}}>
                                    <Icon name={'ios-play'} size={40} color={commonStyle.white}/>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.rightContent}>
                                <Text style={{
                                    color: Platform.OS === 'ios' ? commonStyle.white : commonStyle.black,
                                    fontSize: 16,
                                    marginVertical: 5
                                }}>{basic.name}</Text>
                                <Text style={{color: Platform.OS === 'ios' ? commonStyle.white : commonStyle.black, fontSize: 13, marginBottom: 8}} numberOfLines={Platform.OS === 'ios'?1:0}>{basic.nameEn}</Text>
                                <View style={{flexDirection: 'row'}}>
                                    {
                                        basic.isEggHunt ?
                                            <Text style={{color: '#588F03', fontSize: 12}}>有彩蛋-</Text> : null
                                    }
                                    <Text style={{fontSize: 12, color: commonStyle.textBlockColor}}>{basic.mins}</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    {
                                        this.renderStory(basic.type)
                                    }
                                </View>
                                <Text style={{
                                    color: commonStyle.textBlockColor,
                                    fontSize: 13,
                                    marginTop: 3
                                }}>{`${date} 在${basic.releaseArea}上映`}</Text>
                                <Text numberOfLines={1} style={{
                                    fontSize: 13,
                                    color: commonStyle.textBlockColor,
                                    marginTop: 3
                                }}>{`@${basic.commentSpecial}`}</Text>
                                <View style={{flexDirection: 'row', marginTop: 5}}>
                                    <View style={styles.borderText}>
                                        <Text style={{
                                            paddingHorizontal: 5,
                                            paddingVertical: 2,
                                            color: '#64788E',
                                            fontSize: 10
                                        }}>中国巨幕</Text>
                                    </View>
                                    {
                                        basic.isIMAX ? <View style={styles.borderText}>
                                            <Text style={{
                                                paddingHorizontal: 5,
                                                paddingVertical: 2,
                                                color: '#64788E',
                                                fontSize: 10
                                            }}>IMAX</Text>
                                        </View> : null
                                    }
                                </View>
                            </View>
                            <View style={{width: 40, marginTop: 30}}>
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#588F03',
                                    height: 40
                                }}>
                                    <Text style={{fontSize: 15, color: commonStyle.white}}>{basic.overallRating}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.content}>
                            <Text style={{
                                color: commonStyle.textBlockColor,
                                lineHeight: 20
                            }}>{`剧情： ${basic.story}`}</Text>
                        </View>
                        <View style={{borderBottomWidth: 10, borderBottomColor: commonStyle.lineColor}}>
                            <TouchableOpacity
                                style={{
                                    height: 40,
                                    paddingHorizontal: 10,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                                onPress={() => Actions.actorList({id: basic.movieId})}
                            >
                                <Text style={{color: commonStyle.textBlockColor, fontSize: 15}}>导演</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{color: commonStyle.textGrayColor, fontSize: 12}}>全部</Text>
                                    <Icon name={'ios-play'} size={12} color={commonStyle.black}/>
                                </View>
                            </TouchableOpacity>
                            <ScrollView
                                style={{height: 120, margin: 10, marginLeft: 0, marginTop: 0}}
                                horizontal={true}
                                removeClippedSubviews={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                {this.renderActorList([basic.director], basic.movieId)}
                            </ScrollView>
                        </View>
                        <View style={{borderBottomWidth: 10, borderBottomColor: commonStyle.lineColor}}>
                            <TouchableOpacity
                                style={{
                                    height: 40,
                                    paddingHorizontal: 10,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                                onPress={() => Actions.actorList({id: basic.movieId})}
                            >
                                <Text style={{color: commonStyle.textBlockColor, fontSize: 15}}>演员</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{color: commonStyle.textGrayColor, fontSize: 12}}>全部</Text>
                                    <Icon name={'ios-play'} size={12} color={commonStyle.black}/>
                                </View>
                            </TouchableOpacity>
                            <ScrollView
                                style={styles.actorCell}
                                horizontal={true}
                                removeClippedSubviews={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                {this.renderActorList(basic.actors, basic.movieId)}
                            </ScrollView>
                        </View>
                        {
                            live.count >= 1 ?
                                <View>
                                    <View style={{
                                        height: 40,
                                        paddingHorizontal: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                        <Text style={{color: commonStyle.textBlockColor, fontSize: 15}}>直播</Text>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={{
                                                color: commonStyle.textGrayColor,
                                                fontSize: 12
                                            }}>{live.count}</Text>
                                            <Icon name={'ios-play'} size={12} color={commonStyle.black}/>
                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        activeOpacity={0.6}
                                        style={styles.liveContent}
                                        onPress={() => {alert('直播哟')}}>
                                        <Image
                                            style={{width: 100, height: 60}}
                                            source={{uri: live.img?live.img:''}}
                                            resizeMode='contain'
                                        />
                                        <View style={{flex: 1, marginLeft: 10}}>
                                            <Text style={{
                                                color: commonStyle.textBlockColor,
                                                marginBottom: 5
                                            }}>{live.title}</Text>
                                            <Icon name={'ios-videocam'} size={15} color={commonStyle.red}/>
                                            <Text style={{
                                                color: commonStyle.textGrayColor,
                                                marginVertical: 5,
                                                fontSize: 12
                                            }}>{live.playNumTag}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View> : null
                        }
                        <View style={{
                            flexDirection: 'row',
                            paddingBottom: 10,
                            borderBottomColor: commonStyle.lineColor,
                            borderBottomWidth: 10
                        }}>
                            <TouchableOpacity
                                style={{flex: 1}}
                                onPress={() => Actions.trailerList({id: basic.movieId})}>
                                <View style={{
                                    height: 40,
                                    paddingHorizontal: 10,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <Text style={{color: commonStyle.textBlockColor, fontSize: 15}}>视频</Text>
                                    <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 15}}>
                                        <Text style={{
                                            color: commonStyle.textGrayColor,
                                            fontSize: 12
                                        }}>{video.count}</Text>
                                        <Icon name={'ios-play'} size={12} color={commonStyle.black}/>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        marginHorizontal: 10,
                                        borderRightColor: commonStyle.lineColor,
                                        borderRightWidth: 1,
                                        paddingRight: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: commonStyle.clear
                                    }}
                                >
                                    <Image
                                        style={{height: 120, width: deviceInfo.deviceWidth - 150}}
                                        source={{uri: video.img?video.img:''}}
                                        resizeMode='cover'
                                    />
                                    <View style={{position: commonStyle.absolute}}>
                                        <Icon name={'ios-play'} size={40} color={commonStyle.white}/>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{width: 120}} onPress={() => Actions.pictureList({
                                id: basic.movieId,
                                title: basic.name,
                                subTitle: basic.nameEn
                            })}>
                                <View style={{
                                    height: 40,
                                    paddingHorizontal: 10,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                    <Text style={{color: commonStyle.textBlockColor, fontSize: 15}}>图片</Text>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={{
                                            color: commonStyle.textGrayColor,
                                            fontSize: 12
                                        }}>{basic.stageImg.count}</Text>
                                        <Icon name={'ios-play'} size={12} color={commonStyle.black}/>
                                    </View>
                                </View>
                                <View style={{marginRight: 10, paddingRight: 10, backgroundColor: 'red'}}>
                                    <Image
                                        style={{width: 110, height: 120}}
                                        source={{uri: basic.stageImg.list[0].imgUrl?basic.stageImg.list[0].imgUrl:''}}
                                        resizeMode='cover'
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        {
                            related.goodsList.length ?
                                <View style={{borderBottomWidth: 10, borderBottomColor: commonStyle.lineColor}}>
                                    <View style={{
                                        height: 40,
                                        paddingHorizontal: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            color: commonStyle.textBlockColor,
                                            fontSize: 15
                                        }}>{`周边商品(${related.goodsCount})`}</Text>
                                    </View>
                                    <View style={{padding: 0}}>
                                        <ScrollView
                                            style={{height: 155, margin: 10, marginLeft: 0, marginTop: 0}}
                                            horizontal={true}
                                            removeClippedSubviews={true}
                                            showsHorizontalScrollIndicator={false}
                                        >
                                            {this.renderGoodsList(related.goodsList)}
                                        </ScrollView>
                                    </View>
                                </View> : null
                        }
                        {
                            boxOffice.ranking !== 0 ?
                                <View style={{borderBottomWidth: 10, borderBottomColor: commonStyle.lineColor}}>
                                    <View style={{
                                        height: 40,
                                        paddingHorizontal: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{color: commonStyle.textBlockColor, fontSize: 15}}>票房</Text>
                                    </View>
                                    <View style={styles.boxOffice}>
                                        <View style={styles.boxOfficeItem}>
                                            <Text style={styles.boxOfficeValue}>{boxOffice.ranking}</Text>
                                            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                                <Text style={styles.boxOfficeText}>票房排名</Text>
                                                <Icon name={'ios-play'} size={12}
                                                      color={commonStyle.black}/>
                                            </View>
                                        </View>
                                        <View style={styles.boxOfficeItem}>
                                            <Text style={styles.boxOfficeValue}>{boxOffice.todayBoxDes}</Text>
                                            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                                <Text style={styles.boxOfficeText}>{boxOffice.todayBoxDesUnit}</Text>
                                                <Icon name={'ios-play'} size={12}
                                                      color={commonStyle.black}/>
                                            </View>
                                        </View>
                                        <View style={styles.boxOfficeItem}>
                                            <Text style={styles.boxOfficeValue}>{boxOffice.totalBoxDes}</Text>
                                            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                                <Text style={styles.boxOfficeText}>{boxOffice.totalBoxUnit}</Text>
                                                <Icon name={'ios-play'} size={12}
                                                      color={commonStyle.black}/>
                                            </View>
                                        </View>
                                    </View>
                                </View> : null
                        }
                        <View style={{height: 40, justifyContent: commonStyle.center, alignItems: commonStyle.center}}>
                            <Text>*后续完善*</Text>
                        </View>
                    </View>
                </ScrollView>
                {/* 底部操作栏 */}
                <View style={styles.bottomToolBar}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: 120,
                        justifyContent: 'space-around',
                        height: 49,
                        backgroundColor: commonStyle.bgColor
                    }}>
                        <TouchableOpacity onPress={() => {
                            alert('不，你不想收藏')
                        }}>
                            <View style={{alignItems: 'center', marginLeft: 10}}>
                                <Icon name={'ios-heart'} size={18} color={commonStyle.gray}/>
                                <Text style={{fontSize: 11, color: commonStyle.gray}}>收藏</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{width: 0.5, height: 20, backgroundColor: commonStyle.textGrayColor}}/>
                        <TouchableOpacity onPress={() => {
                            alert('不，你不想评论')
                        }}>
                            <View style={{alignItems: 'center', marginRight: 10}}>
                                <Icon name={'ios-chatboxes'} size={18} color={commonStyle.gray}/>
                                <Text style={{fontSize: 11, color: commonStyle.gray}}>评论</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            height: 49,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#F37207'
                        }}
                        onPress={() => {
                            alert('不，你不想买票')
                        }}>
                        <Text style={{color: commonStyle.white, fontSize: 17}}>购买</Text>
                    </TouchableOpacity>
                </View>
                {/* 顶部渐变导航栏 */}
                <View
                    style={[styles.navBarStyle, {backgroundColor: commonStyle.clear}]}>
                    <View style={styles.navComtentStyle}>
                        <Icon name={'ios-arrow-back'} size={26} color={commonStyle.white}/>
                        <Text style={{color: commonStyle.white, fontSize: 17}}>{``}</Text>
                        <View style={{marginRight: 5}}>
                            <Icon name={'ios-open-outline'} size={24} color={commonStyle.white}/>
                        </View>
                    </View>
                </View>
                <View
                    ref={ref => this.navBar = ref}
                    style={[styles.navBarStyle, {opacity: 0}]}>
                    <View style={styles.navComtentStyle}>
                        <TouchableOpacity onPress={() => Actions.pop()}>
                            <Icon name={'ios-arrow-back'} size={26} color={commonStyle.white}/>
                        </TouchableOpacity>
                        <Text style={{color: commonStyle.white, fontSize: 17}}>{basic.name}</Text>
                        <TouchableOpacity style={{marginRight: 5}} onPress={() => this.setState({modalVisible: true})}>
                            <Icon name={'ios-open-outline'} size={24} color={commonStyle.white}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <ShareModal
                    visible={this.state.modalVisible}
                    onVisibleChange={(modalVisible) => this.setState({
                        modalVisible: modalVisible
                    })}/>
            </View>
        )
    }

    render() {
        let data = this.props.movieDetail;
        let commentData = this.props.commentData;
        return (
            data.basic && commentData.mini ?
                this.renderContent() : <View/>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    bgContainer: {
        position: 'absolute',
        height: deviceInfo.isIphoneX?155:130,
        width: deviceInfo.deviceWidth,
    },
    contentStyle: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? (deviceInfo.isIphoneX?155:130) : 70,
        backgroundColor: commonStyle.white,
    },
    headerStyle: {
        marginTop:Platform.OS === 'ios' ? -50 : 0,
        flexDirection: 'row',
        marginHorizontal: 10,
        paddingBottom: 10
    },
    img: {
        width: 100,
        height: 150
    },
    rightContent: {
        flex: 1,
        backgroundColor: 'transparent',
        marginLeft: 10
    },
    borderText: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: 0.5,
        marginRight: 10,
        borderColor: '#64788E'
    },
    content: {
        padding: 10,
        backgroundColor: commonStyle.white,
        borderTopWidth: 10,
        borderTopColor: commonStyle.lineColor,
        borderBottomWidth: 10,
        borderBottomColor: commonStyle.lineColor
    },
    actorStyle: {
        fontSize: 12,
        color: commonStyle.textBlockColor,
        marginTop: 2
    },
    liveContent: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: commonStyle.lineColor,
        marginHorizontal: 10,
        paddingVertical: 10,
        paddingTop: 0
    },
    goodsStyle: {
        fontSize: 12,
        color: commonStyle.textBlockColor,
        marginTop: 5
    },
    boxOffice: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 10,
        paddingTop: 0
    },
    boxOfficeItem: {
        alignItems: 'center'
    },
    boxOfficeText: {
        marginVertical: 10,
        color: commonStyle.gray,
        fontSize: 12
    },
    boxOfficeValue: {
        color: '#F37407',
        fontSize: 20
    },
    bottomToolBar: {
        flexDirection: 'row',
        height: 49,
        alignItems: 'center',
        marginBottom: deviceInfo.isIphoneX?34:0,
    },
    navBarStyle: {
        height: commonStyle.navHeight,
        backgroundColor: '#161C28',
        position: 'absolute',
        width: deviceInfo.deviceWidth,
    },
    navComtentStyle: {
        height: commonStyle.navContentHeight,
        marginTop: commonStyle.navStatusBarHeight,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    actorCell: {
        height: 135,
        margin: 10,
        marginLeft: 0,
        marginTop: 0
    }
});
