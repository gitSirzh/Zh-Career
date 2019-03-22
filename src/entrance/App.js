/**
 * Created by jszh on 2018/12/27.
 */

import React, {Component} from 'react';
import {View,Platform} from "react-native"
var TimerMixin = require('react-timer-mixin');

/**============状态管理器============**/
import store from '../store/index_store'
import {Provider, connect} from 'react-redux'
import {Scene, Router, Actions, Reducer, ActionConst, Modal, Stack, Lightbox} from "react-native-router-flux"
import Action from '../actions'
import {dispatch} from '../utils/allLog/dispatchLog'
import type from '../constants/actionType'
import {initUserInfo} from '../utils/userInfo'

/**============路由页============**/
import TabBar from './TabBar'

/**============组件页============**/
import Loading from '../utils/progressHUD/progressHUD'

import Launch from '../components/pages/demoPage/Launch'
import Error from '../components/pages/demoPage/Error'
import Mask from '../components/pages/demoPage/Mask'
import ModalView from '../components/pages/demoPage/ModalView'
import Login from '../components/pages/demoPage/Login'
import Login2 from '../components/pages/demoPage/Login2'
import Login3 from '../components/pages/demoPage/Login3'

import WebView from '../components/common/webView'

/**============action============**/
/**============首页============**/

/**============音乐============**/
import MusicPlayer from '../components/pages/music/musicPlayer'
import SearchMusic from '../components/pages/music/searchMusic'
/**============电影============**/
import MovieDetail from '../components/pages/movie/movieComment/movieDetail'
import MoviePlayer from '../components/pages/movie/movieComment/moviePlayer'
import TrailerList from '../components/pages/movie/movieComment/movieTrailerList'
// import MiniCommentList from '../components/pages/movie/comment/miniCommentList'
// import PlusCommentList from '../components/pages/movie/comment/plusCommentList'
import ActorList from '../components/pages/movie/actor/actorList'
import PictureList from '../components/pages/movie/picture/pictureList'

/**============我的============**/

import MessageBar from "../utils/messageBar/MessageBar"
import SplashScreen from "react-native-splash-screen";

//创建stateReducer
const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        action.type !== type.REACT_NATIVE_ROUTER_FLUX_SET_PARAMS ? dispatch(state)(action) : null;
        return defaultReducer(state, action)
    }
};

//获取SceneStyle
const getSceneStyle = () => ({
    backgroundColor: "white",
    shadowOpacity: 1,
    shadowRadius: 3,
});

//
const scenes = Actions.create(
    <Scene key="root">
        <Modal key="modal" hideNavBar>
            <Lightbox key="lightbox" hideNavBar={true}>

                <Stack key="init" back>
                    <Scene key="launch" component={Launch} hideNavBar/>

                    <Scene key="main" initial back={false} hideNavBar component={TabBar}/>

                    {/*================首页================*/}

                    {/*================音乐================*/}
                    {/*播放音乐*/}
                    <Scene key="musicPlayer" hideNavBar component={connect(
                        (state) => state.music.music,
                        Action.dispatch('music')
                    )(MusicPlayer)}/>
                    <Scene key="searchMusic" component={SearchMusic} hideNavBar/>
                    {/*================电影================*/}
                    <Scene key="movieDetail" hideNavBar component={connect(
                        (state) => state.movie.movieDetail,
                        Action.dispatch('movie')
                    )(MovieDetail)}/>
                    {/*播放视频*/}
                    <Scene key="moviePlayer" hideNavBar component={connect(
                        (state) => state.movie.movieList,
                        Action.dispatch('movie')
                    )(MoviePlayer)}/>
                    {/*视频列表*/}
                    <Scene key="trailerList" hideNavBar component={connect(
                        (state) => state.movie.movieList,
                        Action.dispatch('movie')
                    )(TrailerList)}/>
                    {/*演员列表*/}
                    <Scene key="actorList" hideNavBar component={connect(
                        (state) => state.movie.actor,
                        Action.dispatch('movie')
                    )(ActorList)}/>
                    {/*电影海报图片*/}
                    <Scene key="pictureList" hideNavBar component={connect(
                        state => state.movie.picture,
                        Action.dispatch('movie')
                    )(PictureList)}/>

                    <Scene key="webView" hideNavBar component={WebView}/>

                    {/*<Scene key="miniComment" hideNavBar component={connect(*/}
                    {/*(state) => state.movie.commentList,*/}
                    {/*Action.dispatch('movie')*/}
                    {/*)(MiniCommentList)}/>*/}

                    {/*<Scene key="plusComment" hideNavBar component={connect(*/}
                    {/*(state) => state.movie.commentList,*/}
                    {/*Action.dispatch('movie')*/}
                    {/*)(PlusCommentList)}/>*/}


                    {/*================我的================*/}


                    {/*/!** ############### demo组件 ############### **!/*/}

                    {/*<Scene key="demoPage" title="Demo集合" hideNavBar component={DemoPage}/>*/}

                    {/*<Scene key="register" title="Register" component={Register}/>*/}

                    {/*<Scene key="register2" title="Register2" component={Register}/>*/}

                    {/*<Scene key="pageOne" hideNavBar component={PageOne}/>*/}

                    {/*<Scene key="pageTwo" component={PageTwo}/>*/}

                    {/*<Scene key="echo" clone component={EchoView}*/}
                    {/*getTitle={({navigation}) => navigation.state.key}/>*/}

                    {/*<Scene key="enhancedListView" title ='测试ListView' component={connect(*/}
                    {/*(state) => state.movie.movieList,*/}
                    {/*Action.dispatch('movie')*/}
                    {/*)(EnhancedListViewTest)}/>*/}

                    {/*<Scene key="blur" title="blur" component={Blur}/>*/}

                    {/*<Scene key="testMessageBar" title="testMessageBar" component={TestMessageBar}/>*/}

                    {/*<Scene key="testAntdMobile" title="testAntdMobile" component={TestAntdMobile}/>*/}

                    {/*<Scene key="testOrientation" title="testOrientation" component={TestOrientation}/>*/}

                    {/*<Scene key='SwiperComp' title='Swiper' component={SwiperComp}/>*/}

                    {/*<Scene key='imgZoom' title='ImgZoom' component={ImgZoom}/>*/}

                    {/*<Scene key='testIcon' title='TestIcon' component={TestIcon}/>*/}

                    {/*<Scene key='testScrollableTabView' title='TestScrollableTabView' component={TestScrollableTabView}/>*/}

                    {/*<Scene key='testViewPager' title='TestViewPager' component={TestViewPager}/>*/}

                    {/*<Scene key="testRedux" component={TestRedux}*/}
                    {/*title="Replace"*/}
                    {/*type={ActionConst.REPLACE}/>*/}

                    {/*<Scene key="testLogDot" title='testLogDot' component={TestLogDot}/>*/}

                    {/*<Scene key="network" title='网络请求' component={*/}
                    {/*connect(*/}
                    {/*(state) => state.find.chat,*/}
                    {/*Action.dispatch('openChat')*/}
                    {/*)(Network)}/>*/}

                    {/*<Scene key="customComp" title='包装原生组件' component={CustomComp}/>*/}

                </Stack>

                <Scene key='loading' component={connect(
                    (state) => state.common.loading
                )(Loading)}/>
                <Scene key="error" component={Error}/>
                <Scene key="mask" component={Mask}/>

            </Lightbox>

            {/*主要*/}
            <Stack key="modalRoot" back>
                <Scene key="modalView" component={ModalView}/>
            </Stack>

            <Stack key="login" titleStyle={{alignSelf: "center"}}>
                <Scene component={Login} title="Login"
                       key="loginModal"
                       onExit={() => console.log("onExit")}
                       leftTitle="Cancel" onLeft={Actions.pop}/>
                <Scene
                    key="loginModal2"
                    component={Login2}
                    title="Login2"
                    backTitle="Back"
                    panHandlers={null}
                    duration={1}/>
                <Scene
                    key="loginModal3"
                    hideNavBar
                    component={Login3}
                    title="Login3"
                    panHandlers={null}
                    duration={1}/>
            </Stack>
        </Modal>
    </Scene>
);


//创建 App
class App extends Component {
    componentDidMount() {

        //注册用户本地信息
        initUserInfo(()=>{});

        //启动页
        if(Platform.OS === 'ios'){

        }else{
            TimerMixin.setTimeout(() => {
                SplashScreen.hide();
            },2000);
        }
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <Router
                    scenes={scenes}
                    createReducer={reducerCreate}
                    tintColor='white'
                    getSceneStyle={getSceneStyle}
                />
                <MessageBar/>
            </View>
        )
    }
}

//创建 store
const initApp = () => {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    )
};

//导出App
export default initApp
