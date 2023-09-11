const mongoose = require('mongoose')

const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'
                },
                amount: { type: Number, max: 1000, default: 1 }
            }
        ],
        default: []
    }
})

const cartModel = mongoose.model(cartCollection, cartSchema)

module.exports = { cartModel }

