/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// $FlowFixMe: Create in .flowconfig a mapper for !style
import '!style!css!postcss!less!../node_modules/elemental/less/elemental.less';
import './styles/index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
