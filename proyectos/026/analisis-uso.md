# 026 · One Living (Envigado) — análisis previo a elegir (2026-10-06)

> Primer entregable de la **V10** (cuarto reel de One Living). Catálogo del material: `proyectos/022/catalogo-material.md` (no se rehace; vive en el worktree `reel-022`). Lo medido lo digo; lo que no pude verificar, también. **Estado: a la espera de que el usuario elija la vía (a / b / c) y la mitad; nada reservado todavía.** Las secciones C y D quedan a medias a propósito: la rejilla de cortes depende de si hay mitad y de cuál.

## 0. Dónde estoy (lo leído, 2026-10-06)

- `origin` = `git@github.com:jalvarez-tech/video-creator.git`. `origin/main` (489bfbd) lleva el registro más avanzado: V1-V8 y **«V9 · 025 libre»**. No hay ninguna rama `origin/feat/reel-*` abierta ni PR abiertos (los #1-#15 están fusionados).
- **Numeración: soy la V10 · 026, no la V9 · 025.** El encargo dice «V10 (proyecto 026)» y el texto de apoyo dice «V9 / 025»; en el estudio hay otro worktree, `reel-v9-los-patios-f732f9` (rama `claude/reel-v9-los-patios-f732f9`), con `proyectos/025/` sin commit y sin reserva publicada: es la V9 de **Los Patios**, de otra sesión. Dejo la fila V9 como está y reservaré V10 · 026 (se vuelve a mirar con `git fetch` justo antes de publicar; si la otra sesión reserva 025, el conflicto del registro es trivial y lo resuelve quien se fusione segundo).
- Mi checkout es el worktree `reel-v9-one-living-08781e` (rama `claude/reel-v10-one-living-a6d0dd`, = `origin/main`); al reservar la renombro a `feat/reel-026-<tema>` (es un worktree propio cortado de `origin/main`: no hace falta otro).
- Entorno listo: `remotion/node_modules` (clonado de `reel-024`), `archivos/whisper/ggml-small.bin`, las 26 copias de `proyectos/026/original/` con **sha256 26/26 iguales** a `ORIGEN.tsv`, y `proyectos/026/herramientas/` (la de la V8 con 024→026; los rangos de `buscar-cortes.py` y las tablas de `medir-color.py`, `lineas-vs-onsets.py`, `alinea-renders.py`, `saltos-luma.py` y `hoja-stills.py` están por rehacer). Material, música y skills de estudio presentes. Disco: 48 GB libres.

## A. Lo que queda

Confirmado contra el registro: **no queda ningún hook, mitad ni CTA limpio.**

| Bloque | Estado en el registro |
|---|---|
| Hook | HK1 (V8) · HK2 (V6) · HK3 (V7) reservados; HK4 «plusvalía segura de 94 millones» y «esperar la Torre 2» (esta unidad ESTÁ en la Torre 2): no se usa |
| Mitad | MD1 (V6) · MD2 (V8) · MD3 (V7) reservadas |
| CTA | CT1 (V6; la V8 la repitió recortada) · CT2 (V7) reservados; CT3 «maximizar tu rentabilidad»: no se usa |

**Vía (a): repetir tomas en una terna nueva.** Sitios (dónde está ELLA): HK1 SALA · HK2 BALCON · HK3 SALA · MD1 ALCOBA-SEC · MD2 BALCON (cámara en la sala) · MD3 SALA · CT1 ALCOBA-PPAL · CT2 BALCON. De las 18 ternas posibles, con tres sitios distintos y sin ser igual a la V6 (HK2·MD1·CT1), la V7 (HK3·MD3·CT2) ni la V8 (HK1·MD2·CT1r) salen **6**, las mismas que apuntaba el encargo (comprobado):

| Terna | Sitios | Nota |
|---|---|---|
| HK1 · MD1 · CT1 | SALA · ALCOBA-SEC · ALCOBA-PPAL | una cifra (76); sentido I (entrada → fondo); MD1 y CT1 son de la V6 |
| HK1 · MD1 · CT2 | SALA · ALCOBA-SEC · BALCON | una cifra; sentido II, acaba en el balcón |
| HK3 · MD1 · CT1 | SALA · ALCOBA-SEC · ALCOBA-PPAL | sin cifras; HK3 dice «renta corta» (OK dado) |
| HK3 · MD1 · CT2 | SALA · ALCOBA-SEC · BALCON | sin cifras |
| HK3 · MD2 · CT1 | SALA · BALCON · ALCOBA-PPAL | sin cifras; MD2 es la única mitad sin afirmaciones dudosas |
| HK2 · MD3 · CT1 | BALCON · SALA · ALCOBA-PPAL | sin cifras; MD3 es la mitad con todo confirmado en la ficha |

En cuatro de las seis va MD1 (con «conectada con la zona social y el balcón», que **no consta en la ficha**: el plano pone las alcobas en extremos opuestos y el balcón se alcanza desde la sala). CT1 entera arrastra «Escobero» (V6, sin cerrar al oído); recortada a su 2.ª frase («Si quieres más información, contáctame») entra a corte (0,38 s de aire). **Toda terna de (a) son tres tomas ya publicadas**: quien siga la cuenta oye frases que ya conoce.

**Vía (b): la voz de RC14**, que ninguna versión ha usado como toma. Medido hoy (abajo, §B): trae un **hook** y un **CTA** completos y limpios, con la voz de su propio clip. Falta una mitad: o se repite una (MD2 o MD3) o no hay (reel de ≈ 30 s, «versión corta» del formato) — lo decide el usuario.

**Vía (c): rodar** hooks, mitades y CTA de One Living con `guion-luxur` (ficha → guion → hoja de rodaje). Es el camino honesto para más reels de esta propiedad: lo dejo preparado si se elige.

## B. Cumplimiento y medidas de RC14 (`recorrido caminando.MOV`)

**El clip.** 49,84 s, HEVC 3840×2160 con `rotation=-90`, **HLG** (`arib-std-b67`), 29,97 fps (1494 fotogramas; a 30 fps salen 1495). Audio AAC. **Es una sola toma continua**: ella abre la puerta de entrada, entra, recorre el piso y acaba hablando a cámara en una alcoba. Whisper-small (sin vocabulario) en el clip entero oye **26 palabras y solo en dos tramos**; entre el segundo 6,3 y el 45,2 solo hay ambiente (−47 a −55 dB de media, picos de −29 dB; la voz está a +40 dB sobre eso).

| | Hook | CTA |
|---|---|---|
| Tramo de voz (`limites-voz.py` + energía) | **1,82 → 6,31 s** (4,5 s; 1,82 s de aire antes) | **45,22 → 49,35 s** (4,1 s; 0,49 s de cola hasta el final del clip, 49,84 s) |
| Dice (whisper-small, 3-6 cortes) | «Hay apartamentos para vivir y hay otros que te dan más posibilidad. **Ven, te muestro.**» | «Si te gustó este apartamento y deseas tener más información, contáctame.» |
| Sonoridad de la voz | −22,3 LUFS | −22,7 LUFS (las otras tomas de Isabella: −22,3 a −22,8: +1,3 / +1,7 dB a −21) |
| Dónde está ella | **ENTRADA**: abre la puerta de madera, sonríe, camina hacia la cámara con la cocina y la sala detrás; en «ven» gesticula, se gira y entra (de espaldas a los 6,2 s) | **ALCOBA** (el ventanal de esquina, con la ciudad y un muro de ladrillo a la izquierda): camina hasta el ventanal, se gira a cámara y se acerca hablando; acaba sonriendo muy cerca de la cámara |
| Cifras | ninguna | ninguna |

**Lo que veo (fotogramas a 1,5 · 1,7 · 1,9 · 2,1 · 5,4 · 5,8 · 6,2 · 6,6 s y a 48,6-49,8 s; hojas en `proyectos/026/contactos/`):**
- *Hook.* El fotograma en el que arrancaría (≈ 1,6 s, la primera palabra a ≈ 6,6 f) es **una puerta de madera que llena la mitad derecha del cuadro y ella pequeña, al fondo y a la izquierda, medio tapada por el marco**; a los 1,9 s ya se la ve entera. No es un primer plano de miniatura: es un plano ancho con un puente humano (la puerta que se abre). Cierra con el gesto de «ven» y ella de espaldas entrando: **el corte al paseo de la cocina es natural** (ella te lleva dentro).
- *CTA.* Plano ancho y luego se acerca; **lleva el micro de solapa a la vista** (un clip negro en el escote, visible desde los ≈ 47 s) que no se ve en HK/MD/CT1-3. Cierra sin congelar nada: a 49,8 s sigue sonriendo en cuadro (cara dentro, a la derecha), así que el fundido a negro de 6 f cabe en la cola de 0,49 s sin comerse la última palabra.
- *Qué alcoba es.* **No lo puedo cerrar.** El encargo dice «alcoba principal»; el ventanal de RC14 (esquina, muro de ladrillo a la izquierda, montañas y ciudad) no coincide con el de CT1/RC10 (ventana de 3 hojas con árboles y un mueble blanco empotrado) ni con el de RC12/RC13 (montañas y tejados rojos, ventana más pequeña). La planta no está. Lo anoto como «ALCOBA (la del ventanal de esquina)» y, como mínimo, es un sitio distinto de ENTRADA/SALA/BALCON.

**Palabras a cerrar (R31; todo medido, nada oído):**

| Palabra | Qué veo | Segundo en RC14 | Estado |
|---|---|---|---|
| «**te muestro**» (hook) | whisper oye «vente monstruo / bente muestro / hay 20 muestros» según el corte (el mismo patrón que «ven, te enseño» de Los Patios); la lectura que cuadra es «ven, te muestro»: 4 sílabas tras un valle de −59 dB, onsets en 5,575 · 5,790 · 5,890 · 6,230 s | ≈ 5,6-6,3 | cerrada por gramática y por el patrón de cortes; **por oír** |
| «posibilidad» | singular: tras la /a/ de «dad» (F1 ≈ 800-870, F2 ≈ 1.800-1.950 Hz, como las /a/ de la toma) la energía cae de −25 a −41 dB (la /d/) y hasta −50 dB (silencio) sin vocal ni /s/ detrás; con la voz de solapa la /s/ no se ve | ≈ 4,7-5,4 | medida: «posibilidad», no «-es»; **por oír** |
| «gustó» | la vocal tónica mide F1 ≈ 630-720, F2 ≈ 850-1.150 Hz (posterior: una /o/); las /a/ de la misma toma, F1 ≈ 690-870 y F2 ≈ 1.560-1.880 | ≈ 46,2-46,35 | medida: «gustó», no «gusta»; **por oír** |
| «contáctame» | whisper oye «contactame» (p 0,33 en una sílaba media); la última sílaba mide F1 ≈ 580-620, F2 ≈ 2.650 a −55 dB tras una /m/ (F1 ≈ 340-450, F2 ≈ 610-640): una [e] muy débil, no «mi» | ≈ 49,26-49,45 | medida (como en la V8): **por oír** |

**Cumplimiento contra la ficha.** Ninguna de las dos frases lleva cifra, precio, plazo ni nombre propio, ni promete rentabilidad ni valorización. Un matiz que decide el usuario: **«te dan más posibilidad»** es vaga («¿posibilidad de qué?»); no afirma nada comprobable, pero en un proyecto promocionado para renta por plataformas puede leerse como insinuación de renta. No se puede recortar sin romper la frase. El CTA no da canal (como CT1/CT2). Nada se dice del área, las habitaciones ni la entrega.

**Lo que esto cambia en el montaje.**
- Hook ≈ **5,0 s** (de ≈ 1,6 a ≈ 6,6 s del clip): 0,3 s menos que HK1, así que el golpe del paseo cae hacia 5,0 s. CTA ≈ **5,0 s** (de ≈ 44,8 s, 12 f antes de la primera palabra, hasta el final del clip, 49,84): **cabe una disolvencia de entrada** (a diferencia de CT1 recortada) y la cola da para el fundido a negro.
- Hook y CTA salen **del mismo archivo**, 38 s aparte: la puerta de metraje compartido los verá como el mismo clip (ventanas distintas, ninguna solapada). El paseo puede usar de RC14 la ventana de balcón y vista (13,5-16,5 s, 2,7 s limpios) declarándola.
- **Es HLG** (tone-map con VideoToolbox, como las tomas de Isabella) y 29,97 fps.
- La historia que cuenta es la del propio RC14: entrada → zona social (cocina, sala, balcón) → alcobas → ventanal. **Sentido I**, con las alcobas en extremos opuestos y el balcón al centro; la mitad, si la hay, cae en el centro del paseo (MD2 en el balcón encaja con él).

## C. Canciones — pendiente de la estructura

La rejilla de cortes depende de si hay mitad y de cuál: con MD2 el par de golpes de la mitad va a 131-154 f; con MD3, a 158-167 f. Lo ya medido en la V8 (estructura de la V7 con la mitad de MD2, mismas restricciones; el hook de RC14 dura ≈ 0,3 s menos que HK1, así que hay que rehacerlo):

| Canción libre | Cae a (LUFS) | Soluciones (MD2) | Golpe más débil (disolv. / seco) | Plano más corto |
|---|---|---|---|---|
| ByErik – desolate (Slowed) | 118,0 s (9,2 / 20,2 dB) | 418 / 2.533 | 9,1 / 10,4 | 67 f |
| Heaven on Earth | 209,5 s (10,3 dB); la pista acaba 3,5 s después | 2.920 / 5.656 | 10,4 / 8,1 | 73 f |
| Ivory Skyline Reverie | 194,5 s; la pista acaba 2,5 s después | 4.678 | 9,3 / 15,8 | 80 f |

Con MD3 (par 158-167 f) la V7 encontró solución en 6 de 30 canciones y completa solo en *Yeshua* (ya usada): **MD2, o ninguna mitad, abren más canciones.** Sin mitad la estructura se acorta (≈ 30 s) y hay que rehacer el buscador con 7 pares. Cuando se elija la vía: `buscar-entrada.py --cta …`, `buscar-cortes.py` con los rangos de la estructura elegida, `lufs-caida.py` y `curva.py`, y extractos de audio de las candidatas (antes de reservar). Género: ni *La Isla Bonita* ni nada tropical, saxofón pop o «de playa»; *Heaven on Earth* («sereno, cálido, celestial») puede sonar playera, y *desolate* es «soledad, melancolía»: lo confirma el usuario oyendo. Todo medido, nada oído.

## D. Propuesta provisional (a falta de la respuesta)

| Pieza | Elección | Por qué |
|---|---|---|
| Vía | **(b) RC14** | la voz se entiende y son dos tomas nuevas con voz propia del clip; (a) repite tres tomas ya publicadas |
| Apertura | el hook (excepción declarada, `ABRE_CON_EL_HOOK`) | pedido para esta propiedad (sin dron) |
| Hook | RC14 1,6 → 6,6 s (ENTRADA) | «Ven, te muestro» y ella de espaldas entrando = el corte al paseo ya está hecho |
| Paseo (sentido I) | cocina → sala → balcón, con recorridos libres de la lista del encargo | el orden del propio RC14 |
| Mitad | **MD2** (BALCON) o ninguna | MD2: la única sin afirmaciones dudosas y la que más canciones abre; MD3 deja pocas canciones |
| Bloque 5 | alcobas, baño/vestier y la vista (≥ 3 s limpios: RC12 0-4,5 / RC13 0-3) | la vista sin repetir la RC12 7,87-11,3 de la V6/V7 |
| CTA | RC14 44,8 → 49,84 s (ALCOBA) | cabe disolvencia de entrada; cierre sin congelar |
| Canción | a decidir tras la vía (§C) | |
