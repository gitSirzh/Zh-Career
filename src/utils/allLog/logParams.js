/**
 * Created by jszh on 2018/12/27.
 */

import {Platform} from 'react-native'
// import DeviceInfo from 'react-native-device-info'
const defaultValue = {
  sourceId: Platform.OS === 'ios' ? 0 : 1,
  channelID: 0,
  logTime: new Date().toISOString(),
  userId: 'xxx',
  appType: 0,
  appVersion: '',
  imei: 'xxx',
  deviceId: '',
  eventID: '',
  message: '',
  pageId: '',
  entry: '',
  result: '',
}

export {defaultValue}
