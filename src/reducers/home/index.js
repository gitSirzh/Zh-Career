/**
 * Created by jszh on 2018/12/28.
 */
import {combineReducers} from 'redux'

import custom from './custom'

// home 模块的reducer
const homeReducer = combineReducers({
  custom
})

export default homeReducer
