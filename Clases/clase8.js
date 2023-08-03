// Router y Multer

/* import express from 'express'
import usersRouter from "./routes/users.js"
import petsRouter from "./routes/pets.js"
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const PORT = 8080

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Agregar path public (MIDDLEWARE)
app.use('/static', express.static(__dirname + '/public'))

// Routing (MIDDLEWARE)
app.use("/", usersRouter)
app.use("/", petsRouter)

app.get("/", (req, res) => {
    res.sendFile(__dirname + "../public", "index.html")
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
}) */

import express from 'express'
import multer from 'multer'
import path from 'path'
const app = express()
const PORT = 8080

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now()
        const originalName = file.originalname
        cb(null, `${timestamp}-${originalName}`)
    }
})

const upload = multer({ storage })

app.use(express.static(path.join(__dirname, "public")))

app.post("/uploads", upload.single("archivo"), (req, res) => {
    res.json({ mensaje: "Archivo subido exitosamente" })
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.js"))
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})