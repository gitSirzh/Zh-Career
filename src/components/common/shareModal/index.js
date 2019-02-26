/**
 * Created by jszh on 2018/12/29.
 */
import React, {Component} from 'react'
import {commonStyle} from '../../../utils/commonStyle'
import deviceInfo from '../../../utils/deviceInfo'
import {View, TouchableOpacity, Text, StyleSheet, Modal, NativeModules} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
// import {sharePlatform} from '../../../constants/commonType'

//原生分享模版
// const ShareModule = NativeModules.shareModule;

class ShareModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isHidden: false
    }
  }

  //调用原生分享
  // share(platform) {
  //   ShareModule.share('OneM','OneM',
  //     'http://www.jianshu.com/u/023338566ca5','http://ovyjkveav.bkt.clouddn.com/17-11-9/48949929.jpg', sharePlatform[platform],
  //     (message) => {
  //       this.props.onVisibleChange && this.props.onVisibleChange(false)
  //       this.setState({isHidden: true})
  //     })
  // }

  renderItem(icon, title, color, platform) {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => alert(title)}
      >
        <Icon name={`${icon}`} color={color} size={30}/>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      !this.state.isHidden || this.props.visible ?
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={this.props.visible}
          onRequestClose={() => this.props.onVisibleChange(false)}>
          <TouchableOpacity
              activeOpacity={1}
            style={styles.modalStyle}
            onPress={() => this.setState({isHidden: true})}
          >
            <TouchableOpacity
              activeOpacity={1}
              style={styles.cancle}
              onPress={() => this.props.onVisibleChange && this.props.onVisibleChange(false)}>
              <Text>取消</Text>
            </TouchableOpacity>
            <View style={styles.content}>
              {this.renderItem('weixin', '微信', '#49BF6E', 'WECHAT')}
              {this.renderItem('github', 'GitHub', '#000000', 'GItHUb')}
              {this.renderItem('qq', 'QQ', '#4CC3F0', 'QQ')}
              {this.renderItem('weibo','微博', '#CE3238', 'SINA')}
            </View>
          </TouchableOpacity>
        </Modal> : null
    )
  }
}

const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    flexDirection: 'column-reverse',
    alignItems: commonStyle.center,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  content: {
    flexDirection: commonStyle.row,
    backgroundColor: commonStyle.white,
    justifyContent: commonStyle.around,
    alignItems: commonStyle.center,
    width: deviceInfo.deviceWidth,
    paddingHorizontal: 20
  },
  item: {
    justifyContent: commonStyle.center,
    alignItems: commonStyle.center,
    marginVertical: 10
  },
  cancle: {
    height: 44,
    justifyContent: commonStyle.center,
    alignItems: commonStyle.center,
    backgroundColor: commonStyle.white,
    width: deviceInfo.deviceWidth,
    borderTopColor: commonStyle.lineColor,
    borderTopWidth: 1
  },
  text: {
    marginTop: 5,
    fontSize: 13,
    color: commonStyle.textBlockColor
  }
});

export {ShareModal}
