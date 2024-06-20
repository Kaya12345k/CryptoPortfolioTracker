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
  const calculateTotalValue = (cryptocurrencies: CryptoCurrency[]): number => {
    try {
      return cryptocurrencies.reduce((acc, current) => {
        if (typeof current.currentPrice !== 'number' || typeof current.amountHeld !== 'number') {
          throw new Error("Invalid data: 'currentPrice' and 'amountHeld' must be numbers.");
        }
        return acc + (current.currentPrice * current.amountHeld);
      }, 0);
    } catch (error) {
      console.error(error);
      return 0;
    }
  };

  const validateData = (data: CryptoCurrency[]): boolean => {
    return data.every((crypto) => crypto.id && typeof crypto.name === 'string');
  };

  if (!validateData(cryptocurrencies)) {
    console.error("Invalid cryptocurrencies data");
    return <div>Invalid data provided to the component</div>;
  }

  const totalValue = calculateTotalValue(cryptocurrencies);

  return (
    <div>
      <h2>My Cryptocurrency Portfolio</h2>
      <h3>Total Portfolio Value: ${totalValue.toFixed(2)}</h3>
      <ul>
        {cryptocurrencies.map((crypto) => (
          <li key={crypto.id}>
            <span>{crypto.name} - Price: ${crypto.currentPrice.toFixed(2)} - Amount Held: {crypto.amountHeld}</span>
            <button onClick={() => onUpdate(crypto.id)}>Update</button>
            <button onClick={() => onDelete(crypto.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CryptoList;