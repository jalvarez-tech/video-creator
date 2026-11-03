# Combinaciones — proyecto 068 · V50 · Lote en San Cristóbal (EOLIA Condominio) · «El verdadero estatus es la privacidad»

> Registro de lo que lleva esta pieza y de cómo cambiar cada parte. Estado: **FINAL EXPORTADA el 2026-10-24** tras el OK del usuario a la prueba rev. 1: máster CRF 12 + CRF 16 + `.srt` + portada + versión con ficha + caption, en `proyectos/068/finales/` (qué es cada uno y qué se midió: `finales.md`); **sin copiar al SSD** (destino por decidir) **y sin commit**. El reparto manda: `proyectos/066/reparto-066-068.md`.

## Versiones

| Rev. | Qué | Archivo |
|---|---|---|
| rev. 0 (2026-10-24) | la vista era DR04 24,0-26,8 s (la ciudad ocupaba ≈ 12 % del cuadro) | `pruebas-720p/068-recorrido-rev0.mp4` |
| rev. 1 (2026-10-24) | la vista, DR04 28,0-30,8 s (la ciudad entera ≈ 20 %, con los bloques de ladrillo): lo único que cambia respecto de la rev. 0. **La que aprobó el usuario** | `pruebas-720p/068-recorrido.mp4` |
| **final** (2026-10-24) | la rev. 1, exportada: CRF 12 y CRF 16 con las etiquetas de color arregladas, `.srt`, portada (8,9 s, el aéreo cenital; alternativa: la vista de los 27,0 s en `pruebas-720p/`), versión con ficha y caption | `finales/068-recorrido.mp4` y compañía |

## La terna, el aéreo, los paneos y la canción

| | Qué | Dónde |
|---|---|---|
| Hook | **HK04** `IMG_0953` 0,00-5,10 s · «El verdadero estatus no es la fachada que muestras, es la privacidad que puedes tener.» (voz 0,36-4,60 s) | c02-hook, f73-226 |
| Mitad | **MD02** `IMG_0973` 0,00-6,50 s · «Imagina que el éxito por fin se siente como se ve: en silencio, con la montaña al frente y sin nadie que te apure.» (voz 0,09-6,08 s) | c06-mitad, f457-652 |
| CTA | **CT01** `IMG_0963` 0,00-5,93 s · «Tu bosque privado a solo 20 minutos de Medellín, escríbeme y agendemos una visita.» (voz 0,64-5,45 s) | c10-cta, f875-1053 |
| Aéreo | **DR06** 68,00-70,43 s (apertura) y 86,00-88,93 s (el camino) · **DR05** 66,00-68,47 s (el prado) · **DR04** 28,00-30,83 s (la vista) | c01, c03, c05, c09 |
| Paneos | **RC06** 1,00-3,30 s (los pinos) · **RC05** 3,50-5,67 s (la montaña) · **RC07** 5,00-7,43 s (el cielo) | c04, c07, c08 |
| Canción | ***Heaven on Earth*** (sha8 `acd99178`), desde su golpe de 178,043 s (f3); fin de la música en f1008 | `audio-068.ts`, `INICIO_MUSICA = 5340/30` |

**Lo compartido con las otras dos versiones del lote:** nada (puerta 7b: «ni un segundo de metraje en común» con la 066 y la 067, que se cargan desde este mismo checkout). **Fuera de rango:** ningún tramo de DR04/DR05/DR06 sale de los rangos del reparto (DR04 0-60, DR05 60-121, DR06 60-119).

## Los cortes (todos secos, todos en un golpe medido)

f73 (9,2 dB, entra Isabella) · f226 (8,6) · f314 (22,2) · f383 (11,4) · f457 (13,3, entra Isabella) · f652 (13,5) · f717 (10,4) · f790 (13,6) · f875 (13,9, entra Isabella). **Sobre el audio del render (`medidas/golpes-render-prueba.txt`): los seis cortes de recorrido caen a −0,4…+0,4 f de su golpe.** Los tres en que entra Isabella caen también en un golpe del plan, pero el detector mide su voz (+4,1 f y +4,5 f en f73 y f457; +0,1 f en f875, donde la voz entra 19 f después): no vale como medida y se declara.

**Corte seco a 8,6 dB (f226):** es el golpe más flojo de la pieza (el mínimo de la puerta es 8,0); es el único entre el fin del hook (f211) y el límite del clip de HK04 (f232).

## La mezcla

- **Voz de Isabella:** tratada (graves fuera, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia +19,6 / +20,5 / +19,7 dB y limitador a −2,5 dBFS) a **−15 LUFS** en su ventana de voz; pico real −2,5 dBFS. Fuera de su ventana el WAV tratado es silencio (el viento de CT01 y MD02 no sube con la ganancia).
- **Música:** −15 LUFS sola (apertura −1,7 dB, paseo +0,9 dB, bloque 5 −1,7 dB sobre la fuente) y **≈ −26 LUFS bajo la voz** (10,3 LU por debajo de ella como mínimo; la puerta exige 9). Bajada de coseno de 8 f que acaba antes de la primera palabra: **hook** (f73-81, tras el golpe; primera palabra f84), **mitad** (f448-456, ANTES del golpe del corte; primera palabra f460: no hay sitio después, y se declara) y **CTA** (f875-883, tras el golpe; primera palabra f894). Sube en 13 f (hook) y 11 f (mitad) tras la última palabra.
- **El fundido final natural de la canción** (208,1 s → 212,0 s, de −14,6 a −31 LUFS) es la resolución bajo el CTA; la música se lleva a cero en f1008, 2 f antes del último resto de la pista (un golpe de 8,5 dB a −45 dB en f1010).
- **Total de la prueba:** −15,0 LUFS integrados, LRA 3,7 LU, pico −2,0 dBFS.

## El texto (editorial: lo que ella dice)

9 bloques, 3 acentos («privacidad», «en silencio,», «escríbeme»), a 0,5-1,4 f antes de su palabra sobre la voz sola (`medidas/lineas-vs-onsets.txt`). Contraste del texto sobre el metraje real: p90 4,5-6,0 : 1; solo en f150 el coche blanco de HK04 baja el p99 a 1,6 : 1 (`medidas/legibilidad.txt`).

## POR CONFIRMAR AL OÍDO (exportadas SIN OÍR; la puerta con `--final` falla por ellas; los segundos exactos y cómo cambiarlas, en `finales.md`)

1. **«bosque»** (CT01, f893 = 29,77 s; suena en ≈ 30,1 s): ver `subtitulos-068.ts`. Whisper: «voz que»; aislado: «bosque»; el catálogo pensaba «refugio» y la medida (una /s/ a los 0,84-0,88 s) lo descarta.
2. **«y agendemos»** (CT01, f1005 = 33,50 s).
3. **«que»** de «sin nadie que te apure» (MD02, f622 = 20,73 s): «que» o «se».
4. **«a solo 20 minutos de Medellín»** (CT01, f925 = 30,83 s): la cifra no está en la ficha de la web; **el usuario decidió que se queda tal cual la dice Isabella** (no es una nota pendiente; el caption no la lleva).

## Cómo cambiar cada pieza

- **El hook, la mitad o el CTA:** otro clip del catálogo (`proyectos/066/catalogo/`): se mide con `limites-voz.py --margen 40`, `perfil-voz.py` y `probar-voz.py --umbral 0.0316 --razon 3.5`, se pone su `GANANCIA_VOZ_DB` y `VENTANA_VOZ` en `normalizar.mjs`, y se rehacen `voz`, `desde` y `dur` en `metraje-068.ts`, los trozos en `subtitulos-068.ts` (`lineas-vs-onsets.py`) y los números de `audio-068.ts` (`MOMENTANEA`). Las tomas de este lote respiran 0-0,3 s antes de hablar: entran a corte.
- **Un plano de recorrido o de dron:** `desde` y `dur` del plano en `metraje-068.ts` (los cortes se quedan donde están: están en golpes). Si cambia de clip, `color` se mide de nuevo (`medir-color.py` sobre stills a escala 1).
- **La canción:** `MUSICA` de `normalizar.mjs`, `INICIO_MUSICA`, `GOLPE`, `DECAE`, `LUFS_TRAMO`, `PICO_TRAMO` y `MOMENTANEA`; y los golpes de `musica/golpes-068.json`. Los cortes se mueven a los golpes de la nueva canción.
