# Combinaciones — proyecto 063 · Lote en San Vicente Ferrer (vereda La Porquera), V45 («El error») — rev. 1

Registro de esta versión y mapa de «cómo cambiar cada pieza». Es la primera de las tres versiones de este lote que se montan a la vez en sesiones distintas (reparto rev. 2 en `proyectos/063/reparto-063-065.md`, que manda); las otras dos son la V46 (064, «No hace falta irse lejos») y la V47 (065, «15 minutos de la autopista»). La canción está reservada en `archivos/musica/registro-de-uso.md` (fila V45). Catálogo del rodaje: `catalogo/catalogo-material.md`.

## Versiones de esta propiedad

| V | Proyecto | Estado | Fecha | Qué es |
|---|---|---|---|---|
| **V45** | **063** | **FINAL exportada 2026-11-03** en `proyectos/063/finales/` (`063-recorrido.mp4` CRF 12 · `063-recorrido-crf16.mp4` · `063.srt` · `063-portada.png` · `063-recorrido-ficha.mp4`; la sesión madre las mueve al SSD): montada **tal cual la prueba rev. 1 aprobada** (misma imagen, mismos cortes, misma infografía); **un solo cambio en el audio**: las ventanas de voz de HK01 y MD01 se alargaron 0,26 y 0,18 s para no cortar la última sílaba de «esto» y de «mesa» (ver `aprendizajes.md`, punto 17). **La rev. 0** (tres tramos de dron entre el hook y la mitad, 46,7 s) se descartó el 2026-10-22 por el cambio de planteamiento del usuario: queda en `rev0/` y como `pruebas-720p/063-recorrido-rev0.mp4`; **no se exporta** | | 2026-10-22 | **«El error»**: DR02 (apertura) · **HK01 entera** · DR02 + **infografía «Lo que sí tiene»** · **MD01 entera** con los rótulos **UBICACIÓN · AGUA · ESCRITURAS** · DR02 → DR01 → DR01 (la vista) · **CT02** · ***Oceans (Where Feet May Fail)*** · 1347 f · 44,9 s |
| V46 | 064 | en montaje (otra sesión) | 2026-10-22 | «No hace falta irse lejos»: Hook2 · Hook5 · CT03 · DR03 + DR01 24-48 s · *Cornfield Chase* |
| V47 | 065 | en montaje (otra sesión) | 2026-10-22 | «15 minutos de la autopista»: Hook3 · CT05 (de mitad) · CT01 · DR04 + DR01 48-73,5 s · *deadmau5 - Strobe* |

## Lo exportado (2026-11-03)

| Archivo | Qué es |
|---|---|
| `finales/063-recorrido.mp4` | máster CRF 12 `slower`, 1080×1920, 30 fps, 1347 f (44,9 s), BT.709 marcado, AAC 320 kb/s |
| `finales/063-recorrido-crf16.mp4` | la misma imagen en CRF 16 `slow` (versión ligera; mismo fotograma a fotograma que el máster) |
| `finales/063.srt` | 24 líneas, sacado de `subtitulos-063.ts` |
| `finales/063-portada.png` | portada 9:16 (`portada.json`: SAN VICENTE FERRER · VENTA, fotograma a los 35,3 s) |
| `finales/063-recorrido-ficha.mp4` | sin subtítulos, con la ficha «LOTE EN VENTA · La Porquera · San Vicente Ferrer · $ 350 M COP» en el 1:1; la banda **sale con la infografía y los rótulos** (f305-317 → f832-844) y antes de la tarjeta (f1274-1286); audio copiado del máster |

Los tres vídeos llevan el MISMO audio (md5 del PCM `a6fa716f…`) y los mismos 1347 f; medidas en `medidas/finales-exportados.txt` y `medidas/audio-final.txt` (−15,0 LUFS, LRA 1,7, pico −1,9 dBFS; golpes de plano a −0,5…+0,4 f). PSNR contra la prueba aprobada (a 540×960): Y 40,6 dB, U 45,2-45,9, V 48,3-48,6: ningún desvío de color. El audio se monta aparte (WAV → `adelay=42` → AAC 320k → mux con `-c copy`) para compensar los ≈ 43 ms de retraso del AAC de Remotion.

**Diferencia con la prueba aprobada (declarada):** solo el final de dos voces. La prueba recortaba las sílabas finales de «esto» (HK01, ahora la ventana acaba a 9,58 s en vez de 9,32) y de «mesa» (MD01, 11,52 s en vez de 11,34); no se movió ni un fotograma.

## Lo que lleva (rev. 1)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Apertura | DR02 16,50-19,53 s (91 f) | el cenital sobre el pasto y las cercas vivas en «V», que al final enseña la franja amarilla del cultivo vecino; sin texto ni voz |
| Hook | HK01 `Hook1.mp4` **entera** (voz 2,89-9,58 s; `desde` 75 f) | la afirmación y su invitación son UNA toma (pausa de 0,6 s entre «legales» y «Ven»): no se corta. Entra disolviendo y su primera palabra suena a los 11,7 f del golpe |
| Dron + infografía | DR02 0,00-7,73 s (232 f), a corte desde Isabella | el cenital casi quieto (movimiento ≈ 1,2): el fondo más tranquilo del clip para leer encima; **«Lo que sí tiene»**: ✔ Derecho de acueducto · ✔ Escrituras al 100 % · ✔ 3.244 m² (de la ficha), cada uno en un golpe medido |
| Mitad | MD01 `Medio3.mp4` **entera** (voz 3,61-11,52 s; `desde` 96 f) | «Antes de enamorarte de un lote, **empieza con** tres cosas: ubicación, agua y escrituras. Y este lote empieza con todas esas cosas sobre la mesa.» (el reparto suponía «fíjate en»; medido, ver abajo), con los rótulos UBICACIÓN · AGUA · ESCRITURAS a la palabra |
| Bloque 5 | DR02 22,00-25,17 · DR01 14,00-16,73 · DR01 20,20-23,93 s | lo que rodea (el pasto se levanta y enseña el cultivo vecino) → el árbol y la cerca viva con el horizonte → la vista más abierta del tramo (112 f, el plano más largo del bloque) |
| CTA | CT02 `cta2.mp4` (voz 4,03-8,82 s; `desde` 109 f; el plano usa 3,63-9,30 s) | una acción: «escríbeme»; el CTA entra en el último golpe fuerte antes de la caída de la canción |
| Canción | *Oceans (Where Feet May Fail)* (`f6cebfbd`) desde 144,667 s (`INICIO_MUSICA` = 4340/30) | pulso de 132 BPM, cae a un lecho suave a los 182,3 s; medida, no oída |
| Voz | −15 LUFS tratada (hk01 +18,4 · md01 +19,3 · ct02 +18,3 dB tras el compresor 3,5:1; limitador −2,5 dBFS) | pedido permanente del canal |
| Música | −15 LUFS sola por tramos (−1,8 · −3,2 · −3,1 dB; el lecho +4,2 dB); −26 LUFS bajo la voz; partida en tramos consecutivos (ffmpeg) | ver `aprendizajes.md` |
| Color | `COLOR_BASE` + el ajuste de cada plano (medido); los tres planos de DR02 llevan el mismo (`COLOR_DR02`, saturación 1,0) y los dos de DR01, seguidos, el mismo (`COLOR_DR01`) | ver abajo |
| **Infografía** | `Infografia063.tsx` + `infografia-063.ts` | encargo del usuario del 2026-10-22: solo datos de la ficha, **sin animar** (cada elemento entra completo con un fundido de 8 f, uno a uno, en un golpe medido), velo en degradado (42 % en los bordes, 68 % detrás de la lista) para que el dron se vea; el catálogo de `motion-graphics` (`lista`, `check`) se miró y no encaja (su `lista` entra con un muelle y un «pop», y las cifras no se animan) |

## Lo medido en la prueba (rev. 1)

| Qué | Medida |
|---|---|
| Cortes sobre el golpe (`golpes-render.py` sobre el AAC de la prueba, `medidas/golpes-render.txt`) | los 7 golpes de plano a −0,5…+0,3 f de su frame previsto: f91 (11,7 dB) · f323 (13,3) · f555 (12,4) · f828 (9,1) · f923 (11,5) · f1005 (14,5) · f1117 (11,9); los tres ✔: f364 (9,2) · f418 (10,5) · f459 (14,0); el de entrada, desde el silencio, en el f0 |
| Pieza | −15,0 LUFS integrado, LRA 1,7 LU, pico −1,9 dBFS (`medidas/audio-prueba.txt`) |
| Por tramos (ebur128 sobre la prueba) | música sola: −15,1 (apertura) · −15,0 (infografía) · −15,0 (bloque 5) · voz con música debajo: −15,0 (hook) · −14,7 (mitad) · −15,0 (CTA); picos −4,5 a −1,9 dBFS |
| Subtítulos | 24 líneas a +0,5…+1,4 f de su palabra sobre la voz sola (`lineas-vs-onsets.py`); sobre el render, con música, el detector da mediana +2,2 f y valores dispersos en las sílabas suaves (`medidas/subs-vs-voz.txt`; lo que ya avisa R31) |
| Legibilidad de la infografía (`legibilidad-infografia.py`, `medidas/legibilidad-infografia.txt`) | **lista**: blanco 10,0-11,2 : 1 y oro 4,4-5,0 : 1 sobre el peor 5 % del fondo · **rótulos de la mitad**: blanco 5,7-7,8 : 1 en reposo (3,1 : 1 en el frame en que `ESCRITURAS` entra sobre una mano abierta) |
| Color (`medir-color.py`) | luma entre planos de dron 114-122 (Isabella 141-152) · saturación de DR02 0,66-0,69 y de DR01 0,56 · piel: tono 10,8° (HK01), 12,5° (MD01), 14,1° (CT02) · el corte hook → dron cae −22 de luma (el contenido: Isabella con cielo claro → dron sobre pasto) |
| Cierre | tarjeta de 2,0 s con el logo y la web; negro exacto en el f1286 (la puerta) |

## Cómo cambiar cada pieza

- **Otro hook / mitad / CTA** (libres: CT04 `cta4`, CT06 `cta5 (2)`, CT07 `cta6`, y la parte B de `Hook5`; el resto es de la 064 y la 065): añade su fila a `MATERIAL` de `normalizar.mjs` (con su sha) y su ventana a `VENTANA_VOZ` (suelo de ruido de estas tomas: −72 a −77 dB, `limites-voz.py --margen 40` es fiable; mira la envolvente con `envolvente-voz.py` igualmente), la ganancia con `herramientas/probar-voz.py --umbral 0.0316 --razon 3.5` (editar su `TOMAS`) → `GANANCIA_VOZ_DB`. Luego `voz.s0/s1/lufs/dice` del corte, el guion marcado `voz/<toma>.txt`, cada línea llevada a su palabra con `onsets-voz.py` + `palabras-desde.py` (tabla de `lineas-vs-onsets.py`). Un cambio de duración mueve la rejilla: **repetir `buscar-cortes-063.py`** (el hook pide ≥ 17 f de aire tras su última palabra, la mitad ≥ 24 f) y los tiempos de `infografia-063.ts`.
- **La infografía:** los textos y los tiempos están en `infografia-063.ts` (`ITEMS`, `TITULO`, `GOLPES_INFO`, `TRIADA_F`); un ✔ más pide otro golpe medido (≥ 9 dB, ≥ 1,2 s del anterior) y que la lista siga entera ≥ 2 s antes de irse. El título y los ✔ van en las letras del canal (`letraSubtitulosDe(LUXUR)`); la puerta (2g) mide que cada texto cabe.
- **Cortar el hook en «cómo»** (la imagen salta al dron y «evitar esto» queda en voz sobre él): el plano `c02-hook` acabaría ≈ 4 f después de «cómo» (8,72 s del clip) y `c03-info` empezaría ahí con la voz sonando; la música tendría que seguir bajo la voz y ese corte caería sin golpe audible. No se hizo (ver `artefactos/01-plan.md`).
- **Otra canción:** reservarla en el registro; `buscar-entrada.py` y `medir-pista.py … --json musica/golpes-063.json`; `INICIO_MUSICA` y los `GOLPE` de `metraje-063.ts`, los niveles de `audio-063.ts` (`LUFS_TRAMO`, `PICO_TRAMO`, `LUFS_CANCION_EN_VOZ`; `lufs-rangos.py`), `DECAE`, `FIN_MUSICA_063` y los `GOLPES_INFO`.
- **Otro plano de dron:** medir su movimiento ANTES (`perfil-mov.py`, `hoja-tramos.py <png> <N> <ancho> dr02:0.0:7.73 …`); los dos drones de esta pieza son DR02 (entero) y DR01 **solo de 0 a 24 s** (la puerta lo comprueba). Un plano que entra disolviendo (`c05-rodea`) pide 12 f de clip antes de su `desde`.
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `contrast` ≤ 1,15, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella). Los planos seguidos del mismo clip llevan el mismo color. Stills: `stills-multiples.mjs` (con `ENTRADA=proyectos/063/entrada-063.tsx` si el estudio está roto por un plano ajeno); `medir-color.py` (las caras salen de `seguir-sujeto.swift`).
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-063.ts`; las voces siguen a −15 LUFS.
- **Versión con ficha:** `Recorrido063` con `--props={"sinSubtitulos":true}` + `herramientas/ficha-oculta.mjs <base> --audio <final>` (la banda sale mientras haya infografía y rótulos y vuelve después; la ficha de esta propiedad está en `proyectos/063/ficha.json`).

## Lo por confirmar

- **Oír** (POR CONFIRMAR AL OÍDO; exportado igualmente por encargo, con estas tres declaradas; la puerta con `--final` falla solo por esto):
  - «**empieza con tres cosas**» (MD01, f616 = 20,5 s del vídeo): el reparto suponía «fíjate en tres cosas» y whisper oye «empieza con». **MEDIDO** (`medidas/formantes-empieza.txt`): tras una /e/ corta (F1 587, F2 2.497 Hz) hay un murmullo nasal de /m/ (5,29-5,37 s), un cierre de /p/ (5,39-5,41 s), un deslizamiento /je/, una /s/ (5,50-5,55 s) y una /a/; 5 arranques de sílaba (em-pie-za-con-tres); whisper oye lo mismo en 3 cortes aislados. «fíjate» no lleva nasal, ni cierre de /p/, ni sibilante. **Cambia el texto del reparto**: si el usuario, al oírlo, dice que es «fíjate», cambian el trozo `m02`, `voz/md01.txt`, el `dice` de `c04-mitad` y el `.srt`.
  - «**evitar esto**» (HK01, f277 = 9,2 s): whisper oye «hitareza», «ditarés» y «oitar eso»; es lo último del hook y suena pegado. El catálogo dice «evitar esto». **MEDIDO** (`medidas/formantes-evitar-lote.txt`): /b/ labial (F2 ≈ 700 Hz, 8,995-9,035 s), cierre de /t/ (9,055-9,095), /a/ (F1 ≈ 720, F2 ≈ 1.850), /e/ (F1 ≈ 520, F2 ≈ 2.300), /s/ y explosión + /o/ a 9,48-9,56 s («esto»). Sin oír.
  - «**lote barato**» (HK01, f132 = 4,4 s): whisper oye «lote de barato» en 1 de 3 cortes (y «lo te barato» en otro); «lote barato» es lo gramatical y lo del catálogo.
- La canción (medida, no oída; pop-rock instrumental sin letra detectada en 140-210 s; **es una canción comercial de Hillsong United y su licencia no está verificada**).
- La imagen de Isabella: es una vertical comprimida de 607×1080 reales ampliada ×2,13; se ve más blanda que un iPhone vertical normal. No hay otra fuente.
- **Los dos últimos planos de DR01 se parecen** (el mismo paisaje a 14 y a 20 s: el tramo 0-24 s no tiene panorama con el valle).
- La fila de rótulos de la mitad: una mano abierta llega a rozarla 2-3 frames (f704-f710) y `ESCRITURAS` entra sobre ella; y va encima de los subtítulos, que son del mismo tamaño aproximado.
- Por dónde se escribe («escríbeme»: mensaje directo o WhatsApp) y si el caption lleva el número de WhatsApp.
- Cómo quiere leer el usuario el lugar de la ficha («La Porquera · San Vicente Ferrer»).
