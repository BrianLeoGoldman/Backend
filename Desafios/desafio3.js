import { Contenedor } from './desafio2.js'
import { randomNumber } from '../Utils/functions.js'

// const express = require('express')
import express from 'express' // This is because we added type: module in package.json

const app = express()
const PORT = 8080
const contenedor = new Contenedor('products.txt')

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