// Express avanzado

import express from 'express'

const app = express()
const PORT = 8080

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.send("Comision 55525")
})

app.get("/welcome", (req, res) => {
    res.send("Welcome")
})

const frase = "Hola mundo como estan"

app.get("api/frase", (req, res) => {
    res.json({ frase })
})

app.get("api/letras/:num", (req, res) => {
    const num = parseInt(req.params.num)
    if(isNaN(num)) {
        res.status(400).json({error: "El parametro no es un numero"})
    } else if (num < 1 || num > frase.length) {
        res.status(400).json({ error: "El parametro esta fuera de rango" })
    } else {
        const letra = frase.charAt(num - 1)
        res.json({ letra })
    }
})

app.get("api/palabras/:num", (req, res) => {
    const num = parseInt(req.params.num)
    if (isNaN(num)) {
        res.status(400).json({ error: "El parametro no es un numero" })
    } else {
        const palabras = frase.split("")
        if(num < 1 || num > palabras.length) {
            res.status(400).json({ error: "El parametro esta fuera de rango" })
        }
        else {
            const palabra = palabras[num - 1]
            res.json({ palabra })
        }
    }
})

app.post("/api", (req, res) => {
    res.json({
        msg: 'POST api'
    })
})

app.put("/api", (req, res) => {
    res.json({
        msg: 'PUT api'
    })
})

app.delete("/api", (req, res) => {
    res.json({
        msg: 'DELETE api'
    })
})

let tasks = [
    {id: 1, title: "Task A"},
    {id: 2, title: "Task B"},
    {id: 3, title: "Task C"},
]

app.get("/tasks", (req, res) => {
    res.json(tasks)
})

app.get("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id)
    const task = tasks.find((t) => t.id === taskId)
    if(task) {
        res.json(task)
    }
    else {
        res.status(400).json({message: "Tarea no encontrada"})
    }
})

app.post("/task", (req, res) => {
    const { title } = req.body
    const newTask = { id: tasks.length + 1, title: title || "Nuevo titulo por defecto" }
    tasks.push(newTask)
    res.status(201).json(newTask)
})

app.put("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id)
    const task = tasks.find((task) => task.id === taskId)
    if(task) {
        const { title } = req.body
        task.title = title
        res.json(task)
    } else {
        res.status(404).json({error: "Tarea no encontrada"})
    }
})

app.delete("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id)
    tasks = tasks.filter((task) => task.id !== taskId)
    res.json(tasks)
})

app.listen(PORT, () => {
})
console.log(`Server is running on port ${PORT}`)