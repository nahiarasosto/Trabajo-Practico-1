/* Juego de cartas */
//Todos los datos capturados del juego de cartas

const partidas = JSON.parse(localStorage.getItem('recordsCasitaRobada')) || [];
const estadisticas = document.querySelector('#estadisticasCartas');
const lista = document.querySelector('#listaRecordsCartas');

//Variables contador para victorias, empates, derrotas, mejor puntaje y records

let victorias = 0;
let empates = 0;
let derrotas = 0;
let mejorPuntaje = 0;
let records = '';

//Recorre las partidas para actualizar las estadísticas y records

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


/* Juego de preguntas */
//Todos los datos capturados del juego de preguntas

const partidasTrivia = JSON.parse(localStorage.getItem('registrosTrivia')) || [];
const estadisticasPreguntas = document.querySelector('#estadisticasPreguntas');
const listaPreguntas = document.querySelector('#listaRecordsPreguntas');

//Si hay elementos en el HTML, actualiza las estadísticas y la lista de partidas

if (estadisticasPreguntas && listaPreguntas) {
    estadisticasPreguntas.textContent = `Partidas registradas: ${partidasTrivia.length}`;
    let registrosTriviaHTML = '';

    if (partidasTrivia.length === 0) {
        registrosTriviaHTML = '<li>Todavía no hay partidas registradas</li>';
    } else {
        for (let i = 0; i < partidasTrivia.length; i++) {
            const partida = partidasTrivia[i];
            registrosTriviaHTML += `<li>Partida #${i + 1}: ${Number(partida.puntaje)} puntos - ${Number(partida.correctas)} correctas, ${Number(partida.incorrectas)} incorrectas</li>`;
        }
    }

    listaPreguntas.innerHTML = registrosTriviaHTML;
}



/* Juego de dados */
//todos los datos capturados del juego de dados

const partidasDados = JSON.parse(localStorage.getItem('recordsDados')) || [];
const estadisticasDados = document.querySelector('#estadisticasDados');
const listaRecordsDados = document.querySelector('#listaRecordsDados');

let totalVictoriasDados = 0;
let recordsDadosHTML = '';

//Recorre las partidas para actualizar las estadísticas y records

for (let i = 0; i < partidasDados.length; i++) {
    const partida = partidasDados[i];

    if (partida.resultado === 'Ganaste') totalVictoriasDados++;

    recordsDadosHTML += `
        <li>Partida #${i + 1} - Resultado: ${partida.resultado}
        (Racha: ${partida.rachaFinal}) - Fecha: ${partida.fecha}</li>
    `;
}

//Si hay elementos en el HTML, actualiza las estadísticas y la lista de partidas

if (estadisticasDados && listaRecordsDados) {
    estadisticasDados.innerHTML = `
        <p><strong>Total de partidas ganadas:</strong> ${totalVictoriasDados}</p>
    `;

//Mensaje por si no hay partidas registradas

    listaRecordsDados.innerHTML =
        recordsDadosHTML || '<li>Todavía no hay partidas registradas</li>';
}