document.addEventListener("DOMContentLoaded", () => {

    // Variables
    let rachaActual = 0;
    const metaRacha = 5; // Cantidad de victorias seguidas necesarias para completar el objetivo

    const botonComenzar = document.querySelector("#btn-comenzar");
    const contenedorJuego = document.querySelector("#juego-container");
    const imagenDado1 = document.querySelector("#dado1");
    const imagenDado2 = document.querySelector("#dado2");
    const textoResultado = document.querySelector("#resultado");
    const textoRacha = document.querySelector("#racha");
    const articuloPadre = contenedorJuego ? contenedorJuego.closest("article") : null;

    // Elementos de la pantalla de victoria
    const pantallaVictoria = document.querySelector("#pantalla-victoria");
    const botonReiniciar = document.querySelector("#btn-reiniciar-juego");

    if (botonComenzar) {
        // Declaración de la función principal para ejecutar una tirada de dados
        const jugarDados = () => {

            // Activa visualmente el contenedor del juego si es la primera tirada
            if (!contenedorJuego.classList.contains("activo")) {
                contenedorJuego.classList.add("activo");
                if (articuloPadre) articuloPadre.classList.add("juego-en-curso");
                botonComenzar.textContent = "¡Tirar de nuevo!";
            }

            // Desplaza suavemente la pantalla hacia la zona del juego
            contenedorJuego.scrollIntoView({ behavior: 'smooth' });

            // Bloquea temporalmente el botón durante el giro de dados para evitar múltiples clicks
            botonComenzar.disabled = true; // Deshabilita la interacción con el botón
            botonComenzar.textContent = "Girando dados...";
            textoResultado.textContent = "🎲 Tirando...";
            textoResultado.style.color = "rgb(155, 155, 220)";

            // "animacion" de dados girando
            imagenDado1.classList.add("girando");
            imagenDado2.classList.add("girando");

            // setTimeout ejecuta la función interna tras esperar 1 segundo
            setTimeout(() => {

                // Genera dos números aleatorios del 1 al 6 para cada dado
                const numero1 = Math.floor(Math.random() * 6) + 1;
                const numero2 = Math.floor(Math.random() * 6) + 1;
                const suma = numero1 + numero2; // Calcula el total obtenido en la tirada

                imagenDado1.src = `imagenes/imgDados/dado_${numero1}.png`;
                imagenDado2.src = `imagenes/imgDados/dadon_${numero2}.png`;

                // Remueve las clases CSS de animación al finalizar el tiempo de giro
                imagenDado1.classList.remove("girando");
                imagenDado2.classList.remove("girando");

                // Condición de victoria de la ronda: la suma debe ser igual o mayor a 7
                const ganoRonda = suma >= 7;

                // Si ganó la ronda actual, incrementa la racha de victorias
                if (ganoRonda) {
                    rachaActual++;
                    
                      // recopila informacion para la tabla de puntuaciones
                    if (rachaActual >= metaRacha) {
                        const partidasGuardadas = JSON.parse(localStorage.getItem('recordsDados')) || [];
                        partidasGuardadas.push({
                            resultado: 'Ganaste',
                            rachaFinal: rachaActual,
                            fecha: new Date().toLocaleDateString()
                        });
                        localStorage.setItem('recordsDados', JSON.stringify(partidasGuardadas));

                        if (pantallaVictoria) pantallaVictoria.classList.remove("oculto");
                    }
                } else {
                    rachaActual = 0; // Si la suma fue menor a 7, se reinicia la racha a cero
                }

                textoResultado.textContent = ganoRonda
                    ? `Dado blanco (${numero1}) + Dado negro (${numero2}) = ${suma}. 🎉 ¡Ganaste esta ronda!`
                    : `Dado blanco (${numero1}) + Dado negro (${numero2}) = ${suma}. 😢 Menos de 7, racha reiniciada a 0.`;
                
                    // Cambia el color del texto del resultado (verde si ganó, rojo si perdió)
                textoResultado.style.color = ganoRonda ? "rgb(180, 255, 180)" : "rgb(255, 180, 180)";

                if (textoRacha) {
                    textoRacha.textContent = `🔥 Racha: ${rachaActual} / ${metaRacha}`;
                    textoRacha.classList.add("animar-rebote");
                    setTimeout(() => textoRacha.classList.remove("animar-rebote"), 500);
                }

                if (rachaActual < metaRacha) {
                    botonComenzar.disabled = false;
                    botonComenzar.textContent = "¡Tirar de nuevo!";
                }
            }, 1000);// 1000 ms(1 segundo) = tiempo que dura el giro antes de mostrar el resultado
        };

        botonComenzar.addEventListener("click", jugarDados);

        if (botonReiniciar) {
            botonReiniciar.addEventListener("click", () => {
                rachaActual = 0;
                
                if (textoRacha) textoRacha.textContent = `🔥 Racha: ${rachaActual} / ${metaRacha}`;
                if (pantallaVictoria) pantallaVictoria.classList.add("oculto");
                
                // Llama a la función para realizar una nueva tirada de inmediato
                jugarDados();
            });
        }
    }
});