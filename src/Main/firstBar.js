import '../index.css'
import moonImage from './moon.png'; 
import sunImage from './white-sun.png';
import React, { useState } from 'react';
import { useCurrency } from '../CurrencyContext';

const CURRENCY_ICONS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  AUD: '$',
};

const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'AUD'];

const formatNumbers = (marketCap) => {
    if (marketCap === undefined || marketCap === null) {
      return 'N/A'; 
    }
  
    if (marketCap >= 1e12) {
      return (marketCap / 1e12).toFixed(2) + 'T';
    } else if (marketCap >= 1e9) {
      return (marketCap / 1e9).toFixed(2) + 'B';
    } else {
      return marketCap.toLocaleString();
    }
  };

  export default function FirstBar(props) {
    const { total, totalExchanges, totalMarketCap, total24hVolume } = props.totalData;
    const { toggleDarkMode, isDarkMode } = useCurrency();
  
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState('USD'); // Default to USD
  
    const { setCurrency } = useCurrency();
  
    const handleCurrencyChange = (currency) => {
      setSelectedCurrency(currency);
      setIsDropdownOpen(false);
      setCurrency(currency, null, (selectedCurrency) => {
        console.log('Selected Currency:', selectedCurrency);
      });
    };
  
    return (
      <div>
        <nav className={`first-bar ${isDarkMode ? 'dark' : ''}`}>
          <ul className={`first-b ${isDarkMode ? 'dark' : ''}`}>Cryptos:<span className='blue'>{total}</span></ul>
          <ul className={`first-b blue ${isDarkMode ? 'dark' : ''}`}>Exchanges:<span className='blue'>{totalExchanges}</span></ul>
          <ul className={`first-b blue ${isDarkMode ? 'dark' : ''}`}>MarketCap:
            <span className='blue'>
              {CURRENCY_ICONS[selectedCurrency]}{formatNumbers(totalMarketCap)}
            </span>
          </ul>
          <ul className={`first-b blue ${isDarkMode ? 'dark' : ''}`}>24h Vol:
            <span className='blue'>
              {CURRENCY_ICONS[selectedCurrency]}{formatNumbers(total24hVolume)}
            </span>
          </ul>
          <div
            className={`mrg-left first-b currency-container ${isDarkMode ? 'dark' : ''}`}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            Currency:
            <span className={`currency-icon ${isDarkMode ? 'cur-icon-dark' : ''}`}>
              {CURRENCY_ICONS[selectedCurrency]}
            </span>
            <span className={`cur ${isDarkMode ? 'cur-dark' : ''}`}>
              {selectedCurrency}
            </span>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <ul className={`dropdown-content ${isDarkMode ? 'dropdown-content-dark' : ''}`}>
                  {CURRENCIES.map((currency) => (
                    <li key={currency} onClick={() => handleCurrencyChange(currency)} className={`cur ${isDarkMode ? 'cur-sel-dark' : ''}`}>
                      <span className={`currency-icon ${isDarkMode ? 'cur-icon-dark' : ''}`}>
                        {CURRENCY_ICONS[currency]}
                      </span>
                      {currency}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            (WORKING ON!)
          </div>
          <img className="dark-mode" alt="mode icon" src={isDarkMode ? sunImage : moonImage} onClick={toggleDarkMode} />
        </nav>
      </div>
    );
  }
