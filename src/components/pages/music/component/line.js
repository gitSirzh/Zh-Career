/**
 * Created by jszh on 2019/2/22.
 */
import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import deviceInfo from '../../../../utils/deviceInfo'
import {commonStyle} from "../../../../utils/commonStyle";

export default class Line extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.container,{width: deviceInfo.deviceWidth - 100, height: 0.34811, backgroundColor: 'rgba(220,220,220,0.5)'}]}>
                    <View style={[styles.container,{width: deviceInfo.deviceWidth - 110, height: 0.34812, backgroundColor: 'rgba(220,220,220,0.5)'}]}>
                        <View style={[styles.container,{width: deviceInfo.deviceWidth - 140, height: 0.34813, backgroundColor: 'rgba(220,220,220,0.7)'}]}>
                            <View style={{width: deviceInfo.deviceWidth - 200, height: 0.7, backgroundColor: 'rgba(220,220,220,0.8)'}}/>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: deviceInfo.deviceWidth,
        height: 0.35,
        backgroundColor: 'rgba(0,0,0,0)',
        alignItems: commonStyle.center,
        justifyContent: commonStyle.center
    }
});
