/**
 * Created by jszh on 2018/12/29.
 */
import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image, ListView, StyleSheet} from 'react-native'
import {commonStyle} from '../../../../utils/commonStyle'
import {BaseComponent} from '../../../base/baseComponent'
import Icon from 'react-native-vector-icons/Ionicons'
import {Actions} from 'react-native-router-flux'

export default class TrailerList extends BaseComponent {

    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        }
    }

    navigationBarProps() {
        return {
            title: '预告片&拍摄花絮',
            titleStyle: {
                color: commonStyle.white
            },
            leftIcon: {
                name: 'ios-arrow-back',
                size: 26,
                color: commonStyle.white
            },
            navBarStyle: {
                backgroundColor: commonStyle.inkBlack,
            }
        }
    }

    componentDidMount() {
        this.props.getTrailerList({pageIndex: 1, movieId: this.props.id})
    }

    renderRow(rowData, sectionId, rowId) {
        let h, m, s;
        h = parseInt(rowData.length/3600);
        m = parseInt(rowData.length%3600/60);
        s = parseInt(rowData.length%60);
        return (
            <TouchableOpacity style={styles.cellStyle}
                              onPress={() => Actions.moviePlayer({url: rowData.url, title: rowData.title})}>
                <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: commonStyle.clear}}>
                    <Image style={styles.img} source={{uri: rowData.image}}/>
                    <View style={{position: commonStyle.absolute}}>
                        <Icon name={'ios-play'} size={25} color={commonStyle.white}/>
                    </View>
                </View>
                <View style={{paddingHorizontal: 10, flex: 1, height: 60, justifyContent: commonStyle.around}}>
                    <Text style={{
                        fontSize: 15,
                        color: commonStyle.textBlockColor,
                        fontWeight: 'bold'
                    }}>{rowData.title}</Text>
                    <Text style={{color: commonStyle.textGrayColor}}>{`片长：${h}时${m}分${s}秒`}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    _render() {
        let dataArr = this.props.trailerList || [];
        let dataSource = this.state.dataSource.cloneWithRows(dataArr);
        return (
            <ListView
                style={styles.container}
                dataSource={dataSource}
                renderRow={this.renderRow}
                enableEmptySections
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonStyle.white
    },
    cellStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        marginLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: commonStyle.lineColor
    },
    img: {
        width: 100,
        height: 60
    }
});
