const express = require('express')
const fs = require('fs')
const Storage = require('../../Utils/storage.js')

const router = express.Router()

const storage = new Storage('products.json')

// Router middleware
router.use((req, res, next) => {
    const date = new Date().toLocaleString()
    console.log('Products router activated: ', date)
    next()
})

// Endpoints
router.get("/api/products", (req, res) => {
    const limit = parseInt(req.query.limit)
    console.log("All products have been requested")
    storage.getAll()
        .then((response) => {
            if(limit && limit > 0) {
                const limitedResponse = response.slice(0, limit);
                res.status(200).send(limitedResponse)
            }
            else {
                res.status(200).send(response)
            }
        })
        .catch(error => {
            res.status(500).send(error)
        })
})

router.get("/api/products/:pid", (req, res) => {
    const pid = parseInt(req.params.pid)
    console.log(`Product with id ${pid} has been requested`)
    storage.getById(pid)
        .then((response) => {
            res.status(200).send(response)
        })
        .catch((error) => {
            res.status(500).send(error)
        })
})

router.post("/api/products", (req, res) => {
    const product = req.body
    console.log(`Product with title ${product.title} to be added`)
    storage.save(product)
        .then((response) => {
            res.status(200).send(response)
        })
        .catch((error) => {
            res.status(500).send(`${error}`)
        })
})

router.put("api/products/:pid", (req, res) => {

})

module.exports = router