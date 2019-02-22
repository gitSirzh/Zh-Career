
/**
 * Created by jszh on 2019/2/20
 */

import React,{Component} from 'react'
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native'
import deviceInfo from '../../../../utils/deviceInfo'
import {commonStyle} from '../../../../utils/commonStyle'
import Icon from "react-native-vector-icons/Ionicons"

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: ''
        };

        this.centerColor = this.props.centerColor ? this.props.centerColor : commonStyle.main;
    }

    componentWillMount() {

    }

    render() {
        return (
            <View style={[styles.container, this.props.style, {backgroundColor: this.props.centerColor ? this.props.centerColor : this.state.colors ? this.state.colors : commonStyle.main}]}>
                <View
                    style={[styles.beside, {backgroundColor: this.props.centerColor ? this.props.centerColor : this.state.colors ? this.state.colors : commonStyle.main}]}>
                    {this.renderBack()}
                    {this.renderLeft()}
                </View>

                <View
                    style={[styles.middle, {backgroundColor: this.props.centerColor ? this.props.centerColor : this.state.colors ? this.state.colors : commonStyle.main}]}>
                    <Text
                        style={{fontSize: 16 , fontWeight: '400', color: this.props.textColor ? this.props.textColor : commonStyle.white}}
                    >
                        {this.props.title}</Text>
                    {this.props.children}
                </View>

                <View
                    style={[styles.beside, {backgroundColor: this.props.centerColor ? this.props.centerColor : this.state.colors ? this.state.colors : commonStyle.main}]}>
                    {this.renderRight()}
                </View>
            </View>
        )
    }


    renderLeft() {
        if (this.props.renderLeft) {
            return this.props.renderLeft();
        }
    }

    renderRight() {
        if (this.props.renderRight) {
            return this.props.renderRight();
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    renderBack() {
        var backCallback = this.props.backCallback;
        if (backCallback) {
            return (
                <TouchableOpacity style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: deviceInfo.deviceWidth * 0.1,
                    height: commonStyle.navContentHeight,
                    position: 'absolute',
                    top: 0,
                    left: 0
                }} onPress={() => {
                    backCallback()
                }}>
                    <Icon name={'ios-arrow-back'} size={26} color={this.props.textColor}/>
                </TouchableOpacity>
            )
        } else {
            return null;
        }
    }
}


const styles = StyleSheet.create({
    container: {
        width: deviceInfo.deviceWidth,
        height: commonStyle.navHeight,
        paddingTop: commonStyle.navStatusBarHeight,
        flexDirection: 'row',
    },

    beside: {
        width: deviceInfo.deviceWidth * 0.2,
        height: commonStyle.navHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },

    middle: {
        width: deviceInfo.deviceWidth * 0.6,
        height: commonStyle.navContentHeight,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    navBack: {
        width: 12 ,
        height: 60 / 33 * (12 ),
        tintColor: commonStyle.red
    }
});

export default Navbar
