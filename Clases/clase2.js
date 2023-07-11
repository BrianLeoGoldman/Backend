// Operador exponencial
let resultado = 2 ** 3
let base = 5
let exponente = 2
let resultado2 = base ** exponente
console.log(resultado2)

// Array.includes
const numbers = [1, 2, 3, 4, 5, 6]
console.log(numbers.includes(3))
console.log(numbers.includes(8))

// Operador Nullish (??)
// Esto no es lo mismo que el operador ternario => (condicion ? si es true : si es false)
const nombre = null
const nombrePorDefecto = "CoderHouse"
const nombreCompleto = nombre ?? nombrePorDefecto
console.log(nombreCompleto)

// Object entries, values y keys
const estudiante = {
    nombre: "Juan",
    edad: 30,
    ciudad: "Córdoba"
}
const valores = Object.values(estudiante)
const keys = Object.keys(estudiante)
const entries = Object.entries(estudiante)
console.log(valores)
console.log(keys)
console.log(entries)

// Finally
function ejemploPromesa () {
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            const exito = true
            if(exito) {
                resolve("Exito")
            }
            else {
                reject("Error")
            }
        }, 5000)
    })
}

ejemploPromesa()
    .then((resultado)=>{
        console.log(resultado)
    })
    .catch((error)=>{
        console.log(error)
    })
    .finally(()=> {
        console.log("Promesa finalizada")
    })

// Spread operator ...
const numeros = [1, 2, 3, 4 , 5, 6, 7, 8]
const nuevosNumeros = [...numeros, 9, 10, 11]
console.log(nuevosNumeros)

// Rest operator
function sumar(...numeros) {
    let total = 0
    for(let numero of numeros) {
        total += numero
    }
    return total
}
console.log(sumar(1, 2, 3))

function imprimirDatos(persona, ...datosExtras){
    console.log(`Nombre: ${persona.nombre}`)
    console.log(`Edad: ${persona.edad}`)
    console.log(`Otros datos: ${datosExtras.join(", ")}`)
}
const persona = {
    nombre: "Daniel",
    edad: 30
}
imprimirDatos(persona, "Altura: 200 cm", "Peso: 100 kg")

// Desafio

const objetos =  [
	{
		manzanas:3,
		peras:2,
		carne:1,
		jugos:5,
		dulces:2
	},
	{
		manzanas:1,
		sandias:1,
		huevos:6,
		jugos:1,
		panes:4
	}
]

const tiposProductos = objetos.reduce((lista, objeto)=> {
    Object.keys(objeto).forEach(producto=>{
        if(!lista.includes(producto)) {
            lista.push(producto)
        }
    })
    return lista
}, [])

console.log("Tipos de productos: ", tiposProductos)

const totalProductosVendidos = objetos.reduce((total, objeto)=> {
    const cantidades = Object.values(objeto)
    const suma = cantidades.reduce((a, b) => {a + b}, 0)
    return total + suma
}, 0)

console.log("Total productos vendidos: ", totalProductosVendidos)

// Trim

let cadena = "   coderHouse     "
const sinEspacios = cadena.trim()
console.log(sinEspacios)

// Flat

const matriz = [1, 2, [3, 4], [5, 6], 7, 8, 9]
const matrizPlana = matriz.flat()
console.log(matrizPlana)

// Implementacion del handsOnLab

class TicketManager {
    constructor(){
        this.eventos = []
        this.precioBaseDeGanacias = 0
    }

    getEventos() {
        return this.eventos
    }

    agregarEvento(nombre, lugar, precio, capacidad = 50, fecha = new Date()){
        precio += precio * 0,15
        const evento_id = this.eventos.length + 1
        const participantes = []
        const evento = {
            id: evento_id,
            nombre,
            lugar,
            precio,
            capacidad,
            fecha,
            participantes,
        }
        this.eventos.push(evento)
    }

    agregarUsuario(evento_id, usuario_id){
        const evento_encontrado = this.eventos.find((evento)=> evento.id === evento_id)
        if(!evento_encontrado) {
            console.log("El evento con el ID " + evento_id + " no existe")
            return
        }
        const participantes = evento_encontrado.participantes
        const usuario_registrado = participantes.includes(usuario_id)
        if(usuario_registrado){
            console.log("El usuario ya fue registrado para este evento")
            return
        }
        participantes.push(usuario_id)
        console.log("Usuario registrado correctamente")
    }

    ponerEventoEnGira(evento_id, nueva_localidad, nueva_fecha){
        const evento_encontrado = this.eventos.find((evento)=> evento.id === evento_id)
        if(!evento_encontrado) {
            console.log("El evento con el ID " + evento_id + " no existe")
            return
        }
        const evento_copiado = {...evento_encontrado} // Copiar el evento existente
        evento_copiado.id = this.eventos.length + 1
        evento_copiado.lugar = nueva_localidad
        evento_copiado.fecha = nueva_fecha
        evento_copiado.participantes = []

        this.eventos.push(evento_copiado)
        console.log("El evento fue puesto en gira correctamente")
    }
}

// Ejecucion del handsOnLab
const ticketManager = new TicketManager()
//Agregar eventos
ticketManager.agregarEvento("Concierto Pop", "Estadio A", 100, 2000, new Date("2023-07-20"))
ticketManager.agregarEvento("Concierto Rock", "Estadio B", 200, 3000, new Date("2023-07-25"))
// Obtener los eventos
const eventos = ticketManager.getEventos()
console.log("Eventos " , eventos)
// Agregar usuarios
ticketManager.agregarUsuario(1, "User1")
ticketManager.agregarUsuario(1, "User2")
ticketManager.agregarUsuario(2, "User3")
// Poner evento en gira
ticketManager.ponerEventoEnGira(1, "Nuevo lugar", new Date("2023-08-08"))
//Obtener eventos actualizados
const eventosActualizados = ticketManager.getEventos()
console.log("Eventos actualizados: " , eventosActualizados)
