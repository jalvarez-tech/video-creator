# 011 · Timeline — 33 cortes sobre 3600 frames (30 fps)

`desde` = segundo del clip fuente. `en`/`dur` en frames de la comp. Todos los
límites caen en un **golpe medido** de su canción (tabla completa en
`musica/golpes-011.json`; la puerta 5 de `revisar-011.mjs` lo comprueba a ±2 f).

> **v2 (corrección del cliente sobre la primera prueba):** la música cambia en el
> **1:18**, no en el 1:00, y el vídeo abre con el título «Boda María & Daniel».
> Del 0:18 al 1:00 no se tocó nada; se recalcularon el arranque (título), el
> salón (ahora con la balada) y la rumba (El Preso empieza 18 s más tarde).
>
> **v3 (segunda corrección):** fundido de Turning Page antes del cambio y rótulo
> «Y ahora… ¡LA FIESTA!» en el relevo. No se movió ningún corte.

## Mapa maestro

| frames | s | plano | archivo | desde | entra | qué se ve |
|---|---|---|---|---|---|---|
| | | **LA BODA · la glorieta** | | | | Turning Page desde 1,40 s |
| 0–162 | 0,00–5,40 | `c01` | IMG_2235 | 1,00 | corte | el árbol y el lago + **TÍTULO «BODA · María & Daniel»** (f0–150) |
| 162–226 | 5,40–7,53 | `c02` | IMG_2200 | 3,40 | *disolver* | las sillas vacías bajo la glorieta |
| 226–289 | 7,53–9,63 | `c03` | IMG_2199 | 3,80 | *disolver* | flores contra el cielo |
| 289–384 | 9,63–12,80 | `c04` | IMG_2209 | 0,00 | corte | pétalos en el pasillo |
| 384–462 | 12,80–15,40 | `c05` | IMG_2219 | 0,40 | corte | el pianista; llegan los invitados |
| 462–542 | 15,40–18,07 | `c06` | IMG_2229 | 4,00 | *disolver* | **el novio esperando, sonriendo** |
| 542–636 | 18,07–21,20 | `c07` | IMG_2230 | 4,90 | corte | el abrazo antes de entregar a la novia |
| 636–732 | 21,20–24,40 | `c08` | IMG_2230 | 38,90 | corte | el velo al viento; ella llega hasta él |
| 732–795 | 24,40–26,50 | `c09` | IMG_2233 | 12,00 | corte | los votos, de la mano |
| 795–889 | 26,50–29,63 | `c10` | anillos.HEIC | — | *disolver* | los anillos sobre la rosa (foto) |
| 889–1140 | 29,63–38,00 | `c11` | IMG_2234 | 32,23 | corte | **EL BESO**: empieza en el f1002, sobre la subida |
| 1140–1249 | 38,00–41,63 | `c12` | IMG_2236 | 0,45 | *disolver* | la firma |
| 1249–1318 | 41,63–43,93 | `c13` | IMG_2237 | 1,75 | corte | saludos; beso en la mejilla |
| 1318–1396 | 43,93–46,53 | `c14` | IMG_2238 | 10,00 | corte | la canción dedicada |
| 1396–1459 | 46,53–48,63 | `c15` | IMG_2239 | 4,80 | corte | las palabras del padre |
| 1459–1523 | 48,63–50,77 | `c16` | IMG_2246 | 1,00 | corte | posando para el fotógrafo |
| 1523–1657 | 50,77–55,23 | `c17` | IMG_2245 | 5,65 | *disolver* | **los dos bajo el árbol**: golpe más fuerte del final |
| 1657–1744 | 55,23–58,13 | `c18` | IMG_2261 | 3,60 | *disolver* | la mesa de los novios en el salón |
| 1744–1800 | 58,13–60,00 | `c19` | IMG_2266 | 2,30 | *disolver* | velas y lirios → negro (respiro de la canción) |
| | | **LA RECEPCIÓN · el salón** | | | | sigue Turning Page |
| 1800–1901 | 60,00–63,37 | `r01` | IMG_2274 | 10,20 | *desde negro* | **CAPÍTULO**: nace de negro; ¡salud! con el sombrero vueltiao |
| 1901–1948 | 63,37–64,93 | `r02` | IMG_2270 (5 f) | — | corte | el champán cayendo (foto) |
| 1948–2038 | 64,93–67,93 | `r03` | IMG_2276 | 49,90 | corte | brindis de frente, brazos entrelazados |
| 2038–2143 | 67,93–71,43 | `r04` | IMG_2275 | 29,40 | corte | la novia se ríe y alza la copa |
| 2143–2275 | 71,43–75,83 | `r05` | IMG_2277 | 2,20 | corte | el beso entre las copas |
| 2275–2484 | 75,83–82,80 | `r06` | IMG_2279 | 4,33 | corte | el pastel → **RELEVO en f2340: el cuchillo arriba con el golpe de El Preso** |
| | | **LA RUMBA** | | | | El Preso desde 0,25 s (entró en f2340, dentro de `r06`) |
| 2484–2704 | 82,80–90,13 | `r07` | IMG_2286 | 10,60 | corte | a la pista: giros de los novios |
| 2704–2868 | 90,13–95,60 | `r08` | E56C….MP4 | 0,30 | corte | la pista llena, la novia en el centro |
| 2868–2971 | 95,60–99,03 | `r09` | IMG_2291 | 4,95 | corte | pies en el damero |
| 2971–3148 | 99,03–104,93 | `r10` | IMG_2290 | 8,00 | corte | **el trencito**: la novia entra bailando |
| 3148–3239 | 104,93–107,97 | `r11` | IMG_2293 | 8,90 | corte | risas con abanico; entra la invitada de granate |
| 3239–3324 | 107,97–110,80 | `r12` | IMG_2291 | 10,10 | corte | tacones |
| 3324–3427 | 110,80–114,23 | `r13` | IMG_2293 | 15,02 | corte | la invitada del abanico y su pareja |
| 3427–3600 | 114,23–120,00 | `r14` | IMG_2290 | 15,80 | corte | el trencito: risas, una mano en alto → negro |

## Dos fronteras que no son lo mismo

| frontera | frame | qué cambia | cómo está anclada |
|---|---|---|---|
| `CAPITULO` | **f1800 · 1:00** | la IMAGEN: de la glorieta al salón (`c19` muere a negro en 15 f, `r01` nace de negro en 18 f) | un respiro de Turning Page (61,4 s de la canción). La música **no** cambia |
| `RELEVO` | **f2340 · 1:18** | la MÚSICA: Turning Page → El Preso | otro respiro de Turning Page (79,25–79,55 s de la canción) + el primer golpe de El Preso 20 ms después + la novia empieza a levantar el cuchillo (`r06.desde = 6,5 − 65/30 = 4,33`) |

La casualidad útil: la entrada de 1,40 s que puso el primer respiro en el 1:00
pone el segundo en el 1:18. Por eso mover el relevo no obligó a tocar la entrada
de la canción, ni el beso, ni los cortes del primer minuto.

## Anclajes de contenido (la puerta 1 los verifica a ±1 f)

| qué | dónde | cálculo |
|---|---|---|
| empieza el beso | **f1002** | subida de Turning Page (34,79 s) → `c11.desde = 36,0 − (1002 − 889) / 30 = 32,23` |
| el cuchillo arriba | **f2340** | relevo → `r06.desde = 6,5 − (2340 − 2275) / 30 = 4,33` |

## El título

`Titulo011.tsx`, encima de `c01`. **Visible desde el f0** (es la miniatura);
movimiento ambiental lineal f0–150 (escala 1 → 1,03; «BODA» 0,46 → 0,56 em);
salida f126–150 con ease-in (−14 px, blur 3 px). Termina justo cuando empieza la
disolvencia de `c02` (f150). Por eso `c01` pasó de 3,3 a 5,4 s y ya no nace de
negro.

## El rótulo del relevo (v3)

`RotuloFiesta011.tsx`, anclado a `RELEVO` (todos sus tiempos son `RELEVO ± n`):

| frame | qué pasa en pantalla | qué pasa en la música |
|---|---|---|
| f2250 | — | empieza el fundido de Turning Page (2,8 s, coseno) |
| f2275 | corte a `r06`: cortan el pastel | |
| f2281 | entra «Y ahora» (lujo: 14 f, sube 16 px) | el piano ya va bajando |
| f2296 · 2306 · 2316 | caen los tres puntos, uno a uno | |
| f2334 | «Y ahora…» quieto | Turning Page llega a cero · **0,2 s de silencio** |
| **f2340** | **«¡LA FIESTA!» de golpe** (redes: 7 f, escala 1,35→1, tracking 0,34→0,05 em) y la novia levanta el cuchillo | **primer golpe de El Preso** |
| f2420–2436 | se van los dos (ease-in, sube 18 px) | |
| f2484 | corte a la pista (`r07`) | |

**Dónde:** arriba, bloque de y≈96 a 271 px, sobre la pared de madera, con un velo
degradado desde arriba solo mientras hay texto. Medido sobre los stills de `r06`:
caras en el 16–36 % del alto, pastel y velas en el 64–87 %, y en el centro el
vestido blanco (texto blanco ilegible). La franja alta es la única con contraste
que no tapa caras (R08), cuchillo ni pastel.

## §entra — las siete disolvencias, todas en la glorieta

`c02` y `c03` (la decoración se funde como el piano) · `c06` (empieza la llegada)
· `c10` (la foto de los anillos) · `c12` (baja la música tras el beso) · `c17`
(los dos, el final emocional) · `c18`/`c19` (el salón y las velas). Cada una
dura 12 f y **las colas se miden**: `c17` y `c18` no cabían con su `desde`
inicial y se retrasaron. El salón y la rumba cortan en seco.

## Música

| tramo | archivo | envolvente |
|---|---|---|
| f0–2340 | `011-boda-turning-page.wav` (desde 1,40 s · 78 s · −16,49 LUFS) | 3 f de entrada · **fundido de 2,8 s en coseno f2250→2334** (v3; en la v2 eran 6 f y sonaba a corte) · 0,2 s de silencio antes del golpe |
| f2340–3600 | `011-rumba-el-preso.wav` (desde 0,25 s · 42 s · −14,00 LUFS) | sin entrada (arranca en silencio digital) · 90 f de salida en coseno |

**El fundido, medido en la prueba v3** (RMS del render): la frase fuerte de la
balada entra en el 76,1 s ya atenuada (−14 dB) → −17 en 76,5 → −27 en 77,0 → −46
en 77,6 → **silencio de 77,8 a 78,05** → primer golpe de El Preso a −11 dB. La
primera parte del fundido (75,0–76,0) apenas se oye porque la canción ya venía
suave; el oído lo percibe como ~1,7 s de despedida.

## Puertas de control

1. `node proyectos/011/revisar-011.mjs` → siete comprobaciones (tiempo +
   anclajes, metraje con disolvencias, tramos, **todos los archivos**, cortes
   sobre golpes de su canción, stems, techo de zoom).
2. `npx eslint src/proyectos/011 src/Root.tsx && npx tsc --noEmit`.
3. **R05**: stills del render (título en f0/60/125/140/149, capítulo en f1795/1806/1818, relevo y rótulo en f2280–2440).
4. **R06**: prueba 540×960 → hoja de contactos + negros + congelados + sonoridad por tramo.
5. Final 1080×1920 solo con el OK → **hecho (2026-09-14)**: `finales/011-boda-maria-daniel-9x16-master.mp4` (240 MB) y `finales/011-boda-maria-daniel-9x16.mp4` (131 MB, para compartir). BT.709 (R22), 3600 f, verificación en `aprendizajes.md` § La final.
