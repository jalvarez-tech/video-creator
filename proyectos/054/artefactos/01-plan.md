# 01 · Plan narrativo — proyecto 054 · Casa en Condominio Los Bravos, La Ceja (V36)

> Paso 1 de 3. Siguiente: [02-layout.md](02-layout.md) · [03-timeline.md](03-timeline.md).
> El código sale de aquí: `remotion/src/proyectos/054/` · puerta `node proyectos/054/revisar-054.mjs`.

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Encargo (2026-10-21) | **3 reels por propiedad** en tres propiedades nuevas (Casa Los Bravos, Palmazera, Quadrato), una sesión por reel. Este es el **V36 / 054**, el primero de la Casa en Condominio Los Bravos, con el ángulo **«Privacidad: el lujo real es no tener a nadie encima»**. Estructura fija **aérea · hook · recorrido · mitad · recorrido · CTA**, tres frases de Isabella y ni una más, voz a −15 LUFS, final SOLO con el OK del usuario. Entrega: reel (CRF 12 + CRF 16), `.srt`, portada 9:16, versión con ficha (1:1, sin subtítulos) y caption de Instagram |
| Ficha | [propiedadesluxur.com · Casa en Venta en Condominio Los Bravos, La Ceja, con Lote de 500 m²](https://propiedadesluxur.com): **venta · COP 1.380 M** · 220 m² construidos + lote de 500 m² · 4 alcobas (una en el primer piso) · 4 baños · 2 parqueaderos + visitantes · 2016 · condominio de **solo 6 casas**, zona BBQ, área verde privada, 3 balcones, pet friendly. **La web se contradice** («500 m² construidos» en un sitio y 220 + 500 en la ficha): vale la ficha. **Nada de esto sale en el vídeo salvo las dos cifras que dice Isabella** (50 min, 120.000); el resto va al caption |
| Material | `Casa - La Ceja/Videos/` (SSD): 28 recorridos y 3 tomas de Isabella en **iPhone, SDR BT.709, 1080×1920 verticales a ≈ 60 fps variable** (no HDR, no rotación); el dron, **4K vertical** (`rotation=90`, 29,97 fps, SDR, sin audio). Se trabaja con COPIAS en `proyectos/054/original/` verificadas por sha256 (`normalizar.mjs`) |
| Composición | `Recorrido054` · 1080×1920 · **30 fps** · 1153 f (38,4 s) |
| Texto | **editorial**, solo mientras habla Isabella, abajo, un acento por frase |
| Marca | Luxur. Reglas fijas: primera toma sin texto ni voz · nunca el sello · cierre en tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` · nada se congela |
| Número | V36 / 054, el de `proyectos/054/reparto-054-062.md` (que MANDA). 055 (V37) y 056 (V38) son las otras dos de la casa, en el mismo checkout |

## El hilo y la idea en una línea

**Esta casa es para quien quiere espacio propio y está cansado de vivir encima de otros**: el hook dice la tesis («el lujo real no es tener una torre con vista, es no tener vecinos encima»), el recorrido la **demuestra con lo que una torre no tiene** —el jardín propio cercado por su seto, la sala de doble altura abierta a él, el ventanal que da solo al verde— y la mitad contesta la objeción que sale sola cuando alguien oye «privacidad»: la lejanía y el costo («a 50 minutos de Medellín, con una administración de 120.000»). El CTA repite la palabra del hook («si valoras espacio y privacidad…»).

| Pieza | Elegida | Por qué |
|---|---|---|
| Hook | **HK01** `IMG_8815` (7,9 s; voz 1,06-4,82 s) | La tesis del ángulo, dicha por ella caminando por la terraza con la casa y el seto detrás. Es la del reparto |
| Mitad | **MD04** `IMG_8820` (14,7 s; voz 0,82-4,42 s) | La objeción de la lejanía y del costo, con DOS cifras (se escriben las dos). Es la del reparto. Los 10 s que le quedan al clip (la cámara se aparta y recorre la sala) no se usan |
| CTA | **CT06** `IMG_8918` (8,6 s; voz 1,02-5,94 s) | «Si valoras espacio y privacidad, este espacio te va a encantar. Escríbeme y agendemos una visita»: cierra con la palabra del hook y con una sola acción. Es la del reparto |
| Aérea | **DR01** `DJI_…0070_D.MP4`, **57,0-59,77 s** (POR ENCARGO del usuario en la rev. 1: «la toma del dron empiézala en 0:57»; la rev. 0 usaba 9,0-11,77 s, del primer tercio que el reparto daba a esta versión; el tercio central, 35-68 s, no es de ninguna) | La casa vista desde arriba, con su tejado de teja, la fachada blanca, el seto y el césped. Movimiento uniforme (dispersión 0,126). **Al fondo, arriba, se ve una casa vecina del condominio y un patio con dos motos**: contradice un poco el hilo, pero es la toma que pidió el usuario |
| Canción | ***Luxury, Elegance, Refined*** (`4d36ea48`) | La reservada en el registro (REPETIDA de otra propiedad, autorizada por el usuario el 2026-10-21: quedaban 4 libres para 9 reels). Lounge plano, −14,6 LUFS de principio a fin: no tiene caída que buscar, pero sí 268 golpes y una rejilla de cortes fuertes |

## Promesa y CTA

- **Promesa (primeros 3 s):** el dron mira la casa desde arriba, con su tejado, su seto y su césped; a corte, Isabella sale por la puerta y camina por la terraza: «El lujo real no es tener una torre con vista, es no tener vecinos encima.»
- **Acción:** «Escríbeme y agendemos una visita» (el contacto va en el caption).
- **Lo que NO se cuenta:** metros, alcobas, baños, parqueaderos, año, precio (ni se oyen ni se leen), rentabilidad ni valorización. Solo las dos cifras de la mitad.

## Bloques

Tres frases de Isabella (12,0 s de voz en 38,4 s); el resto es la casa con música.

| Bloque | Planos | Qué es | Lo que dice | Clip |
|---|---|---|---|---|
| 1 · aérea | c01 | la casa desde arriba: el tejado de teja, la fachada blanca, el seto y el césped; **sin texto ni voz** (el frame 0 es la miniatura) | — | DR01 57,0-59,77 s |
| 2 · hook | c02 | Isabella sale por la puerta y camina por la terraza hacia el césped | «El lujo real no es tener una torre con **vista**, es no tener **vecinos encima.**» | HK01 `IMG_8815` |
| 3 · recorrido | c03 c04 c05 c06 | el jardín propio (césped, seto y pérgola) → el paso por el ventanal abierto a la sala → la sala de doble altura con sus ventanas altas → el ventanal de la sala al verde | — | RC02 0,1-1,37 · RC25 4,2-5,6 · RC01 3,7-5,23 · RC03 3,4-4,77 |
| 4 · mitad | c07 | Isabella sentada en el sofá de la sala, con la repisa de piedra y el ventanal al jardín | «Está a los **50 minutos** de Medellín con una administración de 120.000.» | MD04 `IMG_8820` |
| 5 · recorrido | c08 c09 c10 c11 c12 | la cocina con su isla → la puerta de la alcoba que se abre → el jacuzzi junto a la cama → el sendero lateral junto al muro, con el césped y los árboles → **la vista**: la fachada y el árbol sobre el césped (el plano más largo del bloque) | — | RC06 5,3-7,03 · RC07 0,8-3,0 · RC13 0,0-1,63 · RC22 0,0-2,6 · RC24 3,9-7,7 |
| 6 · CTA | c13 c14 | Isabella camina hacia cámara por el césped; funde a negro; tarjeta | «Si valoras espacio y **privacidad**, este espacio te va a encantar. **Escríbeme** y agendemos una visita.» | CT06 `IMG_8918` |

**Por qué estos planos: de afuera hacia adentro y vuelta.** El recorrido empieza en el jardín (lo que el hook promete: nadie alrededor), entra por el ventanal abierto (el verde no queda fuera de la casa) y avanza bajo las ventanas altas de la sala de doble altura (el espacio que no comparte techo con nadie); tras la mitad sigue por donde se vive —la cocina, la puerta de la alcoba que se abre y el jacuzzi (la intimidad)— y sale a la terraza para acabar en la vista de la casa entera sobre su césped, donde ella espera con el CTA. **Se evitó lo que contradice el hilo:** los balcones de RC09/RC10/RC15-RC17 dan a la calle del condominio y a las casas vecinas (amarilla y de ladrillo), y la terraza de RC23 deja ver el tejado de ladrillo detrás del seto.

## Lo que este reparto cuesta y se declara

- **La voz del hook va flaca.** Isabella camina con viento (−24 LUFS crudos, el viento a −26 dB del pico) y la voz tratada sube +18,6 dB: se oye el viento un poco más que en otras tomas. Se recorta fuera de la frase (`VENTANA_VOZ`).
- **Isabella sale de cuadro al final de dos tomas.** En la mitad, la cámara se aparta de ella desde 4,45 s (su última palabra acaba a 4,42 s): los últimos 28 f del plano son la sala vacía (lo que le queda de plano hasta el golpe siguiente); en el CTA ella sale por la izquierda en los últimos 0,5 s de su frase («…una visita») y esos 14 f finales son la fachada con la pérgola.
- **El CTA empieza con ella muy pequeña y lejos** (camina desde el fondo del césped): en los primeros segundos de su frase se ve pequeña y de cuerpo entero junto al seto, y se acerca según habla.
- **Hay un perro en el CTA** (un perro pequeño marrón camina con ella): es de la toma.
- **Metraje compartido con las otras dos versiones de la casa:** ninguno (la puerta, sección 7b, da «ni un segundo en común» con la V37 y la V38; acordado con la sesión 055, ver `combinaciones.md`). Los tramos de recorrido de esta versión son RC02 0,1-1,37 · RC25 4,2-5,6 · RC01 3,7-5,23 · RC03 3,4-4,77 · RC06 5,3-7,03 · RC07 0,8-3,0 · RC13 0-1,63 · RC22 0-2,6 · RC24 3,9-7,7.
- **Dos cifras en pantalla** (50 minutos y 120.000), como manda la regla del canal (cifra dicha = cifra escrita); la web dice «administración de bajo costo» sin cifra, y la 120.000 sale de la voz de Isabella.

## Música

*Luxury, Elegance, Refined* (lounge / smooth chill instrumental, Re menor, 86 BPM). Entra en **45,227 s** (golpe de 17,8 dB en el frame 3: la pieza abre con él). **Todos los cortes son secos y caen sobre un golpe medido** (10,4-17,7 dB; los de frontera de bloque, ≥ 11 dB). La canción es plana (−14,4 / −14,4 / −14,9 LUFS en los tramos sin voz): la música sola queda a −15 LUFS con ganancias de −0,6 / −0,6 / −0,1 dB, y bajo la voz a **−26 LUFS** (11 LU bajo ella) con una ganancia fija por ventana. **La música baja con curva de coseno desde el golpe del corte y acaba 2 f antes de la primera sílaba**, sube tras la última palabra del hook y de la mitad y llega arriba antes del golpe siguiente, y bajo el CTA se apaga a cero con curva justo en su última palabra (la tarjeta, en silencio; la canción trae golpes hasta el final). Medida, **no oída**; licencia **no verificada**.

## Pendientes con el usuario

- Oír las palabras POR CONFIRMAR (lista con segundos en `combinaciones.md`) antes de la final: «vista» y «vecinos» (hook), **«Está a los»** (mitad: la lectura dudosa) y «valoras» (CTA).
- El OK de la prueba (no se exporta la final sin él).
- Oír la canción y confirmar su licencia.
- Que se oiga el hook: la voz va con viento.
