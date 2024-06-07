import React, { useState, useEffect } from 'react';

type CryptoCurrency = {
  id: string;
  name: string;
  amount: number;
}

const CryptoPortfolioApp: React.FC = () => {
  const [cryptos, setCryptos] = useState<CryptoCurrency[]>([]);

  const addCrypto = (crypto: CryptoCurrency) => {
    setCryptos([...cryptos, crypto]);
  };

  const updateCrypto = (id: string, newAmount: number) => {
    setCryptos(cryptos.map(crypto => crypto.id === id ? { ...crypto, amount: newAmount } : crypto));
  };

  useEffect(() => {
    const initialCryptos: CryptoCurrency[] = [
      { id: 'btc', name: 'Bitcoin', amount: 2 },
      { id: 'eth', name: 'Ethereum', amount: 5 },
    ];
    setCryptos(initialCryptos);
  }, []);

  return (
    <div>
      <h1>Crypto Portfolio Tracker</h1>
      <div>
        {cryptos.map(crypto => 
          <div key={crypto.id}>
            <span>{crypto.name}: {crypto.amount}</span>
          </div>
        )}
      </div>
      <button onClick={() => addCrypto({ id: 'ltc', name: 'Litecoin', amount: 10 })}>
        Add Litecoin
      </button>
    </div>
  );
};

export default CryptoPortfolioApp;