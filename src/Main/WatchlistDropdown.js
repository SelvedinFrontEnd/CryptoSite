import React from 'react';

function WatchlistDropdown({ watchlist, coinData, handleCoinClick }) {
  const watchlistCoins = coinData.data.coins.filter((coin) => watchlist.includes(coin.id));

  return (
    <div className="watchlist-dropdown">
      <span className="watchlist-title">Watchlist</span>
      <div className="watchlist-items">
        {watchlistCoins.map((coin) => (
          <div key={coin.id} className="watchlist-item" onClick={() => handleCoinClick(coin.id)}>
            <img className="coin-icon" alt={`${coin.name} icon`} src={coin.iconUrl} />
            {coin.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WatchlistDropdown;