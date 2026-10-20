# 01 · Plan narrativo — proyecto 050 · Tierra Grata Bosque Santo (El Poblado), ARRIENDO · V32 del registro («14,8»), sexto de los seis reels de arriendo

> Paso 1 de 3. Escrito con el reparto de la sesión coordinadora (`proyectos/044/reparto-045-050.md`), el catálogo del material (`proyectos/044/catalogo-material.md`), la ficha de la web y lo aprendido en el 043 (`aprendizajes.md` y `combinaciones.md`) y en el 021 y el 023 (los reels que abrieron con el hook), y **antes** del primer render. Siguiente: [02-layout.md](02-layout.md).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | Encargo del usuario (2026-10-19): *«voy a empezar a promocionar el arriendo … 6 videos para redes sociales, cada video en 2 formatos: uno para el funnel y el otro para post orgánicos. No tengo videos de dron: haz una combinación de empezar con una toma del apartamento y otros directamente con el hook. Cada video en una sesión diferente con Sonnet 5.5».* Esta sesión monta el **050 / V32 «14,8»**: abre con el hook, lleva la única cifra de la serie y su clímax es el balcón con el jacuzzi privado de RC10. Tomas, apertura y canción vienen **fijadas** por el reparto y no se cambian (la canción sí se mide: sirve); **el clímax cambió por PEDIDO EXPRESO del usuario tras ver la prueba rev. 1** (ver «Rev. 2»). |
| Numeración | **V32 / 050.** Las V27-V31 (045-049) son de sesiones hermanas, a la vez, cada una en su worktree (sus reservas viven en el registro de uso, `archivos/musica/registro-de-uso.md` §1-§2). |
| Los dos formatos | **Orgánico** (esta pieza, con subtítulos editoriales: `finales/050-recorrido.mp4`) y **funnel** (la «versión con ficha» de `ficha-luxur`: el mismo vídeo SIN subtítulos y con `APARTAMENTO EN RENTA · El Poblado · Tierra Grata · $ 14,8 M COP / MES` fijo en el tercio bajo del 1:1: `finales/050-recorrido-ficha.mp4`). La composición acepta `sinSubtitulos`. |
| La propiedad y la ficha | Apartamento amoblado en **ARRIENDO** en Tierra Grata Bosque Santo (El Poblado, Medellín, «a pocos metros de la Avenida Las Palmas»), piso 9 · 113 m² · 2 habitaciones · 2 baños · 2 parqueaderos · balcón con jacuzzi privado · **COP 14.800.000 al mes** (JSON-LD `offer-rent`). La misma unidad está en venta: la pieza no la nombra. **Dicho por Isabella** (17-oct): aseo semanal incluido · apartamento amoblado · «catorce millones ochocientos que incluyen experiencias pensadas para ti» · acompañamiento personalizado. **No consta, y no se afirma**: administración, condiciones del contrato, minutos a ningún sitio, qué incluye exactamente el «acompañamiento» ni si las experiencias se pagan aparte. |
| Material | `proyectos/050/original/` (copiado del SSD con el CÓDIGO del catálogo por nombre); sha256 en `normalizar.mjs`: HK02 `4cc73e1d` (`IMG_4272`), MD04 `cfd314e1` (`IMG_4296`), CT02 `f7ed79ff` (`IMG_4294`), RC06 `556bee38`, RC09 `8b1031a3`, RC10 `e7e4ee8b`, RC12 `7bc5ad03`, RC14 `59647a5b`, RC17 `c99bc2f1`, RC20 `eed9445e`, RC22 `33ac8ce2`, música `fe252090`. Las tres tomas de Isabella son 4K **HLG vertical** (`rotation=-90`; tone-map con VideoToolbox) a 30 fps; **los ocho recorridos son HORIZONTALES 1920×1080 SDR** y entran con `crop=608:1080:656:0` (RC10, `x=1000`: con el centro el jacuzzi queda en el borde) ANTES de `scale=1296:2304` (catálogo §7). |
| Composición | `Recorrido050` · 1080×1920 · **30 fps** · **1150 f (38,3 s)**. Clips normalizados a 1296×2304 y 30 fps (`remotion/public/recorrido-050/`, fuera de git). |
| Formato | 9:16 vertical · `recorrido-luxur` SIN dron (no lo hay) y SIN «casa» al principio: HOOK · RECORRIDO (la unidad) · MITAD · RECORRIDO (el apartamento, con su clímax) · CTA · tres frases de Isabella. Bloques 2-3-4-5-6. |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor); **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com`. |
| Destino | Reels · Shorts · TikTok (orgánico) · Meta Ads / feed 1:1 (funnel). |
| Presentadora | Isabella Cadavid (asesora de la ficha). Vestido negro, las tres tomas del 17-oct en las zonas comunes de la unidad. |

## EXCEPCIÓN DECLARADA: la pieza abre con el hook

La regla fija 1 del canal («la primera toma sale SIEMPRE sin texto ni voz; el frame 0 es la casa limpia») **no se cumple en esta pieza, por encargo del usuario** (como el 021 y el 023: «no tengo vídeos de dron: … otros directamente con el hook», 2026-10-19; el reparto fija esta pieza como una de las tres que abren así). Lo que cambia: el **frame 0 es Isabella**, sentada en el sillón de la terraza común; su primera palabra («El») suena en el f5 y su primer subtítulo entra en el f4; **la música ya suena, baja, bajo su voz** (sube del silencio en 3 f y se queda a ≈ −31 LUFS hasta que acaba el hook). Lo que **sigue** valiendo: nunca el sello, nada arriba, el cierre en la tarjeta oscura con el logo y la web, nada se congela. La puerta lo dice en su salida (`ABRE_CON_EL_HOOK`, sección 2b) y `revisar-050.mjs` lo comprueba.

## Rev. 2 (pedido del usuario, 2026-10-19, tras ver la prueba): «incluye tomas Img 9538, Img 9536, Img 9509»

Entran **RC22** (`Img 9538`, el bar de noche con su neón), **RC20** (`Img 9536`, la sala a la hora azul) y **RC10** (`Img 9509`: el cielo, la ciudad y, de los 7,3 s al final, **el jacuzzi privado del balcón**). Cómo se resolvió (decisiones mías, declaradas):

- **Dónde van:** el paseo del apartamento pasa de 3 a 5 planos, en el orden físico de la casa y sin volver atrás: **sala (RC20) → bar (RC22) → alcoba (RC06) → baño (RC09) → balcón con el jacuzzi (RC10)**. El bloque de la unidad (piscina · gimnasio · Social Kitchen) no cambia.
- **El clímax es ahora el jacuzzi (RC10, 7,87 s al último fotograma, 86 f)** y **RC02 (las camas) sale** de la pieza: es lo que prevé el reparto («si el jacuzzi aparece en algún clip, úsalo de clímax en lugar del final de RC02») y el jacuzzi privado es el argumento de la ficha. Las camas de RC02 quedan libres para otra pieza.
- **RC20 y RC10 dejan de ser exclusivos**: RC20 era la apertura asignada a la V29 (047) y RC10, el clímax asignado a la V30 (048, que además lo descubrió: su nota en la carpeta de la coordinadora). La sección 7b de la puerta informa del solape (RC10: 2,7 s con la V30). **Hay que avisar a esas dos sesiones** (queda dicho en el informe).
- **La música se rehízo**: con nueve planos de recorrido la rejilla de cortes sobre golpes ya no sale a ≥ 11,7 dB sino a **≥ 10,3 dB** (`herramientas/rejilla-050.py`); la canción entra en el segundo 39,2 (antes 34,1) y la pieza dura 38,3 s (antes 35,4).
- **Coste visible:** el bar de noche (RC22) dura 1,7 s (50 f) y va entre dos planos de día; el paso mitad → sala (+42 de luma) y jacuzzi → CTA (−40) son los más duros (Isabella en un interior oscuro y un balcón a plena luz); la alcoba de frente (RC05) se sigue sin usar por estar en cuatro piezas hermanas.

## El ángulo: «14,8» (y en qué se distingue de las otras cinco)

**La idea en una línea:** este apartamento es para quien **llega a una ciudad que no es la suya y no quiere perder su tiempo**: el hook promete lo que más vale (su tiempo, con un aseo semanal incluido), el paseo por la unidad enseña dónde lo pasará (la piscina, el gimnasio, la Social Kitchen), la mitad da **la cifra y lo que incluye** («catorce millones ochocientos que incluyen experiencias pensadas para ti»), el apartamento enseña el sitio (la alcoba, el baño, el balcón) y el CTA pide una acción («escríbeme»).

| | V27 (045) | V28 (046) | V29 (047) | V30 (048) | V31 (049) | **V32 (050)** |
|---|---|---|---|---|---|---|
| Apertura | APTO · RC01 | HOOK | APTO · RC20 | HOOK | APTO · RC04 | **HOOK** |
| Hook | HK01 | HK03 | HK02 | HK01 | HK03 | **HK02** (la repite de la V29) |
| Mitad | MD01 | MD02 + MD03 | MD04 + MD05 | MD03 | MD05 | **MD04** (la repite de la V29; lleva el PRECIO) |
| CTA | CT01 | CT02 | CT03 | CT03 | CT01 | **CT02** (la repite de la V28) |
| Clímax | RC21 (el jacuzzi privado) | RC18 | RC03 | RC10 | RC19 | **RC10, tramo final** (el jacuzzi privado; por pedido del usuario: era el de la V30) |
| Canción | *Fortitude* | *Children* | *Dreamlife* | *Einaudi Fly* | *In This Together* | ***Spring is Coming*** |

### Lo que NO cambia respecto de las otras (y se dice)

- **Solo hay 3 hooks, 5 mitades y 3 CTA del 17-oct para seis piezas:** HK02 va en la V29 y en esta; MD04 va en la V29 (seguida de MD05) y en esta (sola); CT02 va en la V28 y en esta. Ninguna pareja hook·CTA se repite entre las seis. HK02 y HK01 son **la misma frase** con otra puesta en escena (sentada / de pie): el hook de esta pieza y el de la V27 y la V30 dicen lo mismo.
- **Los recorridos se repiten entre piezas** (hay 22 clips para seis reels): la sección 7b de la puerta informa de cuánto metraje comparte esta pieza con cada hermana (hoy RC10 el jacuzzi, 2,7 s con la V30; RC14 el gimnasio, 2,1-2,4 s con la V30 y la V31; RC12 la Social Kitchen, 2,5 s con la V28; RC09 el baño, 1-2 s con la V27, V28 y V30; RC17 la piscina, 0,9-1,7 s con la V28 y la V31). Se descartaron RC13 (enseña a dos socios del gimnasio de cerca) y el tramo 3,4-6,0 s de RC06 (una cruz de pared durante todo el plano). El baño solo tiene un clip (RC09): se repite.
- **El jacuzzi privado** lo encontraron la sesión de la V27 (RC21, ≈ 8,3-11,07 s), la de la V29 (RC03, 5,8-6,9 s, pequeño y lejano) y la de la V30 (RC10, 7,3-10,7 s: la tina cuadrada con listones de madera, su escalón, la baldosa negra y la baranda, igual que `Fotos/Web ficha 2026-10/3-Jacuzzi.png`). **Esta pieza lo usa de clímax con RC10** (pedido del usuario). En RC02 NO aparece (revisado entero a 1 s y su tramo final a 0,25 s); tampoco en los tramos mudos de HK04 y HK05.

## Promesa y CTA

- **Promesa (primeros 6,8 s):** Isabella sentada en el sillón bajo la pérgola de la terraza común, con la ciudad y las montañas detrás, dice que su tiempo es lo más valioso y que se lo optimizan, **con un aseo semanal incluido**. La música ya suena, baja.
- **Acción final:** «escríbeme»: UNA acción. El canal no está dicho en voz (cierre: logo y web; WhatsApp en el caption).
- **Lo que NO se cuenta:** metros, habitaciones, piso, parqueaderos, administración, contrato, qué se paga aparte, minutos a ningún sitio, la venta de la misma unidad; ninguna cifra salvo la del precio.

## El guion (lo único que dice Isabella: tres frases)

| Bloque | Toma | Lugar | Dice | Papel |
|---|---|---|---|---|
| 2 · hook | **HK02** | la terraza común, sentada en el sillón | «El tiempo es el activo más valioso de los seres humanos. Te ayudamos a optimizarlo, incluyéndote un aseo semanal.» | la promesa: tu tiempo vale; aquí lo cuidamos |
| 4 · mitad | **MD04** | la Social Kitchen | «Catorce millones ochocientos que incluyen experiencias pensadas para ti.» | el precio, con lo que incluye (la única cifra: subtítulo `$14.800.000`) |
| 6 · CTA | **CT02** | el jardín | «Si quieres un apartamento amoblado que tenga acompañamiento personalizado, escríbeme.» | la invitación, con una acción |

Arco: **promesa → precio → invitación**. Leído en voz alta: «El tiempo es el activo más valioso… te ayudamos a optimizarlo, incluyéndote un aseo semanal» → «catorce millones ochocientos que incluyen experiencias pensadas para ti» → «si quieres un apartamento amoblado que tenga acompañamiento personalizado, escríbeme». Las imágenes: la terraza (ella) → la piscina, el gimnasio y la Social Kitchen (la unidad: **dónde pasará su tiempo**) → ella allí, con la cifra → la alcoba, el baño y el balcón (**el apartamento**) → ella en el jardín.

## Escenas (los bloques)

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-6,8 | Hook | el tiempo, primero | Isabella | HK02 sentada en el sillón de la terraza común, a corte en el f0 · «El tiempo es el activo más valioso de los seres humanos. Te ayudamos a optimizarlo, incluyéndote un aseo semanal.» · música baja desde el f0 |
| 2 | 6,8-14,9 | Recorrido (la unidad) | dónde pasará su tiempo | recorrido | la piscina bajo los pinos (RC17, 2,8 s; el «drop» de 16,7 dB) → el gimnasio (RC14, 2,4 s) → la Social Kitchen con su mural (RC12, 2,9 s) · solo música |
| 3 | 14,9-19,2 | Mitad | el precio | Isabella | MD04 en la Social Kitchen · «Catorce millones ochocientos que incluyen experiencias pensadas para ti.» · `$14.800.000` en pantalla |
| 4 | 19,2-31,1 | Recorrido (el apartamento) | el sitio | recorrido | la sala a la hora azul (RC20, 2,6 s) → el bar de noche (RC22, 1,7 s) → la alcoba principal (RC06, 2,4 s) → el baño principal (RC09, 2,3 s) → el balcón con el jacuzzi privado y la ciudad (RC10 final, 2,9 s, el plano más largo: el clímax) · solo música |
| 5 | 31,1-36,3 | CTA | invitar | Isabella | CT02 en el jardín · «Si quieres un apartamento amoblado que tenga acompañamiento personalizado, escríbeme.» → funde a negro |
| 6 | 36,3-38,3 | Cierre | la marca | — | tarjeta oscura con el logo y `PropiedadesLuxur.com`; la música se apaga |

**Lectura del paseo (declarada).** Isabella está en la unidad; el apartamento solo existe en el recorrido. Paseo del reparto (§3): **hook → recorrido de la unidad → mitad (en la unidad) → recorrido del apartamento → clímax → CTA**. Dentro de cada bloque los planos giran **hacia el mismo lado (la derecha)** (la cámara de RC17, RC14, RC12, RC20, RC22, RC06, RC09 y RC10 avanza y gira a la derecha). La ciudad y el atardecer son la recompensa: **no se enseña la vista entera antes del bloque 5**. No hay «puentes humanos» (una mano, una taza): el material no los trae; se dice.

## La canción: lo medido (y por qué esa)

«Spring is Coming» (`fe252090`, neoclásico / ambient suave, 2:02, Do menor). Reservada para esta pieza en el reparto; se midió entera (`medir-pista.py`, `musica/golpes-050.json`): **216 golpes de ≥ 6 dB** con un **pulso suave de ≈ 0,47 s** (≈ 128 BPM) y ninguna caída (−15,1 LUFS de media; sonoridad por tramos de 5 s entre −20,5 y −13,1 hasta un fundido final de 118 a 120 s). No resuelve sola: la curva bajo la voz la hace el ducking con coseno (`audio-050.ts`) y se apaga en línea recta bajo la tarjeta. Se usan los 38 s que van del segundo **39,2** al 77,5.

- **Rejilla de cortes sobre golpes MEDIDOS** (`herramientas/rejilla-050.py`, derivada de `buscar-cortes-043.py`): los 10 cortes de la pieza caen cada uno en un golpe de **≥ 10,3 dB**: el paseo, 45,932 s (16,7 dB, el «drop»), 48,767 (13,9), 51,203 (13,9), la mitad 54,087 (13,2), 58,349 (11,8), 60,918 (12,1), 62,588 (11,7), 65,001 (**10,3**), el jacuzzi 67,35 (13,0) y el CTA 70,21 (10,9). Con los 3 planos de la unidad, la mitad de ≥ 126 f y los 5 del apartamento (el clímax, el más largo) **no sale ninguna rejilla a ≥ 10,5 dB** (la rev. 1, con 3 planos en el apartamento, salía a ≥ 11,7): es el coste de los tres planos que pidió el usuario. Se comprueba sobre el audio de la prueba (`golpes-render.py`, R33). El oído lo decide.
- **Entra ya bajo la voz** (no hay golpe en el f0): el segundo 39,2 cae en el f0. Mientras habla el hook suenan, a −16 dB, un golpe de 16,5 dB (40,857 s, f51) y otro de 13,2 (43,345 s, f126): se miran en la prueba oída por si asoman bajo la voz.
- **Alternativa** (solo si no sirve): *Nils Frahm - Says* (último tercio, desde ≈ 372 s). No hace falta: sirve.
- **Licencia:** no verificada (pista de la biblioteca de Luxur). `HAY_MUSICA = false` en `audio-050.ts` es la salida.

## Decisiones tomadas (y las descartadas)

- **Hook = HK02 (asignado).** La voz de HK02 empieza a los **0,465 s** («El», 42,9 dB de subida; `limites-voz.py` daba 0,67: es «tiempo», la primera sílaba fuerte) y acaba a los 6,52 s; con `desde` 9 f la primera palabra suena en el f5 (≥ 3 f: el desclic). Quedan **POR CONFIRMAR AL OÍDO**: «aseo» (whisper: confianza 0,68 · 0,24 · 0,98; oye «asesor» en otros pases) y «incluyéndote» (p 0,72 · 0,62: ¿«incluyendo»?).
- **Mitad = MD04 (asignada).** `limites-voz.py` no ve su voz con el margen por defecto (la toma es la más baja de las tres, −23,3 LUFS): con `--margen 25` da 0,59-3,96 s; el perfil de energía da 0,555 («Ca», 32,9 dB de subida) y 4,17 s («ti»). Whisper oyó «catorce millones **de** ochocientos» con contexto y «14 millones 800» sin él: el catálogo dice «catorce millones ochocientos» y la cifra de la pantalla sale del catálogo (`$14.800.000`, el canon mensual). Queda **POR CONFIRMAR AL OÍDO** si dice «de».
- **CTA = CT02 (asignada).** «amoblado» (whisper: «movilado», «movelado», «moblado»; confianza 0,27 en la primera sílaba) **POR CONFIRMAR AL OÍDO**. La palabra es la que la propia ficha de la pieza usa («apartamento amoblado»), pero el oído decide.
- **Clímax = RC10, tramo final (rev. 2; el reparto asignaba RC02 final).** Del 7,87 s al último fotograma (10,73 s, 86 f), recortado en `x=1000`: la cámara pasa del cielo y las torres al **jacuzzi privado** y acaba con la tina entera y centrada, con la baldosa negra y la baranda. Es el plano más largo del bloque 5 por 9 f (la sala dura 77). Un empuje mínimo (1,00 → 1,04) le da vida al final casi fijo. Las camas de RC02 (26,0-29,37 s; antes de ese tramo, un dedo en el objetivo y mucho giro) no entran.
- **El recorrido horizontal se recorta al centro** (`crop=608:1080:656:0`) y se escala ×2,13: **sale más blando que Isabella en 4K** (se dice en la prueba; no se filtra: R22).
- **Los tres sitios de Isabella son distintos** (la terraza común sentada · la Social Kitchen sentada · el jardín de pie), y los tres llevan un empuje 1,00 → 1,04.
- **Ninguna cifra salvo `$14.800.000`**, escrita en pantalla como acento de la mitad (nunca en los bloques 3, 5 ni 6); la ficha va solo en la versión del funnel.
- **El color se casa plano a plano** (R32: `colorCorrection()`, medido con `medir-color.py`): los recorridos son SDR (la piscina y la sala al atardecer o a la hora azul, el bar de noche, la alcoba y el baño blancos, el balcón a plena luz); las tomas de Isabella, HLG tone-mapeadas. σ de luma entre planos 24 → 15; los saltos más duros, en `combinaciones.md`. Ver `combinaciones.md`.

## Lo que comparte con las otras versiones (declarado)

| Clip | Otras piezas | V32 |
|---|---|---|
| HK02 | V29 (047), el clip entero | 0,30-7,10 s (el hook entero, repetido) |
| MD04 | V29 (047), el clip entero (con MD05 detrás) | 0,20-4,47 s |
| CT02 | V28 (046) | 0,30-5,57 s |
| RC10 (jacuzzi) | V30 (048), su clímax asignado (5,3-10,6 s) | 7,87-10,73 s: **comparten 2,7 s** (pedido del usuario) |
| RC20 (sala hora azul) | V29 (047), su apertura asignada | 6,0-8,57 s (por pedido del usuario) |
| RC22 (bar de noche) | ninguna | 1,53-3,2 s |
| RC09 (baño) | V27 · V28 · V30 | 1,7-4,03 s |
| RC14 (gimnasio) | V30 · V31 | 0,0-2,43 s |
| RC17 (piscina) | V28 · V31 | 3,2-6,03 s |
| RC12 (Social Kitchen) | V28 | 0,0-2,87 s |
| RC06 (alcoba) | V31 | 0,0-2,43 s |

## Pendiente con el usuario

1. El OK a la prueba (`pruebas-720p/050-recorrido.mp4`, 540×960) y a lo declarado: **abre con el hook** (excepción), **el recorrido es horizontal recortado y más blando**, **el hook, la mitad y el CTA se repiten en otras piezas**, **el clímax es el jacuzzi privado de RC10 (por tu pedido): comparte 2,7 s con la V30, y la sala de RC20 es la apertura de la V29**.
2. **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto): «aseo» (HK02, f166 = 5,5 s) y «incluyéndote» (f137 = 4,6 s) · «catorce millones **(de)** ochocientos» (MD04, f459 = 15,3 s) · «amoblado» (CT02, ≈ f973 = 32,4 s).
3. La canción (medida, no oída; plana; licencia sin verificar).
