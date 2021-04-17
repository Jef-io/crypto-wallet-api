const express = require('express')
const cors = require('cors')

const follow = require('./src/routes/follow')
const transaction = require('./src/routes/transaction')
const cache = require('./src/routes/cache')
const coins = require('./src/routes/coins')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/follow', follow);
app.use('/transaction', transaction);
app.use('/cache', cache);
app.use('/coins', coins);


app.listen(3001, () => console.log('Listening on port 3001...'))