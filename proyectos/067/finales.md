# La final del 067 — qué es cada archivo y qué se midió

> **Copiado al SSD el 2026-10-24** (18 archivos, sha256 verificado uno a uno; los originales siguen en `proyectos/067/finales/`): `/Volumes/SSK SSD/Work/Propiedades Luxur/Lote - San Cristobal/Videos Social Media/` — el máster, la ligera, la versión con ficha, el `.srt` y `067-caption.md` junto a cada reel, y la portada en `Portadas/067-portada.png`. Receta: `proyectos/066/herramientas/copiar-al-ssd.sh`.

El montaje vive en el repo; **los archivos entregados, no**: pesan y el repo no los lleva (`proyectos/*/finales/` está en el `.gitignore`). Exportados el 2026-10-24 tras el OK del usuario a la prueba; **siguen en `proyectos/067/finales/`: no se han copiado al SSD** (el destino aún no está decidido).

Propiedad: **Lote campestre de 5.170 m² en EOLIA Condominio, San Cristóbal, Medellín (COP 797 M, venta)** · V49 · «Este no es para ti».

| Archivo | Tamaño | Qué es |
|---|---|---|
| `067-recorrido.mp4` | 200,5 MB | el máster, CRF 12 `slower` (1080×1920, 30 fps, 1148 f = 38,27 s, AAC 320 kbps) |
| `067-recorrido-crf16.mp4` | 114,4 MB | la versión ligera, CRF 16 `slow` (misma imagen y mismo audio) |
| `067-recorrido-ficha.mp4` | 204,5 MB | la versión con ficha (`ficha-luxur`): sin subtítulos, «LOTE CAMPESTRE EN VENTA · San Cristóbal · EOLIA · $ 797 M COP» abajo del 1:1 hasta la tarjeta; el audio es el del máster copiado tal cual |
| `067-portada.png` | 3,3 MB | la portada 9:16 (`portada-luxur`): «SAN CRISTÓBAL» · «VENTA» sobre el fotograma de 23,40 s |
| `067.srt` | 0,8 KB | los subtítulos para la pista de captions (17 cues, 3,30 → 36,23 s), de `subtitulos-067.ts` |
| `../caption.md` | — | el caption de Instagram (definitivo; DM / WhatsApp +57 304 667 0026) |

## Cómo se hizo

- **Máster y ligera** (`recorrido-luxur/montaje.md` §12), desde `remotion/` y un render a la vez: `npx remotion render src/index.ts Recorrido067 … --crf=12 --x264-preset=slower` y `--crf=16 --x264-preset=slow`, las dos con `--audio-bitrate=320k --color-space=bt709 --image-format=png --gl=angle`. Con `color` por plano (R32), el render lleva `--gl=angle`.
- **Etiquetas de color arregladas SIN pérdida** en los tres vídeos: el render sale con VUI `2/2/1` y sin `colr`; `ffmpeg -c copy -bsf:v h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1 -color_primaries bt709 -color_trc bt709 -colorspace bt709 -color_range tv -movflags +write_colr+faststart`. Después: `color_primaries=color_trc=bt709`, `color_space=bt709`, rango `tv`.
- **La ficha**: base muda `--props='{"sinSubtitulos":true}' --muted --crf=6 --x264-preset=fast --color-space=bt709 --image-format=png --gl=angle` (438,8 MB, borrada) + `ficha.mjs video lote-san-cristobal <base> --audio finales/067-recorrido.mp4` (`.claude/skills/ficha-luxur/propiedades/lote-san-cristobal.json`, del coordinador, sin tocar).

## Lo que se midió

| | Resultado |
|---|---|
| Etiquetas: imagen decodificada antes/después | `framemd5` DECODIFICADO idéntico en los tres (máster `c29fbdd4…` · ligera `7fb41b57…` · ficha `e9687890…`), 1148 fotogramas cada uno |
| Etiquetas: audio antes/después | md5 del PCM idéntico: `1cbc2038…` en el máster, la ligera, la ficha y antes de arreglar (la ficha lleva el audio del máster tal cual) |
| Color de la final contra stills a escala 1 (`medir-final.py`, 11 fotogramas: 0, 48, 165, 273, 355, 429, 568, 715, 797, 893, 1020) | **máster**: PSNR bruto medio 42,10 dB (mín 39,28), baja frecuencia medio 51,08 dB (mín 48,38), |Δ color medio| ≤ 0,58 niveles · **ligera**: 39,61 dB (mín 35,95), baja frecuencia 48,74 dB (mín 45,01), |Δ| ≤ 1,07; **0 fotogramas fuera** de [≤ 1,5 niveles · ≥ 40 dB de baja frecuencia · ≥ 30 dB bruto] |
| Base muda contra el máster | mismos 1148 fotogramas; mitad de arriba (sin subtítulos): PSNR medio 47,19 dB, mínimo 42,33 dB (f450); ningún fotograma bajo 35 dB |
| Ficha | 1148 fotogramas, 38,27 s de imagen y 38,31 s de audio (como el máster); la ficha entra en el 0,5 s, **se va de 35,83 a 36,23 s** y la tarjeta oscura (36,23 s) sale sin ficha; el texto cabe a su tamaño sin reducir (el script no avisó); ni un subtítulo (`pruebas-720p/hoja-ficha.jpg`) |
| Portada | fotograma de **23,40 s** (DR06, c07: cipreses, camino en curva y la ciudad detrás; el más nítido del tramo 22,8-24,9 s: 1529 frente a 1225-1423; 0,93 s de margen con el corte del f674); contraste del texto **8,4:1**, del isotipo **6,8:1**; receta en `portada.json`; la imagen entera mirada: sin Isabella ni subtítulos; hay un coche blanco y una persona diminutos en el camino |
| Puerta | `node proyectos/067/revisar-067.mjs`: verde. Con `--final` falla **solo** por los dos «POR CONFIRMAR AL OÍDO» (a propósito: SKILL.md §7c) |

## Palabras exportadas SIN OÍR (con su segundo del vídeo y cómo cambiarlas)

1. **«fase»** (MD01; f525 = **17,50 s** del vídeo; cue 9 del `.srt`, 17,500 → 18,867 s). Se pintó lo medido («primera fase»: whisper «fa» con 0,98 y sin /r/ en la envolvente); si es «frase»: el texto del trozo `desde: 525` del bloque `m01` de `subtitulos-067.ts`, la línea 2 de `voz/mitad.txt`, el `dice` de `c06-mitad` en `metraje-067.ts` y el cue 9 de `067.srt`; ≈ 6 min (un render CRF 12 + CRF 16, la base muda y la ficha de nuevo).
2. **«comprador»** (MD01; f497 = **16,57 s**; cue 8, 16,567 → 17,500 s): se pintó «comprador» (un trozo aislado de 1,3-2,4 s da «comprador serio»; la toma entera, «compreador»). Mismos sitios: el trozo `desde: 497` de `m01`, `voz/mitad.txt` (línea 2: la primera de la mitad) y el `dice`.

La cifra **«5.000 metros»** (f952 = 31,73 s, cue 13) la dice Isabella y se escribe tal cual: decisión del usuario. El caption lleva los 5.170 m² de la ficha.

## Si hay que volver a renderizar

El material normalizado está en `remotion/public/recorrido-067/` (801 MB) y los originales en `proyectos/067/original/` (2,5 GB: los tres MOV de Isabella, RC02, RC03, DR03, DR06, DR04 y la canción): **no se han borrado** por si el usuario pide cambios. Se repone con `node proyectos/067/normalizar.mjs`.
