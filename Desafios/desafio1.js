// Clases ECMAScript y ECMAScript avanzado

// Implementacion de ProductManager
class ProductManager {

    constructor(){
        this.products = []
    }

    getProducts(){
        return this.products
    }

    addProduct(title, description, price, thumbnail = '../img/general_product.jpg', code, stock = 0){
        if (!isValid(title) || !isValid(description) || !isValid(price) || !isValid(code)){
            console.log("Product is not valid due to missing fields...")
            return
        }
        const existing_product = this.products.find((elem) => elem.code === code)
        if(existing_product) {
            console.log("Product with code " + code + " is already present")
            return
        }
        const new_id = this.products.length + 1
        const product = {
            id: new_id,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
        }
        this.products.push(product)

    }

    getProductById(id){
        const found_product = this.products.find((elem) => elem.id === id)
        if(!found_product){
            console.log("Not found")
            return
        }
        return found_product
    }
}

function isValid(field){
    if (field == null || field === undefined) {
        return false
    }
    return true
}

// Ejecucion de ProductManager
const product_manager = new ProductManager()
product_manager.addProduct(
    "Notebook", 
    "Lenovo notebook with fast processor and regular memory", 
    280000, 
    "../img/lenovo_notebook", 
    72499, 
    6
)
product_manager.addProduct(
    "Chair", 
    "Practical chair for PC use", 
    137000, 
    "../img/chair", 
    44233, 
    8
)
product_manager.addProduct(
    "Keyboard", 
    "Mechanical keyboard with colorful design", 
    17000, 
    undefined,
    13767,
    undefined
)
console.log(product_manager.getProducts())

const search_product = product_manager.getProductById(2)
console.log(search_product)