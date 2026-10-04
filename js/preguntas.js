//VARIABLES
//Para tomar elementos
//botones
const botonInicio = document.querySelector('#botonInicioPreg');
const botonSiguiente = document.querySelector('#botonSiguiente');
const botonReinicio = document.querySelector('#botonReiniciar');
//Paginas
const pagInfo = document.querySelector('#pantallaReglas');
const pagJuego = document.querySelector('#pantallaJuego');
const pagResultados = document.querySelector('#pantallaResultados');
//Juego elementos
const progreso = document.querySelector('#progreso');
const temporizador = document.querySelector('#temporizador');
const elementoPregunta = document.querySelector('#pregunta');
const opciones = document.querySelector('#opciones');
const resultado = document.querySelector('#resultado');
const resultadoFinal = document.querySelector('#resultadoFinal');
let respuestasCorrectas = document.querySelector('#respuestasCorrectas');
//API
const urlApi ='https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple';
//Juego
let preguntas = [];
let preguntaActual = 0;
let puntaje = 0;
let correctas = 0;
let tiempo = 15;
let timer;

//Funcion para que al apretar el boton aparezca una pantalla en donde se muestre el mensaje
function iniciarJuego(){
    pagInfo.style.display = 'none';
    pagJuego.hidden = false;
    cargarPreguntas();
}
botonInicio.addEventListener('click', iniciarJuego);
//Cargar preguntas
async function cargarPreguntas() {
    try{
        const respuesta = await fetch(urlApi);
        if(!respuesta.ok){
            throw new Error(`HTTP ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        console.log(datos);
    }
    catch (error) {
        console.log('No se pudieron cargar las respuestas')
    }
}