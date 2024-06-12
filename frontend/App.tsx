import React, { useState, useEffect } from 'react';

// Define Types
type CryptoAsset = {
  id: string;
  name: string;
  quantity: number;
}

// Separate out the list component for better readability and maintenance
const CryptoAssetList: React.FC<{ assets: CryptoAsset[] }> = ({ assets }) => (
  <div>
    {assets.map(asset => (
      <div key={asset.id}>
        <span>{asset.name}: {asset.quantity}</span>
      </div>
    ))}
  </div>
);

const CryptoPortfolioTracker: React.FC = () => {
  const [cryptoAssets, setCryptoAssets] = useState<CryptoAsset[]>([]);

  const addCryptoAsset = (cryptoAsset: CryptoAsset) => {
    setCryptoAssets(prevAssets => [...prevAssets, cryptoAsset]);
  };

  const updateCryptoAssetQuantity = (assetId: string, updatedQuantity: number) => {
    setCryptoAssets(prevAssets =>
      prevAssets.map(asset =>
        asset.id === assetId ? { ...asset, quantity: updatedQuantity } : asset)
    );
  };

  // Initial crypto assets load
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
      <CryptoAssetList assets={cryptoAssets} />
      <button onClick={() => addCryptoAsset({ id: 'ltc', name: 'Litecoin', quantity: 10 })}>
        Add Litecoin
      </button>
    </div>
  );
};

export default CryptoPortfolioTracker;