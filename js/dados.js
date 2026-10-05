 // Variables de control de la partida
    let rachaActual = 0;
    const metaRacha = 5;

    // Selección de elementos del DOM
    const botonComenzar = document.querySelector("#btn-comenzar");
    const contenedorJuego = document.querySelector("#juego-container");
    const imagenDado1 = document.querySelector("#dado1");
    const imagenDado2 = document.querySelector("#dado2");
    const textoResultado = document.querySelector("#resultado");
    const textoRacha = document.querySelector("#racha");
    const articuloPadre = document.querySelector("article");

    // Elementos pantalla de victoria
    const pantallaVictoria = document.querySelector("#pantalla-victoria");
    const botonReiniciar = document.querySelector("#btn-reiniciar-juego");

    if (botonComenzar) {
        const jugarDados = () => {
            if (contenedorJuego) {
                if (!contenedorJuego.classList.contains("activo")) {
                    contenedorJuego.classList.add("activo");
                    if (articuloPadre) articuloPadre.classList.add("juego-en-curso");
                }
                contenedorJuego.scrollIntoView({ behavior: 'smooth' });
            }

            // Deshabilitar botón durante el giro
            botonComenzar.disabled = true;
            botonComenzar.textContent = "Girando dados...";
            
            if (textoResultado) {
                textoResultado.textContent = "🎲 Tirando...";
                textoResultado.style.color = "rgb(155, 155, 220)";
            }

            // Iniciar animación dado girando
            if (imagenDado1) imagenDado1.classList.add("girando");
            if (imagenDado2) imagenDado2.classList.add("girando");

            // Esperar 1 segundo antes de calcular el resultado
            setTimeout(() => {
                const numero1 = Math.floor(Math.random() * 6) + 1;
                const numero2 = Math.floor(Math.random() * 6) + 1;
                const suma = numero1 + numero2;

                // 
                if (imagenDado1) {
                    imagenDado1.src = `imagenes/imgDados/dado_${numero1}.png`;
                    imagenDado1.classList.remove("girando");
                }
                if (imagenDado2) {
                    imagenDado2.src = `imagenes/imgDados/dado_${numero2}.png`;
                    imagenDado2.classList.remove("girando");
                }

                const ganoRonda = suma >= 7;

                // Control de racha
                if (ganoRonda) {
                    rachaActual++;
                    
                    if (rachaActual >= metaRacha) {
                        let partidasGuardadas = [];
                        const datosPrevios = localStorage.getItem('recordsDados');
                        if (datosPrevios) {
                            partidasGuardadas = JSON.parse(datosPrevios);
                        }

                        partidasGuardadas.push({
                            rachaAlcanzada: rachaActual
                        });
                        
                        localStorage.setItem('recordsDados', JSON.stringify(partidasGuardadas));

                        if (pantallaVictoria) pantallaVictoria.classList.remove("oculto");
                    }
                } else {
                    rachaActual = 0;
                }

                // Mostrar resultado
                if (textoResultado) {
                    textoResultado.textContent = ganoRonda
                        ? `Dado blanco (${numero1}) + Dado negro (${numero2}) = ${suma}. 🎉 ¡Ganaste esta ronda!`
                        : `Dado blanco (${numero1}) + Dado negro (${numero2}) = ${suma}. 😢 Menos de 7, racha reiniciada a 0.`;
                    
                    textoResultado.style.color = ganoRonda ? "rgb(180, 255, 180)" : "rgb(255, 180, 180)";
                }

                // Interfaz de racha
                if (textoRacha) {
                    textoRacha.textContent = `🔥 Racha: ${rachaActual} / ${metaRacha}`;
                    textoRacha.classList.add("animar-rebote");
                    setTimeout(() => textoRacha.classList.remove("animar-rebote"), 500);
                }

                // Rehabilitar botón si no ha alcanzado la meta
                if (rachaActual < metaRacha) {
                    botonComenzar.disabled = false;
                    botonComenzar.textContent = "¡Tirar de nuevo!";
                }
            }, 1000);
        };

        botonComenzar.addEventListener("click", jugarDados);

        if (botonReiniciar) {
            botonReiniciar.addEventListener("click", () => {
                rachaActual = 0;
                
                if (textoRacha) textoRacha.textContent = `🔥 Racha: ${rachaActual} / ${metaRacha}`;
                if (pantallaVictoria) pantallaVictoria.classList.add("oculto");
                
                botonComenzar.disabled = false;
                botonComenzar.textContent = "¡Tirar de nuevo!";
            });
        }
    }