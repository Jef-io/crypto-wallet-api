const express = require('express')
const router = express.Router();

import {
    getFullHistory,
    getCryptoHistory,
    buyCrypto,
    sellCrypto
} from "../service/transactionService"

router
    .route('/:username')
    .get(async (req, res) => {
        try {
            const result = await getFullHistory(req.params.username)
            res.status(200).json(result)
        } catch (error) {
            res.status(400).send(error)
        }
    })

router
    .route('/:username/:crypto_id')
    .get(async (req, res) => {
        try {
            const result = await getCryptoHistory(req.params.username, req.params.crypto_id)
            res.status(200).json(result)
        } catch (error) {
            res.status(400).send(error)
        }
    })

router
    .route('/buy/:username')
    .post(async (req, res) => {
        try {
            const { crypto_id, ammount, value } = req.body;
            await buyCrypto(req.params.username, crypto_id, ammount, value)
            res.status(201).send(`${ammount} ${req.body.crypto_id} succesfully bought for ${req.params.username}`)
        } catch (error) {
            res.status(400).send(error)
        }
    })

router
    .route('/sell/:username')
    .post(async (req, res) => {
        try {
            const { crypto_id, ammount, value } = req.body;
            await sellCrypto(req.params.username, crypto_id, ammount, value)
            res.status(201).send(`${ammount} ${req.body.crypto_id} succesfully sold for ${req.params.username}`)
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    })

module.exports = router;