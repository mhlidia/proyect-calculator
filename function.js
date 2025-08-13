let resultadoMostrado=false;

let pantalla = document.getElementById("pantalla");

function agregar(valor) {
    if(resultadoMostrado){
        pantalla.value= ""; //limpiamos la pantalla
        resultadoMostrado=false;
    }
    if (valor === 'π') {
        pantalla.value += Math.PI.toFixed(8);
    } else {
        pantalla.value += valor;
    }
}

function agregarFuncion(nombreFuncion){
    if(resultadoMostrado){
        pantalla.value = '';
        resultadoMostrado = false;
    }
    pantalla.value += nombreFuncion + '(';
    //``
}

function limpiar() {
    pantalla.value = "";
}

function borrar() {
    pantalla.value = pantalla.value.slice(0, -1);
}

/*function funcion(tipo) {
    let valor = pantalla.value;
    let resultado;

    try {
        switch (tipo) {
        case 'sin':
            resultado = Math.sin(gradosARadianes(eval(valor)));
            break;
        case 'cos':
            resultado = Math.cos(gradosARadianes(eval(valor)));
            break;
        case 'tan':
            resultado = Math.tan(gradosARadianes(eval(valor)));
            break;
        case 'log':
            resultado = Math.log10(eval(valor));
            break;
        case 'sqrt':
            resultado = Math.sqrt(eval(valor));
            break;
        }
        pantalla.value = resultado;
    } catch (e) {
        pantalla.value = "Error";
    }
}*/

function calcular() {
    try {
        let expresion = pantalla.value
            .replace(/\^/g, '**') //potencia
            .replace(/π/g, Math.PI.toFixed(8))
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/log\(/g, 'Math.log10(')
            .replace(/sqrt\(/g, 'Math.sqrt(');

        pantalla.value = eval(expresion);
        resultadoMostrado=true; //Marca para saber que se mostro el resultado
    } catch (e) {
        pantalla.value = "Error";
        resultadoMostrado=false;
    }
}

/*function gradosARadianes(grados) {
    return grados * (Math.PI / 180);
}*/

//permitir que se ingrese datos por teclado
document.addEventListener("keydown", function (event) {
    const tecla = event.key;

    if (!isNaN(tecla) || "+-*/.%()".includes(tecla)) {
        // Si es número o símbolo permitido, lo agregamos
        agregar(tecla);
    } else if (tecla === "Enter") {
        calcular();
    } else if (tecla === "Backspace") {
        borrar();
    } else if (tecla === "Escape") {
        limpiar();
    } else if (tecla === "^") {
        agregar("^");
    } else if (tecla.toLowerCase() === "p") {
        agregar("π");
  }
});

// Botón para alternar modo oscuro
document.getElementById("toggleModo").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    // Cambia el texto del botón
    if (document.body.classList.contains("dark-mode")) {
        this.textContent = "☀️";
    } else {
        this.textContent = "🌙";
    }
});