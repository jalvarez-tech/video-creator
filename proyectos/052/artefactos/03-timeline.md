# 03 · Timeline — proyecto 052 («Pregúntate esto», réplica de `02.mp4`)

> Paso 3 de 3. El frame exacto de cada cosa. Con la **transcripción real** delante: la de las tomas (`proyectos/052/voz/hk04.json`, `ct05.json`) y la de la locución generada (`voz/off.json`; `voz/off-provisional.json` es la del audio de `02.mp4`, de cuando la locución no existía).
> De aquí salen `metraje-052.ts`, `audio-052.ts` y `subtitulos-052.ts` (con `proyectos/052/herramientas/armar-subtitulos.py`).

**fps de la comp:** 30 → `frame = round(segundo × 30)`. Todos los números son frames absolutos a ese fps. **La locución manda**: los `en` de los planos de abajo salen de las palabras de la locución (`ancla()`, `OFF_S0`, `OFF_EN0`, `PALABRAS_OFF` en `metraje-052.ts`); si la voz cambia, se cambian esos números.

## Los planos (bloque 2 = hook · 5 = recorrido con la locución · 6 = CTA)

| id | bloque | clip | `en` (f) | `dur` (f) | s | `desde` (s) | entra | Qué se oye / por qué ahora |
|---|---|---|---|---|---|---|---|---|
| c01-hook | 2 | HK04 | 0 | 147 | 0,0-4,9 | 2,733 | corte | Isabella: «Antes de arrendar [1 s] amoblado, [0,6 s] pregúntate esto.» (primera sílaba en el f5; la última acaba en el f133 + 2 f + los 12 de la disolvencia siguiente) |
| c02-balcon-atardecer | 5 | RC21 AL REVÉS | 147 | 211 | 4,9-11,9 | 0,400 | disolver | «¿Estás buscando simplemente un lugar donde dormir, o un lugar donde realmente disfrutes vivir? Porque cuando eliges un…» (RC21 AL REVÉS: el jacuzzi privado → las torres → la ciudad) |
| c03-bar | 5 | RC22 | 358 | 84 | 11,9-14,7 | 0,400 | disolver | «…apartamento amoblado, no estás pagando solamente por una cama,» (entra con «apartamento») |
| c04-alcoba | 5 | RC06 | 442 | 245 | 14,7-22,9 | 0,400 | disolver | «una sala y una cocina. Estás pagando por la comodidad de llegar a casa y sentir que todo tiene sentido. Y si vas a invertir en un arriendo premium,» |
| c05-cocina-sala | 5 | RC01 | 687 | 374 | 22,9-35,4 | 0,400 | disolver | «los detalles deben estar a la altura. Imagina terminar el día, salir al balcón, desconectarte en tu jacuzzi privado y disfrutar de un entorno rodeado de naturaleza, sin dejar de estar conectado con» |
| c06-balcon-torres | 5 | RC03 | 1061 | 440 | 35,4-50,0 | 0,600 | disolver | «Medellín. Aquí tienes dos habitaciones, dos baños y espacios pensados para vivir con amplitud y comodidad. Cuando quieres salir de casa, el proyecto te ofrece gimnasio, zonas húmedas,» (RC03 0,6-15,3 s: las camas → las torres → el cielo) |
| c07-sauna | 5 | RC15 | 1501 | 112 | 50,0-53,8 | 0,400 | disolver | «coworking, Spa Romano y espacios para compartir.» (entra 0,2 s antes de «coworking») |
| c08-isabella-sala | 5 | CT04 (sin voz) | 1613 | 146 | 53,8-58,6 | 2,500 | disolver | «¿Para qué pagar un arriendo premium si no puedes disfrutarlo?» (CT04, sin voz; SUSTITUYE a «Isabella en la cocina»; entra 0,2 s antes de la pregunta) |
| c09-piscina | 5 | RC16 | 1759 | 186 | 58,6-64,8 | 2,600 | disolver | «Este apartamento en Las Palmas es para quienes quieren que su hogar sea mucho más que un lugar de paso:» (entra 0,8 s antes de «Este») |
| c10-arboles | 5 | RC17 | 1945 | 114 | 64,8-68,6 | 3,200 | disolver | «un espacio para descansar, trabajar, recibir invitados» (RC17; SUSTITUYE al «bosque con hierba») |
| c11-gimnasio | 5 | RC13 | 2059 | 100 | 68,6-72,0 | 0,400 | disolver | «y disfrutar de una calidad de vida diferente.» |
| c12-social-kitchen | 5 | RC12 | 2159 | 209 | 72,0-78,9 | 0,400 | disolver | «Un lugar donde vivir bien no sea un plan para después, sino parte de tu día a día.» (la última palabra, ≈ f2295; luego 2,4 s de piano solo antes del CTA) |
| c13-cta | 6 | CT05 | 2368 | 104 | 78,9-82,4 | 1,267 | disolver | Isabella: «Si buscas más que un apartamento para vivir, escríbenos.» (a su último fotograma funde a negro, 6 f) |
| c14-cierre | 6 | tarjeta oscura | 2472 | 60 | 82,4-84,4 | — | corte | el logo y la web sobre negro; la música acaba 2 f antes del final |

Total: **2532 f = 84,40 s**. Todo lo que no es el primero ni la tarjeta se disuelve en 12 f (el piano no tiene golpes donde cortar en seco).

## El audio

| Capa | Dónde | Nivel |
|---|---|---|
| Voz de Isabella, hook (`hk04-voz.wav`) | f5-133 (la ventana de voz 2,90-7,17 s de la toma) | −15,2 LUFS tratada (compresor 3,5:1 desde −30 dBFS, +19,4 dB, limitador −2,5 dBFS; el limitador quita 3,3 dB en los picos) |
| **Locución** (ElevenLabs, voz de stock «Bella») | f164-2295 (0,04-71,08 s de `off.wav`) | −15,1 LUFS tratada (compresor 3,5:1 de ataque 1 ms, +18 dB, limitador −2,5 dBFS) |
| Voz de Isabella, CTA (`ct05-voz.wav`) | f2369-2452 (1,30-4,08 s de la toma) | −15,0 LUFS tratada (+20,4 dB) |
| Música «Here For You» | desde la canción 20,733 s; f0-2409 | −15 LUFS sola (ALTO = +0,6 dB sobre el archivo), −28 bajo la voz (ALTO × 0,22), curva de coseno: baja 10 f antes de la primera palabra y sube 24 f tras la última |
| SFX | ninguno | — |

El hook y la locución se unen en un solo grupo (31 f de aire no dan para dos curvas) y la música queda baja de f0 al fin de la locución; sube en la pausa de ≈ 2,5 s antes del CTA, baja con él y se apaga en línea recta bajo la tarjeta.

## Los subtítulos (`subtitulos-052.ts`)

29 bloques, 65 líneas, 14 acentos: hook `h01`-`h02`, locución `o01`-`o26` (frase a frase, `alinear-locucion.py`), CTA `z01`. Sin cifras. Los números de cada línea están en el propio archivo, que se arma con `proyectos/052/herramientas/armar-subtitulos.py`.

| Dudoso | Dónde | Qué se oye |
|---|---|---|
| «amoblado,» | h02, f64 (4,92 s de HK04) | whisper: «a mi lado»; 4 sílabas |
| «si no puedes disfrutarlo?» | o20, f1599-1614 (original 51,5 s) | whisper: «si lo puedes disfrutarlo»; los rótulos de `02.mp4`: «premium si · no puedes · disfrutarlo» |

## Pendiente con el usuario

1. Oír la prueba (voz de stock, música, subtítulos) y las palabras dudosas de arriba.
2. Los dos planos que no están en el material (¿tiene los clips?).
