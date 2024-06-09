import React, { useState, useEffect } from 'react';

type CryptoAsset = {
  id: string;
  name: string;
  quantity: number;
}

const CryptoPortfolioTracker: React.FC = () => {
  const [cryptoAssets, setCryptoAssets] = useState<CryptoAsset[]>([]);

  const addCryptoAsset = (cryptoAsset: CryptoAsset) => {
    setCryptoAssets([...cryptoAssets, cryptoAsset]);
  };

  const updateCryptoAssetQuantity = (assetId: string, updatedQuantity: number) => {
    setCryptoAssets(cryptoAssets.map(asset =>
      asset.id === assetId ? { ...asset, quantity: updatedQuantity } : asset));
  };

  useEffect(() => {
    const initialCryptoAssets: CryptoAsset[] = [
      { id: 'btc', name: 'Bitcoin', quantity: 2 },
      { id: 'eth', name: 'Ethereum', quantity: 5 },
    ];
    setCryptoAssets(initialCryptoAssets);
  }, []);

  return (
    <div>
      <h1>Crypto Portfolio Tracker</h1>
      <div>
        {cryptoAssets.map(asset => 
          <div key={asset.id}>
            <span>{asset.name}: {asset.quantity}</span>
          </div>
        )}
      </div>
      <button onClick={() => addCryptoAsset({ id: 'ltc', name: 'Litecoin', quantity: 10 })}>
        Add Litecoin
      </button>
    </div>
  );
};

export default CryptoPortfolioTracker;