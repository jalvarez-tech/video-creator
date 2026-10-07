# Combinaciones del 022 · One Living · Envigado · V6 (primera de esta propiedad)

> Registro de lo que se montó en el **primer reel de One Living** (con qué toma y con qué música) y de cómo cambiar cada pieza para sacar una V7.
> Se lee junto a [`catalogo-material.md`](catalogo-material.md) (los códigos HK/MD/CT/RC de ESTA propiedad), [`analisis-uso.md`](analisis-uso.md) (qué tomas se pueden usar y por qué), [`archivos/musica/registro-de-uso.md`](../../archivos/musica/registro-de-uso.md) (el tablero de coordinación, tabla 1 y sección 4)
> y `artefactos/`. Es **otra propiedad**: no comparte metraje ni códigos con `proyectos/017`-`021` (Los Patios); no se editaron sus `combinaciones.md`.

## 1. Registro de versiones

| Versión | Apertura | Hook | Mitad | CTA | Recorrido | Música (`desde`) | Dura | Estado |
|---|---|---|---|---|---|---|---|---|
| **V6 rev. 4** · «El balcón y lo que hay detrás» (022) | **ninguna: abre el hook** (pedido del usuario; la rev. 1-3 abría con RC13, 1,8 s) | **HK2** (`BALCON`) | **MD1** (`ALCOBA-SEC`) | **CT1** (`ALCOBA-PPAL`) | RC06 · RC05 · RC15 → MD1 → RC10 · RC16 · RC02 · RC12 | *Some Say* (Nea cover) — 139,067 s (golpe de 28,9 dB en 139,053 s, f1) | 1301 f · 43,4 s | **en prueba** |
| V7 | | | | | | | | libre |

Sin dron (no hay). Sin cifras. Sentido de paseo I (entrada → fondo).

### Lo ya elegido (~~tachado~~ = no se vuelve a elegir; el registro vivo es `archivos/musica/registro-de-uso.md` §2 y §4)

| | V6 · 022 |
|---|---|
| Canción | ~~*Some Say* (Nea cover)~~ |
| Hook | ~~HK2~~ |
| Mitad | ~~MD1~~ |
| CTA | ~~CT1~~ |
| Recorridos | RC06 · RC05 · RC15 · RC10 · RC16 · RC02 · RC12 |

**Libres para una V7:** hooks HK1 (cifra «76»: pregunta) · HK3 (renta corta: pregunta); mitades MD2 · MD3; CTA CT2 (si Luxur agenda). **HK4 y CT3 están cerrados** (valorización y rentabilidad). El cuello de botella otra vez es el CTA: solo CT2 queda, y pisa el balcón de HK2 (otro hook o ninguno).

## 2. V6 al detalle

### 2.1 El guion: tres frases de Isabella

| Bloque | Toma | Lugar | Dice | Ventana de voz (s del clip) | LUFS |
|---|---|---|---|---|---|
| 2 · hook | **HK2** `1 Hooks/hook2.MOV` | `BALCON` | «Si para ti un apartamento sin balcón no es opción, mira esto.» | 0,38 → 4,04 | −18,71 |
| 4 · mitad | **MD1** `2 Mitad/medio1.MOV` | `ALCOBA-SEC` | «Aquí cada habitación tiene su baño y su vestier, además de estar conectada con la zona social y el balcón.» | 0,54 → 6,41 | −23,31 |
| 6 · CTA | **CT1** `5 Cta/cta1.MOV` | `ALCOBA-PPAL` | «Estamos en la Loma del Escobero, en Envigado. Si quieres más información, contáctame.» | 0,66 → 5,37 | −22,28 |

Arco: **pregunta que selecciona → hecho que la responde → dónde y cómo escribir**. Ninguna cifra, ningún precio, nada de valorización ni rentabilidad.

### 2.2 Los doce planos

Tabla completa en [`artefactos/03-timeline.md`](artefactos/03-timeline.md). Resumen:

| Bloque | Planos (`id` → clip, tramo) | Golpes |
|---|---|---|
| 1 | `c01-ventanal` → RC13, 0,00-1,80 s (a corte, frame 0) | f3 (apertura, 28,9 dB) |
| 2 | `c02-hook` → HK2, 0,27-4,83 s (a corte; voz desde f57) | 54 |
| 3 | `c03-cocina` → RC06, 0,00-4,57 · `c04-sala` → RC05, 4,50-7,93 · `c05-alcoba` → RC15, 0,40-4,97 (disolvencia) | 191 · 328 · 431 |
| 4 | `c06-mitad` → MD1, 0,47-6,80 (disolvencia f556-568; voz desde f570) | 568 |
| 5 | `c07-principal` → RC10, 0,00-2,80 · `c08-vestier` → RC16, 0,00-1,77 · `c09-bano` → RC02, 1,20-4,03 (disolvencia) · `c10-vista` → RC12, 7,87-11,30 (disolvencia; el más largo) | 758 · 842 · 895 · 980 |
| 6 | `c11-cta` → CT1, 0,57-5,80 (disolvencia f1071-1083; voz desde f1086) · `c12-cierre` → tarjeta oscura | 1083 · — |

### 2.3 La música

*Some Say* (Nea): entrada 139,053 s (golpe de 28,9 dB tras un respiro), 105 BPM, sin pulso utilizable (53 % de los fuertes a ≤ 15 ms de una recta de corcheas con desvío de 17 ms; 43 % con el pulso real): cortes en **golpes medidos** (`musica/golpes-022.json`), comprobados sobre el audio del render con `golpes-render.py` (R33: los 8 cortes y disolvencias caen a ≤ 0,5 f de su golpe). Meseta plana de −14,1 LUFS y **acorde final en 175,5 s** (f1097, dentro del CTA): −15,4 → −24,4 → −57,5 LUFS en tramos de 5 s (−9,0 dB: justo el mínimo del formato). Medida, **no oída**; licencia no verificada.

Mezcla (medida sobre la prueba): voz con música debajo ≈ −20/−21 LUFS; música sola ≈ −14,4 (recorridos del bloque 3) y −15,8 (bloque 5); bajo la voz ≈ −31 LUFS (≈ 10 LU por debajo).

## 3. Cómo cambiar cada pieza

| Quiero… | Qué se toca |
|---|---|
| otro **hook / mitad / CTA** | el corte en `metraje-022.ts` (`src`, `audio`, `voz.s0/s1/lufs` con `limites-voz.py`, `desde` = `round(s0·30) − 3` frames), el guion marcado `voz/*.txt` + `trozos-editoriales.mjs` (con el `--en`, `--desde` y `--s0` del corte) y `normalizar.mjs` (la fila de `MATERIAL`, que ya trae las 26) |
| otra **canción** | `INICIO_MUSICA`, la tabla `GOLPE` (`medir-pista.py --json` → `musica/golpes-022.json`), `DECAE`, `LUFS_MESETA`, `MUSICA` de `normalizar.mjs` y el registro de uso (`archivos/musica/registro-de-uso.md`) |
| cambiar el **paseo** | los planos del bloque 3 y 5 de `metraje-022.ts`: mantén que cada plano entre en un golpe, que los saltos de luma a corte sean ≤ ±8 (o entra con disolvencia: `desde` ≥ 12 f) y que la vista sea el más largo |
| el **color** de un plano | su `color: color({…})`; mide con `medir-color.py` (`stills-antes.mjs` y `stills-multiples.mjs … angle`) |

## 4. Pendientes con el usuario

- «**habitación**» (MD1, ≈ 19,7-20,2 s del vídeo): whisper la oye «visitación» desde 4 de 7 cortes y «habitación» con el vocabulario de la propiedad; el contexto la fija; **no se pudo cerrar sin oírla**.
- «**Escobero**» (CT1, ≈ 37,1-37,6 s): la ficha escribe «Escobero»; whisper oye «Escobero» y «Escobar»; los formantes de la última vocal se parecen más a una /a/.
- **MD1** afirma que cada habitación está «conectada con la zona social y el balcón»: la ficha no lo dice. Si no es cierto, se recorta la toma antes de «además de estar conectada…» (como el CT02 de la V5).
- **El canal del CTA** («contáctame» no dice por dónde) y, para CT2, si Luxur puede agendar.
- **La música**: medida, no oída; licencia sin verificar (`HAY_MUSICA = false` es la salida).
- **Presentadora**: parece Isabella Cadavid, sin confirmar.
