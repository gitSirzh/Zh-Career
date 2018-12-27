/**
 * Created by jszh on 2018/12/27.
 */
import React, {Component} from 'react'
import {StyleSheet, View, Image} from 'react-native'
import TabNavigator from 'react-native-tab-navigator'
import Home from '../components/pages/home/index_home'
import Music from '../components/pages/music/index_music'
import Movie from '../components/pages/movie/index_movie'
import User from '../components/pages/user/index_user'
import Icon from 'react-native-vector-icons/FontAwesome'
import {commonStyle} from '../utils/index_utils'
import deviceInfo from '../utils/deviceInfo'

export default class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'Home' //首次定位
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TabNavigator
                    tabBarStyle={{height: commonStyle.tabBarHeight, paddingBottom: deviceInfo.isIphoneX ? 34 : 0}}
                >
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Home'}
                        title="首页"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Icon name={'home'} size={22} color={commonStyle.textGrayColor}/>}
                        renderSelectedIcon={() => <Icon name={'home'} size={22} color={commonStyle.black}/>}
                        onPress={() => this.setState({ selectedTab: 'Home' })}>
                        <Home/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Music'}
                        title="音乐"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Icon name={'music'} size={20} color={commonStyle.textGrayColor}/>}
                        renderSelectedIcon={() => <Icon name={'music'} size={20} color={commonStyle.black}/>}
                        onPress={() => this.setState({ selectedTab: 'Music' })}>
                        <Music/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Movie'}
                        title="电影"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Icon name={'file-movie-o'} size={20} color={commonStyle.textGrayColor}/>}
                        renderSelectedIcon={() => <Icon name={'file-movie-o'} size={20} color={commonStyle.black}/>}
                        onPress={() => this.setState({ selectedTab: 'Movie' })}>
                        <Movie/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'User'}
                        title="我的"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Icon name={'user-o'} size={20} color={commonStyle.textGrayColor}/>}
                        renderSelectedIcon={() => <Icon name={'user-o'} size={20} color={commonStyle.black}/>}
                        onPress={() => this.setState({ selectedTab: 'User' })}>
                        <User/>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabText: {
        fontSize: 11,
        color: commonStyle.textGrayColor,
        marginBottom: 5
    },
    selectedTabText: {
        fontSize: 11,
        color: commonStyle.black,
        marginBottom: 5
    }
})
