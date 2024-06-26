import React, { useState } from 'react';

type AddCryptoProps = {
  onAddCrypto: (cryptoName: string, quantity: number, currentPrice: number) => void;
};

const AddCryptoForm: React.FC<AddCryptoProps> = ({ onAddCrypto }) => {
  const [cryptoName, setCryptoName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault(); 
    
    onAddCrypto(cryptoName, Number(quantity), Number(currentPrefix));

    // Reset form fields
    setCryptoName('');
    setQuantity('');
    setCurrentPrice('');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="cryptoName">Cryptocurrency Name:</label>
        <input
          id="cryptoName"
          value={cryptoName}
          onChange={(event) => setCryptoName(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="quantity">Amount:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="currentPrice">Price:</label>
        <input
          type="number"
          id="currentPrice"
          value={currentPrice}
          onChange={(event) => setCurrentPrice(event.target.value)}
          required
        />
      </div>
      <button type="submit">Add Cryptocurrency</button>
    </form>
  );
};

export default AddCryptoForm;