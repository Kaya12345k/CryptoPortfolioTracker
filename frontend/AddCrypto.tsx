import React, { useState } from 'react';

type AddCryptoProps = {
    onAddCrypto: (cryptoName: string, quantity: number, currentPrice: number) => void;
};

const AddCryptoForm: React.FC<AddCryptoProps> = ({ onAddCrypto }) => {
    const [cryptoName, setCryptoName] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('');
    const [current (...)

export default AddCryptoForm;