/**
 * Created by jszh on 2018/12/27.
 */
import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {commonStyle} from "../../../utils/commonStyle";
class User extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <Text>User</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#FFE4E1',
        justifyContent: commonStyle.center,
        alignItems:commonStyle.center
    },

});


export default User
