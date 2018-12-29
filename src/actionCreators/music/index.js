/**
 * Created by jszh on 2018/12/29.
 */
import {getFetch, postFetch} from '../../utils/network/request/HttpExtension'
import {PATH} from '../../constants/urls'
import {ApiSource} from '../../constants/commonType'

const musicIdList = params => getFetch(PATH.MUSIC_ID_LIST, params)
const musicDetail = params => getFetch(`${PATH.MUSIC_DETAIL}${params}`, params)
const musicList = (year, month, params) => getFetch(`${PATH.MUSIC_LIST}${year}-${month}`, params)
const xiamiMusic = params => getFetch(`${PATH.MUSIC_XIAMI_MUSIC}${params}`, {}, ApiSource.MIAMIMUSIC)

export default {
  musicIdList,
  musicDetail,
  musicList,
  xiamiMusic
}
