const express = require('express')
const router = express.Router();

import {
    getWalletHistory,
    getCurrentWallet
} from "../service/cacheService"

import {
    getCoinsList,
} from "../externalService/coinGeckoService"


router
    .route('/:username')
    .get(async (req, res) => {
        try {
            const wallet = await getCurrentWallet(req.params.username)
            const cryptos = await getCoinsList();
            const filtered = cryptos.filter(crypto => wallet.find(coin => coin.crypto_id === crypto.id))
            const result = filtered.map(crypto => ({...crypto, held: wallet.find(coin => coin.crypto_id === crypto.id).ammount }))
            res.status(200).send(result)
        } catch (error) {
            res.status(400).send(error)
        }
    })

router
    .route('/history/:username')
    .get(async (req, res) => {
        try {
            const history = await getWalletHistory(req.params.username)
            res.status(200).send(history)
        } catch (error) {
            res.status(400).send(error)
        }
    })

module.exports = router;