/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createResumeStore } from './store';
import ResumeApp from './components/ResumeApp';
// $FlowFixMe: Create in .flowconfig a mapper for !style
import '!style!css!postcss!less!../node_modules/elemental/less/elemental.less';
import './styles/index.css';

ReactDOM.render(
  <Provider store={createResumeStore()}>
    <ResumeApp />
  </Provider>,
  document.getElementById('root')
);
