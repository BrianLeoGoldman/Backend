const { cartModel } = require('./models/carts.model.js')

class Storage {

    async save(cart) {
        try {
            let result = await cartModel.create({ products: cart })
            return result
        }
        catch (error) {
            throw new Error('There was an error when saving cart ' + error)
        }
    }

    async getById(id) {
        try {
            let cart = await cartModel.findById(id)
            return cart
        }
        catch (error) {
            throw new Error('There was an error when getting cart with id ' + id)
        }
    }

    async updateWithProducts(cid, products) {
        try {
            let cart = await cartModel.findById(cid)
            products.map((elem) => cart.products.push({ product: elem}))
            let result = await cartModel.updateOne({_id: cid}, cart)
            return result
        }
        catch (error) {
            throw new Error('There was an error when getting cart with id ' + cid)
        }
    }


/*     async update(id, product) {
        try {
            let result = await productModel.updateOne({ _id: id }, product)
            return result
        }
        catch (error) {
            throw new Error('There was an error when updating product with id ' + id)
        }
    }

    async updateCart(cart) {
        // COMPLETE
    }

    
    async getAll(limit, page, query, sort) {
        try {
            // let products = await productModel.find()
            let filter = {}
            if (query) {
                filter = { category: query }
            }
            let products = await productModel.paginate(filter, { limit: limit, page: page })
            return products
        }
        catch (error) {
            throw new Error('There was an error when getting all products')
        }
    }

    async deleteById(id) {
        try {
            let result = await productModel.deleteOne({ _id: id })
            return result
        }
        catch (error) {
            throw new Error('There was an error when deleting product with id ' + id)
        }
    }

    async deleteAll() {
        try {
            let result = await productModel.deleteAll()
            return result
        }
        catch (error) {
            throw new Error('There was an error when deleting all products')
        }
    } */
}

module.exports = Storage