import fetch from 'node-fetch';

interface CryptoPriceResponse {
    [key: string]: {
        usd: number;
    };
}

async function fetchCryptoPrice(cryptoIds: string[]): Promise<CryptoPriceResponse> {
    try {
        const idsParam = cryptoIds.join(',');
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${idsParam}&vs_currencies=usd`);
        if (!response.ok) {
            throw new Error('Failed to fetch the crypto prices');
        }
        const data: CryptoPriceResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching crypto prices:', error);
        throw error;
    }
}

export async function updatePortfolioPrices(portfolio: {id: string, quantity: number}[]): Promise<{id: string, usdValue: number}[]> {
    const uniqueCryptoIds = Array.from(new Set(portfolio.map(item => item.id))); // Reduce the number of API calls by fetching unique IDs once
    const prices = await fetchCryptoPrice(uniqueCryptoIds);
    return portfolio.map(item => ({
        id: item.id,
        usdValue: (prices[item.id]?.usd ?? 0) * item.quantity, // Handle potentially missing price information safely
    }));
}