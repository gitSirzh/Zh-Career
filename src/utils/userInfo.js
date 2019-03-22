/**
 * Created by jszh on 2018/12/29.
 */

/** 获取用户信息工具类 **/
import {AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';

let userInfo = null;

//根据信息验证用户是否登陆
function checkLogin(callback){
    if(userInfo){
        // var tokenInfo = userInfo.tokenInfo;
        // // console.log(tokenInfo);
        // let curTime = new Date().getTime();
        // if(curTime>tokenInfo['expireTime']){
        //     //token过期重新登录
        //     logout(()=>{
        //         push('login',Login,{});
        //     })
        // }
        // else{
        //     callback(userInfo);
        // }
        callback(userInfo);
    }
    else{
        //登陆
        Actions.login();
    }
}

//获取用户信息
function initUserInfo(callback) {
    AsyncStorage.getItem('userInfo',(e,r)=>{

        if(!e){
            userInfo = JSON.parse(r);
            // console.log(userInfo);
        }
        callback(userInfo);
    })
}
//执行存储用户信息
function saveUserInfo(callback){
    AsyncStorage.setItem('userInfo',JSON.stringify(userInfo),callback);
}

//存储用户登陆信息
function setUserTokenInfo(token,userId,headImage,mobile,expireTime,registerTime,userChannel){
    userInfo = userInfo?userInfo:{};
    userInfo.mobile = mobile;
    userInfo.userId = userId;
    userInfo.headImage=headImage;
    userInfo.tokenInfo = {
        token:token,
        expireTime:expireTime
    };
    userInfo.registerTime = registerTime;
    userInfo.userChannel = userChannel;
    saveUserInfo();
}

//存储用户搜索音乐记录
function setUserMusicInfo(music_id,xsong_name,xsinger_name,cover,url){
    userInfo = userInfo?userInfo:{};
    userInfo.musicData = userInfo.musicData?userInfo.musicData:[];
    userInfo.musicData.push({music_id:music_id,xsong_name:xsong_name,xsinger_name:xsinger_name,cover:cover,url:url});
    saveUserInfo();
}

//退出登陆（清除用户信息）
function logout(callback){
    AsyncStorage.removeItem("userInfo",e=>{
        if(!e){
            userInfo = null;
            callback();
        }
    })
}

export {userInfo,initUserInfo,checkLogin,setUserTokenInfo,setUserMusicInfo,logout}
