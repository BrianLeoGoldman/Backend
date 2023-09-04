const mongoose = require('mongoose')

const userCollection = 'users'

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true, max: 100 },
    lastname: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100 }
})

const userModel = mongoose.model(userCollection, userSchema)

module.exports = { userModel }

