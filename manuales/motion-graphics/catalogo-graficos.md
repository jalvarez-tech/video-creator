# Catálogo de gráficos

> ⚠️ **Archivo generado.** No lo edites a mano: sale de
> `remotion/src/plantillas/graficos/fichas.ts`. Para actualizarlo:
> `node manuales/motion-graphics/scripts/generar-catalogo.mjs`

La versión VIVA de este catálogo es la composición **`Catalogo`** del Remotion
Studio (`npm run dev` en `remotion/`): ahí cada gráfico se ve animándose de
verdad, con su ficha al lado. Este markdown es para consultarlo sin abrir el Studio.

Uso: `import { Titular, Contador, Subrayado } from "./graficos";`

**37 gráficos** en 8 familias.

## Estructura y entradas

| Gráfico | Qué es | Cuándo usarlo | Sonido | Archivo |
|---|---|---|---|---|
| **Escena** | Ventana temporal (Sequence) que da frames LOCALES a sus hijos. | Siempre que un bloque tenga principio y fin. Es lo que permite mover una escena entera cambiando un número. | — | `Entradas.tsx` |
| **Aparece** | Entrada estándar: muelle + rampa de opacidad + desenfoque opcional. | El gesto por defecto. `desenfoque` solo en el hero: hace que el texto 'llegue' en vez de 'aparecer'. | whoosh light / pop | `Entradas.tsx` |
| **Barrido** | Entrada por recorte duro de izquierda a derecha, con barra de color en el borde. | Piezas mecánicas y secas (ley de movimiento del 003). Alternativa al muelle cuando NO quieres materia blanda. | swoosh / click ui | `Entradas.tsx` |
| **Latido** | Oscilación de escala ±2 % mientras un dato se sostiene en pantalla. | Para que un elemento sostenido no se congele. Amplitudes mayores marean. | — | `Entradas.tsx` |
| **Ranura** | Posiciona un bloque en una banda horizontal, centrado. | Encuadre de gráficos sobre el avatar. R08: banda alta o banda de subtítulos, nunca sobre la cara. | — | `Entradas.tsx` |

## Tipografía

| Gráfico | Qué es | Cuándo usarlo | Sonido | Archivo |
|---|---|---|---|---|
| **Kicker** | Antetítulo en versalitas con tracking amplio. | Dar contexto o nombrar la sección. Nunca lleva el mensaje. | — | `Texto.tsx` |
| **Titular** | El mensaje de la escena. | Uno por escena. Dos titulares = ningún titular. | impact deep (en la palabra clave) | `Texto.tsx` |
| **Cifra** | El dato como protagonista, con tabular-nums y halo del propio color. | Cuando el número ES el argumento. Con fondo claro, baja el resplandor a 0. | data / money | `Texto.tsx` |
| **Etiqueta** | Frase de apoyo que explica la cifra o remata el titular. | Siempre por debajo del hero en tamaño; si compite, ya hay dos protagonistas. | — | `Texto.tsx` |
| **Sello** | Tarjeta traslúcida para agrupar contenido sobre vídeo. | Sobre el avatar, cuando el texto necesita fondo. Traslúcida a propósito: una caja opaca se lee como parche. | — | `Texto.tsx` |
| **Chip** | Píldora de estado o categoría. | Etiquetar (antes/después, incluido/excluido). El color es información, no decoración. | — | `Texto.tsx` |
| **Tachado** | Texto con línea que se dibuja encima. | El 'esto no' de una comparación. Que se dibuje (no que aparezca) es lo que lo convierte en gesto. | scribble | `Texto.tsx` |

## Fondos y atmósfera

| Gráfico | Qué es | Cuándo usarlo | Sonido | Archivo |
|---|---|---|---|---|
| **Scrim** | Degradado que oscurece un extremo para que el texto se lea sobre el vídeo. | Obligatorio con texto en la banda de subtítulos. Entra en 3-4 f y sale de golpe CON el texto. | — | `Fondos.tsx` |
| **Vineta** | Oscurecimiento de bordes que empuja el ojo al centro. | Casi siempre, en tomas de gráfico. Se nota al quitarla, no al ponerla. | — | `Fondos.tsx` |
| **Rejilla** | Trama técnica tipo blueprint hecha con gradientes (no con divs). | Sensación de sistema/plano/dato. A 0.04 es textura; a 0.15 ya roba atención. | — | `Fondos.tsx` |
| **Puntos** | Trama de puntos: la variante suave de la rejilla. | Cuando la rejilla se ve demasiado técnica para el tono de la pieza. | — | `Fondos.tsx` |
| **Resplandor** | Foco de luz de color: 'la sala' donde ocurre la escena. | Continuidad entre tomas de gráfico: misma sala, distinto ángulo (mover cx/cy). Es la única capa que puede respirar sola. | — | `Fondos.tsx` |
| **Halo** | Luz propia detrás de UN elemento (no de la pantalla). | Logos, cifras y nodos que deben emitir luz en vez de estar pegados encima. | — | `Fondos.tsx` |

## Datos

| Gráfico | Qué es | Cuándo usarlo | Sonido | Archivo |
|---|---|---|---|---|
| **Contador** | Número que se forma de A a B con outCubic y golpe opcional al aterrizar. | Siempre que la MAGNITUD sea el mensaje: el ojo mide el recorrido, no el resultado. | data (textura) + tick / chime al llegar | `Datos.tsx` |
| **BarraProgreso** | Proporción o avance, con umbral opcional. | Comparar una parte con el todo. Crece lineal: con easing mentiría sobre la velocidad del proceso. | whoosh light + chime al llegar | `Datos.tsx` |
| **Barras** | Gráfica de barras con crecimiento escalonado desde la base. | Comparar 2-5 magnitudes. El ORDEN del array es una decisión narrativa: dirige en qué orden se comparan. | data por barra | `Datos.tsx` |
| **ItemLista** | Ítem con marca y stagger incorporado por índice. | Listas de 3-5 puntos. El stagger va dentro: el ritmo entre ítems queda fijado por STAGGER.lista. | pop por ítem (alterna variantIndex) | `Datos.tsx` |
| **Regla** | Línea recta que se extiende mecánicamente. | Subrayado limpio, separador o 'medida'. Para subrayado a mano, usa Subrayado (Trazo). | — | `Datos.tsx` |

## Trazo dibujado

| Gráfico | Qué es | Cuándo usarlo | Sonido | Archivo |
|---|---|---|---|---|
| **Trazo** | Dibuja cualquier path SVG con evolvePath; punta de flecha opcional orientada por la tangente. | La primitiva de todo lo dibujado. Una línea que se dibuja se lee como alguien señalando. | scribble | `Trazo.tsx` |
| **Subrayado** | Subrayado a mano alzada con ondulación determinista. | Marcar LA palabra de la frase. Uno por escena: subrayar dos cosas es no subrayar. | scribble | `Trazo.tsx` |
| **Rodea** | Óvalo de rotulador alrededor de una palabra, con exceso al cerrar. | Más enfático que el subrayado: 'esto de aquí'. Dale el tamaño de la palabra + margen. | scribble / pen | `Trazo.tsx` |
| **Flecha** | Flecha curva de A a B con la punta siguiendo el trazo. | Relación causal. Curva = 'esto lleva a esto'; recta = 'de aquí a aquí'. | swoosh | `Trazo.tsx` |
| **Check** | Marca de confirmación dibujada en dos tiempos naturales. | Cerrar una promesa o validar un ítem. El sonido va en el frame en que cierra. | success / chime | `Trazo.tsx` |
| **Aspa** | Dos trazos que se cruzan en secuencia. | Descartar. En secuencia (no a la vez) para que se lea como gesto y no como icono. | error / impact sharp | `Trazo.tsx` |

## Partículas

| Gráfico | Qué es | Cuándo usarlo | Sonido | Archivo |
|---|---|---|---|---|
| **Partículas** | Sistema determinista con tres modos: estallido, ambiente y lluvia. | Estallido en el CTA o el dato clave; ambiente como atmósfera; lluvia para 'cae'. 40-80 bastan: 500 tumban el render. | sparkle (+ pop en el estallido) | `Particulas.tsx` |

## 3D

| Gráfico | Qué es | Cuándo usarlo | Sonido | Archivo |
|---|---|---|---|---|
| **Escena3D** | Contenedor con perspective + preserve-3d: la 'lente' de la escena. | Envuelve TODO lo 3D. Perspectiva baja = gran angular; alta = teleobjetivo. | — | `Tarjeta3D.tsx` |
| **Tarjeta3D** | Tarjeta de dos caras que se voltea con SPRING.flip. | 'Esto es lo que crees' → giro → 'esto es lo que pasa'. Lineal se leería como PowerPoint. | whip en el giro + impact al aterrizar | `Tarjeta3D.tsx` |
| **Panel3D** | Panel que llega desde el fondo girado y se endereza, con inclinación residual. | Presentar un dato con presencia física. El reposo de 3° evita que parezca una captura de pantalla. | whoosh heavy + impact deep | `Tarjeta3D.tsx` |
| **Capas3D** | Pila de capas separadas en Z con vaivén: paralaje real. | Diagramas con 'grosor'. 4-6° de giro bastan; más se convierte en carrusel. | — | `Tarjeta3D.tsx` |

## Efectos

| Gráfico | Qué es | Cuándo usarlo | Sonido | Archivo |
|---|---|---|---|---|
| **Glitch** | Corrupción de señal: canales RGB, troceado, temblor y scanlines, por ráfagas. | Hook, logo o la palabra que rompe la expectativa. 0.3-0.6 s. Continuo cansa en 3 segundos. | glitch (alterna variantIndex entre ráfagas) | `Glitch.tsx` |
| **Scanlines** | Trama de líneas de barrido con desplazamiento continuo. | Textura de pantalla sobre una UI. A 0.5 de opacidad tapa el contenido. | — | `Glitch.tsx` |
| **Aberración** | Separación cromática constante y suave, sin troceado. | El 'glitch de reposo' de un título. Si se nota conscientemente, es demasiado. | — | `Glitch.tsx` |

---

## Cómo se usa la biblioteca

1. **Mira aquí antes de escribir un gráfico.** Si ya existe, úsalo; si existe
   parecido, añádele una prop en vez de duplicar el componente.
2. **Escribe el plan, no el JSX.** Para lo repetitivo (títulos, cifras, listas,
   remates) declara `GraficoCue[]` en `graficos-00X.ts` y móntalo con
   `<PistaGraficos>`. Valida el plan con `revisaPlan(cues, fps)` antes de renderizar.
3. **Lo único de la pieza se sigue escribiendo a mano.** La biblioteca cubre el
   80 % repetido para dejar tiempo al 20 % que hace que la pieza sea suya.
4. **Si escribes un gráfico reutilizable, súbelo** a `plantillas/graficos/`,
   añade su ficha en `fichas.ts`, su demo en `Catalogo.tsx` y regenera este archivo.

El sonido de cada gráfico se declara aparte, en `cues-00X.ts`
(ver `manuales/diseno-sonoro/recetario-motion-graphics.md`): la columna «Sonido»
de estas tablas es solo la sugerencia de partida.
