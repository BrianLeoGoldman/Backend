const express = require('express')
const mongoose = require('mongoose')
const http = require('http')
const path = require('path')
const handlebars = require('express-handlebars')
const socketIo = require('socket.io')
const productsRouter = require("./routes/products.router.js")
const productsMongoRouter = require("./routes/productsMongo.router.js")
const usersMongoRouter = require("./routes/usersMongo.router.js")
const cartRouter = require("./routes/carts.router.js")
const viewsRouter = require("./routes/views.router.js")
const Storage = require('./dao/storageFS.js')
const storage = new Storage('products.json')
const app = express()
const httpServer = http.createServer(app)
const io = socketIo(httpServer)
const PORT = 8080

// HANDLEBARS
app.engine('handlebars', handlebars.engine())

// SERVER SETTINGS
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// MONGO ATLAS CONNECTION
mongoose.connect('mongodb+srv://leonel89011:NH1FG7njdGNQ0xII@cluster0.f4euppj.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connection to Mongo Atlas database established')
    })
    .catch((error) => {
        console.log('Error when connecting to Mongo Atlas database: ' + error)
    })

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public/')))
app.use("/", productsRouter)
app.use("/", productsMongoRouter)
app.use("/", usersMongoRouter)
app.use("/", cartRouter)
app.use("/", viewsRouter)


io.on('connection', (socket) => {
    console.log("A new connection has been established")

    socket.on('delete-product', (productId) => {
        storage.deleteById(productId)
            .then(() => {
                io.emit('product-deleted', productId)
            })
            .catch((error) => {
                io.emit('error', error)
            })
    })

    socket.on('add-product', (product) => {
        storage.save(product)
            .then((id) => {
                io.emit('product-added', { ...product, id: id })
            })
            .catch((error) => {
                io.emit('error', error)
            })
    })
})

httpServer.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${httpServer.address().port}`)
})