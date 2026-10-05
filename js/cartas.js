/* Guarda las cartas, los turnos y los elementos HTML */

const imgCartas = { carpeta: 'imagenes/imgJuegoCartas' };

//Objeto que guarda el estado del juego

let juego = {
    mazo: [],
    mesa: [],
    jugador: { mano: [], casita: [] },
    ia: { mano: [], casita: [] },
    posicionCartaSeleccionada: null,
    esTurnoJugador: true
};

//Elementos HTML

const botonComenzar = document.querySelector('.botonComenzar');
const botonReiniciar = document.querySelector('.botonReiniciar');
const botonRobarCarta = document.querySelector('.botonRobarCarta');
const botonRobarOponente = document.querySelector('.botonRobarOponente');
const botonDescartar = document.querySelector('.botonDescartar');
const seccionJuego = document.querySelector('.seccionJuego');
const seccionGameOver = document.querySelector('.seccionGameOver');
const manoJugador = document.querySelector('#manoJugador');
const avisoTurno = document.querySelector('.avisoTurno');

//Oculta la sección del juego y la del Game Over

seccionJuego.style.display = 'none';
seccionGameOver.style.display = 'none';

//Eventos de los botones

botonComenzar.addEventListener('click', iniciarPartida);
botonReiniciar.addEventListener('click', reiniciarPartida);
botonRobarCarta.addEventListener('click', robarDeMesa);
botonRobarOponente.addEventListener('click', robarCasitaIA);
botonDescartar.addEventListener('click', descartarCarta);

/* Preparación de la partida: mazos y reparto de cartas */

function iniciarPartida() {

    botonComenzar.disabled = true;
    seccionGameOver.style.display = 'none';

    const palos = ['cups', 'clubs', 'coins', 'swords'];
    const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    juego.mazo = [];

    juego.jugador.mano = [];
    juego.ia.mano = [];
    juego.jugador.casita = [];
    juego.ia.casita = [];
    juego.mesa = [];
    juego.esTurnoJugador = true;
    juego.posicionCartaSeleccionada = null;

    //Crea el mazo de cartas y las mezcla aleatoriamente

    for (let i = 0; i < palos.length; i++) {
        for (let j = 0; j < numeros.length; j++) {
            let numeroFormateado = numeros[j];
            if (numeroFormateado < 10) numeroFormateado = '0' + numeroFormateado;

            juego.mazo.push({
                numero: numeros[j],
                palo: palos[i],
                img: imgCartas.carpeta + '/card_' + palos[i] + '_' + numeroFormateado + '.svg'
            });
        }
    }

    for (let i = juego.mazo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const cartaTemporal = juego.mazo[i];
        juego.mazo[i] = juego.mazo[j];
        juego.mazo[j] = cartaTemporal;
    }

    for (let i = 0; i < 4; i++) {
        juego.mesa.push(juego.mazo.pop());
    }
    repartirRonda();

    seccionJuego.style.display = 'block';
    actualizarInterfaz();
}

/* Reparte seis cartas a cada jugador */

function repartirRonda() {
    if (juego.mazo.length >= 12) {
        for (let i = 0; i < 6; i++) {
            juego.jugador.mano.push(juego.mazo.pop());
            juego.ia.mano.push(juego.mazo.pop());
        }
    }
}

/* Acciones del humano */
//Si puede robar una casita, robar una carta de la mesa o descartar

//Selección una carta de la mano para usarla en una jugada

function seleccionarCartaMano(posicionCarta) {
    if (!juego.esTurnoJugador) return;
    if (posicionCarta < 0 || posicionCarta >= juego.jugador.mano.length) return;
    juego.posicionCartaSeleccionada = posicionCarta;
    actualizarInterfaz();
}

//Comprueba si la carta seleccionada coincide con una de la mesa

function robarDeMesa() {
    if (!juego.esTurnoJugador) return;
    if (juego.posicionCartaSeleccionada === null) {
        alert("Seleccioná primero una carta de tu mano");
        return;
    }

//Busca la carta seleccionada en la mano del jugador
//y verifica si hay una carta con el mismo número en la mesa

    const cartaMano = juego.jugador.mano[juego.posicionCartaSeleccionada];
    let posicionMesa = -1;
    for (let i = 0; i < juego.mesa.length; i++) {
        if (juego.mesa[i].numero === cartaMano.numero) {
            posicionMesa = i;
            break;
        }
    }

//Si encuentra una carta en la mesa con el mismo número,
//la roba y la agrega a la casita del jugador

    if (posicionMesa !== -1) {
        const cartaMesa = juego.mesa[posicionMesa];
        juego.mesa.splice(posicionMesa, 1);
        juego.jugador.mano.splice(juego.posicionCartaSeleccionada, 1);
        juego.jugador.casita.push(cartaMano, cartaMesa);
        finalizarTurnoHumano();
    } else {
        alert(" No hay cartas con ese número en la mesa.");
    }
}

//Comprueba si la carta seleccionada coincide con el "tope" de la casita de la IA

function robarCasitaIA() {
    if (!juego.esTurnoJugador) return;
    if (juego.posicionCartaSeleccionada === null) {
        alert("Seleccioná primero una carta de tu mano");
        return;
    }
    if (juego.ia.casita.length === 0) {
        alert("Tu oponente no tiene casita");
        return;
    }

    const cartaMano = juego.jugador.mano[juego.posicionCartaSeleccionada];
    const cartaTopeIA = juego.ia.casita[juego.ia.casita.length - 1];

    if (cartaMano.numero === cartaTopeIA.numero) {
        juego.jugador.mano.splice(juego.posicionCartaSeleccionada, 1);
        for (let i = 0; i < juego.ia.casita.length; i++) {
            juego.jugador.casita.push(juego.ia.casita[i]);
        }
        juego.jugador.casita.push(cartaMano);
        juego.ia.casita = [];
        alert("¡Le robaste la casita a la IA!");
        finalizarTurnoHumano();
    } else {
        alert("Tu carta no coincide con el tope de la IA");
    }
}

//Descarta la carta seleccionada

function descartarCarta() {
    if (!juego.esTurnoJugador) return;
    if (juego.posicionCartaSeleccionada === null) {
        alert("Seleccioná primero una carta de tu mano");
        return;
    }
    const cartaMano = juego.jugador.mano[juego.posicionCartaSeleccionada];

    juego.jugador.mano.splice(juego.posicionCartaSeleccionada, 1);
    juego.mesa.push(cartaMano);
    finalizarTurnoHumano();
}

//Finaliza el turno del jugador humano

function finalizarTurnoHumano() {
    juego.posicionCartaSeleccionada = null;
    actualizarInterfaz();
    pasarTurnoIA();
}

/* Pasar el turno a la IA */

function pasarTurnoIA() {
    juego.esTurnoJugador = false;
    actualizarAvisoTurno();

    // Simula una pausa para "procesar" la jugada

    setTimeout(function () {
        if (juego.ia.mano.length > 0) ejecutarIA();
        juego.esTurnoJugador = true;
        comprobarRondas();
        actualizarInterfaz();
    }, 2000);
}

/* Acciones de la IA */
//Comprueba si puede robar una casita, sino una carta de la mesa y sino, descarta

function ejecutarIA() {
    for (let i = 0; i < juego.ia.mano.length; i++) {
        const cartaIA = juego.ia.mano[i];
        const topeHumano = juego.jugador.casita[juego.jugador.casita.length - 1];

        //Comprueba si puede robar la casita del humano

        if (topeHumano && topeHumano.numero === cartaIA.numero) {
            juego.ia.mano.splice(i, 1);
            for (let j = 0; j < juego.jugador.casita.length; j++) {
                juego.ia.casita.push(juego.jugador.casita[j]);
            }
            juego.ia.casita.push(cartaIA);
            juego.jugador.casita = [];
            alert("¡La IA te robó tu casita!");
            return;
        }

        // Comprueba si puede robar una carta de la mesa

        let posicionMesa = -1;
        for (let j = 0; j < juego.mesa.length; j++) {
            if (juego.mesa[j].numero === cartaIA.numero) {
                posicionMesa = j;
                break;
            }
        }
        if (posicionMesa !== -1) {
            const cartaMesa = juego.mesa[posicionMesa];
            juego.mesa.splice(posicionMesa, 1);
            juego.ia.mano.splice(i, 1);
            juego.ia.casita.push(cartaIA, cartaMesa);
            alert(`La IA robó una carta de la mesa`);
            return;
        }
    }

    //Si ninguna de las dos funciona, descarta de su mano

    const descarte = juego.ia.mano.shift();
    juego.mesa.push(descarte);
    alert(`La IA descartó una carta al centro`);
}

/* Control de rondas */
//si ambos jugadores se quedaron sin cartas, la ronda termina y se reparten nuevas cartas

function comprobarRondas() {
    if (juego.jugador.mano.length === 0 && juego.ia.mano.length === 0) {
        if (juego.mazo.length >= 12) {
            alert("¡Repartiendo nueva ronda de cartas!");
            repartirRonda();
        } else {
            evaluarFinDeJuego();
        }
    }
}

/* Fin del juego y puntajes */

function evaluarFinDeJuego() {
    const puntajeJugador = juego.jugador.casita.length;
    const puntajeIA = juego.ia.casita.length;

    let textoResultado = `Tus cartas: <strong>${puntajeJugador}</strong> | Cartas de la IA: <strong>${puntajeIA}</strong><br><br>`;
    let resultado = 'Empate';

//Determina el ganador y muestra el mensaje correspondiente

    if (puntajeJugador > puntajeIA) {
        textoResultado += "<span class='ganadorMensaje'>¡Felicidades! Le ganaste a la Inteligencia Artificial!</span>";
        resultado = 'Ganaste';
    }
    else if (puntajeIA > puntajeJugador) {
        textoResultado += "<span class='perdedorMensaje'>¡Ganó la IA! Más suerte la proxima vez!</span>";
        resultado = 'Perdiste';
    }
    else {
        textoResultado += "<span class='empateMensaje'>¡Es un empate!</span>";
    }

    document.querySelector('#resultadoTexto').innerHTML = textoResultado;

//Muestra la sección de Game Over/Resultados y oculta la sección del juego,
//También habilita el botón de comenzar para iniciar una nueva partida

    seccionJuego.style.display = 'none';
    seccionGameOver.style.display = 'block';
    botonComenzar.disabled = false;

//Inserta el resultado en el historial

    let records = JSON.parse(localStorage.getItem('recordsCasitaRobada')) || [];

//Crea un objeto con la información de la partida jugada

    let nuevaPartida = {
        cartasJugador: puntajeJugador,
        cartasIA: puntajeIA,
        resultado: resultado
    };

    let insertado = false;

    for (let i = 0; i < records.length; i++) {
        if (nuevaPartida.cartasJugador >= records[i].cartasJugador) {
            records.splice(i, 0, nuevaPartida);
            insertado = true;
            break;
        }
    }

    if (!insertado) {
        records.push(nuevaPartida);
    }

    localStorage.setItem('recordsCasitaRobada', JSON.stringify(records));
}

/* Reinicia la partida */

function reiniciarPartida() {
    iniciarPartida();
}

/* Interfaz */
//Actualiza la interfaz de acuerdo al estado del juego

function actualizarInterfaz() {
    actualizarAvisoTurno();
    document.querySelector('#contenedorMazo').textContent = 'Cartas restantes en el mazo: ' + juego.mazo.length;

//"Dibuja" la mano del jugador y la de la IA, la mesa y las casitas

    let contenidoManoJugador = '<p>TU MANO</p>';
    for (let i = 0; i < juego.jugador.mano.length; i++) {
        const carta = juego.jugador.mano[i];
        let clase = '';

        if (juego.posicionCartaSeleccionada === i) {
            clase = 'seleccionada';

            let coincideMesa = false;
            for (let j = 0; j < juego.mesa.length; j++) {
                if (juego.mesa[j].numero === carta.numero) {
                    coincideMesa = true;
                    break;
                }
            }
            const topeIA = juego.ia.casita[juego.ia.casita.length - 1];
            if (coincideMesa || (topeIA && topeIA.numero === carta.numero)) {
                clase += ' conJugada';
            }
        }

        contenidoManoJugador += '<div class="cartaVisual ' + clase + '">';
        contenidoManoJugador += '<img src="' + carta.img + '" alt="Carta ' + carta.numero + '"></div>';
    }

    manoJugador.innerHTML = contenidoManoJugador;
    const cartasJugador = manoJugador.querySelectorAll('.cartaVisual');
    for (let i = 0; i < cartasJugador.length; i++) {
        const posicionCarta = i;
        cartasJugador[i].addEventListener('click', function () {
            seleccionarCartaMano(posicionCarta);
        });
    }

    let contenidoManoIA = '<p>MANO DE LA IA</p>';
    for (let i = 0; i < juego.ia.mano.length; i++) {
        contenidoManoIA += '<div class="cartaVisual"><img src="' + imgCartas.carpeta + '/card_back.svg" alt="Carta boca abajo"></div>';
    }
    document.querySelector('#manoIA').innerHTML = contenidoManoIA;

    dibujarCartas(document.querySelector('#cartasMesa'), juego.mesa);
    dibujarCasita('.casitaJugador', juego.jugador.casita);
    dibujarCasita('.casitaIA', juego.ia.casita);
}

/* Muestra de quién es el turno */

function actualizarAvisoTurno() {
    avisoTurno.textContent = juego.esTurnoJugador
        ? 'Es tu turno.'
        : 'Turno de la IA...';
}

/* Actualizar de acuerdo a la  partida */
//"Dibuja" la casita de cada jugador y la cantidad de cartas que tiene

function dibujarCasita(selector, cartas) {
    const casita = document.querySelector(selector);
    const contador = casita.querySelector('p');
    const contenedorCartas = casita.querySelector('.cartasCasitaContenedor');
    const nombreCasita = selector === '.casitaJugador' ? 'TU CASITA' : 'CASITA DE LA IA';

    contador.textContent = nombreCasita + ' (' + cartas.length + ' cartas)';
    dibujarCartas(contenedorCartas, cartas);
}

/* Dibuja una lista de cartas */

function dibujarCartas(contenedorCartas, cartas) {
    let contenido = '';
    for (let i = 0; i < cartas.length; i++) {
        contenido += '<div class="cartaVisual"><img src="' + cartas[i].img + '" alt="Carta ' + cartas[i].numero + '"></div>';
    }

    contenedorCartas.innerHTML = contenido;
}