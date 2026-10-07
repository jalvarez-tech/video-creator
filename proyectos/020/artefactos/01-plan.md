# 01 · Plan narrativo — proyecto 020

> Paso 1 de 3. Se escribe **antes** de tocar Remotion.
> Siguiente: [02-layout.md](02-layout.md).

## Encargo (literal)

> «Haz una versión nueva del reel de una propiedad de Propiedades Luxur. Empieza por ANALIZAR qué canciones y qué combinaciones se han usado ya; solo después eliges, reservas y montas. […] **utiliza una cancion tipo jazz** […] Propiedad: Los Patios (apto 501). […] Pedido específico de esta versión: ninguno.»

Es la **cuarta versión** del reel: el 017, el 018 y el 019 quedan como estaban y esta pieza es un proyecto nuevo, copiado del 019 (la última, aunque no esté en git) y no de las plantillas. Se trabajó en un worktree propio (`feat/reel-020-definir`) porque el checkout del estudio tiene el 019 sin commitear. El análisis previo está en [`../analisis-uso.md`](../analisis-uso.md) y la reserva, publicada en `archivos/musica/registro-de-uso.md` (commit `2e6b296`).

### Cómo se leyó (supuestos declarados — corregibles)

| Frase | Lectura |
|---|---|
| «una canción tipo jazz» | De las 43 pistas de la biblioteca de Luxur, el catálogo declara **una** de jazz: ***Sax for the Last Customer*** («Jazz / smooth jazz con saxofón †»: el † es que el género es **inferido** de título y etiquetas, no oído). Se midió junto a las otras lounge/sax cercanas (tabla abajo) y es la única que encaja; las demás no son jazz o no resuelven donde entra el CTA. **No la he oído** y el encargo no dice qué entiende él por «tipo jazz»: si quería otro color (un piano de bar, un bossa, un jazz más alegre), no hay otra pista en la biblioteca y habría que traer una. |
| «analiza primero» | `analisis-uso.md` (5 fuentes, 3 canciones usadas, tabla de combinaciones, lo que queda y la propuesta) y reserva publicada ANTES de montar. |
| «otra canción, hook, mitad, CTA y dron» (los cinco libres) | **HK03 · MD14 · CT06 · DR156 · *Sax for the Last Customer***. Ninguno estaba tachado ni reservado en ninguna fuente. |
| «la apertura distinta de la de la última versión» | La V3 abrió con la fachada vista desde el suelo (RC25); las V1 y V2, con un dron. Esta abre por la **calle y la entrada del edificio** (RC22, sin usar en ninguna versión), que es lo que el 019 dejó dicho para una V4 («que abra por la calle»). Sin texto ni voz. |
| «tres sitios distintos y como mucho una cifra» | `INT-BLOQUES` · `PATIO` · `INT-ABIERTO`, y **ninguna cifra** en toda la pieza. Ninguno repite el sitio de la misma toma en otra versión (la mitad nunca estuvo en el patio; el hook nunca en la sala de bloques; el CTA nunca en el espacio abierto). |
| «ninguna palabra dudosa sin cerrar» | CT06 trae una («reto»/«resto») y HK03 otra que el registro no anotaba («terminado»/«determinado»). **Las dos se midieron** (ver «Por confirmar») y quedan marcadas «POR CONFIRMAR AL OÍDO»: `revisar-020.mjs --final` falla hasta que se oigan. |
| «una sola canción, rejilla de pulso o de frases, resolución donde entra el CTA» | Sin pulso: va por golpes de nota. No cae a un lecho: **acaba en seco con un acorde (176,986 s)** que cae a 6 f de la última palabra del CTA. Ver «La canción». |
| «el recorrido sale del sitio del hook, sin volver atrás; recorridos sin usar» | **Sentido I** (entrada → terraza). Siete clips de recorrido y dron: tres nuevos del todo en una versión final (RC22, RC04, DR156) y cuatro con una ventana que ninguna versión usó; **no se comparte ni un segundo de metraje** con ninguna versión (la 9b de la puerta lo mide con la V1, la V2 y una instantánea de la V3). Hay un retroceso declarado (abajo). |
| (reglas fijas, heredadas) | La primera toma sin texto ni voz · nunca el sello «PROPIEDADES LUXUR» · cierre en tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com`, nada congelado · subtítulos editoriales abajo al 90 % con la cursiva 8 px menor · voz a −21 LUFS, música sola a −15 y −16 dB bajo la voz · color por plano con `colorCorrection()` · solo corte y disolver. |

## Registro de lo ya elegido (~~tachado~~ = no se vuelve a elegir)

| | V1 · 017 | V2 · 018 | V3 · 019 | **V4 · 020** |
|---|---|---|---|---|
| Canción | ~~*Time*~~ | ~~*Return to Oasis*~~ | ~~*Flying Into the Sun*~~ | ~~***Sax for the Last Customer***~~ (137,615 s) |
| Hook | ~~HK02~~ | ~~HK07~~ | ~~HK05~~ | ~~**HK03**~~ |
| Mitad | ~~MD09~~ | ~~MD07~~ | ~~MD08~~ | ~~**MD14**~~ |
| CTA | ~~CT07~~ | ~~CT01~~ | ~~CT05~~ | ~~**CT06**~~ |
| Dron | ~~DR147~~ · ~~DR163~~ | ~~DR155~~ | ~~DR152~~ | ~~**DR156**~~ |
| Apertura | dron DR147 | dron DR155 | fachada RC25 | **la calle RC22** |
| Recorridos | RC01 RC02 RC07 RC08 (+ RC25) | RC03 RC04 RC05 RC06 RC07 RC10 RC11 (+ RC25) | RC09 · RC13 · RC16 (+ RC25) | **RC22 · RC02 · RC05 · RC09 · RC13 · RC04** (ventanas sin tocar) |

## Cabecera

| | |
|---|---|
| Material | `proyectos/020/original/` (HK03, MD14, CT06, RC22, RC02, RC05, RC09, RC13, RC04, DR156 y la canción) copiados del SSD del rodaje con su código del catálogo; los sha256 de cada uno, en `normalizar.mjs` (los de RC02, RC04, RC05, RC09, RC10 y RC13 coinciden con los de las versiones anteriores: es el mismo archivo). Normalizados a `remotion/public/recorrido-020/`. Catálogo: `proyectos/017/catalogo-material.md` |
| Composición | `Recorrido020` · 1080×1920 · **30 fps** · **1253 f (41,77 s)** *(montaje sin avatar: marcan la música y la voz)* |
| Formato | 9:16 vertical · los seis bloques de `recorrido-luxur` |
| Estilo | **cinematográfico-lujo**: solo `corte` y `disolver`; la cámara ya se mueve (gimbal, dron), así que ningún plano se acelera; empuje lento solo sobre Isabella, la calle y el dron |
| Texto | **editorial** (el modo de Luxur): solo lo que dice Isabella, abajo y a 90 %. **La primera toma sale sin texto.** Sin `<PistaGraficos>` (R14) |
| Marca | Luxur: el **logo** (440 px, 60 % de opacidad) y la **web `PropiedadesLuxur.com`**, **solo en el cierre**, sobre una tarjeta oscura. Nunca el sello ni la cuenta escrita |
| Destino | Reels · TikTok · Shorts |
| Objetivo | que quien busca un apartamento terminado se aparte y quien quiere definir el suyo lo vea como una oportunidad, y escriba |

## Promesa y CTA

- **Promesa (primeros 2,5 s):** la entrada del edificio vista desde el camino, con el rótulo entre las plantas y la cámara subiendo por la fachada de ladrillo hacia las terrazas con jardín, **limpia** (sin texto ni voz: la miniatura es la calle) y con el golpe de apertura de la música (el más fuerte de la canción). En el golpe de 2,53 s, tras una disolvencia, Isabella, en la sala del muro de bloques de vidrio, dice: «Si estás buscando un apartamento totalmente terminado, este probablemente no es para ti».
- **Acción que se pide al final:** «Si es el reto, escríbeme y agendamos una visita» (CT06). **Dos pasos** (escribir + agendar) y el canal NO está dicho: el cierre lleva el logo y la web. ⚠️ Pendiente (el mismo del 017-019): ¿DM o WhatsApp?, y **¿Luxur puede agendar visitas?** (el catálogo ya lo avisaba para CT06).
- **Lo que NO se cuenta:** precio, 317 m², áreas, alcobas, administración, plazos, ALH; **ninguna cifra**. Sí se enseña la obra gris tal cual (pasillo, espacio abierto, alcoba), porque la pieza es honesta con ella: es su argumento.

## El guion (lo único que dice Isabella: tres frases)

| Bloque | Toma | Lugar | Dice | Papel |
|---|---|---|---|---|
| 2 · hook | **HK03** | `INT-BLOQUES` | «Si estás buscando un apartamento totalmente terminado, este probablemente no es para ti.» | descarte que selecciona (ángulo D «Filtro»): baja el volumen a propósito y sube la calidad de los mensajes |
| 4 · mitad | **MD14** | `PATIO` | «No estás viendo un apartamento sin terminar, estás viendo uno que todavía puedes definir.» | el reencuadre del hook: niega (sin terminar) y afirma (definir); la mejor frase de cierre de la objeción según el catálogo |
| 6 · CTA | **CT06** | `INT-ABIERTO` | «Si es el reto, escríbeme y agendamos una visita.» | invitación para quien lo toma como reto; el catálogo la marca como cierre coherente de piezas de filtro (HK03, HK09, MD11) |

Arco: **filtro → reencuadre → invitación**. Leído en voz alta: «si buscas algo terminado, no es para ti» → «lo que ves no está sin terminar: lo puedes definir» → «si ese es el reto, escríbeme». Las imágenes dicen lo mismo: la obra gris sin disfraz, el patio donde habla ella, el cielo desde la ventana y el edificio visto desde arriba.

## Escenas

La canción es *Sax for the Last Customer*: **sin pulso, por golpes de nota**. Un golpe de apertura de 33,7 dB tras un descenso casi a silencio, una meseta plana de −13,9 LUFS con golpes cada 0,35-0,55 s, un respiro a −27 dB hacia los 21-22,5 s de la pieza (bajo la voz de la mitad: no se oye) y un **acorde final seco** a los 39,44 s. Cada plano entra en un golpe MEDIDO (`musica/golpes-020.json`).

| # | Tramo (s) | Narrativa | Idea (una frase) | Hero | Música |
|---|---|---|---|---|---|
| 1 | 0–2,53 | hook | la calle y la entrada del edificio, sin texto ni voz: la miniatura es el edificio limpio | calle | el golpe de apertura (frame 0, 33,7 dB) |
| 2 | 2,53–8,07 | hook | Isabella en la sala de bloques: «Si estás buscando un apartamento totalmente terminado, este probablemente no es para ti» | Isabella | arriba hasta el golpe; baja en 3 f (≈ 10 LU bajo su voz) |
| 3 | 8,07–18,83 | descubrimiento | el pasillo hacia el muro de bloques (4,5 s), el espacio abierto (2,8 s) y el deck y el patio (3,5 s): obra gris y luz | recorrido | arriba; cortes en 242 · 376 · 459 |
| 4 | 18,83–24,60 | conexión | Isabella camina hacia la cámara por el patio: «No estás viendo un apartamento sin terminar, estás viendo uno que todavía puedes definir» | Isabella | abajo |
| 5 | 24,60–36,30 | intimidad → recompensa | la alcoba y su ventanal esquinero (4,4 s), el cielo desde la ventana (2,2 s) y, el más largo, el dron subiendo por los jardines del edificio (5,0 s) | recorrido | arriba, plana; golpes en 738 · 871 · 938 |
| 6 | 36,30–41,77 | recompensa | Isabella en el espacio abierto, que cruza el umbral hacia el deck: «Si es el reto, escríbeme y agendamos una visita»; su imagen funde a negro mientras suena el **acorde final** y cierra la tarjeta oscura con el logo y la web | Isabella | baja bajo su voz y **sube justo antes del acorde (f1183)**; la cola se apaga bajo la tarjeta |

**Lectura del paseo (declarada).** La casa es una línea: la entrada y la sala de bloques en un extremo, el espacio abierto en medio y el deck y el patio en el otro. El hook, que es la promesa, está en la sala (extremo de la entrada); el paseo del bloque 3 va de ahí a la terraza y acaba donde acaba el paseo público, el patio, donde habla ella; el bloque 5 entra en lo privado desde el patio (MD14 acaba retrocediendo hacia el interior y la alcoba abre al deck, según RC13) y sube a la vista; y el CTA, en el espacio abierto, **cruza el umbral hacia el deck** (CT06 acaba en la terraza). **No hay un retroceso de plano a plano, pero sí uno entre el patio (mitad) y el espacio abierto (CTA)**: la pieza visita el extremo de la terraza y vuelve al medio para la invitación. Si no se quiere, la alternativa es otra mitad en el espacio abierto (MD11, con su arranque dudoso) o un CTA en el deck (CT04, que nombra a ALH).

## La canción: lo medido (y por qué esa)

El encargo pedía «tipo jazz». El catálogo (`catalogo-musica.md`) trae una sola de jazz declarada; las otras cuatro cercanas (lounge, sax cover) se midieron con el mismo criterio que la V3 (`buscar-entrada.py --cta 33 40`: un golpe fuerte de entrada, una meseta estable y una caída sostenida donde entra el CTA; **no oye**):

| Pista (género del catálogo †) | Mejor entrada | Golpe | Caída hacia el CTA | Veredicto |
|---|---|---|---|---|
| **Sax for the Last Customer** (jazz / smooth jazz con saxofón) | 124,303 s (la medida de 5 s) y **137,615 s con su final natural** | 19,4 dB · **33,7 dB** | 5,5 dB (pista plana); **su acorde final cae a los 39,4 s** | **elegida**: la única de jazz; su resolución es su propio final |
| I Feel It Coming (cover de saxofón, lounge) | 217,415 s | 18,7 dB | 6,0 dB a +40 s (en el borde) | descartada: no resuelve donde entra el CTA; es un pop en saxofón |
| Luxury, Elegance, Refined (lounge) | 128,141 s | 10,5 dB | 4,3 dB | descartada: golpe débil, plana, sin caída |
| Ivory Skyline Reverie (lounge/downtempo) | 143,146 s | 14,1 dB | 3,6 dB | descartada: plana |
| La Isla Bonita (saxofón, pop latino 80s) | 179,834 s | 9,7 dB | 14,3 dB a +40 s | descartada: no es jazz y el golpe está en el umbral |
| Daniel Armand (lo-fi/chillhop) | 165,232 s | 20,2 dB | 25,6 dB a +40 s | descartada: encaja en la medida, pero es hip hop, no jazz (la segunda opción técnica si se quiere otro color) |

**Sax for the Last Customer, a fondo** (`medir-pista.py`, `rejilla.py`, 179,73 s, La menor, ~81 BPM):
- **Sin pulso:** la mejor recta (0,371 s, 161,7 BPM) deja el 46 % de los golpes fuertes a ≤ 15 ms y un desvío de 79,7 ms (un pulso pide ≥ 70 % y ≤ 15 ms; *Return to Oasis*, 89 % a 10 ms). Es un swing tocado: la rejilla son los **golpes medidos**.
- **Entrada 137,6 s:** un golpe de 33,7 dB (137,645 s), el más fuerte de la pista, justo tras un descenso a ≈ −45 dB: una entrada limpia como primera nota. El colchón de 45 ms antes del golpe (`INICIO_MUSICA = 4128/30`).
- **Resolución, no caída:** a diferencia de las V2 y V3 la canción no cae a un lecho: suena a −13,9 LUFS hasta un **acorde final de 20,9 dB (176,986 s)** que se sostiene 0,3 s y deja una cola de 2 s. Entrando en 137,6 s el acorde cae en **f1183**; la última palabra del CTA acaba en **f1177**: el acorde le contesta 6 f después, mientras la imagen funde a negro, y la cola se apaga bajo la tarjeta.
- **Plana y densa:** −13,9 LUFS sin picos de arreglo y con saxofón continuo. La música sola va a −15 y bajo la voz a −31 (9,9 LU debajo de ella, medido). **Lo que no se puede saber sin oírla:** si un saxo continuo a −31 LUFS compite con la voz o si el acorde final suena bien como cierre.
- **Licencia:** no verificada (pista de la biblioteca de Luxur).

## Lo que comparte con la V1, la V2 y la V3

**Nada.** La sección 9b de la puerta lo mide: ni un segundo de metraje en común con la V1 (017), la V2 (018) ni la V3 (019, instantánea de sus tramos). Cuatro clips ya habían salido, con **otra ventana**: RC02 (la V1 usó 9,8-13,6 s: la sala; aquí 0,0-4,5 s: el pasillo), RC05 (la V2 usó 3,2-5,9 s; aquí 0,0-2,8 s), RC09 (la V3 usó 4,6-12,6 s; aquí 0,0-3,5 s) y RC13 (la V3 usó 2,6-5,7 s; aquí 10,9-15,4 s). Nuevos del todo: RC22, RC04 (0,0-2,2 s; solo salió en la rev. 1 de la V2), DR156 y las tres tomas de Isabella.

## Material que NO entra (y por qué)

- **Lo tachado** (HK02, HK05, HK07, MD07, MD08, MD09, CT01, CT05, CT07, DR147, DR152, DR155, DR163, *Time*, *Return to Oasis*, *Flying Into the Sun*).
- **RC10** (el deck con el skyline, 8,4-11,9 s): era el candidato al patio, pero RC09 (0-3,5 s) lo enseña mejor y sin repetir; RC10 queda libre para una V5.
- **RC12** (la otra alcoba, con la ventana al deck): se probó y se descartó: el ventanal esquinero de RC13 (11-15 s) enseña lo mismo con más luz y más verde.
- **RC16** (Isabella de espaldas): ya salió en la V3 y esta pieza no necesita una cuarta aparición suya.
- **DR148-DR152** (la torre vecina con malla negra), **DR153** (órbita sobre la corona), **DR154** (la calle con carros: cuidar placas). DR156 es el limpio.
- Ningún SFX (el formato no los lleva), ninguna `velocidad` ≠ 1, ninguna segunda canción.

## Derechos (para publicar, no para montar)

- **La canción es de una biblioteca cuya licencia NO se ha verificado** (*Sax for the Last Customer*, sha 8 `7a1c2932`). Para publicar: la biblioteca de la plataforma, la licencia confirmada, o sin música (`HAY_MUSICA = false` en `audio-020.ts`: la pieza sale solo con la voz y se le pone el audio de la plataforma encima; entonces el acorde final se pierde).

## Decisiones tomadas (y las descartadas)

- **Hook = HK03** (el filtro). Es la toma con 0,81 s de aire antes de su primera palabra: **entra con disolvencia** desde la calle (a diferencia de HK05 del 019, que tuvo que entrar a corte), y la disolvencia acaba en un golpe de 18 dB. Se le deja 3 f de aire tras el golpe para que suene entero antes de la voz. Sale a corte (le quedan 12 f de clip tras su última palabra).
- **Mitad = MD14**, en el patio, **sin cifra ni aviso**; es la pareja natural de HK03 en el catálogo. Acaba retrocediendo hacia el interior: de ahí sale la disolvencia a la alcoba.
- **CTA = CT06** (de los dos CTA usables que quedaban: CT02 y CT03 llevan el precio y no van en el bloque 6; CT04 nombra a ALH sin confirmar que se pueda). Es la que cierra «filtro» y la única con una cara y una cámara que cruza un umbral, que es la imagen de una invitación. Costó la palabra dudosa y el «agendar».
- **Dron = DR156**, al **final** del paseo (último plano del bloque 5), no al principio (V1, V2) ni tras el hook (V3): sube por los jardines colgantes del edificio y es el plano más largo del bloque (5,0 s). La puerta lo exige así.
- **El cielo (RC04) dura 2,2 s** y no 3: el primer intento llegaba a 3,0 s y la cámara baja por el marco negro de la ventana hacia los 2,5 s, con un salto de +32 de luma al dron. Se corta en el siguiente golpe (21,1 dB) y la alcoba se alarga a 4,4 s.
- **La alcoba = RC13 al final del clip (10,9-15,4 s)**: el ventanal esquinero con las jardineras, lo más luminoso del interior. Entra con una disolvencia desde Isabella, que retrocede hacia dentro.
- **Descartado:** RC10 y RC12 (arriba); abrir con un dron (repetiría V1 y V2); un fotograma congelado para alargar la toma del CTA (nada se congela); una segunda canción; «totalmente terminado,» como acento de dos palabras (el motor lo encogía y no cabía la cursiva 8 px menor: quedó «un apartamento totalmente / **terminado,**»).

## Por confirmar

1. **«reto»** (CT06, ≈ **36,9-37,1 s** del vídeo, dentro de «Si es el reto,», 36,4-37,1 s): whisper-small oye «resto» (conf. de «el» 0,16: es el prior del modelo). **Medido:** en la envolvente de alta frecuencia hay /s/ en «Si» (0,86 s) y en «es» (1,25-1,30 s) y **ninguna entre «el» y la pausa** (HF − LF ≈ −40 dB frente a +27 y −3 de las otras dos): son dos fricativas antes de la pausa, no tres. Se pinta «reto». **Sin oír.**
2. **«terminado»** (HK03, ≈ **4,3-5,2 s** del vídeo): whisper-small, sin vocabulario, oye «determinado». **Medido:** cortando la toma desde 2,05 y 2,20 s oye «totalmente **terminado**», y desde 2,50 s «terminado»; «determinado» solo sale si el corte incluye el «-te» de «totalmente». Además la palabra dura 0,78 s: 4 sílabas a 0,17-0,19 s cada una, no las 5 de «determinado». Se pinta «terminado» (que es lo que tiene sentido). **Sin oír.**
3. **La música, sin oír.** Nada de lo que decide la canción está oído (género, encaje con la marca, si el saxo compite con la voz, si el acorde final cae bien).
4. **El canal del CTA** (DM o WhatsApp) y si **Luxur puede agendar** una visita.
5. **Licencia** de la canción.
6. **El retroceso patio → espacio abierto** (arriba) y **Isabella sin la ficha**: ni precio ni metros; el filtro lo hace ella con lo que dice.

## El color (`colorCorrection()`, la misma base que el 017, el 018 y el 019)

**Una base común del canal** (`COLOR_BASE`: contraste 1,10 · negros −0,06 · sombras +0,08 · luces −0,20 · blancos −0,05 · temperatura +0,03 · saturación 1,10 · vibrance 0) **y un ajuste por toma**, medido (`herramientas/medir-color.py`, dos tandas de stills a escala 1 con el mismo backend de GL, `angle`: una sin graduar —`stills-antes.mjs`— y otra con color). Dos iteraciones. Los topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `saturation` 0,95-1,12 y ≤ 1,06 en las tomas de Isabella.

| Plano | Ajuste sobre la base | Qué se corrigió | luma | saturación | quemado | aplastado |
|---|---|---|---|---|---|---|
| c01 calle | exposición −0,10 · luces −0,30 · blancos −0,10 · sombras +0,12 · contraste 1,12 · temperatura −0,01 | el cielo y la fachada al sol | 128,0 → 124,1 | 0,163 → 0,197 | 0,0 → 0,0 % | 0,0 → 0,0 % |
| c02 hook · Isabella | exposición +0,05 · sombras +0,12 · saturación 1,03 · temperatura −0,01 | la sala en sombra, sin tirar de cálido | 126,2 → 128,6 | 0,241 → 0,270 | 0,5 → 1,0 % | 1,8 → 2,8 % |
| c03 pasillo | exposición 0 · sombras +0,15 · luces −0,30 · saturación 1,08 | el ladrillo y los bloques al sol | 131,8 → 132,4 | 0,232 → 0,270 | 0,0 → 0,0 % | 0,2 → 0,3 % |
| c04 espacio abierto | ídem | ídem | 133,2 → 133,8 | 0,177 → 0,210 | 0,0 → 0,0 % | 0,1 → 0,2 % |
| c05 patio | exposición 0 · sombras +0,22 · luces −0,42 · blancos −0,14 · saturación 1,04 · temperatura −0,02 | la madera saturaba de más (R/G 1,25) y el fondo se quemaba (1,0 %) | 135,1 → 133,9 | 0,417 → 0,447 | 1,0 → 0,1 % | 0,2 → 0,3 % |
| c06 mitad · Isabella | exposición +0,15 · sombras +0,12 · saturación 1,03 | la mitad era más oscura que el patio que acaba de verse (114 frente a 135) | 113,7 → 119,4 | 0,439 → 0,472 | 0,5 → 1,5 % | 1,5 → 1,9 % |
| c07 alcoba | exposición +0,15 · sombras +0,32 · luces −0,40 · blancos −0,12 · negros 0 · contraste 1,04 · saturación 1,08 | el plano más oscuro (la 1.ª tanda dejaba un 7,8 % aplastado) | 116,1 → 118,7 | 0,209 → 0,228 | 0,1 → 0,0 % | 2,7 → 2,5 % |
| c08 cielo | exposición −0,05 · luces −0,50 · blancos −0,20 · sombras +0,10 · saturación 1,08 | las nubes sin quemar | 120,6 → 116,9 | 0,187 → 0,220 | 0,0 → 0,0 % | 0,9 → 1,6 % |
| c09 dron | exposición +0,10 · contraste 1,06 · luces −0,35 · blancos −0,10 · sombras +0,30 · negros +0,02 · saturación 1,04 | los interiores de las terrazas y el 3,4 % de quemado de la base | 114,7 → 115,6 | 0,354 → 0,383 | 3,4 → 0,0 % | 0,9 → 1,0 % |
| c10 CTA · Isabella | exposición 0 · luces −0,30 · saturación 1,03 | el ladrillo y el cielo del fondo | 123,3 → 123,3 | 0,247 → 0,277 | 0,0 → 0,0 % | 1,3 → 2,6 % |
| **entre planos** | | | media 124,3 → 124,7 · **σ 7,5 → 6,7** | media 0,267 → 0,297 | máx 3,4 → 1,5 % | máx 2,7 → 2,8 % |

- **La piel de Isabella se queda donde estaba** (tono de los píxeles de piel, caja a mano por toma): hook 11,0° → 10,1° · mitad 18,1° → 18,0° · CTA 11,9° → 11,8° (≤ 1°); saturación +0,03-0,05.
- **Los empalmes secos** (salto de luma, sin graduar → graduado): c02→c03 −2,2 → −4,9 · c03→c04 −3,4 → −3,6 · c04→c05 −1,1 → −2,8 · c07→c08 +7,4 → −0,2 · c08→c09 −8,7 → −3,3. Ninguno pasa de 5 niveles. (El primer intento con el cielo de 3,0 s daba +31,7 en c08→c09: ver «Decisiones».)

## Revisiones

**Revisión 1 (2026-10-04).** Primera versión (su prueba: `pruebas-720p/020-recorrido-720p.mp4`): 11 planos, 6 bloques de texto, 4 tramos de audio, color por plano con la base del 017 más el ajuste de cada toma (`03-timeline.md` y `combinaciones.md`). **A la espera del OK** para el final.

**Revisión 1, final (2026-10-04, «renderiza en buena calidad»).** Sin cambios en el plan: se exportó el master a CRF 12 `slower` y la versión ligera a CRF 16 `slow` (R22), cada uno con sus etiquetas de color arregladas SIN pérdida (`h264_metadata` + `+write_colr`; imagen decodificada y audio idénticos antes y después) y medido por separado contra stills a escala 1; más el `.srt`. **Se exportó con «terminado» y «reto» sin oír** (están medidas, ver «Por confirmar»; la orden de exportar llegó con la duda abierta y no se bloquea): `node proyectos/020/revisar-020.mjs --final` sigue fallando, a propósito, por las cinco notas «POR CONFIRMAR AL OÍDO» hasta que el usuario las oiga. Si alguna suena distinta: el texto del trozo, `voz/*.txt`, el `dice` del plan, el `.srt` y re-exportar (≈ 6 min).
