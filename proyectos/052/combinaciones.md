# Combinaciones — proyecto 052 · Tierra Grata Bosque Santo (ARRIENDO), V34 «Pregúntate esto»

Registro de esta versión y mapa de «cómo cambiar cada pieza». Es la RÉPLICA de `videos editados/02.mp4` (15-sep-2026), una de las TRES del segundo lote de arriendo (V33-V35, proyectos 051-053; reparto en `proyectos/044/reparto-051-053.md` §5b; catálogo en `proyectos/044/catalogo-material.md`). Lo que usó cada una está también en `archivos/musica/registro-de-uso.md`.

## Versiones de esta propiedad (lote 2: las réplicas de los vídeos editados del 15-sep)

| V | Proyecto | Estado | Fecha | Qué es |
|---|---|---|---|---|
| V33 | 051 | sesión hermana | 2026-10-20 | «Ven, te muestro» (réplica de `01.mp4`): HK05 · … · *Einaudi Fly* |
| **V34** | **052** | **final exportada (CRF 12 y CRF 16 + ficha + portada + .srt)** | 2026-10-20 | **«Pregúntate esto» (réplica de `02.mp4`, 44,7 s, SIN locución, nueve rótulos): HK04 (2.º intento) · RC21 al revés · RC22 · RC06 · RC01 · RC03 · RC15 · CT04 · RC16 · RC13 · RC12 · CT05 · *Here For You (Piano)***. Historia: **rev. 0** (80-84 s, con la locución del original: se generó una con ElevenLabs, voz de stock «Bella», y se descartó) → **rev. 1** (cambio de encargo: sin voz en off y con el guion nuevo en pantalla; 46,6 s) → **rev. 2** (la vigente: el hook arranca en el segundo intento de HK04, 44,7 s) |
| V35 | 053 | sesión hermana | 2026-10-20 | «¿Pagarías 14,8?» (réplica de `03.mp4`): CT05 cierra también esta |

Cada versión viene en DOS formatos: el **orgánico** (`052-recorrido.mp4`, con los rótulos y la tarjeta oscura) y el **funnel** (`052-recorrido-ficha.mp4`: el mismo vídeo SIN rótulos ni subtítulos —regla de `ficha-luxur`; la indicación de conservarlos era un error y el usuario lo corrigió— y `APARTAMENTO EN RENTA · El Poblado · Tierra Grata · $ 14,8 M COP / MES` fijo en el tercio bajo del 1:1, hasta la tarjeta oscura).

## Lo que lleva

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Hook | **HK04** `Img 9496`, el SEGUNDO intento (voz 4,925-7,17 s; `desde` 4,767 s): «Antes de arrendar amoblado, pregúntate esto.» Frame 0 = Isabella | réplica: excepción declarada a la regla fija 1. El primer intento (2,90-3,9 s) se equivoca; el original `02.mp4` también empieza en el segundo |
| Recorrido (orden del original) | RC21 al revés (el jacuzzi → las torres → la ciudad) 0,4-6,7 s · RC22 el bar 0,4-3,0 · RC06 la alcoba 0,4-2,4 · RC01 sala con la palma y ventanal 6-10,7 · RC03 balcón con las camas 1,5-5,9 · RC15 sauna 0,4-2,7 · **CT04** Isabella caminando (sin voz) 2,5-4,7 · RC16 piscina 2,6-7,0 · RC13 gimnasio 0,4-3,3 · RC12 Social Kitchen 0,4-4,8 | las mismas tomas del original, recortadas, sin acelerar. Disolvencias de 12 f que ACABAN en un golpe del piano |
| Los dos planos que NO existen | «Isabella de pie en la cocina» → CT04 (sin voz); «bosque con hierba» → nada | no están en las carpetas del material; el reparto decía que el primero era un tramo mudo de 9496: es una cocina vacía |
| Rótulos | nueve, uno por tramo: «¿Un lugar donde **dormir**…» · «…o un lugar donde **disfrutes** vivir?» · «Aquí no pagas solo un apartamento» · «Pagas llegar y tener todo **resuelto**:» · «**Aseo** semanal incluido» · «Alguien que te **acompaña** desde el día uno» · «**Chef** privado y transporte cuando los pidas» · «Planes y reservas en **Medellín**» · «Y la mejor **asesoría** de la ciudad» | guion del usuario (reparto §5b), tal cual: de tú, sin exclamaciones, sin cifras |
| CTA | **CT05** `Img 9501` (voz 1,30-4,08 s) | asignada; **la misma toma cierra la 053** |
| Canción | *Here For You (Piano)* (`6fbbe88d`), desde 22,733 s | reservada. Piano sin pulso ni caída (caída de 8 dB a +40 s), pero con golpes; cada rótulo (f90 · 179 · 278 · 414 · 554 · 687 · 823 · 956 · 1043) y cada cambio de plano caen en un golpe medido de 8-33 dB |
| Voz | −15 LUFS tratada (hook +18,6 dB, −15,1; CTA +20,4 dB, −15,0; compresor 3,5:1; limitador −2,5 dBFS) | pedido permanente |
| Música | −15 LUFS sola de principio a fin; −28 bajo la voz solo en el hook y el CTA | sin locución la música pesa |
| Color | `COLOR_BASE` + ajuste de exposición (hook +0,06 · balcón +0,04 · bar +0,05 · sauna +0,12 · CTA −0,04) | luma de los planos 65-117 |
| Recorridos | **anamórficos (SAR 81:256): `scale=1296:2304:flags=lanczos,setsar=1`, SIN recorte** | ×2,13: más blandos que Isabella en 4K |

## Lo medido

| Qué | Medida |
|---|---|
| Mezcla de la final | −15,2 LUFS integrado, LRA 3,8 LU, pico real −1,6 dBFS (el golpe de 32,8 dB del piano); hook −15,1, música sola −15,0, CTA −15,4 |
| Entradas en golpes | 20 entradas (9 rótulos + 11 planos) a ≤ 2 f de un golpe medido de ≥ 7 dB (la puerta, sección 4) |

## La final (rev. 2, exportada el 2026-10-20 con el OK del usuario)

| Qué | Medida |
|---|---|
| **Final (CRF 12 `slower`)** | `finales/052-recorrido.mp4`: 93,4 MB, 1080×1920, 1340 f (44,67 s), H.264 (16,4 Mbps) + AAC 320 kbps (317). Etiquetas BT.709 arregladas sin pérdida (R22: VUI y átomo `colr`); `framemd5` DECODIFICADO (1340 fotogramas) y PCM del audio idénticos antes y después. Color contra stills a escala 1 (`medir-final.py`, 12 fotogramas): color medio ≤ 0,37 niveles, PSNR de baja frecuencia 50,4-53,6 dB (medio 52,2), bruto 43,3-47,2 dB (medio 45,4) |
| **Final (CRF 16 `slow`)** | `finales/052-recorrido-crf16.mp4`: 50,7 MB, misma imagen y mismo audio (PCM idéntico); color medio ≤ 0,43 niveles, PSNR de baja frecuencia 48,8-50,7 dB (3 fotogramas) |
| `.srt` | `finales/052.srt`: 28 cues, 0,17-42,30 s (`exportar-srt.mjs`; incluye los rótulos: son el mensaje) |
| **Versión con ficha** | `finales/052-recorrido-ficha.mp4`: 105,3 MB, 1340 f, el audio del final copiado tal cual (PCM idéntico). **SIN texto salvo la ficha y la tarjeta** (corrección del usuario, 2026-10-20: una primera versión con los rótulos se exportó y se sustituyó; queda local como `finales/052-recorrido-ficha-conrotulos.mp4` y NO está en el SSD). Base: render `--props={"sinSubtitulos":true} --muted --crf=6` (apaga los subtítulos del hook y el CTA y TAMBIÉN los rótulos, que son bloques de `subtitulos-052.ts`: no hizo falta tocar la composición). La ficha entra desde el f0 y se va a los 42,23-42,63 s (la tarjeta oscura empieza en los 42,63 s). **Comprobado:** `ficha.mjs hoja` (12 fotogramas: solo la ficha) y, sobre los 1340 fotogramas, PSNR contra la base sin texto de la mitad de arriba (y 0-1150) y de la franja de abajo (y 1520-1920): mínimo 38,5 y 38,8 dB, ninguno < 35 dB, o sea que no hay ningún texto fuera de la ficha (la franja de 1440-1520 se oscurece algo por el velo de la ficha: 29-31 dB). Etiquetada BT.709 sin pérdida (framemd5 idéntico). Hook y CTA: la ficha cae sobre el torso y las manos de Isabella, no sobre su cara |
| Portada | `finales/052-portada.png` (receta en `portada.json`): fotograma de 3,6 s del render SIN rótulos, **solo la propiedad** (el balcón con el jacuzzi privado y las torres al atardecer; el más nítido de 3,3-4,6 s), `EL POBLADO` · `RENTA`; contraste 9,9:1 el texto y 14,4:1 el isotipo |
| Caption | `caption.md`: hook en texto, ficha, las cinco plusvalías (aseo semanal incluido, acompañamiento personalizado, chef privado y transporte cuando los pidas, la mejor asesoría) y el canon |
| En el SSD | `…/Apartamento - Tierra Grata - Las Palmas/Videos Social Media/`: `052-recorrido.mp4` (orgánico, CRF 12), `052-recorrido-ficha.mp4` (funnel, sin texto salvo la ficha; sustituido el 2026-10-20 tras la corrección del usuario), `052-portada.png`, `052.srt` y `052-caption.md` (sha256 idénticos a los de `finales/`). El CRF 16 se queda en `proyectos/052/finales/` |

## Cómo cambiar cada pieza

- **Un rótulo:** `subtitulos-052.ts` (el texto y su acento); la puerta (sección 5) valida las letras, ≥ 2 s entre acentos y 5 s de pantalla como mucho. **Moverlo:** `R` en `metraje-052.ts` (cada valor es un golpe medido; `buscar-entrada-rotulos.py` da otros candidatos).
- **Otro hook:** `voz` y `desde` del corte `c01-hook` (HK04 trae el intento fallido de 2,90-3,9 s y el bueno de 4,92 s) y los trozos `h01`; si cambia su duración, todo lo demás se desplaza en bloque (hay que recalcular `INICIO_MUSICA` para que el golpe de 32,8 dB caiga donde acaba el hook: es lo que se hizo al pasar de 4,9 a 3,0 s: −58 f en todo).
- **Otro plano o tramo:** el `desde` del corte (con 12 f de clip antes por la disolvencia) y, si es un clip nuevo, su fila de `MATERIAL` en `normalizar.mjs` (con su sha; se escala entero, `setsar=1`): antes, `ffprobe` del SAR. Los dos planos que faltan (Isabella en la cocina, el bosque) se pueden poner si el usuario trae los clips.
- **Otra canción** (la alternativa reservada es *Einaudi - Experience*): reservarla en el registro; `medir-pista.py --json`; `buscar-entrada-rotulos.py`; `INICIO_MUSICA`, `LUFS_MESETA` y los `R` de `metraje-052.ts`.
- **Con locución:** se hizo una con ElevenLabs (voz de stock «Bella», 1.101 caracteres; texto en `voz/descartada/`; los audios, no en git) y se descartó con el cambio de encargo. Se puede rehacer con `elevenlabs.py guion` y retimar los planos a sus palabras (la lógica `ancla()` está en la historia de git: commit `c483cb3`).
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-052.ts`; las voces siguen a −15 LUFS.
- **La versión con ficha** (sin rótulos, la vigente): `npx remotion render src/index.ts Recorrido052 <tmp>/052-limpio.mp4 --props={"sinSubtitulos":true} --muted --crf=6 --x264-preset=fast --color-space=bt709 --image-format=png --gl=angle` + `node .claude/skills/ficha-luxur/scripts/ficha.mjs video tierra-grata <tmp>/052-limpio.mp4 --audio proyectos/052/finales/052-recorrido.mp4 --salida proyectos/052/finales/052-recorrido-ficha.mp4` (y etiquetar BT.709 como la final). Con los rótulos: el mismo render SIN la prop.

## Lo por confirmar

- **Oír la música** (medida, no oída; licencia sin verificar) y la mezcla.
- **Confirmar con el propietario** que el chef privado y el transporte «cuando los pidas» y la «mejor asesoría de la ciudad» se pueden decir; ni el vídeo ni la ficha de la web dicen que vayan incluidos en el canon.
- Mirar con el usuario: la blandura del recorrido (608×1080 efectivos ×2,13), los dos planos del original que no existen, que RC03 (≈ 13 s) y RC01 (≈ 7 s) los comparten la V33 y la V35, y que CT05 cierra también la 053.
- «amoblado» (hook, 0,8 s): whisper oye «a mollado»; el usuario vio el subtítulo en la prueba y solo corrigió el arranque. La nota POR CONFIRMAR se retiró.
