/**
 * Created by jszh on 2018/11/26.
 * 封装 fetch请求
 */

import querystring from  'querystring'

/**
 * get 方法
 * @param url
 * @param headers
 * @param data
 * @param callback
 * @param eCallback
 * @returns {Promise.<TResult>}
 */
function zhGet({url,data={},callback,eCallback}) {
    var queryStr = querystring.stringify(data);

    if(queryStr.length>0) {
        url = url + '?'+ queryStr
    }
    var option = {
        method: 'GET',
    };
    fetch(url,option).then(res=>{
        return res.json();
    }).then(res=> {
        callback&&callback(res);
    }).catch(error=> {
        console.log(error);
        eCallback&&eCallback(error);
    })
}

/**
 * post 方法
 * @param url
 * @param headers
 * @param data
 * @param callback
 * @param eCallback
 * @returns {Promise.<TResult>}
 */
function zhPost({url,data={},callback,eCallback}) {
    var queryStr = querystring.stringify(data);
    if(queryStr.length>0) {
        url = url + '?'+ queryStr
    }

    var option = {
        method: 'POST',
    };
    fetch(url,option).then(res=>{
        return res.json();
    }).then(res=> {
        callback&&callback(res);
    }).catch(error=> {
        console.log(error);
        eCallback&&eCallback(error);
    })
}

export {zhGet,zhPost}
