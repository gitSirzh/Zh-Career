/**
 * Created by jszh on 2018/12/28.
 */

// 这个reducer是用来做测试使用的，最简单的reducer
const custom = (state = 666, action = {}) => {
  switch (action.type) {
    case 'ADD':
      return state + 1;
    case 'REDUCE':
      return state - 1;
    default:
      return state
  }
}

export default custom
