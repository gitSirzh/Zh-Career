/**
 * Created by jszh on 2018/12/28.
 */
import {combineReducers} from 'redux'
import loading from './loading'
import router from './router'

const reducer = combineReducers({
    loading,
    router
});

export default reducer
