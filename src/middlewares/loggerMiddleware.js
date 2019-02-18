/**
 * Created by jszh on 2018/12/28.
 */
export default loggerMiddleware = () => {
    return ({getState, dispatch}) => next => action => {
        // console.log('before dispatch state:', getState())
        // console.log('action:', action)
        next(action)
        // console.log('after dispatch state:', getState())
    }
}
