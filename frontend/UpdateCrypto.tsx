import React, { useState } from 'react';

interface CryptoFormData {
    onFormSubmit: (cryptoData: { name: string; amount: number; currentPrice: number }) => void;
}

const CryptoUpdateForm: React.FC<CryptoformData> = ({ onFormSubmit }) => {
  const [cryptoName, setCryptoName] = useState<string>('');
  const [cryptoAmount, setCryptoAmount] = useState<number | ''>('');
  const [cryptoPrice, setCryptoPrice] = useState<number | ''>('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cryptoName || cryptoAmount <= 0 || cryptoPrice <= 0) {
      alert('All fields are required and must be positive values.');
      return;
    }
    onFormSubmit({ name: cryptoName, amount: Number(cryptoAmount), currentPrice: Number(cryptoPrice) });
    clearFormFields();
  };

  const clearFormFields = () => {
    setCryptoName('');
    setCryptoAmount('');
    setCryptoPrice('');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label>
          Cryptocurrency Name:
          <input
            type="text"
            value={cryptoName}
            onChange={(e) => setCryptoName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Amount (in Units):
          <input
            type="number"
            value={cryptoAmount}
            onChange={(e) => setCryptoAmount(e.target.valueAsNumber)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Current Price (USD):
          <input
            type="number"
            value={cryptoPrice}
            onChange={(e) => setCryptoPrice(e.target.valueAsNumber)}
            required
          />
        </label>
      </div>
      <button type="submit">Update Cryptocurrency</button>
    </form>
  );
};

export default CryptoUpdateForm;