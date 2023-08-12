const express = require('express')
const app = express()  // Main server
const http = require('http').createServer(app)
const io = require('socket.io')(http)  // Socket for Client and Server
const socketsRouter = require("./src/routes/socket.router.js")
const path = require('path')

const PORT = 8080

let array = []

// app.set('view engine', 'hbs')  // Handlebars as view engine where we will place the client socket
// app.set('views', path.join(__dirname, '/public'))
app.use(express.static(path.join(__dirname, '/public')))

app.use("/", socketsRouter)

let messages = []

// Routes
app.get('/', (req, res) => {
    res.render('index-clase10.html', {title: 'Aplicacion Socket IO'})
})

// Socket IO configuration

// When we receive a request from the client to establish a handshake
io.on('connection', (socket) => {
    console.log('A client has connected')

    // Listens to a personalized event called 'message' from the client
    socket.on('message', (data) => {
        console.log('Message received: ', data)
        // Emits a message to all connected clients (included the one that sent a message)
        io.emit('message', data)
    })

    socket.on('array-input', (data) => {
        array.push({ id: socket.id, message: data })
        console.log(array)
    })

    socket.emit('messageList', messages)

    socket.on('newMessage', (newMessage) => {
        messages.push(newMessage)
        io.emit('newMessage', { socketId: socket.id, message: newMessage })
    })

    // Listens to a disconection event
    socket.on('disconnect', () => {
        console.log('A client has disconnected')
    })
})

http.listen(PORT, () => {
    console.log('Server is running on port ', PORT)
})