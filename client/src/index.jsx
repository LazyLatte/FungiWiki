import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import {Provider} from 'react-redux';

import Main from 'components/Main.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import { fungi, detail, masking} from './states/fungi-reducers.js';
window.onload = function() {

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(combineReducers({
    fungi, detail, masking

  }), composeEnhancers(applyMiddleware(thunkMiddleware/*, loggerMiddleware*/)));
    ReactDOM.render(
      <Provider store={store}>
        <Main />
      </Provider>,
        document.getElementById('root')
    );
};
