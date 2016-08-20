/* @flow */
/* eslint new-cap: 0 */

import { Map } from 'immutable';
import type { FSA } from '../actions';

export type DataState = Map<string, any>;

export const initialState = Map();

const reducer = (state: DataState, action: FSA) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
