function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function randomNumberList(min, max, quantity){
    let randomArray = []
    for (let index = 0; index < quantity; index++) {
        const value = getRandomInt(min, max)
        randomArray.push(value)
    }
    return randomArray
}

function countOcurrences(array){
    let object = {}
    for (const num of array) {
        object[num] = object[num] ? object[num] + 1 : 1;
    }
    return object
}

const array = randomNumberList(1, 21, 10000)
const object = countOcurrences(array)
console.log(object)

const products = [
    { id: 1, nombre: 'Escuadra', precio: 323.45},
    { id: 2, nombre: 'Calculadora', precio: 234.56 },
    { id: 3, nombre: 'Globo Terraqueo', precio: 45.67 },
    { id: 4, nombre: 'Paleta Pintura', precio: 456.78 },
    { id: 5, nombre: 'Reloj', precio: 67.89 },
    { id: 6, nombre: 'Agenda', precio: 78.90 },
]

const names = products.map((product) => product.nombre).join(', ')
console.log(names)

const totalPrice = products.reduce((acum, product) => acum + product.precio, 0)
console.log(totalPrice.toFixed(2))

const averagePrice = products.reduce((acum, product) => acum + product.precio, 0) / products.length
console.log(averagePrice.toFixed(2))

const lowerPrice = products.reduce((min, product) => {
    if(product.precio < min){
        min = product.precio
    }
    return min
}, products[0].precio)
console.log(lowerPrice)

const higherPrice = products.reduce((max, p) => (p.precio > max ? p.precio : max), 0)
console.log(higherPrice)

const objeto = {
    'Names': names,
    'Total price': totalPrice.toFixed(2),
    'Average price': averagePrice.toFixed(2),
    'Lower price': lowerPrice,
    'Higher price': higherPrice
}

console.log(objeto)