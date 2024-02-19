import React, { useState, useEffect } from 'react';
import countryList from './countryList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faRightLeft } from '@fortawesome/free-solid-svg-icons'

const App = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('PLN');
  const [toCurrency, setToCurrency] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState(null);
  const backendUrl = 'http://localhost:8080/exchange';

  useEffect(() => {
    getExchangeRate();
  }, [fromCurrency, toCurrency]);

  const getExchangeRate = async () => {
    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount,
          from: fromCurrency,
          to: toCurrency
        })
      });
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rate');
      }
      const data = await response.json();
      setExchangeRate(data.exchanged);
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      setExchangeRate(null);
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleCurrencyChange = (e) => {
    if (e.target.name === 'fromCurrency') {
      setFromCurrency(e.target.value);
    } else {
      setToCurrency(e.target.value);
    }
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
            <div className="select-box">
              <img src={`https://flagcdn.com/48x36/${countryList[fromCurrency].toLowerCase()}.png`} alt="flag" />
              <select name="fromCurrency" value={fromCurrency} onChange={handleCurrencyChange}>
                {Object.keys(countryList).map(currency_code => (
                  <option key={currency_code} value={currency_code}>{currency_code}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="icon" onClick={swapCurrencies}><FontAwesomeIcon onClick={swapCurrencies} icon={faRightLeft} /></div>
          <div className="to">
            <p>To</p>
            <div className="select-box">
              <img src={`https://flagcdn.com/48x36/${countryList[toCurrency].toLowerCase()}.png`} alt="flag" />
              <select name="toCurrency" value={toCurrency} onChange={handleCurrencyChange}>
                {Object.keys(countryList).map(currency_code => (
                  <option key={currency_code} value={currency_code}>{currency_code}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="exchange-rate">{exchangeRate ? `${amount} ${fromCurrency} = ${exchangeRate} ${toCurrency}` : 'Getting exchange rate...'}</div>
        <button onClick={getExchangeRate}>Get Exchange Rate</button>
      </form>
      <script src="https://kit.fontawesome.com/7070b0c049.js" crossorigin="anonymous"></script>
    </div>
  );
};

export default App;
