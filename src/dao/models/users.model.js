const mongoose = require('mongoose')

const userCollection = 'users'

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, max: 100 },
    firstname: { type: String, required: true, max: 100 },
    lastname: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100 }
})

const userModel = mongoose.model(userCollection, userSchema)

module.exports = { userModel }

