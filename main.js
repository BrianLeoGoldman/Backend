import { Contenedor } from './Desafios/desafio2.js'
import { randomNumber } from './Utils/functions.js'

// const express = require('express')
import express from 'express' // This is because we added type: module in package.json

const app = express()
const PORT = 8080
const contenedor = new Contenedor('products.txt')
let visits = 0

app.get('/', (req, res) => {
    visits++
    res.send(`
        <h1>Welcome to the site!</h1>
        <h3>You are the visitor number ${ visits } to our site!</h3>
        <h3>Choose an option:</h2>
        <ul>
            <li><a href="http://localhost:8080/productos">All our products</a></li>
            <li><a href="http://localhost:8080/productoRandom">Any of a products</a></li>
        </ul>
    `)
})

app.get('/productos', (req, res) => {
    contenedor.getAll()
        .then((response) => {
            res.send(response)
        })
        .catch(error => {
            res.send(error)
        })
})

app.get('/productoRandom', (req, res) => {
    contenedor.getAll()
        .then((response) => {
            const randomNum = randomNumber(0, response.length - 1)
            const random = response[randomNum]
            res.send(random)
        })
        .catch(error => {
            res.send(error)
        })
})

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
server.on("error", (error) => console.log(`There was an error when starting the server: ${error}`))