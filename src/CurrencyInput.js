import React from 'react';
import countryList from './countryList';

const CurrencyInput = ({ currency, value, onChange, onSelectCurrency }) => {
  return (
    <div className="select-box">
      <img src={`https://flagcdn.com/48x36/${countryList[currency].toLowerCase()}.png`} alt="flag" />
      <select value={currency} onChange={onSelectCurrency}>
        {Object.keys(countryList).map(currency_code => (
          <option key={currency_code} value={currency_code}>{currency_code}</option>
        ))}
      </select>
      
    </div>
  );
};

export default CurrencyInput;
