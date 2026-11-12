# 078 · Suite Go Living (El Poblado) — «No se trata solo de comprar una propiedad» · registro de versiones y «cómo cambiar cada pieza»

> Tercer reel del lote 076-078 de la suite hotelera en venta (V59 del registro de uso, `archivos/musica/registro-de-uso.md`; lo anota la sesión principal). Reparto de la suite: `proyectos/070/reparto-070-075.md`. Catálogo de las 61 tomas: `proyectos/070/catalogo/catalogo-material.md`. Plan, layout y timeline: `artefactos/`. Método y lo aprendido: `proyectos/070/aprendizajes.md`.

## Versiones

| Rev. | Fecha | Estado | Qué es |
|---|---|---|---|
| 0 | 2026-11-08 | **prueba** (`pruebas-720p/078-recorrido.mp4`, 540×960) | HK07 · MD02 (repetida de la 070) · CT03 · DR09 · *Ivory Skyline Reverie* (entrada 157,533 s) · zonas sociales ZS02 + ZS03 · 991 f · 33,0 s |

## La terna y el exterior

| Parte | Código | Archivo del disco | Dice / qué es | Voz |
|---|---|---|---|---|
| Exterior | DR09 | `3 Dron/IMG_5057 2.MOV` | la torre desde abajo entre las palmas, con el jardín vertical (iPhone desde el suelo, NO dron) | — |
| Hook | HK07 | `1 Hooks/IMG_4970 2.mov` | «No se trata solo de comprar una propiedad.» | 0,73-2,86 s |
| Mitad | MD02 | `2 Mitad/IMG_4951 2.mov` | «No todas las propiedades tienen las mismas condiciones para operar turísticamente.» — **REPETIDA de la 070** | 0,65-4,78 s |
| CTA | CT03 | `5 Cta/IMG_4946 2.mov` | «Conoce esta oportunidad en El Poblado.» | 0,60-2,72 s |

**Por qué MD02 repetida:** de las 9 mitades solo quedaban sin usar MD04 (reservada a la 076) y MD07 (afirma que el edificio está «construido para empresarios que quieran visitar Medellín», cosa que el anuncio no dice); MD05 promete valorización. MD02 es la única sin afirmaciones dudosas, como la V10 con su MD2. Es el mismo clip y la misma voz que la 070, en otro sitio de la historia.

Recorridos (cada plano, en `artefactos/03-timeline.md`): RC11 5,55-8,15 s · ZS02 0,00-2,50 s · ZS03 2,80-5,07 s · RC03 3,80-7,00 s · RC05 6,35-8,85 s · RC07 2,85-6,22 s. Normalizados y sin usar: DR04, DR05, DR06, DR08, DR10, ZS01, RC04, RC06, RC08, RC09.

## Cómo cambiar cada pieza

- **El hook / la mitad / el CTA (otra toma):** copiar el clip a `original/`, añadirlo a `MATERIAL` de `normalizar.mjs` (sha), medir la voz POR ENERGÍA (`limites-voz.py --margen 40` y el perfil de la cola: `onsets-voz.py`, `palabras-desde.py`) y poner `VENTANA_VOZ` y `GANANCIA_VOZ_DB` (`probar-voz.py --umbral 0.0316 --razon 3.5`); cambiar `src`, `audio`, `voz` y `desde` del plano; rehacer `voz/<toma>.txt` y los trozos de `subtitulos-078.ts`. **El hook** (HK07) deja solo 19 f entre su última palabra y el final del clip: un hook más largo permite una pausa mayor de la música.
- **Una toma con aire antes de su primera palabra (≥ 24 f)** podría entrar disolviendo: aquí ninguna lo tiene, por eso los diez planos son cortes secos.
- **El exterior:** `c01-edificio` (`src`, `desde`); dura hasta el f82 (el golpe del hook). DR04 · DR05 · DR06 · DR08 · DR10 están normalizados.
- **La canción:** decide los frames de todos los planos (`GOLPE` e `INICIO_MUSICA` de `metraje-078.ts`) y el nivel de cada tramo (`LUFS_*` de `audio-078.ts`): se vuelve a medir (`medir-pista.py --json`, `lufs-rangos.py`, `buscar-cortes-lp.py` con `TIPOS=dccccccccc`; `musica/rejilla-078.txt` dice con qué parámetros salió esta rejilla). Si *Ivory Skyline Reverie* no convence, la alternativa es *We Are* (Aleksey Chistilin); no se midió.
- **Los recorridos:** `src` y `desde` de c03-c05 y c07-c08; la duración la fija la rejilla. La vista (c09) tiene que ser el plano más largo del bloque 5.
- **El color:** `color({...})` por plano; la base en `COLOR_BASE`. Bajados de exposición: el escritorio −0,08, la habitación −0,06 y la cama −0,14 (luma 122-140 antes del ajuste frente a 97-107 del resto).
- **Renders mientras se montan otras piezas:** `ENTRADA=src/proyectos/078/entrada-solo.tsx` (stills) y `bash proyectos/078/herramientas/render-prueba-solo.sh` (prueba): el bundle solo lleva la 078. El render final (`render-final.sh`) usa `src/index.ts`: la composición se llama ya `composiciones.tsx`, como pide el estudio.
- **La versión con ficha:** `--props={"sinSubtitulos":true}`; **falta el precio** (el anuncio no lo trae).

## Metraje que comparte con las otras versiones de la suite

- **Con la 070:** el clip y la voz de MD02 entero (5,4 s) y RC07 (la vista), 3,2 s del tramo 2,85-6,06 s.
- **RC07 (la vista)** también con la 072 (3,4 s), la 073 (3,4 s), la 075 (3,3 s) y la 076 (3,4 s): es el único clip de la suite con una ciudad de ≥ 5 s.
- **Con la 071:** RC03 (1,5 s) y RC05 (0,6 s). **Con la 073:** RC11 (1,2 s), RC05 (1,0 s), RC03 (0,5 s) y DR09 (0,3 s). **Con la 074:** ZS02 (0,5 s) y ZS03 (0,4 s).
- **Con la 076 y la 077:** ni un segundo de ZS, DR, RC03, RC05 ni RC11 (salvo la vista, RC07, con la 076).

## Por confirmar al oído (R31)

1. **«solo de»** (HK07, ≈ 3,7-4,3 s): whisper oye «sólo hay que» (0,27 / 0,45); el catálogo lo lee «solo de». Si dice «solo hay que», el trozo se rehace.
2. **«Conoce»** (CT03, ≈ 28,2 s): whisper oye «Conocer» (0,24) y, en un corte, «Conocí»; por el contexto es «Conoce».
