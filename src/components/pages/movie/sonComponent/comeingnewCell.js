/**
 * Created by jszh on 2018/12/29.
 */

import React, {Component} from 'react'
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {commonStyle} from '../../../../utils/commonStyle'
import Icon from 'react-native-vector-icons/Ionicons'
import {Actions} from 'react-native-router-flux'
import deviceInfo from '../../../../utils/deviceInfo'
import {Toast} from "../../../../utils/toast";

export default class ComeingNewCell extends Component {
    render() {
        let data = this.props.rowData;
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => Actions.movieDetail({id: data.id})}
            >
                <TouchableOpacity
                    style={{justifyContent: 'center', alignItems: 'center', backgroundColor: commonStyle.clear}}>
                    <Image
                        style={styles.img}
                        source={{uri: data.image}}
                    />
                    <View style={{position: commonStyle.absolute}}>
                        <Icon name={'ios-play'} size={25} color={commonStyle.white}/>
                    </View>
                </TouchableOpacity>
                <View style={styles.rightContent}>
                    <View style={{flex: 1}}>
                        <Text style={[styles.text,{fontSize: 15}]}>{data.title}</Text>
                        <Text numberOfLines={1}
                              style={{color: commonStyle.darkOrange, fontSize: 13, paddingVertical: 6}}>{`${data.wantedCount}`}
                            <Text style={styles.text1}>人想看</Text>
                            <Text style={styles.text1}>{` - ${data.type}`}</Text>
                        </Text>
                        <Text numberOfLines={1} style={styles.text2}>{`${data.actor1} / ${data.actor2}`}</Text>
                    </View>
                    <View style={{justifyContent: 'space-around'}}>
                        {
                            data.isTicket ?
                                <TouchableOpacity
                                    style={{backgroundColor: commonStyle.lightGreen, borderRadius: 5}}
                                    onPress={()=>{Toast.show('还未上映呦 😢️');}}
                                >
                                    <Text style={styles.textBtn}>预售</Text>
                                </TouchableOpacity> :
                                <TouchableOpacity
                                    style={{backgroundColor: commonStyle.darkOrange, borderRadius: 5}}
                                    onPress={()=>{Toast.show('不，不想看 ❤️');}}
                                >
                                    <Text style={styles.textBtn}>想看</Text>
                                </TouchableOpacity>
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: commonStyle.row,
        alignItems: commonStyle.center,
        borderBottomWidth: 0.5,
        borderBottomColor: commonStyle.lineColor,
        marginLeft: 10,
        paddingBottom: 10,
        marginTop: 10
    },
    img: {
        width: 50,
        height: 80,
    },
    rightContent: {
        marginHorizontal: 10,
        flexDirection: commonStyle.row,
        justifyContent: commonStyle.between,
        width: deviceInfo.deviceWidth - 70 - 50,
        flex: 1
    },
    text:{
        color: commonStyle.textBlockColor,
        paddingVertical: 6
    },
    textBtn:{
        paddingVertical: 5,
        paddingHorizontal: 10,
        color: commonStyle.white,
        fontSize: 13
    },
    text1:{
        color: commonStyle.textGrayColor,
        fontSize: 12
    },
    text2:{
        color: commonStyle.textGrayColor,
        fontSize: 12,
        paddingVertical: 6
    }
});
