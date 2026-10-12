# Análisis de uso previo al 021 · Los Patios · apto 501 · V5

> Se hizo ANTES de elegir y de reservar nada, el 2026-10-04, leyendo todas las fuentes (ninguna basta sola: lo publicado va por detrás del trabajo en curso).
> Pedido de esta versión: ninguno específico; parámetros por defecto. **Estado al escribir esto: nada reservado, nada publicado, nada commiteado.** El análisis se detiene en
> el CTA (§4): el encargo manda parar antes de reservar si la única opción es CT04 o repetir un CTA, y aquí lo es.

## 1. Fuentes leídas

| # | Fuente | Qué dice |
|---|---|---|
| a1 | Registro `archivos/musica/registro-de-uso.md` en `origin/main` (`ca1fde4`, merge del PR #12, 2026-10-04 22:36 UTC) | V1 y V2 finales · **V3 «en prueba · PR #12 (borrador)»** · V4 libre. |
| a2 | Ídem en `origin/feat/reel-019-altura-sin-torre` (`5226235`) | Igual que a1. |
| a3 | Ídem en `origin/feat/recorridos-luxur-subtitulos-color-reglas` (`13ef389`) | Anterior: V3 «en prueba (sin commit)», V4 libre. |
| a4 | Ídem en `origin/feat/reel-020-definir` (`a7ae2dc`) | V1-V4 (**V4 «en prueba · proyecto 020 SIN commit»**) y **V5 libre**. El más avanzado de los publicados. |
| b1 | Árbol de trabajo del estudio (rama `feat/reel-019-altura-sin-torre`, `5226235`, limpio) | Igual que a2. |
| b2 | Worktree `.claude/worktrees/reel-020-definir` (rama LOCAL `feat/reel-020-definir`, `f4914a2`) | V4 «proyecto 020 **commiteado en la rama**, sin PR»: dos commits (`69448ca` feat(020) y `f4914a2`) que **no están en `origin`**. |
| b3 | Worktrees `determined-jackson-e969d6` y `video-compilacion-quien-soy-1fecf3` | Sin registro y sin proyectos ≥ 014 (el segundo lleva el 013 sin commit): no reservan nada. |
| c | §1 «Registro de versiones» de `proyectos/017`, `018`, `019` (en `main`) y `020` (commit local `69448ca`) | Coinciden con el registro; añaden apertura, recorridos con su tramo y sentido del paseo. |
| d | Línea `MUSICA =` de `proyectos/*/normalizar.mjs` | *Time* (017), *Return to Oasis* (018), *Flying Into the Sun* (019), *Sax for the Last Customer* (020, solo en el worktree de la V4) y *Glenn Morrison – Contact* (016: pieza de República Dominicana, no es de Los Patios y no está en la biblioteca: no cuenta). |
| e | `gh pr list` | **#12 MERGED** (2026-10-04 22:36 UTC). No hay PR de la V4. No hay más ramas remotas con registro. |

**Contradicciones entre fuentes** (vale lo más avanzado; lo reservado cuenta como tachado):

1. **El encargo da por sin unir la rama de la V3; ya está en `main`.** El PR #12 se fusionó a las 22:36 UTC: `main` lleva el proyecto 019 (`proyectos/019/`, `remotion/src/proyectos/019/`) pero NO el 020, y su registro sigue diciendo «V3 en prueba · borrador» y «V4 libre». La V4, a su vez, está en una rama que no contiene a la V3. Siguen sin contenerse una a otra.
2. **La rama publicada de la V4 no trae el proyecto 020.** `origin/feat/reel-020-definir` solo lleva la reserva y el «en prueba» (el registro, nada más): `proyectos/020/` y `remotion/src/proyectos/020/` existen únicamente en la rama LOCAL (b2, dos commits sin empujar). El encargo exige que existan en la base. Además el registro publicado dice «proyecto 020 SIN commit» y el local dice «commiteado en la rama».
3. **La tabla de recorridos del registro está atrasada**: no recoge la V3 ni la V4: da por «sin usar» RC04, RC09, RC13, RC16 y RC22, que ya salieron, y no trae las ventanas nuevas de RC02, RC05 y RC25. Para los recorridos vale lo que dicen los `combinaciones.md` (c).
4. **La columna «Aviso» del registro se queda corta** respecto del catálogo de material (`proyectos/017/catalogo-material.md`): HK06 («Mira» sale «Mirá», conf. 0,28), MD01 y MD01a («patios y vacíos» → «partidos ibasíos» en la primera pasada; «entre interior» conf. 0,25) y MD06 («Diferentes materiales», conf. 0,11-0,30) tienen aviso y el registro no lo anota.

## 2. Canciones

**Usadas o reservadas: 4 de 43.**

| Pista | V | Estado | Rejilla |
|---|---|---|---|
| *Hans Zimmer – Time* | V1 · 017 | usada (final) | frases de 8 pulsos |
| *Aleksey Chistilin – Return to Oasis* | V2 · 018 | usada (final) | pulso (110 BPM, 89 % a 10 ms) |
| *Aleksey Chistilin – Flying Into the Sun* | V3 · 019 | reservada · en prueba (en `main`) | sin pulso: por frases (27 %) |
| *Sax for the Last Customer* | V4 · 020 | reservada · en prueba | sin pulso: por golpes (46 %) |

**Libres: 39.**
- Con medida en el registro (entrada y arco): **9**: *Deep Breath*, *Fortitude (Light)*, *Heaven on Earth*, *In This Together*, *Daniel Armand*, *I Feel It Coming*, *Ivory Skyline Reverie*, *La Isla Bonita (sax)* y *Luxury, Elegance, Refined*. A ellas se suman *Begin Again* y *Utopia*, medidas en `proyectos/019/artefactos/01-plan.md` y no pasadas al registro.
- Sin ninguna medida previa: **28**. **Hoy se escanearon las 39** con `buscar-entrada.py --cta 33 40` (golpe de entrada ≥ 9 dB y caída sostenida entre +33 y +40 s: lo que un CTA necesita): la tabla completa está en el apéndice. Medidas a fondo (`rejilla.py`) hoy, solo dos.
- **Descartadas por regla, sin oírlas** (género del catálogo, no oído): *Some Say (Nea cover)* y *Oceans (Hillsong)* son canciones con letra y la letra pelea con la voz de Isabella; *Tiesto – Allure (chillout remix)* probablemente también (†); *L' Amour Toujours*, *La Isla Bonita* e *I Feel It Coming* son saxofón y repiten el color de la V4; *Utopia* y *Pictures from the Past* repiten artista y timbre de la V2 y la V3 (serían 3 de 5 de Chistilin); *Gary B.B. Coleman* es un blues de 9 min; las planas (*Luxury*, *Ivory*, *Light Fills the Room*, *Heaven on Earth*, *Fortitude*, *Spring is Coming*) no tienen caída y la «resolución» sería un duck.

**Candidatas con caída donde entra el CTA** (ventana de CTA +31 a +38 s, que es donde caería con un CTA recortado):

| Pista (género del catálogo) | Entrada · golpe | Caída (en +s) | Golpes en la meseta | Lectura |
|---|---|---|---|---|
| ***Armin van Buuren – Children*** (piano, nostalgia íntima) | 175,883 s · 9,7 dB | **22,2 dB** (+36,4 s) a un lecho de −32 dB | 10 | Timbre nuevo (ningún piano solista en V1-V4). `rejilla.py`: **sin pulso** (31 % a ≤ 15 ms, desvío 60,7 ms; 13 golpes fuertes en 40 s, mediana 3,0 s entre ellos) → frases, como la V3. **Flojo: el golpe de apertura (9,7 dB) está en el umbral.** |
| *Andrea Vanzo – Amélie (reimagined)* (piano, ternura) | 135,009 s · **25,5 dB** | 14,8 dB (+40,0 s: en el borde; más temprano solo 13,9 dB a +38,0) | 15 | El golpe más fuerte de las libres, pero la caída llega tarde: pide un CTA de ≈ 40 s en adelante. |
| *Daniel Armand – Street Level Sessions* (lo-fi / chillhop) | 168,413 s · 15,1 dB | 52,7 dB a +38,0 s (a casi silencio) | 50 | Muchos puntos de corte, otro color; pero cae a +38 s y es hip hop en un canal de lujo (la V4 ya lo dejó de «segunda opción técnica»). |
| *Chill Music – Chillin' (Chillstep)* (electrónica) | 232,674 s · 16,6 dB | 12,8 dB (+33,0 s) | 36 | `rejilla.py`: 73 % de los fuertes a ≤ 15 ms de una recta de 130 BPM, pero desvío medio 52,8 ms: pulso dudoso. Entrada limpia, caída moderada. |

Lo que falta para decidir una (y que NO se ha hecho): `medir-pista.py` de la candidata, sus últimos 60 s, y oír si compite con la voz. **Se decide al reservar, ya con el CTA fijado** (su duración cambia dónde cae el CTA).

## 3. Combinaciones (una fila por versión)

| | **V1 · 017** | **V2 · 018** | **V3 · 019** | **V4 · 020** |
|---|---|---|---|---|
| Estado | final (CRF 12 y 16) | final (CTA «en» sin oír) | en prueba · en `main` (PR #12) | en prueba · commit local sin publicar |
| Canción | *Time* (175,633 s) | *Return to Oasis* (142,967 s) | *Flying Into the Sun* (178,095 s) | *Sax for the Last Customer* (137,615 s) |
| Apertura (frame 0) | dron DR147 (2,0 s) | dron DR155 (2,3 s) | fachada RC25 (3,00-6,07 s) | calle RC22 (3,90-6,43 s) |
| Hook · lugar | HK02 · INT-ABIERTO | HK07 · PATIO | HK05 · BARANDA | HK03 · INT-BLOQUES |
| Mitad · lugar | MD09 · INT-ABIERTO | MD07 · TERRAZA | MD08 · TERRAZA | MD14 · PATIO |
| CTA · lugar | CT07 · TERRAZA | CT01 · BALCON | CT05 · INT-BLOQUES | CT06 · INT-ABIERTO |
| Dron (posición) | DR147 (inicio) · DR163 (final) | DR155 (inicio) | DR152 (tras el hook) | DR156 (último plano del bloque 5) |
| Recorridos | RC25 · RC01 · RC02 · RC07 → RC08 continua | RC11 · RC10 · RC11 → RC06 · RC05 · RC03 · RC25 · RC07 | RC25 (apertura) · RC09 · RC13 · RC16 | RC22 · RC02 · RC05 · RC09 · RC13 · RC04 |
| Sentido del paseo | I | II | II | I |
| Cifra | «317 metros» (MD09, bloque 4) | ninguna | ninguna | ninguna |
| Rejilla de la canción | frases (8 pulsos) | pulso | frases / por golpes | por golpes |
| Dura | 46,6 s | 44,2 s | 39,7 s | 41,8 s |
| Palabras sin oír | — (cerradas) | «en» del CTA | «y (la) ventilación» · «escríbeme» | «terminado» · «reto» |

**Lo que se repite entre versiones** (a no repetir sin querer, o a declarar):
- **Metraje compartido.** RC25: V1 (1,2-3,1 s), V2 (0,0-2,7 s) y V3 (3,0-6,07 s; ≈ 0,1 s con la V1). RC07: V1 y V2 (≈ 3 s iguales, declarado en el 018). La V4 no comparte tramo con ninguna, aunque reutiliza cuatro clips con otra ventana (RC02, RC05, RC09, RC13). Ventanas **ya gastadas** a esquivar en la V5: RC02 0,0-4,5 y 9,8-13,6 · RC05 0,0-2,8 y 3,2-5,9 · RC09 0,0-3,5 y 4,6-12,6 · RC13 2,6-5,7 y 10,9-15,4 · RC10 4,0-8,4 · RC11 0,4-2,6 y 7,0-9,2 · RC16 20,6-28,8 · RC04 0,0-2,2 · RC22 3,9-6,4.
- **El mismo sitio en el mismo bloque.** **TERRAZA como mitad: V2 y V3.** INT-ABIERTO sale en hook y mitad de la V1 (la regla actual lo prohíbe). Sitios que **nunca** han sido: hook en TERRAZA, ENTRADA o INT-VENTANAL; mitad en BARANDA o ENTRADA; CTA en PATIO.
- **Misma apertura.** V1 y V2 abrieron con un dron; la V3 con la fachada; la V4 con la calle. La V4 es la última.
- **Misma pareja hook → mitad:** ninguna.
- **Misma canción:** ninguna, pero 2 de 4 son de Chistilin y 1 de las 4 (la V4) ya es saxofón.
- **Cifra:** solo la V1.
- **El dron:** inicio (V1, V2), tras el hook (V3), final del bloque 5 (V4). Libres las posiciones «primer plano del bloque 5» y «dentro del bloque 3».

## 4. Lo que queda

| Categoría | Total | Tachados | Libres | De ellos, sin aviso (según el catálogo, no el registro) |
|---|---|---|---|---|
| Hooks | 12 | 4 (HK02, HK03, HK05, HK07) | **8** | **2**: HK09 (INT-VENTANAL) y HK10 (TERRAZA, «en frío suena raro»). Con aviso: HK01/01a/01b («ven, te enseño»), HK06 («Mirá»); con cifra o precio, **fuera**: HK04 (317), HK08 (precio) |
| Mitades | 15 | 4 (MD07, MD08, MD09, MD14) | **11** | **2**: MD02 y MD12 (las dos en TERRAZA). Con aviso medible: MD01, MD01a, MD03, MD05, MD06, MD11, MD13. **Fuera:** MD04 (nombra a ALH), MD10 (ALH y 317) |
| **CTA** | 7 | 4 (CT01, CT05, CT06, CT07) | **3** | **0.** CT02 y CT03 llevan el **precio** (CT02, además, «317 metros»): prohibido en el bloque 6. CT04 nombra a **ALH**, sin confirmar que se pueda |
| Drones | 11 | 5 (DR147, DR152, DR155, DR156, DR163) | **6** | limpios: **DR153** (7,9 s) y **DR154** (16,7 s). DR148-DR151: la torre vecina con malla negra |
| Recorridos | 26 | 15 usados (RC01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 13, 16, 22, 25) | **11 sin usar**: RC12, RC14, RC15, RC17-RC21, RC23, RC24, RC26 | además, ventanas libres dentro de los usados (se declara) |
| Canciones | 43 | 4 | **39** | candidatas con caída donde entra el CTA: 4 (§2) |

**Combinaciones nuevas que permite** (hook × mitad con tres sitios distintos entre hook, mitad y CTA; hooks y mitades sin cifra, precio ni ALH; los avisos de palabra se miden, no vetan): **24** con un CTA en PATIO (CT04, o CT03 recortado) y **37** con uno en BALCON (CT02 recortado). Sin ningún aviso de palabra en hook ni mitad hay **una sola pareja** (HK09 + MD02 o MD12). Con tres CTA posibles, el cuello de botella no es el material: **es el CTA.**

**El CTA, lo que bloquea la reserva.** Las tres tomas libres tienen un problema declarado y ninguna sale limpia:
1. **CT04** «Los Patios, arquitectura de ALH, escríbeme para conocer esta unidad.» (PATIO): nombra a ALH y nunca se ha confirmado que se pueda citar en publicidad.
2. **CT02** «317 metros cuadrados en obra gris por 3.550 millones, escríbeme y ven a conocerlo.» (BALCON) y **CT03** «Está disponible por 3.550 millones, escríbeme y ven a conocerlo.» (PATIO): precio en el bloque 6.
3. Repetir un CTA (el menos reciente es CT07, de la V1).

Una vía que NO he tomado por mi cuenta, porque toca la regla del precio y de ALH: **recortar la toma a su segunda mitad** («escríbeme y ven a conocerlo» en CT02/CT03; «escríbeme para conocer esta unidad» en CT04). El precio, el «317» y ALH no sonarían, no se leerían y no se verían. Cuesta: la frase empieza a media toma (en CT02, Isabella se apoya quieta en la barandilla, así que no se nota; en CT04 camina hacia la cámara y se pierde el helecho que hace de cortinilla), y el CTA se queda en ≈ 2-2,5 s de voz (la V3, con el CTA más corto, 3,6 s de toma, quedó en 39,7 s).

## 5. Propuesta (provisional: lo del CTA espera tu respuesta)

Arco: **tesis de diseño** (el ángulo B del catálogo: la arquitectura borra la frontera entre dentro y fuera) con los tres sitios que **nunca** han ocupado su bloque. **Ninguna cifra** en toda la pieza.

| Pieza | Elección | Por qué |
|---|---|---|
| Canción | ***Armin van Buuren – Children*** (piano), desde 175,883 s; **a medir a fondo y confirmar al reservar** | Único candidato con caída fuerte (22,2 dB) y estable en el segundo +36 y un timbre que no ha sonado (piano solista); va por frases, como la V3. Su flojera: golpe de apertura de 9,7 dB. Si al medirla a fondo no encaja, el relevo es *Amélie (reimagined)* con un CTA más tardío. |
| Apertura | **RC10 «Patio y Piscina»**, ventana 0-3 s | Ni dron (V1, V2), ni fachada (V3), ni calle (V4); el deck con el muro de ladrillo es de los mejores fotogramas de portada (catálogo, regla 1). V2 usó 4,0-8,4 s: el tramo 0-4 s está libre. Sin texto ni voz. |
| Hook | **HK06** · TERRAZA · «Mira lo que ocurre cuando arquitectura y naturaleza dejan de estar separadas.» | Libre, sin cifra, el gesto (cruzar el umbral) ES el argumento; la terraza **nunca** fue hook; abre el sentido II (terraza → ventanal). Aviso: «Mira»/«Mirá», que se mide. |
| Mitad | **MD01** · BARANDA · «Los patios y vacíos hacen desaparecer esa frontera entre interior, paisaje y arquitectura.» | Es la tesis de HK06 (catálogo: «acompaña a HK06»); la baranda **nunca** fue mitad (INT-ABIERTO, TERRAZA, TERRAZA, PATIO). Avisos que se miden: «patios y vacíos», «entre interior». Alternativa sin avisos: HK09 + MD02. |
| CTA | **— pendiente de tu decisión —** | Ver §4. Con CT02 recortado (BALCON): TERRAZA · BARANDA · BALCON, sentido II, es el «Dentro y fuera» del catálogo (P2). Con CT04 o CT03 en PATIO (el único sitio que nunca fue CTA) hay que cuidar que el paseo no vuelva atrás. |
| Dron | **DR154** (16,7 s, limpio de la torre de malla) como **primer plano del bloque 5** | Posición que ninguna versión ha usado; tramo ≤ 5 s a elegir mirando. |
| Recorridos | sentido II con clips **sin usar** donde el material lo permita (RC12 y RC14 como alcoba, RC15, RC23/RC24) y ventanas libres de los usados | Se declara lo que se comparta; la puerta mide el metraje compartido con las cuatro versiones. |
| Tres sitios | TERRAZA · BARANDA · (BALCON o PATIO) | Distintos entre sí y cada uno nuevo en su bloque. |

**Lo que no puedo decir todavía:** si el CTA recortado se sostiene a la vista y al oído; qué canción gana tras la medida a fondo; que ninguna de las palabras con aviso (HK06, MD01) resulte distinta de lo transcrito (se miden antes de la final); la licencia de la música; el canal del CTA. Nada de esto está oído.

## 6. Qué se hizo y qué no (para quien retome)

- **Hecho:** lectura de todas las fuentes; escaneo de la biblioteca (`buscar-entrada.py --cta 33 40` y `--cta 31 38` sobre las candidatas) y `rejilla.py` de *Children* y *Chillin'*; este documento.
- **Mi worktree:** `.claude/worktrees/reel-021`, en HEAD desacoplado sobre `origin/feat/reel-020-definir` (`a7ae2dc`). Sin rama propia aún (el nombre lleva el tema, que depende del CTA). Este archivo es lo único que hay en él.
- **NO hecho:** ninguna reserva en el registro, ningún commit, ningún push, ningún cambio en el worktree de la V4 ni en el árbol del estudio.
- **La base:** el encargo pide `proyectos/020/` en la base y la rama publicada de la V4 no lo trae (contradicción 2). Propongo basar en lo publicado y **copiar** el 020 desde el commit local (`git show feat/reel-020-definir:…`) como punto de partida, sin empujarlo: así mi reserva no publica por su cuenta un trabajo de otra sesión. La sección 9b de la puerta cargaría la V4 de ese commit y la V3 de `origin/main`.

## Apéndice · Biblioteca entera medida (2026-10-04)

`buscar-entrada.py --cta 33 40`: la mejor entrada por pista (golpe ≥ 9 dB y la mayor caída sostenida entre +33 y +40 s tras ella). «Pts» es la nota del script (tope ≈ 15). **Mide, no oye.**

| Pista | Entrada (s) | Golpe | Cae en | Caída | σ | Antes→tras (dB) | Golpes | Pts | Estado |
|---|---|---|---|---|---|---|---|---|---|
| L' Amour Toujours on SAXOPHONE | 165.017 | 10.5 dB | +40.0 s | 18.4 dB | 0.3 | -9.1→-27.5 | 15 | 15.5 |  |
| Begin Again | 145.196 | 12.7 dB | +33.0 s | 18.3 dB | 0.7 | -6.9→-25.2 | 19 | 15.2 |  |
| Andrea Vanzo - Amélie - Comptine d’un autre été, l’après… | 135.009 | 25.5 dB | +40.0 s | 14.8 dB | 1.0 | -17.8→-32.7 | 15 | 15.0 |  |
| Armin van Buuren - Children (from 'Piano' album) | 170.965 | 10.7 dB | +40.0 s | 17.7 dB | 1.0 | -10.2→-27.9 | 12 | 15.0 |  |
| Tiesto pres. Allure - Somewhere inside οf me (Alexander Gors… | 291.855 | 9.8 dB | +40.0 s | 14.9 dB | 1.0 | -7.9→-22.8 | 55 | 15.0 |  |
| La Isla Bonita (Saxophone 80 Mix) | 179.834 | 9.7 dB | +40.0 s | 14.3 dB | 1.1 | -11.2→-25.5 | 52 | 14.9 |  |
| Aleksey Chistilin - Flying Into the Sun | 178.095 | 10.1 dB | +35.6 s | 17.3 dB | 1.3 | -7.9→-25.2 | 15 | 14.7 | V3 (reservada) |
| Some Say - Acoustic Sunsets (Nea Cover) | 137.895 | 14.5 dB | +40.0 s | 35.8 dB | 1.5 | -15.9→-51.7 | 62 | 14.6 |  |
| Aleksey Chistilin - Utopia | 141.808 | 9.8 dB | +33.3 s | 21.2 dB | 1.6 | -9.5→-30.6 | 14 | 14.5 |  |
| Aleksey Chistilin - We Are | 93.602 | 11.4 dB | +33.7 s | 13.6 dB | 1.4 | -9.3→-22.9 | 29 | 14.2 |  |
| Daniel Armand — Street Level Sessions on the Green | 165.232 | 20.2 dB | +40.0 s | 25.6 dB | 2.1 | -10.9→-36.5 | 53 | 14.1 |  |
| Oceans (Where Feet May Fail) | 145.830 | 11.1 dB | +39.5 s | 12.7 dB | 1.0 | -13.4→-26.1 | 54 | 13.7 |  |
| Chill Music - F.G.G. - Chillin' (Chillstep Mix) | 232.674 | 16.6 dB | +33.0 s | 12.8 dB | 1.3 | -10.2→-23.0 | 36 | 13.6 |  |
| Softly I Judah Earl & BRANDON BLACK | 63.224 | 15.7 dB | +40.0 s | 13.9 dB | 2.8 | -11.0→-24.9 | 11 | 13.3 |  |
| ByErik ヵ - desolate (Slowed) | 79.473 | 12.1 dB | +40.0 s | 14.0 dB | 1.9 | -13.5→-27.5 | 56 | 13.1 |  |
| Aleksey Chistilin - Deep Breath | 78.161 | 10.3 dB | +38.5 s | 11.8 dB | 0.9 | -9.8→-21.6 | 14 | 12.9 |  |
| Tony Anderson - Dreamlife | 183.388 | 9.7 dB | +40.0 s | 14.5 dB | 2.9 | -19.1→-33.6 | 4 | 12.3 |  |
| Aleksey Chistilin - Pictures from the Past | 133.931 | 10.3 dB | +34.0 s | 11.1 dB | 1.0 | -8.4→-19.4 | 34 | 12.1 |  |
| Gary B.B. Coleman - The Sky is Crying | 504.362 | 20.5 dB | +40.0 s | 15.0 dB | 2.8 | -19.6→-34.6 | 45 | 12.0 |  |
| Aleksey Chistilin - Overcoming the Impossible | 169.302 | 9.4 dB | +33.0 s | 10.5 dB | 1.2 | -9.8→-20.3 | 23 | 11.3 |  |
| Ludovico Einaudi - Experience (Live from Teatro dal Verme, M… | 140.988 | 9.1 dB | +37.1 s | 10.2 dB | 1.3 | -19.2→-29.4 | 19 | 11.0 |  |
| Nils Frahm - Familiar | 134.421 | 9.5 dB | +39.0 s | 11.5 dB | 2.9 | -25.0→-36.5 | 28 | 11.0 |  |
| Emilio Piano ft. Lucie - Maison | 44.128 | 9.3 dB | +33.0 s | 10.2 dB | 1.5 | -9.7→-19.9 | 12 | 10.8 |  |
| Heaven on Earth | 152.691 | 10.6 dB | +34.5 s | 9.3 dB | 0.5 | -11.6→-20.9 | 37 | 10.7 |  |
| Yeshua (Versión Piano) | 412.994 | 10.6 dB | +39.8 s | 13.5 dB | 5.2 | -17.1→-30.6 | 41 | 10.7 |  |
| In This Together | 167.452 | 9.5 dB | +35.6 s | 9.7 dB | 1.6 | -13.5→-23.2 | 10 | 9.9 |  |
| Nils Frahm - Says  | 448.390 | 9.3 dB | +38.3 s | 9.7 dB | 0.5 | -9.3→-19.0 | 2 | 9.6 |  |
| Silver Skies Cinematic Piano | 42.922 | 10.3 dB | +36.6 s | 10.6 dB | 3.4 | -14.0→-24.6 | 13 | 9.6 |  |
| Spring is Coming | 75.668 | 12.5 dB | +40.0 s | 8.8 dB | 1.9 | -16.6→-25.4 | 48 | 9.1 |  |
| Armin van Buuren - Here For You (from 'Piano' album) | 147.062 | 9.4 dB | +39.3 s | 8.0 dB | 2.4 | -12.2→-20.2 | 21 | 7.9 |  |
| deadmau5 - Strobe | 271.752 | 20.0 dB | +40.0 s | 6.3 dB | 0.3 | -7.0→-13.2 | 84 | 7.8 |  |
| I Feel It Coming - The Weeknd (Saxophone Cover) | 217.415 | 18.7 dB | +40.0 s | 6.0 dB | 1.3 | -13.5→-19.5 | 56 | 6.5 |  |
| Sax for the Last Customer | 124.303 | 19.4 dB | +33.6 s | 5.5 dB | 1.2 | -12.5→-18.0 | 63 | 6.3 | V4 (reservada) |
| Light Fills the Room | 167.996 | 11.8 dB | +40.0 s | 4.8 dB | 1.4 | -12.1→-17.0 | 54 | 5.5 |  |
| Luxury, Elegance, Refined - Oficial Vídeo Clipe | 128.141 | 10.5 dB | +40.0 s | 4.3 dB | 1.7 | -12.8→-17.1 | 42 | 4.7 |  |
| Ludovico Einaudi - Einaudi Fly | 77.103 | 9.9 dB | +39.7 s | 3.8 dB | 1.3 | -15.2→-19.0 | 13 | 4.5 |  |
| Ivory Skyline Reverie | 143.146 | 14.1 dB | +34.7 s | 3.6 dB | 1.3 | -9.7→-13.4 | 52 | 4.4 |  |
| Fortitude (Light Version) | 9.834 | 11.3 dB | +34.9 s | 4.7 dB | 3.3 | -19.4→-24.1 | 16 | 3.9 |  |
| Becoming I Judah Earl | 14.922 | 24.2 dB | +33.4 s | 7.0 dB | 6.3 | -15.7→-22.8 | 14 | 3.8 |  |
| Epic Inspirational and Cinematic Motivational - by AShamalue… | 120.639 | 9.6 dB | +38.5 s | 2.8 dB | 0.7 | -8.9→-11.6 | 9 | 3.6 |  |
| Cornfield Chase | 42.313 | 9.7 dB | +33.1 s | 0.1 dB | 1.0 | -17.4→-17.5 | 4 | -0.1 |  |

(41 pistas con entrada fuerte; faltan *Time* y *Return to Oasis*, que el escáner no devolvió: ya están usadas.)
