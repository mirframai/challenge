# JUGONES DE LA LIGA
Espero que te guste el fútbol o programar, si no esta prueba va a ser muy aburrida jeje

En este ejercicio vas a tener que tocar backend y frontend, pero no te asustes si no tienes experiencia en *node* ni *expressjs*, es Javascript y verás como te resultará sencillo. 

Tampoco te eches atrás por el número de ejercicios, sabemos que son un montón y de primeras puede asustar. No es necesario que los hagas todos si no te da tiempo, pero **sigue el orden**.

## Algunas pautas

### GITHUB
- Te hemos hecho llegar un repo con el código base de la prueba en zip, úsalo para realizar los ejercicios que aquí se detallan.
- Haz un commit por cada ejercicio. El título de cada commit debe comenzar por **Ejercicio N**. 
- No hagas commits adicionales.
- Cuando lo tengas todo listo sube el repositorio a tu cuenta de github y pásanos el link a él para que podamos valorarte.

### Valoraremos positivamente:
- Que hagas la prueba en **React** o en su defecto **Vanilla JS**.
- Que *no* añadas más *librerias*.
- El uso de **CSS Flex**.

### PROYECTO
El proyecto está dividido en dos carpetas:

1- Api
* En el encontraras el codigo de la api.
* Todo lo necesario para la prueba está dentro de api/index.js
* Ejecuta la api situándote con la terminal en el folder
```
$ cd path/to/repo/folder/api
$ node start
```
* Ya debes tener la api corriendo en **localhost:3001**

2- App
* En esta carpeta está el frontal. Es un scaffolding de react, pero si no quieres usar React móntatelo como quieras, pero recuerda mejor en **Vanilla JS**.
* Familiarizate con App.js y App.css 
* Ejecuta la app situándote con la terminal en su folder.
```
$ cd path/to/repo/folder/app
$ node start
```
* Se arrancará en **localhost:3000**


### Api endpints: 
```
GET /teams
```

```
GET /players
```

```
GET /pichichis
```

```
POST /transfer
Body { playerId: string, teamId: string }
```


## Ejercicio 1
Ve a la api (api/index.js) y haz que el endpoint players devuelva un array con los jugadores de los diferentes equipos en un mismo array. Debe tener esta pinta. Tienes **toda** la información necesaria.
```javascript
 [
   {
     name: 'Ronaldo',
     position: 'DEL',
     img: 'url/to/image.png',
     teamId: 10,
   }, ...
 ]
 ```
 *TIP*: familiarizate primero con los objetos de los equipos: madrid, barcelona y atletico.
 *TIP2*: cuidado que los objetos de los equipos porque son de diferentes proveedores.

## Ejercicio 2
En la pantalla app/App.js hay una lista con los equipos. Bórrala y haz una lista con los jugadores.
- Debes obtener los players en lugar de los equipos y pintar su nombre.
- Borra todo el código que no sea necesario. Deja solo ul título "Jugadores" y el nombre de cada jugador en una lista.
- Fíjate en los visuales.
** Los comentarios de los ejercicios no los borres.

## Ejercicio 3
Crea el diseño propuesto en los visuales.
- Los visuales los puedes encontrar dentro de la carpeta design. 
- Cada tarjeta de jugador debe contener la imagen, su nombre, su equipo y el escudo de su equipo.
- Las tarjetas deben alinearse siempre en el centro de la pantalla.
- El mínimo width que soportan es de **280px**.
- En pantallas mayores a **600px** la imagen es más grande.
- En general, guiate por los visuales para que se parezca lo máximo posible.


## Ejercicio 4
Haz un header para la página y un botón dentro de él.
- Header es de color **#EEEEEE**, mide de alto **40px**. 
- Siempre visible en el top de la pantalla.
- Las tarjetas de jugadores empiezan justo despues del header, en el espacio que llamaremos contenido.
- Asegurate que si las tarjetas desbordan de la pantalla haya scroll para llegar a ellas.
- El botón tiene el label: "Pichichis".
- Guiate por los visuales.

## Ejercicio 5
Haz un componente de modal. Hazlo reutilizable, lo usaremos más de una vez.
- Aparece sobre el contenido de toda la página bloqueando la interacción del contenido con una capa negra translucida.
- Debe ser capaz de cerrarse con un botón de cancelar que aparece en la zona de abajo de la modal.
- Tiene un width máximo de **500px**.
- Nunca ocupa el **100% del height** de la pantalla.
- Si el contenido desborda debe haber scroll.
- Haz que el botón de *Pichichis* habra esta modal, por ahora con contenido dummy.
- Guiate por los visuales.

## Ejercicio 6:
Utiliza el componente de la modal para pintar la tabla de pichichis.
  - Haz una lista con los 'pichichis'.
  - Cada item debe contener al menos el nombre del jugador y los goles.
  - Muestra la lista dentro de la modal. No hay diseño propuesto en este caso, haz algo sencillo.

## Ejercicio 7:
Haz un botón para ordenar por número de goles.
  - Si aprieras en ordenar por goles se pinta la lista ordenada por goles
  - Si vuelves a apretar se muestra la lista invertida
  - Añade la flecha propuesta en los visuales para indicar si la lista está invertida o no.

## Ejercicio 8:
El público objetivo de nuestra aplicación son altos directivos de clubes de La Liga. Suelen viajar mucho en avión donde no gozan de conexión a internet pero es donde suelen tener tiempo para revisar a sus jugones. Hay que conseguir que puedan usar la app en estas condiciones.
- La única funcionalidad que no se podrá usar es la de traspasos (ejercios sucesivos).
- Debe ser posible realizar un *refresh* de la página y siga funcionando.

## Ejercicio 9:
Ha llegado una nueva funcionalidad que es la de traspasos. 
- Si haces click en un jugador de la lista se tiene que abrir una modal.
- Crea una nueva componente para esto.
- Debe contener dos selectores. Uno con el equipo y otro con todos los jugadores.
- Asegúrate que al elegir un equipo no mostremos los jugadores de ese equipo en el selector de jugadores.
- Al seleccionar un equipo muestra su dinero disponible.
- Por ultimo, con el equipo y jugador seleccionado realiza la transacción. Debes añadir un botón de Acceptar para ello.
- Al apretarlo hace una api call al endpoint **/transfer**. El método es POST. Envía en el body de la request un JSON con:
```javascript
  {
    playerId: 11,
    teamId: 2
  }
```
- Muestra un mensaje de éxito si se realizo la transacción correctamente. Devolverá un array vacío la respuesta de la api en este caso.
- En el caso de que haya habido un error te devolverá un json: 
```
{ error: true, code: int, message: string }
```
```
codes:
1: 'team not found'
2: 'player not found'
3: 'the player is into this team'
4: 'insufficients funds'
```
- No te preocupes si ves que no resta el dinero de las transacciones la api, hay un bug en ella.
- Guiate por los visuales.


## Ejercicio 10:
Arregla la api para que sea capaz de acabar las transacciones. Como te habrás dado cuenta antes no se resta la cantidad en la transacción.
- Vuelve a la modal de transacción del frontal y asegurate que todo sigue funcionando correctamente.
