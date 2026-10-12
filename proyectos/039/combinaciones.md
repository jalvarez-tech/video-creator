# Combinaciones — proyecto 039 · Lote en El Carmen de Viboral (Mia), V22

Registro de esta versión y mapa de «cómo cambiar cada pieza». Las V14 (030), V15 (031) y V18 (034) viven SIN commit en sus worktrees; lo que usó cada una está también en `archivos/musica/registro-de-uso.md` (§1 y §6), el tablero de coordinación entre sesiones.

## Versiones de esta propiedad

| V | Proyecto | Estado | Fecha | Qué es |
|---|---|---|---|---|
| V14 | 030 | final | 2026-10-08 | «Seguridad sin encierro»: DR97 · HK04 · MD02 · CT01 · *Becoming* |
| V15 | 031 | final | 2026-10-09 | «Construir aquí»: DR107 · HK06 · MD04 · CT04 · *Somewhere inside of me* |
| V18 | 034 | final | 2026-10-09 | «Tu lugar en el campo»: DR98 · HK03 · MD03 · CT03 recortado · *Chillin'* |
| **V22** | **039** | **en prueba** | 2026-10-09 | **«El campo sin desconexión» (DISRUPTIVO)**: DR104 · **HK02** · DR98 · DR97 (×1→×2,5) · DR101 · DR99 (×2,5→×1) · DR108 · DR96 (la pausa) · **MD05** · RC04 · RC05 · DR109 (la vista) · **CT02** · *Light Fills the Room* · 1055 f · 35,2 s · ni un segundo de metraje compartido con la V14, la V15 ni la V18 |

## Lo que lleva (rev. 0)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Hook | HK02 `IMG_1590` (voz 2,035-5,34 s) | la pregunta que selecciona; la única libre sin cifras ni el argumento de las anteriores |
| Mitad | MD05 `IMG_1610` | la razón («dos entradas»); declarada: repite el argumento de la V14 (las tres libres lo hacen) |
| CTA | CT02 `IMG_1603` | UNA acción de UNA palabra; declarada: misma frase que el CT01 de la V14 (la única libre) |
| Canción | *Light Fills the Room* (`b3c8b7c6`) | la única de las 19 libres con rejilla de golpes ≥ 12 dB para estos 12 planos |
| Entrada de la canción | 104,533 s (`INICIO_MUSICA` = 3136/30) | golpe de 18,7 dB en el f3 |
| Bajada (frame 0) | DR104 1,70-3,50 s | de la nube al lote a 4 px/f constantes |
| Paseo | DR98 22,20-23,43 · DR97 7,30-10,28 (×1→×2,5) · DR101 11,60-12,80 · DR99 5,30-8,03 (×2,5→×1) · DR108 18,90-20,17 | cinco planos de 1,2-1,5 s, cada uno en un golpe |
| La pausa | DR96 11,30-15,47 | 4,2 s casi quietos antes de que vuelva Isabella |
| Bloque 5 | RC04 2,40-3,93 · RC05 4,00-5,20 · DR109 22,20-26,83 | el portón de la vereda · la cerca con el valle · la vista (4,6 s, el plano más largo) |
| Voz | −15 LUFS tratada (+20,0 · +18,7 · +17,8 dB tras el compresor 3,5:1; limitador −2,5 dBFS) | pedido: «a −15 LUFS sin saturar» |
| Música sola | −15 LUFS por tramos (bajada −1,1 dB, paseo −3,1, bloque 5 −2,8); −26 bajo la voz | la canción es alta: ningún tramo sube |
| Color | `COLOR_BASE` (contraste 1,20) + el ajuste de cada plano (medido) | ver abajo |

## Lo medido en la prueba (rev. 0)

| Qué | Medida |
|---|---|
| Cortes secos sobre golpes | los 14 (más los 2 cambios de velocidad) a −0,5…+0,5 f en el AAC de la prueba (`golpes-render.py`), de 12,3 a 23,5 dB; el f296 lo detecta como −5,5 f porque otro golpe más fuerte (17,9 dB, f290) cae en la ventana: el suyo (15,2 dB) está a −0,3 f; el de apertura es la entrada de la música desde el silencio |
| Voz | −14,8 · −14,6 · −14,7 LUFS en sus ventanas del render (música a −26 debajo), picos −3,9 · −4,1 · −4,9 dBFS |
| Música sola | −15,3 (bajada) · −15,0 (paseo) · −15,0 (bloque 5) LUFS |
| Pieza | −15,0 LUFS integrado, pico −2,8 dBFS, LRA 1,9 LU: sin saturar |
| Subtítulos | 13 líneas a +0,5…+1,1 f de su palabra sobre la voz sola (`lineas-vs-onsets.py`) |
| Color (`medir-color.py`, antes → después) | σ de luma entre planos 10,5 → 8,9 · quemado máx. 4,9 → 1,7 % · aplastado máx. 3,9 → 5,9 % · saturación media 0,297 → 0,364 · piel: tono 6,8° → 6,7° (HK02), 2,1° → 2,0° (MD05), 8,3° → 8,0° (CT02) · saltos de luma en los cortes: el mayor, +23 (cerca → vista) y −22 (bajada → hook): es el contenido (sombra y cielo); `medidas/medir-color-final.txt` |
| Cierre | tarjeta de 2,0 s con el logo y la web; negro exacto en el f994 (la puerta) |

## Cómo cambiar cada pieza

- **Otro hook / mitad / CTA** (no queda ninguno libre sin repetir argumento o frase): añade su fila a `MATERIAL` de `normalizar.mjs` (con su sha) y su ventana a `VENTANA_VOZ` (¡mira el centroide antes de fiarte de la energía!), la ganancia con `herramientas/probar-voz.py --umbral 0.0316 --razon 3.5` (editar su `TOMAS`) → `GANANCIA_VOZ_DB`. Luego `voz.s0/s1/lufs/dice` del corte, el guion marcado `voz/<toma>.txt`, cada línea llevada a su palabra con `onsets-voz.py` + `palabras-desde.py` (tabla de `lineas-vs-onsets.py`). Cambia la duración del plano y con ella la rejilla: `buscar-cortes-039.py` con `R='[[48,56],[115,141],[28,48],[28,48],[28,48],[28,48],[28,48],[80,130],[143,149],[34,62],[34,62],[100,145]]' FIN=todas MINC=12 DROP=14 START_MIN=17 ORDEN=golpe`.
- **Otra canción:** reservarla en el registro; `buscar-cortes-039.py`; `medir-pista.py … --json musica/golpes-039.json`; los `GOLPE` de `metraje-039.ts`, `INICIO_MUSICA` y los niveles de `audio-039.ts` (`LUFS_TRAMO`, `PICO_APERTURA`, `LUFS_CANCION_EN_VOZ`; `lufs-rangos.py`).
- **Otras rampas:** las mesetas de `RAMPA_C04` y `RAMPA_C06` en `metraje-039.ts`; cada cambio entre una meseta a ×1 y la escalera tiene que caer en un golpe ≥ 12 dB (la puerta, 2f).
- **Otro plano de dron:** medir su movimiento ANTES (`ventanas-039.py <N> <μ mín>`; `medir-ventana`; para una bajada o subida al cielo, `flujo.py`). Un apaisado necesita su recorte 9:16 en `MATERIAL`.
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `contrast` ≤ 1,22, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella). Stills antes/después: `stills-multiples.mjs` y `stills-antes.mjs` (con `NODE_OPTIONS=--require …/clonar-al-copiar.cjs` si el disco está lleno); `medir-color.py`.
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-039.ts`; las voces siguen a −15 LUFS.

## Lo por confirmar

- **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto): «vente, **te** muestro» (HK02, f148 = 4,9 s), «**por completo**» (MD05, f575 = 19,2 s), «**lote**» (MD05, f638 = 21,3 s), «**escríbeme**» (CT02, f917 = 30,6 s) y «**lote**» (CT02, f941 = 31,4 s).
- Si la mitad y el CTA (repetidos de la V14 en argumento y frase) valen; si el hook sin dato de ficha vale.
- La canción (medida, no oída; plana; licencia sin verificar) y por dónde se escribe «lote».
- **Disco:** para exportar la final (PNG a 1080×1920) hacen falta ≈ 3,5 GB temporales y hoy quedan ≈ 2,4 GB.
