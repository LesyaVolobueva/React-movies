import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';

const store = configureStore();
const mountApp = document.getElementById('root');
render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  mountApp
);
