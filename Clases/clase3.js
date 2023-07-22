// Programacion sincronica y asincronica

// Arrow function simple
const saludar = () => {
    console.log("Saludos desde la arrow function")
}

// Arrow function con parametros
const sumar = (a, b) => {
    return a + b
}

// Arrow function con una sola expresion
const duplicar = (num) => num * 2

// Arrow function en un array de objetos
const usuarios = [
    {nombre: "User1", edad: 30},
    {nombre: "User2", edad: 24},
    {nombre: "User3", edad: 51}
]

const nombres = usuarios.map(usuario => usuario.nombre)

// Arrow function como metodo de un objeto
const persona = {
    nombre: "Coder",
    edad: 23,
    presentacion: () => { console.log(`Mi nombre es, ${persona.nombre}`) }
}

// Callbacks
function obtenerDatosDelUsuario(id, callback) {
    setTimeout(() => {
        const usuario = {
            id: id,
            nombre: "Coder",
            email: "coder@mail.com"
        };
        callback(usuario)
    }, 5000)
}

function mostrarDatosDelUsuario(usuario) {
    console.log(`Nombre: ${usuario.nombre}, Email: ${usuario.email}`)
}

obtenerDatosDelUsuario(456, mostrarDatosDelUsuario)

// Callback para funcion de manejo de errores
function cargarImagen(url, exito, error) {
    // Las funciones exito y error son los callbacks
    const imagen = new Image()
    imagen.onload = function() {
        exito(imagen)
    }
    imagen.error = function() {
        error(new Error("No se puede mostrar la imagen"))
    }
    imagen.src = url
}

function mostrarImagen(imagen) {
    document.body.appendChild(imagen)
}

function mostrarError(error) {
    console.log("Error", error.message)
}

const urlImagen = "https://ejemplo.com/imagen.jpg"

cargarImagen(urlImagen, mostrarImagen, mostrarError)

// Promises
const obtenerDatos = new Promise((resolve, reject) => {
    setTimeout(() => {
        const datos = { mensaje: "Datos obtenidos" }
        resolve(datos)
    }, 5000)
})

obtenerDatos
    .then(resultado => {
        console.log(resultado.mensaje)
    })
    .catch(error => {
        console.log("Error: ", error)
    })

// Timers - setTimeout - setInterval

setTimeout(() => {
    console.log("Mensaje de 5 segundos")
}, 5000)

let contador = 0
const intervalo = setInterval(() => {
    contador++
    console.log(`Contador en: ${contador}`)

    if(contador === 10) {
        clearInterval(intervalo)
        console.log("Intervalo detenido")
    }
}, 1000)

async function obtenerDatos(){
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    const datos = await response.json()
    console.log(datos)
}