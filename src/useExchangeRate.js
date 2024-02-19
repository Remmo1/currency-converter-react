// useExchangeRate.js (Custom Hook for fetching exchange rate)
import { useState, useEffect } from 'react';

const useExchangeRate = (fromCurrency, toCurrency, amount) => {
  const [exchangeRate, setExchangeRate] = useState(null);
  const backendUrl = 'http://localhost:8080/exchange';

  useEffect(() => {
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

    getExchangeRate();
  }, [fromCurrency, toCurrency, amount]);

  return exchangeRate;
};

export default useExchangeRate;
