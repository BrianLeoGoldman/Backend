// Motores de plantillas

const express = require('express')
const path = require('path')
const handlebars = require('express-handlebars')
const viewsRouter = require('../src/routes/views.router')
const app = express()
const PORT = 8080

app.engine("handlebars", handlebars.engine()) // Configuracion del motor de plantillas
app.set("views", __dirname + "/views") // Donde encontrar las views
app.set("view engine", "handlebars")
//app.use(express.static(__dirname, "views"))

/* const users = [
    {
        nombre: "Juan", 
        apellido: "Perez", 
        edad: 25, 
        email: "juan@mail.com", 
        telefono: 12345678
    },
    {
        nombre: "Maria",
        apellido: "Garcia",
        edad: 21,
        email: "maria@mail.com",
        telefono: 34566543
    },
    {
        nombre: "Roberto",
        apellido: "Gonzalez",
        edad: 33,
        email: "roberto@mail.com",
        telefono: 99998888
    }
]

app.get("/", (req, res) => {
    const randomIndex = Math.floor(Math.random() * users.length)
    const randomUser = users[randomIndex]
    res.render("index", randomUser)
}) */

app.use("/", viewsRouter)

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`)
})