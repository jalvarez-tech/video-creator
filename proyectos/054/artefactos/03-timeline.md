# 03 · Timeline — proyecto 054 (V36)

> Paso 3 de 3. Anterior: [02-layout.md](02-layout.md). De aquí sale, casi copiado: `metraje-054.ts` · `audio-054.ts` · `subtitulos-054.ts`.
> Todos los números de este archivo son frames absolutos a **30 fps** (`frame = round(segundo × 30)`); la unidad de `desde` es el segundo de la FUENTE.

## El pulso de la canción y dónde caen los cortes

*Luxury, Elegance, Refined* (lounge, 86 BPM) entra en **45,2 s** (1356/30: un número entero de frames; su golpe de 45,227 s cae en el **frame 3** y el frame 0 no lleva clic). No tiene pulso constante que una recta describa bien (golpes cada 0,35-1,5 s, de 6 a 26 dB) ni caída que buscar (−14,4 a −14,9 LUFS plana): **la rejilla se buscó** con `herramientas/buscar-rejilla-054.py` —13 planos con rangos de duración (la voz de cada toma medida por energía: el hook y el CTA piden ≥ 17 f de aire tras su última palabra, la mitad ≥ 24), con los cortes de frontera de bloque en golpes de ≥ 11 dB y los de dentro de un recorrido en golpes de ≥ 8 dB— y se eligió la de entrada 45,227 s (la pieza abre con un golpe de 17,8 dB) con el hook de 5,0 s y los recorridos de 1,3-2,6 s. **Los doce cortes son secos y caen sobre un golpe medido a ≤ 0,5 f** (la puerta lo comprueba y `golpes-render.py` lo confirma sobre el WAV del render).

| corte (frame) | golpe medido | dB | qué entra |
|---|---|---|---|
| 83 | 47,895 s | 13,8 | el hook (Isabella) |
| 233 | 52,900 s | 17,0 | el jardín (el drop que abre el recorrido) |
| 271 | 54,183 s | 10,4 | el paso por el ventanal |
| 313 | 55,578 s | 14,8 | la sala de doble altura |
| 359 | 57,087 s | 10,4 | el ventanal de la sala |
| 400 | 58,481 s | 13,6 | la mitad (Isabella) |
| 544 | 63,256 s | 11,1 | la cocina |
| 596 | 64,996 s | 17,7 | la puerta de la alcoba |
| 662 | 67,196 s | 12,8 | el jacuzzi |
| 711 | 68,839 s | 14,7 | el sendero lateral |
| 789 | 71,437 s | 12,3 | la vista |
| 903 | 75,230 s | 11,9 | el CTA (Isabella) |

El hook dura 150 f (de 83 a 233): su última palabra acaba en el f204 y la música sube con curva en los 24 f siguientes hasta el drop (llega arriba 5 f antes). La mitad dura 144 f y deja 28 f tras su última palabra. Los planos de recorrido duran 38-114 f (1,3-3,8 s) y la vista (114 f) es el más largo del bloque 5.

## Mapa maestro

| frames | s | narrativa | clip y tramo | entrada | voz | texto | música |
|---|---|---|---|---|---|---|---|
| 0–82 | 0,0–2,8 | aérea | DR01 57,0-59,77 s (83 f, dispersión 0,126) | corte (frame 0 = miniatura) | — | — | entra en f1, arriba (−15 LUFS) |
| 83–232 | 2,8–7,8 | hook | HK01 `IMG_8815`, desde 0,8 s | **corte en el golpe de f83** | «El lujo real no es tener una torre con vista, es no tener vecinos encima.» f91-204 | h01 (f91) · h02 (f134) · h03 (f154; acento «vecinos encima.» f171) | baja en f83-89 (6 f, coseno) y sube en f204-228 (24 f) |
| 233–270 | 7,8–9,0 | recorrido | RC02 0,1-1,37 s | corte (golpe 17,0 dB) | — | — | arriba |
| 271–312 | 9,0–10,4 | recorrido | RC25 4,2-5,6 s | corte | — | — | arriba |
| 313–358 | 10,4–12,0 | recorrido | RC01 3,7-5,23 s | corte | — | — | arriba |
| 359–399 | 12,0–13,3 | recorrido | RC03 3,4-4,77 s | corte | — | — | arriba |
| 400–543 | 13,3–18,1 | mitad | MD04 `IMG_8820`, desde 0,567 s | **corte en el golpe de f400** | «Está a los 50 minutos de Medellín con una administración de 120.000.» f408-516 | m01 (f406; acento «50 minutos» f423) · m02 (f466) | baja en f400-406 y sube en f516-540 (24 f) |
| 544–595 | 18,1–19,9 | recorrido | RC06 5,3-7,03 s | corte | — | — | arriba |
| 596–661 | 19,9–22,0 | recorrido | RC07 0,8-3,0 s | corte (golpe 17,7 dB) | — | — | arriba |
| 662–710 | 22,0–23,7 | recorrido | RC13 0,0-1,63 s | corte | — | — | arriba |
| 711–788 | 23,7–26,3 | recorrido | RC22 0,0-2,6 s | corte | — | — | arriba |
| 789–902 | 26,3–30,1 | recorrido (la vista) | RC24 3,9-7,7 s (114 f) | corte | — | — | arriba (el plano más largo del bloque) |
| 903–1092 | 30,1–36,4 | CTA | CT06 `IMG_8918`, desde 0,767 s | **corte en el golpe de f903** | «Si valoras espacio y privacidad, este espacio te va a encantar. Escríbeme y agendemos una visita.» f911-1058 | c01 (f911) · c02 (f966) · c03 (f1013; acento «Escríbeme») | baja en f903-909, cama a −26 LUFS y se APAGA a cero en f1004-1049 |
| 1093–1152 | 36,4–38,4 | tarjeta | `cierre-oscuro.png` (negro liso) | corte, nada congelado | — | — | silencio |

## Voz

Las tres tomas se tratan en `normalizar.mjs` con la cadena del canal (graves fuera, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5`, limitador a −2,5 dBFS) y quedan a **−15,0 · −15,0 · −15,1 LUFS** en su ventana (crudas: −24,0 · −27,3 · −23,6). El WAV tratado es silencio fuera de su frase. El limitador le quita 0,0 · 3,1 · 1,3 dB (la mitad, 0,1 dB más de lo que pide el criterio del canal: lo más fuerte de esa toma son sus consonantes; el pico real sale a −2,5 dBFS).
