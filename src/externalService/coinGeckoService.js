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
        const data = await getRequest(`coins/${id}/market_chart?vs_currency=eur&days=${days}&interval=daily`);
        let cryptoInfos = []
        for (const key in data.prices) {
            cryptoInfos.push({
                date: new Date(data.prices[key][0]).getUTCDate(),
                price: data.prices[key][1],
                // market_cap: data.market_caps[key][1],
                // total_volume: data.total_volumes[key][1]
            })
        }
        return cryptoInfos;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export {
    getCoinsList,
    getCoinHistory
}