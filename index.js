const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

const app = express()
const connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: '',
    database: ''
})

app.use(cors())
app.use(express.json())