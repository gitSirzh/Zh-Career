/**
 * Created by jszh on 2018/12/28.
 */
import {combineReducers} from 'redux'
import me from './me'
import login from '../login'
import register from '../register'
const reducers = combineReducers({
  me,
  login,
  register
})

export default reducers
