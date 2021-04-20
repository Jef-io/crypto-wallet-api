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
            const wallet = await getCurrentWallet(req.params.username)
            if (history.length === 0) {
                res.status(204).send("No transactions")
            } else {
                const firstCacheTime = new Date(history[history.length - 1].date).getTime()
                const lastCacheTime = new Date(history[0].date).getTime()
                const diffTime = Math.abs(lastCacheTime - firstCacheTime)
                const timeInterval = diffTime/20;
                let walletInfo = []
    
                //Pour chaque crypto mise en cache
                //Remplir pour chaque intervalle sa valeur à partir du moment ou elle a été enregistrée
                for (const coinId in wallet) {
                    const coinCachedInfos = history.filter((cache) => cache.crypto_id === wallet[coinId].crypto_id)
                    for (const cachedId in coinCachedInfos) {
                        let index = Math.floor((coinCachedInfos[cachedId].date.getTime()-firstCacheTime)/timeInterval);
                        do {
                            walletInfo[index] = {...walletInfo[index], [coinCachedInfos[cachedId].crypto_id]: coinCachedInfos[cachedId].value}
                            index ++;
                            if ((walletInfo[index] && walletInfo[index][coinCachedInfos[cachedId].crypto_id])) break;
                        } while (index <= 20 );
                    }
                }
                let time=firstCacheTime;
                for (const key in walletInfo) {
                    let sum = 0;
                    for (const value in walletInfo[key]) {
                        sum += walletInfo[key][value];
                    }
                    const date = new Date(time);
                    walletInfo[key].price = sum;
                    walletInfo[key].date = date.getDay() + "-" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
                    time += timeInterval;
                }
                res.status(200).send(walletInfo)
            }
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