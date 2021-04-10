const express = require('express')
const router = express.Router();
const database = require('../service/database');

import {
    getFollowedCryptos,
    addFollowedCrypto,
    deleteFollowedCrpto
} from '../service/followService'

router
    .route('/:username')
    .get(async (req, res) => {
        try {            
            const result = await getFollowedCryptos(req.params.username);
            res.status(200).json(result)
        } catch (error) {
            res.status(400).send(error)
        }
    })
    .post(async (req, res) => {
        try {
            await addFollowedCrypto(req.params.username, req.body.crypto_id)
            res.status(201).send(`Crypto ${req.body.crypto_id} added to ${req.params.username}'s followed cryptos`)
        } catch (error) {
            res.status(400).send(error)
        }     
    })

router
    .route('/:username/:crypto_id')
    .delete(async (req, res) => {
        try {
            const result = await deleteFollowedCrpto(req.params.username, req.params.crypto_id)
            if (result.affectedRows === 0) res.status(200).send(`Crypto ${req.params.crypto_id} was not followed`);
            else res.status(200).send(`Crypto ${req.params.crypto_id} deleted from ${req.params.username}'s followed cryptos`);
        } catch (error) {
            res.status(400).send(error)
        }     
    })

module.exports = router;
