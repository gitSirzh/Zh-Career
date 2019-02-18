/**
 * Created by jszh on 2018/12/29.
 */

import {createAction} from 'redux-actions'
import type from '../../constants/actionType'
import actions from '../../actionCreators/picture'

const getPicList = createAction(type.PICTURE_LIST, actions.picList);
const getPicDetail = createAction(type.PICTURE_DETAIL, actions.picDetail);
const getPastList = createAction(type.PICTURE_PAST_LIST, actions.pastList);
const getGridList = createAction(type.PICTURE_GRID_LIST, actions.picGridList);

const actionCreators = {
    getPicList,
    getPicDetail,
    getPastList,
    getGridList
};

export default {actionCreators}
