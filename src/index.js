import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CurrencyProvider } from './CurrencyContext';

ReactDOM.render(
  <React.StrictMode>
    <CurrencyProvider>
      <App />
    </CurrencyProvider>
  </React.StrictMode>,
  document.getElementById('root')
);