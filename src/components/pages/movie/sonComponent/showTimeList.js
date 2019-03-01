/**
 * Created by jszh on 2018/12/29.
 */
import React, {Component} from 'react'
import {ListView,StyleSheet} from 'react-native'
import {commonStyle} from '../../../../utils/commonStyle'
import ShowTimeCell from './showTimeCell'

export default class ShowTimeList extends Component {

    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        }
    }

    renderRow(rowData, sectionId, rowId) {
        return (
            <ShowTimeCell key={rowId} rowData={rowData}/>
        )
    }

    componentDidMount() {

    }

    // shouldComponentUpdate(nextProps,nextState){
    //     if(this.state.dataSource !== nextState.dataSource){
    //         return true;
    //     }
    //     return false;
    // }

    /**
     * 正在热映
     * @returns {*}
     */
    render() {
        let dataSource = this.state.dataSource.cloneWithRows(this.props.dataArr);
        return (
            <ListView
                style={styles.content}
                renderRow={this.renderRow}
                enableEmptySections
                dataSource={dataSource}
            />
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: commonStyle.white
    }
});
