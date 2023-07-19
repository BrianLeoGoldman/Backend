class ProductManager {

    constructor(path){
        this.path = path
        this.id = 1
        this.fs = require('fs').promises
    }

    async addProduct(title, description, price, thumbnail = '../img/general_product.jpg', code, stock = 0){
        if (!isValid(title) || !isValid(description) || !isValid(price) || !isValid(code)){
            console.log("Product is not valid due to missing fields...")
            return
        }
        const new_id = this.id
        this.id++
        const product = {
            id: new_id,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
        }
        try {
            const data = await this.fs.readFile(this.path, 'utf-8') 
            let array = JSON.parse(data)
            console.log(array)
            array.push(product)
            await this.fs.writeFile(this.path, JSON.stringify(array))
            console.log('Product ' + title + ' added')
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
        await this.getProducts()
            .then((data)=> {
                console.log("Loking for product...")
                console.log('Data: ', data)
                return data.find((product) => product.id === id)
            })
            .catch((error)=> {
                console.log('Error when trying to get product with id ' + id + ': ', error)
            })
    }

    updateProduct(){
        // TODO
    }

    deleteProduct(){
        // TODO
    }
}

function isValid(field){
    if (field == null || field === undefined) {
        return false
    }
    return true
}

const product_manager = new ProductManager('products.json')
/* product_manager.addProduct(
    "Chair", 
    "Practical chair for PC use", 
    137000, 
    "../img/chair", 
    44233, 
    8
) */
/* product_manager.getProducts()
    .then((data)=> {
        console.log('First product: ', data[0])
        console.log('Second product: ', data[1])
    })
    .catch((error)=> {
        console.log(error)
    }) */
product_manager.getProductById(1)
    .then((data)=> {
        console.log('Product searched: ', data)
    })
    .catch((error)=> {
        console.log(error)
    })