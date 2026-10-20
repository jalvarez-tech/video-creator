# 03 · Línea de tiempo — proyecto 046 · Tierra Grata Bosque Santo (El Poblado), ARRIENDO, V28 «Ciudad nueva»

> Paso 3 de 3. Del plan (`remotion/src/proyectos/046/metraje-046.ts`) a la tabla, con los números reales. Anterior: [02-layout.md](02-layout.md). Generada con `node proyectos/046/herramientas/volcar-plan.mjs`.

Composición `Recorrido046`, 1080×1920 a 30 fps, **1291 f (43,03 s)**. Los 2 CORTES SECOS (alcoba → baño, baño → terraza) caen en un golpe MEDIDO de «Children» (8,3 y 9,2 dB; piano: el canal exige ≥ 7,4) y las 7 DISOLVENCIAS van libres (regla del piano); las de la Social Kitchen (11,4 dB), su otro lado (8,1 dB) y la alcoba (11,2 dB) acaban, además, en un golpe. Los tiempos de fuente son los del MP4 NORMALIZADO (HK03, de 29,97 fps, tiene 186 fotogramas a 30; los recorridos son anamórficos 9:16 y entran ENTEROS, sin recorte: rev. 1).

## Los planos

| id | bloque | clip | en | dur (f) | dur (s) | fuente (s) | vel. | golpe en que entra | entra |
|---|---|---|---|---|---|---|---|---|---|
| c02-hook | 2 | hk03.mp4 | 0 | 184 | 6.13 | 0.00–6.13 | ×1 |  | corte |
| c03-piscina | 3 | rc17.mp4 | 184 | 72 | 2.40 | 3.00–5.40 | ×1 |  | disolver |
| c04-social | 3 | rc11.mp4 | 256 | 91 | 3.03 | 1.40–4.43 | ×1 | social 11.4 dB | disolver |
| c05-social-vista | 3 | rc12.mp4 | 347 | 88 | 2.93 | 0.40–3.33 | ×1 | vista 8.1 dB | disolver |
| c06-mitad-uno | 4 | md02.mp4 | 435 | 108 | 3.60 | 0.67–4.27 | ×1 |  | disolver |
| c07-mitad-dos | 4 | md03.mp4 | 543 | 198 | 6.60 | 0.60–7.20 | ×1 |  | disolver |
| c08-alcoba | 5 | rc05.mp4 | 741 | 104 | 3.47 | 3.60–7.07 | ×1 | alcoba 11.2 dB | disolver |
| c09-bano | 5 | rc09.mp4 | 845 | 90 | 3.00 | 3.00–6.00 | ×1 | bano 8.3 dB | corte |
| c10-terraza | 5 | rc18.mp4 | 935 | 151 | 5.03 | 0.10–5.13 | ×1 | terraza 9.2 dB | corte |
| c11-cta | 6 | ct02.mp4 | 1086 | 145 | 4.83 | 0.73–5.57 | ×1 |  | disolver |
| c12-cierre | 6 | cierre-oscuro.png | 1231 | 60 | 2.00 | — | ×1 |  | corte |

11 cortes · 1291 f (43.03 s)

## Lo que hace cada plano ahí (`reason`) y de dónde sale su golpe

| Plano | Espacio | Función | Golpe de la canción (s) |
|---|---|---|---|
| c02-hook | escaleras exteriores, el edificio detrás | situar la necesidad: Isabella desde el f0, «cuando llegas a una ciudad que no es la tuya…» | 175,883 · 9,7 dB (suena en el f3, baja bajo su voz) |
| c03-piscina | las dos piscinas y el carril de nado entre los árboles (RC17, 3,0-5,4 s) | abrir el paseo de la unidad, sin voz | disolvencia libre |
| c04-social | la Social Kitchen, el mostrador y las lámparas (RC11, 1,4-4,43 s) | del agua a un sitio donde juntarse; sigue girando a la derecha | disolvencia que acaba en 184,329 · 11,4 dB |
| c05-social-vista | la Social Kitchen desde el otro lado, más cerca (RC12) | el último espacio de la unidad antes del acompañamiento | disolvencia que acaba en 187,344 · 8,1 dB |
| c06-mitad-uno | la terraza común, la pérgola con las plantas (MD02) | qué trae el acompañamiento: «te acompañamos desde el día uno…» | disolvencia libre |
| c07-mitad-dos | la terraza común, bajo la pérgola (MD03) | la lista concreta: «chef privado, tours, masajes y transporte…» | disolvencia libre |
| c08-alcoba | la alcoba principal (RC05) | lo privado: la cama, la puerta del baño | 200,474 · 11,2 dB (acaba la disolvencia) |
| c09-bano | el baño principal (RC09) | cuidado y calma, el mueble de madera y el espejo | 203,935 · 8,3 dB |
| c10-terraza | la terraza al atardecer (RC18) | el clímax: la ciudad, el horizonte y la pérgola; la recompensa | 206,945 · 9,2 dB |
| c11-cta | el jardín (CT02) | la invitación: «…un apartamento amoblado… escríbeme» | disolvencia libre; la canción cae sola (211,5 s) |
| c12-cierre | tarjeta oscura | logo y web; la música ya se apagó (f1190) | — |

## Voz y audio (frames de la composición)

| Toma | Entra | Primera palabra | Última palabra | Aire hasta lo siguiente | Música: baja en… | sube en… |
|---|---|---|---|---|---|---|
| HK03 | f0 (a corte) | f17 | f169 | 3 f hasta que empieza la disolvencia (f172) | f4-f14 (10 f, tras el golpe del f3), acaba 3 f antes de hablar | 24 f (f169-f193, dentro de la unidad) |
| MD02 | f435 (disolvencia) | f436 | f525 | 6 f hasta la disolvencia a MD03 | f424-f434, acaba 2 f antes de hablar | NO sube: sigue abajo hasta MD03 |
| MD03 | f543 (disolvencia) | f545 | f725 | 4 f hasta la disolvencia a la alcoba | (abajo) | 14 f (f725-f739), antes del golpe del f741 |
| CT02 | f1086 (disolvencia) | f1087 | f1213 | 18 f hasta el final de la toma (negro exacto en el f1230) | f1066-f1086, acaba antes de hablar; la canción ya cae sola | se apaga a 0 en el f1190 |

La voz: ≈ −15 LUFS en su ventana (medida sobre el WAV tratado: −15,0 · −15,0 · −15,1 · −15,0), pico real −2,5 dBFS (limitador ≤ 1,2 dB). La música sola: −15 LUFS por tramos (apertura −3,8 dB, paseo −3,9, bloque 5 −5,5 sobre el archivo); bajo la voz, −26 (11 LU).
