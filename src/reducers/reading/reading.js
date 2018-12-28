/**
 * Created by jszh on 2018/12/28.
 */
import {handleActions} from 'redux-actions'
import type from '../../constants/actionType'
const initState = {
  bannerList: [],
  articleTypeList: []
}

const originalReducer = {}

originalReducer[type.READING_BANNER_LIST + type.FETCH_SUCCESS_SUFFIX] = (state, action) => ({
  ...state,
  bannerList: action.payload.data
})

originalReducer[type.READING_HOME_LIST + type.FETCH_SUCCESS_SUFFIX] = (state, action) => ({
  ...state,
  articleTypeList: action.payload.data
})

const reducer = handleActions(originalReducer, initState)

export default reducer
