// Websockets

// DEPENDENCIES
const express = require('express') // Express module
const http = require('http') // HTTP module, for building HTTP servers
const path = require('path') // Path module
const handlebars = require('express-handlebars') // Handlebars module
const Swal = require('sweetalert2') // Sweet Alert 2
const socketIo = require('socket.io') // Socket IO module

const app = express() // Creates an express application instance
const server = http.createServer(app) // Creates an HTTP server instance
const io = socketIo(server)

// TEMPLATE ENGINE REGISTRATION
app.engine('handlebars', handlebars.engine())
// SERVER SETTINGS
app.set('views', __dirname + '/views') // Setting of path where views are located
app.set('view engine', 'handlebars') // Setting of view engine
// MIDDLEWARE
app.use(express.static(path.join(__dirname, 'public'))) // Where to look for static files

// ENDPOINTS
app.get('/', (req, res) => {
    res.render('index.hbs')
})

const users = {}

// SOCKET.IO
io.on('connection', (socket) => {
    console.log("A new connection has been established")

    // A new user enters the chat
    socket.on('new-user', (username) => {
        users[socket.id] = username
        io.emit('userConnected', username)
    })

    // A user sends a message
    socket.on('chat-message', (message) => {
        const username = users[socket.id]
        io.emit('message', { username, message })
    })

    // A user leaves the chat
    socket.on('disconnect', () => {
        const username = users[socket.id]
        delete users[socket.id]
        io.emit('userDisconnected', username)
    })
})

// PORT
const PORT = process.env.port || 8080

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})