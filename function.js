let resultadoMostrado=false;

let pantalla = document.getElementById("pantalla");
let historialDiv= document.getElementById("historial");
//cargar el historial desde localstorage
let historial= JSON.parse(localStorage.getItem("historial")) || [];
actualizarHistorial();

function agregar(valor) {
    if(resultadoMostrado){
        if(!isNaN(valor) || valor == '('){
            pantalla.value="";
        }
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
}

function limpiar() {
    pantalla.value = "";
}

function borrar() {
    pantalla.value = pantalla.value.slice(0, -1);
}

function calcular() {
    try {
        let expresion = pantalla.value;
        let expresionOriginal=expresion; //variable para el historial
        expresion= expresion
            .replace(/\^/g, '**') //potencia
            .replace(/π/g, Math.PI.toFixed(8))
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/log\(/g, 'Math.log10(')
            .replace(/sqrt\(/g, 'Math.sqrt(');

        let resultado = eval(expresion);
        pantalla.value = resultado;
        resultadoMostrado=true; //Marca para saber que se mostro el resultado

        //guardamos la operacion en el historial
        historial.push(`${expresionOriginal} = ${resultado}`);
        localStorage.setItem("historial", JSON.stringify(historial));
        actualizarHistorial();
    } catch (e) {
        pantalla.value = "Error";
        resultadoMostrado=false;
    }
}

//mostrar historial en pantalla
function actualizarHistorial(){
    historialDiv.innerHTML = historial.slice().reverse().join("<br>");
}

//borrar el historial
document.getElementById("borrarHistorial").addEventListener("click", borrarHistorial);

function borrarHistorial() {
    historial = [];
    localStorage.removeItem("historial");
    actualizarHistorial();
}

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