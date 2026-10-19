# Combinaciones — proyecto 040 · Lote en El Carmen de Viboral (Mia), V23 «La vista»

Registro de esta versión y mapa de «cómo cambiar cada pieza». Las V14 (030), V15 (031), V18 (034) y V22 (039) están en git (`proyectos/030|031|034|039` y `remotion/src/proyectos/…`); lo que usó cada una está también en `archivos/musica/registro-de-uso.md` (§1 y §6), el tablero de coordinación entre sesiones. Esta pieza es una de CUATRO que se montaron a la vez el 2026-10-17 (V23-V26: 040, 041, 042 y 043), con el reparto de tomas, drones y canciones decidido de antemano.

## Versiones de esta propiedad

| V | Proyecto | Estado | Fecha | Qué es |
|---|---|---|---|---|
| V14 | 030 | final | 2026-10-08 | «Seguridad sin encierro»: DR97 · HK04 · MD02 · CT01 · *Becoming* |
| V15 | 031 | final | 2026-10-09 | «Construir aquí»: DR107 · HK06 · MD04 · CT04 · *Somewhere inside of me* |
| V18 | 034 | final | 2026-10-09 | «Tu lugar en el campo»: DR98 · HK03 · MD03 · CT03 recortado · *Chillin'* |
| V22 | 039 | en prueba | 2026-10-09 | «El campo sin desconexión» (disruptivo): DR104 · HK02 · MD05 · CT02 · *Light Fills the Room* |
| **V23** | **040** | **final** (CRF 12 + CRF 16 + .srt + portada VENTA; «3.000», «escríbeme» y «lote» sin oír) | 2026-10-17 | **«La vista»**: DR202 · **HK05** · DR209 · DR202 · DR209 · **MD04** · DR236 · DR236 · DR234 (la vista) · **CT02** · *Overcoming the Impossible* · 1118 f · 37,3 s · drones NUEVOS del 2026-10-14 al atardecer |

## Lo que lleva (rev. 0)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Hook | HK05 `IMG_1595` (voz 0,305-5,72 s) | asignado: «imagina despertar todos los días con esta vista y tener más de 3000 metros cuadrados…»; lleva la **única cifra** de la pieza |
| Mitad | MD04 `IMG_1601` (voz 0,95-4,13 s) | asignada; **la usó la V15 (misma toma y frase): REPETIDA, declarado** |
| CTA | CT02 `IMG_1603` (voz 0,40-3,90 s) | asignado; **misma frase que el CT01 de la V14 y reservado por la V22 (sin final): REPETIDO, declarado** |
| Canción | *Overcoming the Impossible* (`856aff24`) | la única del grupo (Cornfield Chase · Dreamlife · Oceans · Softly · Overcoming) con rejilla ≥ 9 dB para estos 9 planos y caída donde entra el CTA; épica, **medida y no oída** |
| Entrada de la canción | 172,667 s (`INICIO_MUSICA` = 5180/30) | golpe de 15,0 dB en el f3 |
| Apertura (frame 0) | DR202 1,50-5,10 s | el sol bajo sobre las terrazas del lote (σ/μ 0,077) |
| Paseo | DR209 13,00-16,40 · DR202 9,00-12,17 · DR209 19,00-21,77 | las terrazas bajo el cielo dorado → el sol sobre el horizonte → el árbol en contraluz |
| Bloque 5 | DR236 7,50-8,90 · DR236 9,50-11,10 · **DR234 0,00-4,53** | el cielo rosa sobre las palmas (dos tramos) → la vista, 4,5 s, el plano más largo |
| Voz | −15 LUFS tratada (+19,4 · +19,3 · +17,9 dB tras el compresor 3,5:1; limitador −2,5 dBFS) | regla del canal |
| Música sola | −15 LUFS por tramos (apertura −3,4 dB, paseo −6,1, palmas −5,8, vista −2,0); −26 bajo la voz | la canción es MUY alta: ningún tramo sube |
| Color | `COLOR_BASE` (contraste 1,12, sombras +0,2) + el ajuste de cada plano (medido) | ver abajo |

## La final (2026-10-17, con el OK del usuario a la prueba)

| Archivo (`proyectos/040/finales/`) | Qué es |
|---|---|
| `040-recorrido.mp4` | master CRF 12 `slower`, 124 MB, 26,3 Mbps; etiquetas BT.709 arregladas sin pérdida (R22): VUI y átomo `colr` |
| `040-recorrido-crf16.mp4` | versión ligera CRF 16 `slow`, 63 MB, 13,2 Mbps; misma imagen y mismo audio |
| `040.srt` | 14 cues (`exportar-srt.mjs`) |
| `040-portada.png` | portada 9:16: el fotograma de 27,3 s (la vista), **EL CARMEN DE VIBORAL · VENTA**, contraste 8,0:1 de texto y 17,4:1 de isotipo (`portada.json`) |
| `../caption.md` | descripción de Instagram (versión resumida) |

La orden de exportar llegó con tres dudas abiertas (ya avisadas): se MIDIÓ lo medible y la nota se queda (la puerta con `--final` falla solo por ella). «**3.000**» (HK05, 7,2 s del vídeo): desde 3,78 s whisper oye «mil metros cuadrados» y entre 3,65 y 3,78 s suena «tres» (dos palabras en 0,3 s: «tres mil», no «treinta mil»); cambiarla: el texto del trozo `h02` (f217) en `subtitulos-040.ts`, `voz/hk05.txt` y el `.srt` (≈ 6 min). «**escríbeme**» y «**lote**» (CT02, 32,7 y 33,4 s): una /b/ y una /l/ no se miden con formantes; se pintan por lo que dice la ficha («escríbeme lote y te envío toda la información»).

## Lo medido en la prueba (rev. 0)

| Qué | Medida |
|---|---|
| Cortes secos sobre golpes | los 9 (hook, terrazas, sol, árbol, mitad, palmas, palmas 2, vista, CTA) a −0,2…+0,5 f en el AAC de la prueba (`golpes-render.py`, `medidas/golpes-render.txt`), de 8,7 a 11,9 dB; el del f407 mide 8,7 dB en el render (9,5 en la fuente) |
| Voz | −14,8 · −14,7 · −14,6 LUFS en sus ventanas del render (música a −26 debajo), picos −4,4 · −4,3 · −4,8 dBFS |
| Música sola | −15,0 (apertura) · −15,0 (paseo) · −15,1 (palmas) · −15,3 (vista) LUFS |
| Pieza | −15,1 LUFS integrado, pico −1,9 dBFS, LRA 3,0 LU: sin saturar |
| Subtítulos | 14 líneas a +0,0…+1,3 f de su palabra sobre la voz sola (`lineas-vs-onsets.py`, `medidas/lineas-vs-onsets.txt`) |
| Legibilidad (R25) | texto sin sombra sobre el metraje: contraste 6,6-7,4 : 1 al p90 (017: 2,9-3,7; 018: 2,8-4,1) |
| Color (`medir-color.py`, antes → después; `medidas/medir-color-4.txt`) | σ de luma entre planos 4,3 → 3,8 · quemado máx. 11,6 → 1,1 % · aplastado máx. 2,4 → 6,2 % (el primer plano de DR202: las terrazas caen a negro) · saturación media 0,272 → 0,335 · piel: tono 9,5° → 9,2° (MD04), 7,9° → 7,5° (CT02) · saltos de luma en los cortes: el mayor, +6,1 (árbol → mitad: el día de Isabella tras el atardecer del dron) |
| Cierre | tarjeta de 2,0 s con el logo y la web; negro exacto en el f1057 (la puerta) |
| Drones (`medir-ventana-040.py`) | σ/μ 0,03-0,09 en seis de los siete planos; **DR234 (la vista) acelera despacio**: media 0,94, σ/μ 0,24, pendiente +0,73 (0,76 → 1,40 en 4,5 s, sin un tirón); todo el vuelo acelera (6,5 s) y la ventana elegida es la más lenta |

## Cómo cambiar cada pieza

- **Otro hook / mitad / CTA** (este reparto repite la mitad y el CTA): añade su fila a `MATERIAL` de `normalizar.mjs` (con su sha) y su ventana a `VENTANA_VOZ` (¡mira la energía antes de la primera sílaba!), la ganancia con `herramientas/probar-voz.py --umbral 0.0316 --razon 3.5` (editar su `TOMAS`) → `GANANCIA_VOZ_DB`. Luego `voz.s0/s1/lufs/dice` del corte, el guion marcado `voz/<toma>.txt`, cada línea llevada a su palabra con `onsets-voz.py` + `palabras-desde.py` (tabla de `lineas-vs-onsets.py`). Cambia la duración del plano y con ella la rejilla: `rejilla-040.py` / `buscar-cortes-039.py` con los rangos del plan.
- **Otra canción:** reservarla en el registro; `buscar-entrada.py` y `buscar-cortes-039.py` (`R='[[50,110],[180,200],[60,130],[60,130],[60,130],[118,136],[45,110],[45,110],[110,190]]' FIN=todas MINC=9 DROP=0 START_MIN=9`); `medir-pista.py … --json musica/golpes-040.json`; los `GOLPE` de `metraje-040.ts`, `INICIO_MUSICA` y los niveles de `audio-040.ts` (`LUFS_TRAMO`, `LUFS_CANCION_EN_VOZ`; `lufs-rangos.py`).
- **Otro plano de dron:** medir su movimiento ANTES (`perfil-dron.py <clip>` por tramos de 0,5 s y `medir-ventana-040.py clip:desde:frames`); `flujo.py` NO sirve para estos (avanzan y bajan: da 0). Dos planos seguidos del mismo clip llevan el mismo color (la puerta, 2d).
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `contrast` ≤ 1,15, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella). `herramientas/stills-color.sh` deja los fotogramas con y sin graduar a escala 1 (¡no editar `metraje-040.ts` mientras corre: `stills-antes.mjs` lo reescribe y lo restaura!); `medir-color.py`.
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-040.ts`; las voces siguen a −15 LUFS.

## Lo por confirmar

- **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto): la cifra «**3.000**» (HK05, f217 = 7,2 s del vídeo; whisper oye «3000» con confianza 0,53), «**escríbeme**» (CT02, f980 = 32,7 s) y «**lote**» (CT02, f1002 = 33,4 s).
- Si el hook, que lleva la cifra «3000» (la ficha dice 3.428 m²), vale; si la mitad y el CTA, repetidos de la V15 y de la V14/V22, valen.
- La canción (épica, medida y no oída; licencia sin verificar) y por dónde se escribe «lote».
