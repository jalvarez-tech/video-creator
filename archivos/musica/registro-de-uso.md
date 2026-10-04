# Registro de uso — los reels de Propiedades Luxur

> **Para qué sirve.** Los reels se hacen desde checkouts, worktrees o clones distintos y, a veces, a la vez. Este registro dice qué canción,
> hook, mitad, CTA y dron usó cada versión de un reel de Los Patios, para no repetirlos: lo tachado (~~así~~) ya se usó o está reservado y no se
> vuelve a elegir salvo que el usuario lo pida. **Vive en git** (`archivos/musica/`): cualquier checkout lo tiene y cada cambio queda versionado.
> El AUDIO no está en el repo (son canciones comerciales y el repo es público): solo su catálogo (`catalogo-musica.md`), el sha256 de cada pista y este
> registro. El historial detallado de cada versión vive además en su proyecto (`proyectos/NNN/combinaciones.md`); esto es el tablero de coordinación.

## Cómo se usa (protocolo)

Cada sesión trabaja en su rama `feat/reel-NNN-…` (NNN = el número de proyecto de su versión). Para que las sesiones se vean entre sí, **las reservas se PUBLICAN al hacerlas**:

1. **Antes de elegir**, `git fetch origin` y lee este archivo en tu rama y en cada rama de reel remota (`git branch -r --list "origin/feat/reel-*"`, y `git show origin/<rama>:archivos/musica/registro-de-uso.md`). Lo reservado en otra rama cuenta como tachado; el siguiente V# y NNN son los mayores de todos más uno.
2. **Reserva en el acto, antes de montar nada**: añade tu fila a la tabla 1 con estado `reservada` (repo · rama, fecha), elige canción, hook, mitad, CTA y dron NO tachados y táchalos con tu V#. Haz commit SOLO de este archivo y `git push -u origin <tu rama>` enseguida.
3. **Vuelve a hacer `git fetch` y a leer**: si otra rama reservó lo mismo antes que tú (gana el commit más antiguo), elige otro (o renumera) y repite el paso 2.
4. Con la **prueba** entregada → estado `en prueba`; con el **final** exportado → `final`. Si abandonas la versión, destacha lo reservado y anota por qué.
5. Al copiar la canción elegida desde la biblioteca de música a `proyectos/NNN/original/`, su sha256 (8) tiene que ser el de la tabla 2: es lo que comprueba `normalizar.mjs`.

## 1. Versiones

| V | Proyecto | Repo · rama | Propiedad | Estado | Fecha | Notas |
|---|---|---|---|---|---|---|
| V1 | 017 | video-creator · PR #10 | Los Patios (apto 501) | final (CRF 12 y CRF 16) | 2026-10-03 | «La oportunidad»: HK02 · MD09 · CT07 · *Time* · dron DR147 al inicio |
| V2 | 018 | video-creator · PR #10 | Los Patios (apto 501) | final (la «en» del CTA sin oír) | 2026-10-04 | HK07 · MD07 · CT01 · *Return to Oasis* · dron DR155 al inicio · RC25 en la rev. 2 |
| V3 | 019 | video-creator · checkout del estudio (reserva publicada; el proyecto 019 sigue SIN commit: el usuario pidió no commitear) | Los Patios (apto 501) | **en prueba** | 2026-10-04 | «Altura sin torre»: RC25 limpio en el frame 0 · HK05 · dron DR152 como 1.er plano del recorrido · MD08 · CT05 · *Flying Into the Sun* (entrada 178,095 s) · pendiente: el OK a la prueba; oír MD08 «y (la) ventilación» (≈ 21,1 s), CT05 «escríbeme» (≈ 36,6-37,2 s) y la canción |
| V4 | 020 | video-creator · rama `feat/reel-020-definir` (worktree propio del estudio; el proyecto 020 SIN commit) | Los Patios (apto 501) | **en prueba** | 2026-10-04 | «Lo que todavía puedes definir» (pedido: canción tipo jazz): la calle RC22 en el frame 0 · HK03 · MD14 · CT06 · dron DR156 como último plano del bloque 5 · *Sax for the Last Customer* (entrada 137,615 s; su acorde final en f1183 resuelve tras el CTA) · 1253 f · 41,8 s · sin cifras · sentido I · ni un segundo de metraje compartido · pendiente: el OK a la prueba; oír «terminado» (HK03, ≈ 4,3-5,2 s) y «reto» (CT06, ≈ 36,9-37,1 s), la canción y la licencia; canal del CTA y si Luxur puede agendar |
| V5 | 021 | video-creator · rama `feat/reel-021-dentro-y-fuera` (worktree propio `.claude/worktrees/reel-021`; el proyecto 021 SIN commit) | Los Patios (apto 501) | **en prueba** | 2026-10-04 | «Dentro y fuera» (pedido: canción tipo piano): **sin apertura de la casa: el reel EMPIEZA CON EL HOOK** (rev. 2, pedido del usuario «elimina la primer toma y empieza con el hook»; rompe a propósito la regla fija «la primera toma sin texto ni voz»; la rev. 1 abría con el deck RC10) · HK06 · MD01 · **CT02 recortado a su 2.ª mitad «escríbeme y ven a conocerlo»** (decisión del usuario: ni el precio ni el «317» suenan, se leen ni se ven) · dron DR154 como plano CENTRAL del bloque 3 (no «primer plano del bloque 5», como decía la reserva) · *Andrea Vanzo – Amélie (reimagined)* (entrada 134,967 s; su decaimiento natural desde los 175 s resuelve bajo el CTA) · 1289 f · 43,0 s · sin cifras · sentido II · ni un segundo de metraje compartido · pendiente: el OK a la prueba; oír «Mira»/«Mirá» (HK06, ≈ 2,8 s), la canción y la licencia; si 1,7 s de voz bastan como CTA; canal del CTA |
| V6 | 022 | | Los Patios (apto 501) | **libre: es la siguiente** | | |

El siguiente número de versión es el primero con estado `libre`; si lo reservas, añade una fila nueva (V5 → 021…) para la que venga detrás.

## 2. Canciones (43)

Los detalles de cada una (género, sentimiento, BPM, `desde` por duración) están en `catalogo-musica.md`. «Medida, no montada» = golpes y arco medidos en una ventana de 50 s, sin montar ni oír.
**Licencia: no verificada en ninguna** (*Time* es una pista comercial; para publicar, el audio de la plataforma o `HAY_MUSICA = false`).

| Pista | sha256 (8) | Estado | V | Fecha | Notas |
|---|---|---|---|---|---|
| Aleksey Chistilin - Deep Breath | `abceb83c` | libre | | | Do# menor · 122 BPM · desde 79,90 (★★★, 45 s) · meseta de −10 dB hasta +35 s y cae a −25 dB: cae ~3 s antes del CTA (entrar ~3 s más tarde o acortar el recorrido). Medida, no montada. |
| ~~Aleksey Chistilin - Flying Into the Sun~~ | `ca1f1cbf` | **reservada** | V3 | 2026-10-04 | Do menor · «ascenso, libertad, esperanza» · entrada en 178,095 s (golpe de 10,1 dB tras un respiro) · SIN pulso: va por frases (`rejilla.py`: solo el 27 % de los golpes fuertes cae en la mejor recta) · crescendo suave hasta +30 s y CAÍDA de ≈ 20 dB en 4 s hacia +34,7 s (212,7 s) a un lecho suave estable: ahí entra el CTA · proyecto 019 (`buscar-entrada.py`, `proyectos/019/herramientas/`) |
| Aleksey Chistilin - Overcoming the Impossible | `856aff24` | libre | | | ver `catalogo-musica.md` (sin medir golpe a golpe) |
| Aleksey Chistilin - Pictures from the Past | `aed6a3a3` | libre | | | ver `catalogo-musica.md` (sin medir golpe a golpe) |
| ~~Aleksey Chistilin - Return to Oasis~~ | `55bf04c8` | **usada** | V2 | 2026-10-03 | Re# menor · 110 BPM · desde 142,967 s · rejilla de PULSO (una recta) · meseta de 37 s a −8,5 LUFS y caída a un piano (−20,5 LUFS) en 180,09 s, donde entra el CTA · proyecto 018 |
| Aleksey Chistilin - Utopia | `b5dc5f59` | libre | | | medida en la V3 y en la V5: entrada 141,808 s (golpe de 9,8 dB), caída de 21,2 dB a +33,3 s · descartada en la V3 por parecerse a *Return to Oasis* (misma artista y timbre) |
| Aleksey Chistilin - We Are | `c5aea0ad` | libre | | | ver `catalogo-musica.md` (sin medir golpe a golpe) |
| ~~Andrea Vanzo - Amélie - Comptine d’un autre été, l’après-midi (reimagined)~~ | `8a845ebc` | **reservada** | V5 | 2026-10-04 | piano neoclásico · Mi menor · ~95 rubato · entrada en 135,009 s (golpe de 25,5 dB, el más fuerte de las libres) · SIN pulso: 53 % de los golpes fuertes a ≤ 15 ms de la mejor recta (0,316 s), desvío 33 ms → por golpes medidos (15 fuertes en 50 s) · meseta plana de −17 a −18 LUFS hasta +40 s y decae sola a −26,5 LUFS (+40-45 s) y a −40,4 (+45-50 s): su final natural es la resolución bajo el CTA · proyecto 021 (`buscar-entrada.py`, `rejilla.py`, `medir-pista.py`) |
| Armin van Buuren - Children (from 'Piano' album) | `80bd8abe` | libre | | | piano · medida en la V5: entrada 175,883 s (golpe de 9,7 dB, en el umbral) y caída de 22,2 dB a +36,4 s a un lecho de −32 dB (o 170,965 s: caída a +41,3 s) · SIN pulso (31 % a ≤ 15 ms, desvío 60 ms; 13 golpes fuertes en 40 s, uno cada 3,6 s): por frases · el relevo de *Amélie* |
| Armin van Buuren - Here For You (from 'Piano' album) | `6fbbe88d` | libre | | | piano · medida en la V5: caída de solo 8,0 dB a +40,3 s (entrada 146,098 s): sin caída. Descartada |
| Becoming I Judah Earl | `fc80918e` | libre | | | ver `catalogo-musica.md` (sin medir golpe a golpe) |
| Begin Again | `70147fa2` | libre | | | medida en la V3 y en la V5: entrada 145,196 s (golpe de 12,7 dB), caída de 18,3 dB a +33 s a SILENCIO que a los 5 s vuelve a −7 dB con un golpe de 20,7 dB: caería bajo la voz del CTA. Descartada |
| ByErik ヵ - desolate (Slowed) | `74195082` | libre | | | ver `catalogo-musica.md` (sin medir golpe a golpe) |
| Chill Music - F.G.G. - Chillin' (Chillstep Mix) | `6c9eb412` | libre | | | chillstep · medida en la V5: entrada 232,674 s (golpe de 16,6 dB), caída de 12,8 dB a +33 s · `rejilla.py`: 73 % de los fuertes a ≤ 15 ms de una recta de 130 BPM (0,4616 s) pero desvío medio de 52,8 ms: pulso dudoso |
| Cornfield Chase | `e28cd1ab` | libre | | | ver `catalogo-musica.md` (sin medir golpe a golpe) |
| Daniel Armand — Street Level Sessions on the Green | `e428a369` | libre | | | lo-fi / chillhop · medida en la V4: entrada 165,232 s (golpe de 20,2 dB) y caída de 25,6 dB a +40 s: encaja en la medida, pero es hip hop y no jazz; la segunda opción técnica si se quiere otro color |
| Emilio Piano ft. Lucie - Maison | `df2be878` | libre | | | piano · medida en la V5: entrada 44,128 s (golpe de 9,3 dB), caída de 10,2 dB a +33 s: floja, pocos golpes (12) |
| Epic Inspirational and Cinematic Motivational - by AShamaluevMusic | `38c75296` | libre | | | ver `catalogo-musica.md` (sin medir golpe a golpe) |
| Fortitude (Light Version) | `493eeec6` | libre | | | Sol mayor · 128 (o 64) · desde 105,23 (★★) · −15 dB plano, un respiro de silencio en +32,5 s y un «drop» a +33,4 s hacia −12 dB (cae en el dron: más empuje, menos calma). Medida, no montada. |
| Gary B.B. Coleman - The Sky is Crying | `b422686a` | libre | | | ver `catalogo-musica.md` (sin medir golpe a golpe) |
| ~~Hans Zimmer - Time~~ | `4b659bec` | **usada** | V1 | 2026-10-03 | Sol mayor · 63 BPM · desde 175,633 s (el compás 8 de la entrada del catálogo) · rejilla de FRASES de 8 pulsos (7,6 s) · resolución de piano bajo el CTA · proyecto 017 |
| Heaven on Earth | `acd99178` | libre | | | Do menor? · 97 · desde 107,51 (★★★) · plana. Medida, no montada. |
| I Feel It Coming - The Weeknd (Saxophone Cover) | `3fcefe36` | libre | | | cover de saxofón (lounge) · Sol menor · 93 BPM · medida en la V4 (`buscar-entrada.py --cta 33 40`): entrada 217,415 s (golpe de 18,7 dB) y caída de solo 6,0 dB a +40 s (en el borde de la ventana): no resuelve donde entra el CTA. Descartada para jazz |
| In This Together | `bd507fe6` | libre | | | Mi menor · 120 (o 60) · desde 92,98 (★★) · meseta de −7 dB hasta +43 s y cae a silencio: la resolución llega tarde para un CTA a los 38 s. Medida, no montada. |
| Ivory Skyline Reverie | `80bf4f33` | libre | | | lounge/downtempo · plana · medida en la V4: entrada 143,146 s (14,1 dB), caída de 3,6 dB a +34,7 s: sin caída. Descartada |
| L' Amour Toujours on SAXOPHONE | `951c5de2` | libre | | | ver `catalogo-musica.md` (sin medir golpe a golpe) |
| La Isla Bonita (Saxophone 80 Mix) | `71321b4f` | libre | | | pop latino en saxofón · medida en la V4: entrada 179,834 s con un golpe de 9,7 dB (en el umbral) y caída de 14,3 dB a +40 s; no es jazz. Descartada |
| Light Fills the Room | `b3c8b7c6` | libre | | | ver `catalogo-musica.md` (sin medir golpe a golpe) |
| Ludovico Einaudi - Einaudi Fly | `a7e0695e` | libre | | | piano · medida en la V5: caída de 3,8 dB: sin caída. Descartada |
| Ludovico Einaudi - Experience (Live from Teatro dal Verme, Milano) | `66858006` | libre | | | ver `catalogo-musica.md` (sin medir golpe a golpe) |
| Luxury, Elegance, Refined - Oficial Vídeo Clipe | `4d36ea48` | libre | | | lounge · plana · medida en la V4: entrada 128,141 s con un golpe de solo 10,5 dB y caída de 4,3 dB: sin caída. Descartada |
| Nils Frahm - Familiar | `5ef30490` | libre | | | piano y sintetizadores · medida en la V5: entrada 134,421 s (golpe de 9,5 dB), caída de 11,5 dB a +39 s, meseta irregular (σ 2,9): floja |
| Nils Frahm - Says  | `990e04bd` | libre | | | ver `catalogo-musica.md` (sin medir golpe a golpe) |
| Oceans (Where Feet May Fail) | `f6cebfbd` | libre | | | ver `catalogo-musica.md` (sin medir golpe a golpe) |
| ~~Sax for the Last Customer~~ | `7a1c2932` | **reservada** | V4 | 2026-10-04 | LA ÚNICA PISTA DE JAZZ del catálogo (género inferido †, sin oír) · La menor · 179,73 s · entrada en 137,615 s (golpe de 33,7 dB en 137,645 s tras un descenso a ≈ −45 dB) · SIN pulso: solo el 46 % de los golpes fuertes cae a ≤ 15 ms de la mejor recta (0,371 s), desvío 79,7 ms → por golpes medidos · pista plana y densa (−12 a −13 LUFS) · resolución = su acorde final en 176,986 s (a los 39,37 s de la pieza) y cola que muere hacia 179,1 s · proyecto 020 (`buscar-entrada.py`, `rejilla.py`) |
| Silver Skies Cinematic Piano | `9c3a3dc3` | libre | | | piano · medida en la V5: entrada 38,381 s (golpe de 12,3 dB), caída de 10,6 dB a +41 s, meseta irregular (σ 3,2): floja |
| Softly I Judah Earl & BRANDON BLACK #music #cinematic #orchestralmusic | `87d78dc2` | libre | | | ver `catalogo-musica.md` (sin medir golpe a golpe) |
| Some Say - Acoustic Sunsets (Nea Cover) | `b652ab54` | libre | | | ver `catalogo-musica.md` (sin medir golpe a golpe) |
| Spring is Coming | `fe252090` | libre | | | neoclásico · medida en la V5: caída de 7,3 dB a +42 s (entrada 73,305 s): sin caída |
| Tiesto pres. Allure - Somewhere inside οf me (Alexander Gorshkov chillout remix) | `96faa93f` | libre | | | ver `catalogo-musica.md` (sin medir golpe a golpe) |
| Tony Anderson - Dreamlife | `5e7dcd27` | libre | | | ver `catalogo-musica.md` (sin medir golpe a golpe) |
| Yeshua (Versión Piano) | `7bd0eb6f` | libre | | | ver `catalogo-musica.md` (sin medir golpe a golpe) |
| deadmau5 - Strobe | `de6df12a` | libre | | | ver `catalogo-musica.md` (sin medir golpe a golpe) |

## 3. Material de Los Patios (apto 501): lo que ya usó cada versión

Códigos y textos de `proyectos/017/catalogo-material.md`; los clips están en el disco del rodaje (no en git):
la carpeta `Apartamento - Los Patios - El Poblado/Videos/` del disco del rodaje (`1 Hooks`, `2 Mitad`, `3 Dron`, `4 Recorrido`, `5 Cta`).
Hooks, mitades, CTA y drones se TACHAN al usarlos. Los recorridos pueden repetirse (la propiedad tiene 26) pero se declara lo que se comparte.

### Hooks

| Código | Clip | Lugar | Dice | Estado | V | Aviso |
|---|---|---|---|---|---|---|
| HK01 | `Hook1.MOV` | INT-ABIERTO | «Lo más especial de este apartamento está adentro y fuera… ven, te enseño.» | libre | | «ven, te enseño»: whisper oyó «veinte enseño» (dudosa) |
| HK01a | `Hook1.1.MOV` | TERRAZA | «Lo más especial de este apartamento, está dentro y fuera… ¡ven, te enseño!» | libre | | ídem; sin colchón al inicio (entra a corte) |
| HK01b | `Hook1.2.MOV` | PATIO | «Lo más especial de este apartamento está dentro y fuera… ven, te enseño.» | libre | | ídem; el mejor fondo para miniatura |
| ~~HK02~~ | `Hook2+IA.MOV` | INT-ABIERTO | «Este apartamento aún no está terminado… y ahí está, precisamente, la oportunidad.» | **usado** | V1 |  |
| ~~HK03~~ | `Hook3.MOV` | INT-BLOQUES | «Si estás buscando un apartamento totalmente terminado, este probablemente no es para ti.» | **reservado** | V4 |  |
| HK04 | `Hook4.MOV` | INT-ABIERTO | «Si quieres diseñar 317 metros alrededor de tu forma de vivir, mira esto.» | libre | | lleva cifra («317 metros») |
| ~~HK05~~ | `Hook5.MOV` | BARANDA | «¿Y si pudieras vivir en altura sin sentir que vives dentro de una torre?» | **reservado** | V3 |  |
| ~~HK06~~ | `Hook6.MOV` | TERRAZA | «Mira lo que ocurre cuando arquitectura y naturaleza dejan de estar separadas.» | **reservado** | V5 | «Mira» sale «Mirá» (voseo, conf. 0,28): se mide (el catálogo de material lo anota; antes no figuraba aquí) |
| ~~HK07~~ | `Hook7.MOV` | PATIO | «El verdadero lujo puede ser simplemente tener espacio para respirar.» | **usado** | V2 |  |
| HK08 | `Hook8.MOV` | ENTRADA | «3.550 millones. Ahora veamos realmente qué estás comprando.» | libre | | lleva el PRECIO («3.550 millones»); el CTA no puede repetirlo |
| HK09 | `Hook9.MOV` | INT-VENTANAL | «Esta propiedad tiene sentido para un comprador muy específico.» | libre | |  |
| HK10 | `Hook10.MOV` | TERRAZA | «No necesito convencerte de los patios si llegaste hasta aquí.» | libre | | en frío suena raro (presupone que ya llegó) |

### Mitades

| Código | Clip | Lugar | Dice | Estado | V | Aviso |
|---|---|---|---|---|---|---|
| ~~MD01~~ | `Medio1.MOV` | BARANDA | «Los patios y vacíos hacen desaparecer esa frontera entre interior, paisaje y arquitectu… | **reservado** | V5 | «patios y vacíos» (whisper: «partidos ibasíos» en la primera pasada) y «entre interior» (conf. 0,25): se miden (el catálogo de material lo anota; antes no figuraba aquí) |
| MD01a | `Medio1.1.MOV` | TERRAZA | «Los patios y vacíos hacen desaparecer esa frontera entre paisaje, vegetación y espacio.» | libre | |  |
| MD02 | `Medio2.MOV` | TERRAZA | «La arquitectura ya está resuelta. El interior puede reflejar completamente tu personali… | libre | |  |
| MD03 | `Medio3.MOV` | PATIO | «Una piscina privada en altura es interesante, pero no es lo mejor de este proyecto.» | libre | | «piscina»/«cocina» por confirmar |
| MD04 | `Medio4.MOV` | TERRAZA | «Lo excepcional es cómo ALH integró agua, vegetación, patios y arquitectura.» | libre | | nombra a ALH (sin confirmar que se pueda) |
| MD05 | `Medio5.MOV` | BARANDA | «Hay lujo que se muestra y hay otro que simplemente se siente.» | libre | | «luego»/«lujo» dudosa |
| MD06 | `Medio6.MOV` | TERRAZA | «Diferentes materiales, combinados con vegetación y agua, construyen una experiencia, no… | libre | |  |
| ~~MD07~~ | `Medio7.MOV` | TERRAZA | «La respuesta no siempre está en los metros, a veces está en cómo entra el exterior.» | **usado** | V2 |  |
| ~~MD08~~ | `Medio8.MOV` | TERRAZA | «La doble altura permite que la luz y ventilación ingresen a la vivienda.» | **reservado** | V3 |  |
| ~~MD09~~ | `Medio9.MOV` | INT-ABIERTO | «Tienes 317 metros para desarrollar completamente el interior.» | **usado** | V1 |  |
| MD10 | `Medio10.MOV` | ENTRADA | «317 metros cuadrados diseñados por ALH y entregados en obra gris.» | libre | | nombra a ALH (sin confirmar que se pueda) |
| MD11 | `Medio11.MOV` | INT-ABIERTO | «¿(Eres) alguien que valora la arquitectura y prefiere crear sus propios acabados?» | libre | | arranque con confianza 0,31 |
| MD12 | `Medio12.MOV` | TERRAZA | «El interior puede llevar completamente tu personalidad.» | libre | |  |
| MD13 | `Medio13.MOV` | TERRAZA | «(Los) materiales se pueden cambiar, pero proporciones, altura y arquitectura, no.» | libre | | primera palabra con confianza 0,41 |
| ~~MD14~~ | `Medio14.MOV` | PATIO | «No estás viendo un apartamento sin terminar, estás viendo uno que todavía puedes defini… | **reservado** | V4 |  |

### CTA

| Código | Clip | Lugar | Dice | Estado | V | Aviso |
|---|---|---|---|---|---|---|
| ~~CT01~~ | `CTA1.MOV` | BALCON | «Si buscas algo diferente (a) un apartamento convencional, escríbeme y conoce Los Patios.» | **usado** | V2 | la vocal medida es «en» (F1 ≈ 605 / F2 ≈ 2.360 Hz), sin oír: se pintó «en»; ver `proyectos/018` del repo |
| ~~CT02~~ | `CTA2.MOV` | BALCON | «317 metros cuadrados en obra gris por 3.550 millones, escríbeme y ven a conocerlo.» | **reservado** | V5 | lleva el PRECIO y el «317»: **la V5 usa solo su 2.ª mitad, «escríbeme y ven a conocerlo»** (decisión del usuario, 2026-10-04: ni el precio ni el «317» suenan, se leen ni se ven). La toma entera sigue sin poder ir en el bloque 6 |
| CT03 | `CTA3.MOV` | PATIO | «Está disponible por 3.550 millones, escríbeme y ven a conocerlo.» | libre | | lleva el PRECIO: no va en el bloque 6; su 2.ª mitad, «escríbeme y ven a conocerlo», es la misma que la de CT02 (el recorte de la V5); sin cola (0,32 s) |
| CT04 | `CTA4.MOV` | PATIO | «Los Patios, arquitectura de ALH, escríbeme para conocer esta unidad.» | libre | | nombra a ALH (sin confirmar que se pueda) |
| ~~CT05~~ | `CTA5.MOV` | INT-BLOQUES | «Si encaja con lo que estás buscando, escríbeme.» | **reservado** | V3 |  |
| ~~CT06~~ | `CTA6.MOV` | INT-ABIERTO | «Si es el reto, escríbeme y agendamos una visita.» | **reservado** | V4 | «reto»/«resto» dudosa (confianza 0,16) y «agendamos» (0,04): se miden antes de la final; Luxur tiene que poder agendar |
| ~~CT07~~ | `CTA7.MOV` | TERRAZA | «Necesitas saber si esta unidad en específico funciona para ti. Si es así, escríbeme y l… | **usado** | V1 |  |

### Drones

| Código | Clip | Dura | Estado | V |
|---|---|---|---|---|
| ~~DR147~~ | `DJI_20261001103120_0147_D.MP4` | 22,9 s | **usado** | V1 |
| DR148 | `DJI_20261001103201_0148_D.MP4` | 11,1 s | libre | |
| DR149 | `DJI_20261001103219_0149_D.MP4` | 18,6 s | libre | |
| DR150 | `DJI_20261001103247_0150_D.MP4` | 11,1 s | libre | |
| DR151 | `DJI_20261001103323_0151_D.MP4` | 5,2 s | libre | |
| ~~DR152~~ | `DJI_20261001103352_0152_D.MP4` | 22,2 s | **reservado** | V3 |
| DR153 | `DJI_20261001103446_0153_D.MP4` | 7,9 s | libre | |
| ~~DR154~~ | `DJI_20261001103456_0154_D.MP4` | 16,7 s | **reservado** | V5 |
| ~~DR155~~ | `DJI_20261001103603_0155_D.MP4` | 10,9 s | **usado** | V2 |
| ~~DR156~~ | `DJI_20261001103635_0156_D.MP4` | 25,8 s | **reservado** | V4 |
| ~~DR163~~ | `DJI_20261001104246_0163_D.MP4` | 19,1 s | **usado** | V1 |

### Recorridos (se pueden repetir; se declara)

| Código | Clip | Dura | Usado en |
|---|---|---|---|
| RC01 | `Recorrido Abre puerta.MOV` | 17,9 s | V1 (8,2-10,1 s) |
| RC02 | `Entrada apto y Sala.MOV` | 14,2 s | V1 (9,8-13,6 s) |
| RC03 | `Sala.MOV` | 9,0 s | V2 (4,4-7,7 s) |
| RC04 | `Vista ventana y Sala.MOV` | 9,5 s | sin usar |
| RC05 | `Cocina.MOV` | 7,5 s | V2 (3,2-5,9 s) |
| RC06 | `Cocina y Comedor.MOV` | 9,2 s | V2 (0,4-3,7 s) |
| RC07 | `Vista  Cocina y Comedor.MOV` | 11,4 s | V1 (0,8-4,6 s) · V2 (0,0-3,8 s) |
| RC08 | `Patio y Naturaleza.MOV` | 10,2 s | V1 (1,57-10,13 s, toma continua) |
| RC09 | `Patio y Naturaleza 2.MOV` | 13,5 s | sin usar |
| RC10 | `Patio y Piscina.MOV` | 11,9 s | V2 (4,0-8,4 s) · V5 (8,4-11,83 s) |
| RC11 | `Piscina y Patio.MOV` | 14,7 s | V2 (0,4-2,6 s y 7,0-9,2 s) · V5 (2,7-6,97 y 9,67-13,23 s) |
| RC12 | `Habitacion Principal.MOV` | 10,7 s | V5 (0,0-10,57 s, una toma partida en dos) |
| RC13 | `Habitacion Principal 2.MOV` | 15,4 s | sin usar |
| RC14 | `Habitacion Secundaria.MOV` | 19,1 s | sin usar |
| RC15 | `Estudio y Baño.MOV` | 16,2 s | sin usar |
| RC16 | `Recorrido Caminando.MOV` | 30,1 s | sin usar |
| RC17 | `Sala Lobby.MOV` | 5,3 s | sin usar |
| RC18 | `Sala de Juntas.MOV` | 4,7 s | sin usar |
| RC19 | `Gimnasio.MOV` | 5,9 s | sin usar |
| RC20 | `Gimnasio2.MOV` | 5,5 s | sin usar |
| RC21 | `Gimnasio3.MOV` | 4,7 s | sin usar |
| RC22 | `Exterior edificio.MOV` | 6,7 s | sin usar |
| RC23 | `Exterior edificio2.MOV` | 10,3 s | sin usar |
| RC24 | `Exterior edidficio3.MOV` | 5,9 s | sin usar |
| RC25 | `Exterior edificio4.MOV` | 7,7 s | V1 (1,2-3,1 s) · V2 (0,0-2,7 s, rev. 2) |
| RC26 | `Exterior edificio5.MOV` | 5,0 s | sin usar |

*Reglas del formato que pesan en la elección:* una sola cifra como mucho en toda la pieza y nunca en los bloques 5 y 6; Isabella en tres sitios distintos; ninguna palabra dudosa sin cerrar antes de la final.
