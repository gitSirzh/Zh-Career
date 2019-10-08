/**
 * Created by jszh on 2018/12/27.
 */

/** 设备信息 **/

import {Dimensions, Platform} from 'react-native'
import DeviceInfo from 'react-native-device-info-lower-version-android-jszh'

var deviceInfo;
export default deviceInfo = {
    // 设备宽度
    deviceWidth: Dimensions.get('window').width,
    // 设备高度
    deviceHeight: Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - 24,
    // 设备系统 iphoneX
    isIphoneX: Dimensions.get('window').width >= 375 && Dimensions.get('window').height >= 812,
    // 设备系统
    deviceOS: Platform.OS,
    // 设备系统 ios
    isIOS: Platform.OS === 'ios',
    // 当前config: debug \ release
    mode: __DEV__ ? 'xdebug' : 'release',

    /**
     * 设备具体信息
     */
    //获取API级别
    getAPILevel:DeviceInfo.getAPILevel(),
    //获取应用程序名称
    getApplicationName:DeviceInfo.getApplicationName(),
    //获取应用程序包名
    getBundleId:DeviceInfo.getBundleId(),
    //获取设备名称
    getDeviceName:DeviceInfo.getDeviceName(),
    //获取设备系统名称
    getSystemName:DeviceInfo.getSystemName(),
    //获取设备系统版本
    getSystemVersion:DeviceInfo.getSystemVersion(),
    //设备版本
    getSystemNameAndVersion:`${DeviceInfo.getSystemName()} ${DeviceInfo.getSystemVersion()}`,
    //设备总内存（单位/G）
    getTotalMemory:`${Math.round((DeviceInfo.getTotalMemory()/(1048576))/1024)}G`,
}

