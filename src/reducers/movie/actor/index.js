/**
 * Created by jszh on 2018/12/28.
 */
import type from '../../../constants/actionType'
import {handleActions} from 'redux-actions'

const initialState = {
  actorData: []
}

const action = {}

action[type.MOVIE_ACTOR_LIST + type.FETCH_SUCCESS_SUFFIX] = (state, action) => {
  return {
    ...state,
    actorData: action.payload.types,
  }
}

const reducer = handleActions(action, initialState)

export default reducer
