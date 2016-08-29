/* @flow */

import graphql from 'graphql-anywhere';

import type { FSA } from './index';
import type { GraphQLDocument } from '../lib/graphqlTooling';


export const REQUEST_DATA = 'REQUEST_DATA';
export type RequestDataPayload = {
  language: string,
  query: GraphQLDocument,
  variables: any,
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

const propertyResolver = (fieldName, root) => root[fieldName];

export const fetchData = (
  query: GraphQLDocument,
  variables: any = {},
  language: string = 'en'
): (dispatch: Function) => Promise<any> =>
  (dispatch) => {
    dispatch(requestData({language, query, variables}))
    return fetch(`/data/resume.${language}.json`)
    .then(res => res.status < 400 ?
      res.json() :
      Promise.reject(new Error(`Error response status: ${res.status}`))
    )
    .then(json => {
      const resolvedData = graphql(
        propertyResolver,
        query,
        json,
        {},
        variables,
      );
      dispatch(receiveData({json: resolvedData}))
      return resolvedData;
    })
    .catch(error => dispatch(receiveDataError({error})));
  };
