
require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const ShopItem = require('./models/shopItem');
const app = express()
const PORT = process.env.PORT


app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// console.log(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('Connected to shop db')
        app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
    })
    .catch((err) => {
        console.log(err)
    })

app.get('/', (req, res) => {
    ShopItem.find()
        .then((result) => {
            res.render('index', { data: result })
        })
        .catch((err) => console.log(err))
})

app.get('/add', (req, res) => {
    ShopItem.find()
        .then((result) => {
            res.render('add', { data: result })
        })
        .catch((err) => console.log(err))
})

app.post('/add', (req, res) => {
    console.log(req.body)
    const shopItem = new ShopItem({
        ProductName: req.body.product,
        Company: req.body.compagny,
        Price: req.body.price,
        ProductLink: req.body.url,
        Description: req.body.description
    })
    shopItem.save()
        .then((result) => {
            res.redirect('/add')
        })
        .catch((err) => console.log(err))
})

app.get('/add/:id', (req, res) => {
    console.log(req.params.id)
    ShopItem.findById(req.params.id)
        .then((result) => {
            res.render('shopItem', { data: result })
        })
        .catch((err) => console.log(err))
})

app.post('/add/:id/edit', (req, res) => {
    const updateItem = {
        ProductName: req.body.product,
        Company: req.body.compagny,
        Price: req.body.price,
        ProductLink: req.body.url,
        Description: req.body.description
    }
    console.log(updateItem)
    console.log(req.body)
    ShopItem.findByIdAndUpdate(req.params.id, updateItem)
        .then(result => res.redirect('/add'))
        .catch(err => console.log(err))
})

app.get('/add/:id/edit', (req, res) => {
    ShopItem.findById(req.params.id)
        .then(result => res.render('edit', { data: result }))
        .catch(err => console.log(err))
})

app.get('/add/:id/delete', (req, res) => {
    console.log(req.params.id)
    ShopItem.findByIdAndDelete(req.params.id)
        .then(result => res.redirect('/add'))
        .catch(err => console.log(err))
})