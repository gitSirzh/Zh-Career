/**
 * Created by jszh on 2018/12/28.
 */
import {sendSystemLog} from '../utils/allLog/systemLog'
import type from '../constants/actionType'

var venilogMiddleware;
export default venilogMiddleware = () => {
    return ({getState, dispatch}) => next => action => {
        if (typeof action.payload === 'object' && action.payload.params) {
            if (action.type === type.REACT_NATIVE_ROUTER_FLUX_FOCUS) {
                sendSystemLog(action)
            } else if (action.type === type.REACT_NATIVE_ROUTER_FLUX_BACK) {
                sendSystemLog(action)
            }
        }
        next(action)
    }
}
