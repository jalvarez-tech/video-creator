# 03 · Timeline — proyecto 052 («Pregúntate esto», réplica de `02.mp4`)

> Paso 3 de 3. El frame exacto de cada cosa. Con la **transcripción real** delante: la de las tomas (`proyectos/052/voz/hk04.json`, `ct05.json`) y, **provisionalmente**, la del audio de `02.mp4` (`voz/off-provisional.json`) mientras la locución no existe.
> De aquí salen `metraje-052.ts`, `audio-052.ts` y `subtitulos-052.ts` (con `proyectos/052/herramientas/armar-subtitulos.py`).

**fps de la comp:** 30 → `frame = round(segundo × 30)`. Todos los números son frames absolutos a ese fps. **La locución manda**: los `en` de los planos de abajo salen de las palabras de la locución (`ancla()`); los de hoy son los del original, y se mueven con ella cuando exista (`OFF_S0`, `OFF_EN0`, `PALABRAS_OFF` en `metraje-052.ts`).

## Los planos (bloque 2 = hook · 5 = recorrido con la locución · 6 = CTA)

| id | bloque | clip | `en` (f) | `dur` (f) | s | `desde` (s) | entra | Qué se oye / por qué ahora |
|---|---|---|---|---|---|---|---|---|
| c01-hook | 2 | HK04 | 0 | 147 | 0,0-4,9 | 2,733 | corte (f0) | Isabella: «Antes de arrendar [1 s] amoblado, [0,6 s] pregúntate esto.» (primera sílaba en el f5, la última acaba en el f133 + 2 f + los 12 de la disolvencia siguiente) |
| c02-balcon-atardecer | 5 | RC21 AL REVÉS | 147 | 209 | 4,9-11,9 | 0,400 | disolver | «¿Estás buscando simplemente un lugar donde dormir, o un lugar donde realmente disfrutes vivir? Porque cuando eliges un…» (el jacuzzi privado → las torres → la ciudad) |
| c03-bar | 5 | RC22 | 356 | 84 | 11,9-14,7 | 0,400 | disolver | «…apartamento amoblado, no estás pagando solamente por una cama,» |
| c04-alcoba | 5 | RC06 | 440 | 245 | 14,7-22,8 | 0,400 | disolver | «una sala y una cocina. Estás pagando por la comodidad de llegar a casa y sentir que todo tiene sentido. Y si vas a invertir en un arriendo premium,» |
| c05-cocina-sala | 5 | RC01 | 685 | 374 | 22,8-35,3 | 0,400 | disolver | «los detalles deben estar a la altura. Imagina terminar el día, salir al balcón, desconectarte en tu jacuzzi privado y disfrutar de un entorno rodeado de naturaleza, sin dejar de estar conectado con» |
| c06-balcon-torres | 5 | RC03 | 1059 | 362 | 35,3-47,4 | 0,600 | disolver | «Medellín. Aquí tienes dos habitaciones, dos baños y espacios pensados para vivir con amplitud y comodidad. Cuando quieres salir de casa, el proyecto te ofrece gimnasio, zonas húmedas,» |
| c07-sauna | 5 | RC15 | 1421 | 125 | 47,4-51,5 | 0,400 | disolver | «coworking, Spa Romano y espacios para compartir.» |
| c08-isabella-sala | 5 | CT04 (sin voz) | 1546 | 99 | 51,5-54,8 | 2,500 | disolver | «¿Para qué pagar un arriendo premium si no puedes disfrutarlo?» (sustituye a «Isabella en la cocina») |
| c09-piscina | 5 | RC16 | 1645 | 180 | 54,8-60,8 | 3,000 | disolver | «Este apartamento en Las Palmas es para quienes quieren que su hogar sea mucho más que un lugar de paso:» |
| c10-arboles | 5 | RC17 | 1825 | 120 | 60,8-64,8 | 3,200 | disolver | «un espacio para descansar, trabajar, recibir invitados» (sustituye al «bosque con hierba») |
| c11-gimnasio | 5 | RC13 | 1945 | 93 | 64,8-67,9 | 0,400 | disolver | «y disfrutar de una calidad de vida diferente.» |
| c12-social-kitchen | 5 | RC12 | 2038 | 209 | 67,9-74,9 | 0,400 | disolver | «Un lugar donde vivir bien no sea un plan para después, sino parte de tu día a día.» (la última palabra, ≈ f2173; luego 2,5 s de piano solo antes del CTA) |
| c13-cta | 6 | CT05 | 2247 | 104 | 74,9-78,4 | 1,267 | disolver | Isabella: «Si buscas más que un apartamento para vivir, escríbenos.» (voz 2248-2331; a su último fotograma funde a negro, 6 f) |
| c14-cierre | 6 | tarjeta oscura | 2351 | 60 | 78,4-80,4 | — | corte | el logo (f2353) y la web (f2359) sobre negro; la música acaba en el f2409 |

Total: **2411 f = 80,37 s**. Todo lo que no es el primero ni la tarjeta se disuelve en 12 f (el piano no tiene golpes donde cortar en seco).

## El audio

| Capa | Dónde | Nivel |
|---|---|---|
| Voz de Isabella, hook (`hk04-voz.wav`) | f5-133 (la ventana de voz 2,90-7,17 s de la toma) | −15,2 LUFS tratada (compresor 3,5:1 desde −30 dBFS, +19,4 dB, limitador −2,5 dBFS; el limitador quita 3,3 dB en los picos) |
| **Locución** | f164-2173 provisionales (la del original); `OFF_PENDIENTE` | −15 LUFS tratada cuando exista (`off-voz.wav`) |
| Voz de Isabella, CTA (`ct05-voz.wav`) | f2248-2331 (1,30-4,08 s de la toma) | −15,0 LUFS tratada (+20,4 dB) |
| Música «Here For You» | desde la canción 20,733 s; f0-2409 | −15 LUFS sola (ALTO = +0,6 dB sobre el archivo), −28 bajo la voz (ALTO × 0,22), curva de coseno: baja 10 f antes de la primera palabra y sube 24 f tras la última |
| SFX | ninguno | — |

Con la locución puesta, el hook y ella se unen en un solo grupo (31 f de aire no dan para dos curvas) y la música queda baja de f0 al fin de la locución; sube en la pausa de ≈ 2,5 s antes del CTA, baja con él y se apaga en línea recta bajo la tarjeta.

## Los subtítulos (`subtitulos-052.ts`)

29 bloques, 65 líneas, 14 acentos: hook `h01`-`h02`, locución `o01`-`o26` (**provisionales**), CTA `z01`. Sin cifras. Los números de cada línea están en el propio archivo, que se arma con `proyectos/052/herramientas/armar-subtitulos.py`.

| Dudoso | Dónde | Qué se oye |
|---|---|---|
| «amoblado,» | h02, f64 (4,92 s de HK04) | whisper: «a mi lado»; 4 sílabas |
| «si no puedes disfrutarlo?» | o20, f1599-1614 (original 51,5 s) | whisper: «si lo puedes disfrutarlo»; los rótulos de `02.mp4`: «premium si · no puedes · disfrutarlo» |

## Pendiente con el usuario

1. **La locución**: ¿entrega los audios o se genera con la voz clonada de Isabella (1.117 caracteres, cuesta dinero)?
2. Palabras dudosas arriba.
3. Los dos planos que no están en el material (¿tiene los clips?).
