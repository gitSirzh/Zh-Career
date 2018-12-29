/**
 * Created by jszh on 2018/12/27.
 */
import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'
class bannerCop extends Component {

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
                <Text>我是banner</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#FFEBCD',
    },

});


export default Home
