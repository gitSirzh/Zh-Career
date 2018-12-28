/**
 * Created by jszh on 2018/12/27.
 */

import React, { Component } from 'react';
import {View} from "react-native"

/**============状态管理器============**/
import store from '../store/index_store'
import {Provider, connect} from 'react-redux'
import {Scene, Router, Actions, Reducer, ActionConst, Modal, Stack, Lightbox} from "react-native-router-flux"
import Action from '../actions'
import {dispatch} from '../utils/allLog/dispatchLog'
import type from '../constants/actionType'
import {commonStyle} from '../utils/index_utils'

/**============action============**/


/**============路由页============**/
import TabBar from './TabBar'


type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <View style={{flex: 1}}>
                <TabBar/>
            </View>
        );
    }
}
