// import Swal from 'sweetalert2'
const socket = io()

socket.on('error', (data) => {
    console.log(data)
    /* Swal.fire({
        icon: 'warning',
        title: 'There was an error on the server',
        text: `${data}`
    }) */
})

socket.on('products-update', (data) => {
    // Obtener el template Handlebars
    const productsList = document.getElementById('products-list');
    const template = Handlebars.compile(productsList.innerHTML);

    // Renderizar el nuevo contenido HTML usando Handlebars
    const newHtml = template({ products: data.products });

    // Actualizar el contenido de la lista de productos
    productsList.innerHTML = newHtml;
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

