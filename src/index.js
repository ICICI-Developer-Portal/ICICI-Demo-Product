// index.js - WEB
import React from 'react';
import 'react-app-polyfill/stable';
import 'react-app-polyfill/ie11';  
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();


