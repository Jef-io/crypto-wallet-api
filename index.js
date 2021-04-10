const express = require('express')
const cors = require('cors')

const follow = require('./src/routes/follow')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/follow', follow);

// app.get('/login', (req, res) => {
//     // console.log(req.body)
//     // res.send('COUCOU ici l\'api')
// })

// app.get('/follow/:username', async (req, res) => {
//     // try {
//     //     connection.query(`SELECT crypto_id from followed_cryptos WHERE username='${req.params.username}';`, (err, result) => {
//     //         if (err) throw err
//     //         res.status(200).json(result);
//     //     });
//     // } catch (error) {
//     //     res.status(400).send(err)
//     // }
//     try {
//         database.getCryptos(req.params.username, (err, results) => {
//             if (err) { res.send(500,"Server Error"); return; }
//             res.status(200).json(results)
//         })
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

// app.post('/follow/:username', (req, res) => {
//     // try {
//     //     const {username, crypto_id} = req.body;
//     //     connection.query(`INSERT INTO followed_cryptos (username, crypto_id) VALUES ('${username}','${crypto_id}');`, (err, result) => {
//     //         if (err) throw err
//     //         res.status(201).json(result);
//     //     })
//     // } catch (error) {
//     //     res.status(400).send(err)
//     // }
// })

// app.delete('/follow/:username/:crypto_id', (req, res) => {
// })

// app.get('/history/:username', (req, res) => {
// })

// app.post('/buy/:username', (req, res) => {
// })

// app.post('/sell/:username', (req, res) => {
// })

app.listen(3001, () => console.log('Listening on port 3001'))