const express = require('express');
const router = express.Router();

import {
    getFollowedCryptos,
    addFollowedCrypto,
    deleteFollowedCrpto
} from '../service/followService';

import {
    getCoinsList
} from '../externalService/coinGeckoService';
import { getCurrentWallet } from '../service/cacheService';

router
    .route('/:username')
    .get(async (req, res) => {
        try {            
            const followed_cryptos = await getFollowedCryptos(req.params.username);
            const cryptos = await getCoinsList();
            const wallet = await getCurrentWallet(req.params.username);
            const filtered = cryptos.filter(crypto => followed_cryptos.find(followed => followed.crypto_id === crypto.id))
            const result = filtered.map(crypto => (
                {...crypto, 
                    held: wallet.find(coin => coin.crypto_id === crypto.id) 
                    ? wallet.find(coin => coin.crypto_id === crypto.id).ammount :
                     0
                }
            ))
            res.status(200).json(result)
        } catch (error) {
            console.log(errror);
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
    .route('/not/:username')
    .get(async (req, res) => {
        try {            
            const followed_cryptos = await getFollowedCryptos(req.params.username);
            const cryptos = await getCoinsList();
            const filtered = cryptos.filter(crypto => !followed_cryptos.find(followed => followed.crypto_id === crypto.id))
            res.status(200).json(filtered)
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
