const { cartModel } = require('./models/carts.model.js')

class CartStorage {

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
            let cart = await cartModel.find({_id: id})
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

    async updateAmount(cid, pid, amount) {
        try {
            //console.log(`${cid} ${pid} ${amount}`)
            let cart = await cartModel.findById(cid)
            cart.products.map((elem) => elem.product == pid ? elem.amount = amount : null )
            let result = await cartModel.updateOne({ _id: cid }, cart)
            return result
        }
        catch (error) {
            throw new Error('There was an error when getting cart with id ' + cid)
        }
    }

    async deleteProduct(cid, pid) {
        try {
            let cart = await cartModel.findById(cid)
            cart.products = cart.products.filter((elem) => elem.product != pid)
            let result = await cartModel.updateOne({ _id: cid }, cart)
            return result
        }
        catch (error) {
            throw new Error('There was an error when getting cart with id ' + cid)
        }
    }

    async deleteAllProducts(cid) {
        try {
            let cart = await cartModel.findById(cid)
            cart.products = []
            let result = await cartModel.updateOne({ _id: cid }, cart)
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

module.exports = CartStorage