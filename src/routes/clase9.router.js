const express = require('express')
const router = express.Router()

let food = [
    {name: "hamburger", price: 230 },
    { name: "salad", price: 563 },
    { name: "pasta", price: 123 },
    { name: "chicken", price: 453 },
]

router.get("/", (req, res) => {
    let testUser = {
        name: "Juan",
        lastname: "Charly",
        role: "Admin"
    }
    res.render("index-clase9.hbs", 
    {
        user: testUser, 
        isAdmin: testUser.role === "Admin", 
        food
    })
})

module.exports = router