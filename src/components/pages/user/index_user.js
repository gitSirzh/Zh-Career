/**
 * Created by jszh on 2018/12/27.
 */
import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {commonStyle} from "../../../utils/commonStyle"
import {BaseComponent} from "../../base/baseComponent"

class User extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    navigationBarProps() {
        return {
            title: '用户',
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
                <Text>User</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#FFE4E1',
        justifyContent: commonStyle.center,
        alignItems:commonStyle.center
    },

});


export default User
