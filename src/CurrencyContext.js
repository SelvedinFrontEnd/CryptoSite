// CurrencyContext.js
import React, { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [currencyIcon, setCurrencyIcon] = useState('$');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const setCurrency = (currency, icon, callback) => {
    setSelectedCurrency(currency);
    setCurrencyIcon(icon);
    if (callback && typeof callback === 'function') {
      callback(currency);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle('dark', !isDarkMode); // Toggle the 'dark' class based on the new isDarkMode value
  };

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, currencyIcon, setCurrency, isDarkMode, toggleDarkMode }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

