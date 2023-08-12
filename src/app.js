const express = require('express')
const http = require('http')
const path = require('path')
const handlebars = require('express-handlebars')
const socketIo = require('socket.io')
const productsRouter = require("./routes/products.router.js")
const cartRouter = require("./routes/carts.router.js")
const viewsRouter = require("./routes/views.router.js")
const Storage = require('../Utils/storage.js')
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

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public/')))
app.use("/", productsRouter)
app.use("/", cartRouter)
app.use("/", viewsRouter)


io.on('connection', (socket) => {
    console.log("A new connection has been established")

    socket.on('delete-product', (productId) => {
        console.log('The id of the product to remove is: ' + productId)
        storage.deleteById(productId)
            .then(() => {
                storage.getAll()
                    .then((response) => {
                        io.emit('products-update', { products: response })
                    })
                    .catch((error) => {
                        io.emit('error', error)
                    })
            })
            .catch((error) => {
                io.emit('error', error)
            })
    })

    socket.on('add-product', (product) => {
        storage.save(product)
            .then(() => {
                storage.getAll()
                    .then((response) => {
                        io.emit('products-update', { products: response })
                    })
                    .catch((error) => {
                        io.emit('error', error)
                    })
            })
            .catch((error) => {
                io.emit('error', error)
            })
    })
})

httpServer.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${httpServer.address().port}`)
})