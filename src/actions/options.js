/* @flow */

import type { FSA } from './index';

export const SET_PREFERRED_KEYWORDS = 'SET_PREFERRED_KEYWORDS';
export type SetPreferredKeywordsPayload = {
  keywords: Array<string>,
};
export const setPreferredKeywords = (payload: SetPreferredKeywordsPayload): FSA => ({
  type: SET_PREFERRED_KEYWORDS,
  payload,
})
