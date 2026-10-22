# Combinaciones — proyecto 058 · Apartamento en Palmazera (La Ceja), V40 («60 m² que rinden»)

Registro de esta versión y mapa de «cómo cambiar cada pieza». Es la segunda de las tres versiones de este apartamento que se montan a la vez en sesiones distintas (reparto en `proyectos/054/reparto-054-062.md`, que manda); las otras dos son la V39 (057, «que se respire paz») y la V41 (059, «el estrés no viene solo del trabajo»). La canción está reservada en `archivos/musica/registro-de-uso.md` (fila V40). Los tramos de recorrido se acordaron entre las tres sesiones en la carpeta de notas compartidas (`058-tramos-de-recorrido.md`).

## Versiones de este apartamento

| V | Proyecto | Estado | Fecha | Qué es |
|---|---|---|---|---|
| V39 | 057 | en montaje (otra sesión) | 2026-10-22 | «Que se respire paz»: HK01 · MD06 · CT02 · *Silver Skies Cinematic Piano* · DR01-DR03 |
| **V40** | **058** | **final exportada** (CRF 12 + CRF 16 + `.srt` + portada + versión con ficha; 1 palabra sin oír), con el OK del usuario a la prueba rev. 0 (`pruebas-720p/058-recorrido.mp4`) | 2026-10-22 | **«60 m² que rinden»**: DR04 (el edificio) · **HK02** · RC14 · RC01 · RC07 · **MD07** · RC19 · RC23 · DR05 (La Ceja) · **CT01** · ***Ivory Skyline Reverie*** · 1119 f · 37,3 s |
| V41 | 059 | en montaje (otra sesión) | 2026-10-22 | «El estrés no viene solo del trabajo»: HK04 · MD09 · CT03 · *Light Fills the Room* · DR07-DR10 |

## Lo que lleva (rev. 0)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Apertura | DR04 2,10-4,90 s | el edificio de ladrillo en paralelo, a velocidad constante (movimiento 4,0, dispersión 0,06); arranca desde parado, así que se salta el primer segundo |
| Hook | HK02 `IMG_8713` (voz 0,10-3,72 s) | el ángulo se plantea con otra palabra: «Este es un apartamento pensado para descansar, no para sobrevivir al caos.»; **entra A CORTE** (no deja aire: su primera sílaba suena a los 3 f) con la música ya abajo |
| Paseo (bloque 3) | RC14 0,30-3,30 · RC01 0,20-2,83 · RC07 2,60-6,23 s | cómo cabe todo: la cocina corredor (nevera, horno, fregadero, cafetera, estufa) → la barra con el microondas y la estufa → de la cocina al comedor y la sala en un solo plano |
| Mitad | MD07 `IMG_8729` (voz 0,42-4,86 s) | el ángulo, dicho: «Lo que cabe en 60 metros cuadrados en Palmazera te va a cambiar la idea del apartamento pequeño.»; «60» en cifra, acento en «60 metros cuadrados» y «apartamento pequeño.» |
| Bloque 5 | RC19 0,80-3,67 · RC23 0,00-3,03 · DR05 3,50-7,37 s | lo privado: el baño del pasillo → el vestier y el baño principal (se empalman por el vidrio de la ducha) → LA VISTA: el dron se aleja del edificio y abre La Ceja con sus montañas y nubes (el plano más largo del bloque, 3,9 s) |
| CTA | CT01 `IMG_8723` (voz 0,60-4,24 s; el plano usa 0,57-4,73 s) | una acción: «Escríbeme y te cuento por qué este lugar se siente diferente desde que entras.» |
| Canción | *Ivory Skyline Reverie* (`80bf4f33`) desde 158,067 s (`INICIO_MUSICA` = 4742/30) | el golpe de entrada de 18,2 dB (158,112 s) abre la pieza en el f3; seis cortes secos en golpes MEDIDOS (≥ 10,6 dB); **repetida de la V11/027 (One Living), en otra propiedad y autorizada por el usuario** |
| Voz | −15,0 LUFS tratada (+19,9 · +18,3 · +18,9 dB tras el compresor 3,5:1; limitador −2,5 dBFS; pico real −2,5 dBFS) | pedido permanente del canal |
| Música | −15 LUFS sola por tramos (−3,6 · −4,2 · −2,6 dB sobre el archivo); −26 LUFS bajo la voz | la canción es MUY alta (−11 a −12,5 LUFS con picos de +1,4 dBFS en la fuente) |
| Color | `COLOR_BASE` + el ajuste de cada plano | baños con la temperatura bajada (el tungsteno amarillea), CTA con la exposición subida (a contraluz) y la mitad con las sombras abiertas |

## Lo exportado (2026-10-22, tras el OK del usuario a la prueba)

| Archivo | Qué es |
|---|---|
| `finales/058-recorrido.mp4` | máster: CRF 12 `slower`, 1080×1920, 30 fps, 1119 f, 110,6 MB, BT.709 etiquetado (VUI 1/1/1 y átomo `colr`), AAC 320 kb/s |
| `finales/058-recorrido-crf16.mp4` | versión ligera: CRF 16 `slow`, 61,0 MB; la misma imagen y el mismo audio (el PCM decodificado coincide con el del máster) |
| `finales/058.srt` | 17 cues, de 2,9 a 35,1 s |
| `finales/058-portada.png` + `portada.json` | portada 9:16: el fotograma de los 29,7 s (La Ceja con sus montañas y nubes desde el aire, el más nítido de la vista), «LA CEJA» y `VENTA`; contraste del texto 6,7:1 y del isotipo 8,5:1. (Alternativa: el edificio a los 2,4 s, texto 10,4:1 e isotipo 5,4:1, en `pruebas-720p/portada-previa-edificio.png`.) |
| `finales/058-recorrido-ficha.mp4` | versión con ficha: SIN subtítulos, «APARTAMENTO EN VENTA · La Ceja · Palmazera · $ 429 M COP» en Montserrat en el tercio de abajo del 1:1, la ficha se va de 34,87 a 35,27 s, antes de la tarjeta; audio copiado del máster (el PCM coincide) |
| `caption.md` | descripción de Instagram, versión resumida |

Banderas: `--color-space=bt709 --image-format=png --gl=angle --audio-bitrate=320k`. Etiquetas de color arregladas sin pérdida en las dos (`h264_metadata` + `+write_colr`), con el `framemd5` decodificado (1119 fotogramas) y el md5 del PCM iguales antes y después. Color contra stills a escala 1 (`medir-final.py`, 9 fotogramas): máster a ≤ 0,25 niveles (baja frecuencia ≥ 51,0 dB), CRF 16 a ≤ 0,31 (≥ 49,3 dB); 0 fotogramas fuera de tolerancia (`medidas/medir-final-*.txt`). Audio (ebur128 sobre la final): voces −14,7 · −14,7 · −14,7 LUFS, pieza −15,2 LUFS, pico −1,2 dBFS (`medidas/audio-final.txt`); los golpes de la final, igual que los de la prueba (`medidas/golpes-render-final.txt`). La base de la ficha (`sinSubtitulos`, muda, CRF 6) coincide con el máster en la mitad de arriba (PSNR mínimo por fotograma 48,1 dB) y tiene los mismos 1119 fotogramas. Render: ≈ 5 min el máster, 3 min el CRF 16.

**Exportada con UNA palabra sin oír** (la puerta con `--final` falla solo por ella; la nota se queda): «**Palmazera**» (MD07, 18,2 s del vídeo, f547). **Medida con `formantes.py`** (`medidas/formantes-palmazera.txt`): la secuencia de vocales es a-a-e-a (Pal-ma-ze-ra, cuatro sílabas), la misma que transcribe whisper («Palmacera»); la diferencia entre «ce» y «ze» no es acústica (seseo), así que la ortografía «Palmazera» la fija la ficha de la web y el reparto, no el audio. Si el usuario la oye distinta: el texto del trozo `m01` en `subtitulos-058.ts` (f547), `voz/md07.txt`, el `dice` del plan, el `.srt` (`exportar-srt.mjs`) y el caption; el texto va dentro de la imagen del máster, así que se vuelve a renderizar (≈ 5 min cada final) y se repiten las etiquetas de color. La versión con ficha no lleva texto de voz y no cambia.

## La rejilla (golpes MEDIDOS de la canción, `musica/golpes-058.json`; `medir-pista.py`, 86 golpes ≥ 6 dB en los 47 s desde el 150)

La canción NO tiene pulso (`rejilla.py`: el mejor periodo, 0,265 s, alinea solo el 25 % de los golpes fuertes, con un desvío medio de 53 ms): la rejilla son los golpes medidos, y como hay uno cada ≈ 0,35-0,7 s hay libertad para cortar donde se quiera.

| Frame | Plano que entra | Cómo | Golpe (s de la canción · dB) | Suena en el render (`golpes-render.py`) |
|---|---|---|---|---|
| 3 | c01 edificio | corte (el frame 0) | 158,112 · 18,2 | (entrada de la música) |
| 84 | c02 hook | corte **sin golpe**: la música baja del f69 al f84 (tras el golpe de 14,6 dB del f66) | — | — |
| 215 | c03 cocina | corte seco | 165,163 · 15,8 | −0,5 f |
| 305 | c04 barra | corte seco | 168,183 · 17,1 | +0,1 f |
| 384 | c05 comedor | corte seco | 170,825 · 10,6 | el detector marca −4,9 f, **pero el perfil de energía del render y el de la fuente coinciden** (`medidas/golpes-render-prueba.txt`; lo mismo que el 056, aprendizajes §4) |
| 493 | c06 mitad | disolvencia **sin golpe**: la música baja del f478 al f493 (tras el golpe de 12,7 dB del f475) | — | — |
| 642 | c07 baño 1 | corte seco | 179,399 · 12,0 | −0,4 f |
| 728 | c08 vestier | corte seco | 182,279 · 14,9 | 0,0 f |
| 818 | c09 vista | corte seco | 185,293 · 12,9 | +0,4 f |
| 934 | c10 CTA | disolvencia **sin golpe**: la música baja del f922 al f934 (tras el golpe de 17,0 dB del f919) | — | — |

## Lo medido en la prueba (rev. 0)

| Qué | Medida |
|---|---|
| Voz (con la música debajo) | hook −14,7 · mitad −14,7 · CTA −14,7 LUFS; picos −4,4 · −4,9 · −4,3 dBFS |
| Música sola | apertura −15,3 · paseo −15,0 · bloque 5 −14,9 LUFS |
| Pieza | −15,2 LUFS integrado, pico −1,2 dBFS: sin saturar; LRA 2,2 LU (`medidas/audio-prueba.txt`) |
| Música bajo la voz (puerta, sobre el plan) | −26 LUFS en cada ventana: 11 LU bajo ella |
| Subtítulos | 17 líneas a −0,2…+2,0 f de su palabra sobre la voz sola (`lineas-vs-onsets.py`; `medidas/lineas-vs-onsets.txt`); dos con la palabra sin onset propio, a ±3 f: «al caos.» (hook) y «apartamento pequeño.» (mitad) |
| Legibilidad (R25, `legibilidad.py`) | con el velo del 056 (`borde` 0,68 · `medio` 0,44): contraste 3,8-10,5 : 1 al p90 y 3,0-8,1 al p99 (017: 2,9-3,7 / 2,6-3,0; 018: 2,8-4,1 / 2,3-3,5): sin tocar el velo |
| Color (stills a escala 1) | luma media por plano 110-136 (σ ≈ 8): aéreos 118-129, hook 114, cocina/barra/comedor 123-136, mitad 110, baños 124-126, CTA 94-122 (el iPhone sube la exposición durante la toma); quemado 0 %; aplastado ≤ 8 % salvo CTA y mitad al inicio |
| Saltos entre planos | ninguna medición de luma por empalme esta vez (no se hizo `medir-color.py` completo); el aéreo → pasillo del hook es el salto más visible (cielo azul y luz plena a un pasillo de luz cálida) |
| Cierre | tarjeta de 2,0 s con el logo y la web; negro exacto en el f1058 (la puerta) |

## Metraje compartido con las otras versiones del apartamento (declarado)

- **Con la 057 (V39) y con la 059 (V41):** ni un segundo (puerta §7b, 2026-10-22, con sus planos actuales; ver la nota compartida). RC26 (el clóset de la alcoba 2) me lo cedió la 059 y esta pieza no lo usa; RC18 (el pasillo del gato) es de la 057.
- **Un parecido, no una repetición:** RC07 (2,6-6,2 s) y el RC10 de la 059 (1,6-4,5 s) enseñan el mismo comedor redondo y la sala, desde clips distintos.
- Hook, mitad, CTA, aéreos (DR04/DR05) y canción son exclusivos de esta pieza dentro del apartamento (reparto).

## Cómo cambiar cada pieza

- **Otro hook / mitad / CTA** (libres que quedan: HK03 `IMG_8714`, la gemela de HK02, con el mismo arranque a 0,12 s; para la mitad `IMG_8732` = MD07b, ya normalizada; el CTA no tiene repuesto): su fila ya está en `MATERIAL` de `normalizar.mjs` (hk03, md07b) pero sin voz tratada: añade su ventana a `VENTANA_VOZ` (mira la envolvente con `envolvente-voz.py` antes de fiarte de `limites-voz.py`) y la ganancia con `herramientas/probar-voz.py --umbral 0.0316 --razon 3.5` (editar su `TOMAS`) → `GANANCIA_VOZ_DB`. Luego `voz.s0/s1/lufs/dice` del corte, el guion marcado `voz/<toma>.txt`, `trozos-editoriales.mjs`, cada línea llevada a su palabra con `onsets-voz.py` + `silabas.py` y la tabla de `lineas-vs-onsets.py`. Un cambio de duración mueve la rejilla: **el hook que no deja aire pide la música ya baja en el corte**, y el que sí lo deja puede disolver en un golpe (056).
- **Otra canción:** reservarla en el registro; `buscar-entrada.py --cta 29 34` y `medir-pista.py … --json musica/golpes-058.json`; `INICIO_MUSICA`, los `GOLPE` de `metraje-058.ts`, los niveles de `audio-058.ts` (`LUFS_TRAMO`, `PICO_TRAMO`, `LUFS_CANCION_EN_VOZ`; `lufs-rangos.py`), `FIN_MUSICA_058` y, si la canción cae sola, vuelve la comprobación de `DECAE` de la puerta del 056.
- **Otro plano de recorrido:** mira la hoja de contactos de los 28 (`proyectos/057/catalogo/hoja-recorridos.png`) y el movimiento (`ventana-fina.py` / `flujo.py`) antes; los 28 están ya normalizados en `remotion/public/recorrido-058/`. Un plano que entra disolviendo pide 12 f de clip antes de su `desde`. Mira antes las notas de las otras dos versiones.
- **Otro plano de aéreo:** DR06 (`dr06.mp4`) está normalizado y sin usar (ascenso lento por la fachada, luego casi quieto sobre el horizonte).
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `contrast` ≤ 1,15, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella). Stills: `stills-multiples.mjs Recorrido058 1 <carpeta> <frames> angle`.
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-058.ts`; las voces siguen a −15 LUFS.
- **Versión con ficha:** `Recorrido058` con `--props={"sinSubtitulos":true}` + `ficha.mjs video proyectos/058/ficha.json …` (la ficha está en `proyectos/058/ficha.json`).

## Lo por confirmar

- **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto):
  - «**Palmazera**» (MD07, f547 = 18,2 s del vídeo): whisper oye «Palmacera» (confianza 0,29). Es el nombre de la ficha de la web y del reparto; lo que queda por oír es cómo lo dice ella (en Colombia c y z suenan igual, así que el audio no decide la ortografía: manda la ficha).
- Las líneas «al caos.» (f181) y «apartamento pequeño.» (f599) entran a ±3 f de su palabra (sin onset propio): se miran en la prueba.
- La canción (medida, no oída; repetida de la V11; licencia sin verificar).
- El salto del aéreo al pasillo del hook (a corte, sin golpe, con la música abajo) y la tercera línea de la mitad («la idea del», f584), la más dudosa en tiempo.
- Por dónde se escribe («escríbeme»: mensaje directo o WhatsApp) y si el caption lleva el número de WhatsApp.
- La locación de la portada: se exportó **LA CEJA** (como la Casa Los Bravos); si el usuario prefiere **PALMAZERA** (el sector de la ficha) basta `portada.py portada --proyecto 058 --locacion "PALMAZERA"` (la receta está en `portada.json`).
