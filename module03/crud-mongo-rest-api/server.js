const express = require('express') 
const logger = require('morgan')
const errorhandler = require('errorhandler')
const mongodb= require('mongodb')
const bodyParser = require('body-parser')

const url = 'mongodb://localhost:27017'
const app = express()
app.use(logger('dev'))
app.use(bodyParser.json())

mongodb.MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
    if (error) return process.exit(1)
    const db = client.db('edx-course-db')
    app.get('/accounts', (req, res) => {
        db.collection('accounts')
          .find({}, {sort: {_id: -1}})
          .toArray((error, accounts) => {
            if (error) return next(error)
            res.send(accounts)
        })
    })
    app.post('/accounts', (req, res) => {
        let newAccount = req.body
        db.collection('accounts').insertOne(newAccount, (error, results) => {
            if (error) return next(error)
            res.send(results)
        })
    })
    app.put('/accounts/:id', (req, res) => {
        db.collection('accounts').updateOne({_id: mongodb.ObjectID(req.params.id)},{$set: req.body}, (error, results) => {
            if (error) return next(error)
            res.send(results)
        })
    })
    app.delete('/accounts/:id', (req, res) => {
        db.collection('accounts').removeOne({_id: mongodb.ObjectID(req.params.id)}, (error, results) => {
            if(error) return next(error)
            res.send(results)
        })
    })

    app.listen(3000, () => {
        console.log("Started Server at 3000\n")
    })
})