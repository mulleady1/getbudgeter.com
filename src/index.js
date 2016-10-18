import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/app/App';
import debug from 'debug';

if (process.env.NODE_ENV === 'development') {
  window._debug = debug;
  // axios.defaults.baseURL = `http://${window.location.hostname}:5040`;
  // axios.defaults.withCredentials = true;
}

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.querySelector('#app'));
