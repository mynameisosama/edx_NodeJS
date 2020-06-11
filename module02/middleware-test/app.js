const express = require('express')
const app = express()

app.use((req, res, next) => {
    console.log(`${req.method}: ${req.url}`)
    next()
})

app.use((req, res, next) => {
    if(req.query.api_key) {
        next()
    } else {
        res.status(401).send({msg: 'Not authorized'})
    }
})

app.get('/', (req, res) => {
    res.send('hello world\n')
})

app.get('/accounts', (req, res) => {
    res.send('accounts\n')
})

app.get('/transactions', (req, res) => {
    res.send('transactions\n')
})

app.listen(3000)