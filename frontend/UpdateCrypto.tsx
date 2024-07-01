import React, { useState } from 'react';

interface UpdateCryptoFormProps {
    onFormSubmit: (crypto: { name: string; amount: number; price: number }) => void;
}

const UpdateCryptoForm: React.FC<UpdateCryptoFormProps> = ({ onFormSubmit }) => {
  const [cryptoName, setCryptoName] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [price, setPrice] = useState<number | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cryptoName || amount <= 0 || price <= 0) {
      alert('All fields are required and must be greater than 0');
      return;
    }
    onFormSubmit({ name: cryptoName, amount: Number(amount), price: Number(price) });
    setCryptoName('');
    setAmount('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
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
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.valueAsNumber)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.valueAsNumber)}
            required
          />
        </label>
      </div>
      <button type="submit">Update Cryptocurrency</button>
    </form>
  );
};

export default UpdateCryptoForm;