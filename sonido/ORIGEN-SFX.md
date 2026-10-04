# ORIGEN-SFX.md — procedencia del set de SFX del ESTUDIO

Archivo del estudio (no va al producto). Documenta de dónde sale cada uno de los 55
archivos que hay en `remotion/public/sfx/` en el Mac del dueño: son copias byte a byte de
archivos del banco `sonido/` (Mixkit, Pixabay y recopilaciones de terceros), con licencias
que NO permiten redistribuirlos. Por eso el producto lleva otro set, sintetizado y original
(`manuales/diseno-sonoro/sfx-base/`, generado por `sfx.mjs sintetizar`), con los MISMOS
nombres y picos, y por eso esta tabla vive aquí y no en el README de `public/sfx/`.

Esta procedencia estaba en `remotion/public/sfx/README.md` hasta 2026-09-22; se movió
íntegra. Los orígenes exactos (ruta relativa a `sonido/`) y el sha256 de cada archivo
están en `sonido/mapa-sfx.json`, que es lo que consume el script.

## Reponer el set del estudio en un clon o worktree

```
node manuales/diseno-sonoro/scripts/sfx.mjs desde-banco
```

(el mapa por defecto es `sonido/mapa-sfx.json`). Copia cada archivo TAL CUAL con
`copyFileSync` (sin transcodificar ni corregir extensiones), comprueba el sha256 de los 55,
imprime la tabla de picos y `vol` sugeridos (los mismos números que hay en `cues.ts`) y
deja `remotion/public/sfx/.origen.json` con `modo: "banco"`, que es lo que impide que
`sintetizar` o `desde-base` (o el instalador) pisen el set del estudio. Si un origen falta o
su sha256 no coincide, sale con 1 sin dar el set por bueno.

Cualquier cambio de bytes en `public/sfx/` cambia el audio de las 27 composiciones
publicadas (001-015): el sha256 del mapa es la garantía de que no pasa en silencio.

## Núcleo — 4 funciones (movimiento · anticipación · llegada · ritmo)

| Archivo | Variante | Origen (banco) |
|---|---|---|
| whoosh-light.wav | `light` | 37-OTROS/Short Whoosh.mp3 (es RIFF/WAV pese a la extensión del banco) |
| whoosh-whip.wav | `whip` | 37-OTROS/mixkit-arrow-whoosh-1491.wav |
| whoosh-heavy.mp3 | `heavy` | 37-OTROS/swinging-staff-whoosh-strong-08-44658.mp3 |
| whoosh-wind.wav | `wind` | 37-OTROS/mixkit-cinematic-wind-swoosh-1471.wav |
| swoosh.mp3 | `swoosh` | 37-OTROS/Swoosh.mp3 |
| whoosh-swoosh-07.wav | `swoosh-hero` | 36-WHOOSH/7. Whoosh Swoosh Sound Effect ( By Ashish Editz )  .wav (DOS espacios antes de .wav; idéntico a 32-SWOSH/7. Whoosh Swoosh.wav) |
| riser-low.mp3 | `low-rumble` | 37-OTROS/BUILD-UP.mp3 |
| riser-cymbal.mp3 | `cymbal` | 37-OTROS/Ascending sound effect.mp3 |
| impact-deep.mp3 | `deep` · `boom` | 37-OTROS/mixkit-big-cinematic-impact-788.mp3 |
| impact-sharp.wav | `sharp` | 37-OTROS/mixkit-metal-hit-woosh-1485.wav |
| metal.wav | `metal` | 26-METAL SLICE/Metal.Slice.1.wav |
| click-camera.wav | `camera` | 37-OTROS/camera-shutter-sound-effect.wav |
| click-mouse.mp3 | `mouse` | 10-CLICK → 37-OTROS/Mouse Click.mp3 |
| click-pen.mp3 | `pen` | 37-OTROS/click sound by 90 Creators.mp3 |
| ui.mp3 | `ui` | 19-EXTRAS/SFX- Ui01.mp3 |

## Motion graphics — familias específicas (usa la MÁS específica, no un whoosh genérico)

| Archivo | Variante | Para qué motion graphic | Origen (banco) |
|---|---|---|---|
| pop.mp3 | `pop` | aparición de elemento (número, chip, botón, subtítulo) | 37-OTROS/Pop.mp3 (el README antiguo decía 29-POP/Pop.mp3; el script copiaba 37-OTROS) |
| boing.mp3 | `boing` | spring / rebote elástico exagerado | 19-EXTRAS/Spring Pop up Sound Effect ( By Ashish Editz )_01.mp3 |
| notification.wav | `notification` | notificación / confirmación de app | 37-OTROS/Apple Notification.wav |
| msg-send.wav | `msg-send` | enviar mensaje (celular) | 37-OTROS/Iphone Send.wav |
| data-count.mp3 | `data` | contador / cifras subiendo | 37-OTROS/Digital counting.mp3 |
| digital.wav | `digital` | data-sweep / transformación tech | 37-OTROS/09 Data Transfer.wav |
| glitch.wav | `glitch` | glitch / corte digital / error de señal | 22-GLITCH/glitch 1.wav |
| electric.mp3 | `electric` | energía / chispazo tech | 15-ELECTRICO/SFX- Electric1.mp3 |
| spin.wav | `spin` | rotación / giro 3D | 37-OTROS/mixkit-bike-wheel-spinning-1613.wav |
| typing.mp3 | `typing` | escritura letra por letra (loop) | 37-OTROS/keyboard-typing-5997.mp3 |
| tick.mp3 | `tick` | ritmo, palabra por palabra, reloj | 37-OTROS/Clock Tick.mp3 |
| chime.mp3 | `chime` | ding de acierto / llegada limpia | 14-DING/Ding Sound Effect.mp3 |
| success.wav | `success` | éxito / cambio positivo (ascendente) | 14-DING/quick-win.mp3 (es RIFF/WAV pese a la extensión del banco) |
| error.mp3 | `error` | error / negativo / tachar | 37-OTROS/Wrong Answer.mp3 |
| money.mp3 | `money` | dinero / ventas (kaching) | 37-OTROS/cash ting.mp3 |
| coin.mp3 | `coin` | moneda / gamificación (8-bit) | 37-OTROS/Mario Coin Sound - Sound Effect (HD).mp3 |
| scribble.mp3 | `scribble` | trazo a mano / lápiz / escritura | 37-OTROS/WRITING Sound Effect 2.mp3 |
| paper.wav | `paper` | papel / documento / foto sobre mesa | 28-PAPEL/Paper Flip 01.wav |
| liquid.mp3 | `liquid` | líquido / splash / morph orgánico | 24-LIQUIDO/SFX- Liquid1.mp3 |
| sparkle.mp3 | `sparkle` | partículas / brillo / destello mágico | 19-EXTRAS/Fairy Glitter.mp3 |
| logo.mp3 | `logo` | reveal de logo / marca | 03-ANIMACION LOGO/SFX- Animation1.mp3 |
| reverse.mp3 | `reverse` | cierre inverso / suction (modal, contraer) | 37-OTROS/ES_Suction Pop 5 - SFX Producer.mp3 |
| cartoon.mp3 | `cartoon` | remate cómico | 21-FUNNY/Funny Effect 1.mp3 |
| ambient-wind.mp3 | `ambient-wind` | textura/ambiente continuo (type `texture`; Noticia008 lo carga en bucle directamente) | 19-EXTRAS/SFX- Wind1.mp3 |

## Pools de variantes alternas (anti-repetición, SKILL §12)

Para no repetir el mismo archivo en cortes consecutivos, estas familias traen 2 alternas
(índice 0 = base). Se eligen con `variantIndex` en el cue → `POOL` en `cues.ts`.

| Variante | Pool (índices 0 · 1 · 2) | Origen alternas |
|---|---|---|
| `pop` | pop.mp3 · pop-02.mp3 · pop-03.mp3 | 29-POP/pop-2.mp3, pop-3.mp3 |
| `glitch` | glitch.wav · glitch-02.wav · glitch-03.wav | 22-GLITCH/glitch 2.wav, glitch 3.wav |
| `light` | whoosh-light.wav · whoosh-light-02.wav · whoosh-light-03.wav | 36-WHOOSH/1. y 3. Whoosh Swoosh Sound Effect ( By Ashish Editz ) .wav |
| `swoosh` | swoosh.mp3 · swoosh-02.wav · swoosh-03.wav | 32-SWOSH/5. y 2. Whoosh Swoosh.wav |
| `metal` | metal.wav · metal-02.wav · metal-03.wav | 26-METAL SLICE/Metal.Slice.2.wav, Metal.Slice.3.wav |
| `mouse` | click-mouse.mp3 · click-mouse-02.mp3 · click-mouse-03.mp3 | 10-CLICK/Mouse Click Sound Effect.mp3, Mouse Click - Sound Effect (HD) (1).mp3 |
| `sparkle` | sparkle.mp3 · sparkle-02.mp3 · sparkle-03.wav | 19-EXTRAS/Glitter.mp3, Highlight.wav |
| `chime` | chime.mp3 · chime-02.mp3 · chime-03.mp3 | 14-DING/Ting.mp3, Bells Sound Effect 2 ( By Ashish Editz )_01.mp3 |

Notas del banco: `chime.mp3`, `click-mouse-02.mp3` y `riser-low.mp3` llevan una carátula PNG
en el ID3; se copian con ella. `whoosh-light.wav` y `success.wav` son WAV que en el banco
tienen extensión .mp3: el destino lleva el contenedor real, y el motor los lee bien.

## El golpe de cada archivo del estudio (medido)

Esto es lo que R26 avisa: el banco no está recortado y el motor supone el golpe en t=0
(impact/click), al 65 % del cue (whoosh) o al final (riser). «Golpe» = primer instante que
supera −20 dB del pico de muestra; «pico RMS» y «audible» son los de
`sfx.mjs medir` a 30 fps. Con las duraciones de cue habituales (deep 18-40 f, metal 10-12,
pen 8-12, camera 12, notification 16), los archivos con golpe > 400 ms reproducían silencio
en las piezas 001-013; el 009, el 014 y el 015 lo compensaron por pieza (`cueReal`, `sfx()`).
El set sintetizado del producto tiene el golpe en 0 ms en todos los impact/click.

| Archivo | dur | pico dBFS | golpe | pico RMS | audible | sha256 |
|---|---|---|---|---|---|---|
| whoosh-light.wav | 4.00 s | -2.8 | 295 ms | f14 | f8–f22 | e717159f0b51… |
| whoosh-whip.wav | 1.10 s | -1.0 | 221 ms | f8 | f6–f9 | c9aa08de97e5… |
| whoosh-heavy.mp3 | 0.42 s | -0.1 | 115 ms | f5 | f3–f7 | f7161aa136ff… |
| whoosh-wind.wav | 1.45 s | -2.6 | 244 ms | f12 | f7–f19 | 4b1372bb5caf… |
| swoosh.mp3 | 1.46 s | -2.6 | 96 ms | f17 | f3–f30 | 492024e083ed… |
| whoosh-swoosh-07.wav | 4.00 s | -3.7 | 724 ms | f37 | f21–f43 | e9116305b6be… |
| riser-low.mp3 | 1.91 s | -17.3 | 273 ms | f49 | f8–f56 | d986d46059d1… |
| riser-cymbal.mp3 | 4.40 s | -4.8 | 475 ms | f94 | f14–f100 | d97e98ae084a… |
| impact-deep.mp3 | 7.94 s | -0.4 | 1158 ms | f65 | f41–f104 | 772e4afc9e79… |
| impact-sharp.wav | 0.48 s | -1.6 | 40 ms | f3 | f1–f8 | 706a25a0fba2… |
| metal.wav | 10.05 s | -0.1 | 1287 ms | f63 | f38–f297 | 4931616579ec… |
| click-camera.wav | 0.86 s | -0.3 | 607 ms | f19 | f8–f23 | 293cde93a52b… |
| click-mouse.mp3 | 0.34 s | -4.8 | 70 ms | f2 | f2–f5 | e78a9be1ee1e… |
| click-pen.mp3 | 1.55 s | -0.5 | 609 ms | f18 | f18–f21 | f08ac4041b6c… |
| ui.mp3 | 0.16 s | -7.0 | 10 ms | f2 | f0–f3 | c72ed3d4d800… |
| pop.mp3 | 1.74 s | -6.0 | 585 ms | f17 | f17–f20 | 539e0af59d8f… |
| boing.mp3 | 3.53 s | 0.0 | 1780 ms | f53 | f53–f62 | 47a9c2e93e06… |
| notification.wav | 1.90 s | -11.4 | 1125 ms | f42 | f33–f47 | 35619efde96d… |
| msg-send.wav | 0.66 s | -0.1 | 180 ms | f9 | f5–f12 | 3d5faa102ff8… |
| data-count.mp3 | 7.06 s | -9.3 | 665 ms | f116 | f19–f173 | 29af593874a6… |
| digital.wav | 2.00 s | -2.3 | 44 ms | f18 | f1–f42 | 20ad3216e9d9… |
| glitch.wav | 2.60 s | -20.6 | 211 ms | f36 | f6–f48 | cfcded0eaade… |
| electric.mp3 | 1.37 s | -1.6 | 147 ms | f6 | f4–f21 | 4c69b47e03e2… |
| spin.wav | 14.95 s | -11.5 | 107 ms | f32 | f3–f434 | 39ce0e00fc2b… |
| typing.mp3 | 15.60 s | -7.9 | 121 ms | f241 | f1–f466 | ac74e5a22d87… |
| tick.mp3 | 60.35 s | -4.6 | 159 ms | f1606 | f4–f1789 | 033907b793c8… |
| chime.mp3 | 2.80 s | -5.3 | 277 ms | f10 | f8–f29 | 36310559a9c2… |
| success.wav | 1.95 s | -0.4 | 83 ms | f5 | f2–f10 | 0773318d3d2d… |
| error.mp3 | 1.15 s | -8.9 | 58 ms | f7 | f1–f21 | 946ec30e948a… |
| money.mp3 | 1.39 s | -4.2 | 136 ms | f7 | f3–f26 | 7878ab2fa1f1… |
| coin.mp3 | 1.78 s | 0.0 | 271 ms | f9 | f8–f32 | 5fe5879c2369… |
| scribble.mp3 | 2.55 s | -2.8 | 146 ms | f9 | f4–f38 | d513e0fa6616… |
| paper.wav | 6.66 s | 0.0 | 546 ms | f114 | f16–f185 | 24b4238fae3c… |
| liquid.mp3 | 1.54 s | -2.3 | 249 ms | f10 | f7–f12 | fd42113c8f14… |
| sparkle.mp3 | 3.23 s | -6.3 | 65 ms | f17 | f2–f32 | e15d9f9fbf98… |
| logo.mp3 | 12.41 s | -2.2 | 102 ms | f26 | f5–f171 | 659c84f34b7a… |
| reverse.mp3 | 0.61 s | -4.4 | 101 ms | f3 | f3–f5 | 41b1e90f3aab… |
| cartoon.mp3 | 1.70 s | -12.6 | 826 ms | f29 | f24–f38 | 19f3212b9828… |
| ambient-wind.mp3 | 2.06 s | -6.6 | 194 ms | f17 | f5–f34 | 55ed25b5324f… |
| pop-02.mp3 | 0.55 s | -13.4 | 161 ms | f4 | f4–f6 | f9ab70435aa5… |
| pop-03.mp3 | 0.57 s | -12.2 | 124 ms | f4 | f3–f4 | 7edab7ca766d… |
| glitch-02.wav | 2.57 s | -2.4 | 48 ms | f40 | f1–f54 | e0659b9ca4aa… |
| glitch-03.wav | 2.34 s | -6.3 | 254 ms | f28 | f7–f44 | 0ed8758e60d6… |
| whoosh-light-02.wav | 4.00 s | -2.0 | 704 ms | f34 | f20–f46 | 2e0d29283624… |
| whoosh-light-03.wav | 1.74 s | -0.7 | 73 ms | f3 | f2–f4 | 11f697def91b… |
| swoosh-02.wav | 4.00 s | -4.6 | 421 ms | f18 | f12–f24 | bef37213d758… |
| swoosh-03.wav | 1.90 s | -5.6 | 225 ms | f12 | f5–f15 | 8608d949283c… |
| metal-02.wav | 10.05 s | -0.3 | 1288 ms | f63 | f38–f297 | da013df18bfd… |
| metal-03.wav | 7.05 s | 0.0 | 1200 ms | f61 | f36–f197 | 64fb677bb921… |
| click-mouse-02.mp3 | 3.06 s | -2.2 | 1045 ms | f31 | f31–f34 | 3e7c6c817933… |
| click-mouse-03.mp3 | 3.06 s | -3.7 | 1029 ms | f31 | f30–f34 | 734e4b748223… |
| sparkle-02.mp3 | 6.15 s | -3.8 | 579 ms | f31 | f17–f70 | ec47913c4b1c… |
| sparkle-03.wav | 1.00 s | -6.0 | 311 ms | f14 | f9–f18 | 46540ed9b38c… |
| chime-02.mp3 | 2.07 s | -7.4 | 783 ms | f25 | f23–f41 | 9a065f319a70… |
| chime-03.mp3 | 12.05 s | 0.0 | 2809 ms | f149 | f84–f193 | 611b0545d557… |

Para cambiar un sonido del estudio: edita la entrada en `sonido/mapa-sfx.json` (origen y su
sha256 nuevo), ejecuta `desde-banco`, copia el `vol` que sugiere al mapa `SFX`/`POOL` de
`cues.ts` y asume que las piezas publicadas que lo usen sonarán distinto.
