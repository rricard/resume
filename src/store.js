/* @flow */
import { createStore } from 'redux';
import resumeAppReducer, {
  initialState,
} from './reducer';

export const createResumeStore = () =>
  createStore(
    resumeAppReducer,
    initialState,
    window.devToolsExtension && window.devToolsExtension()
  );
