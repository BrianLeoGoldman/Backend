// Router y Multer

const express = require('express')
const path = require('path')
const usersRouter = require("./routes/users.js")
const petsRouter = require("./routes/pets.js")
const url = require('url');
const multer = require('multer')

const app = express()
const PORT = 8080

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Agregar path public (MIDDLEWARE)
app.use('/static', express.static(path.join(__dirname, "public")))

// ROUTING (MIDDLEWARE)
app.use("/", usersRouter)
app.use("/", petsRouter)

// MULTER
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

app.post("/uploads", upload.single("archivo"), (req, res) => {
    res.json({ mensaje: "Archivo subido exitosamente" })
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "../public", "index.html")
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})