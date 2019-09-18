import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/browser';

import store from './redux/configureStore';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import  './index.css';

// init sentry
if (process.env.NODE_ENV !== 'development') {
  Sentry.init({dsn: "https://bdb01d178cd04ff8aea41f6ecc513dbb@sentry.io/1727680"});
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
