/* @flow */

import type {
  RequestDataPayload,
  ReceiveDataPayload,
  ReceiveDataErrorPayload,
} from './data';
import type {
  SetPreferredKeywordsPayload,
} from './options';
export * from './data';
export * from './options';

export type FSA = {
  type: string,
  payload:
    RequestDataPayload |
    ReceiveDataPayload |
    ReceiveDataErrorPayload |
    SetPreferredKeywordsPayload,
};
