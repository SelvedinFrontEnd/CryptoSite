import React, { useState, useEffect } from 'react';
import { CurrencyProvider } from '../CurrencyContext';
import { useCurrency } from '../CurrencyContext';
import CoinItem from './CoinItem';

export default function MainBody(props) {
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const { isDarkMode } = useCurrency();

  const [selectedOptions, setSelectedOptions] = useState({
    name: true,
    price: true,
    change: true,
    listedAt: true,
    marketCap: true,
    sparkline: true,
  });

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const getSortIndicator = (key) => {
    if (sortKey === key) {
      return sortOrder === 'asc' ? '⌄' : '⌃'; // Up or down arrow
    }
    return null;
  };

  const sortedData = props.coinData.slice().sort((a, b) => {
    const aValue = sortKey ? a[sortKey] : null;
    const bValue = sortKey ? b[sortKey] : null;

    if (sortKey === 'name') {
      return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    } else if (sortKey === 'price' || sortKey === 'marketCap' || sortKey === 'change') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    } else if (sortKey === 'listedAt') {
      return sortOrder === 'asc' ? new Date(aValue) - new Date(bValue) : new Date(bValue) - new Date(aValue);
    } else {
      return 0;
    }
  });

  return (
    <CurrencyProvider>
      <nav className={`body-nav ${isDarkMode ? 'dark' : ''}`}>
        <ul className='crs' onClick={() => handleSort('#')}>
          # 
        </ul>
        <ul className='crs' onClick={() => handleSort('name')}>
          Name {getSortIndicator('name')} <span className={`info-icon ${isDarkMode ? 'inf-dark' : ''}`}>ℹ️</span>
          <div className={`info-popup ${isDarkMode ? 'popup-dark' : ''}`}>Coin Name</div>
        </ul>
        <ul className='crs' onClick={() => handleSort('price')}>
          Price {getSortIndicator('price')} <span className={`info-icon ${isDarkMode ? 'inf-dark' : ''}`}>ℹ️</span>
          <div className={`info-popup ${isDarkMode ? 'popup-dark' : ''}`}>Coin Price</div>
        </ul>
        <ul className='crs' onClick={() => handleSort('change')}>
          Change {getSortIndicator('change')} <span className={`info-icon ${isDarkMode ? 'inf-dark' : ''}`}>ℹ️</span>
          <div className={`info-popup ${isDarkMode ? 'popup-dark' : ''}`}>In UTXO models, the amount of cryptocurrency that is sent back to the owner after using unspent outputs to initiate the transaction process.</div>
        </ul>
        <ul className='crs' onClick={() => handleSort('listedAt')}>
          ListeAt {getSortIndicator('listedAt')} <span className={`info-icon ${isDarkMode ? 'inf-dark' : ''}`}>ℹ️</span>
          <div className={`info-popup ${isDarkMode ? 'popup-dark' : ''}`}>
            The amount of coins that are circulating in the market and are in public hands.
            It is analogous to the flowing shares in the stock market.
          </div>
        </ul>
        <ul className='crs' onClick={() => handleSort('marketCap')}>
          Market Cap {getSortIndicator('marketCap')} <span className={`info-icon ${isDarkMode ? 'inf-dark' : ''}`}>ℹ️</span>
          <div className={`info-popup ${isDarkMode ? 'popup-dark' : ''}`}>
            The total market value of a cryptocurrency's circulating supply.
            It is analogous to the free-float capitalization in the stock market.
            Market Cap = Current Price x Circulating Supply.
          </div>
        </ul>
        <ul className='crsr'>
          Last 24hours <span className={`info-icon ${isDarkMode ? 'inf-dark' : ''}`}>ℹ️</span>
          <div className={`info-popup ${isDarkMode ? 'popup-dark' : ''}`}>This chart represents the performance of the cryptocurrency over the last 24 hours. </div>
        </ul>
      </nav>

      {sortedData.map((coinData, index) => (
        <CoinItem
          key={index}
          index={index + 1}
          coinData={coinData}
          selectedOptions={selectedOptions}  // Pass the selectedOptions prop
        />
      ))}
    </CurrencyProvider>
  );
}