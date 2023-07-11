// Funciones

function mostrarLista(lista) {
    if (lista.length > 0) {
        lista.forEach(element => {
            console.log(element)
        });
    }
    else {
        console.log("Lista vacía")
    }
}

mostrarLista([])
mostrarLista([3, 7, 5, 99, 12])
mostrarLista(["Juan", "Alberto", "Maria"])

(function (lista) {
    if (lista.length > 0) {
        lista.forEach(element => {
            console.log(element)
        });
    }
    else {
        console.log("Lista vacía")
    }
})([44, 55, 66])


function crearMultiplicador(num1) {
    return function (num2) {
        return num1 * num2
    }
}

const duplicar = crearMultiplicador(2)
const triplicar = crearMultiplicador(3)
console.log(duplicar(7))
console.log(triplicar(7))

// Clases

class Contador {
    static cuentaGlobal = 0

    constructor(responsable) {
        this.responsable = responsable
        this.cuentaIndividual = 0
    }

    obtenerResponsable() {
        return this.responsable
    }

    obtenerCuentaIndividual() {
        return this.cuentaIndividual
    }

    static obtenerCuentaGlobal() {
        return Contador.cuentaGlobal
    }

    contar() {
        this.cuentaIndividual++
        Contador.cuentaGlobal++
    }
}

const contador1 = new Contador("Marcelo")
const contador2 = new Contador("Adrian")