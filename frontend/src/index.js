import React from 'react';
import { createRoot } from 'react-dom/client';
import 'normalize.css';
import './index.css';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { register } from './serviceWorker';
import './_metronic/assets/sass/style.scss'
import './_metronic/assets/sass/plugins.scss'
import './_metronic/assets/sass/style.react.scss'
import "core-js/stable";
import "regenerator-runtime/runtime";


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App tab='home' />
  </Provider>
);

register();