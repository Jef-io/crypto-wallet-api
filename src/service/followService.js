const database = require('./database');

const getFollowedCryptos = async (username) => {
    const sqlRequest = `SELECT crypto_id from followed_cryptos WHERE username='${username}';`
    return new Promise((resolve, reject) => {
        database.request(sqlRequest, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

export {
    getFollowedCryptos
}