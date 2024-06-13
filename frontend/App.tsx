import React, { useState, useEffect } from 'react';

interface ICryptoAsset {
  id: string;
  name: string;
  quantity: number;
}

const CryptoAssetList: React.FC<{ assets: ICryptoAsset[] }> = ({ assets }) => (
  <div>
    {assets.map(asset => (
      <div key={asset.id}>
        <span>{`${asset.name}: ${asset.quantity}`}</span>
      </div>
    ))}
  </div>
);

const CryptoPortfolioTracker: React.FC = () => {
  const [cryptoPortfolio, setCryptoPortfolio] = useState<ICryptoAsset[]>([]);

  const handleAddCryptoAsset = (newAsset: ICryptoAsset) => {
    setCryptoPortfolio(previousPortfolio => [...previousPortfolio, newAsset]);
  };

  const handleUpdateCryptoAssetQuantity = (assetId: string, newQuantity: number) => {
    setCryptoPortfolio(previousPortfolio =>
      previousPortfolio.map(asset =>
        asset.id === assetId ? { ...asset, quantity: newQuantity } : asset)
    );
  };

  useEffect(() => {
    const initialCryptoPortfolio: ICryptoAsset[] = [
      { id: 'btc', name: 'Bitcoin', quantity: 2 },
      { id: 'eth', name: 'Ethereum', quantity: 5 },
    ];
    setCryptoPortfolio(initialCryptoPortfolio);
  }, []);

  return (
    <div>
      <h1>Crypto Portfolio Tracker</h1>
      <CryptoAssetList assets={cryptoPortfolio} />
      <button onClick={() => handleAddCryptoAsset({ id: 'ltc', name: 'Litecoin', quantity: 10 })}>
        Add Litecoin
      </button>
    </div>
  );
};

export default CryptoPortfolioTracker;