/**
 * Created by jszh on 2019/3/5.
 */
import React, {Component} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import _Swiper from 'react-native-swiper'
import {commonStyle} from '../../../utils/commonStyle'

class Swiper extends Component {

    render() {
        return (
            <View style={[styles.container,this.props.viewStyle]}>
                <_Swiper
                    {...this.props}                         //返回此组件所有属性（引用此组件可以使用此组件所有属性）
                    showsButtons={false}                    //左右控制按钮
                    autoplay={true}                         //开启自动轮播
                    autoplayTimeout={6}                     //轮播间隔时间（切换时间）2秒
                    showsPagination={true}                  //为false不显示下方圆点
                    dot={<View style={{                     //未选中的圆点样式
                        backgroundColor: commonStyle.twoTranslucent,
                        width: 6,
                        height: 6,
                        borderRadius: 10,
                        marginLeft: 5,
                        marginRight: 5,
                        marginTop: 5,
                        marginBottom: 5,
                    }}/>}
                    activeDot={<View style={{               //选中的圆点样式
                        backgroundColor: commonStyle.iconBlack,
                        width: 6,
                        height: 6,
                        borderRadius: 10,
                        marginLeft: 5,
                        marginRight: 5,
                        marginTop: 5,
                        marginBottom: 5,
                    }}/>}
                >
                    {this.props.centerMethod}
                </_Swiper>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height:120
    }
});

export default Swiper
