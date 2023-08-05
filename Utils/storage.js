const fs = require('fs')

class Storage {
    constructor(file) {
        this.file = file
    }

    async save(product) {
        try {
            const products = await this.recoverProducts()
            const id = products.length > 0 ? products[products.length - 1].id : 0
            const newId = id + 1
            let newProduct
            if (Array.isArray(product)) {
                newProduct = { products: product, id: newId }
            }
            else {
                newProduct = { ...product, id: newId }
            }
            products.push(newProduct)
            await this.saveProducts(products)
            return newId
        }
        catch (error) {
            throw new Error('There was an error when saving product')
        }
    }

    async update(id, product) {
        try {
            const products = await this.recoverProducts()
            const updatedProducts = products.map((elem) => elem.id === id ? { ...product, id: id } : elem)
            await this.saveProducts(updatedProducts)
        }
        catch (error) {
            throw new Error('There was an error when updating product with id ' + id)
        }
    }

    async updateCart(cart) {
        try {
            console.log("Lets go")
            const carts = await this.recoverProducts()
            const updatedCarts = carts.map((elem) => elem.id === cart.id ? cart : elem)
            await this.saveProducts(updatedCarts)
        }
        catch (error) {
            throw new Error('There was an error when updating cart with id ' + cart.id)
        }
    }

    async getById(id) {
        try {
            const products = await this.recoverProducts()
            const product = products.find((elem) => elem.id === id)
            return product || null
        }
        catch (error) {
            throw new Error('There was an error when getting product with id ' + id)
        }
    }

    async getAll() {
        try {
            const products = await this.recoverProducts()
            return products
        }
        catch (error) {
            throw new Error('There was an error when getting all products')
        }
    }

    async deleteById(id) {
        try {
            let products = await this.recoverProducts()
            products = products.filter((elem) => elem.id !== id)
            await this.saveProducts(products)
        }
        catch (error) {
            throw new Error('There was an error when deleting product with id ' + id)
        }
    }

    async deleteAll() {
        try {
            await this.saveProducts([])
        }
        catch (error) {
            throw new Error('There was an error when deleting all products')
        }
    }

    async recoverProducts() {
        try {
            const data = await fs.promises.readFile(this.file, 'utf-8')
            return data ? JSON.parse(data) : []
        }
        catch (error) {
            return []
        }
    }

    async saveProducts(products) {
        try {
            await fs.promises.writeFile(this.file, JSON.stringify(products, null, 2))

        }
        catch (error) {
            throw new Error('There was an error when writing on file')
        }
    }
}

module.exports = Storage



