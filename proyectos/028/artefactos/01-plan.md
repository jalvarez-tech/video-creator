# 01 · Plan narrativo — proyecto 028

> Paso 1 de 3. Siguiente: [02-layout.md](02-layout.md).
> **V12 del registro** (`archivos/musica/registro-de-uso.md`), sexto reel de One Living (Envigado). Reservada el 2026-10-08 en la rama `feat/reel-028-recorrido-caminando`.

## El encargo (2026-10-08, literal)

> «Haz otro video de one living pero todo con el recorrido del apto en recorrido caminando.MOV acelera la camara en los puntos que veas que sea necesario y escoge una cancion acorde»

Tres decisiones quedaron en mis manos y las declaro aquí:

1. **Dónde acelerar** → en los tránsitos (pasillos, giros, marcos de puerta, volver atrás); a velocidad 1 en lo que se mira. Sale de la hoja de contactos cada 0,25 s (`contactos/rc14-cada-1s.png` y las de 0,25 s del scratchpad) y del movimiento medido (`herramientas/movimiento.py`).
2. **La canción** → *Daniel Armand – Street Level Sessions on the Green* (lo-fi / chillhop †, 85 BPM de catálogo, «relajado, urbano»). Ver abajo.
3. **¿Con la voz de Isabella?** → **sí**: la toma la trae al principio (el hook) y al final (el CTA) y sin ella el reel no tiene ni promesa ni llamada. Consecuencia que se declara: **esas dos frases ya se publicaron** (el hook en la V10; el CTA en la V10 y la V11). Si se prefiere un recorrido mudo, se quita `audio` de los dos trozos a ×1 y los subtítulos, y la pieza sigue en pie (la música no cambia).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Clip fuente | `proyectos/028/original/RC14.MOV` = `4 recorrido/recorrido caminando.MOV` del SSD del rodaje · 3840×2160 `rotation=-90` · HLG · 29,97 fps · 49,84 s · voz del micro de solapa (sha 8 `c44931a1`) |
| Normalizado | `remotion/public/recorrido-028/rc14.mp4` 1296×2304 · 30 fps · 1495 f (49,83 s) · BT.709 (tone-map VideoToolbox) — **idéntico byte a byte** al de la V11 (mismo md5) |
| Composición | `Recorrido028` · 1080×1920 · **30 fps** · 1056 f (35,2 s) |
| Formato | 9:16 vertical, montaje (director §3i) de UNA toma con rampas de velocidad |
| Estilo | **lujo / redes**: cámara que corre y se detiene; sin gráficos; texto editorial solo de lo que dice ella |
| Destino | Reels · TikTok · Shorts |
| Objetivo | que quien lo vea recorra el piso entero en 33 s, se pare en la vista y en la cocina, y escriba |

## Promesa y CTA

- **Promesa (primeros 3 s):** la puerta se abre y ella dice «Hay apartamentos para vivir y hay otros que te dan más posibilidades. Ven, te muestro.»
- **Acción al final:** «Si te gustó este apartamento y deseas tener más información, contáctame.» + tarjeta con logo y `PropiedadesLuxur.com`.
- **Lo que NO se cuenta:** ninguna cifra, ni precio, ni metros, ni renta, ni entrega. Durante el paseo no hay texto: la casa se enseña sola.

## Escenas (el paseo, en el orden físico de la toma)

| # | Tramo (s de la pieza) | Narrativa | Idea | Hero | Velocidad |
|---|---|---|---|---|---|
| 1 | 0,0-0,4 | hook | la puerta se abre: curiosidad | b-roll (la toma) | ×2 |
| 2 | 0,4-6,1 | hook | Isabella en la puerta: la promesa y «ven, te muestro» | ella | ×1 |
| 3 | 6,1-9,3 | descubrimiento | la sala hasta la corredera y el balcón | la casa | ×3 → ×1,5 → ×2,5 |
| 4 | 9,3-12,0 | revelación | **la vista** desde el balcón | la vista | ×1 |
| 5 | 12,0-16,2 | conexión | de vuelta a la cocina y su mano sobre la isla | la isla | ×3 → ×1 |
| 6 | 16,2-20,4 | descubrimiento | la columna, el baño y el vestier | la casa | ×3 → ×1,5 → ×3 |
| 7 | 20,4-24,2 | intimidad | la alcoba secundaria: ella ante el ventanal viene hacia la cámara (el respiro de la canción) | ella | ×1 |
| 8 | 24,2-26,7 | (tránsito) | de vuelta por la cocina hasta la otra alcoba, sobre el golpe en que vuelve el ritmo | la casa | ×4 |
| 9 | 26,7-33,2 | recompensa + cta | la alcoba del ventanal de esquina; ella se gira y pide el contacto | ella | ×1 |
| 10 | 33,2-35,2 | cierre | tarjeta oscura: logo y web | logo | — |

## La canción

Libres y de género apto (registro, tabla 2; la V11 dejó medidas las candidatas para un «recorrido mudo» en su `analisis-uso.md` §C2): *Street Level Sessions* era su primera propuesta para un paseo sin cortes («lo-fi urbano, no playero, golpes de 15-16 dB, un final que cae solo»). Para una cámara que corre y frena hace falta, además, **muchos golpes** en los que poner cada cambio de velocidad: tiene 59 golpes ≥ 9 dB en 44 s. *Children* (piano, 8 golpes) y *Deep Breath* (ambient, sin caída) no dan para eso; *Overcoming the Impossible* es épica (superación, no hogar).

- **Entrada:** su golpe de 174,780 s (11,5 dB) suena en el f0 (`INICIO_MUSICA` = 5245/30 s).
- **Sin pulso fijo** (`rejilla.py`: 29 % de los golpes fuertes en la mejor recta, desvío 79 ms): se monta por golpes medidos (`musica/golpes-028.json`).
- **El respiro:** de 195,5 a 198,8 s baja de −8 a −17 dB (`curva.py`) → cae en la alcoba secundaria; el ritmo vuelve en 198,988 s → arranca la carrera ×4.
- **El final:** −14 dB a 205 s, −19 a 206, −30 a 207, silencio digital hacia 209,5 s → se apaga bajo el CTA y llega al silencio en la tarjeta.
- **Licencia: no verificada** (como todas las de la biblioteca). `HAY_MUSICA = false` en `audio-028.ts` saca el reel sin música para ponerle un audio de la plataforma.
- **Género inferido del catálogo, no oído (†)**: extracto para oír en `musica/extracto-street-level-174s.mp3`.

## Cumplimiento

Solo dice lo que ya dijo en la V10 (las mismas dos frases): «más posibilidades» es vaga (no promete renta ni valorización: el usuario la aceptó el 2026-10-06). Ninguna cifra en pantalla.

## Pendientes con el usuario

1. Ver la prueba y dar el OK (o cambiar velocidades: cada meseta es una línea de `MESETAS` en `metraje-028.ts`).
2. **Oír** «posibilidades» (≈ 3,8 s), «te muestro» (≈ 4,9 s), «gustó» (≈ 29,1 s) y la última sílaba de «contáctame» (≈ 32,3 s): cerradas por medida en la V10, no oídas (la puerta `--final` falla por la nota).
3. Oír la canción (género inferido) y su licencia.
4. Canal del CTA («contáctame» no dice dónde: la tarjeta da la web).
