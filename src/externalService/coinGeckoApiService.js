import axios from "axios"

const coinGeckInstance = axios.create({
    baseURL: "https://api.coingecko.com/api/v3/"
})

const getRequest = async (route) => {
    return coinGeckInstance.get(route)
    .then((res) => {
        return res.data;
    })
    .catch((e) => {
        console.log(e)
        throw e;
    })
}

export {
    getRequest
}