/* @flow */

import type { FSA } from './index';

export const REQUEST_DATA = 'REQUEST_DATA';
export type RequestDataPayload = {
  language: string,
};
export const requestData = (payload: RequestDataPayload): FSA => ({
  type: REQUEST_DATA,
  payload,
});

export const RECEIVE_DATA = 'RECEIVE_DATA';
export type ReceiveDataPayload = {
  json: any,
};
export const receiveData = (payload: ReceiveDataPayload): FSA => ({
  type: RECEIVE_DATA,
  payload,
});

export const RECEIVE_DATA_ERROR = 'RECEIVE_DATA_ERROR';
export type ReceiveDataErrorPayload = {
  error: Error,
};
export const receiveDataError = (payload: ReceiveDataErrorPayload): FSA => ({
  type: RECEIVE_DATA_ERROR,
  payload,
});

export const fetchData = (
  language: string = 'en'
): (dispatch: Function) => Promise<any> =>
  (dispatch) => {
    dispatch(requestData({language}))
    return fetch(`/data/resume.${language}.json`)
    .then(res => res.status < 400 ?
      res.json() :
      Promise.reject(new Error(`Error response status: ${res.status}`))
    )
    .then(json => {
      dispatch(receiveData({json}))
      return json;
    })
    .catch(error => dispatch(receiveDataError({error})));
  };
