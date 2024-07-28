// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CryptoPortfolioTracker {
    struct CryptoCurrency {
        uint id;
        string name;
        uint amount;
        uint price;
    }

    mapping(uint => CryptoCurrency) private portfolio;
    
    uint private cryptoCount;

    event CryptoAdded(uint id, string name, uint amount, uint price);
    event CryptoUpdated(uint id, uint amount, uint price);

    // Custom error declarations
    error CryptoNotFound(uint requestedId, uint maxId);

    function addCrypto(string memory name, uint amount, uint price) public {
        cryptoCount++;
        portfolio[cryptoCount] = CryptoCurrency(cryptoCount, name, amount, price);
        emit CryptoAdded(cryptoCount, name, amount, price);
    }

    function updateCrypto(uint id, uint newAmount, uint newPrice) public {
        if(id > cryptoCount) revert CryptoNotFound(id, cryptoCount);
        
        portfolio[id].amount = newAmount;
        portfolio[id].price = newPrice;
        emit CryptoUpdated(id, newAmount, newPrice);
    }

    function getCrypto(uint id) public view returns (CryptoCurrency memory) {
        if(id > cryptoCount) revert CryptoNotFound(id, cryptoCount);

        return portfolio[id];
    }

    function getCryptoCount() public view returns (uint) {
        return cryptoCount;
    }
}