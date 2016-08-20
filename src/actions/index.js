/* @flow */

import type {
  RequestDataPayload,
  ReceiveDataPayload,
  ReceiveDataErrorPayload,
} from './data';
export * from './data';

export type FSA = {
  type: string,
  payload: RequestDataPayload|ReceiveDataPayload|ReceiveDataErrorPayload,
};
