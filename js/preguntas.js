//VARIABLES

// Para tomar elementos

// Botones

const botonInicio = document.querySelector('#botonInicioPreg');
const botonSiguiente = document.querySelector('#botonSiguiente');
const botonReinicio = document.querySelector('#botonReiniciar');

// Pantallas

const pagInfo = document.querySelector('#pantallaReglas');
const pagJuego = document.querySelector('#pantallaJuego');
const pagResultados = document.querySelector('#pantallaResultados');

// Elementos del juego

const progreso = document.querySelector('#progreso');
const temporizador = document.querySelector('#temporizador');
const elementoPregunta = document.querySelector('#pregunta');
const opciones = document.querySelector('#opciones');
const resultado = document.querySelector('#resultado');
const resultadoFinal = document.querySelector('#resultadoFinal');
const respuestasCorrectas = document.querySelector('#respuestasCorrectas');

//API
const urlApi = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple&encode=url3986';

//Estado del juego
let preguntas = [];
let preguntaActual = 0;
let puntaje = 0;
let correctas = 0;
let incorrectas = 0;
let preguntaResuelta = false;

let tiempo = 15;
let timer;

//FUNCIONES DE UTILIDAD

// Decodifica el texto que viene de la API

function decodificar(texto) {
    return decodeURIComponent(texto);
}


// Mezcla las opciones de respuesta

function mezclar(arreglo) {

    return [...arreglo].sort(() => Math.random() - 0.5);

}


// Guarda el resultado en localStorage

function guardarPuntaje() {

    let registros = JSON.parse(localStorage.getItem('registrosTrivia')) || [];

    registros.push({
        puntaje: puntaje,
        correctas: correctas,
        incorrectas: incorrectas
    });

    localStorage.setItem('registrosTrivia', JSON.stringify(registros));

}

// INICIAR JUEGO

function iniciarJuego() {

    pagInfo.hidden = true;

    pagJuego.hidden = true;

    pagResultados.hidden = true;

    cargarPreguntas();

}

// CARGAR PREGUNTAS

async function cargarPreguntas() {

    try {

        const respuesta = await fetch(urlApi);

        if (!respuesta.ok) {

            throw new Error(`HTTP ${respuesta.status}`);

        }

        const datos = await respuesta.json();

        if (datos.response_code !== 0) {

            throw new Error('La API no pudo entregar las preguntas');

        }

        preguntas = datos.results.map((pregunta) => ({

            texto: decodificar(pregunta.question),

            correcta: decodificar(pregunta.correct_answer),

            opciones: mezclar([

                decodificar(pregunta.correct_answer),

                ...pregunta.incorrect_answers.map(decodificar)

            ])

        }));

        // Reiniciamos los valores del juego

        preguntaActual = 0;

        puntaje = 0;

        correctas = 0;

        incorrectas = 0;

        pagJuego.hidden = false;

        mostrarPregunta();

    }

    catch (error) {

        console.error(error);

        console.log('No se pudieron cargar las respuestas');

    }

}

// MOSTRAR PREGUNTA

function mostrarPregunta() {

    const actual = preguntas[preguntaActual];
    preguntaResuelta = false;

    progreso.textContent = `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;

    elementoPregunta.textContent = actual.texto;

    opciones.innerHTML = '';

    resultado.textContent = '';

    botonSiguiente.hidden = true;

    // Reiniciamos el temporizador

    tiempo = 15;

    temporizador.textContent = `Tiempo: ${tiempo} segundos`;

    // Creamos los botones de las respuestas

    actual.opciones.forEach((opcion) => {

        const boton = document.createElement('button');

        boton.type = 'button';

        boton.textContent = opcion;

        boton.addEventListener('click', () => responder(opcion));

        opciones.append(boton);

    });

    iniciarTemporizador();

}

// TEMPORIZADOR

function iniciarTemporizador() {

    clearInterval(timer);

    timer = setInterval(() => {

        tiempo--;

        temporizador.textContent = `Tiempo: ${tiempo} segundos`;

        if (tiempo <= 0) {

            clearInterval(timer);

            tiempoAgotado();

        }

    }, 1000);

}

// RESPONDER

function responder(eleccion) {

    if (preguntaResuelta) return;
    preguntaResuelta = true;
    clearInterval(timer);

    const actual = preguntas[preguntaActual];

    const botones = document.querySelectorAll('#opciones button');

    // Evita que se pueda elegir más de una respuesta

    botones.forEach((boton) => {

        boton.disabled = true;

    });

    if (eleccion === actual.correcta) {

        correctas++;

        // Los puntos dependen del tiempo utilizado

        if (tiempo >= 11) {

            puntaje += 150;

        } else if (tiempo >= 6) {

            puntaje += 125;

        } else {

            puntaje += 100;

        }

        resultado.textContent = '¡Correcto!';

    } else {

        incorrectas++;

        resultado.textContent = `Incorrecto. La respuesta correcta era: ${actual.correcta}`;

    }

    mostrarBotonSiguiente();

}

// CUANDO SE TERMINA EL TIEMPO

function tiempoAgotado() {

    if (preguntaResuelta) return;
    preguntaResuelta = true;

    const actual = preguntas[preguntaActual];

    const botones = document.querySelectorAll('#opciones button');

    botones.forEach((boton) => {

        boton.disabled = true;

    });

    incorrectas++;

    resultado.textContent = `Se terminó el tiempo. La respuesta correcta era: ${actual.correcta}`;

    mostrarBotonSiguiente();

}

// MOSTRAR BOTÓN SIGUIENTE

function mostrarBotonSiguiente() {

    if (preguntaActual === preguntas.length - 1) {

        botonSiguiente.textContent = 'Ver resultado';

    } else {

        botonSiguiente.textContent = 'Siguiente pregunta';

    }

    botonSiguiente.hidden = false;

}

// AVANZAR

function avanzarPregunta() {

    if (!preguntaResuelta) return;

    preguntaActual++;

    if (preguntaActual < preguntas.length) {

        mostrarPregunta();

    } else {

        terminarJuego();

    }

}

// TERMINAR JUEGO

function terminarJuego() {

    clearInterval(timer);

    pagJuego.hidden = true;

    pagResultados.hidden = false;

    resultadoFinal.textContent = `Puntaje final: ${puntaje} puntos`;

    respuestasCorrectas.textContent =
        `Respuestas correctas: ${correctas} | Respuestas incorrectas: ${incorrectas}`;

    guardarPuntaje();

}

// REINICIAR

function reiniciarJuego() {

    pagResultados.hidden = true;

    pagInfo.hidden = false;

}

// EVENTOS

botonInicio.addEventListener('click', iniciarJuego);

botonSiguiente.addEventListener('click', avanzarPregunta);

botonReinicio.addEventListener('click', reiniciarJuego);