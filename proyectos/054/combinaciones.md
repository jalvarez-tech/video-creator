# Combinaciones — proyecto 054 · Casa en Condominio Los Bravos (La Ceja), V36 («Privacidad»)

Registro de esta versión y mapa de «cómo cambiar cada pieza». Las otras dos versiones de la casa son la **V37 (055, «las mañanas»)** y la **V38 (056, «solo 6 casas»)**, en sesiones paralelas del mismo checkout; el reparto de hook, mitad, CTA, dron y canción está en [`reparto-054-062.md`](reparto-054-062.md) y manda.

## Versiones de esta propiedad

| V | Proyecto | Estado | Fecha | Qué es |
|---|---|---|---|---|
| **V36** | **054** | **final** (CRF 12 + CRF 16 + `.srt` + portada + versión con ficha + caption; 5 palabras sin oír) · la prueba rev. 1 (`pruebas-720p/054-recorrido.mp4`) la aprobó el usuario; la rev. 0 usaba el dron 9,0-11,77 s y el CTA cortado a 5,62 s | 2026-10-22 | **«Privacidad»**: DR01 57,0-59,77 s · **HK01** · RC02 · RC25 · RC01 · RC03 · **MD04** · RC06 · RC07 · RC13 · RC22 · RC24 · **CT06** · *Luxury, Elegance, Refined* · 1153 f · 38,4 s |
| V37 | 055 | en otra sesión | — | «las mañanas»: HK02 · MD03 · CT03 · *Spring is Coming* · dron `DJI_…0070_D` último tercio (68-103 s) |
| V38 | 056 | en otra sesión | — | «solo 6 casas»: HK04 · MD02 · CT01 · *Heaven on Earth* · dron `varias_tomas` tras el corte de 86,05 s |

## Lo que lleva (rev. 1)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Aérea | DR01 57,00-59,77 s (83 f) | **por encargo del usuario (rev. 1: «la toma del dron empiézala en 0:57»)**: la casa vista desde arriba (tejado, fachada, seto, césped); movimiento uniforme (dispersión 0,126); al fondo se ve una casa vecina del condominio. La rev. 0 usaba 9,0-11,77 s (el primer tercio del reparto); 35-68 s no es de ninguna versión |
| Hook | HK01 `IMG_8815` (voz 1,06-4,82 s) | la tesis del ángulo: «El lujo real no es tener una torre con vista, es no tener vecinos encima» |
| Paseo (bloque 3) | RC02 0,10-1,37 · RC25 4,20-5,60 · RC01 3,70-5,23 · RC03 3,40-4,77 s | del jardín propio (césped, seto, pérgola) al ventanal abierto, la sala de doble altura y el ventanal al verde |
| Mitad | MD04 `IMG_8820` (voz 0,82-4,42 s) | «Está a los 50 minutos de Medellín con una administración de 120.000»: DOS cifras, las dos escritas |
| Bloque 5 | RC06 5,30-7,03 · RC07 0,80-3,00 · RC13 0,00-1,63 · RC22 0,00-2,60 · RC24 3,90-7,70 s | la cocina → la puerta de la alcoba → el jacuzzi → el sendero lateral junto al muro → LA VISTA (114 f, el más largo) |
| CTA | CT06 `IMG_8918` (voz 1,02-5,94 s; el plano usa 0,77-7,10 s) | «Si valoras espacio y privacidad, este espacio te va a encantar. Escríbeme y agendemos una visita» |
| Canción | *Luxury, Elegance, Refined* (`4d36ea48`) desde 45,2 s (`INICIO_MUSICA` = 1356/30) | repetida de otra propiedad (el Lote El Carmen, V26/043), autorizada por el usuario; entra en su golpe de 17,8 dB y todos los cortes caen en golpes medidos; medida, no oída |
| Voz | −15 LUFS tratada (+18,6 · +19,7 · +19,1 dB tras el compresor 3,5:1; limitador −2,5 dBFS) | pedido permanente del canal |
| Música | −15 LUFS sola por tramos (−0,6 · −0,6 · −0,1 dB); −26 LUFS bajo la voz; partida en tramos consecutivos (ffmpeg) | ver `aprendizajes.md` §1 |
| Color | `COLOR_BASE` (contraste 1,08) + el ajuste de cada plano (medido); el jardín y el ventanal, levantados (exposición +0,4, sombras +0,5, contraste 1,0) | ver abajo |

## Metraje que comparte con las otras dos versiones (declarado)

Los recorridos se pueden repetir (`reparto-054-062.md`) y la puerta (sección 7b) lo cuenta por segundos de cada clip. **Acordado con la sesión de la V37 (055) el 2026-10-22** (su nota: `side-session-notes/…/055-tramos-de-recorrido.md`): esta versión usa RC01 3,7-5,23 s, RC24 3,9-7,7 s, RC22 0,0-2,6 s y RC07 0,8-3,0 s, y la V37 (055) usa RC01 1,2-3,6 · RC24 1,2-3,9 · RC22 2,6-6,67 y RC19 1,5-4,37 (RC07 ya no lo usa). **Resultado: la puerta da «ni un segundo de metraje en común» con la V37 (055) y con la V38 (056)** con los planos de las dos tal como estaban el 2026-10-22 08:50 (en marcha, pueden cambiar: se vuelve a ejecutar la puerta antes de la final). Pasados los 6,4 s de RC22 el clip deja ver el tejado de ladrillo de una casa vecina detrás del seto (contradice el hilo): por eso mi plano es el principio del clip y el de la V37 acaba antes de ese tejado.

## Lo exportado (2026-10-22, tras el OK del usuario a la prueba rev. 1)

| Archivo | Qué es |
|---|---|
| `finales/054-recorrido.mp4` | máster: CRF 12 `slower`, 1080×1920, 30 fps, 1153 f (38,4 s), 132 MB, BT.709 etiquetado |
| `finales/054-recorrido-crf16.mp4` | versión ligera: CRF 16 `slow`, 76 MB; la misma imagen y el mismo audio (md5 del PCM idéntico al del máster) |
| `finales/054.srt` | 17 cues, de 3,0 a 35,7 s |
| `finales/054-portada.png` + `portada.json` | portada 9:16: el fotograma de los 27,3 s (la fachada con el árbol y el césped, la vista del bloque 5), «LA CEJA» y `VENTA` (la ficha lo dice); contraste del texto 11,1:1 y del isotipo 8,3:1 |
| `finales/054-recorrido-ficha.mp4` | la versión con ficha (skill `ficha-luxur`): SIN subtítulos, «CASA EN VENTA · La Ceja · Condominio Los Bravos · $ 1.380 M COP» abajo del 1:1 durante todo el vídeo hasta la tarjeta; el audio del final copiado tal cual. Datos en `ficha.json` |
| `caption.md` | descripción de Instagram, versión resumida |

Banderas: `--color-space=bt709 --image-format=png --gl=angle --audio-bitrate=320k`. Etiquetas de color arregladas sin pérdida en las dos (`h264_metadata` + `+write_colr`: VUI 1/1/1 y átomo `colr`), con el `framemd5` decodificado (1153/1153 fotogramas) y el md5 del PCM iguales antes y después. Color contra stills a escala 1 (`medir-final.py`, 10 fotogramas): máster a ≤ 0,83 niveles (baja frecuencia ≥ 47,3 dB), CRF 16 a ≤ 0,62 (≥ 45,3 dB); 0 fotogramas fuera de tolerancia (`medidas/medir-final-*.txt`). Los renders salieron de un Remotion privado (`herramientas/espejo-054.sh`), idéntico al del checkout.

**Exportada con CINCO palabras sin oír** (la puerta con `--final` falla solo por ellas; la nota se queda). Segundos del VÍDEO FINAL:
- «**vista**» (HK01, f143 = 4,8 s) y «**vecinos**» (HK01, f172 = 5,7 s): whisper oye «visa» y «vecinas»; la voz va con viento y por energía y formantes no se resuelve (en «vista» no se ve una /t/ separada de la /s/).
- «**Está a los**» (MD04, f408 = 13,6 s): el catálogo escribía «[Está] a 50»; whisper oye «Hace los», «Hasta los» o «Solo» según el corte. Es la duda más abierta.
- «**valoras**» (CT06, f911 = 30,4 s): por formantes la sílaba «-ras» es una [a] (F1 ≈ 680 y F2 ≈ 1.650 Hz).
- «**agendemos**» (CT06, f1027 = 34,2 s): todas las rebanadas de audio la leen así; la toma entera la oye «haciéndemos».

Si alguna suena distinta: el texto del trozo en `subtitulos-054.ts` (`h02`, `h03`, `m01`, `c01`, `c03`), `voz/<toma>.txt`, el `dice` del plan, el `.srt` (`exportar-srt.mjs`) y el caption; el texto va dentro de la imagen, así que hay que volver a renderizar (≈ 12 min cada final con el equipo cargado), repetir las etiquetas de color y la versión con ficha (que se vuelve a hacer desde `sinSubtitulos`).

## Cómo cambiar cada pieza

- **Otro hook / mitad / CTA** (libres que quedan sin repetir: `reparto-054-062.md` §«Lo que queda libre»): añade su fila a `MATERIAL` de `normalizar.mjs` (con su sha) y su ventana a `VENTANA_VOZ` (mira la energía con `envolvente-voz.py` antes de fiarte de `limites-voz.py`: HK01 lleva viento), la ganancia con `herramientas/probar-voz.py --umbral 0.0316 --razon 3.5` (editar su `TOMAS`) → `GANANCIA_VOZ_DB`. Luego `voz.s0/s1/lufs/dice` del corte, el guion marcado `voz/<toma>.txt`, cada línea llevada a su palabra con `onsets-voz.py` + `palabras-desde.py` (tabla de `lineas-vs-onsets.py`). Un cambio de duración mueve los cortes: **se vuelve a buscar la rejilla** (`buscar-rejilla-054.py`) y se actualizan `GOLPE` de `metraje-054.ts`, las líneas de `subtitulos-054.ts` y los puntos de `audio-054.ts`.
- **Otra canción:** reservarla en el registro; `medir-pista.py … --json musica/golpes-054.json` (la canción ENTERA) y `buscar-rejilla-054.py` (`R`, `MINS`, `SUMAS`, `HOOK`); `INICIO_MUSICA` y los `GOLPE` de `metraje-054.ts`, los niveles de `audio-054.ts` (`LUFS_TRAMO`, `PICO_TRAMO`, `LUFS_CANCION_EN_VOZ`; `lufs-rangos.py`).
- **Otro plano de recorrido:** mira su fila en la hoja del catálogo y la hoja de ventanas (`herramientas/hoja-planos.py`); el tramo no pasa de los segundos del clip y entra en el golpe del corte (la duración del plano la fija la rejilla). Evita los balcones de RC09/RC10/RC15-RC17 y la terraza de RC23: dan a casas vecinas (contradicen el hilo).
- **Otra aérea:** `ventana-fina.py dr01 <a> <b> <N>` (movimiento uniforme) y el primer tercio (0-35 s) es de esta versión; el resto del dron es de la V37 y la V38.
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `contrast` ≤ 1,15, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella). Stills: `ESPEJO=… node proyectos/054/herramientas/stills-multiples.mjs Recorrido054 1 <carpeta> <frames> angle`.
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-054.ts`; las voces siguen a −15 LUFS.

## Lo medido en la prueba (rev. 0; los números de voz y música no cambian en la rev. 1 salvo el CTA, que se vuelve a medir)

| Qué | Medida |
|---|---|
| Cortes secos | los 12, a ≤ 0,8 f de su golpe sobre el audio del render (`golpes-render.py`, en la rev. 0; la rev. 1 no mueve ningún corte) y de 10,3 a 17,7 dB |
| Voz | −14,6 (hook) · −14,6 (mitad) · −14,8 (CTA) LUFS en sus ventanas del render, con la música debajo; picos −5,7 · −5,0 · −4,6 dBFS |
| Música sola | −14,9 (aérea) · −15,0 (recorrido 1) · −15,0 (recorrido 2) LUFS |
| Pieza | −15,0 LUFS integrado, pico −2,9 dBFS: sin saturar (`medidas/audio-prueba.txt`) |
| Subtítulos | 17 líneas a −0,4…+2,2 f de su palabra sobre la voz sola (`lineas-vs-onsets.py`) |
| Legibilidad (`legibilidad.py`, líneas enteras a escala 1) | p90 2,8-6,5 : 1 · p99 2,1-4,1 : 1 |
| Cierre | tarjeta de 2,0 s con el logo y la web; negro exacto en el f1092 (la puerta) |

## Lo por confirmar

- **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto):
  - «**vista**» (HK01, f143 = 4,8 s del vídeo): whisper oye «visa» en todos los cortes; la voz va flaca (camina con viento).
  - «**vecinos**» (HK01, f172 = 5,7 s): whisper oye «vecinas»; la medida de formantes de la vocal final no cierra.
  - «**Está a los**» (MD04, f408 = 13,6 s): el catálogo escribía «[Está] a 50»; whisper oye «Hace los» (toma entera), «Hasta los» (rebanada 0,78-1,45 s) y «Solo» (rebanadas desde 0,90 s). Se pinta «Está a los 50 minutos»: el «los» se oye en las tres lecturas. **Es la duda más abierta de la pieza.**
  - «**valoras**» (CT06, f911 = 30,4 s): whisper oye «valores» (confianza 0,35 en «val»); por formantes la sílaba «-ras» mide F1 ≈ 680 y F2 ≈ 1.650 Hz, una [a].
  - «**agendemos**» (CT06, f1027 = 34,2 s): whisper la oye «haciéndemos» en la toma entera y «agendemos» en todas las rebanadas: cerrada por cortes; se deja la nota por ser la acción de la pieza.
- Las cifras se DICEN «cincuenta» y «ciento veinte mil» y se pintan «50» y «120.000»: si Isabella dijera otra cosa (p. ej. «cincuenta y cinco»), cambia el rótulo.
- La canción (medida, no oída; lounge; licencia no verificada).
- Que se oiga el hook (la voz va con viento y subida +18,6 dB).
- Por dónde se escribe («escríbeme»: mensaje directo o WhatsApp).
