/**
 * Created by jszh on 2018/12/27.
 */
import React, {Component} from 'react'
import {StyleSheet, View,Text} from 'react-native'
import {commonStyle} from "../../../utils/commonStyle";
import {BaseComponent} from "../../base/baseComponent";

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
        return (
            <View style={styles.containerStyle}>
                <Text>Home</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#FFEBCD',
        justifyContent: commonStyle.center,
        alignItems:commonStyle.center
    },

});


export default Home
