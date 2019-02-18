/**
 * Created by jszh on 2018/12/28.
 */
import {handleActions} from 'redux-actions'
import type from '../../constants/actionType'

const initialState = {
    serialDetail: {}
};

const actions = {};

actions[type.READING_SERIAL_DETAIL + type.FETCH_SUCCESS_SUFFIX] = (state, action) => ({
    ...state,
    serialDetail: action.payload.data
});

const reducer = handleActions(actions, initialState);

export default reducer
