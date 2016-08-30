/* @flow */
/* eslint new-cap: 0 */

import {
  List,
  Map,
} from 'immutable';
import {
  SET_PREFERRED_KEYWORDS,
} from '../actions';
import type { FSA } from '../actions';

export type OptionsState = Map<string, any>;

export const initialState = Map({
  keywords: List.of('js', 'ql', 'es', 'react', 'script', 'apollo')
});

const reducer = (state: OptionsState = initialState, action: FSA) => {
  switch(action.type) {
    case SET_PREFERRED_KEYWORDS:
      return state.set('keywords', List(action.payload.keywords || []));
    default:
      return state;
  }
}

export default reducer;
