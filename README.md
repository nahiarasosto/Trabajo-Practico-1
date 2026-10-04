# Trabajo-Practico-1
Repositorio del TP1 de Informática General

Nombre del proyecto: Cachín

Integrantes del grupo:  
Nahiara Aylen Sosto  
Maria Luz Gomez  
Maitena Achigar  

Datos de materia:
Este trabajo práctico forma parte de la materia Informática General, cátedra Drelichman. De la carrera Artes Multimediales, Universidad Nacional de las Artes.

Descripción general del sitio:  
"Cachín" simula un sitio web de un empresa/emprendimiento de eventos, con 3 juegos para que el usuario pueda probar: preguntas, cartas y dados, todos creados para cada una de las integrantes de éste grupo. Cada vez que el usuario completo un juego se guardan sus datos para ser mostrados en un tablero de puntuaciones aparte. Y por último, tambien se encuentra una pequeña página identificando a las integrantes del grupo.

Descripción y reglas de cada juego:  
  
Juego de preguntas  
El juego de preguntas es una clásica Trivia de Cultura General que consta de 10 preguntas. Cada pregunta debe ser respondida antes de que termine el temporizador de 15 segundos y cuenta con 4 opciones, de las cuales solo una es correcta.

Cuando la respuesta es correcta, se suman puntos según el tiempo restante: 150 puntos si quedan entre 11 y 15 segundos, 125 puntos si quedan entre 6 y 10 segundos y 100 puntos si quedan entre 1 y 5 segundos. Si la respuesta es incorrecta o se termina el tiempo, no se suman puntos.

Al finalizar las 10 preguntas, se muestra el puntaje final, junto con la cantidad de respuestas correctas e incorrectas, y se puede comenzar una nueva partida.

Juego de cartas  
El juego de cartas se basa en las reglas del clásico juego "Casita Robada", adaptadas para ofrecer una experiencia "Humano vs Maquina". Las reglas son las siguientes:  
Objetivo: acumular más cartas que el oponente hasta que ambos se queden sin cartas y no queden suficientes en el mazo para repartir.  
Acciones del jugador:  
Robar de la mesa: Si una carta de tu mano tiene el mismo número que una carta del centro, se suman las dos cartas a la casita.  
Robar al oponente: Si una carta de tu mano tiene el mismo número que la carta sobre la casita del oponente, se roba la casa llena.  
Descartar: Podés descartar una carta de tu mano al centro de la mesa. Aunque también podrás hacerlo sin importar que tengas una jugada disponible.  
Funcionalidad:  
Tanto vos como la IA reciben 6 cartas obtenidas de forma aleatoria. Se colocan 4 cartas en el centro y las restantes forman el mazo.  
Cuando ambos se queden sin cartas, se repartirán seis cartas nuevas a cada uno si quedan al menos 12 cartas en el mazo. Si quedan menos de 12, la partida termina.  
La partida termina cuando ambos se quedan sin cartas y quedan menos de 12 cartas en el mazo. Gana quien tenga más cartas en su casita!

Juego de dados  


Organización de archivos y carpetas:  
Trabajo-Practico-1
cartas.html, dados.html, index.html, integrantes.html, preguntas.html, tablero.html, README.md  
css: estilos.css  
imagenes: imgJuegoCartas, fondo-3,jpg, iconMai.jpg, iconMari.jpg, iconNahi.jpg  
js: cartas.js, dados.js, preguntas.js, script.js, tablero.js  

Tecnologías utilizadas:  
VScode  Copilot SDK, Chat GPT

Declaración de uso de IA: 

Descripción de las principales funcionalidades:

API utilizada:

Principales decisiones técnicas: