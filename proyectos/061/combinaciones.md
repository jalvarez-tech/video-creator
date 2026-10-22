# Combinaciones — proyecto 061 · Apartaestudio Quadrato (Laureles, Medellín), V43 («Pocos permiten rentas cortas»)

Registro de esta versión y mapa de «cómo cambiar cada pieza». Es la segunda de las tres versiones de este apartaestudio que se montan a la vez en sesiones distintas (reparto en `proyectos/054/reparto-054-062.md`, que manda); las otras dos son la V42 (060, «Tu plata en el banco pierde valor») y la V44 (062, «Medellín, tercer mercado de renta corta»). La canción está reservada en `archivos/musica/registro-de-uso.md` (fila V43).

## Versiones de este apartaestudio

| V | Proyecto | Estado | Fecha | Qué es |
|---|---|---|---|---|
| V42 | 060 | en montaje (otra sesión) | 2026-10-21 | «Tu plata en el banco pierde valor»: HK03 · MD05 · CT03 · *Street Level Sessions on the Green* · apertura ZC07 |
| **V43** | **061** | **final exportada** (CRF 12 + CRF 16 + `.srt` + portada + versión con ficha; 3 palabras sin oír, medidas y declaradas), con el OK del usuario a la prueba rev. 0 (`pruebas-720p/061-recorrido.mp4`) | 2026-10-22 | **«Pocos permiten rentas cortas»**: ZC22 (la pérgola) · **HK04** · RC01 · RC17 · RC07 · **MD04** · RC10 · ZC05 · ZC18 (el jacuzzi) · **CT01** · ***La Isla Bonita (Saxophone 80 Mix)*** · 1138 f · 37,9 s |
| V44 | 062 | en montaje (otra sesión) | 2026-10-21 | «Medellín, tercer mercado de renta corta»: HK02 · MD02 · CT02 · *In This Together* · apertura ZC29 |

## Lo que lleva (rev. 0)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Apertura (aérea sustituta) | ZC22 (`TERRAZA Y JACUZZI (23)`) 3,40-5,83 s | la pérgola del rooftop, avanzando: columna, deck de madera, jacuzzis, montañas; sin la tarjeta «2X1» de las mesas (esas tomas están en 0-3 s del clip) |
| Hook | HK04 `HOOK4` (voz 0,58-4,86 s) | «Te presento este estudio en Laureles, habilitado para rentas cortas en Medellín.» Entra a corte en el golpe de 28,6 dB; su primera palabra suena a los 11,4 f |
| Paseo (bloque 3) | RC01 0,00-2,77 · RC17 3,00-5,37 · RC07 3,00-6,07 s | lo que se encuentra al llegar: la cocina equipada (el cajón de cubiertos) → el estudio que se abre al fondo del pasillo → la cama hecha frente a la tele |
| Mitad | MD04 `MEDIO5` (voz 0,88-5,76 s) | «En Medellín hay muchos proyectos inmobiliarios, pero pocos permiten rentas cortas.»; entra disolviendo, su primera palabra suena a los 12,4 f del golpe |
| Bloque 5 | RC10 0,00-2,80 · ZC05 0,00-2,93 · ZC18 7,20-10,83 s | el sofá y la estantería → el coworking del edificio → LA VISTA: el jacuzzi con el cielo, la ciudad y las montañas, la cámara rodeándolo bajo la pérgola (el plano más largo del bloque, 109 f) |
| CTA | CT01 `CTA1` (voz 0,57-4,90 s; el plano usa 0,20-5,17 s) | «Haz clic en el botón y agendemos una visita. Puede ser virtual o presencial.» **Entra a corte** (la toma no deja 12 f de silencio para disolver); funde a negro en los últimos 6 f |
| Canción | *La Isla Bonita (Saxophone 80 Mix)* (`71321b4f`) desde 15,167 s (`INICIO_MUSICA` = 455/30) | cada cambio de plano en un golpe MEDIDO (13,2-31,5 dB); sin pulso y sin caída propia en esta sección: tras la última palabra del CTA se apaga con curva bajo la tarjeta; **repetida de la V7/023 (One Living), autorizada por el usuario**; sección distinta de la de la V7 (179,4 s) |
| Voz | −15,0 LUFS tratada (+19,7 · +20,1 · +19,8 dB tras el compresor 3,5:1; limitador −2,5 dBFS que quita 0,9 · 1,7 · 2,5 dB; pico real −2,5 dBFS) | pedido permanente del canal |
| Música | −15 LUFS sola por tramos (−1,4 · −3,5 · −3,8 dB sobre el archivo); −26 LUFS bajo la voz | ver `aprendizajes.md` §4 |
| Color | `COLOR_BASE` + el ajuste de cada plano (medido) | ver abajo |

## Lo exportado (2026-10-22, tras el OK del usuario a la prueba)

| Archivo | Qué es |
|---|---|
| `finales/061-recorrido.mp4` | máster: CRF 12 `slower`, 1080×1920, 30 fps, 1138 f, 76 MB, BT.709 etiquetado (VUI 1/1/1 y átomo `colr`), AAC 320 kb/s |
| `finales/061-recorrido-crf16.mp4` | versión ligera: CRF 16 `slow`, 40,7 MB; la misma imagen y el mismo audio (el PCM decodificado coincide con el del máster: md5 `ab9f72f1…`) |
| `finales/061.srt` | 13 cues, de 2,8 a 35,8 s |
| `finales/061-portada.png` + `portada.json` | portada 9:16 **B**: el fotograma de los 28,8 s (el jacuzzi con el cielo, la ciudad y las montañas; el más nítido del tramo de la vista), «LAURELES» y `VENTA`; contraste del texto 14,1:1 y del isotipo 20,2:1 |
| `finales/061-recorrido-ficha.mp4` | versión con ficha: SIN subtítulos, «APARTAESTUDIO EN VENTA · Laureles · Quadrato · $ 410 M COP» en Montserrat en el tercio de abajo del 1:1; la ficha se va de 35,50 a 35,90 s, antes de la tarjeta; audio copiado del máster (PCM idéntico), 1138 f, etiquetas BT.709 arregladas |
| `caption.md` | descripción de Instagram, versión resumida |

Banderas: `--color-space=bt709 --image-format=png --gl=angle --audio-bitrate=320k`. Etiquetas de color arregladas sin pérdida en las tres (`h264_metadata` + `+write_colr`), con el `framemd5` decodificado (1138/1138 fotogramas) y el md5 del PCM iguales antes y después. Color contra stills a escala 1 (`medir-final.py`, 10 fotogramas): máster a ≤ 0,21 niveles (baja frecuencia ≥ 51,7 dB), CRF 16 a ≤ 0,40 (≥ 49,2 dB); 0 fotogramas fuera de tolerancia (`medidas/medir-final-*.txt`). Audio de la final (ebur128): música sola −15,0 · −15,0 · −14,9 LUFS, con voz −14,6 · −14,6 · −14,7, pieza −15,0 LUFS, pico −1,2 dBFS (`medidas/audio-final.txt`); los ocho cortes secos suenan a ≤ 0,4 f de su golpe (`medidas/golpes-render-final.txt`). La base de la ficha (`sinSubtitulos`, muda, CRF 6) coincide con el máster en el 60 % de arriba (PSNR medio 51,0 dB, mínimo 47,9) y tiene los mismos 1138 fotogramas.

**Lo que cambió entre la prueba aprobada y la final:** nada (mismo plan, mismo color, mismo audio: el audio de la final y el de la prueba miden lo mismo).

## La rejilla (golpes MEDIDOS de la canción, `musica/golpes-cancion-entera.json`; `buscar-cortes-061.py`, registro en `musica/rejilla-061.txt`)

| Frame | Plano que entra | Cómo | Golpe (s de la canción · dB) | Suena en el render (`golpes-render.py`) |
|---|---|---|---|---|
| 3 | c01 pérgola | corte (el frame 0) | 15,207 · 21,1 | (entrada de la música) |
| 73 | c02 hook | corte seco | 17,551 · 28,6 | +0,1 f |
| 227 | c03 cocina | corte seco | 22,674 · 20,4 | −0,1 f |
| 310 | c04 estudio | corte seco | 25,461 · 14,2 | +0,4 f |
| 381 | c05 cama | corte seco | 27,799 · 24,2 | −0,4 f |
| 473 | c06 mitad | disolvencia que ACABA en el golpe | 30,873 · 19,2 | — |
| 648 | c07 sofá | corte seco | 36,722 · 31,5 | +0,3 f |
| 732 | c08 coworking | corte seco | 39,510 · 15,8 | −0,1 f |
| 820 | c09 vista | corte seco | 42,438 · 13,2 | −0,2 f |
| 929 | c10 CTA | corte seco | 46,092 · 19,0 | +0,4 f |

Los ocho cortes secos caen a ≤ 0,4 f de un golpe que SUENA en el audio de la prueba (`medidas/golpes-render-prueba.txt`).

## Lo medido en la prueba (rev. 0)

| Qué | Medida |
|---|---|
| Voz (con la música debajo) | hook −14,6 · mitad −14,6 · CTA −14,7 LUFS (`medidas/audio-prueba.txt`); picos −4,3 · −4,9 · −4,5 dBFS |
| Música sola | apertura −15,0 · paseo −15,0 · bloque 5 −14,9 LUFS |
| Pieza | −15,0 LUFS integrado, pico −1,2 dBFS: sin saturar |
| Subtítulos | 13 líneas a +0,1…+1,3 f antes de su palabra (−0,3 en «pero pocos permiten») sobre la voz sola (`lineas-vs-onsets.py`; `medidas/lineas-vs-onsets.txt`); el DTW de whisper iba de 2 a 8 f pronto o tarde |
| Legibilidad (R25, `legibilidad.py`) | con el velo de la plantilla el contraste al p90 es 4,2-7,1 : 1 y 3,2-4,9 al p99 (017: 2,9-3,7 / 2,6-3,0; 059: 3,9-5,2 / 2,8-3,7); no hizo falta subirlo |
| Color (`medir-color.py`, antes → después) | luma entre planos σ 9,2 → 5,8 · quemado máx. 0,1 → 0,7 % · aplastado máx. 3,7 → 5,0 % · saturación media 0,240 → 0,268 · piel: tono 16,5° → 16,3° (hook), 19,8° → 19,2° (mitad), 19,0° → 18,6° (CTA) |
| Saltos de luma en los cortes secos | pérgola → hook +2,1 · hook → cocina −8,5 · cocina → estudio +9,8 · estudio → cama 0,0 · mitad → sofá −12,5 · sofá → coworking +12,0 · coworking → vista −1,0 · vista → CTA −8,2: contenidos, y en golpes de 13,2-31,5 dB |
| Cierre | tarjeta de 2,0 s con el logo y la web; negro exacto en el f1077 (la puerta) |

## Metraje compartido con las otras versiones del apartaestudio (declarado)

- **Con la 060 (V42) y la 062 (V44):** ni un segundo (la puerta, 7b). Coordinado el 2026-10-22 en `side-session-notes/…/06x-tramos-de-recorrido.md`. La 060 tenía RC01 en su nota y yo RC05; al leer su `metraje-060.ts` (el plan vigente: RC05 en su paseo 1) cambié a RC01 y se lo dije en mi nota. Si la 060 recuperase RC01, el repuesto es **RC11 3,4-6,2 s** (la cocina y el escritorio vistos al avanzar; nadie lo usa).
- **Pérgola:** ZC21 (la pérgola con la mesa en primer plano) es de la 062; yo uso ZC22 de 3,40 a 5,83 s.
- Hook, mitad, CTA y canción son exclusivos de esta pieza dentro del apartaestudio (reparto).

## Cómo cambiar cada pieza

- **Otro hook / mitad / CTA** (libres que quedan, `proyectos/054/reparto-054-062.md`: HK01 `HOOK1` —la peor transcrita—, MD01 `MEDIO1/2`, MD03 `MEDIO4`, CT04 `CTA4`): añade su fila a `MATERIAL` de `normalizar.mjs` (con su sha) y su ventana a `VENTANA_VOZ` (mira la envolvente con `envolvente-voz.py` y `onsets-voz.py` antes de fiarte de `limites-voz.py`: en HK04 y CT01 dio 0,15 y 0,26 s y la primera sílaba era 0,58 y 0,57), la ganancia con `herramientas/probar-voz.py --umbral 0.0316 --razon 3.5` (editar su `TOMAS`) → `GANANCIA_VOZ_DB`. Luego `voz.s0/s1/lufs/dice` del corte, el guion marcado `voz/<toma>.txt`, `trozos-editoriales.mjs` y cada línea llevada a su palabra con `onsets-voz.py` + `palabras-desde.py` (tabla de `lineas-vs-onsets.py`). Un cambio de duración mueve la rejilla: **repetir `buscar-cortes-061.py`** (el hook pide 150-162 f y la mitad 170-181 f por el metraje que deja su clip tras la voz).
- **Otra canción:** reservarla en el registro; `medir-pista.py … --json musica/golpes-<canción>.json` y `buscar-cortes-061.py`; `INICIO_MUSICA`, los `GOLPE` de `metraje-061.ts`, los niveles de `audio-061.ts` (`LUFS_TRAMO`, `PICO_TRAMO`, `LUFS_CANCION_EN_VOZ`; `lufs-rangos.py`) y `FIN_MUSICA_061`; la puerta lee la ruta de los golpes (sección 4).
- **Otra entrada de la misma canción:** `buscar-cortes-061.py` da las rejillas (`musica/rejilla-061.txt`; 26 entradas con golpes ≥ 12,5 dB); cambiar `INICIO_MUSICA` y los `GOLPE` mueve todos los cortes (salen de `golpe(...)`).
- **Otro plano de recorrido:** mira su hoja (`herramientas/hoja-tramos.py <salida> 6 140 rcNN:desde:hasta`) y el movimiento antes; los candidatos normalizados están en `remotion/public/recorrido-061/` (RC01-RC03, RC07, RC10, RC11, RC13, RC15, RC17, ZC01, ZC02, ZC04, ZC05, ZC18, ZC22). Un plano que entra disolviendo pide 12 f de clip antes de su `desde`.
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `contrast` ≤ 1,15, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella). Stills antes/después: `stills-multiples.mjs` y `stills-antes.mjs`; `medir-color.py` (las caras salen de `seguir-sujeto.swift`); `poner-color.py` escribe un JSON de colores en el plan (historial en `medidas/color-v*.json`).
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-061.ts`; las voces siguen a −15 LUFS.
- **Versión con ficha:** `Recorrido061` con `--props={"sinSubtitulos":true}` + `ficha.mjs video proyectos/061/ficha.json …` (la ficha de esta propiedad está en `proyectos/061/ficha.json`: tipo · lugar · COP 410 M).

## Lo por confirmar

- **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto). Las tres se **midieron** y se **exportaron sin oír** (el usuario dio la orden de exportar con la duda abierta, vía la sesión madre):
  - «**estudio**» (HK04, f84-f133 = 2,8-4,4 s del vídeo): whisper oye «estudiante»; el catálogo supone «[apartaestudio]». La palabra dura de 1,80 a 2,28 s de la toma —tres sílabas a ≈ 0,2 s, no las seis de «apartaestudio» (≈ 1,1 s)— y su distancia DTW sobre MFCC al «estudio» de HOOK3 es 4,28 (misma palabra en dos tomas: 4,28-4,86; palabras distintas: 4,93-5,99; `medidas/dtw-estudio.txt`). **Apoya «estudio»; no lo cierra.** Los formantes de las vocales no distinguen entre «estudio» y «estudiante» (`medidas/formantes-palabras.txt`).
  - «**Laureles**» (HK04, f133 = 4,4 s): whisper oye «Laurelis» (confianza 0,13 en «Lau»); la sílaba labial «Lau» está medida (F2 ≈ 550 Hz, 2,50-2,58 s) y es el barrio de la ficha.
  - «**presencial**» (CT01, f1023-f1076): whisper oye «presenciar»; la última sílaba termina en una [a] (F1 ≈ 700-750, F2 ≈ 1.780-1.930 Hz) sin una consonante visible: la /l/ final es débil. La frase y la ficha dicen «presencial».
  - **Cómo cambiar una**: el texto del trozo en `subtitulos-061.ts` (y su `dice` en `metraje-061.ts` y `voz/<toma>.txt`), `exportar-srt.mjs` para el `.srt`, y como el texto va dentro de la imagen de los finales con subtítulos, **volver a renderizar el máster y el CRF 16** (≈ 3 + 3 min) y repetir las etiquetas de color; la versión con ficha (sin subtítulos) no cambia. El caption no repite ninguna.
- La canción (medida, no oída; repetida de la V7; licencia sin verificar).
- Que la pérgola de la apertura sea la del edificio (la ficha dice «terraza/rooftop» y no se dice nada del aéreo en la voz) y el nombre «Quadrato» como edificio (sale de la carpeta del rodaje; la ficha de la web no lo repite).
- Por dónde se escribe («el botón» del CTA: ¿la plataforma?) y si el caption lleva el WhatsApp.
- **La portada**: se propusieron dos (`pruebas-720p/portadas-prueba.png`): **A** la pérgola (2,2 s; contraste del texto 7,0 : 1 y del isotipo 5,1 : 1) y **B** el jacuzzi con la ciudad (28,8 s; 14,1 : 1 y 20,2 : 1, la más nítida). Se exportó **B** (la sesión madre dejó la elección al montaje) por ser la más viva y por variedad con las otras dos versiones (060 abre en un jacuzzi; 062 en la azotea). La alternativa, la pérgola, cambia con `portada --proyecto 061 --t 2.2`.
