/**
 * Created by jszh on 2018/12/27.
 */
import React, {Component} from 'react'
import {StyleSheet, View,Text} from 'react-native'
import {commonStyle} from "../../../utils/commonStyle";


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <Text>Home</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#FFEBCD',
        justifyContent: commonStyle.center,
        alignItems:commonStyle.center
    },

});


export default Home
