import express from 'express'

const router = express.Router()

const users = []

// Endpoints

router.get("/api/users", (req, res) => {
    res.json(users)
})

router.post("api/pets", (req, res) => {
    const newUser = req.body
    users.push(newUser)
    res.json({ message: "Usuario agregado" })
})

export default router