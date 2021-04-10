const database = require('./database');

import {
    cacheCryptoTransaction,
    checkCryptoAmmount,
    getLastCachedCryptoAmmount
} from "./cacheService"

const getCryptoHistory = async (username, crypto_id) => {
    const sqlRequest = `
        SELECT date, type, ammount from transactions 
        WHERE username='${username}' 
        AND crypto_id='${crypto_id}' 
        ORDER BY date DESC;`
    return new Promise((resolve, reject) => {
        database.request(sqlRequest, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

const getFullHistory = async (username) => {
    const sqlRequest = `
        SELECT date, type, ammount 
        FROM transactions WHERE username='${username}'
        ORDER BY date DESC;`
    return new Promise((resolve, reject) => {
        database.request(sqlRequest, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

const buyCrypto = async (username, crypto_id, ammount) => {
    try {
        const cached = await getLastCachedCryptoAmmount(username, crypto_id);
        await cacheCryptoTransaction(username, crypto_id, cached + ammount);
    } catch (err) {
        throw err
    }
    const sqlRequest = `INSERT INTO transactions 
                        (username, crypto_id, type, ammount) 
                        VALUES ('${username}', '${crypto_id}', 'buy', '${ammount}');`
    return new Promise((resolve, reject) => {
        database.request(sqlRequest, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

const sellCrypto = async (username, crypto_id, ammount) => {
    try {
        const cached = await checkCryptoAmmount(username, crypto_id, ammount)
        await cacheCryptoTransaction(username, crypto_id, (cached - ammount));
    } catch (error) {
        throw error
    }
    const sqlRequest = `INSERT INTO transactions 
                        (username, crypto_id, type, ammount) 
                        VALUES ('${username}', '${crypto_id}', 'sell', '${ammount}');`
    return new Promise((resolve, reject) => {
        database.request(sqlRequest, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

export {
    getCryptoHistory,
    getFullHistory,
    buyCrypto,
    sellCrypto
}