const express = require('express')
const router = express.Router();

import {
    getCoinsList,
    getCoinHistory
} from "../externalService/coinGeckoService"

router
    .route('/')
    .get(async (req, res) => {
        try {
            const coins = await getCoinsList();
            res.status(200).send(coins)
        } catch (error) {
            res.status(400).send(error)
        }
    })
    
router
    .route('/:id/:days')
    .get(async (req, res) => {
        try {
            const coins = await getCoinHistory(req.params.id, req.params.days);
            res.status(200).send(coins)
        } catch (error) {
            res.status(400).send(error)
        }
    })

module.exports = router;