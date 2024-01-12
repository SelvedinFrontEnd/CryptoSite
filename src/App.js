import React from 'react';
import Main from './Main/Main';
import { CurrencyProvider } from './CurrencyContext';

export default function App() {
  return (
    <CurrencyProvider>
        <Main />
    </CurrencyProvider>
  );
}

