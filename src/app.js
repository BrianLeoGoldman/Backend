const express = require('express')
const http = require('http')
const path = require('path')
const handlebars = require('express-handlebars')
const socketIo = require('socket.io')
const Swal = require('sweetalert2')
const productsRouter = require("./routes/products.router.js")
const cartRouter = require("./routes/carts.router.js")
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
app.use(express.static(path.join(__dirname, 'public')))
app.use("/", productsRouter)
app.use("/", cartRouter)

/* app.get("/", (req, res) => {
    console.log("We are in app.js")
    res.status(200).send("We are in app.js")
    // res.render('home.handlebars')
}) */

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`)
})