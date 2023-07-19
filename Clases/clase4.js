/* 
setTimeout(() => {
    console.log("Luego de 3 segundos")
}, 3000)

setInterval(() => {
    console.log("A")
}, 2000) 
*/

function mostrarLetrasMio(palabra, callback) {
    palabraAProcesar = palabra 
    const intervalo = setInterval(() => {
        if(palabraAProcesar.length == 0) {
            clearInterval(intervalo)
            callback()
            return
        }
        console.log(palabraAProcesar[0])
        palabraAProcesar = palabraAProcesar.substring(1)
    }, 1000)
}

function mostrarLetras(palabra, callback) {
    let index = 0
    const intervalo = setInterval(() => {
        if(index < palabra.length) {
            console.log(palabra[index])
            index++
        }
        else {
            clearInterval(intervalo)
            callback()
        }
    }, 1000)
}

const fin = () => console.log("Terminé")

setTimeout(() => {
    mostrarLetras("Primero", fin)
}, 0)
setTimeout(() => {
    mostrarLetras("Segundo", fin)
}, 250)
setTimeout(() => {
    mostrarLetras("Tercero", fin)
}, 500)


// Operaciones asincronicas de fs
const fs = require('fs').promises
async function readFile() {
    try{
        const data = await fs.readFile('miArchivo.txt', 'utf-8')
        console.log('Contenido: ', data)
    }
    catch(error){
        console.log('Error al leer el archivo', error)
    }
}

// readFile()

async function writeFile() {
    const data = 'contenido de mi archivo'
    try {
        await fs.writeFile('miArchivo.txt', data)
        console.log('Archivo creado correctamente')
    }
    catch(error) {
        console.log('Error al escribir el archivo')
    }
}

// writeFile()

async function appendFile() {
    const data = 'Datos agregados al archivo'
    try {
        await fs.appendFile('miArchivo.txt', data)
        console.log('Datos agregados')
    }
    catch(error) {
        console.log('Error al agregar datos')
    }
}

// appendFile()

async function unlink() {
    try {
        await fs.unlink('miArchivo.txt')
        console.log('Archivo eliminado correctamente')
    }
    catch(error) {
        console.log('Error al eliminar el archivo', error)
    }
}

// unlink()

async function mkDir() {
    try {
        await fs.mkdir('Carpeta')
        console.log('Directorio creado')
    }
    catch(error) {
        console.log('Error al crear el directorio', error)
    }
}

// mkDir()

