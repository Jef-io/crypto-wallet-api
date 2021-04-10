const database = require('./database');

const getFollowedCryptos = async (username) => {
    const sqlRequest = `SELECT crypto_id from followed_cryptos WHERE username='${username}';`
    return new Promise((resolve, reject) => {
        database.request(sqlRequest, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

const addFollowedCrypto = async (username, crypto_id) => {
    const sqlRequest = `INSERT INTO followed_cryptos (username, crypto_id) VALUES ('${username}', '${crypto_id}');`
    return new Promise((resolve, reject) => {
        database.request(sqlRequest, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

const deleteFollowedCrpto = async (username, crypto_id) => {
    const sqlRequest = `DELETE FROM followed_cryptos WHERE username='${username}' AND crypto_id='${crypto_id}';`
    return new Promise((resolve, reject) => {
        database.request(sqlRequest, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

export {
    getFollowedCryptos,
    addFollowedCrypto,
    deleteFollowedCrpto
}