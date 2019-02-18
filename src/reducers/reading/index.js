/**
 * Created by jszh on 2018/12/28.
 */
import {combineReducers} from 'redux'
import reading from './reading'
import essay from './essay'
import serial from './serial'
import question from './question'

const reducers = combineReducers({
    reading,
    essay,
    serial,
    question
});

export default reducers
