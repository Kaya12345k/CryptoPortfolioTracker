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

const CryptoList: React.FC<CryptoListCommProps> = ({ cryptocurrencies, onUpdate, onDelete }) => {
  // Function to calculate total portfolio value
  const calculateTotalValue = (cryptocurrencies: CryptoCurrency[]) => {
    return cryptocurrencies.reduce((acc, current) => acc + (current.currentPrice * current.amountHeld), 0);
  };

  const totalValue = calculateTotalValue(cryptocurrencies);

  return (
    <div>
      <h2>My Cryptocurrency Portfolio</h2>
      <h3>Total Portfolio Value: ${totalValue.toFixed(2)}</h3> {/* Displaying the total portfolio value */}
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

export default CryptoList;