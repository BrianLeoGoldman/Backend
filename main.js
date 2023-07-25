/* const http = require('http') // Es un objeto
const PORT = 8080

const server = http.createServer((req, res) => {
    // req contiene datos del request realizado
    // res tiene los datos que se enviaran al cliente
    const date = new Date()
    const hour = date.getHours()
    let message = ''
    if (hour >= 6 && hour < 12) {
        message = 'Buenos dias'
    }
    else if (hour >= 12 && hour < 20) {
        message = 'Buenas tardes'
    }
    else {
        message = 'Buenas noches'
    }
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end(message)
})

const connectedServer = server.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${connectedServer.address().port}`)
}) */

const express = require('express') // Es una funcion
const app = express() // Es la aplicacion servidor que configuraremos
const PORT = 8080

let visitas = 0
// Paths

app.get("/", (req, res) => {
    res.send("Mi primer endpoint")
})

app.get("/visitas", (req, res) => {
    const now = new Date()
    const fyh = now.toLocaleString()
    res.send(`La fecha y hora es ${fyh}`)
})

app.get("/fyh", (req, res) => {
    visitas++
    res.send(`La cantidad de visitas es ${visitas}`)
})

app.get("/otra", (req, res) => {
    res.send("Otra ruta")
})

app.get("*", (req, res) => {
    res.send("Sin contenido")
})

// Levantamos el servidor en el puerto indicado
const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`)
}) 
// Indicamos si hubo un error al establecer la conexion
server.on("error", error => console.log(`Error en el servidor ${error}`))
