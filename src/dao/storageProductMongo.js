const { productModel } = require('./models/products.model.js')

class Storage {

    async save(product) {
        try {
            const name = product.name
            const category = product.category
            const price = product.price
            const stock = product.stock
            let result = await productModel.create({name, category, price, stock})
            return result
        }
        catch (error) {
            throw new Error('There was an error when saving product ' + error)
        }
    }

    async update(id, product) {
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

    async getById(id) {
        try {
            let product = await productModel.findById(id)
            return product
        }
        catch (error) {
            throw new Error('There was an error when getting product with id ' + id)
        }
    }

    async getAll(limit, page, query, sort) {
        try {
            let filter = {}
            if(query) {
                filter = {category: query}
            }
            let products = await productModel.paginate(filter, { limit: limit, page: page, sort: { price: sort } })
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
    }
}

module.exports = Storage