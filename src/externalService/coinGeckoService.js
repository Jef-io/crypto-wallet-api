import {
    getRequest
} from "./coinGeckoApiService"

const getCoinsList = async () => {
    try {
        const result = await getRequest('coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false');
        return result;
    } catch (error) {
        throw error;
    }
}

const getCoinHistory = async (id, days) => {
    try {
        if (days > 90) throw  '90 days is the limit.'
        const result = await getRequest(`coins/${id}/market_chart?vs_currency=eur&days=${days}&interval=daily`);
        return result;
    } catch (error) {
        throw error;
    }
}

export {
    getCoinsList,
    getCoinHistory
}