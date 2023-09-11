const express = require('express')
const Storage = require('../dao/storageCartMongo.js')

const router = express.Router()

const storage = new Storage()

// Router middleware
router.use((req, res, next) => {
    const date = new Date().toLocaleString()
    console.log('Carts Mongo router activated: ', date)
    next()
})

// Endpoints

router.get("/api/cartsMongo/:cid", (req, res) => {
    const { cid } = req.params
    console.log(`Cart with id ${cid} has been requested`)
    storage.getById(cid)
        .then((response) => {
            res.status(200).send(response)
        })
        .catch((error) => {
            res.status(500).send(`${error}`)
        })
})

router.post("/api/cartsMongo", (req, res) => {
    // TODO: creates the cart but it is not adding anything!!!
    const cart = req.body
    console.log(`Amount of products in the cart to be added: ${cart.length}`)
    storage.save(cart)
        .then((response) => {
            res.status(200).send(response)
        })
        .catch((error) => {
            res.status(500).send(`${error}`)
        })
})

router.put("/api/cartsMongo/:cid", (req, res) => {
    const { cid } = req.params
    const products = req.body
    console.log(cid)
    console.log(products)
    storage.updateWithProducts(cid, products)
        .then((response) => {
            if (response === null) {
                res.status(404).send(`There is no cart with id ${cid}`)
                return
            }
            console.log("Cart exists!")
            res.status(200).send(response)
        })
        .catch((error) => {
            res.status(500).send(`${error}`)
        })
})

module.exports = router