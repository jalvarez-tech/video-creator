# Combinaciones — proyecto 046 · Tierra Grata Bosque Santo (El Poblado), ARRIENDO, V28 «Ciudad nueva»

Registro de esta versión y mapa de «cómo cambiar cada pieza». Es una de las seis versiones del arriendo de Tierra Grata (V27-V32, proyectos 045-050, 2026-10-19; reparto en `proyectos/044/reparto-045-050.md`). Lo que usó cada versión está también en `archivos/musica/registro-de-uso.md` (§1, §2 y §7), el tablero de coordinación entre sesiones.

## Versiones de esta propiedad

| V | Proyecto | Estado | Qué es |
|---|---|---|---|
| V27 | 045 | sesión hermana | «El tiempo»: abre con el APTO (RC01) · HK01 · MD01 · CT01 · clímax RC21 · *Fortitude* |
| **V28** | **046** | **en prueba** (la final, al OK del usuario) | **«Ciudad nueva»: ABRE CON EL HOOK · HK03 · MD02 + MD03 (dos tomas) · CT02 · clímax RC18 · *Children* (piano)** · 1291 f · 43,0 s |
| V29 | 047 | sesión hermana | «Lo que incluye»: abre con el APTO (RC20) · HK02 · MD04 + MD05 · CT03 · clímax RC03 · *Dreamlife* |
| V30 | 048 | sesión hermana | «Chef y experiencias»: abre con el HOOK · HK01 · MD03 · CT03 · clímax RC10 · *Einaudi Fly* |
| V31 | 049 | sesión hermana | «Amenidades»: abre con el APTO (RC04) · HK03 · MD05 · CT01 · clímax RC19 · *In This Together* |
| V32 | 050 | sesión hermana | «14,8»: abre con el HOOK · HK02 · MD04 · CT02 · clímax RC02 (final) · *Spring is Coming* |

## Lo que lleva (rev. 0 = la prueba entregada al usuario)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Apertura | **El HOOK** (HK03 entera, `IMG_4304.mov`, voz 0,57-5,62 s) | por encargo del usuario (excepción a la regla fija 1, como el 021-024): Isabella es el frame 0; su primera palabra, f17 |
| Hook | HK03 «Cuando llegas a una ciudad que no es la tuya, el acompañamiento personalizado es una plusvalía indispensable.» | asignado. **Repetido** en la V31/049 (por diseño del reparto) |
| Unidad (bloque 3) | RC17 4,30-6,70 s (el carril de nado) · RC11 0,40-3,43 s (la Social Kitchen) · RC12 0,40-3,33 s (desde el otro lado, disolvencia) | sin gente en el cuadro, los tres giran a la derecha; RC16 (que usan las hermanas) y el gimnasio (gira a la izquierda) quedan fuera |
| Mitad | **MD02** (`IMG_4278`, voz 0,69-3,66 s) + **MD03** (`IMG_4285`, voz 0,68-6,66 s), dos tomas unidas con una disolvencia | asignadas. **MD03 repetida** en la V30/048. La música no sube entre ellas |
| Apartamento (bloque 5) | RC05 3,60-7,07 s (la alcoba) → RC09 3,00-6,00 s (el baño) | los tramos que menos usan las hermanas; RC09 se corta antes del champú con etiqueta (≥ 6,3 s) |
| Clímax | **RC18** 0,10-5,13 s (la terraza al atardecer; 5,0 s, el plano más largo del bloque) | asignado, exclusivo |
| CTA | CT02 (`IMG_4294`, voz 0,76-4,98 s) «Si quieres un apartamento amoblado que tenga acompañamiento personalizado, escríbeme.» | asignado. **Repetido** en la V32/050 |
| Canción | ***Armin van Buuren — Children (from 'Piano' album)*** (`80bd8abe`) | asignada; se entra en el golpe de 175,883 s (9,7 dB, f3) y su caída natural (211,5 s) cae donde entra el CTA |
| Voz | −15 LUFS tratada (+17,9 · +18,0 · +17,9 · +17,7 dB tras el compresor 3,5:1; limitador −2,5 dBFS) | pedido permanente |
| Música sola | −15 LUFS por tramos (apertura −3,8 dB, paseo −3,9, bloque 5 −5,5 sobre el archivo); −26 bajo la voz | la canción está a −10 LUFS |
| Color | `COLOR_BASE` (la del 017) + el ajuste de cada plano | ver abajo |

## Lo medido en la prueba (rev. 0)

| Qué | Medida |
|---|---|
| Golpes sobre los cortes | los 5 golpes (3 cortes secos y 2 disolvencias que acaban en uno) a −0,3…+0,5 f en el AAC de la prueba (`golpes-render.py`): 11,4 · 8,0 · 11,3 · 8,2 · 9,1 dB |
| Voz | −14,6 · −14,8 · −14,7 · −15,0 LUFS en sus ventanas del render (música a −26 debajo), picos −5,5…−4,6 dBFS |
| Música sola | −15,0 (paseo) · −15,2 (bloque 5) LUFS |
| Pieza | −15,1 LUFS integrado, pico −4,4 dBFS, LRA 1,6 LU: sin saturar |
| Subtítulos | 19 líneas a +0,0…+2,5 f de su palabra sobre la voz sola (`lineas-vs-onsets.py`) |
| Color (`medir-color.py` sobre stills y `luma-cambios-render.py` sobre la prueba) | saltos de luma en los 9 cambios de plano de −5,8 a +5,2 niveles (piscina → Social Kitchen −9,1 en la primera prueba; con el ajuste de RC11 a `exposure` +0,2, −5,8); la Social Kitchen → su otro lado, que a corte saltaba +33, entra con disolvencia · quemado máx. 0,9 % · aplastado máx. 19 % en el carril de nado (las copas de los árboles a contraluz, siluetas) · base del canal y ajustes por plano en `metraje-046.ts` |

## Cómo cambiar cada pieza

- **Otro hook / otra mitad / otro CTA:** añade su fila a `MATERIAL` de `normalizar.mjs` (con su sha) y su ventana a `VENTANA_VOZ` (mide por energía con `onsets-voz.py` y el perfil de 20 ms antes de fiarte del DTW de whisper), la ganancia con `herramientas/probar-voz.py --umbral 0.0316 --razon 3.5` (editar su `TOMAS`) → `GANANCIA_VOZ_DB`. Luego `voz.s0/s1/lufs/dice` del corte, el guion marcado `voz/<toma>.txt`, cada línea llevada a su palabra con `onsets-voz.py` + `palabras-desde.py` (tabla de `lineas-vs-onsets.py`). Si cambia la duración del plano cambia el reparto de frames (`P` de `metraje-046.ts`) y los golpes de los cortes secos.
- **Otra canción:** reservarla en el registro; `buscar-entrada.py` (la entrada y la caída del CTA) y `medir-pista.py … --json musica/golpes-046.json`; los `GOLPE` de `metraje-046.ts`, `INICIO_MUSICA`, `FIN_MUSICA_046` y los niveles de `audio-046.ts` (`LUFS_TRAMO`, `PICO_APERTURA`, `LUFS_CANCION_EN_VOZ`; `lufs-rangos.py`). La alternativa que reservó el reparto (*Here For You*) no cae al CTA (8,0 dB).
- **Otro plano del recorrido:** mira el clip RECORTADO (`herramientas/hoja-contactos.py` sobre el original a 1 fps y `hoja-mini` del normalizado), sin gente en el cuadro, el mismo sentido de giro que sus vecinos, y mide su luma contra el de los cortes (`medir-color.py`). El `desde` va en el tiempo del MP4 normalizado (30 fps constantes, igual que el original). El recorte es `recorte` (0-1) en `MATERIAL`.
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `contrast` ≤ 1,22, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella). Stills antes/después: `stills-multiples.mjs` y `stills-antes.mjs`; `medir-color.py`.
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-046.ts`; las voces siguen a −15 LUFS.
- **Cerrar «amoblado»** (CT02, f1110-f1127 = 37,0-37,6 s): si no es «amoblado», el texto del primer trozo de `z01` en `subtitulos-046.ts`, `voz/ct02.txt`, el `dice` de `c11-cta` en `metraje-046.ts`, `lineas-vs-onsets.py` y el `.srt`.

## Lo por confirmar

- **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto): «**amoblado**» (CT02, f1110-f1127 = 37,0-37,6 s del vídeo): whisper oye «movilado» (conf. 0,27) en todos los cortes; en 1,4 s caben trece sílabas, así que la dice muy deprisa. «apartamento» lo oye «aportamento» (conf. 0,45): es la pronunciación.
- La canción (medida, no oída; piano sin pulso; licencia sin verificar).
- Que el hook (HK03) y el CTA (CT02) se repitan en otras piezas del arriendo (HK03 en la V31, CT02 en la V32), por diseño del reparto.
- El canal de «escríbeme» (DM o WhatsApp): el cierre lleva la web y el caption, el WhatsApp.
