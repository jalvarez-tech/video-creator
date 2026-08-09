# public/sfx/ — SFX base del sistema de diseño sonoro

Estos archivos los reproduce el motor de cues (`src/plantillas/sound/cues.ts` → `PistaSonido`).
Se generan copiándolos del banco con `manuales/diseno-sonoro/copiar-sfx.sh` (reejecutable).
La guía de uso está en `manuales/diseno-sonoro/SKILL.md` y el catálogo por tipo de motion
graphic en `manuales/diseno-sonoro/recetario-motion-graphics.md`.

**Niveles:** el `vol` de cada variante en `cues.ts` está **calibrado por el pico real** (dBFS)
del archivo para caer en el objetivo de su familia de mezcla (SKILL §10): generales **−21**,
whoosh/impact **−27**, ambiente **−30** dBFS. Todos por debajo de la voz. Al reejecutar
`copiar-sfx.sh` con ffmpeg, el script mide el pico y **sugiere el `vol`** de cada archivo.

## Núcleo — 4 funciones (movimiento · anticipación · llegada · ritmo)

| Archivo | Variante | Origen (banco) |
|---|---|---|
| whoosh-light.wav | `light` | 37-OTROS/Short Whoosh.mp3 |
| whoosh-whip.wav | `whip` | 37-OTROS/mixkit-arrow-whoosh-1491.wav |
| whoosh-heavy.mp3 | `heavy` | 37-OTROS/swinging-staff-whoosh-strong-08-44658.mp3 |
| whoosh-wind.wav | `wind` | 37-OTROS/mixkit-cinematic-wind-swoosh-1471.wav |
| swoosh.mp3 | `swoosh` | 37-OTROS/Swoosh.mp3 |
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
| pop.mp3 | `pop` | aparición de elemento (número, chip, botón, subtítulo) | 29-POP/Pop.mp3 |
| boing.mp3 | `boing` | spring / rebote elástico exagerado | 19-EXTRAS/Spring Pop up… |
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
| success.wav | `success` | éxito / cambio positivo (ascendente) | 14-DING/quick-win.mp3 |
| error.mp3 | `error` | error / negativo / tachar | 37-OTROS/Wrong Answer.mp3 |
| money.mp3 | `money` | dinero / ventas (kaching) | 37-OTROS/cash ting.mp3 |
| coin.mp3 | `coin` | moneda / gamificación (8-bit) | 37-OTROS/Mario Coin… |
| scribble.mp3 | `scribble` | trazo a mano / lápiz / escritura | 37-OTROS/WRITING Sound Effect 2.mp3 |
| paper.wav | `paper` | papel / documento / foto sobre mesa | 28-PAPEL/Paper Flip 01.wav |
| liquid.mp3 | `liquid` | líquido / splash / morph orgánico | 24-LIQUIDO/SFX- Liquid1.mp3 |
| sparkle.mp3 | `sparkle` | partículas / brillo / destello mágico | 19-EXTRAS/Fairy Glitter.mp3 |
| logo.mp3 | `logo` | reveal de logo / marca | 03-ANIMACION LOGO/SFX- Animation1.mp3 |
| reverse.mp3 | `reverse` | cierre inverso / suction (modal, contraer) | 37-OTROS/ES_Suction Pop 5… |
| cartoon.mp3 | `cartoon` | remate cómico | 21-FUNNY/Funny Effect 1.mp3 |
| ambient-wind.mp3 | `ambient-wind` | textura/ambiente continuo (type `texture`) | 19-EXTRAS/SFX- Wind1.mp3 |

## Pools de variantes alternas (anti-repetición, SKILL §12)

Para no repetir el mismo archivo en cortes consecutivos, estas familias traen 2 alternas
(índice 0 = base). Se eligen con `variantIndex` en el cue → `POOL` en `cues.ts`.

| Variante | Pool (índices 0 · 1 · 2) | Origen alternas |
|---|---|---|
| `pop` | pop.mp3 · pop-02.mp3 · pop-03.mp3 | 29-POP/pop-2, pop-3 |
| `glitch` | glitch.wav · glitch-02.wav · glitch-03.wav | 22-GLITCH/glitch 2, glitch 3 |
| `light` | whoosh-light.wav · whoosh-light-02.wav · whoosh-light-03.wav | 36-WHOOSH/1, 3 |
| `swoosh` | swoosh.mp3 · swoosh-02.wav · swoosh-03.wav | 32-SWOSH/5, 2 |
| `metal` | metal.wav · metal-02.wav · metal-03.wav | 26-METAL SLICE/2, 3 |
| `mouse` | click-mouse.mp3 · click-mouse-02.mp3 · click-mouse-03.mp3 | 10-CLICK/Mouse Click SFX, HD (1) |
| `sparkle` | sparkle.mp3 · sparkle-02.mp3 · sparkle-03.wav | 19-EXTRAS/Glitter, Highlight |
| `chime` | chime.mp3 · chime-02.mp3 · chime-03.mp3 | 14-DING/Ting, Bells 2 |

**Para cambiar un sonido:** copia otro del banco (`sonido/…`) aquí con el mismo nombre
estándar, o edita la línea correspondiente en `copiar-sfx.sh` y reejecútalo. El origen
puede estar en cualquier categoría (la función `copiar` recibe la ruta relativa a `sonido/`).
El mapa completo de categorías del banco está en `sonido/MAPA-SONIDOS.md`.

> El banco tiene decenas de variantes por familia (84 whooshes, 68 glitches, 63 metal
> slices, 17 pops). Para **ampliar un pool** copia más con sufijo (`pop-04`…), reejecuta
> `copiar-sfx.sh` (te sugiere el `vol` calibrado) y añádelas a `POOL` en `cues.ts`.
