// Manejo de archivos en Javascript

// Implementacion de ProductManager con manejo de archivos

const { error } = require('console')

class ProductManager {

    constructor(path) {
        this.path = path
        this.fs = require('fs').promises
    }

    async addProduct(product) {
        try {
            const data = await this.fs.readFile(this.path, 'utf-8')
            let array = JSON.parse(data)
            const new_id = array.length + 1
            product = { ...product, id: new_id }
            array.push(product)
            await this.fs.writeFile(this.path, JSON.stringify(array))
            console.log('Product ' + product.title + ' added')
        }
        catch (error) {
            console.log('Error when trying to add product: ', error)
        }

    }

    async getProducts() {
        try {
            const data = await this.fs.readFile(this.path, 'utf-8')
            return (JSON.parse(data))
        }
        catch (error) {
            console.log('Error when trying to read file: ', error)
        }
    }

    async getProductById(id) {
        try {
            const data = await this.fs.readFile(this.path, 'utf-8')
            const product = JSON.parse(data).find((elem) => elem.id === id)
            if (!product) {
                console.log("Product with id " + id + " doesn't exists")
            }
            else {
                return (product)
            }
        }
        catch (error) {
            console.log('Error when trying to read file: ', error)
        }
    }

    async updateProduct(product) {
        try {
            const data = await this.fs.readFile(this.path, 'utf-8')
            const array = JSON.parse(data).filter((elem) => elem.id !== product.id)
            array.push(product)
            await this.fs.writeFile(this.path, JSON.stringify(array))
        }
        catch (error) {
            console.log('Error when trying to read file: ', error)
        }
    }

    async deleteProduct(id) {
        try {
            const data = await this.fs.readFile(this.path, 'utf-8')
            const newData = JSON.parse(data).filter((elem) => elem.id != id)
            await this.fs.writeFile(this.path, JSON.stringify(newData))
            console.log('Product with id ' + id + ' deleted')
        }
        catch (error) {
            console.log('Error when trying to read or write file: ', error)
        }
    }

}

const main = async () => {
    const product_manager = new ProductManager('products.json')

    const updatedProduct = {
        "title": "Lamp",
        "description": "Beautiful lamp for living room",
        "price": 27000,
        "thumbnail": "../img/lamp",
        "code": 32001,
        "stock": 30,
        "id": 3
    }
    // await product_manager.updateProduct(updatedProduct)

    // product_manager.deleteProduct(3)

    const product = {
        title: "Computer",
        description: "Home computer",
        price: 500999,
        thumbnail: "../img/computer",
        code: 32000,
        stock: 6,
    }
    // await product_manager.addProduct(product)

    const products = await product_manager.getProducts()
    console.log(products)

    const recoveredProduct = await product_manager.getProductById(1)
    await console.log(recoveredProduct)



}

main().catch((error) => console.error(error))



