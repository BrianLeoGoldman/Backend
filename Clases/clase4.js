/* 
setTimeout(() => {
    console.log("Luego de 3 segundos")
}, 3000)

setInterval(() => {
    console.log("A")
}, 2000) 
*/

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

/* setTimeout(() => {
    mostrarLetras("Primero", fin)
}, 0)
setTimeout(() => {
    mostrarLetras("Segundo", fin)
}, 250)
setTimeout(() => {
    mostrarLetras("Tercero", fin)
}, 500) */

// #####################################################
// ################## FileSystem (fs) ##################
// #####################################################

const fs = require('fs')

// OPERACIONES SINCRONICAS BLOQUEANTES DE fs

try {
    const fileSync = '../Archivos/FileSync.txt'

    const text1 = 'Este texto se agrego mediante el metodo writeFileSync\n'
    fs.writeFileSync(fileSync, text1)

    const text2 = 'Y este texto se agrego mediante el metodo appendFileSync\n'
    fs.appendFileSync(fileSync, text2)

    const data1 = fs.readFileSync(fileSync, 'utf-8')
    console.log(data1)

    // fs.unlinkSync(fileSync)

    // fs.mkdirSync('./Prueba/')

    const dirContent = fs.readdirSync('../Archivos/')
    console.log(dirContent)
}
catch(error) {
    console.log("Error while using Sync operations with fs", error)
}

try {
    const dateTime = new Date().toISOString()
    fs.writeFileSync('../Archivos/fyh.txt', dateTime)
    const fyhContent = fs.readFileSync('../Archivos/fyh.txt', 'utf-8')
    console.log(fyhContent)
}
catch(error) {
    throw new Error('Error when reading/writing fyh.txt file')
}

// OPERACIONES ASINCRONICAS NO BLOQUEANTES DE fs CON CALLBACKS

const fileAsyncCB = '../Archivos/FileAsyncCB.txt'

const text3 = 'Este texto se agrego mediante el metodo writeFile con callback\n'
fs.writeFile(fileAsyncCB, text3, (error) => {
    if (error) {
        throw new Error('Error at writeFile with callback', error)
    }
    else {
        console.log('Method writeFile worked fine!')
    }
})

const text4 = 'Y este texto se agrego mediante el metodo appendFile con callback\n'
fs.appendFile(fileAsyncCB, text4, (error) => {
    if (error) {
        throw new Error('Error at appendFile with callback', error)
    }
    else {
        console.log('Method appendFile worked fine!')
    }
})

fs.readFile(fileAsyncCB, 'utf-8', (error, fileContent) => {
    if(error) {
        throw new Error('Error at readFile with callback', error)
    }
    else {
        console.log(fileContent)
    }
})

/* fs.unlink(fileAsyncCB, (error) => {
    if (error) {
        throw new Error('Error at unlink with callback', error)
    }
    else {
        console.log('Method unlink worked fine!')
    }
}) */

/* fs.mkdir('../Prueba/', (error) => {
    if (error) {
        throw new Error('Error at mkdir with callback', error)
    }
    else {
        console.log('Method mkdir worked fine!')
    }
}) */

fs.readdir('../Archivos/', (error, files) => {
    if (error) {
        throw new Error('Error at readdir with callback', error)
    }
    else {
        console.log(files)
    }
})

fs.readFile('../package.json', 'utf-8', (error, content) => {
    if (error) {
        throw new Error('Error when reading package.json', error)
    }
    else {
        const stats = fs.stat('../package.json', (error, stats) => {
            const sizeInBytes = stats.size;
            const info = {
                contenidoStr: content,
                contenidoObj: JSON.parse(content),
                size: sizeInBytes + ' bytes'
            }
            console.log(info)
            fs.writeFile('../info.txt', JSON.stringify(info, null, 2), (error) => {
                if (error) {
                    throw new Error('Error when creating info.txt file', error)
                }
                else {
                    console.log('File info.txt created successfully!')
                }
            })
        })
    
    }
})

// OPERACIONES ASINCRONICAS NO BLOQUEANTES DE fs CON PROMISES

const fileAsyncP = '../Archivos/fileAsyncP.txt'

async function readFile(file) {
    try{
        const data = await fs.promises.readFile(file, 'utf-8')
        console.log(data)
        return data
    }
    catch(error){
        console.log('Error al leer el archivo:', error)
    }
}

async function writeFile(file, text) {
    try {
        await fs.promises.writeFile(file, text)
        console.log('Se ha escrito existosamente')
    }
    catch(error) {
        console.log('Error al escribir en el archivo:', error)
    }
}

async function appendFile(file, text) {
    try {
        await fs.promises.appendFile(file, text)
        console.log('Se ha agregado texto existosamente')
    }
    catch(error) {
        console.log('Error al agregar texto en el archivo:', error)
    }
}

async function unlink(file) {
    try {
        await fs.promises.unlink(file)
        console.log('Archivo eliminado correctamente')
    }
    catch(error) {
        console.log('Error al eliminar el archivo ', error)
    }
}

async function mkDir(directory) {
    try {
        await fs.promises.mkdir(directory)
        console.log('Directorio creado exitosamente')
    }
    catch(error) {
        console.log('Error al crear el directorio:', error)
    }
}

async function rename(oldPath, newPath) {
    try {
        await fs.promises.rename(oldPath, newPath)
        console.log('Directorio renombrado exitosamente')
    }
    catch(error) {
        console.log('Error al renombrar el directorio:', error)
    }
}

const text5 = 'Este texto se agrego mediante el metodo writeFile con promises\n'
writeFile(fileAsyncP, text5)
const text6 = 'Y este texto se agrego mediante el metodo appendFile con promises\n'
appendFile(fileAsyncP, text6)
readFile(fileAsyncP)
// unlink(fileAsyncP)
// mkDir('../Prueba/')
// rename('../Prueba/', '../Test/')

async function procesarPackageJson() {
    try {
        const info = await readFile('../info.txt')
        const object = JSON.parse(info)
        const contenidoObj = object['contenidoObj']
        // Falta cambiar el contenidoStr
        const newContenidoObj = { ...contenidoObj, 'author': 'Goldman, Brian'}
        const newObject = {...object, 'contenidoObj': newContenidoObj }
        console.log(newObject)
        await writeFile('../info.txt', JSON.stringify(newObject, null, 2))
    }
    catch(error) {
        console.log('Error al intentar procesar el archivo package.json')
    }
}

procesarPackageJson()