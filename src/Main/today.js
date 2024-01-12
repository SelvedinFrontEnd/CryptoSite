import '../index.css';
import { useCurrency } from '../CurrencyContext';
import { CURRENCY_ICONS } from '../CURRENCY_ICONS';

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

export default function Today(props) {
  const { totalMarketCap } = props.totalData;
  const { selectedCurrency } = useCurrency();
  const { isDarkMode } = useCurrency();

  return (
    <>
      <p className={`today ${isDarkMode ? 'dark' : ''}`}>
        The global crypto market cap is:
        <span className='blue'>
          {CURRENCY_ICONS[selectedCurrency]}{formatNumbers(totalMarketCap)}
        </span>
      </p>
    </>
  );
}