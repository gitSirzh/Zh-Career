import { AppRegistry } from 'react-native';

// @todo remove when RN upstream is fixed
console.ignoredYellowBox = ['Warning: Failed propType: SceneView']

import App from './src/entrance/App';

//注册App容器
AppRegistry.registerComponent('ZhCareer', () => App);
