/**
 * Created by jszh on 2018/12/29.
 */
import React, {Component} from 'react'
import {StyleSheet, View, WebView,TouchableOpacity} from 'react-native'
import {commonStyle} from '../../../utils/commonStyle'
import {BaseComponent} from '../../base/baseComponent'

export default class CustomWebView extends BaseComponent {

    navigationBarProps() {
        return {
            title: this.props.title,
            subTitleStyle: {
                color: commonStyle.white
            },
            titleStyle: {
                color: commonStyle.white
            },
            leftIcon: {
                name: 'ios-arrow-back',
                size: 26,
                color: commonStyle.white
            },
            navBarStyle: {
                backgroundColor: '#151C28',
            }
        }
    }

    _render() {
        const {url} = this.props;
        return (
            <View style={styles.container}>
                {/*<TouchableOpacity*/}
                    {/*style={{width:200,height:40,backgroundColor:'red'}}*/}
                    {/*onPress={()=>{this.refs['webView'].goBack()}}*/}
                {/*/>*/}
                <WebView
                    ref={'webView'}
                    startInLoadingState={true}
                    source={{uri: url}}
                    userAgent={'userAgent'}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonStyle.white
    }
});
