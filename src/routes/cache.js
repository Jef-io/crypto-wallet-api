const express = require('express')
const router = express.Router();

import {
    getWalletHistory
} from "../service/cacheService"

router
    .route('/:username')
    .get(async (req, res) => {
        try {
            const history = await getWalletHistory(req.params.username)
            res.status(200).send(history)
        } catch (error) {
            res.status(400).send(error)
        }
    })