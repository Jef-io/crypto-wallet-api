const express = require('express')
const router = express.Router();

import {
    getWalletHistory,
    getCurrentWallet,
    cacheCryptoTransaction
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
    .route('/not/:username')
    .get(async (req, res) => {
        try {
            const wallet = await getCurrentWallet(req.params.username)
            const cryptos = await getCoinsList();
            const filtered = cryptos.filter(crypto => !wallet.find(coin => coin.crypto_id === crypto.id))
            res.status(200).send(filtered)
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

router
    .route('/store/:username')
    .post(async (req, res) => {
        try {
            const {crypto_id, ammount, value} = req.body;
            const wallet = await getCurrentWallet(req.params.username);
            if (wallet.find((crypto) => crypto.crypto_id === crypto_id)) {
                res.status(208).send('Vous avez déjà effectué des opérations/transactions avec cette crypto et ne pouvez donc pas la déclarer')
            } else {
                await cacheCryptoTransaction(req.params.username, crypto_id, ammount, value);
                res.status(201).send(`${ammount} ${crypto_id} déclarés avec succès`);
            }
        } catch (error) {
            res.status(400).send(error)
        }
    })

module.exports = router;