/* @flow */
/* eslint new-cap: 0 */

import {
  fromJS as jsToImmutable,
  Map,
} from 'immutable';
import {
  REQUEST_DATA,
  RECEIVE_DATA,
  RECEIVE_DATA_ERROR,
} from '../actions';
import type { FSA } from '../actions';

export type DataState = Map<string, ?(boolean|string|Error|Map<string, any>)>;

export const initialState = Map({
  loading: false,
  language: 'en',
  error: null,
  data: null,
});

const reducer = (state: DataState = initialState, action: FSA) => {
  switch (action.type) {
    case REQUEST_DATA:
      return state
        .set('loading', true)
        .set('language', action.payload.language || 'en');
    case RECEIVE_DATA:
      return state
        .set('loading', false)
        .set('data', jsToImmutable(action.payload.json || {}));
    case RECEIVE_DATA_ERROR:
      return state
        .set('loading', false)
        .set('error', action.payload.error || new Error('Unknown error'));
    default:
      return state;
  }
};

export default reducer;
