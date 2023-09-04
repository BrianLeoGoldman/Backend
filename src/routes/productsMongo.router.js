const express = require('express')
const Storage = require('../dao/storageProductMongo.js')

const router = express.Router()

const storage = new Storage()

// Router middleware
router.use((req, res, next) => {
    const date = new Date().toLocaleString()
    console.log('Products Mongo router activated: ', date)
    next()
})

// Endpoints

router.get("/api/productsMongo", (req, res) => {
    console.log("All products have been requested")
    storage.getAll()
        .then((response) => {
            res.status(200).send(response)
        })
        .catch(error => {
            res.status(500).send(error)
        })
})

router.post("/api/productsMongo", (req, res) => {
    const product = req.body
    console.log(`Product with name ${product.name} to be added`)
    storage.save(product)
        .then((response) => {
            res.status(200).send(response)
        })
        .catch((error) => {
            res.status(500).send(`${error}`)
        })
})

router.put("/api/productsMongo/:id", (req, res) => {
    let { id } = req.params
    let productToReplace = req.body
    if (!productToReplace.name || !productToReplace.category || !productToReplace.price || !productToReplace.stock) {
        res.send({ status: 'Error', error: "Incomplete values" })
    }
    storage.update(id, productToReplace)
        .then((response) => {
            res.status(200).send(response)
        })
        .catch((error) => {
            res.status(500).send(`${error}`)
        })
})

router.delete("/api/productsMongo/:id", (req, res) => {
    let { id } = req.params
    storage.deleteById(id)
        .then((response) => {
            res.status(200).send(response)
        })
        .catch((error) => {
            res.status(500).send(`${error}`)
        })
})



module.exports = router