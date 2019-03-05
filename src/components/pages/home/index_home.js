/**
 * Created by jszh on 2018/12/27.
 */
import React, {Component} from 'react'
import {StyleSheet, View,Text} from 'react-native'
import {commonStyle} from "../../../utils/commonStyle"
import {BaseComponent} from '../../../components/base/baseComponent'
import {deviceInfo} from "../../../utils/index_utils";
import Swiper from '../../common/swiper/index'

class Home extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            ip:''
        }
    }

    navigationBarProps() {
        return {
            title: '首页',
            hiddenLeftItem: true,
            navBarStyle:{
                backgroundColor:commonStyle.inkBlack
            },
            titleStyle:{
                color: commonStyle.navThemeColor
            }
        }
    }

    componentDidMount() {

    }

    /**
     * 后面加入swiper组件介绍
     * 后期准备加入新的东西，有意思的东西呦
     * @returns {*}
     * @private
     */
    _render() {
        let data = [1,2,3,4,5,6];
        return (
            <View style={styles.containerStyle}>
                <Swiper
                    viewStyle={{marginTop:10}}
                    centerMethod={
                        data.map((item,index)=>{
                            return(
                                <View key={index} style={{width:deviceInfo.deviceWidth,alignItems: commonStyle.center}}>
                                    <View style={{borderRadius:10,marginTop:5,width:deviceInfo.deviceWidth-30,height:110,backgroundColor:commonStyle.yellow,alignItems:commonStyle.center,justifyContent: commonStyle.center}}>
                                        <Text style={{fontSize:16,color: commonStyle.inkBlack}}>{item}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                    paginationStyle={{bottom: 6}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: commonStyle.bgColor,
        alignItems:commonStyle.center
    },
    wrapperContainer:{
        height:200
    }

});


export default Home
