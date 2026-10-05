document.addEventListener("DOMContentLoaded", () => {
    let rachaActual = 0;
    const metaRacha = 5;

    const botonComenzar = document.getElementById("btn-comenzar");
    const contenedorJuego = document.getElementById("juego-container");
    const imagenDado1 = document.getElementById("dado1");
    const imagenDado2 = document.getElementById("dado2");
    const textoResultado = document.getElementById("resultado");
    const textoRacha = document.getElementById("racha");
    const articuloPadre = contenedorJuego.closest("article");
    
    // Nuevos elementos de la pantalla de victoria
    const pantallaVictoria = document.getElementById("pantalla-victoria");
    const botonReiniciar = document.getElementById("btn-reiniciar-juego");

    if (botonComenzar) {
        function jugarDados() {
            if (!contenedorJuego.classList.contains("activo")) {
                contenedorJuego.classList.add("activo");
                if (articuloPadre) {
                    articuloPadre.classList.add("juego-en-curso");
                }
                botonComenzar.textContent = "¡Tirar de nuevo!";
            }

            contenedorJuego.scrollIntoView({ behavior: 'smooth' });

            botonComenzar.disabled = true;
            botonComenzar.textContent = "Girando dados...";
            textoResultado.textContent = "🎲 Tirando...";
            textoResultado.style.color = "rgb(155, 155, 220)";

            imagenDado1.classList.add("girando");
            imagenDado2.classList.add("girando");

            setTimeout(() => {
                const numero1 = Math.floor(Math.random() * 6) + 1;
                const numero2 = Math.floor(Math.random() * 6) + 1;

                imagenDado1.src = `imagenes/imgDados/dado_${numero1}.png`;
                imagenDado2.src = `imagenes/imgDados/dadon_${numero2}.png`;

                imagenDado1.classList.remove("girando");
                imagenDado2.classList.remove("girando");

                const suma = numero1 + numero2;

                // Cambia aquí la probabilidad si deseas que sea más fácil
                if (suma >= 5) {
                    rachaActual++;
                    
                    // Comprobar si llegó a la meta
                    if (rachaActual >= metaRacha) {
                        
                        // --- AQUÍ SE GUARDA LA PARTIDA GANADA EN EL LOCALSTORAGE ---
                        const partidasGuardadas = JSON.parse(localStorage.getItem('recordsDados')) || [];
                        partidasGuardadas.push({
                            resultado: 'Ganaste',
                            rachaFinal: rachaActual,
                            fecha: new Date().toLocaleDateString()
                        });
                        localStorage.setItem('recordsDados', JSON.stringify(partidasGuardadas));
                        // ----------------------------------------------------------------

                        // Mostrar pantalla de victoria
                        if (pantallaVictoria) {
                            pantallaVictoria.classList.remove("oculto");
                        }
                    } else {
                        textoResultado.textContent = `Dado blanco (${numero1}) + Dado negro (${numero2}) = ${suma}. 🎉 ¡Ganaste esta ronda!`;
                        textoResultado.style.color = "rgb(180, 255, 180)";
                    }

                    if (textoRacha) {
                        textoRacha.classList.add("animar-rebote");
                        setTimeout(() => textoRacha.classList.remove("animar-rebote"), 500);
                    }
                } else {
                    rachaActual = 0;
                    textoResultado.textContent = `Dado blanco (${numero1}) + Dado negro (${numero2}) = ${suma}. 😢 Menos de 7, racha reiniciada a 0.`;
                    textoResultado.style.color = "rgb(255, 180, 180)";
                }

                if (textoRacha) {
                    textoRacha.textContent = `🔥 Racha: ${rachaActual} / ${metaRacha}`;
                }

                // Si no ha ganado, habilitar el botón normalmente
                if (rachaActual < metaRacha) {
                    botonComenzar.disabled = false;
                    botonComenzar.textContent = "¡Tirar de nuevo!";
                }
            }, 1000);
        }

        botonComenzar.addEventListener("click", jugarDados);

        // Evento para reiniciar el juego desde la pantalla de victoria y tirar de inmediato
        if (botonReiniciar) {
            botonReiniciar.addEventListener("click", () => {
                rachaActual = 0;
                
                if (textoRacha) {
                    textoRacha.textContent = `🔥 Racha: ${rachaActual} / ${metaRacha}`;
                }
                
                // Ocultar la pantalla de victoria
                if (pantallaVictoria) {
                    pantallaVictoria.classList.add("oculto");
                }
                
                // ¡Disparar la función de jugar inmediatamente para que los dados giren de nuevo!
                jugarDados();
            });
        }
    }
});