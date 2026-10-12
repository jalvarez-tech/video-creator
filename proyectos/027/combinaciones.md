# 027 · One Living (Envigado) — qué se eligió y cómo cambiarlo

> V11 del registro de reels, quinta de One Living. Los planos están en `remotion/src/proyectos/027/metraje-027.ts`; la puerta, en `proyectos/027/revisar-027.mjs`. **Estado: FINAL exportado (2026-10-08, orden «renderiza en buena calidad», sobre la rev. 1) con tres palabras sin oír.**

## Lo elegido

| Pieza | Elección |
|---|---|
| Vía | **(a)**: una terna NUEVA de tomas YA PUBLICADAS (decisión del usuario, 2026-10-08: «vía a»; no quedaba ningún hook, mitad ni CTA limpio). La terna la elegí yo: la única de las 14 coherentes que toma cada frase de una versión distinta (`analisis-uso.md` §A3) |
| Hook | **HK2** «Si para ti un apartamento sin balcón no es opción, mira esto.» (BALCON; abre la pieza, excepción declarada; **repetido de la V6**) |
| Mitad | **MD3** «Cuenta con dos habitaciones independientes, balcón y ubicación junto a City Plaza.» (SALA; **repetida de la V7**) |
| CTA | **CT4 = RC14 44,8-49,83 s** «Si te gustó este apartamento y deseas tener más información, contáctame.» (ALCOBA del ventanal de esquina, casi seguro la principal; **repetido de la V10**; sin canal) |
| Canción | **Ivory Skyline Reverie** (lounge/downtempo †): suena desde el f0 (se usa desde 163,233 s); su golpe de 168,183 s (17,1 dB) abre el paseo a los 5,0 s; su fundido final cae en LUFS a 194,5 s, dentro del CTA, y el archivo se acaba a 197,23 s. Sin pulso: cortes en golpes medidos. La única libre con rejilla para esta terna; **puede sonar playera**: medida, no oída |
| Recorrido 1 | RC14 18,53-22,6 s (detrás de ella, de la sala a la cocina; su mano en la isla) · RC06 (la estufa) · RC09 (de la isla a la sala) · RC09 (la corredera abierta al balcón) |
| Recorrido 2 | RC07 (la alcoba principal, el mueble blanco) · RC09 (hacia su baño) · RC02 (el baño, a corte) · RC08 (la vista desde el ventanal de esquina, la más larga) |
| Duración | 1077 f · 35,9 s |

## El final (2026-10-08, orden «renderiza en buena calidad» sobre la rev. 1)

`proyectos/027/finales/027-recorrido.mp4` (máster CRF 12 `slower`, 1080×1920, 1077 f · 35,9 s, 103 MB) y `027-recorrido-crf16.mp4` (CRF 16 `slow`, 54 MB), los dos con audio AAC 320 kb/s, −15,6 LUFS y pico real −2,4 dBTP, y `027.srt` (16 cues). Etiquetas de color arregladas sin pérdida (`h264_metadata` + `+write_colr`: bt709/bt709/bt709 y rango tv): el md5 del vídeo decodificado (`92e41687…` el máster, `4c5a4c7b…` el CRF 16) y el del PCM (`fe63cafc…`, el mismo en los dos) son idénticos antes y después. Color medido contra stills a escala 1 (`finales/medir-final.txt`): Δ ≤ 0,42 niveles, PSNR de baja frecuencia ≥ 51,5 dB (máster) y ≥ 48,2 dB (CRF 16), 0 fuera de tolerancia. Golpes sobre el audio de la final (`finales/golpes-final.txt`): 12,6-21,8 dB, todos a ≤ 0,5 f de su corte. **Exportada con TRES palabras sin oír** (cerradas por medida, heredadas; la nota «POR CONFIRMAR AL OÍDO» sigue en `subtitulos-027.ts` y `--final` falla solo por ella): «balcón» (MD3, ≈ 17,3 s del vídeo), «gustó» (≈ 30,1 s) y la última sílaba de «contáctame» (≈ 33,4 s). Para cambiar una: el texto del trozo en `subtitulos-027.ts`, `voz/<toma>.txt`, el `dice` del plano en `metraje-027.ts`, el `.srt` y volver a renderizar (≈ 6 min las dos).

## Revisiones

| Rev. | Qué cambió | Prueba |
|---|---|---|
| 0 | primera prueba: voz a −21 LUFS sin tratar (la regla del canal) | `pruebas-720p/027-recorrido-rev0.mp4` |
| 1 | **«necesito que la voz cuando habla Isabella tenga más decibeles sin saturar»**: la voz sube a −17 LUFS (+4 dB) con un limitador de picos (`normalizar.mjs`, `VOZ_ALTA`); pico real −2,0 dBTP por toma y −2,4 dBTP en toda la pieza. Las ventanas de voz del render pasan de −19,4/−20,9 a −15,9/−16,5 LUFS; la pieza, de −16,3 a −15,6. La música no se tocó (queda ≥ 13,8 LU bajo la voz). El vídeo decodificado es idéntico al de la rev. 0 (md5) | `pruebas-720p/027-recorrido.mp4` |

## Cómo cambiarlo

- **El nivel de la voz.** `VOZ_ALTA` en `normalizar.mjs` (la ganancia de cada toma, buscada para que su ventana de voz mida el objetivo DESPUÉS del limitador, y el techo del limitador), `OBJETIVO_LUFS` y `voz.lufs` en `metraje-027.ts` (el mismo objetivo), y `node proyectos/027/normalizar.mjs` (borra antes los `*-alta.wav`). La puerta (sección 3) mide el pico real de cada voz y falla por encima de −1 dBTP. Más de −16 LUFS pide más de 5 dB de limitación en MD3: se empieza a oír.

- **Otra canción.** Con esta terna y estas ventanas de plano no hay otra libre con rejilla (*Overcoming the Impossible*: 0 con la mitad de MD3). Para cambiar de canción hay que cambiar la estructura: menos planos de paseo, otra mitad, o sin mitad. `buscar-cortes.py` con `R` (los frames de plano disponibles en cada clip, descontando los 12 f de cada disolvencia), `TIPOS` y `T_F` (el instante de la caída, `lufs-caida.py`). Se cambian `GOLPE`, `INICIO_MUSICA`, `DECAE`, `FIN_PISTA`, las ganancias de `audio-027.ts` (`LUFS_MESETA`, `LUFS_CANCION_EN_VOZ`, el factor de `BAJO`) y `normalizar.mjs`.
- **Otra terna** (las 14 de `analisis-uso.md` §A3): cambia `src`/`audio`/`voz`/`desde` del plano, sus subtítulos (desplazar los de su versión: `en − desde`) y la rejilla (la mitad de MD2 pide un par de golpes a 131-154 f; la de MD3, a 158-167).
- **Quitar la vista repetida de la V8** (RC08 0,4-3,07 s): no hay otro plano del lado de la alcoba principal con la vista abierta y ≥ 2,5 s. La alternativa, RC10 0-2,27 s, también se publicó (la V6).
- **Otro tramo del recorrido.** Las ventanas libres de verdad están en `analisis-uso.md` §A5 y en `contactos/ventanas-libres.jpg`; el plano vale mientras `desde` + `dur` quepa en su ventana y la puerta (6, 7 y 7b) lo pida; si cambia su `dur` hay que mover la rejilla de golpes.
- **Una palabra mal oída**: el texto del trozo en `subtitulos-027.ts`, `voz/<toma>.txt`, el `dice` del plano en `metraje-027.ts`, el `.srt` y volver a renderizar.

## Lo que comparte con la V6, la V7, la V8 y la V10 (la puerta, 7b)

| Plano | Comparte (tramo opaco) | Con |
|---|---|---|
| c02-hook | HK2, 5,0 s (clip y voz) | la V6 |
| c07-mitad | MD3, 5,3 s (clip y voz) | la V7 |
| c12-cta | RC14 44,8-49,8 s, 5,0 s (clip y voz) | la V10 |
| c11-vista | RC08 0,4-3,1 s, 2,7 s | la V8 (su vista) |
| c10-bano | RC02 1,2-2,0 s, 0,8 s | la V6 |
| el resto | ni un fotograma | — |

## Pendiente

Oír «balcón» (MD3, ≈ 17,3 s del vídeo; heredada de la V7), «gustó» (≈ 30,1 s) y la última sílaba de «contáctame» (≈ 33,4 s) (heredadas de la V10); la canción (medida, no oída; ¿suena playera?) y su licencia; el canal del CTA; el micro de solapa que se ve en el CTA (como en la V10); qué alcoba es la del CTA (inferido: la principal).
