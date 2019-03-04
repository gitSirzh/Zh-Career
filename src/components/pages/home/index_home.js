/**
 * Created by jszh on 2018/12/27.
 */
import React, {Component} from 'react'
import {StyleSheet, View,Text} from 'react-native'
import {commonStyle} from "../../../utils/commonStyle";
import {BaseComponent} from "../../base/baseComponent";
import deviceInfo from "../../../utils/deviceInfo";
import DeviceInfo from 'react-native-device-info'

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

    _render() {
        return (
            <View style={styles.containerStyle}>
                <Text>Home</Text>
                <Text>{'获取API级别:'}{deviceInfo.getAPILevel}</Text>
                <Text>{'获取应用程序名称:'}{deviceInfo.getApplicationName}</Text>
                <Text>{'获取应用程序包名:'}{deviceInfo.getBundleId}</Text>
                <Text>{'获取设备名称:'}{deviceInfo.getDeviceName}</Text>
                <Text>{'获取设备系统名称:'}{deviceInfo.getSystemName}</Text>
                <Text>{'获取设备系统版本号:'}{deviceInfo.getSystemVersion}</Text>
                <Text>{'获取设备系统:'}{deviceInfo.getSystemNameAndVersion}</Text>
                <Text>{'设备总内存:'}{deviceInfo.getTotalMemory}</Text>
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
