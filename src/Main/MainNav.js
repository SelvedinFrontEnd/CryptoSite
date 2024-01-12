import React, { useState, useRef, useEffect } from 'react';
import '../index.css';
import customize from "./equalizer.png";
import { useCurrency } from '../CurrencyContext';

export default function MainNav() {
  const { toggleDarkMode, isDarkMode } = useCurrency();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    name: true,
    price: true,
    change: true,
    listedAt: true,
    marketCap: true,
    sparkline: true,
  });

  const menuRef = useRef(null);

  const handleToggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleOptionToggle = (option) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }));
  };

  const handleClickOutsideMenu = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    if (isMenuVisible) {
      document.addEventListener('click', handleClickOutsideMenu);
    } else {
      document.removeEventListener('click', handleClickOutsideMenu);
    }

    return () => {
      document.removeEventListener('click', handleClickOutsideMenu);
    };
  }, [isMenuVisible]);

  return (
    <div>
      <nav className={`main-nav ${isDarkMode ? 'dark' : ''}`}>
        <ul className='crypt-title'>Crpytocurrencies</ul>
        <ul className={`customize ${isDarkMode ? 'cust-dark' : ''}`} onClick={handleToggleMenu}>
          <img className={`cust-icon ${isDarkMode ? 'cust-icon-dark' : ''}`} alt="customize icon" src={customize} />
          Customize
        </ul>
      </nav>

      {isMenuVisible && (
        <div className={`customization-menu ${isDarkMode ? 'menu-dark' : ''}`} ref={menuRef}>
          <label>
            <input
              type="checkbox"
              checked={selectedOptions.name}
              onChange={() => handleOptionToggle('name')}
            />
            Name
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedOptions.price}
              onChange={() => handleOptionToggle('price')}
            />
            Price
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedOptions.change}
              onChange={() => handleOptionToggle('change')}
            />
            Change
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedOptions.listedAt}
              onChange={() => handleOptionToggle('listedAt')}
            />
            ListedAt
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedOptions.marketCap}
              onChange={() => handleOptionToggle('marketCap')}
            />
            Market Cap
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedOptions.sparkline}
              onChange={() => handleOptionToggle('sparkline')}
            />
            Last 24hours
          </label>
        </div>
      )}
    </div>
  );
}
