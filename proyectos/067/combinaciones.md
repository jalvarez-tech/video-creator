# Combinaciones — proyecto 067 (V49 · Lote en venta en San Cristóbal, EOLIA Condominio, «Este no es para ti»)

> El registro de lo que lleva esta pieza y de cómo cambiar cada parte. Reparto fijo: `proyectos/066/reparto-066-068.md` (manda). Material: `proyectos/066/catalogo/catalogo-material.md`. Estado: **FINAL EXPORTADA el 2026-10-24 (38,3 s, 1148 f) tras el OK del usuario a la prueba rev. 0: CRF 12 + CRF 16 + `.srt` + portada + versión con ficha + caption, en `proyectos/067/finales/` (ver `finales.md`); sin commit y sin copiar al SSD.**

## Versiones

| Rev. | Fecha | Qué | Estado |
|---|---|---|---|
| 0 | 2026-10-24 | HK02 · MD01 · CT05 · DR06 + DR04 + DR03 · RC02 + RC03 · *Return to Oasis* desde 148,433 s · 38,3 s | prueba (`pruebas-720p/067-recorrido.mp4`), **aprobada por el usuario** |
| final | 2026-10-24 | el mismo plan, sin cambios: render CRF 12 (200,5 MB) y CRF 16 (114,4 MB) + `067.srt` + `067-portada.png` (fotograma de 23,40 s) + `067-recorrido-ficha.mp4` (204,5 MB) + `caption.md` definitivo | **exportada** con «fase» y «comprador» sin oír (decisión del usuario: no bloquear la exportación con la duda abierta) |

## Lo que lleva

| Pieza | Qué | Dónde se cambia |
|---|---|---|
| Hook | **HK02** (`IMG_0951`, 5,14 s): «Si estás buscando lo más barato de la zona, con todo respeto, este no es para ti.» Voz 0,50-4,46 s | `c02-hook` de `metraje-067.ts` (`src`, `audio`, `voz`), `normalizar.mjs` (`VENTANA_VOZ`, `GANANCIA_VOZ_DB`), `voz/hook.txt` y los `h01-h02` de `subtitulos-067.ts` |
| Mitad | **MD01** (`IMG_0944`, 7,72 s, 29,97 fps): «Aprendí a reconocer al comprador serio desde la primera fase [¿frase?]. No habla de metros, habla de lo que quiere dejar de sentir.» Voz 0,51-6,90 s | `c06-mitad`, `voz/mitad.txt`, `m01-m02` |
| CTA | **CT05** (`IMG_0986`, 5,14 s): «5.000 metros, infinitas posibilidades. Haz clic en el enlace y hablemos.» Voz 0,47-4,66 s | `c10-cta`, `voz/cta.txt`, `z01-z02` |
| Aéreo (bloque 1) | **DR06** 3,0-6,2 s (el dron se aleja de los cipreses y abre el camino) | `c01-aereo` |
| Paseo (bloque 3) | **RC02** 0,6-3,3 s (paneo del prado) · **RC03** 0,3-3,03 s (el cielo y la cordillera) · **DR04** 63,0-65,2 s del original (el lote en picado) | `c03-paneo`, `c04-cielo`, `c05-lote` |
| Dron hacia la vista (bloque 5) | **DR06** 41,5-44,2 s (cipreses con la ciudad) y 51,0-53,7 s (vuelo sobre los pinos) · **DR03** 5,3-9,07 s (LA VISTA, el plano más largo, 113 f) | `c07-curva`, `c08-pinos`, `c09-vista` |
| Música | ***Return to Oasis*** (Aleksey Chistilin) desde 148,433 s (`INICIO_MUSICA` = 4453/30): golpe de 9,9 dB en el f3; la caída a un piano cae en el f950 (el CTA) | `INICIO_MUSICA`, `GOLPE` y `FIN_MUSICA_067` en `metraje-067.ts`; la envolvente en `audio-067.ts` |
| Cierre | tarjeta oscura 60 f (logo 440 px al 60 % y `PropiedadesLuxur.com`) | `cierre-067.ts` |

## Repartido con las otras dos piezas del lote (declarado)

Los rangos son del reparto y NO se comparten: la 066 (V48) usa DR01 · DR02 · DR05 0-60 s y RC01 · RC04; la 068 (V50), DR04 0-60 s · DR05 60-121 s · DR06 60-119 s y RC05 · RC06 · RC07. **Esta pieza usa DR03 entero (solo 5,3-9,07 s), DR06 0-60 s (3,0-6,2 · 41,5-44,2 · 51,0-53,7 s), DR04 60-98,5 s (63,0-65,2 s) y RC02 · RC03.** Ni una toma de Isabella ni una canción compartidas con ellas. *Return to Oasis* se repite de la V2 (018, Los Patios), otra propiedad: declarado en el registro.

## Cómo cambiar cada cosa

- **Otra canción** (la alternativa del reparto, *Light Fills the Room*): cambiar `MUSICA` en `normalizar.mjs`, rehacer `musica/golpes-067.json` (`medir-pista.py --json`), `GOLPE`/`INICIO_MUSICA`/`DECAE`/`GOLPE_QUE_SE_EVITA`/`FIN_MUSICA_067` y las tablas `LUFS_TRAMO`/`PICO_TRAMO`/`MOMENTANEA` de `audio-067.ts`, y mover los seis cortes secos a golpes de la canción nueva (la puerta lo exige). Con *Return to Oasis* se puede mover la entrada a otro golpe de ≥ 9 dB (pulso 0, 13, 14, 16, 17, 24, 25…) sin tocar el resto, pero la caída al piano tiene que seguir cayendo en la toma del CTA.
- **Cambiar la mitad por otra toma:** la 067 no trae repuesto (sobran MD02-MD05; MD02 y MD03 son de la 068 y la 066); `desde`, `voz.s0/s1`, `VENTANA_VOZ`, `GANANCIA_VOZ_DB` (`probar-voz.py`) y los subtítulos (`trozos-editoriales.mjs` + `onsets-voz.py`).
- **«fase» ↔ «frase»** (f525 = 17,50 s): el texto del trozo `desde: 525` del bloque `m01` (`subtitulos-067.ts`), la línea 2 de `voz/mitad.txt`, el `dice` de `c06-mitad` y el cue 9 de `067.srt`; luego un render CRF 12 + CRF 16, la base muda y la ficha de nuevo (≈ 10 min con las etiquetas arregladas). **«comprador»** (f497 = 16,57 s): el trozo `desde: 497`, la misma línea de `voz/mitad.txt`, el `dice` y el cue 8.

## Lo medido

| | |
|---|---|
| Puerta | `node proyectos/067/revisar-067.mjs` en verde (con `--final` falla solo por los «POR CONFIRMAR AL OÍDO») · `npx eslint src/proyectos/067` limpio · `tsc` sin errores de esta pieza |
| Voz | −15,0 / −15,1 / −15,0 LUFS en su ventana, pico real −2,5 dBFS; el limitador quita 1,2 · 3,6 · 3,1 dB (picos de consonante; MD01 y CT05 llevan viento) |
| Mezcla (render, ebur128 sobre el audio de la prueba) | entera −15,2 LUFS, pico −4,2 dBFS; música sola −14,9 · −15,1 · −15,1 LUFS; con voz −14,7 (hook) · −14,9 (mitad) · −14,8 (CTA) |
| Cortes secos sobre golpes (R33, `golpes-render.py` sobre el audio del render) | f233 −0,0 f · f314 −0,1 f · f396 −0,4 f · f674 −0,2 f · f756 −0,2 f · f837 −0,1 f (golpes de 9,2 · 9,1 · 9,6 · 9,7 · 8,2 · 11,8 dB); el golpe de entrada (f3) es una subida desde silencio |
| Subtítulos | 17 líneas entran 0-1,8 f antes de su palabra sobre la voz sola (`lineas-vs-onsets.py`) |
| Color | σ de luma entre planos 14,0 → 11,0; hook de luma 85 → 93 (los pinos le dan sombra); la piel en el mismo tono (3,2° → 4,1°, 14,6° → 14,3°, 15,0° → 14,6°). **Saltos en cortes secos: hook→paneo +24 · paneo→cielo +17 · cielo→lote +10**: el hook y el final del paneo están en la sombra de los pinos y lo que sigue es un prado abierto con cielo; declarado, no se resuelve sin cambiar de plano |
| Cielos | a escala 1 sin bandas ni virado rosa (`pruebas-720p/recortes-cielo.png`) |

## Por confirmar (con el segundo exacto del vídeo) — la final se exportó CON ESTAS SIN OÍR

1. **«fase»** (MD01, f525 = 17,5 s): ¿«primera fase» o «primera frase»? Se pinta lo medido (whisper oye «fa» con 0,98 en la toma entera y en 3 de 4 trozos aislados, y la envolvente no muestra la /r/), no lo gramatical. `POR CONFIRMAR AL OÍDO`.
2. **«comprador»** (MD01, f497 = 16,6 s): la toma entera da «compreador» (0,27); un trozo aislado de 1,3-2,4 s da «comprador serio». Se pinta «comprador».
3. **«5.000 metros»** (voz de Isabella, CTA, f952 = 31,7 s) frente a los **5.170 m²** de la ficha: se pinta lo que ella dice; el caption lleva 5.170. **Decidido por el usuario (2026-10-24): se queda tal cual**; y el CTA «haz clic en el enlace» también se queda (el caption pasa a DM / WhatsApp).
4. La canción (medida, no oída; repetida de la V2/018; licencia sin verificar).
5. ~~El número de WhatsApp y por dónde se escribe en el caption~~: decidido: el caption va a mensaje directo / WhatsApp +57 304 667 0026.

## Lo medido en la final

Ver `finales.md` (framemd5 y PCM idénticos antes y después de arreglar las etiquetas, color contra stills a escala 1: máster 51,1 dB de baja frecuencia y |Δ| ≤ 0,58 · ligera 48,7 dB y |Δ| ≤ 1,07, la base muda contra el máster 47,2 dB en la mitad de arriba, portada con contraste de 8,4:1 y 6,8:1, ficha que cabe y se va a los 36,23 s).
