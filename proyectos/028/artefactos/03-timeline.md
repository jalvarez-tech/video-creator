# 03 · Timeline — proyecto 028

> Paso 3 de 3. Frames absolutos de la composición, a 30 fps (1056 f = 35,2 s). Anterior: [02-layout.md](02-layout.md). La fuente de verdad es `remotion/src/proyectos/028/metraje-028.ts` (`MESETAS` → `cortesDeMesetas()`); las fronteras las eligió `herramientas/plan-rampas.py --cuadra 174.780` (salida guardada en `herramientas/plan-rampas-salida.txt`).

## Las mesetas

`fuente` en segundos de RC14; `comp` en frames de la pieza; «arranque» = el frame en que se VE el cambio (un tránsito: cuando empieza a acelerar; un destino: cuando la cámara ya va a su velocidad); «golpe» = el golpe medido de la canción en que cae (desvío medido por la puerta).

| Meseta | Fuente (s) | × | Comp (f) | Qué se ve | Golpe del arranque |
|---|---|---|---|---|---|
| puerta | 0,50-1,33 | 2 | 0-13 | la puerta se abre y ella asoma (el f0) | 174,780 s · 11,5 dB · 0,0 f |
| hook | 1,33-6,97 | 1 | 13-182 | habla en la puerta; en «ven» se gira y entra | 175,147 s · 13,5 dB · +2,0 f |
| sala | 6,97-9,80 | 3 | 182-213 | detrás de ella hasta la corredera | 180,815 s · 14,6 dB · +0,9 f |
| corredera | 9,80-12,02 | 1,5 | 213-258 | cruza la corredera y sale al balcón | 181,883 s · 25,4 dB · −0,1 f |
| malla | 12,02-13,55 | 2,5 | 258-278 | el giro sobre la baranda (malla negra) | 183,355 s · 11,4 dB · +0,7 f |
| vista | 13,55-16,28 | 1 | 278-360 | **la vista**: ciudad, montaña y cielo | 184,077 s · 25,3 dB · −0,9 f |
| vuelta | 16,28-19,88 | 3 | 360-400 | barrido de vuelta, la sala hasta la cocina | 186,790 s · 23,6 dB · −0,3 f |
| isla | 19,88-22,75 | 1 | 400-486 | su mano sobre la isla | 188,051 s · 13,3 dB · +1,9 f |
| puerta-bano | 22,75-25,65 | 3 | 486-518 | la columna y la puerta | 190,967 s · 13,9 dB · +0,4 f |
| bano-vestier | 25,65-29,40 | 1,5 | 518-593 | el baño, el barrido y el vestier | 192,052 s · 12,4 dB · −0,2 f |
| giro-alcoba | 29,40-31,00 | 3 | 593-612 | el giro hacia la alcoba secundaria | 194,532 s · 18,4 dB · +0,4 f |
| alcoba-sec | 31,00-34,80 | 1 | 612-726 | ella ante el ventanal; viene hacia la cámara y pasa a su lado (**el respiro**) | 195,195 s · 9,2 dB · −0,5 f |
| regreso | 34,80-43,30 | 4 | 726-801 | de vuelta por la cocina hasta la otra alcoba; frena en escalones de 4 f | 198,988 s · 12,8 dB · −0,3 f (**vuelve el ritmo**) |
| cta | 43,30-49,80 | 1 | 801-996 | la alcoba del ventanal de esquina; se gira y habla | — (declarado: la canción no tiene golpes ≥ 9 dB entre 199,6 y 204,8 s) |
| tarjeta | — | — | 996-1056 | logo + `PropiedadesLuxur.com` | — |

Las rampas: ×1→×3 = 3 escalones de 2 f (×1,5 · ×2 · ×2,5); ×4→×1 hacia el CTA = 5 escalones de **4 f** (frena despacio). La fuente se arrastra de una meseta a la siguiente: avanza en cada frame (peor desvío 0,5 f de fuente, el redondeo de `trimBefore`).

## La voz

| Toma | Clip · ventana | Comp | Primera / última palabra | Dice |
|---|---|---|---|---|
| hook | RC14 · 1,82-6,31 s | m02-hook, f13-182 | f28 / f162 | «Hay apartamentos para vivir y hay otros que te dan más posibilidades. Ven, te muestro.» |
| CTA | RC14 · 45,22-49,35 s | m14-cta, f801-996 | f859 / f983 | «Si te gustó este apartamento y deseas tener más información, contáctame.» |

## Los subtítulos

| Bloque | Trozos (f) | Hasta |
|---|---|---|
| h01 | «Hay apartamentos» 27 · «para vivir» 46 | 70 |
| h02 | «y hay otros» 72 · «que te dan» 95 · ***más posibilidades.*** 114 | 138 |
| h03 | «Ven,» 140 · «te muestro.» 147 | 173 |
| c01 | «Si te gustó» 873 · «este apartamento» 890 | 914 |
| c02 | «y deseas tener» 916 · «más información,» 948 | 966 |
| c03 | ***contáctame.*** 968 | 991 |

(Escritos en frames de RC14 en `subtitulos-028.ts` y llevados a la pieza con `frameDeFuente`: siguen al plan si cambia una velocidad.)

## Metraje compartido (puerta, 7b)

Todo es RC14, por encargo. Ya se vieron: 1,6-7,2 s (hook de la V10), 13,7-15,9 s (balcón de la V7), 18,5-22,6 s (el paseo de la V11) y 44,8-49,8 s (el CTA de la V10 y la V11).
