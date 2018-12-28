/**
 * Created by jszh on 2018/12/28.
 */
export default thunkMiddleware = extraArgument => {
  return ({getState, dispatch}) => next => action => {
    if (typeof action === 'function') {
      return action(getState, dispatch, extraArgument)
    }
    return next(action)
  }
}
