import Swal from 'sweetalert2'
const socket = io()

socket.on('error', (data) => {
    console.log(data)
    /* Swal.fire({
        icon: 'warning',
        title: 'There was an error on the server',
        text: `${data}`
    }) */
})

socket.on('product-deleted', (id) => {
    const productsList = document.getElementById('products-list')
    const newId = id.toString()
    const child = document.getElementById(newId)
    console.log(productsList)
    console.log(newId)
    console.log(child)
    productsList.removeChild(child)
})

socket.on('product-added', (data) => {
    const productsList = document.getElementById('products-list');
    const newProduct = document.createElement('div')
    newProduct.innerHTML = `<div class="product-card" id="${data.id}">
                <p class="product-title">${data.title}</p>
                <p class="product-info">${data.description}</p>
                <p class="product-info">${ data.price }</p>
                <p class="product-info">CODE: ${data.code}</p>
                <button class="product-delete" onclick="deleteProduct(${data.id})"><i class="fa fa-trash-o"></i></button>
            </div>`
    productsList.appendChild(newProduct.firstChild)
})

function deleteProduct(id) {
    socket.emit('delete-product', id)
}

document.getElementById('products-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const title = document.getElementById('title')
    const description = document.getElementById('description')
    const price = document.getElementById('price')
    const thumbnail = document.getElementById('thumbnail')
    const code = document.getElementById('code')
    const stock = document.getElementById('stock')
    const newProduct = {
        title: title.value,
        description: description.value,
        price: price.value,
        thumbnail: thumbnail.value,
        code: code.value,
        stock: stock.value
    }
    title.value = ''
    description.value = ''
    price.value = ''
    thumbnail.value = ''
    code.value = ''
    stock.value = ''

    socket.emit('add-product', newProduct)
})

