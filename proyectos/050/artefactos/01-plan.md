# 01 · Plan narrativo — proyecto 050 · Tierra Grata Bosque Santo (El Poblado), ARRIENDO · V32 del registro («14,8»), sexto de los seis reels de arriendo

> Paso 1 de 3. Escrito con el reparto de la sesión coordinadora (`proyectos/044/reparto-045-050.md`), el catálogo del material (`proyectos/044/catalogo-material.md`), la ficha de la web y lo aprendido en el 043 (`aprendizajes.md` y `combinaciones.md`) y en el 021 y el 023 (los reels que abrieron con el hook), y **antes** del primer render. Siguiente: [02-layout.md](02-layout.md).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | Encargo del usuario (2026-10-19): *«voy a empezar a promocionar el arriendo … 6 videos para redes sociales, cada video en 2 formatos: uno para el funnel y el otro para post orgánicos. No tengo videos de dron: haz una combinación de empezar con una toma del apartamento y otros directamente con el hook. Cada video en una sesión diferente con Sonnet 5.5».* Esta sesión monta el **050 / V32 «14,8»**: abre con el hook, lleva la única cifra de la serie y su clímax es el balcón de RC02. Tomas, apertura, clímax y canción vienen **fijados** por el reparto y no se cambian (la canción sí se mide: sirve). |
| Numeración | **V32 / 050.** Las V27-V31 (045-049) son de sesiones hermanas, a la vez, cada una en su worktree (sus reservas viven en el registro de uso, `archivos/musica/registro-de-uso.md` §1-§2). |
| Los dos formatos | **Orgánico** (esta pieza, con subtítulos editoriales: `finales/050-recorrido.mp4`) y **funnel** (la «versión con ficha» de `ficha-luxur`: el mismo vídeo SIN subtítulos y con `APARTAMENTO EN RENTA · El Poblado · Tierra Grata · $ 14,8 M COP / MES` fijo en el tercio bajo del 1:1: `finales/050-recorrido-ficha.mp4`). La composición acepta `sinSubtitulos`. |
| La propiedad y la ficha | Apartamento amoblado en **ARRIENDO** en Tierra Grata Bosque Santo (El Poblado, Medellín, «a pocos metros de la Avenida Las Palmas»), piso 9 · 113 m² · 2 habitaciones · 2 baños · 2 parqueaderos · balcón con jacuzzi privado · **COP 14.800.000 al mes** (JSON-LD `offer-rent`). La misma unidad está en venta: la pieza no la nombra. **Dicho por Isabella** (17-oct): aseo semanal incluido · apartamento amoblado · «catorce millones ochocientos que incluyen experiencias pensadas para ti» · acompañamiento personalizado. **No consta, y no se afirma**: administración, condiciones del contrato, minutos a ningún sitio, qué incluye exactamente el «acompañamiento» ni si las experiencias se pagan aparte. |
| Material | `proyectos/050/original/` (copiado del SSD con el CÓDIGO del catálogo por nombre); sha256 en `normalizar.mjs`: HK02 `4cc73e1d` (`IMG_4272`), MD04 `cfd314e1` (`IMG_4296`), CT02 `f7ed79ff` (`IMG_4294`), RC02 `d49b8a0b`, RC06 `556bee38`, RC09 `8b1031a3`, RC12 `7bc5ad03`, RC14 `59647a5b`, RC17 `c99bc2f1`, música `fe252090`. Las tres tomas de Isabella son 4K **HLG vertical** (`rotation=-90`; tone-map con VideoToolbox) a 30 fps; **los seis recorridos son HORIZONTALES 1920×1080 SDR** y entran con `crop=608:1080:656:0` ANTES de `scale=1296:2304` (catálogo §7). |
| Composición | `Recorrido050` · 1080×1920 · **30 fps** · **1062 f (35,4 s)**. Clips normalizados a 1296×2304 y 30 fps (`remotion/public/recorrido-050/`, fuera de git). |
| Formato | 9:16 vertical · `recorrido-luxur` SIN dron (no lo hay) y SIN «casa» al principio: HOOK · RECORRIDO (la unidad) · MITAD · RECORRIDO (el apartamento, con su clímax) · CTA · tres frases de Isabella. Bloques 2-3-4-5-6. |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor); **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com`. |
| Destino | Reels · Shorts · TikTok (orgánico) · Meta Ads / feed 1:1 (funnel). |
| Presentadora | Isabella Cadavid (asesora de la ficha). Vestido negro, las tres tomas del 17-oct en las zonas comunes de la unidad. |

## EXCEPCIÓN DECLARADA: la pieza abre con el hook

La regla fija 1 del canal («la primera toma sale SIEMPRE sin texto ni voz; el frame 0 es la casa limpia») **no se cumple en esta pieza, por encargo del usuario** (como el 021 y el 023: «no tengo vídeos de dron: … otros directamente con el hook», 2026-10-19; el reparto fija esta pieza como una de las tres que abren así). Lo que cambia: el **frame 0 es Isabella**, sentada en el sillón de la terraza común; su primera palabra («El») suena en el f5 y su primer subtítulo entra en el f4; **la música ya suena, baja, bajo su voz** (sube del silencio en 3 f y se queda a ≈ −31 LUFS hasta que acaba el hook). Lo que **sigue** valiendo: nunca el sello, nada arriba, el cierre en la tarjeta oscura con el logo y la web, nada se congela. La puerta lo dice en su salida (`ABRE_CON_EL_HOOK`, sección 2b) y `revisar-050.mjs` lo comprueba.

## El ángulo: «14,8» (y en qué se distingue de las otras cinco)

**La idea en una línea:** este apartamento es para quien **llega a una ciudad que no es la suya y no quiere perder su tiempo**: el hook promete lo que más vale (su tiempo, con un aseo semanal incluido), el paseo por la unidad enseña dónde lo pasará (la piscina, el gimnasio, la Social Kitchen), la mitad da **la cifra y lo que incluye** («catorce millones ochocientos que incluyen experiencias pensadas para ti»), el apartamento enseña el sitio (la alcoba, el baño, el balcón) y el CTA pide una acción («escríbeme»).

| | V27 (045) | V28 (046) | V29 (047) | V30 (048) | V31 (049) | **V32 (050)** |
|---|---|---|---|---|---|---|
| Apertura | APTO · RC01 | HOOK | APTO · RC20 | HOOK | APTO · RC04 | **HOOK** |
| Hook | HK01 | HK03 | HK02 | HK01 | HK03 | **HK02** (la repite de la V29) |
| Mitad | MD01 | MD02 + MD03 | MD04 + MD05 | MD03 | MD05 | **MD04** (la repite de la V29; lleva el PRECIO) |
| CTA | CT01 | CT02 | CT03 | CT03 | CT01 | **CT02** (la repite de la V28) |
| Clímax | RC21 (el jacuzzi privado) | RC18 | RC03 | RC10 | RC19 | **RC02, tramo final** (el balcón) |
| Canción | *Fortitude* | *Children* | *Dreamlife* | *Einaudi Fly* | *In This Together* | ***Spring is Coming*** |

### Lo que NO cambia respecto de las otras (y se dice)

- **Solo hay 3 hooks, 5 mitades y 3 CTA del 17-oct para seis piezas:** HK02 va en la V29 y en esta; MD04 va en la V29 (seguida de MD05) y en esta (sola); CT02 va en la V28 y en esta. Ninguna pareja hook·CTA se repite entre las seis. HK02 y HK01 son **la misma frase** con otra puesta en escena (sentada / de pie): el hook de esta pieza y el de la V27 y la V30 dicen lo mismo.
- **Los recorridos se repiten entre piezas** (hay 22 clips para seis reels): la sección 7b de la puerta informa de cuánto metraje comparte esta pieza con cada hermana (hoy RC09 el baño, 1-2,6 s con la V27, V28 y V30; RC12 0,8 s con la V28; RC14 2,3 s con la V27 y la V31; RC17 1,6 s con la V31). Se eligieron RC17, RC06 y RC12 para no repetir el plano más usado por las demás (RC16, RC05) y se descartaron RC13 (enseña a dos socios del gimnasio de cerca) y el tramo 3,4-6,0 s de RC06 (una cruz de pared durante todo el plano). El baño solo tiene un clip (RC09): se repite.
- **El jacuzzi privado NO está en esta pieza.** La V27 (sesión del 045) lo encontró en RC21 (≈ 8,3-11,07 s, la caja de madera cuadrada con su escalón, la misma de la foto `3-Jacuzzi.png`) y se lo reservó de clímax: `Fotos/Web ficha 2026-10/3-Jacuzzi.png` y su nota en la carpeta de notas de la coordinadora. Se revisó RC02 entero (hoja de contactos a 1 s y el tramo final a 0,25 s), RC03, HK04 y HK05 y **el jacuzzi no sale en RC02**: el clímax asignado (el balcón con las camas) se mantiene. En RC03 (de ≈ 0 a 5 s, el balcón con las camas) **sí se ve, pequeño y al fondo a la izquierda, el jacuzzi privado** (la caja de madera con su escalón, entre la baranda y la puerta corredera): es el clímax de la V29, que lo declare esa sesión (nota en la carpeta de notas de la coordinadora).

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
| 2 | 6,8-14,7 | Recorrido (la unidad) | dónde pasará su tiempo | recorrido | la piscina bajo los pinos (RC17, 2,5 s; el «drop» de 16,5 dB) → el gimnasio (RC14, 2,6 s) → la Social Kitchen con su mural (RC12, 2,8 s) · solo música |
| 3 | 14,7-19,0 | Mitad | el precio | Isabella | MD04 en la Social Kitchen · «Catorce millones ochocientos que incluyen experiencias pensadas para ti.» · `$14.800.000` en pantalla |
| 4 | 19,0-28,1 | Recorrido (el apartamento) | el sitio | recorrido | la alcoba principal (RC06, 2,7 s) → el baño principal (RC09, 3,1 s) → el balcón con las camas blancas, la palma y la ciudad en el cristal (RC02 final, 3,4 s, el plano más largo: el clímax) · solo música |
| 5 | 28,1-33,4 | CTA | invitar | Isabella | CT02 en el jardín · «Si quieres un apartamento amoblado que tenga acompañamiento personalizado, escríbeme.» → funde a negro |
| 6 | 33,4-35,4 | Cierre | la marca | — | tarjeta oscura con el logo y `PropiedadesLuxur.com`; la música se apaga |

**Lectura del paseo (declarada).** Isabella está en la unidad; el apartamento solo existe en el recorrido. Paseo del reparto (§3): **hook → recorrido de la unidad → mitad (en la unidad) → recorrido del apartamento → clímax → CTA**. Dentro de cada bloque los planos giran **hacia el mismo lado (la derecha)** (la cámara de RC17, RC14, RC12, RC06, RC09 y RC02 avanza y gira a la derecha). La ciudad y el atardecer son la recompensa: **no se enseña la vista entera antes del bloque 5**. No hay «puentes humanos» (una mano, una taza): el material no los trae; se dice.

## La canción: lo medido (y por qué esa)

«Spring is Coming» (`fe252090`, neoclásico / ambient suave, 2:02, Do menor). Reservada para esta pieza en el reparto; se midió entera (`medir-pista.py`, `musica/golpes-050.json`): **216 golpes de ≥ 6 dB** con un **pulso suave de ≈ 0,47 s** (≈ 128 BPM) y ninguna caída (−15,1 LUFS de media; sonoridad por tramos de 5 s entre −20,5 y −13,1 hasta un fundido final de 118 a 120 s). No resuelve sola: la curva bajo la voz la hace el ducking con coseno (`audio-050.ts`) y se apaga en línea recta bajo la tarjeta. Se usan los 35 s que van del segundo **34,1** al 69,5.

- **Rejilla de cortes sobre golpes MEDIDOS** (`herramientas/rejilla-050.py`, derivada de `buscar-cortes-043.py`): los 8 cortes de la pieza caen cada uno en un golpe de **≥ 11,7 dB**: el paseo, 40,857 s (16,5 dB, el «drop»), 43,345 (13,2), 45,932 (16,7), la mitad 48,767 (13,9), 53,056 (12,3), 55,696 (15,0), el balcón 58,821 (12,9) y el CTA 62,165 (11,7). Con ≥ 12 dB no sale ninguna rejilla con estos planos (la mitad de ≥ 128 f necesita golpes separados 4,3 s y la canción no los da más fuertes): **la solución más débil es el corte del CTA (11,7 dB)**. El oído lo decide.
- **Entra ya bajo la voz** (no hay golpe en el f0): el segundo 34,1 cae en el f0. Mientras habla el hook suenan, a −16 dB, un golpe de 27,4 dB (35,1 s, en el f31) y otro de 19,3 (36,0 s, f59): se medirán en la prueba oída por si asoman bajo la voz.
- **Alternativa** (solo si no sirve): *Nils Frahm - Says* (último tercio, desde ≈ 372 s). No hace falta: sirve.
- **Licencia:** no verificada (pista de la biblioteca de Luxur). `HAY_MUSICA = false` en `audio-050.ts` es la salida.

## Decisiones tomadas (y las descartadas)

- **Hook = HK02 (asignado).** La voz de HK02 empieza a los **0,465 s** («El», 42,9 dB de subida; `limites-voz.py` daba 0,67: es «tiempo», la primera sílaba fuerte) y acaba a los 6,52 s; con `desde` 9 f la primera palabra suena en el f5 (≥ 3 f: el desclic). Quedan **POR CONFIRMAR AL OÍDO**: «aseo» (whisper: confianza 0,68 · 0,24 · 0,98; oye «asesor» en otros pases) y «incluyéndote» (p 0,72 · 0,62: ¿«incluyendo»?).
- **Mitad = MD04 (asignada).** `limites-voz.py` no ve su voz con el margen por defecto (la toma es la más baja de las tres, −23,3 LUFS): con `--margen 25` da 0,59-3,96 s; el perfil de energía da 0,555 («Ca», 32,9 dB de subida) y 4,17 s («ti»). Whisper oyó «catorce millones **de** ochocientos» con contexto y «14 millones 800» sin él: el catálogo dice «catorce millones ochocientos» y la cifra de la pantalla sale del catálogo (`$14.800.000`, el canon mensual). Queda **POR CONFIRMAR AL OÍDO** si dice «de».
- **CTA = CT02 (asignada).** «amoblado» (whisper: «movilado», «movelado», «moblado»; confianza 0,27 en la primera sílaba) **POR CONFIRMAR AL OÍDO**. La palabra es la que la propia ficha de la pieza usa («apartamento amoblado»), pero el oído decide.
- **Clímax = RC02, tramo final (asignado).** Del 26,0 s al último fotograma (29,37 s, 101 f). De 21 a 26 s la cámara baja al suelo, hay un dedo en el objetivo (21,0 s) y gira mucho: se evita. Los 3,4 s que se usan son un paneo de la pared y la palma a las camas blancas sobre la baldosa negra con el cristal y la ciudad al fondo, y un final casi quieto. **Es más corto de lo que pedía la rejilla ideal (4 s+)** y es el plano más largo del bloque 5 por 8 f (el baño dura 93).
- **El recorrido horizontal se recorta al centro** (`crop=608:1080:656:0`) y se escala ×2,13: **sale más blando que Isabella en 4K** (se dice en la prueba; no se filtra: R22).
- **Los tres sitios de Isabella son distintos** (la terraza común sentada · la Social Kitchen sentada · el jardín de pie), y los tres acaban en **su cara con un empuje 1,00 → 1,04**.
- **Ninguna cifra salvo `$14.800.000`**, escrita en pantalla como acento de la mitad (nunca en los bloques 3, 5 ni 6); la ficha va solo en la versión del funnel.
- **El color se casa plano a plano** (R32: `colorCorrection()`, medido con `medir-color.py`): los recorridos son SDR a mediodía con la piscina al atardecer y la alcoba y el baño blancos; las tomas de Isabella, HLG tone-mapeadas. Ver `combinaciones.md`.

## Lo que comparte con las otras versiones (declarado)

| Clip | Otras piezas | V32 |
|---|---|---|
| HK02 | V29 (047), el clip entero | 0,30-7,10 s (el hook entero, repetido) |
| MD04 | V29 (047), el clip entero (con MD05 detrás) | 0,20-4,47 s |
| CT02 | V28 (046) | 0,30-5,57 s |
| RC09 (baño) | V27 · V28 · V29 · V30 | 1,5-4,6 s |
| RC14 (gimnasio) | V27 · V30 · V31 | 0,0-2,6 s |
| RC17 (piscina) | V31 | 3,2-5,7 s |
| RC12 (Social Kitchen) | V28 | 0,0-2,83 s |
| RC06 (alcoba) | V31 | 0,0-2,67 s |
| RC02 (balcón) | ninguna (solo su tramo final; el principio, la sala, queda libre) | 26,0-29,37 s |

## Pendiente con el usuario

1. El OK a la prueba (`pruebas-720p/050-recorrido.mp4`, 540×960) y a lo declarado: **abre con el hook** (excepción), **el recorrido es horizontal recortado y más blando**, **el hook, la mitad y el CTA se repiten en otras piezas**, **el clímax es el balcón con las camas (el jacuzzi privado es de la V27)**.
2. **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto): «aseo» (HK02, f166 = 5,5 s) y «incluyéndote» (f137 = 4,6 s) · «catorce millones **(de)** ochocientos» (MD04, f453 = 15,1 s) · «amoblado» (CT02, ≈ f885 = 29,5 s).
3. La canción (medida, no oída; plana; licencia sin verificar).
