/**
 * Created by jszh on 2018/12/27.
 */
import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, FlatList,Image} from 'react-native'
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
        // this.renderPage = this.renderPage.bind(this);
        // this.onChangePage = this.onChangePage.bind(this);
        this.state = {
            // dataSource: new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2}),
            // pageNum: 0
        }
    }

    navigationBarProps() {
        return {
            title: 'MUSIC',
            hiddenLeftItem: true,
            navBarStyle:{backgroundColor:commonStyle.black},
            titleStyle:{color: commonStyle.navThemeColor}
        }
    }

    componentDidMount() {
        // action.musicIdList().then(response => {
        //     this.setState({
        //         dataSource: this.state.dataSource.cloneWithPages(response.data),
        //         pageNum: response.data.length - 1
        //     })
        // })
    }

    // renderPage(rowData, rowId) {
    //     return (
    //         <MusicDetail {...this.props} key={rowId} id={parseInt(rowData)}/>
    //     )
    // }
    //
    // onChangePage(index) {
    //     index === this.state.pageNum ? Actions.pastList({
    //         beginTime: beginTime.music,
    //         pageType: articleType.MUSIC
    //     }) : null
    // }

    _render() {
        let footTitle = this.state.playlist?'恒果努力加载中...':'别扯了,到底了!';//恒果努力加载中...
        // <ViewPager
        //     style={styles.container}
        //     onChangePage={this.onChangePage}
        //     renderPage={this.renderPage}
        //     dataSource={this.state.dataSource}
        //     renderPageIndicator={false}
        // />
        return (
            <View style={styles.container}>
                <FlatList
                    style={{width:deviceInfo.deviceWidth}}
                    data={musicList.list}
                    renderItem={({item,index}) => {
                        return(
                            <View style={{marginTop:10,flexDirection: 'row',justifyContent:commonStyle.center,alignItems:commonStyle.center}}>
                                <View style={{width:40,height:50,justifyContent:commonStyle.center,alignItems:commonStyle.center}}>
                                    <Text style={{fontSize:16,color:commonStyle.textGrayColor}}>{index+1}</Text>
                                </View>
                                <Image style={{width:40,height:42,borderRadius:3}} source={{uri:item.cover}} resizeMode={'stretch'}/>
                                <TouchableOpacity
                                    onPress={() =>{
                                        Actions.musicPlayer({music_id:index,xsong_name:item.xsong_name,xsinger_name:item.xsinger_name,cover:item.cover,url:item.url});
                                    }}
                                    activeOpacity={0.6}
                                >
                                    <View style={{marginLeft: 10,width:deviceInfo.deviceWidth-90}}>
                                        <Text style={{fontSize:15}}>{item.xsong_name}</Text>
                                        <Text style={{marginTop:5,fontSize:12,color:commonStyle.textGrayColor}}>{item.xsinger_name}</Text>
                                        <View style={{marginTop:10,height:0.5,backgroundColor: commonStyle.lineColor}}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                    keyExtractor={(item, index) => index.toString()}
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
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:commonStyle.navThemeColor,
        justifyContent:commonStyle.center,
        alignItems:commonStyle.center
    }
});

const _Music = connect(
    (state) => state.music.music,
    Action.dispatch('music')
)(Music);

export default _Music
