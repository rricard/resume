/* @flow */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import resumeAppReducer, {
  initialState,
} from './reducer';

export const createResumeStore = () =>
  createStore(
    resumeAppReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      ...(window.devToolsExtension ? [window.devToolsExtension()] : []),
    ),
  );
