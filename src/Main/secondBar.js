import React, { useState, useEffect, useRef } from 'react';
import { useCurrency } from '../CurrencyContext';
import WatchlistDropdown from './WatchlistDropdown'; // Import the WatchlistDropdown component

function SecondBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [coinData, setCoinData] = useState({ data: { coins: [], stats: {} } });
  const [watchlist, setWatchlist] = useState([]); // Updated to use useState
  const { toggleDarkMode, isDarkMode } = useCurrency();
  const dropdownRef = useRef(null);
  const watchlistDropdownRef = useRef(null);

  useEffect(() => {
    const options = {
      headers: {
        'x-access-token': 'coinrankingac6426055ddffb35c88b621d66b5a61377efc83d9c655028',
      },
    };

    fetch('https://api.coinranking.com/v2/coins', options)
      .then((response) => response.json())
      .then((result) => setCoinData(result));
  }, []);

  useEffect(() => {
    const filteredCoins = coinData.data.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredCoins);
  }, [searchTerm, coinData]);

  const handleCoinClick = (id) => {
    const coinElement = document.getElementById(`coin-${id}`);
    if (coinElement) {
      coinElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsWatchlistOpen(false);
    console.log('Watchlist items:', watchlist); // Log the watchlist here
  };

  const handleWatchlistClick = () => {
    setIsWatchlistOpen(!isWatchlistOpen);
    setIsDropdownOpen(false);
    console.log('Watchlist items:', watchlist); // Log the watchlist here
  };

  const handleStarClick = (coinId) => {
    // Check if the coinId is already in the watchlist
    if (watchlist.includes(coinId)) {
      // Remove the coinId from the watchlist
      const updatedWatchlist = watchlist.filter((id) => id !== coinId);
      setWatchlist(updatedWatchlist);
    } else {
      // Add the coinId to the watchlist
      setWatchlist((prevWatchlist) => [...prevWatchlist, coinId]);
    }
    console.log('Watchlist items:', watchlist); // Log the watchlist here
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }

    if (watchlistDropdownRef.current && !watchlistDropdownRef.current.contains(event.target)) {
      setIsWatchlistOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <nav className={`second-bar ${isDarkMode ? 'dark' : ''}`}>
        <h1 className="title" onClick={() => window.location.reload()}>BestCryptos</h1>
        <ul className="hov exchanges">Exchanges</ul>
        <ul className="hov products">Products</ul>
        <ul className="hov community">Community</ul>
        <ul className="hov learn">Learn</ul>
        <ul className="hov watchlist" onClick={handleWatchlistClick}>
          Watchlist
          {isWatchlistOpen && watchlist.length > 0 && (
            <WatchlistDropdown watchlist={watchlist} coinData={coinData} handleCoinClick={handleCoinClick} />
          )}
        </ul>
        <input
          className='search'
          placeholder='Search'
          value={searchTerm}
          onClick={handleSearchClick}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {isDropdownOpen && searchResults.length > 0 && (
          <div className="dropdown-menu2" ref={dropdownRef}>
            {searchResults.map((coin) => (
              <div key={coin.id} className={`search-result2 ${isDarkMode ? 'search-dark' : ''}`} onClick={() => handleCoinClick(coin.id)}>
                <img className="coin-icon2" alt={`${coin.name} icon`} src={coin.iconUrl} />
                {coin.name}
              </div>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
}

export default SecondBar;