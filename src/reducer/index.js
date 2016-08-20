/* @flow */
/* eslint new-cap: 0 */
import { Map } from 'immutable';
import { combineReducers } from 'redux-immutable';
import dataReducer, {
  initialState as initialDataState,
} from './data';

export const initialState = Map({
  data: initialDataState,
});

const resumeAppReducer = combineReducers({
  data: dataReducer,
});

export default resumeAppReducer;
