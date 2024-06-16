import React from 'react';

interface CryptoCurrency {
  id: string;
  name: string;
  currentPrice: number;
  amountHeld: number;
}

interface CryptoListProps {
  cryptocurrencies: CryptoCurrency[];
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
}

const CryptoList: React.FC<CryptoListProps> = ({ cryptocurrencies, onUpdate, onDelete }) => {
  return (
    <div>
      <h2>My Cryptocurrency Portfolio</h2>
      <ul>
        {cryptocurrencies.map((crypto) => (
          <li key={crypto.id}>
            <span>{crypto.name} - Price: ${crypto.currentPrice} - Amount Held: {crypto.amountHeld}</span>
            <button onClick={() => onUpdate(crypto.id)}>Update</button>
            <button onClick={() => onDelete(crypto.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Crypto Artur;