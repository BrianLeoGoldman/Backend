const express = require('express')
const mongoose = require('mongoose')
const http = require('http')
const path = require('path')
const handlebars = require('express-handlebars')
const socketIo = require('socket.io')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const FileStore = require('session-file-store')
const MongoStore = require('connect-mongo')
const productsRouter = require("./routes/products.router.js")
const cartRouter = require("./routes/carts.router.js")
const viewsRouter = require("./routes/views.router.js")
const productsMongoRouter = require("./routes/productsMongo.router.js")
const cartsMongoRouter = require("./routes/cartsMongo.router.js")
const usersMongoRouter = require("./routes/usersMongo.router.js")
const loginRouter = require("./routes/login.router.js")
const passportRouter = require("./routes/passport.router.js")
const jwtRouter = require("./routes/jwt.router.js")
const Storage = require('./dao/storageFS.js')
const storage = new Storage('products.json')
const app = express()
const httpServer = http.createServer(app)
const io = socketIo(httpServer)
const PORT = 8080
const passport = require('passport')
const {initializePassport} = require('../src/config/passport.config.js')

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
// const fileStorage = FileStore(session)
app.use(cookieParser('CookieS1e2c3r4e5t'))
app.use(session(
    {
        /* store: new fileStorage(
            {
                path: './sessions', // Routh where session info is stored
                ttl: 100, // Time to live (of the session)
                retries: 0 // Retries for reading the file
            }
        ), */
        store: MongoStore.create(
            {
                mongoUrl: 'mongodb+srv://leonel89011:NH1FG7njdGNQ0xII@cluster0.f4euppj.mongodb.net/?retryWrites=true&w=majority',
                mongoOptions: 
                {
                    useNewUrlParser: true, 
                    useUnifiedTopology: true
                },
                ttl: 15
            }
        ),
        secret: 'secretCode', 
        resave: true, // Keeps session active despite inactivity time
        saveUninitialized: true // Saves session even if empty
    }
))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use("/", productsRouter)
app.use("/", cartRouter)
app.use("/", viewsRouter)
app.use("/", productsMongoRouter)
app.use("/", cartsMongoRouter)
app.use("/", usersMongoRouter)
// app.use("/", loginRouter)
app.use("/", passportRouter)
app.use("/", jwtRouter)


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