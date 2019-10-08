
/**
 * Created by jszh on 2019/3/22
 */
import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView} from 'react-native'

import {Actions} from 'react-native-router-flux'
import deviceInfo from "../../../../utils/deviceInfo"
import {BaseComponent} from '../../../../components/base/baseComponent'
import {commonStyle} from "../../../../utils/commonStyle"
import {Toast} from "../../../../utils/toast"
import {qCloudsearch,getByIdPlayerUrl,getByIdPlayerLyric} from "../../../../utils/network/fetch/apiHelper"
import Modal from "react-native-modal";
import {setUserMusicInfo,userInfo} from "../../../../utils/userInfo"

class SearchMusic extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            musicName:'Zunea-Zunea',    //默认歌曲
            musicList:[],               //数据
            historical:[],              //历史记录

        }
    }

    navigationBarProps() {
        return {
            title: '搜索 MUSIC',
            navBarStyle:{
                backgroundColor:commonStyle.inkBlack
            },
            titleStyle:{
                color: commonStyle.navThemeColor
            }
        }
    }

    componentDidMount() {
        if (userInfo){
            this.setState({historical:userInfo.musicData})
        }
    }

    //搜索
    searchMusic(musicName){
        this.setState({show:true});
        qCloudsearch((r)=>{
            if (r.code === 200){
                this.setState({musicList:r.result.songs});
            }else {
                Toast.show('呀！出错了')
            }
        },{s:musicName,type:1,limit:30,total:true,offset:0})
    }

    _render() {
        return (
            <View style={styles.container}>
                {/*搜索框*/}
                <View style={styles.view1}>
                    <View style={styles.view1_1}>
                        <TextInput
                            style={styles.input}
                            onChangeText = {text=>{this.setState({musicName:text})}}
                            maxLength = {30}
                            placeholder = {'喜欢听什么歌呢？何不搜一下呢？'}
                            keyboardType={'default'}
                            underlineColorAndroid={'transparent'}
                            placeholderTextColor = {'rgb(172,172,172)'}
                            onSubmitEditing={()=>{
                                this.searchMusic(this.state.musicName)
                            }}
                            autoFocus={true}
                        />
                    </View>
                    <TouchableOpacity
                        activeOpacity={commonStyle.modalOpacity}
                        style={styles.btn1}
                        onPress={()=>{this.searchMusic(this.state.musicName)}}
                    >
                        <Text style={{fontSize:14,color: commonStyle.navThemeColor}}>搜索</Text>
                    </TouchableOpacity>
                </View>

                <View style={{width:deviceInfo.deviceWidth}}>
                    <Text style={styles.textTitle}>历史记录</Text>
                </View>
                {/*历史记录*/}
                <View style={styles.view2}>
                    {this.state.historical?
                        this.state.historical.map((data,index)=>{
                            return(
                                <View key={index} style={{flexDirection: commonStyle.row}}>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={styles.view2_1}
                                        onPress={()=>{
                                            //通过ID查询歌曲播放地址
                                            getByIdPlayerUrl((r)=>{
                                                if(r.code === 200){
                                                    Actions.musicPlayer({isListData:true,music_id:data.music_id,xsong_name:data.xsong_name,xsinger_name:data.xsinger_name,cover:data.cover,url:r.data[0].url});
                                                }else {
                                                    Toast.show('呀！没网了')
                                                }
                                            },{ids:`['${data.music_id}']`,br:320000});
                                        }}
                                    >
                                        <Text style={styles.textWarp}>{data.xsong_name} - {data.xsinger_name}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }):null
                    }
                </View>

                {/*列表弹窗*/}
                <Modal
                    isVisible={this.state.show}
                    style={styles.modal}
                    backdropOpacity={0}
                >
                    <View style={styles.modal}>
                        <TouchableOpacity style={{width:deviceInfo.deviceWidth,height:commonStyle.navHeight}} activeOpacity={1} onPress={()=>{this.setState({show: false })}}/>
                        <View style={styles.modalView}>
                            <View style={styles.modalTitleView}>
                                <Text style={{color: commonStyle.navThemeColor,fontSize: 15}}>为您查询到以下歌曲</Text>
                                <TouchableOpacity
                                    activeOpacity={0.6}
                                    style={styles.closeBtn}
                                    onPress={() =>{this.setState({show: false })}}
                                >
                                    <Text style={styles.closeText}>关闭</Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView
                                style={{width:deviceInfo.deviceWidth}}
                            >
                                {this.state.musicList ? this.state.musicList.map((data,index)=>{
                                    return(
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.scrollableModalContent}
                                            onPress={() =>{
                                                this.setState({show: false});
                                                //延迟播放
                                                setTimeout(()=>{
                                                    getByIdPlayerUrl((r)=>{
                                                        if(r.code === 200){
                                                            Actions.musicPlayer({isListData:true,music_id:data.id,xsong_name:data.name,xsinger_name:data.ar[0].name,cover:data.al.picUrl,url:r.data[0].url});
                                                            //存储搜索记录
                                                            setUserMusicInfo(data.id,data.name,data.ar[0].name,data.al.picUrl,r.data[0].url);
                                                        }else {
                                                            Toast.show('呀！没网了')
                                                        }
                                                    },{ids:`['${data.id}']`,br:320000});
                                                },300);
                                            }}
                                        >
                                            <View>
                                                <Text style={{fontSize:14,color: commonStyle.navThemeColor}} numberOfLines={1}>{data.name} - {data.ar[0].name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }):
                                    <View style={{flex:1,alignItems: commonStyle.center,justifyContent: commonStyle.center}}>
                                        <Text style={{fontSize:14,color: commonStyle.navThemeColor}}>抱歉没查找到对应歌曲</Text>
                                    </View>
                                }
                            </ScrollView>

                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:commonStyle.center
    },
    view1:{
        width:deviceInfo.deviceWidth,
        flexDirection: commonStyle.row,
        justifyContent: commonStyle.center,
        alignItems: commonStyle.center
    },
    view1_1:{
        marginVertical: 10,
        height:40,
        width:deviceInfo.deviceWidth-100,
        borderWidth: 1,
        borderColor:commonStyle.inkBlack,
        borderRadius:30,
        justifyContent: commonStyle.center
    },
    input:{
        height:40,
        marginHorizontal: 15
    },
    btn1:{
        width:60,
        height:35,
        marginLeft:10,
        backgroundColor: commonStyle.inkBlack,
        borderRadius:30,
        justifyContent:commonStyle.center,
        alignItems:commonStyle.center
    },
    textTitle:{
        marginLeft: 20,
        marginVertical: 15,
        fontSize:14,
        color: commonStyle.gray
    },
    textWarp:{
        marginHorizontal: 10,
        marginVertical: 6,
        fontSize:12,
        color:commonStyle.inkBlack
    },
    view2:{
        width:deviceInfo.deviceWidth-30,
        flexDirection:commonStyle.row,
        alignItems:commonStyle.center,
        flexWrap:commonStyle.wrap
    },
    view2_1:{
        backgroundColor:commonStyle.lineColor,
        borderRadius:20,
        justifyContent:commonStyle.center,
        alignItems:commonStyle.center,
        margin: 5
    },
    modal: {
        flex:1,
        justifyContent:commonStyle.end,
        margin: 0
    },
    modalView: {
        flex:1,
        backgroundColor: commonStyle.inkBlack,
        alignItems:commonStyle.center
    },
    modalTitleView: {
        height:40,
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
        width:45,
        height: 40,
        alignItems: commonStyle.center,
        justifyContent:commonStyle.center,
        position:'absolute',
        right:10,
        top:0
    },
    closeText: {
        fontSize:16,
        color:commonStyle.navThemeColor
    },
});


export default  SearchMusic
