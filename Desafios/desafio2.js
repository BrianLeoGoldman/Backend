const { error } = require('console')

class ProductManager {

    constructor(path){
        this.path = path
        this.id = 1
        this.fs = require('fs').promises
    }

    async addProduct(product){
        if (!this.isValid(product)){
            console.log("Product is not valid due to missing fields...")
            return
        }
        try {
            const data = await this.fs.readFile(this.path, 'utf-8') 
            let array = JSON.parse(data)
            if(!array.some((elem) => elem.id === this.id)){
                const new_id = this.id
                this.id++
                product = { ...product, id: new_id }
                array.push(product)
                await this.fs.writeFile(this.path, JSON.stringify(array))
                console.log('Product ' + product.title + ' added')
            }
            else {
                throw error("Product with id " + this.id + " already exists")
            }
        }
        catch(error) {
            console.log('Error when trying to add product: ', error)
        }
        
    }

    async getProducts(){
        try{
            const data = await this.fs.readFile(this.path, 'utf-8')
            return (JSON.parse(data))
        }
        catch(error){
            console.log('Error when trying to read file: ', error)
        }
    }

    async getProductById(id){
        try {
            const data = await this.fs.readFile(this.path, 'utf-8')
            const product = JSON.parse(data).find((elem) => elem.id === id)
            if(!product){
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

    async updateProduct(product){
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

    async deleteProduct(id){
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

    isValid(product) {
    if (product.title === null || product.title === undefined ||
        product.price === null || product.price === undefined ||
        product.code === null || product.code === undefined ||
        product.stock === null || product.stock === undefined) {
        return false
    }
    return true
    }
}



const product_manager = new ProductManager('products.json')
/* product_manager.deleteProduct(5)
    .then(() => {
        console.log('Deleted product')
    })
    .catch((error) => {
        console.log(error)
    }) */
const product = {
    title: "Computer",
    description: "Home computer",
    price: 500999,
    thumbnail: "../img/computer",
    code: 32000,
    stock: 6,
}
product_manager.addProduct(product)
    .then(() => {
        console.log('Added product')
    })
    .catch((error) => {
        console.log(error)
    })
/*
product_manager.getProducts()
    .then((data)=> {
        console.log('Products: ', data)
    })
    .catch((error)=> {
        console.log(error)
    })
product_manager.getProductById(1)
    .then((data)=> {
        console.log('Product searched: ', data)
    })
    .catch((error)=> {
        console.log(error)
    }) */
/* const updatedProduct = {
    "title": "Lamp",
    "description": "Beautiful lamp for living room",
    "price": 125000,
    "thumbnail": "../img/lamp",
    "code": 32000,
    "stock": 15,
    "id": 3
}
product_manager.updateProduct(updatedProduct)
    .then(() => {
        console.log('Product updated: ', updatedProduct)
    })
    .catch((error) => {
        console.log(error)
    })  */