/* @flow */
/* eslint new-cap: 0 */
import { Map } from 'immutable';
import { combineReducers } from 'redux-immutable';
import dataReducer, {
  initialState as initialDataState,
} from './data';
import optionsReducer, {
  initialState as initialOptionsState,
} from './options';

export const initialState = Map({
  data: initialDataState,
  options: initialOptionsState,
});

const resumeAppReducer = combineReducers({
  data: dataReducer,
  options: optionsReducer,
});

export default resumeAppReducer;
