/**
 * Created by jszh on 2019/2/14.
 */

import {apiConfig} from './config'
import {zhGet,zhPost} from './httpRequest'

const {BaseUrl} = apiConfig;

/**
 * getMyLikePlaylist((r)=>{
            if(r.playlist.trackCount <= 0){
                this.state.hasNext = false;
            }else {
                this.setState({curAllList:r.playlist.tracks,trackCount:r.playlist.trackCount,hasNext:false})
            }
        },{id:504349872,s:0,n:this.state.pageSize,t:0});
 * @param callback
 * @param data
 */
//获取我的喜欢音乐歌单
export function getMyLikePlaylist(callback,data){                     //====//   获取我的喜欢音乐歌单
    zhPost({
        url:`${BaseUrl}/v3/playlist/detail`,
        callback,
        data
    })
}

//根据ID获取播放地址
export function getByIdPlayerUrl(callback,data) {                      //====//    根据ID获取播放地址
    zhPost({
        url:`${BaseUrl}/song/enhance/player/url`,
        callback,
        data
    })
}

//根据ID获取歌词
export function getByIdPlayerLyric(callback,data) {                      //====//    根据ID获取歌词
    zhPost({
        url:`${BaseUrl}/song/lyric`,
        callback,
        data
    })
}

//云搜索歌曲
export function qCloudsearch(callback,data) {                           //====//    云搜索歌曲
    zhPost({
        url:`${BaseUrl}/cloudsearch/pc`,
        callback,
        data
    })
}
