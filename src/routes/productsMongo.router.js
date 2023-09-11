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
    console.log("GET products")
    let limit = req.query.limit || 10
    let page = req.query.page || 1
    let query = req.query.query || null
    let sort = req.query.sort || null
    console.log(`Limit: ${limit}`)
    console.log(`Page: ${page}`)
    console.log(`Query: ${query}`)
    console.log(`Sort: ${sort}`)
    storage.getAll(limit, page, query, sort)
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