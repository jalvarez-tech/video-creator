# Tierra Grata Bosque Santo (El Poblado) · apartamento en ARRIENDO — catálogo del material

> Propiedades Luxur · dos rodajes: **31-ago / 2-sep-2026** (apartamento y unidad, sin Isabella salvo cuatro clips) y **17-oct-2026** (Isabella en las zonas comunes) · catálogo del 2026-10-19 (sesión coordinadora de los proyectos 045-050).
> Origen: `/Volumes/SSK SSD/Work/Propiedades Luxur/Apartamento - Tierra Grata - Las Palmas/Videos/` (carpetas `1 Hooks`, `2 Miad`, `4 Recorrido`, `5 Cta`; no hay `3 Dron`: **no hay dron**).
> Lo que dicen las tomas está transcrito con whisper local (modelo `small`, sin vocabulario): lo dudoso va marcado. Los datos de la propiedad salen de la ficha de la web, leída el 2026-10-19.

## 0. Lo primero que hay que saber (tres sorpresas del material)

1. **El rodaje del 17-oct NO siguió el libreto 044** (`libreto-isabella.md`, 20 piezas sobre «es muy caro», el jacuzzi privado, etc.). Isabella grabó **once frases de OTRO ángulo: el acompañamiento personalizado** (aseo semanal incluido, chef privado, tours, masajes, transporte, «te acompañamos desde el día uno», «apartamento amoblado», «cuando llegas a una ciudad que no es la tuya»). Los códigos HKnn/MDnn/CTnn del libreto son frases ESCRITAS y no corresponden a estas tomas: **aquí los códigos son los de la carpeta** (§3-§5), como en el registro de uso de las otras propiedades.
2. **Las once tomas de Isabella del 17-oct están en las ZONAS COMUNES de la unidad** (terraza con pérgola y vista, jacuzzi comunal redondo, escaleras exteriores, Social Kitchen, gimnasio, jardín), **nunca dentro del apartamento**, y con un vestido negro. Las cuatro tomas habladas del 2-sep (chaqueta de flores, dentro del apartamento) son de otro vestuario: **no se mezclan en una misma pieza**.
3. **Todo el recorrido (22 clips) y las cuatro tomas de Isabella del 2-sep son ANAMÓRFICOS: 1920×1080 guardados con SAR 81:256 y DAR 9:16, es decir, VERTICALES de 608×1080 efectivos comprimidos a lo ancho** (SDR BT.709, 30 fps). Las tomas del 17-oct son verticales de verdad (4K HLG, rotación −90). Para el 9:16 el recorrido se **escala entero con `setsar=1`, SIN recortar** (×2,13: sale más blando que Isabella en 4K). §7 dice cómo; la versión de la mañana de este catálogo decía «horizontal» y mandaba recortar: **era un error** (lo detectó la sesión 050 el mismo día).

## 1. La propiedad (ficha de la web, 2026-10-19)

| Dato | Valor | Fuente |
|---|---|---|
| Proyecto y zona | **Tierra Grata Bosque Santo**, El Poblado, Medellín, «a pocos metros de la Avenida Las Palmas», rodeado de naturaleza | web |
| Operación | **ARRIENDO tradicional: COP 14.800.000 al mes** (JSON-LD `offer-rent` 14800000). La misma unidad está en venta (1.500 M): **las piezas no la nombran** (encargo: promocionar el arriendo) | web |
| Áreas | 113 m² · 2 habitaciones · 2 baños · 2 parqueaderos · piso 9 · año 2023 | web |
| Espacios | Sala y comedor amplios, cocina integral con isla, bar, zona de ropas, **balcón con jacuzzi privado** (cuadrado, de madera, con la ciudad detrás: foto `3-Jacuzzi.png`) | web + fotos |
| La unidad | Carril de nado, zonas húmedas (piscina, turco, sauna, jacuzzi comunal redondo en la terraza), gimnasio, Spa Romano, squash, coworking, BBQ, Social Kitchen, salón social, zona de bienestar, juegos infantiles, portería 24 h, ascensor, parqueadero de visitantes, pet friendly | web |
| Dicho por Isabella (17-oct) | **aseo semanal incluido** · **apartamento amoblado** · chef privado, tours, masajes y transporte («las mejores experiencias de Medellín») · «catorce millones ochocientos que incluyen experiencias pensadas para ti» · acompañamiento personalizado desde el día uno | tomas (§3-§5) |
| **No consta** (no se afirma) | administración, condiciones del contrato, minutos a ningún sitio, qué incluye exactamente el «acompañamiento», si las experiencias se pagan aparte (el libreto §10 lo suponía) | — |
| Contacto | WhatsApp +57 304 667 0026 · «visita presencial o videollamada» | web |

**Las 25 fotos de la ficha** están descargadas en `…/Apartamento - Tierra Grata - Las Palmas/Fotos/Web ficha 2026-10/` (1-Sala, 2-Balcon, 3-Jacuzzi, 4-Bar, 5-Sala-Cocina, 6-Cocina-2, 7/8-Hab-2, 9-Pasillo, 10-Bano-social, 11-Hab-1, 15-Lavanderia, NOCTURNA y 12 `amenidad-*`): sirven para reconocer cada espacio de los clips.

**Ficha para la versión con ficha (`ficha-luxur`)**: `.claude/skills/ficha-luxur/propiedades/tierra-grata.json` → `APARTAMENTO EN RENTA · El Poblado · Tierra Grata · $ 14,8 M COP / MES`. **Portada** (`portada-luxur`): locación `EL POBLADO`, negocio `renta`.

## 2. Datos técnicos (ffprobe, 2026-10-19)

| Grupo | Archivos | Códec | Tamaño | Rotación | Color | fps | Audio |
|---|---|---|---|---|---|---|---|
| Isabella 17-oct (`IMG_42xx/43xx.MOV`) | 11 | HEVC 10 bit | 3840×2160 | **−90** (vertical) | **HLG** BT.2020 (R21: tone-map con VideoToolbox) | 30 (**IMG_4304 e IMG_4298: 29,97**, `avg` irregular) | AAC 48 kHz mono (solapa) |
| Isabella 2-sep (`Img 94xx/95xx.mp4`) | 4 | H.264 | **1920×1080 guardado, SAR 81:256, DAR 9:16 → 608×1080 vertical efectivo** | ninguna | SDR BT.709 | 30 | AAC 48 kHz mono |
| Recorrido 31-ago / 2-sep (`Img 9xxx.mp4`) | 22 | H.264 | **1920×1080 guardado, SAR 81:256, DAR 9:16 → 608×1080 vertical efectivo** | ninguna | SDR BT.709 | 30 (varios con `avg_frame_rate` irregular: contar frames tras normalizar) | AAC estéreo (ambiente; no se usa) |

Los nombres con espacios (`Img 9461.mp4`) se copian a `proyectos/NNN/original/` con el CÓDIGO como nombre (`rc01.mp4`), que es lo que exige la receta.

## 3. Hooks (`1 Hooks`)

| Código | Clip | Dura | Dónde / qué hace | Dice (whisper) | Aviso |
|---|---|---|---|---|---|
| **HK01** | `IMG_4269.MOV` | 7,50 s | Terraza común con pérgola y la vista; de pie, camina hacia cámara | «El tiempo es el activo más valioso de los seres humanos y te ayudamos a optimizarlo incluyendo un aseo semanal.» (voz ≈ 0,0-6,7 s) | la voz empieza casi en el f0: medir el aire con `onsets-voz.py`; «aseo» POR CONFIRMAR AL OÍDO |
| **HK02** | `IMG_4272.MOV` | 7,23 s | Terraza común, SENTADA en el sillón bajo la pérgola | misma frase que HK01, en dos frases: «El tiempo es el activo más valioso de los seres humanos. Te ayudamos a optimizarlo, incluyéndote un aseo semanal.» (whisper oye «asesor semanal») | ídem; es la doble de HK01 con otra puesta en escena |
| **HK03** | `IMG_4304.mov` | 6,20 s | Escaleras exteriores, el edificio detrás; **29,97 fps** | «Cuando llegas a una ciudad que no es la tuya, el acompañamiento personalizado es una plusvalía indispensable.» | misma idea que CT03 (no van juntas) |
| HK04 | `Img 9496.mp4` | 51,7 s | **ANAMÓRFICO (vertical 608×1080), 2-sep, chaqueta de flores**: sentada en el sofá de la sala (0-8 s) y luego un paseo mudo con el móvil (puerta, cocina, balcón, pelo) | «Antes de arrendar en Las Palmas, pregúntate esto.» (whisper: «a mi lado») · 30-52 s sin voz | otro vestuario y 608×1080 efectivos: solo para una pieza entera del 2-sep |
| HK05 | `Img 9508.mp4` | 32,5 s | **ANAMÓRFICO, 2-sep**: camina hacia cámara en el balcón con la vista (0-7 s), luego paseo mudo | whisper: «Ya todo.» (dudoso; el vídeo editado del 15-sep pone «ven te muestro» sobre esta imagen) | ídem |

## 4. Mitades (`2 Miad`)

| Código | Clip | Dura | Dónde / qué hace | Dice (whisper) | Aviso |
|---|---|---|---|---|---|
| **MD01** | `IMG_4274.MOV` | 5,17 s | Terraza común, la ciudad y las montañas detrás, bajo la pérgola | «De esta manera tendrás todo ordenado y aprovecharás el tiempo en lo que eres mejor.» | continúa a HK01/HK02 («de esta manera») |
| **MD02** | `IMG_4278.MOV` | 4,40 s | Pérgola con las plantas detrás | «Te acompañamos desde el día uno con atención personalizada.» | encadena con MD03 |
| **MD03** | `IMG_4285.MOV` | 7,23 s | Terraza común, camina bajo la pérgola hacia cámara | «Contamos con chef privado, tours, masajes y transporte y las mejores experiencias de la ciudad de Medellín.» | la lista de servicios |
| **MD04** | `IMG_4296.MOV` | 4,87 s | Social Kitchen / coworking (lámparas verdes, mural) | «Catorce millones ochocientos que incluyen experiencias pensadas para ti.» | **lleva el PRECIO** (la única cifra; subtítulo `$14.800.000`) · encadena con MD05 |
| **MD05** | `IMG_4297.MOV` | 4,43 s | Gimnasio, tras el vidrio | «Además, esta unidad cuenta con diferentes tipos de amenidades.» | empieza por «Además»: va tras MD04 o tras un recorrido de la unidad |

## 5. CTA (`5 Cta`)

| Código | Clip | Dura | Dónde / qué hace | Dice (whisper) | Aviso |
|---|---|---|---|---|---|
| **CT01** | `IMG_4277.MOV` | 5,17 s | Junto al jacuzzi comunal redondo (baranda, plantas) | «Si quieres un acompañamiento personalizado durante toda tu estancia, contáctanos.» | — |
| **CT02** | `IMG_4294.MOV` | 5,57 s | Jardín con árboles y plantas detrás | «Si quieres un apartamento amoblado que tenga acompañamiento personalizado, escríbeme.» (whisper: «aportamento movilado») | dice **amoblado** |
| **CT03** | `IMG_4298.MOV` | 6,67 s | Escaleras con césped y el edificio; **29,97 fps** | «Cuando llegas a una ciudad que no es la tuya, el acompañamiento personalizado es una plusvalía que vale la pena conocer.» | no es una acción: cierra con la idea y la tarjeta (logo + web) hace de CTA · no va con HK03 |
| CT04 | `Img 9492.mp4` | 9,11 s | **ANAMÓRFICO, 2-sep**: camina hacia cámara en la sala con la palma | «Antes de arrendar en Las Palmas, piensa en esto.» (whisper: «render… piensan») | es un hook, no un CTA |
| CT05 | `Img 9501.mp4` | 7,21 s | **ANAMÓRFICO, 2-sep**: sentada en la silla de la sala | «Si buscas más que un apartamento para vivir, escríbenos.» | el único CTA del 2-sep |

## 6. Recorridos (`4 Recorrido`; anamórficos, verticales de 608×1080 efectivos: §7; se pueden repetir, se declara)

Lectura a partir de hojas de contactos (6 fotogramas por clip, SACADAS SIN CORREGIR EL SAR: los espacios parecían panorámicos y no lo son): **comprobar cada clip entero, con el SAR corregido, antes de usarlo** (varios giran, suben al cielo o acaban en otro espacio). Horas en UTC del contenedor (−5 h = hora local).

| Código | Clip | Dura | Qué se ve (de principio a fin) | Espacio |
|---|---|---|---|---|
| RC01 | `Img 9461.mp4` | 12,9 s | De la isla de la cocina y el comedor hacia la sala y el ventanal con la vista | APTO: cocina → sala con la vista |
| RC02 | `Img 9463.mp4` | 29,4 s | Sala (mesa redonda) → ventanal → sube al cielo → sale al balcón: camas blancas sobre baldosa negra, la palma | APTO: sala → **balcón** (el de la foto `2-Balcon`) |
| RC03 | `Img 9464.mp4` | 17,3 s | El balcón con las camas → paneo a las torres y la ciudad → nubes | APTO: balcón → vista |
| RC04 | `Img 9469.mp4` | 7,9 s | Sala: sofá gris, pared de listones con luz, mesa redonda → el balcón al fondo | APTO: sala (la de `1-Sala`) |
| RC05 | `Img 9477.mp4` | 10,2 s | Alcoba principal: la cama, la lámpara, las ventanas → la pared del televisor | APTO: alcoba principal |
| RC06 | `Img 9479.mp4` | 8,6 s | Alcoba principal desde otro lado → el clóset / la puerta del baño | APTO: alcoba principal |
| RC07 | `Img 9480.mp4` | 5,0 s | Alcoba principal, las lámparas, la puerta con luz | APTO: alcoba principal |
| RC08 | `Img 9481.mp4` | 5,1 s | Alcoba principal → el televisor | APTO: alcoba principal |
| RC09 | `Img 9484.mp4` | 8,2 s | Baño: mueble de madera, lavamanos, espejo, mampara | APTO: baño principal |
| RC10 | `Img 9509.mp4` | 10,8 s | Cielo con nubes → las torres y la ciudad → **el JACUZZI PRIVADO del balcón** (la tina cuadrada con listones de madera, el escalón de madera, la baldosa negra, la baranda de vidrio y la losa del balcón: la foto `3-Jacuzzi.png`) — *corregido el 2026-10-19 por la sesión 048: la hoja de contactos lo leyó como «deck de madera con la banca y la pérgola (terraza común)»* | APTO: balcón con el jacuzzi privado (**clímax V30**) |
| RC11 | `Img 9513.mp4` | 6,9 s | Social Kitchen / coworking: lámparas verdes, mural, mesas | UNIDAD: Social Kitchen |
| RC12 | `Img 9514.mp4` | 7,4 s | Social Kitchen desde el otro lado, sillas, ventanal | UNIDAD: Social Kitchen |
| RC13 | `Img 9516.mp4` | 6,0 s | Gimnasio: caminadoras, máquinas | UNIDAD: gimnasio |
| RC14 | `Img 9517.mp4` | 7,0 s | Gimnasio: la pared a rayas rojas, máquinas | UNIDAD: gimnasio |
| RC15 | `Img 9524.mp4` | 4,6 s | Sauna de madera (oscuro) | UNIDAD: sauna |
| RC16 | `Img 9525.mp4` | 9,3 s | El carril de nado con los árboles y el cielo | UNIDAD: piscina |
| RC17 | `Img 9527.mp4` | 7,7 s | El carril de nado desde el otro extremo | UNIDAD: piscina |
| RC18 | `Img 9528.mp4` | 7,5 s | Terraza común al atardecer: la ciudad, la baranda, la pérgola negra | UNIDAD: terraza, atardecer |
| RC19 | `Img 9529.mp4` | 4,7 s | El deck de madera con el **jacuzzi comunal redondo**, la baranda y la pérgola | UNIDAD: terraza, jacuzzi comunal |
| RC20 | `Img 9536.mp4` | 18,5 s | Sala a la HORA AZUL: el panel curvo de madera → el sofá con las luces → el ventanal → la isla y el bar | APTO: sala, hora azul |
| RC21 | `Img 9537 (1).mp4` | 11,1 s | **Balcón del APARTAMENTO al atardecer**: de las luces de la ciudad y las torres (0-8 s) gira a la derecha hasta la baldosa negra y el **JACUZZI PRIVADO de madera con su escalón** (de ≈ 8,3 s al final; entero hacia los 10,5-11,0 s) | APTO: balcón con el jacuzzi privado (hallazgo de la sesión 045, 2026-10-19) |
| RC22 | `Img 9538.mp4` | 3,2 s | El bar con el letrero de neón, de noche | APTO: bar |

**✅ El jacuzzi PRIVADO del balcón (la foto `3-Jacuzzi.png`: cuadrado, de madera con listones, con las torres detrás) SÍ está en el material; lo encontraron tres sesiones el 2026-10-19:** **RC21** (`Img 9537 (1).mp4`), de ≈ 8,3 s al final: la cámara gira a la derecha desde las luces de la ciudad y las torres hasta la baldosa negra del balcón, la caja de listones con su escalón, el cristal de la baranda y la puerta corredera; entero en cuadro desde ≈ 9,5 s (sesión 045; es el clímax de la V27). **RC10** (`Img 9509.mp4`), de 8,0 a 10,7 s (sesión 048; clímax de la V30, y el 050 lo usa también de clímax: comparten 2,7 s, declarado). **RC03** (`Img 9464.mp4`), de 5,8 a 6,9 s, al fondo del balcón con la banca delante, pequeño y lejano (sesión 047; el tramo 4,3-10,3 s de RC03 es de la V29). La nota de la mañana («no aparece en los fotogramas muestreados») quedó resuelta: las hojas de contactos se sacaron sin corregir el SAR y a 6 fotogramas por clip.


**No hay puentes humanos** (una mano, una taza, una llave) ni voz en off.

## 7. Cómo entra el material ANAMÓRFICO del 2-sep en el 9:16 (CORREGIDO el 2026-10-19 por la sesión 050)

**El catálogo de la mañana decía «horizontal» y mandaba recortar: era un error.** Los 26 clips del 2-sep (los 22 recorridos y HK04, HK05, CT04, CT05) están guardados en 1920×1080 pero con **SAR 81:256 y DAR 9:16**: son vídeos VERTICALES de **608×1080 píxeles efectivos** comprimidos a lo ancho. Un `crop=608:1080:X:0` sobre el cuadro guardado toma el tercio central y lo deja estirado ×3,2: es lo que el usuario vio como «ampliado» en la prueba del 050. (`ffprobe -show_entries stream=sample_aspect_ratio,display_aspect_ratio` lo dice; las hojas de contactos de §6 se sacaron sin corregir el SAR y por eso los espacios parecían panorámicos.)

- **Receta correcta**: en `normalizar.mjs`, rama SDR de cada `recorrido` (y de las tomas del 2-sep): **sin crop**, `scale=1296:2304:flags=lanczos,setsar=1`. Escala uniforme ×2,13 desde 608×1080; se ve el cuadro entero.
- **Nitidez**: 608×1080 efectivos escalados a 1296×2304 (×2,13 en los dos ejes): más blando que Isabella en 4K, pero con la geometría correcta. Planos cortos, `zoom` cerca de 1, sin `sharpen`. Se le dice al usuario en la prueba.
- Las tomas de Isabella del 2-sep (HK04, HK05, CT04, CT05) salen igual: enteras, con `setsar=1`. Solo para una pieza entera de ese rodaje (otro vestuario), avisando de la nitidez.
- **Las lecturas de §6 son aproximadas**: se hicieron sobre fotogramas estirados. Comprobar cada clip entero con el SAR corregido antes de elegirlo.
- **Gran angular vertical**: sin recorte el cuadro enseña mucho más (gente al fondo de las zonas comunes, objetos en la encimera): mirar cada plano ENTERO a 0,5 s antes de elegir el tramo (sesión 045).
- **Cómo mirarlos**: una hoja de contactos de un clip anamórfico sacada a 16:9 sale con la gente alargada y delgada, la señal de que algo no cuadra; se miran a su 9:16 (`scale` a la proporción de pantalla) y se comprueba el SAR/DAR con `ffprobe` (sesión 048).

## 8. Lo que ya se publicó o se editó antes

`videos editados/01.mp4`, `02.mp4`, `03.mp4` (15-sep-2026, 1080×1920, 64 / 78 / 56 s): tres vídeos verticales hechos con el material del 2-sep (Isabella con la chaqueta de flores: «ven te muestro», «de 113 m ubicado en Las Palmas», «agenda tu visita»; subtítulos simples sobre el recorrido, con su aspecto correcto). No son de este sistema. Las piezas 045-050 son las PRIMERAS con el material del 17-oct.
