const express = require('express')
const router = express.Router();
const database = require('../service/database');

import {
    getFollowedCryptos
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
            res.status(200).send('Super post')
        } catch (error) {
            res.status(400).send(error)
        }     
    })
    .delete(async (req, res) => {
        try {
            res.status(200).send('Super delete')
        } catch (error) {
            res.status(400).send(error)
        }     
    })

module.exports = router;
