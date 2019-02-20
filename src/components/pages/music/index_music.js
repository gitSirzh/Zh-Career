/**
 * Created by jszh on 2018/12/27.
 */
import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native'
// import ViewPager from 'react-native-viewpager'
import {BaseComponent} from '../../../components/base/baseComponent'
import {connect} from 'react-redux'
// import MusicDetail from './musicDetail'
import Action from '../../../actions'
import {Actions} from 'react-native-router-flux'
import action from '../../../actionCreators/music'
import {articleType, beginTime} from '../../../constants/commonType'
import {commonStyle} from '../../../utils/commonStyle'
import deviceInfo from '../../../utils/deviceInfo'

import musicList from '../../../assets/data/musicList1'

class Music extends BaseComponent {

    constructor(props) {
        super(props);
        this.renderPage = this.renderPage.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.state = {
            // dataSource: new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2}),
            pageNum: 0
        }
    }

    navigationBarProps() {
        return {
            title: 'MUSIC',
            hiddenLeftItem: true
        }
    }

    componentDidMount() {
        action.musicIdList().then(response => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithPages(response.data),
                pageNum: response.data.length - 1
            })
        })
    }

    renderPage(rowData, rowId) {
        return (
            <MusicDetail {...this.props} key={rowId} id={parseInt(rowData)}/>
        )
    }

    onChangePage(index) {
        index === this.state.pageNum ? Actions.pastList({
            beginTime: beginTime.music,
            pageType: articleType.MUSIC
        }) : null
    }

    //内容 ===start===
    _render() {
        let footTitle = this.state.playlist?'':'别扯了,到底了!';//恒果努力加载中...
        // <ViewPager
        //     style={styles.container}
        //     onChangePage={this.onChangePage}
        //     renderPage={this.renderPage}
        //     dataSource={this.state.dataSource}
        //     renderPageIndicator={false}
        // />
        return (
            <View style={{backgroundColor:commonStyle.drakGray,justifyContent:commonStyle.center,alignItems:commonStyle.center}}>
                <FlatList
                    style={{width:deviceInfo.deviceWidth}}
                    data={musicList.list}
                    renderItem={({item,index}) => {
                        return(
                            <View style={{marginTop:10,flexDirection: 'row',justifyContent:commonStyle.center,alignItems:commonStyle.center}}>
                                <View style={{width:40,height:50,justifyContent:commonStyle.center,alignItems:commonStyle.center}}>
                                    <Text style={{fontWeight:'100',fontSize:16}}>{index+1}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() =>{
                                        Actions.musicPlayer({xsong_name:item.xsong_name,xsinger_name:item.xsinger_name,cover:item.cover,url:item.url});
                                        this.setState({xsong_name:item.xsong_name,xsinger_name:item.xsinger_name,cover:item.cover,url:item.url});
                                    }}
                                    activeOpacity={0.6}
                                    style={{width:deviceInfo.deviceWidth-40}}
                                >
                                    <View style={{width:deviceInfo.deviceWidth-40}}>
                                        <Text style={{fontWeight:'600',fontSize:15}}>{item.xsong_name}</Text>
                                        <Text style={{marginTop:5,fontSize:12}}>{item.xsinger_name}</Text>
                                        <View style={{marginTop:5,height:0.5,backgroundColor: '#c5c5c5'}}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                    onEndReached={()=>{
                        //alert('上啦了')
                    }}
                    onEndReachedThreshold={1}
                    ListFooterComponent={()=>{
                        return(
                            <View style={{backgroundColor:'#c5c5c5',marginBottom: commonStyle.tabBarHeight+15,width:deviceInfo.deviceWidth,height:30,justifyContent:commonStyle.center,alignItems:commonStyle.center}}>
                                <Text style={{color:commonStyle.PeachPuff,fontSize:13,fontWeight:'300'}}>{footTitle}</Text>
                            </View>
                        )
                    }}
                />
            </View>
        )
    }
    //内容 ===end===

    //QQ搜索
    requestQQ(qqId){
        //请求QQ空间收藏的音乐
        let qqhao = qqId?qqId:'1067338206'; //不存在为默认王胖子的空间歌曲，因为他的歌曲多，嘻嘻
        fetch('https://www.sojson.com/api/qqmusic/'+qqhao,'GET')
            .then(res=>{
                return res.json();
            }).then(res=> {
            //alert(JSON.stringify(res.data))
            if (res.data){
                if (res.status === 200) {
                    //是否有一首歌 （接口问题，有一首歌时为对象没有数组）
                    if (res.data.xmusicnum === "1"){
                        this.setState({
                            playlist:[res.data.playlist.song], //列表数据
                            xmusicnum:res.data.xmusicnum,//数据条数 （几首歌）
                            curtime:res.data.curtime, //请求时间
                        });
                    }else {
                        this.setState({
                            playlist:res.data.playlist, //列表数据
                            xmusicnum:res.data.xmusicnum,//数据条数 （几首歌）
                            curtime:res.data.curtime, //请求时间
                        });
                    }
                }else {
                    send('showBlackAlert', {show: true, title: "好气呀！企鹅关闭数据啦"});
                }
            }
        }).catch(error=> {
            send('showBlackAlert', {show: true, title: "请求啦，可能QQ号不存在呦！"});
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

const _Music = connect(
    (state) => state.music.music,
    Action.dispatch('music')
)(Music);

export default _Music
