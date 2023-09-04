const express = require('express')
const Storage = require('../dao/storageFS.js')

const router = express.Router()

const storage = new Storage('cart.json')

// Router middleware
router.use((req, res, next) => {
    const date = new Date().toLocaleString()
    console.log('Cart router activated: ', date)
    next()
})

function isValid(req, res, next) {
    const cart = req.body
    req.products = cart.map((elem) => console.log(elem))
    if (cart.length > 0) {
        req.validCart = true
        next()
    }
    req.validCart = false
    next()
}

router.get("/api/carts/:cid", (req, res) => {
    const cid = parseInt(req.params.cid)
    console.log(`Cart with id ${cid} has been requested`)
    storage.getById(cid)
        .then((response) => {
            res.status(200).send(response)
        })
        .catch((error) => {
            res.status(500).send(`${error}`)
        })
})

//Endpoint
router.post("/api/carts", isValid, (req, res) => {
    if (!req.validCart) {
        res.status(400).send(`The cart has no products`)
        return
    }
    const cart = req.body
    console.log(`Amount of products in the cart to be added: ${cart.length}`)
    storage.save(cart)
        .then((response) => {
            // TODO: returns a 404 HTTP code
            res.status(200).send(response)
        })
        .catch((error) => {
            res.status(500).send(`${error}`)
        })
})

router.post("/api/carts/:cid/product/:pid", (req, res) => {
    const cid = parseInt(req.params.cid)
    const pid = parseInt(req.params.pid)
    storage.getById(cid)
        .then((response) => {
            if (response === null) {
                res.status(404).send(`There is no cart with id ${cid}`)
                return
            }
            console.log("Cart exists!")
            let newProductList = response.products
            const productToAdd = newProductList.find((prod) => prod.id === pid)
            if (productToAdd) {
                newProductList.map((prod) => prod.id === pid ? { id: pid, quantity: prod.quantity++ } : { ...prod })
            }
            else {
                newProductList.push({ id: pid, quantity: 1 })
            }
            const newCart = { id: cid, products: newProductList }
            storage.updateCart(newCart)
                .then((response) => {
                    res.status(200).send(response)
                })
                .catch((error) => {
                    res.status(500).send(`${error}`)
                })
        })
        .catch((error) => {
            res.status(500).send(`${error}`)
        })
})

module.exports = router