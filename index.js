/**
 * Sample React Native
 * https://github.com/facebook/react-native
 * @flow
 */

import { AppRegistry } from 'react-native';

// @TODO remove when RN upstream is fixed  去除指定(⚠),如果出现新的就在下面加上去
console.ignoredYellowBox = ['Warning: Failed propType: SceneView'];
console.ignoredYellowBox = ['Warning: isMounted(...) is deprecated'];
// console.ignoredYellowBox = ['Warning: Failed prop type'];

import App from './src/entrance/App';

//注册App容器
AppRegistry.registerComponent('ZhCareer', () => App);
