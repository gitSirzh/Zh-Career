/**
 * Created by jszh on 2018/12/28.
 */
import {handleActions} from 'redux-actions'

const tempReducer = (state = '测试数据', action = {}) => {
  switch (action.type) {
    case 'dadad':
      return state+action.value
    case 'test2':
      return state+'2'
    case 'test3':
      return state+'3'
    default:
      return state
  }
}

export default tempReducer
