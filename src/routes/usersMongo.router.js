const express = require('express')
const UserStorage = require('../dao/storageUserMongo.js')

const router = express.Router()

const storage = new UserStorage()

// Router middleware
router.use((req, res, next) => {
    const date = new Date().toLocaleString()
    console.log('Users Mongo router activated: ', date)
    next()
})

// Endpoints

router.get("/api/usersMongo", (req, res) => {
    console.log("All users have been requested")
    storage.getAll()
        .then((response) => {
            res.status(200).send(response)
        })
        .catch(error => {
            res.status(500).send(error)
        })
})

router.post("/api/usersMongo", (req, res) => {
    const user = req.body
    console.log(`User with name ${user.firstname} to be added`)
    storage.save(user)
        .then((response) => {
            res.status(200).send(response)
        })
        .catch((error) => {
            res.status(500).send(`${error}`)
        })
})

router.put("/api/usersMongo/:id", (req, res) => {
    let { id } = req.params
    let userToReplace = req.body
    if (!userToReplace.firstname || !userToReplace.lastname || !userToReplace.email) {
        res.send({ status: 'Error', error: "Incomplete values" })
    }
    storage.update(id, userToReplace)
        .then((response) => {
            res.status(200).send(response)
        })
        .catch((error) => {
            res.status(500).send(`${error}`)
        })
})

router.delete("/api/usersMongo/:id", (req, res) => {
    let { id } = req.params
    storage.deleteById(id)
        .then((response) => {
            res.status(200).send(response)
        })
        .catch((error) => {
            res.status(500).send(`${error}`)
        })
})


module.exports = router