/**
 * Created by jszh on 2018/12/29.
 */

import {createAction} from 'redux-actions'
import type from '../../constants/actionType'

import chatAction from '../../actionCreators/find/chat'

const openChat = createAction(type.OPEN_CHAT, chatAction.chatList);

const increase = createAction(type.CHAT_INCREASES);

const reduce = createAction(type.CHAT_REDUCE);

const actionCreators = {
    openChat,
    increase,
    reduce
};

export default {actionCreators}
