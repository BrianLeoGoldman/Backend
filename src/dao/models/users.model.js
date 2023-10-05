const mongoose = require('mongoose')

const userCollection = 'users'

const userSchema = new mongoose.Schema({
    nickname: { type: String, required: true, max: 100 },
    firstname: { type: String, required: true, max: 100 },
    lastname: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100 },
    age: { type: Number, required: true, max: 100 },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'carts', required: true },
    role: { type: String, required: true, max: 100 }
})

/* userSchema.pre('find', function () {
    this.populate('carts.cart')
}) */

const userModel = mongoose.model(userCollection, userSchema)

module.exports = { userModel }