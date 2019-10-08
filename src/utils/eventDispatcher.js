/**
 * Created by jszh on 2019/10/08.
 * 监听
 *
 * Example: ⬇️
 *
 * //======= 发送监听 =======//
 * send('sendMassage',{data:'消息'});
 *
 * //======= 接收监听 =======//
 * listen('sendMassage',(r)=>{alert(r.data)});
 *
 * //======= 移除监听 =======//
 * remove('sendMassage')
 */

import {DeviceEventEmitter} from 'react-native';

let Events = {};

//监听
function listen(eventName,handler){
    Events[eventName] = DeviceEventEmitter.addListener(eventName,handler);
}

//发送
function send(eventName,param){
    DeviceEventEmitter.emit(eventName,param);
}

//移除
function remove(eventName){
    Events[eventName] && Events[eventName].remove();
    delete Events[eventName];
}

export {listen,send,remove}
