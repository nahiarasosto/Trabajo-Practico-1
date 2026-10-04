/* Juego de cartas */
//Todos los datos capturados del juego de cartas

const partidas = JSON.parse(localStorage.getItem('recordsCasitaRobada')) || [];
const estadisticas = document.querySelector('#estadisticasCartas');
const lista = document.querySelector('#listaRecordsCartas');

//Variables para contar victorias, empates, derrotas, mejor puntaje y records

let victorias = 0;
let empates = 0;
let derrotas = 0;
let mejorPuntaje = 0;
let records = '';

//Recoore las partidas para actualizar las estadísticas y records

for (let i = 0; i < partidas.length; i++) {
    const partida = partidas[i];

    if (partida.resultado === 'Ganaste') victorias++;
    if (partida.resultado === 'Empate') empates++;
    if (partida.resultado === 'Perdiste') derrotas++;
    if (partida.cartasJugador > mejorPuntaje) mejorPuntaje = partida.cartasJugador;

    records += `<li>${partida.resultado}: vos ${partida.cartasJugador} - IA ${partida.cartasIA}</li>`;
}

//Actualiza el HTML

estadisticas.innerHTML = `
    <p>Partidas: ${partidas.length} | Victorias: ${victorias} | Empates: ${empates} | Derrotas: ${derrotas}</p>
    <p>Mejor puntaje: ${mejorPuntaje} cartas</p>
`;
//Mensaje por si no hay partidas registradas

lista.innerHTML = records || '<li>Todavía no hay partidas registradas</li>';