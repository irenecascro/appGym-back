function sumar(a, b) {
    return a + b;
}
console.log(sumar(3, 6));

// Definición
function sumarRetraso(a, b, callback) {
    setTimeout(() => {
        callback(a + b);
    }, 3000);
}

// Ejecución
sumarRetraso(8, 9, (resultado) => {
    console.log('Se ejecuta el callback ' + resultado);
});

sumarRetraso(7, 1, (resultado) => {
    sumarRetraso(4, resultado, (resultado2) => {
        console.log(resultado2);
    })
});