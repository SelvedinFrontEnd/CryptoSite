import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useCurrency } from '../CurrencyContext';
import { CURRENCY_ICONS } from '../CURRENCY_ICONS';

function CoinItem(props) {
  const { iconUrl, name, price, marketCap, sparkline, change, listedAt } = props.coinData;
  const sparklineData = sparkline.map((value, index) => ({ value, name: index }));
  const changeClass = change >= 0 ? 'positive-change' : 'negative-change';
  const { selectedCurrency, isDarkMode } = useCurrency();
  const [isStarClicked, setIsStarClicked] = useState(false);

  const handleStarClick = () => {
    setIsStarClicked(!isStarClicked);
  };

  return (
    <div>
      <nav className={`main-body ${isDarkMode ? 'dark' : ''}`}>
        <div className="star-and-index" onClick={handleStarClick}>
          <div role="img" aria-label="star" className={`star ${isStarClicked ? 'clicked' : ''}`}>
            {isStarClicked ? '⭐' : '☆'}
          </div>
          <div className={`order ${isDarkMode ? 'dark' : ''}`}>{props.index}</div>
        </div>
        {props.selectedOptions.name && (
          <ul className='name'>
            <img className='coin-icon' alt={`${name} icon`} src={iconUrl} /> 
            {name}
          </ul>
        )}
        {props.selectedOptions.price && (
          <ul className='price'>
            <span>{CURRENCY_ICONS[selectedCurrency]}</span>{parseFloat(price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </ul>
        )}
        {props.selectedOptions.change && (
          <ul className={`change ${changeClass}`}>
            {change}
          </ul>
        )}
        {props.selectedOptions.listedAt && (
          <ul className='listed-at'>
            {listedAt}
          </ul>
        )}
        {props.selectedOptions.marketCap && (
          <ul className='market-cap'>
            {CURRENCY_ICONS[selectedCurrency]}{parseFloat(marketCap).toLocaleString()}
          </ul>
        )}
        {props.selectedOptions.sparkline && (
          <ul className='sparkline'>
            <ResponsiveContainer width='100%' height={50}>
              <LineChart data={sparklineData}>
                <XAxis dataKey='name' hide />
                <YAxis hide />
                <Tooltip />
                <Line type="linear" dataKey='value' stroke='#4CAF50' strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ul>
        )}
      </nav>
    </div>
  );
}

export default CoinItem;