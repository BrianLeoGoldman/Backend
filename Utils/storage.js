const fs = require('fs')

class Storage {
    constructor(file) {
        this.file = file
    }

    async save(product) {
        try {
            if (!this.isValid(product)) {
                throw new Error('Product is not valid due to missing or invalid fields')
            }
            const products = await this.recoverProducts()
            const id = products.length > 0 ? products[products.length - 1].id : 0
            const newId = id + 1
            const newProduct = { ...product, id: newId }
            products.push(newProduct)
            await this.saveProducts(products)
            return newId
        }
        catch (error) {
            console.log(`${error}`)
            throw error
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
            throw new Error('Error when saving products...')
        }
    }

    isValid(product) {
        if (product.title === null || product.title === undefined ||
            product.price === null || product.price === undefined) {
            return false
        }
        return true
    }
}

module.exports = Storage



