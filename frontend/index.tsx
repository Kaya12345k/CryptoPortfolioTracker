import fetch from 'node-fetch';

interface CryptoPriceResponse {
    [key: string]: {
        usd: number;
    };
}

async function fetchCryptoPrice(cryptoId: string): Promise<number> {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd`);
        if (!response.ok) {
            throw new Error('Failed to fetch the crypto price');
        }
        const data: CryptoPriceResponse = await response.json();
        return data[cryptoId].usd;
    } catch (error) {
        console.error('Error fetching crypto price:', error);
        throw error;
    }
}

export async function updatePortfolioPrices(portfolio: {id: string, quantity: number}[]): Promise<{id: string, usdValue: number}[]> {
    return Promise.all(
        portfolio.map(async (item) => {
            const price = await fetchCryptoPrice(item.id);
            return {
                id: item.id,
                usdValue: price * item.quantity,
            };
        })
    );
}