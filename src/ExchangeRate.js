// ExchangeRate.js
import React from 'react';

const ExchangeRate = ({ amount, fromCurrency, exchangeRate, toCurrency }) => {
  return (
    <div className="exchange-rate">
      {exchangeRate ? `${amount} ${fromCurrency} = ${exchangeRate} ${toCurrency}` : 'Getting exchange rate...'}
    </div>
  );
};

export default ExchangeRate;
