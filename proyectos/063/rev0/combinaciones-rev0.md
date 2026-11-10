# Combinaciones — proyecto 063 · Lote en San Vicente Ferrer (vereda La Porquera), V45 («El error»)

Registro de esta versión y mapa de «cómo cambiar cada pieza». Es la primera de las tres versiones de este lote que se montan a la vez en sesiones distintas (reparto en `proyectos/063/reparto-063-065.md`, que manda); las otras dos son la V46 (064, «No hace falta irse lejos») y la V47 (065, «15 minutos de la autopista»). La canción está reservada en `archivos/musica/registro-de-uso.md` (fila V45). Catálogo del rodaje: `catalogo/catalogo-material.md`.

## Versiones de esta propiedad

| V | Proyecto | Estado | Fecha | Qué es |
|---|---|---|---|---|
| **V45** | **063** | **prueba rev. 0** (`pruebas-720p/063-recorrido.mp4`, 540×960, BT.709) **a la espera del OK del usuario**; la final (CRF 12 + CRF 16), el `.srt`, la portada, la versión con ficha y el caption se hacen/entregan tras ese OK (el caption ya está escrito) | 2026-10-22 | **«El error»**: DR01 (lote desde arriba) · **HK01** · DR01 ×3 · **MD01** · DR02 · DR06 · DR01 (la vista) · **CT02** · ***Oceans (Where Feet May Fail)*** · 1402 f · 46,7 s |
| V46 | 064 | en montaje (otra sesión) | 2026-10-22 | «No hace falta irse lejos»: HK02 · MD02 · CT03 · DR03 · DR04 · DR07 · *Cornfield Chase* |
| V47 | 065 | en montaje (otra sesión) | 2026-10-22 | «15 minutos de la autopista»: HK03 · HK04 (de mitad) · CT05 · DR05 · DR08 · DR09 · *deadmau5 - Strobe* |

## Lo que lleva (rev. 0)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Apertura | DR01 31,00-34,07 s (92 f) | el lote entero desde arriba: la ladera verde con su cerca viva, los surcos del vecino y las lomas, a velocidad constante desde el f0 |
| Hook | HK01 `Hook1.mp4` (voz 2,89-9,32 s; `desde` 75 f) | el ángulo: «El error no es comprar un lote barato, es comprarlo sin todas las acometidas legales. Ven, te enseño cómo evitar esto.»; entra disolviendo y su primera palabra suena a los 11,7 f del golpe |
| Vuelo (bloque 3) | DR01 5,00-8,17 · 21,00-23,73 · 41,00-43,73 s | a ras de la ladera con el árbol → la esquina de la cerca viva con los surcos → la loma con el camino de tierra; tres ventanas del mismo vuelo sin segundos en común y con el MISMO color |
| Mitad | MD01 `Medio3.mp4` (voz 3,61-11,34 s; `desde` 96 f) | «Antes de enamorarte de un lote, **empieza con** tres cosas: ubicación, agua y escrituras. Y este lote empieza con todas esas cosas sobre la mesa.» (el reparto suponía «fíjate en»; medido, ver abajo) |
| Bloque 5 | DR02 17,60-20,80 · DR06 1,50-4,23 · DR01 62,50-66,23 s | el pasto desde arriba → la casa blanca del entorno con su cerca viva y sus palmas → la vista del valle (112 f, el plano más largo del bloque) |
| CTA | CT02 `cta2.mp4` (voz 4,03-8,82 s; `desde` 109 f; el plano usa 3,63-9,30 s) | una acción: «escríbeme»; el CTA entra en el último golpe fuerte antes de la caída de la canción |
| Canción | *Oceans (Where Feet May Fail)* (`f6cebfbd`) desde 142,833 s (`INICIO_MUSICA` = 4285/30) | pulso de 132 BPM, cae a un lecho suave a los 182,3 s; medida, no oída |
| Voz | −15 LUFS tratada (+18,3 · +19,3 · +18,3 dB tras el compresor 3,5:1; limitador −2,5 dBFS; el limitador quita 0,1 · 2,9 · 1,1 dB) | pedido permanente del canal |
| Música | −15 LUFS sola por tramos (−4,0 · −3,1 · −3,1 dB; el lecho +4,2 dB); −26 LUFS bajo la voz; partida en tramos consecutivos (ffmpeg) | ver `aprendizajes.md` |
| Color | `COLOR_BASE` + el ajuste de cada plano (medido); los tres planos del paseo (DR01) llevan EL MISMO | ver abajo |

## Lo medido en la prueba (rev. 0)

| Qué | Medida |
|---|---|
| Cortes sobre el golpe (`golpes-render.py` sobre el AAC de la prueba) | los 9 golpes de plano a −0,5…+0,5 f de su frame previsto: f92 (11,2 dB) · f351 (14,7) · f446 (9,5) · f528 (12,7) · f610 (12,6) · f882 (9,4) · f978 (11,5) · f1060 (14,8) · f1172 (11,7); el de entrada, desde el silencio, en el f0 (`medidas/golpes-render.txt`) |
| Pieza | −15,0 LUFS integrado, LRA 1,6 LU, pico −3,0 dBFS (`medidas/audio-prueba.txt`) |
| Por tramos (ebur128 sobre la prueba) | música sola: −15,1 (apertura) · −15,0 (vuelo) · −15,0 (bloque 5) · voz con música debajo: −14,8 (hook) · −14,7 (mitad) · −14,8 (CTA); picos −4,3 a −3,0 dBFS |
| Subtítulos | 24 líneas a +0,5…+1,4 f de su palabra sobre la voz sola (`lineas-vs-onsets.py`); sobre el render, con música, el detector da mediana +2,3 f y valores dispersos en las sílabas suaves (`medidas/subs-vs-voz.txt`; lo que ya avisa R31) |
| Legibilidad del texto (`legibilidad.py`) | p90 de fondo: 4,0-4,5 : 1 (mejor que 017/018: 2,8-4,1); p99: 1,6-3,5 : 1 (el 1,6 es un píxel claro suelto en el f1290) |
| Color (`medir-color.py`, antes → después) | luma entre planos σ 15,3 → 14,3 · saturación media 0,441 → 0,493 · quemado máx. 1,9 → 0,9 % · aplastado máx. 1,6 → 1,8 % · piel: tono 15,7° → 15,5° (HK01), 12,8° → 12,8° (MD01), 13,9° → 13,7° (CT02) · salto de luma en el corte hook → ladera: −26,8 → −24,4 (el contenido: Isabella con cielo claro → dron sobre la ladera) |
| Cierre | tarjeta de 2,0 s con el logo y la web; negro exacto en el f1341 (la puerta) |

## Cómo cambiar cada pieza

- **Otro hook / mitad / CTA** (libres que quedan: HK02 `Hook2.mp4` y HK03 `Hook3.mp4` son de la 064 y la 065; CT01 `cta1`, CT04 `cta4`, CT06 `cta5 (2)` y CT07 `cta6` están libres): añade su fila a `MATERIAL` de `normalizar.mjs` (con su sha) y su ventana a `VENTANA_VOZ` (suelo de ruido de estas tomas: −72 a −77 dB, `limites-voz.py --margen 40` es fiable; mira la envolvente con `envolvente-voz.py` igualmente), la ganancia con `herramientas/probar-voz.py --umbral 0.0316 --razon 3.5` (editar su `TOMAS`) → `GANANCIA_VOZ_DB`. Luego `voz.s0/s1/lufs/dice` del corte, el guion marcado `voz/<toma>.txt`, cada línea llevada a su palabra con `onsets-voz.py` + `palabras-desde.py` (tabla de `lineas-vs-onsets.py`). Un cambio de duración mueve la rejilla: **repetir `buscar-cortes-063.py`** (el hook pide ≥ 17 f de aire tras su última palabra, la mitad ≥ 24 f).
- **Otra canción:** reservarla en el registro; `buscar-entrada.py` y `medir-pista.py … --json musica/golpes-063.json`; `INICIO_MUSICA` y los `GOLPE` de `metraje-063.ts`, los niveles de `audio-063.ts` (`LUFS_TRAMO`, `PICO_TRAMO`, `LUFS_CANCION_EN_VOZ`; `lufs-rangos.py`), `DECAE` y `FIN_MUSICA_063`.
- **Otro plano de dron:** medir su movimiento ANTES (`perfil-mov.py`, `hoja-tramos.py <png> <N> <ancho> dr01:31.0:34.07 …`); los tres drones de esta pieza son DR01, DR02 y DR06 (los otros seis son de la 064 y la 065). Un plano que entra disolviendo (`c07-pasto`) pide 12 f de clip antes de su `desde`. DR06 es apaisado: su ventana 9:16 es la sexta columna de `MATERIAL` en `normalizar.mjs` (0,4 del ancho libre; `--solo dr06 --forzar` lo rehace).
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `contrast` ≤ 1,15, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella). Los planos seguidos del mismo clip llevan el mismo color (`COLOR_DR01_PASEO`). Stills antes/después: `stills-multiples.mjs` y `stills-antes.mjs`; `medir-color.py` (las caras salen de `seguir-sujeto.swift`).
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-063.ts`; las voces siguen a −15 LUFS.
- **Versión con ficha:** `Recorrido063` con `--props={"sinSubtitulos":true}` + `ficha.mjs video proyectos/063/ficha.json …` (la ficha de esta propiedad está en `proyectos/063/ficha.json`).

## Lo por confirmar

- **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto):
  - «**empieza con tres cosas**» (MD01, f672 = 22,4 s del vídeo): el reparto suponía «fíjate en tres cosas» y whisper oye «empieza con». **MEDIDO** (`medidas/formantes-empieza.txt`): tras una /e/ corta (F1 587, F2 2.497 Hz) hay un murmullo nasal de /m/ (5,29-5,37 s), un cierre de /p/ (5,39-5,41 s), un deslizamiento /je/, una /s/ (5,50-5,55 s) y una /a/; 5 arranques de sílaba (em-pie-za-con-tres); whisper oye lo mismo en 3 cortes aislados. «fíjate» no lleva nasal, ni cierre de /p/, ni sibilante. **Cambia el texto del reparto**: si el usuario, al oírlo, dice que es «fíjate», cambian el trozo `m02`, `voz/md01.txt`, el `dice` de `c06-mitad` y el `.srt`.
  - «**evitar esto**» (HK01, f279 = 9,3 s): whisper oye «hitareza», «ditarés» y «oitar eso»; es lo último del hook y suena pegado. El catálogo y la toma gemela del reparto (HK04) dicen «evitar esto». Sin cerrar al oído.
  - «**lote barato**» (HK01, f133 = 4,4 s): whisper oye «lote de barato» en 1 de 3 cortes (y «lo te barato» en otro); «lote barato» es lo gramatical y lo del catálogo.
- La canción (medida, no oída; pop-rock instrumental sin letra detectada en 140-210 s; **es una canción comercial de Hillsong United y su licencia no está verificada**).
- La imagen de Isabella: es una vertical comprimida de 607×1080 reales ampliada ×2,13; se ve más blanda que un iPhone vertical normal. No hay otra fuente.
- Por dónde se escribe («escríbeme»: mensaje directo o WhatsApp) y si el caption lleva el número de WhatsApp.
- Cómo quiere leer el usuario el lugar de la ficha («La Porquera · San Vicente Ferrer»).
