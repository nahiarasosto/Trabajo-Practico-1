// 1. Seleccionamos los elementos del HTML
const botonComenzar = document.getElementById("btn-comenzar");
const contenedorJuego = document.getElementById("juego-container");
const imagenDado1 = document.getElementById("dado1");
const imagenDado2 = document.getElementById("dado2");
const textoResultado = document.getElementById("resultado");

// 2. Función que inicia el juego con animación
function jugarDados() {
    // Si el contenedor estaba oculto, lo mostramos
    if (contenedorJuego.style.display === "none") {
        contenedorJuego.style.display = "block";
    }

    // Deshabilitar el botón y cambiar texto mientras "giran"
    botonComenzar.disabled = true;
    botonComenzar.textContent = "Girando dados...";
    textoResultado.textContent = "🎲 Tirando...";
    textoResultado.style.color = "rgb(155, 155, 220)";

    // Agregar la clase CSS de animación a ambos dados
    imagenDado1.classList.add("girando");
    imagenDado2.classList.add("girando");

    // Esperar exactamente 1 segundo (1000 milisegundos) para mostrar el resultado
    setTimeout(() => {
        // Generar números aleatorios del 1 al 6
        const numero1 = Math.floor(Math.random() * 6) + 1;
        const numero2 = Math.floor(Math.random() * 6) + 1;

        // Cambiar las imágenes según los números obtenidos
        imagenDado1.src = `imagenes/imgDados/dado_${numero1}.png`;
        imagenDado2.src = `imagenes/imgDados/dadon_${numero2}.png`;

        // Quitar la clase de animación para que pueda volver a girar la próxima vez
        imagenDado1.classList.remove("girando");
        imagenDado2.classList.remove("girando");

        // Sumar los resultados
        const suma = numero1 + numero2;

        // Evaluar el objetivo (Sumar 7 o más)
        if (suma >= 7) {
            textoResultado.textContent = `Dado blanco (${numero1}) + Dado negro (${numero2}) = ${suma}. 🎉 ¡Ganaste!`;
            textoResultado.style.color = "rgb(180, 255, 180)";
        } else {
            textoResultado.textContent = `Dado blanco (${numero1}) + Dado negro (${numero2}) = ${suma}. 😢 Perdiste, intenta de nuevo.`;
            textoResultado.style.color = "rgb(255, 180, 180)";
        }

        // Volver a habilitar el botón
        botonComenzar.disabled = false;
        botonComenzar.textContent = "¡Tirar de nuevo!";
    }, 1000); // 1000 ms = 1 segundo
}

// 3. Escuchar el evento click en el botón
if (botonComenzar) {
    botonComenzar.addEventListener("click", jugarDados);
}