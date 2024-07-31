// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CryptoPortfolioTracker {
    struct CryptoCurrency {
        uint id;
        string name;
        uint amount;
        uint price;
        bool isActive;
    }

    mapping(uint => CryptoCurrency) private portfolio;
    uint private cryptoCount;

    // Events
    event CryptoAdded(uint id, string name, uint amount, uint price);
    event CryptoUpdated(uint id, uint amount, uint price);
    event CryptoDeleted(uint id);

    // Custom errors
    error CryptoNotFound(uint requestedId, uint maxId);

    // Add a new cryptocurrency to the portfolio
    function addCrypto(string memory name, uint amount, uint price) public {
        cryptoCount++;
        portfolio[cryptoCount] = CryptoCurrency(cryptoCount, name, amount, price, true);
        emit CryptoAdded(cryptoCount, name, amount, price);
    }

    // Update details of a cryptocurrency in the portfolio
    function updateCrypto(uint id, uint newAmount, uint newPrice) public {
        if(id > cryptoCount || !portfolio[id].isActive) revert CryptoNotFound(id, cryptoCount);
        
        portfolio[id].amount = newAmount;
        portfolio[id].price = newPrice;
        emit CryptoUpdated(id, newAmount, newPrice);
    }

    // Get details of a single cryptocurrency by its id
    function getCrypto(uint id) public view returns (CryptoCurrency memory) {
        if(id > cryptoCount || !portfolio[id].isActive) revert CryptoNotFound(id, cryptoCount);

        return portfolio[id];
    }

    // Calculate the total value of the active cryptocurrencies in the portfolio
    function getTotalPortfolioValue() public view returns (uint totalValue) {
        for(uint i = 1; i <= cryptoCount; i++) {
            if(portfolio[i].isActive) {
                totalValue += portfolio[i].amount * portfolio[i].price;
            }
        }
    }

    // Delete a cryptocurrency from the portfolio by marking it as inactive
    function deleteCrypto(uint id) public {
        if(id > cryptoCount || !portfolio[id].isActive) revert CryptoNotFound(id, cryptoCount);
        
        portfolio[id].isActive = false;
        emit CryptoDeleted(id);
    }

    // Get the total count of cryptocurrencies
    // Note: This still returns the count including the inactive ones for preserving id integrity
    function getCryptoCount() public view returns (uint) {
        return cryptoCount;
    }
}