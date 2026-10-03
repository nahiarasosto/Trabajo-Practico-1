//VARIABLES
//Para tomar elementos
const boton = document.querySelector('#botonInicioPreg');
const pagInfo = document.querySelector('#ocultarPag');
const pagJuego = document.querySelector('#seccionJuegoPreg');
//API
const urlApi ='https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple';

//Funcion para que al apretar el boton aparezca una pantalla en donde se muestre el mensaje
boton.addEventListener('click', iniciarJuego);
function iniciarJuego(){
    pagJuego.innerHTML = '<h2>¡¡¡Comienza la Trivia!!!</h2>'
}
