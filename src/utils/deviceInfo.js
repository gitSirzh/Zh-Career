/**
 * Created by jszh on 2018/12/27.
 */

/** 设备信息 **/

import {Dimensions, Platform} from 'react-native'
// import DeviceInfo from 'react-native-device-info'
var deviceInfo;
export default deviceInfo = {
    // 设备宽度
    deviceWidth: Dimensions.get('window').width,
    // 设备高度
    deviceHeight: Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - 24,
    // iphoneX:Platform.OS === 'ios' && ((Dimensions.get('window').height === 812 && Dimensions.get('window').width === 375) || (Dimensions.get('window').height === 375 && Dimensions.get('window').width === 812)),
    // 设备系统 iphoneX
    isIphoneX: Dimensions.get('window').width === 375 && Dimensions.get('window').height === 812,
    // 设备系统
    deviceOS: Platform.OS,
    // 设备系统 ios
    isIOS: Platform.OS === 'ios',
    // 当前config: debug \ release
    mode: __DEV__ ? 'xdebug' : 'release'
}

