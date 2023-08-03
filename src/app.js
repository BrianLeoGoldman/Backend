const express = require('express')
const path = require('path')
const productsRouter = require("./routes/products.router.js")
const app = express()
const PORT = 8080

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", productsRouter)

app.get("/", (req, res) => {
    console.log("We are in app.js")
    res.status(200).send("We are in app.js")
})

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`)
})