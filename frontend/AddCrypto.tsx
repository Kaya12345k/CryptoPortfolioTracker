import React, { useState } from 'react';

type AddCryptoProps = {
  addCrypto: (name: string, amount: number, price: number) => void;
};

const AddCryptoForm: React.FC<AddCryptoProps> = ({ addCrypto }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    
    addCrypto(name, Number(amount), Number(price));

    setName('');
    setAmount('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Cryptocurrency Name:</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Cryptocurrency</button>
    </form>
  );
};

export default AddCryptoForm;