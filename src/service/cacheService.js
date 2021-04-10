const database = require('./database');

const getLastCachedCryptoAmmount = (username, crypto_id) => {
    const sqlRequest = `
        SELECT ammount 
        FROM cache 
        WHERE username='${username}' 
        AND crypto_id='${crypto_id}'
        ORDER BY date DESC
        LIMIT 1;`
    return new Promise((resolve, reject) => {
        database.request(sqlRequest, (err, result) => {
            if (err) reject(err);
            if (result.length === 0) resolve(0);
            resolve(result[0].ammount);
        })
    })
}

const checkCryptoAmmount = async (username, crypto_id, sellingAmmount) => {
    try {
        const ammount = await getLastCachedCryptoAmmount(username, crypto_id)
        if (ammount < sellingAmmount) throw `Not enough ${crypto_id} in ${username}'s wallet...`
        return ammount;
    } catch (error) {
        throw error
    }
}

const cacheCryptoTransaction = (username, crypto_id, ammount) => {
    const sqlRequest = `INSERT INTO cache 
                        (username, crypto_id, ammount) 
                        VALUES ('${username}', '${crypto_id}', '${ammount}');`
    return new Promise((resolve, reject) => {
        database.request(sqlRequest, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

const getWalletHistory = async (username) => {
    const sqlRequest = `
        SELECT crypto_id, ammount, date 
        FROM cache 
        WHERE username='${username}' 
        ORDER BY date DESC;`
    return new Promise((resolve, reject) => {
        database.request(sqlRequest, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

export {
    cacheCryptoTransaction,
    checkCryptoAmmount,
    getLastCachedCryptoAmmount,
    getWalletHistory
}