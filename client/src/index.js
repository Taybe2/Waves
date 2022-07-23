import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './routes';

import 'resources/styles/styles.css';

import { Provider } from 'react-redux';
import ReduxStore from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ReduxStore()}>
      <AppRoutes />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

