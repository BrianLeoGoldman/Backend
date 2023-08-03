const express = require('express')

const router = express.Router()

const pets = []

// Endpoints

router.get("/api/pets", (req, res) => {
    res.json(pets)
})

router.post("api/pets", (req, res) => {
    const newPet = req.body
    pets.push(newPet)
    res.json({message: "Mascota agregada"})
})

export default router