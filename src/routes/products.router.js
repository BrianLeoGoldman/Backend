const express = require('express')

const router = express.Router()

const products = [{name: "Test product"}]

// Endpoints

router.get("/api/products", (req, res) => {
    console.log("We are in products.router.js")
    res.json(products)
})

router.get("/api/products/:pid", (req, res) => {
    const pid = parseInt(req.params.pid)
    console.log("We are in products.router.js")
    console.log(`The pid is ${pid}`)
    res.json(`The pid is ${pid}`)
})

module.exports = router