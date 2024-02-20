// App.js
import React, { useState } from 'react';
import CurrencyInput from './CurrencyInput';
import ExchangeRate from './ExchangeRate';
import useExchangeRate from './useExchangeRate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('PLN');
  const [toCurrency, setToCurrency] = useState('USD');

  const exchangeRate = useExchangeRate(fromCurrency, toCurrency, amount);

  const handleAmountChange = (e) => {
    if (/^\d*\.?\d*$/.test(e.target.value)) {
      setAmount(e.target.value);
    }
  };

  const handleCurrencyChange = (e) => {
    const { name, value } = e.target;
    name === 'fromCurrency' ? setFromCurrency(value) : setToCurrency(value);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="wrapper">
      <header>Currency Converter</header>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="amount">
          <p>Enter Amount</p>
          <input type="text" value={amount} onChange={handleAmountChange} />
        </div>
        <div className="drop-list">
          <div className="from">
            <p>From</p>
            <CurrencyInput
              currency={fromCurrency}
              value={amount}
              onChange={handleAmountChange}
              onSelectCurrency={handleCurrencyChange}
            />
          </div>
          <div className="icon" onClick={swapCurrencies}>
            <FontAwesomeIcon icon={faRightLeft} />
          </div>
          <div className="to">
            <p>To</p>
            <CurrencyInput
              currency={toCurrency}
              value={amount}
              onChange={handleAmountChange}
              onSelectCurrency={handleCurrencyChange}
            />
          </div>
        </div>
        <ExchangeRate amount={amount} fromCurrency={fromCurrency} exchangeRate={exchangeRate} toCurrency={toCurrency} />
        <button onClick={() => {}}>Get Exchange Rate</button>
      </form>
    </div>
  );
};

export default App;
