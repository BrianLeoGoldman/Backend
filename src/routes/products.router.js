const express = require('express')
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

router.get("/", (req, res) => {
    console.log("This is the home page")
    storage.getAll()
        .then((response) => {
            res.render('home.handlebars', { products: response })
        })
        .catch(error => {
            res.status(500).send(error)
        })
})

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
            res.status(200).send(`Product with id ${response} added`)
        })
        .catch((error) => {
            res.status(500).send(`${error}`)
        })
})

router.put("/api/products/:pid", (req, res) => {
    const pid = parseInt(req.params.pid)
    const product = req.body
    console.log(`Product with id ${pid} to be updated`)
    storage.update(pid, product)
        .then((response) => {
            res.status(200).send(response)
        })
        .catch((error) => {
            res.status(500).send(`${error}`)
        })
})

router.delete("/api/products/:pid", (req, res) => {
    const pid = parseInt(req.params.pid)
    console.log(`Product with id ${pid} to be deleted`)
    storage.deleteById(pid)
        .then((response) => {
            res.status(200).send(response)
        })
        .catch((error) => {
            res.status(500).send(`${error}`)
        })
})

module.exports = router