/**
 * Created by jszh on 2018/12/28.
 */
import type from '../../../constants/actionType'
import {handleActions} from 'redux-actions'

const defaultState = {
    pictureArr: [],
    pictureType: []
}

const handlers = {};

handlers[type.MOVIE_PICTURE_LIST + type.FETCH_SUCCESS_SUFFIX] = (state, aciton) => ({
    ...state,
    pictureArr: aciton.payload.images,
    pictureType: aciton.payload.imageTypes
});

const reducer = handleActions(handlers, defaultState);

export default reducer
