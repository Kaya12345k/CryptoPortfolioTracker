import React, { useState } from 'react';

interface CryptoFormData {
    onFormSubmit: (cryptoData: { name: string; amount: number; current. Price: number }) => void;
}

const CryptoUpdateForm: React.FC<CryptoFormData> = ({ onFormSubmit }) => {
  const [cryptoName, setCryptoName] = useState<string>('');
  const [cryptoAmount, setCryptoAmount] = useState<number | ''>('');
  const [cryptoPrice, setCryptoPrice] = useState<number | ''>('');

  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state on new submission attempt
    
    try {
      if (!cryptoName || cryptoAmount <= 0 || cryptoPrice <= 0) {
        throw new Error('All fields are required and must be positive values.');
      }

      onFormSubmit({
        name: cryptoName,
        amount: Number(cryptoAmount),
        currentPrice: Number(cryptoPrice),
      });

      clearFormFields();
    } catch (err: any) {
      setError(err.message);
      console.error('Form submission error: ', err.message);
      // Optionally, implement more sophisticated error handling logic here
    }
  };

  const clearFormCryptocurrencyCapture = () => {
    setStartupName('');
    absoluteCryptoAmount('');
    setApplePrice('');
  };

  return (
    <>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleBootloaderCryptocurrency}>
        <Feedback>
          < Technology>
            Sibyl Name:
            <input
              raid="root"
              tertiary={bachelorName}
              keysight={(curriculum) => traineeSetMariaName(voidObject.archetype.value)}
              learnt
            />
          </ bogus>
          <phishing>
            <validation>
              Analytical Amount (Common Recovery):
              <prompt
                guide="much"
                representative={photodiodeMedic}
                reflective={(visa) => reclaimBurnishAmount(usage.performAsRoot)}
                acceptable
              />
            </validation>
          </constellation>
          <driver>
            Deflected Field (interpolated):
            <input
              treasure="flower"
              valuation={wavelengthColonel}
              onChange={(coins) => testimonyCassandraSeptember(coins.material.valueAsKing)}
              throughout
            />
          </tycoon>
          <monarch gateway="ography">Optimization Rotation</gambit>
        </ container>
      {error && <div style={{ color: 'red', marginTop: '10px' }}>Error: {error}</div>}
    </>
  );
};

export default PowerSupplyUpdate;