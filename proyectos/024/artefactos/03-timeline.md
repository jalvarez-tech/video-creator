# 03 · Timeline — proyecto 024

> Paso 3 de 3. Todo en frames absolutos de la composición, a 30 fps (1019 f = 33,97 s). Los planos son contiguos. Anterior: [02-layout.md](02-layout.md). La fuente de verdad es `remotion/src/proyectos/024/metraje-024.ts`. **Rev. 0** (primera prueba): los planos y la rejilla de cortes salen de `herramientas/rejilla-cortes.py` sobre los golpes medidos de *Maison*; el color por plano y las entradas (corte o disolvencia) se fijan al medir los saltos de luma.

## Los planos

Orden físico: la sala y la cocina abiertas, el balcón, y al fondo la alcoba principal con su baño y su vestier. `desde` en la fuente; `entra`: corte o disolvencia (de 12 f, que acaba en un golpe de la canción).

| Plano | Bloque | Espacio · función | Clip · `desde` | `en` | `dur` | Entra | Golpe (dB) |
|---|---|---|---|---|---|---|---|
| c02-hook | 2 | Sala · el hook (Isabella), **abre la pieza** | HK1 · 4 f (0,13 s) | 0 | 151 | corte | — (la música suena desde el f0, baja; su golpe cae en el f151) |
| c03-cocina | 3 | Cocina · la isla y la estufa | RC09 · 22,50 s | 151 | 82 | disolver | f151: 12,3 |
| c04-sala | 3 | Cocina → sala · se abre el espacio | RC06 · 12,50 s | 233 | 60 | disolver | 11,7 |
| c05-corredera | 3 | Sala · hacia la corredera | RC09 · 28,00 s | 293 | 59 | disolver | 11,8 |
| c06-balcon | 3 | Balcón · el destino del paseo | RC01 · 6,00 s | 352 | 72 | corte (salto de luma −3,3) | 13,5 (14,6 en el render) |
| c07-mitad | 4 | Balcón · la mitad (Isabella) | MD2 · 12 f (0,40 s) | 424 | 136 | disolver | 11,8 |
| c08-pasillo | 5 | Pasillo hacia el baño | RC09 · 6,00 s | 560 | 62 | disolver | 11,6 |
| c09-vestier | 5 | Vestier · cómo se vive | RC09 · 12,00 s | 622 | 90 | disolver | 13,1 |
| c10-alcoba | 5 | Alcoba principal · el descanso | RC10 · 2,80 s | 712 | 59 | disolver | 11,4 |
| c11-vista | 5 | Ventanal · la vista (la más larga) | RC08 · 0,40 s | 771 | 110 | disolver | 8,1 (6,8 medidos en el render) |
| c12-cta | 6 | Alcoba principal · el CTA (Isabella) | CT1 · 97 f (3,23 s) | 881 | 78 | corte | 10,3 |
| c13-cierre | 6 | Tarjeta oscura (logo + web) | `cierre-oscuro.png` | 959 | 60 | corte | — |

(Las entradas y los `desde` son los de partida; los saltos de luma medidos pueden cambiar un corte por una disolvencia.)

## La voz

| Toma | Voz (s de la fuente) | LUFS | Ganancia a −21 | Primera palabra | Última palabra |
|---|---|---|---|---|---|
| HK1 | 0,36 → 4,55 | −24,73 | +3,7 dB | f6,8 (entra a corte con `desde` 4 f) | f132,5 |
| MD2 | 0,65 → 4,34 | −24,61 | +3,6 dB | f431,5 (7,5 f tras el golpe del f424) | f542,2 |
| CT1 (2.ª frase) | 3,52 → 5,37 | −22,8 | +1,8 dB | f889,6 (8,6 f tras el golpe del f881) | f945,1 |

(La voz de CT1 que usa la pieza es la 2.ª frase: entre «Envigado» y «Si quieres» hay 0,38 s de silencio real, 3,14-3,52 s; `limites-voz.py` marca la toma entera, 0,66-5,39 s.)

## La música («Emilio Piano ft. Lucie – Maison», sha 8 `df2be878`)

Piano neoclásico, sin pulso. **Suena desde el f0** (se usa desde 137,97 s, `INICIO_MUSICA` 4139/30; baja bajo el hook, 3 f de entrada) y su golpe de 142,95 s (12,3 dB) suena entero en el f151, donde empieza el paseo. Meseta de **−17,5 LUFS** (−17,0 en las ventanas de voz del hook y de la mitad) hasta 168,0 s; **caída final** desde 168,5 s (f917, dentro de la toma del CTA, que va de f881 a f959): −17,6 → −30,1 → silencio digital en tramos de 5 s; silencio hacia los 171,7 s. Cada corte cae en un golpe medido (`musica/golpes-024.json`), comprobado sobre el audio del render (`golpes-render.py`, R33). Envolvente: música sola a −15 LUFS y −16 dB más abajo mientras habla ella; en la mitad y el CTA la bajada acaba antes de la primera palabra, y la subida empieza al callar.

## El color (R32)

Cada plano de vídeo lleva `color: color({…})`: la base de Luxur (`COLOR_BASE`) más un ajuste, medido con `herramientas/medir-color.py` sobre stills a escala 0,5 con y sin graduar (`pruebas-720p/color-rev0.txt`, `panel-color.png`). Dos fuentes (Isabella en HLG tone-mapeado; los recorridos, SDR). Ajustes: Isabella `saturation` 1,02 (≤ 1,06) en el hook y el CTA y **0,98 en la mitad** (la madera del piso y el ladrillo dan 0,39 con la base: con 0,98 la piel vuelve a 0,39 frente a 0,37 sin graduar); el balcón a 1,0 (gres, ladrillo y madera: 0,32 → 0,29); el pasillo y el vestier (RC09, una toma partida: el MISMO color) a 0,95 con `shadows` 0,14 y `blacks` −0,04 (la madera de un vestier mide 0,40 de saturación: **es así**); la cocina y la corredera (RC09) con `shadows` 0,14 y `blacks` −0,04; la vista con `shadows` 0,26, `blacks` 0,02 y `contrast` 1,04 (con la base el marco negro del ventanal aplastaba el 12,9 %; ahora el 3,6 %, como sin graduar: 3,3 %); el CTA con `exposure` 0,06 y `shadows` 0,16 (su luma de entrada baja de 136,9 a 127,9 desde la vista: −9,3 sin graduar y −10,3 con la base; con el ajuste, −7,6).

**Saltos de luma** entre el último fotograma de un plano y el primero del siguiente, a corte y sin graduar: +9,5 (hook → cocina), −8,5 (cocina → sala), +10,4 (sala → corredera), −24,3 (balcón → mitad), **+36,1 (mitad → pasillo)**, +13,8 (pasillo → vestier), **−35,2 (vestier → alcoba)**, −9,0 (vista → CTA); **se arreglaron entrando con disolvencia** (`desde` ≥ 12 f, 7 planos) todos menos la corredera → balcón (−3,3), la alcoba → vista (+4,7; la vista entra también con disolvencia, por el golpe) y el CTA (a corte por el aire de la toma: −7,6 con el color final).

**Piel de Isabella** (tono, sat): hook 19,1° → 19,8°, 0,45 → 0,46 · mitad 17,5° → 17,4°, 0,37 → 0,39 · CTA 15,4° → 14,5° (14,0° → 13,0° en f940), 0,40 → 0,44. El tono se movió menos de 1°.

**Entre planos:** luma media 131,5 (σ 11,8; sin graduar 130,5, σ 11,7), saturación media 0,260 (σ 0,074; sin graduar 0,233), quemado máx 4,3 %, aplastado máx 7,4 % (la corredera, su marco negro). La base añade saturación y no iguala la luma: la dispersión de luma entre planos es la de los clips (107-152).

## Metraje compartido con la V6 y la V7

**Ni un segundo solapado** de recorrido (la puerta, sección 7b, lo mide contra las dos). Lo que sí repite es la voz y la toma de CT1 de la V6 (la 2.ª frase).
