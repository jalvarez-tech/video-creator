# La final del 068 (V50 · Lote en San Cristóbal, EOLIA Condominio · «El verdadero estatus es la privacidad»)

> **Copiado al SSD el 2026-10-24** (18 archivos, sha256 verificado uno a uno; los originales siguen en `proyectos/068/finales/`): `/Volumes/SSK SSD/Work/Propiedades Luxur/Lote - San Cristobal/Videos Social Media/` — el máster, la ligera, la versión con ficha, el `.srt` y `068-caption.md` junto a cada reel, y la portada en `Portadas/068-portada.png`. Receta: `proyectos/066/herramientas/copiar-al-ssd.sh`.

Exportada el **2026-10-24**, tras el OK del usuario a la prueba rev. 1 (`pruebas-720p/068-recorrido.mp4`). Los archivos están en `proyectos/068/finales/` (el repo no los lleva: `proyectos/*/finales/` está en el `.gitignore`). **Aún no se han copiado al SSD** (el destino no está decidido; lo dirá el usuario o la sesión madre). Sin commit ni push.

| Archivo | Tamaño | Qué es |
|---|---|---|
| `068-recorrido.mp4` | 179,8 MB | el máster: CRF 12 `slower`, 1080×1920, 30 fps, 1113 f (37,10 s), H.264 High yuv420p BT.709 + AAC 320 kb/s |
| `068-recorrido-crf16.mp4` | 102,9 MB | la versión ligera: CRF 16 `slow`, la misma imagen y el mismo audio |
| `068-recorrido-ficha.mp4` | 182,5 MB | la versión con ficha: sin subtítulos, «LOTE CAMPESTRE EN VENTA · San Cristóbal · EOLIA · $ 797 M COP» abajo del 1:1 hasta la tarjeta oscura; el audio es el flujo AAC del máster copiado tal cual |
| `068-portada.png` | 2,8 MB | la portada 9:16 (`SAN CRISTÓBAL` · `VENTA`), del fotograma de los 8,9 s (el aéreo cenital: la curva del camino entre los cipreses) |
| `068.srt` | 1 KB | los subtítulos (20 cues, de 2,77 s a 34,87 s) para la pista de captions de la plataforma |
| `../caption.md` | — | el caption de Instagram (definitivo) |

Propiedad: **Lote campestre en EOLIA Condominio, San Cristóbal, Medellín (COP 797 M, venta, 5.170 m²)**. Canción: *Heaven on Earth* (repetida de otras propiedades, declarado en el registro de uso, fila V50).

## Qué se midió (lo guardado está en `proyectos/068/medidas/`)

- **Etiquetas de color** (`etiquetas-*.txt`): el render de Remotion sale con transferencia y primarias «unknown» y sin átomo `colr` (R22). Se arreglaron SIN pérdida (`h264_metadata` + `+write_colr`, un archivo aparte que sustituye al original solo si lo decodificado es igual) en los TRES vídeos: ahora `tv, bt709, bt709, bt709` con `colr`. **`framemd5` decodificado y md5 del PCM, idénticos antes y después en los tres** (1113 fotogramas cada uno; máster `a400eee0…`, CRF 16 `2cbdd513…`, ficha `a5cf6d2e…`). El audio es el MISMO en los tres: md5 del PCM `9cfca826…` (y del flujo AAC copiado, `fc86c39c…`, en el máster y la ficha).
- **Color contra stills a escala 1** (`medir-final-*.txt`, `medir-final.py`, 11 fotogramas): máster, |Δ color medio| ≤ 0,50 niveles, PSNR bruto medio 44,0 dB (mín. 38,9) y de baja frecuencia medio 53,7 dB (mín. 48,7); CRF 16, |Δ| ≤ 0,61, bruto 42,1 dB (mín. 37,2), baja frecuencia 51,7 dB (mín. 47,6). 0 fotogramas fuera de límites en los dos.
- **Audio** (`ebur128`): −15,0 LUFS integrados, LRA 3,7 LU, pico −2,0 dBFS, en el máster y en el CRF 16 (la ficha copia el del máster). Los seis cortes secos de recorrido caen a −0,4…+0,4 f de su golpe sobre el audio del máster (`golpes-render-final.txt`).
- **Versión con ficha** (`base-vs-final.txt`, `ficha.txt`): la base muda (`--props={"sinSubtitulos":true} --muted --crf=6`, 393,7 MB, ya borrada) tiene los mismos 1113 fotogramas que la final y su mitad de arriba es casi idéntica (PSNR medio 49,5 dB, mínimo 42,4; ninguno < 30). Con la ficha puesta, los 1113 fotogramas y la franja de arriba (y 0-1100) contra el máster dan 46,7 dB de media (mínimo 40,1). La ficha entra con un fundido de 0,5 s desde el f0 y se va entre los 34,67 y los 35,07 s, justo antes de la tarjeta oscura (35,07 s); el texto cabe (el script no baja la letra) y no hay ningún subtítulo en la hoja de contactos (`pruebas-720p/hoja-ficha.jpg`).
- **Portada** (`portada.json`): fotograma de los **8,9 s** (plano `c03-camino`, DR06 a los ≈ 87,4 s del clip: el aéreo cenital con la curva del camino de tierra entre los cipreses y la carretera abajo; el más nítido del tramo 8,0-10,0 s, sin Isabella, subtítulos ni tarjeta). Contraste del texto **6,7:1** y del isotipo **6,4:1**. Se eligió para que las tres portadas del lote sean planos distintos (la de la 066 es la vista con la ciudad; la de la 067, el camino en curva con la ciudad detrás). La primera candidata, la vista de los 27,0 s (ciudad, bosque, camino y cipreses; 14,8:1 / 6,8:1), queda como alternativa en `pruebas-720p/068-portada-alt-vista-27s.png`.

## Palabras exportadas SIN OÍR (POR CONFIRMAR AL OÍDO; la nota se queda y la puerta `--final` falla por ellas)

| Palabra | Dónde | Qué se pinta | Qué se midió |
|---|---|---|---|
| **«bosque»** | CT01, el trozo «Tu bosque privado» entra en el **f893 (29,77 s)**; la palabra suena en ≈ f903 (30,1 s) | «Tu bosque privado» | whisper: «Tu voz que privado»; en trozos aislados, «Tu bosque privado» ×2; hay una /s/ clara a los 0,84-0,88 s del clip que «refugio» (la hipótesis del catálogo) no tendría; 6 sílabas en 0,92 s (6,5/s, su ritmo) |
| **«y agendemos»** | CT01, el trozo entra en el **f1005 (33,50 s)**; «agendemos» suena en ≈ f1010 (33,7 s) | «y agendemos» | whisper: «hajandemos», «ya andemos», «hagan de»; 5 sílabas en 0,5 s y una /s/ final clara a los 4,86 s del clip |
| **«que» de «sin nadie que te apure»** | MD02, «y sin nadie» entra en el **f608 (20,27 s)** y «que te apure.» en el **f622 (20,73 s)**; «que» suena en ≈ f623 (20,8 s) | «que te apure.» | whisper: confianza 0,31 («nadie») y 0,53 («que»); en trozos aislados «…se te apure», «…ayer que te apure» |

**«a solo 20 minutos de Medellín»** (CT01, el trozo entra en el f925, 30,83 s): decisión del usuario, se queda tal cual la dice Isabella. La ficha de la web NO da esa cifra («a pocos minutos de Medellín»): el caption no la lleva.

**Cómo cambiar una palabra** (el texto del subtítulo y nada más: el audio no cambia, así que la versión con ficha NO se rehace):
1. `remotion/src/proyectos/068/subtitulos-068.ts`: el `texto` del trozo (bloque `c01`/`c02` del CTA, `m03`/`m04` de la mitad) y, si cambia de largo, su `desde`. Los frames de arriba son los de ese archivo.
2. `proyectos/068/voz/cta.txt` (o `mitad.txt`) y, en `metraje-068.ts`, el `dice` del plano `c10-cta` (o `c06-mitad`).
3. `node proyectos/068/revisar-068.mjs` y `npm --prefix remotion run lint`.
4. Rehacer el máster y el CRF 16 (≈ 4 + 5 min, los mismos comandos de `montaje.md` §12 desde `remotion/`), `proyectos/068/herramientas/arregla-etiquetas.sh <archivo>` en cada uno y el `.srt` con `node manuales/edicion-video/scripts/exportar-srt.mjs remotion/src/proyectos/068/subtitulos-068.ts proyectos/068/finales/068.srt`. La portada no cambia (no lleva texto del vídeo).

## Para volver a renderizar

El material **sigue en su sitio** por si el usuario pide cambios: `remotion/public/recorrido-068/` (2,2 GB, normalizado) y `proyectos/068/original/` (3,7 GB, copiado del SSD con el CÓDIGO como nombre). Si hace falta liberar disco se repone con `node proyectos/068/normalizar.mjs` desde `/Volumes/SSK SSD/Work/Propiedades Luxur/Lote - San Cristobal/Videos/videos/` (la columna «origen» de `MATERIAL` dice qué archivo es cada uno y sus sha256 se comprueban antes de codificar).
