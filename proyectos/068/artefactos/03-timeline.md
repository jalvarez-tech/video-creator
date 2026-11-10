# 03 · Timeline — proyecto 068

> Paso 3 de 3. Frames ABSOLUTOS de la composición (30 fps); «desde» y los tramos de voz, en segundos del clip normalizado. La columna «espacio/función» leída de arriba abajo es el paseo: el aire → el prado → la montaña → la ciudad lejos → el bosque. Fuente de verdad: `remotion/src/proyectos/068/metraje-068.ts`.

| plano | bloque | clip | desde–hasta (s) | en (f) | dur (f) | entrada | voz (s del clip) | función |
|---|---|---|---|---|---|---|---|---|
| c01-apertura | 1 | DR06 | 68,00-70,43 | 0 | 73 | corte (golpe 10,2 dB) | — | la curva del camino entre los cipreses (la promesa) |
| c02-hook | 2 | HK04 | 0,00-5,10 | 73 | 153 | corte (golpe 9,2 dB) | 0,36-4,60 s | Isabella en el prado: el hook |
| c03-camino | 3 | DR06 | 86,00-88,93 | 226 | 88 | corte (8,6 dB) | — | el camino desde arriba (el umbral) |
| c04-pinos | 3 | RC06 | 1,00-3,30 | 314 | 69 | corte (22,2 dB) | — | los pinos del prado, a pie de suelo |
| c05-prado | 3 | DR05 | 66,00-68,47 | 383 | 74 | corte (11,4 dB) | — | el prado con el bosque detrás |
| c06-mitad | 4 | MD02 | 0,00-6,50 | 457 | 195 | corte (13,3 dB) | 0,09-6,08 s | Isabella en la loma: la mitad |
| c07-montana | 5 | RC05 | 3,50-5,67 | 652 | 65 | corte (13,5 dB) | — | la montaña al frente |
| c08-cielo | 5 | RC07 | 5,00-7,43 | 717 | 73 | corte (10,4 dB) | — | el cielo abierto sobre el valle |
| c09-vista | 5 | DR04 | 28,00-30,83 | 790 | 85 | corte (13,6 dB) | — | Medellín al horizonte desde el aire (el clímax) |
| c10-cta | 6 | CT01 | 0,00-5,93 | 875 | 178 | corte (13,9 dB) | 0,64-5,45 s | Isabella entre los cipreses: el CTA |
| c11-cierre | 6 | tarjeta | — | 1053 | 60 | corte | — | logo y web sobre negro |

Total: **1113 f = 37,1 s** (la tarjeta, f1053-1113). Música: «Heaven on Earth» desde su golpe de 178,043 s (f3); fin de la música en f1008 (antes del último resto de la pista, f1010).

Los 9 cortes están en golpes MEDIDOS de la canción (`proyectos/068/musica/golpes-068.json`): f73 · f226 · f314 · f383 · f457 · f652 · f717 · f790 · f875. Los seis que no son de voz (f226 · f314 · f383 · f652 · f717 · f790) caen a ≤ 0,4 f del golpe sobre el audio del render (`golpes-render.py`); los tres en que entra Isabella (f73, f457, f875) también caen en un golpe, pero ahí el detector mide su voz y no vale.

| bloque de texto | frames | texto |
|---|---|---|
| h01 | 83-146 | «El verdadero / estatus / no es la fachada» |
| h02 | 146-190 | «que muestras, es la / **privacidad**» |
| h03 | 191-218 | «que puedes tener.» |
| m01 | 459-515 | «Imagina que el éxito / por fin se siente» |
| m02 | 515-573 | «como se ve / **en silencio,**» |
| m03 | 573-622 | «con la montaña / al frente / y sin nadie» |
| m04 | 622-646 | «que te apure.» |
| c01 | 893-979 | «Tu bosque privado / a solo 20 minutos / de Medellín,» |
| c02 | 980-1046 | «**escríbeme** / y agendemos / una visita.» |
