const express = require('express')
const Storage = require('../dao/storageFS.js')
const router = express.Router()
const socketIo = require('socket.io')
const io = socketIo()
const storage = new Storage('products.json')

// Router middleware
router.use((req, res, next) => {
    const date = new Date().toLocaleString()
    console.log('Views router activated: ', date)
    next()
})

// Endpoints
router.get("/realtimeproducts", (req, res) => {
    storage.getAll()
        .then((response) => {
            res.render('realTimeProducts.hbs', { products: response })
        })
        .catch((error) => {
            res.status(500).send(error)
        })
})


module.exports = router