/**
 * Created by jszh on 2018/12/28.
 */
import {handleActions} from 'redux-actions'

const defaultState = {}
const handlers = {}

const reducer = handleActions(handlers, defaultState)

export default reducer
