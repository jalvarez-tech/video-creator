# 036 · Casa Campestre Guarne (V19, cinematográfica) — registro de versiones y «cómo cambiar cada pieza»

Worktree `.claude/worktrees/reel-v19-luxur-cinematico-dcca76`, rama `claude/reel-v19-luxur-cinematico-dcca76`, SIN commit (el encargo pide no hacer commit ni publicar nada sin pedirlo). Reservada en `archivos/musica/registro-de-uso.md` como **V19** (reserva sin publicar; el registro de este worktree es la FUSIÓN de las copias de todos los worktrees activos, y la fila se reflejó en las de la V14-V18, la V20 y la V21). Códigos del material: la sección 5 del registro. Cuarto reel de la casa: la V13 (029), la V16 (032) y la V17 (033) no comparten con esta ni un clip (la puerta, 7b, carga sus tres planes y falla si se repite uno). A la vez se hicieron la V20/037 («el error») y la V21/038 («todos caben»), con el reparto de clips acordado por mensaje entre sesiones.

## Versiones

| Rev. | Fecha | Qué | Estado |
|---|---|---|---|
| **0** | 2026-10-09 | Estilo CINEMATOGRÁFICO, hilo del REFUGIO: **DR75** · HK11 · DR81 (órbita) · RC17 · MD08 · RC11 · RC05 · DR79 · DR81 (la vista) · CT07 recortada · *Begin Again* desde 64,739 s · 1258 f · 41,9 s | prueba el 2026-10-09 (`pruebas-720p/036-recorrido.mp4` + `hoja.png`) · **FINAL EXPORTADO el 2026-10-11** («renderiza el final en buena calidad») |

### La final (2026-10-11)

- `finales/036-recorrido.mp4`: máster CRF 12 `slower` (129 MB) · `finales/036-recorrido-crf16.mp4`: CRF 16 `slow` (70 MB) · `finales/036.srt` (18 cues) · `finales/036-portada.png` (receta en `portada.json`).
- Método: dos renders de imagen (`--gl=angle --color-space=bt709 --image-format=png`), uno de audio (`--codec=wav`), y el WAV mezclado con cada imagen SIN recodificarla (`-c:v copy`, AAC 320k) con `h264_metadata` + `+write_colr` (BT.709 en las dos capas). Comprobado: md5 de los 1258 fotogramas decodificados igual al del render en las dos; audio a 0 muestras del WAV (correlación 0,99999, residuo −50 dB por canal); pieza −15,0 LUFS, pico −3,9 dBFS; voces −14,8/−14,7/−14,8 en la mezcla; música sola −15,0 por tramo; golpes a −0,1…+1,0 f; color a ≤ 0,41 niveles de stills a escala 1 (CRF 16 ≤ 0,71), baja frecuencia ≥ 50,3 dB (≥ 47,7).
- **Exportada con las dos palabras SIN oír**, como pide la skill cuando la orden llega con la duda abierta: se midió y la nota se queda. «Ven, te muestro»: tras «ven» hay un cierre de −60 dB (la /t/) y una vocal en 4,965-4,995 s con F1 ≈ 450-520 y F2 ≈ 2.120-2.220 Hz, la [e] de su «el» (F1 ≈ 400-430, F2 ≈ 1.820-2.180): hay una sílaba «te». «asado»: la /s/ de 1,44-1,54 s. La puerta con `--final` falla solo por esas notas.
- **Portada con Isabella** (2026-10-11, pedida por el usuario: «haz otra foto de portada con Isabella»; la skill pide por defecto «solo la propiedad»): `finales/036-portada-isabella.png`, receta en `portada-isabella.json`. La mitad (MD08) en 16,1 s: la terraza con el cielo dorado y el valle; es el primer fotograma de sus tomas sin subtítulos con 0,3 s de margen del corte (el hook y el CTA solo quedan sin texto en los 0,3-0,4 s que siguen a su corte, y ella sale pequeña en uno y hablando en el otro). Su cara queda por encima de «GUARNE»; la línea y «VENTA» cruzan la blusa y el «PL» el pantalón. Contraste 10,3:1 el texto y 8,8:1 el isotipo. Es un 1080p ampliado: algo más blanda que la del dron. Copiada (con su sí) a `Videos Social/Portadas/036-portada-isabella.png`, junto a la de la casa sola.
- **Copiadas a la carpeta de publicación** (2026-10-11, con el sí del usuario): `…/Casa Campestre - Duglas Yovana/Videos Social/036-recorrido.mp4` (el máster) y `Videos Social/Portadas/036-portada.png`, verificadas por sha256. La subcarpeta `Portadas/` la crea esta pieza (la primera portada de la casa).
- **Portada** (skill `portada-luxur`, PR #19 en `origin/main`, ejecutada desde una raíz mínima en el scratchpad para no meter archivos de main en esta rama): la apertura DR75 en 0,9 s (el fotograma más nítido del tramo; la casa en su cerro, la primera portada de esta casa), **GUARNE** (la ficha) · **VENTA** («Casa Campestre en Venta», la ficha). Contraste 17,9:1 el texto y 18,3:1 el isotipo. La camioneta del garaje sale pequeña: su placa (≈ 20 px) no se lee.

## Palabras por confirmar (antes de la final)

Whisper small, dos pasadas (con el vocabulario de la casa y sin él), y cada duda comprobada CORTANDO la voz desde varios instantes (`herramientas/palabras-desde.py`). «En el vídeo» es el segundo de esta prueba.

| Toma | Palabra | Segundo del clip | En el vídeo | Lo que oye whisper | Lo que se pinta y por qué |
|---|---|---|---|---|---|
| HK11 `IMG_9433` (hook) | **«Ven, te muestro»** | 4,68-5,10 | **8,5-8,9 s** | con vocabulario «me demuestro»; sin él «vente muestro»; desde 4,62 s «Vente, muestro por qué»; desde 4,93 s «Te muestro por qué» | «Ven, te muestro»: la «te» va pegada a «ven» (el registro de material escribe «Ven, te muestro por qué»). **POR CONFIRMAR AL OÍDO** |
| MD08 `IMG_9514` (mitad) | **«asado»** | 1,36-1,86 | **16,9-17,4 s** | con vocabulario «asado» (0,92); sin él «has dado»; en la doble MD09, «ha dado» | «asado»: entre «Jacuzzi» y la vocal siguiente hay una /s/ (1,44-1,54 s, banda de 4-9 kHz a −57/−62 dB, el nivel de la /s/ de «vista»); con «ha dado» habría dos cierres de /d/ y ninguna fricativa. La ficha lista «Zona BBQ». **POR CONFIRMAR AL OÍDO** |
| HK11 | «afán» | 2,13 | 7,1 s | sin vocabulario «avan»; desde 2,10 s «el afán» | «afán» (cerrada) |
| MD08 | «Jacuzzi» | 0,72 | 16,2 s | confianza 0,16-0,29, escrita igual en las cuatro pasadas | «Jacuzzi» (cerrada: es la grafía) |

## Qué hay en cada pieza

| Pieza | Elegida | Alternativas ya miradas |
|---|---|---|
| Dron de apertura (3,8 s) | **DR75** 22,4-26,2 s: pasada lateral con la casa en su cerro (dispersión 0,022); la ventana acompaña la deriva (0,50 → 0,54) | DR79 8,5-12 s (la casa de cerca, más fuerte, pero con las PLACAS de la camioneta y del Mini legibles y una persona en el garaje) · DR73 (el mismo encuadre que DR75) · DR71 (la V13 lo cambió por pedido del usuario) |
| Hook | **HK11** «El ruido, el tráfico, el afán. Llegas a tu hogar donde todo cambia. Ven, te muestro por qué.» (4K) | HK12 (doble, más lejos; whisper «llegas a tocarlo») · HK05 (descriptivo) · HK01 (audio malo) |
| Recorrido 1 | DR81 17,3-20,77 s (órbita: la casa fija, el paisaje gira) → RC17 6,9-9,9 s (la sala → la terraza con el valle; la tele encendida fuera) | DR73 9,4-12,9 s (repetía la apertura) |
| Mitad | **MD08** «Jacuzzi, asado con tu familia y la vista ideal.» (1080p; terraza al atardecer) | MD09 (doble; ella detrás del jacuzzi) · MD07 (dice una cifra) |
| Recorrido 2 | RC11 1,0-4,6 s (las pampas → la alcoba) → RC05 1,5-4,67 s (el lavamanos, 4K) → DR79 14,8-18,37 s (la casa en contrapicado, sin el garaje) → DR81 8,8-14,17 s (el valle: la vista) | RC02 (el mismo lavamanos en 1080p) · RC13 (sale el inodoro) · RC28 (una persona en la alcoba; murmullos) · DR80 (el valle quieto, con tierra roja) |
| CTA | **CT07** recortada en «Tu familia merece respirar distinto. Agenda tu visita ahora.» (4K; ventana al 85 % del alto) | CT06/CT05 «Recorridos privados disponibles…» (los usa la V21) · CT02 («Agenda» 0,47) |
| Canción | *Begin Again* desde 64,739 s | las 25 libres medidas con `buscar-cortes-lp.py` (01-plan) |

## La mezcla

- Voz: −15,2 · −15,1 · −15,1 LUFS en su ventana (WAV tratado), pico −2,5 dBTP; en el render, las ventanas de voz miden −14,8 · −14,7 · −14,8 LUFS (voz + música debajo).
- Música sola: −15,0 · −15,1 · −15,0 LUFS en el dron, el recorrido 1 y el recorrido 2 (la vista, −14,5: el clímax); bajo la voz −26,1 · −26,0 · −26,1 LUFS (medido aplicando la envolvente del plan a la canción).
- Pieza entera −15,0 LUFS, pico −3,9 dBFS; la tarjeta en silencio.
- Cortes secos sobre golpes, medidos en el WAV del render (`golpes-render.py`): −0,1 · +0,6 · +0,7 · +0,6 · +0,9 · +1,0 · +0,3 f. El de f708 (alcoba → lavamanos) cae en un golpe MEDIO de 8,8 dB, declarado en la puerta.

## El color

Base de cine + un ajuste por plano medido (`medir-color.py` sobre 28 fotogramas): luma entre planos σ 10,9 → 9,4 · saturación 0,252 → 0,315 (σ 0,046 → 0,038) · quemado máximo 5,2 → 1,4 % · piel de Isabella ≤ 1,2° de tono · vibrance ≤ 0,05. Quedan tres saltos de luma de +21 a +25 en los empalmes órbita → sala, mitad → alcoba (disuelve) y vista → CTA: son de contenido (árboles en sombra al final de los drones, interiores luminosos al principio de lo que sigue) y la exposición global ya no los baja sin estropear el resto. Legibilidad del texto: 3,5-6,9 : 1 al p90 del fondo y 2,5-4,0 al p99 (la V1 aprobada: 2,9-3,7 y 2,6-3,0).

## Caption (propuesta)

En `artefactos/01-plan.md` §Caption. Ojo: la ficha dice «6 Baños» en la cabecera y «cinco baños» en el texto.

## Cómo cambiar cada pieza

- **Un dron**: copia el DJI a `proyectos/036/original/`, su sha en `MATERIAL` de `normalizar.mjs` (clase `dron`: se retiempla a 30 fps sin repetir fotogramas), su ventana en `MANUAL` de `herramientas/encuadre.py` (mira el 16:9 entero con `herramientas/ventanas-prueba.py`; para un barrido o un giro, la velocidad con `herramientas/flujo.py` y, si acelera, la ventana compensa) y `uv run proyectos/036/herramientas/encuadre.py` + `node proyectos/036/normalizar.mjs`; en `metraje-036.ts`, `src`, `desde` (con `dji()`) y `color`. Comprueba fotogramas repetidos con el `duplicados.py` del scratchpad (o `movimiento.py`).
- **Otra frase de Isabella**: copia la toma, sha en `MATERIAL`, `VENTANA_VOZ` y `GANANCIA_VOZ_DB` en `normalizar.mjs` (`limites-voz.py` + `onsets-voz.py`; la ganancia con `probar-voz.py --umbral 0.0316 --razon 3.5`), Vision (`seguir-sujeto.swift` sobre fotogramas a 5 f/s → `medidas/`), `desde` (≥ 8 f antes de su primera sílaba, a corte sobre un golpe) / `dur` / `en`, `voz.s0/s1`, su guion marcado (`voz/<toma>.txt`), `trozos-editoriales.mjs` y cada línea a su palabra con `palabras-desde.py` + `onsets-voz.py` (tabla en `herramientas/lineas-vs-onsets.py`).
- **Un plano de recorrido**: `src`, `desde`, `color` (mirando su ÚLTIMO fotograma) y su `en`/`dur` con el corte sobre un golpe ≥ 9 dB (`musica/golpes-036.json`; la puerta lo comprueba y `golpes-render.py` lo confirma sobre el WAV del render).
- **Otra canción**: `INICIO_MUSICA`, `LUFS_SOLA` y `LUFS_BAJO_VOZ` en `audio-036.ts`, `MUSICA` en `normalizar.mjs` y `golpes-036.json` (`medir-pista.py --json`); la rejilla con `herramientas/buscar-cortes-lp.py` y los rangos reales de los planos (01-plan). Los cortes secos y las tres entradas de Isabella se mueven a SUS golpes.
- **Sin música** (para un audio en tendencia al publicar): `HAY_MUSICA = false`.
- **Una palabra que se oiga distinta**: el texto del trozo en `subtitulos-036.ts`, su `voz/<toma>.txt`, el `dice` del plan y, en la final, el `.srt` (≈ 5 min y un render de prueba).

## Lo que queda por confirmar

1. Las dos palabras de arriba («Ven, te muestro» ≈ 8,5-8,9 s y «asado» ≈ 16,9-17,4 s): la final ya está exportada con ellas, medidas y sin oír.
2. Que la portada sirva (es la primera de esta casa: la skill pide su sí antes de hacer las de las demás versiones).
3. La canción: medida, no oída; licencia no verificada.
4. La nitidez de la mitad (1080p ×2,13).
