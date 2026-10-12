# One Living · Envigado — catálogo de material para mezclar vídeos

> Propiedades Luxur · catálogo del 2026-10-06 · proyecto 022 (V6 del registro de reels; es el PRIMER reel de esta propiedad)
> Origen: `/Volumes/SSK SSD/Work/Propiedades Luxur/Apartamento - One Living - Envigado/Videos/` (4 carpetas: `1 Hooks`, `2 Mitad`, `4 recorrido` —en minúscula—, `5 Cta`; **no hay `3 Dron`**: esta propiedad no tiene dron). Se ignoran los archivos `._*` (metadatos de macOS, 4 KB). La carpeta hermana `Fotos/` (11 JPG 4:3 con la marca de agua «PL» incrustada) no se usa.
> Estado: **borrador para aprobar.** Lo que dicen las tomas sale de whisper-small con vocabulario de la propiedad y SIN revisar al oído; lo dudoso va entre ¿? y se mide antes de la final (R31). Los nombres de las habitaciones (qué alcoba es la «principal» y cuál la «secundaria») salen del NOMBRE de los archivos y de comparar fotogramas, no de una planta: ver §3.

## 0. Cómo usar este archivo

Cada clip tiene un **código** (el que lleva su copia en `proyectos/022/original/`, con sha256 en `original/ORIGEN.tsv`): *«monta HK2 con MD1 y CT1»*. **No reutilices los códigos de Los Patios** (`proyectos/017/catalogo-material.md`): `RC10` de una propiedad no es `RC10` de la otra.

| Prefijo | Qué es | Carpeta | Clips |
|---|---|---|---|
| `HK` | Hook: Isabella a cámara | `1 Hooks` (hook1-hook4) | 4 · 28,7 s |
| `MD` | Mitad: Isabella a cámara | `2 Mitad` (medio1-medio3) | 3 · 18,3 s |
| `CT` | CTA: Isabella a cámara | `5 Cta` (cta1-cta3) | 3 · 16,3 s |
| `RC` | Recorrido, sin voz en la pieza (RC14 lleva a Isabella hablando y caminando: ver su ficha) | `4 recorrido` (16 clips, orden alfabético del nombre) | 16 · 243,9 s |

Formato de TODOS (ffprobe): HEVC 3840×2160 con `rotation=−90` (pantalla vertical 2160×3840), audio AAC. **Dos fuentes de color**: HLG (`arib-std-b67`, ≈ 29,97 fps; hook4 a 30) en las 10 tomas de Isabella y en `RC14`; **SDR BT.709 a 30 fps** en los otros 15 recorridos. `normalizar.mjs` las trata distinto (tone-map con VideoToolbox solo a las HLG) y todo sale a 1296×2304 y 30 fps en `remotion/public/recorrido-022/`.

Los tiempos de abajo son los del clip normalizado (≈ los del original; 29,97 → 30 fps no mueve nada a esta escala). La voz de cada toma sale de `limites-voz.py` (energía), **no** de whisper (R29).

## 1. La propiedad (ficha)

Leída de https://propiedadesluxur.com/es/propiedades/envigado/loma-del-escobero/apartamento-nuevo-en-venta-en-one-living-loma-del-escobero el 2026-10-06. **Escrito en la ficha** vs **inferido por mí**:

| Dato | Valor | Fuente |
|---|---|---|
| Proyecto / ubicación | One Living, Loma del Escobero, Envigado | ficha |
| Unidad | piso 11, Torre 2, tipología REFLEX | ficha |
| Área | **76 m²** (la tipología REFLEX del proyecto publica 71-75 m²: no cuadran; la ficha de la unidad dice 76) | ficha · el rango, de tu mensaje (no lo pude releer) |
| Alcobas / baños / parqueaderos | 2 / 3 (dos privados + uno social) / 1 | ficha |
| Precio | COP 843 millones | ficha |
| Estado | «para estrenar con acabados completos» · entrega «en unos tres meses» **según el asesor, el 6-oct-2026** | ficha |
| Operación | **venta por cesión de contrato** | ficha |
| Acabados | piso de apariencia madera, techo de concreto a la vista, ventanales con marco negro, cocina con isla (2,20 × 2,25 m) y estufa a gas de 4 puestos, balcón de 1,40 × 3,30 m | ficha |
| Zonas comunes | rooftop con piscina panorámica y jacuzzi, gimnasio, solárium, coworking: **«se entregan con la segunda etapa»** | ficha |
| Ubicación relativa | contiguo a City Plaza | tu mensaje; la lectura que hice de la ficha no lo devolvió: confírmalo (MD3 lo dice) |
| **No consta** | estrato, administración, predial, año de construcción, escritura | ficha |

## 2. Lo que dicen las tomas de Isabella

Presentadora: **no puedo confirmar quién es por una cara**; coincide con lo que describes (misma camiseta blanca de cuello fruncido y pantalón oscuro en las 10 tomas, y en RC14). Dímelo tú si no es Isabella Cadavid.

Whisper-small con `--prompt` de vocabulario, DTW por palabra; entre corchetes, la probabilidad MÍNIMA de un token de la palabra (< 0,5 = dudosa). Ventana de voz = `limites-voz.py`; «aire» = silencio antes/después dentro de la toma.

| Toma | Dura | Voz (s) · aire antes/después | Dice | LUGAR | Cifras | Palabras dudosas |
|---|---|---|---|---|---|---|
| **HK1** | 5,30 | 0,36 → 4,55 · 0,36 / 0,76 | «76 metros pueden sentirse muy diferentes cuando están bien distribuidos.» | SALA | **76** | «pueden» [0,46] |
| **HK2** | 8,31 | 0,38 → 4,04 · 0,38 / 4,27 (pausa 3,06-3,26) | «Si para ti un apartamento sin balcón no es opción, mira esto.» | BALCON | — | «balcón» [0,64], «no» [0,52], «Si» [0,53], «un» [0,57] |
| **HK3** | 6,04 | 0,72 → 5,19 · 0,72 / 0,86 (pausa 4,11-4,49) | «Si quieres un apartamento para vivir o considerar para renta corta, mira esto.» | SALA | — | ninguna |
| **HK4** | 9,07 | 0,58 → 8,11 · 0,58 / 0,95 (pausas 3,19-3,69 y 4,33-4,71) | «¿Vale la pena comprar ahora en vez de esperar la Torre 2? Claro que sí, ya que tienes una plusvalía segura de 94 millones de pesos.» | COCINA/ENTRADA | **94 millones** | «¿Vale» [0,55], «comprar» [0,50], «en» [0,34], «plusvalía» [0,64] |
| **MD1** | 6,97 | 0,54 → 6,41 · 0,54 / 0,56 | «Aquí cada habitación tiene su baño y su vestier, además de estar conectada con la zona social y el balcón.» | ALCOBA SECUNDARIA | — | «Aquí,» [0,44], «habitación» [0,39], «vestier» [**0,27**], «además» [0,60] |
| **MD2** | 5,24 | 0,65 → 4,34 · 0,65 / 0,90 | «Aquí el balcón se convierte en una extensión de la zona social.» | SALA (ella, en el balcón al fondo) | — | «balcón» [**0,43**], «el» [0,63] |
| **MD3** | 6,07 | 1,09 → 5,38 · 1,09 / 0,69 (pausa 3,01-3,21) | «Cuenta con dos habitaciones independientes, balcón y ubicación junto a City Plaza.» | SALA | — | «Balcón» [**0,29**], «ubicación» [**0,20**], «junto» [0,42] |
| **CT1** | 5,84 | 0,66 → 5,37 · 0,66 / 0,47 | «Estamos en la Loma del Escobero, en Envigado. Si quieres más información, contáctame.» | ALCOBA PRINCIPAL | — | «Escobero» [0,57], «Envigado» [0,56], «mi» [0,57] |
| **CT2** | 4,87 | 0,03 → 4,26 · pausa 0,10-0,95 (850 ms) · 0,62 después | «Si te gusta esta vista, contáctanos y agendemos una visita.» | BALCON | — | «contáctanos» [**0,34**] (whisper: «contacta nos»), «agendemos» [**0,35**] («ajendemos»), «contacta» [0,48] |
| **CT3** | 5,61 | 0,67 → 4,99 · 0,67 / 0,61 (pausa 3,95-4,12) | «Si quieres ampliar tu portafolio y maximizar tu rentabilidad, te explico cómo.» | COCINA | — | «rentabilidad» [0,47] |

Notas de toma:

- **CT2**: la «voz» que `limites-voz.py` marca en 0,03 s es un ruido de 70 ms (el clic de arrancar); la voz de verdad empieza hacia **0,95 s** (hay 850 ms de silencio). Su aire real antes de hablar es ≈ 0,95 s.
- **HK2** guarda 4,27 s de aire DESPUÉS de hablar: ella sale de cuadro hacia los 6 s y quedan ≈ 2,3 s de **vista limpia del balcón** (ciudad, tejados de las casas, montaña, nubes). Es un plano de vista aprovechable sin voz.
- **HK1, HK2, HK3 y MD2** tienen la baranda del balcón o del corredor cubierta con **malla negra** (se ve en HK2 a 6-7,5 s y en RC01 a 3-4,5 s): afea la vista si se encuadra de cerca.
- **HK3** arranca con la hornilla y la campana en primer plano (el plano avanza de la cocina a la sala, ella al fondo, delante del ventanal de la corredera).
- Todas las tomas traen **de 0,36 a 1,09 s de aire antes de la voz**: ≥ 0,43 s (disolvencia que acaba en un golpe, §4 del encargo) solo en HK3 (0,72), HK4 (0,58), MD1 (0,54), MD2 (0,65), MD3 (1,09), CT1 (0,66) y CT3 (0,67); HK1 (0,36) y HK2 (0,38) entran a corte salvo que se haga con 12 f exactos (0,40 s: no caben).

Qué se ve en cada toma, a ~1,5 s (hojas en `proyectos/022/contactos/`):

| Toma | 0,0 · 1,5 · 3,0 · 4,5 · 6,0 · 7,5 s |
|---|---|
| HK1 (`hk1.png`) | puerta del balcón (marco negro, ladrillo a la izquierda), ella pequeña al fondo de la sala · a media sala · plano medio-largo · plano medio. Cocina de madera detrás. Ella camina hacia cámara. |
| HK2 (`hk2.png`) | ella al fondo del balcón, visto desde dentro · camina · plano medio · plano medio-cerca, sonríe · sale de cuadro, queda la vista · vista limpia (cielo grande). |
| HK3 (`hk3.png`) | hornilla/campana en primer plano · isla · sala con ella en el ventanal (montañas) · ella avanzando · plano medio-largo. |
| HK4 (`hk4.png`) | entrada/pasillo: ella lejos, con la cocina (isla blanca) al fondo · camina hacia cámara · plano medio-largo · plano medio · plano medio · plano americano · plano cerrado (9,0 s). |
| MD1 (`md1.png`) | techo de concreto, alcoba: al fondo, las puertas del baño y del vestier (luz encendida) · ella camina hacia cámara · gesto con la mano · plano medio · plano medio. |
| MD2 (`md2.png`) | puerta de madera en primer plano (se abre desde el pasillo) · la sala vacía, la corredera al balcón con ladrillo, ella al fondo, en el balcón · igual · ella gesticula. |
| MD3 (`md3.png`) | sala con la corredera al balcón a la derecha y una puerta a la izquierda; ella al centro · gesto abierto · plano medio · plano medio-largo · camina a la derecha. |
| CT1 (`ct1.png`) | alcoba con mueble blanco empotrado en la esquina y el ventanal con la ciudad · ella abre los brazos · camina · plano medio-largo. |
| CT2 (`ct2.png`) | balcón; ella lejos, bajo el techo de concreto con la vista (ciudad y cielo) · camina · plano medio · plano medio-cerca. |
| CT3 (`ct3.png`) | cocina de isla en primer plano, ella al fondo bajo la puerta de madera · camina · gesticula · plano medio. |

## 3. El piso

Orden físico **deducido** de `recorrido caminando` (RC14) y de `sala, habitacion secundaria, vestier` (RC15), no de una planta. Lo que sigue es lo que se ve; lo no verificable va marcado.

**Orden de entrada hacia el fondo (sentido I):**
1. **Entrada** (RC14 0-3 s: puerta de madera que se abre; ella entra) → directamente la **zona social abierta**.
2. **Cocina con isla** (estufa de 4 puestos, campana de acero, mesón blanco, mueble de madera; RC05, RC06, RC09 20-26 s, RC14 18-22 s) y, al fondo de la cocina, una **zona de ropas/despensa** estrecha con lavaplatos y baldosa gris (RC06 6-10,5 s).
3. **Sala** con la **corredera de vidrio y marco negro al balcón** (ladrillo a un lado) y el techo de concreto a la vista (RC05 7,5-10 s; RC06 12-15 s; RC15 0-1,5 s).
4. **Balcón**: 1,40 × 3,30 m según la ficha; baranda con malla negra; vista a la ciudad, tejados rojos, montaña y nubes (RC01, HK2, CT2, RC14 12-17 s).
5. **Pasillo / puerta de madera** hacia las alcobas (RC05 6 s, MD2 0 s, RC14 24 s).
6. **Alcoba secundaria** (la del ventanal con montañas y torre de ladrillo en el fondo): RC13, RC12, RC15, RC11; con **baño y vestier** (puerta del baño abierta con sanitario visible; el vestier, de madera con cajones y barra) → MD1.
7. **Alcoba principal** (ventanal con la ciudad y un mueble blanco empotrado en la esquina): RC10, RC07, RC08; con **baño y vestier** (RC02, RC16) → CT1.
8. **Baño social**: ¿el de RC03/RC04 «baño habitacion secundaria»? (los dos nombres dicen «habitación secundaria»: son el baño PRIVADO de esa alcoba. **El baño social no está filmado**, o no lo distingo.)

**Los dos sentidos de paseo posibles:**
- **Sentido I (entrada → fondo)**: cocina → sala → balcón → (vuelta) pasillo → alcoba secundaria → alcoba principal. Es el orden de RC14.
- **Sentido II (fondo → balcón)**: alcoba principal → alcoba secundaria → pasillo → sala → balcón. Lleva el clímax a la vista del balcón, pero la mayoría de los clips avanzan HACIA el balcón (RC05, RC06, RC01 acaba mirando adentro), y eso casa mejor con el I.

**Lo que NO puedo verificar sin la planta:** (a) cuál alcoba es «principal» y cuál «secundaria» (sigo los nombres de archivo: la del mueble blanco es la «principal»); (b) si **cada alcoba** da al balcón (MD1 dice «cada habitación … conectada con la zona social y el balcón»: en RC14 el balcón se alcanza desde la sala, no desde las alcobas); (c) si la zona de ropas está dentro del apartamento o es un cuarto útil; (d) a cuál habitación corresponde el baño que ella nombra «social»; (e) la orientación/vista (montañas al fondo de la alcoba secundaria y ciudad en la principal).

## 4. Recorridos (`RC`, 16 clips, 243,9 s)

Todos mudos en la pieza (traen audio ambiente estéreo que no se usa). Código = orden alfabético del nombre en el disco.

| Código | Archivo | Dura | Formato | Qué se ve, a ~1,5 s | Movimiento · uso · ojo |
|---|---|---|---|---|---|
| **RC01** | `balcon - paneo.MOV` | 9,10 | SDR | 0-3: cielo con nubes y vista de la ciudad y los tejados → 4,5: la baranda con malla negra y el techo del balcón → 6,0: el balcón desde fuera, la corredera → 7,5-9: se asoma a la sala: cocina y piso de madera | Paneo de la vista hacia el balcón y hacia adentro. **El plano más limpio de vista + balcón** y acaba mirando la cocina (sentido I). Malla negra a 3-5 s. |
| **RC02** | `bano habitacion principal.MOV` | 4,10 | SDR | baño gris con ducha de vidrio, sanitario, lavamanos de vessel sobre mueble de madera | Avanza hacia el lavamanos. Corto. Idéntico en mirada al RC04 (otro baño). |
| **RC03** | `bano habitacion secundaria, paneo hacia habitacion.MOV` | 7,20 | SDR | 0-1,5: el baño · 3,0: la puerta · 4,5: pared blanca vacía · 6,0: ventanal con montañas | Sale del baño hacia la alcoba y llega al ventanal. **Útil como puente baño → alcoba.** 4,5 s es pared blanca (no entrar ahí). |
| **RC04** | `bano habitacion secundaria.MOV` | 4,80 | SDR | baño con la puerta abierta → lavamanos → lavamanos más cerca | Casi igual a RC02; confundibles: se distinguen por el mueble. |
| **RC05** | `cocina, paneo a sala y balcon.MOV` | 10,34 | SDR | 0-4,5: isla blanca con la estufa y la campana → 6,0: pasa por la puerta de madera → 7,5: sala vacía, la corredera al balcón → 9,0: el balcón por la corredera | Paneo hacia la derecha. **Cocina → sala → balcón** (sentido I). Buen primer plano de recorrido. |
| **RC06** | `cocina, sala, balcon.MOV` | 15,54 | SDR | 0-3: cocina abierta con el ventanal al fondo → 4,5-12: recorre la cocina y la zona de ropas (lavaplatos, nevera) → 13,5-15: sala con el mesón blanco | Largo. La mitad central (6-10,5 s) es la zona de ropas: **ojo, mucho amarillo cálido** (luz). Último tramo, sala y mesón. |
| **RC07** | `habitacion principal - entrando.MOV` | 8,63 | SDR | 0-1,5: pasa por la puerta de madera → 3,0: columna blanca → 6,0-7,5: la alcoba (mueble blanco, ventanal a la derecha) | Entra a la alcoba principal. Raccord con RC10/CT1. Los primeros 4,5 s son puerta y columna (poco). |
| **RC08** | `habitacion principal - paneo 2.MOV` | 7,74 | SDR | 0: cielo con nubes → 1,5: ventanal de cerca, ciudad → 3,0: la alcoba → 4,5-7,5: techo de concreto, y al fondo las puertas del baño y del vestier | Paneo del cielo a la alcoba. **Sentido II** (de la vista hacia dentro). 0-1,5 s: cielo/vista fuerte. |
| **RC09** | `habitacion principal - paneo.MOV` | **63,25** | SDR | **Clip largo: una caminata continua por TODA la casa.** 0-2: ventanal de la alcoba (marco negro, ciudad) → 4-10: pasillo, baño → 12-14: vestier con cajones → 16: alcoba con ventanal → 20-26: cocina e isla, estufa en primer plano → 28-32: sala y balcón → 34-42: alcobas → 44-48: baño/vestier → 50-62: vuelta por la cocina y la sala | No es un paneo: es una caminata. Se mina por ventanas (ver abajo). Mucha puerta de madera en primer plano. |
| **RC10** | `habitacion principal.MOV` | 8,07 | SDR | 0-3: ventanal de la alcoba con la ciudad (torres) y el mueble blanco a la izquierda → 4,5: esquina → 6,0-7,5: pared blanca y una puerta de madera | Se acerca despacio al ventanal y gira. **Casa con CT1** (misma alcoba y mismo ventanal). Los últimos 2 s son pared. |
| **RC11** | `habitacion secundaria - paneo.MOV` | 14,57 | SDR | 0-1,5: cielo, ciudad y tejados → 3,0: la baranda del balcón/corredor → 4,5: pared blanca → 6,0-13,5: se acerca a las puertas del baño y del vestier (luz encendida) | Paneo de la vista a las puertas. **Casa con MD1** (mismas puertas). Pared blanca a 4,5 s. |
| **RC12** | `habitacion secundaria - zoom in ventanal.MOV` | 11,30 | SDR | 0-4,5: el ventanal de la alcoba, montañas y ciudad → 6,0: el marco negro llena el cuadro → 7,5-10,5: el cielo grande, nubes, ciudad y tejados rojos | Zoom hacia el ventanal. **El mejor plano de vista abierta** y cierra con el cielo: candidato al clímax. |
| **RC13** | `habitacion secundaria.MOV` | 5,13 | SDR | 0-1,5: ventanal con montañas y torre de ladrillo → 3,0: pared → 4,5: pared blanca | Paneo lento. Los 3 primeros segundos son los útiles. |
| **RC14** | `recorrido caminando.MOV` | **49,84** | **HLG** | **Clip largo, con Isabella visible y hablando** (audio: «Hay apartamentos para vivir y hay otros que te dan más posibilidad…» al principio y «Si te gustó este apartamento y deseas tener más información, contáctame» hacia los 30+ s; whisper, sin revisar). 0-2: la puerta de entrada → 4-8: ella entra y recorre → 10-12: hacia el balcón → **12-17,5: balcón y vista, SIN ella (ventana útil)** → 18-22: cocina e isla (ella de espaldas) → 24-28: puertas de baño y vestier → 30-48: alcobas, ella al fondo y al final a cámara | La caminata en segunda persona. Solo vale como cantera de la ventana de balcón (12-17,5 s) o de la entrada; en el resto sale ella. **Es HLG**: se tone-mapea. |
| **RC15** | `sala, habitacion secundaria, vestier.MOV` | 17,70 | SDR | 0-1,5: la sala con la corredera al balcón → 3,0: pasa la puerta de madera → 4,5-9: la alcoba secundaria con el ventanal y las montañas → 10,5: pared → 12-13,5: puerta del baño con el lavamanos → 15-16,5: el vestier | **El plano de paso más largo y mejor ordenado**: sala → alcoba secundaria → baño/vestier. **Casa con MD1.** Pared blanca a 10,5 s. |
| **RC16** | `vestier habitacion principal.MOV` | 2,03 | SDR | el vestier de madera con cajones y barra, la puerta entreabierta | Muy corto (2 s). Solo como inserto. |

**Ventanas útiles de los dos clips largos** (por mirar los hojas `rc09.png` cada 2 s y `rc14.png`; se afinan al montar):

- **RC09** (63,25 s): 0-2 (ventanal de la alcoba), 10,5-14 (vestier con cajones, el plano más rico), 20,0-26,5 (cocina: isla y estufa, la mejor imagen de la cocina de todo el rodaje), 28-32 (sala hacia la corredera y el balcón), 38-42 (alcoba con ventanal), 44-47 (puerta a baño/vestier). Resto: puertas de madera en primer plano.
- **RC14** (49,84 s, HLG): 12,0-17,5 (balcón y vista, sin ella). El resto lleva a Isabella en cuadro.

## 5. Hoja de uso

| Necesito… | Candidatos limpios (ver `analisis-uso.md`) |
|---|---|
| Apertura limpia | RC01 (balcón, 4,5-6,5 s), RC13 (ventanal, 0-3 s), RC10 (ventanal, 0-3 s), el final de HK2 (vista, 6-8 s: tiene voz? no, ya habló) |
| Umbral → cocina → sala | RC05, RC06, RC15 (0-3 s) |
| Alcobas | RC15, RC13, RC11 (secundaria) · RC07, RC10, RC08 (principal) |
| Baños y vestier | RC03, RC04 (sec.) · RC02, RC16 (ppal) |
| Vista (clímax) | RC12 (zoom al ventanal, 7,5-11,3 s), RC01 (0-3 s), RC08 (0-1,5 s), RC11 (0-3 s) |
