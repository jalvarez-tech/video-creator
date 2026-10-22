# 01 · Plan narrativo — proyecto 060 · Apartaestudio Quadrato (Laureles, Medellín), V42 del registro (primer reel del apartaestudio: «Tu plata en el banco pierde valor»)

> Paso 1 de 3. Escrito con el reparto de la sesión madre (`proyectos/054/reparto-054-062.md`, que manda), el catálogo del rodaje (`proyectos/060/catalogo/catalogo-material.md`), la ficha de la web y la estructura y la puerta de la 059 (la misma serie: Palmazera). Siguiente: [02-layout.md](02-layout.md).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | Encargo del 2026-10-21: **3 reels por propiedad** en tres propiedades nuevas (una sesión por reel, todas sobre el mismo checkout). Este es el **V42 / 060**: Apartaestudio Quadrato (Laureles, Medellín), ángulo **«Tu plata en el banco pierde valor»** (rentabilidad: el más financiero de los tres). Más las reglas fijas del canal (AÉREA · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA con tres frases de Isabella, primera toma sin texto ni voz, nunca el sello, cierre en tarjeta oscura con el logo y la web, subtítulos editoriales, voz a −15 LUFS, música con curva, color por plano medido). |
| La propiedad y la ficha | Apartaestudio en Venta en Laureles, Medellín, habilitado para rentas cortas. Ficha de la web (leída por la sesión madre el 2026-10-21): **VENTA · COP 410 M** · **24 m²** · 1 alcoba · 1 baño · piso 4 · año 2024 · zonas comunes con **jacuzzi y rooftop**, gimnasio, **coworking y sala de reuniones**, lavandería, lobby tipo hotel, restaurante y bar, portería 24 h, ascensor, pet friendly. Es la única de las tres que se vende como **inversión**; la propia web advierte que los ingresos de renta corta varían por temporada. |
| Material | `Apartaestudio - Quadrato - Laureles/Videos/` del SSD, copiado a `proyectos/060/original/` con el CÓDIGO del catálogo por nombre (sha256 en `normalizar.mjs`): HK03 `bcf96dda`, MD05 `d0f7c85b` (MEDIO7; MEDIO6 `83b0075e` y MEDIO8 `47b36a5f` de repuesto), CT03 `91333f60`, los 18 recorridos del estudio y las 29 tomas de zonas comunes (los que usa el plan: RC05, RC09, RC13, RC16, ZC01, ZC07 y ZC11; el resto, candidatos), música *Street Level Sessions on the Green* `e428a369`. |
| Composición | `Recorrido060` · 1080×1920 · **30 fps** · 1642 f (**54,7 s**; rev. 0-1: 1421 f, 47,4 s). Clips normalizados a 1296×2304 y 30 fps: los MOV de este rodaje son **1080×1920 SDR BT.709 verticales, sin rotación**, a 30 fps o a 29,97 (los recorridos del estudio y varias zonas comunes: `setpts=PTS*1000/1001` antes de `-r 30`). **No hay dron.** |
| Formato | 9:16 vertical · `recorrido-luxur` (AÉREA · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA) |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor); **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` |
| Destino | Reels · Shorts · TikTok · y la versión con ficha para anuncios (1:1) |
| Presentadora | Isabella Cadavid |

## El ángulo: «Tu plata en el banco pierde valor» (y en qué se distingue de las otras dos versiones del apartaestudio)

**La idea en una línea:** este estudio de 24 m² es para quien **tiene su dinero parado** y quiere ponerlo a trabajar: Isabella plantea el dinero en el hook («tu plata en el banco pierde valor cada mes; este estudio ya está generando dólares»), el paseo enseña **lo que se alquila** (el baño, la cocina equipada, el escritorio), la mitad pone SUS números en su voz («la renta tradicional deja el 0,5 % de rentabilidad mensual; esta inversión deja más del 1 %; ven, te muestro cómo»), y la cama, el coworking del edificio y la vista del rooftop cierran con lo que hace que alguien reserve.

| | **V42 (060)** | V43 (061) | V44 (062) |
|---|---|---|---|
| Ángulo | **tu plata en el banco pierde valor** (rentabilidad) | pocos permiten rentas cortas (escasez del permiso) | Medellín, tercer mercado de renta corta (barrio y ocupación) |
| Hook | **HK03** «Tu plata en el banco pierde valor cada mes. Este estudio de 24 metros cuadrados en Laureles ya está generando dólares.» | HK04 | HK02 |
| Mitad | **MD05 `MEDIO7`** «La renta tradicional deja el 0,5 % de rentabilidad mensual. Esta inversión deja más del 1 %. Ven, te muestro cómo.» | MD04 | MD02 |
| CTA | **CT03** «Si deseas que te envíe la rentabilidad mensual, haz clic en el enlace y escríbeme un mensaje.» | CT01 | CT02 |
| Apertura (rooftop, no hay dron) | **ZC07**: el jacuzzi con el cielo y la ciudad | ZC22: la pérgola | ZC29: la vista abierta |
| Canción | ***Street Level Sessions on the Green*** (repetida de la V12/028, autorizada por el usuario el 2026-10-21) | *La Isla Bonita (Saxophone 80 Mix)* | *In This Together* |
| Hilo de recorridos | **lo que se alquila**: el baño · la cocina equipada · el escritorio · la cama con el panel de listones · el coworking · la vista del rooftop | lo que el huésped encuentra al llegar | de la azotea al estudio |

### Lo que NO cambia respecto de las demás piezas del canal (y se dice)

- La estructura de diez planos de la 059 (apertura · hook · 3 de paseo · mitad · 3 del bloque 5, el último, la vista, el más largo · CTA) y su puerta (adaptada).
- La canción es de la biblioteca del canal y **repite la de la V12 (One Living, 028)**: otra propiedad, otra sección de la pista (entra en los 154,6 s; la 028, en los 174,8 s), otra mezcla.

### La afirmación de rentabilidad (lo que se dice y lo que se enseña)

El 0,5 % y el 1 % los dice **la voz de Isabella**: los subtítulos son su transcripción (cifra dicha = cifra escrita), en la línea base y **sin acento**; ningún otro texto repite esos porcentajes (la puerta lo comprueba, 2f). **Rev. 1 — encargo del usuario (2026-10-22):** «después de “ven, te muestro cómo”, genera unos infográficos animados con la rentabilidad» + su tabla (tarifa neta por noche $190.000 · ocupación estimada 85 % · 25,5 noches · ingresos mensuales $4.845.000 · administración −$500.000 · servicios públicos −$300.000 · total gastos −$800.000 · utilidad mensual estimada $4.045.000). La pantalla enseña CÓMO sale, con **sus cifras y sus nombres**, rotuladas como **estimadas** y con un pie que repite lo que advierte la web (los ingresos de renta corta varían por temporada). Es una **excepción declarada** a «el dato grande solo va en el bloque 3»; el caption sigue sin prometer ninguna rentabilidad. La cuenta cuadra (la puerta lo comprueba, 2g); sobre el precio de la ficha (COP 410 M) la utilidad es el 0,99 % mensual, un pelo por debajo del «más del 1 %» que dice Isabella (se avisa al usuario; no se toca la voz).

## Promesa y CTA

- **Promesa (primeros 3,1 s):** el jacuzzi de agua turquesa con el cielo y la ciudad de Medellín detrás, **sin texto ni voz** (regla fija), con el golpe de la canción en el f3. Isabella entra disolviendo y es opaca en el f92; su primera palabra suena en el f99.
- **Acción final:** «haz clic en el enlace y escríbeme un mensaje»; el cierre es la tarjeta con `PropiedadesLuxur.com`, que es justo el enlace del que habla.
- **Lo que NO se cuenta en pantalla:** precio ni ficha (van al caption y a la versión con ficha). **Cifra dicha = cifra escrita**: Isabella dice «24», «0,5 %» y «1 %», que están en sus subtítulos. Además, desde la rev. 1, la infografía lleva las cifras del usuario (190.000 · 85 % · 25,5 · 4.845.000 · 500.000 · 300.000 · 800.000 · 4.045.000).

## Escenas (los seis bloques)

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-3,1 | El rooftop | la promesa | el edificio | ZC07 0,30-3,37 s: el jacuzzi con el cielo y la ciudad · solo música: golpe de 16,4 dB en el f3 |
| 2 | 3,1-11,1 | Hook | el dinero | Isabella | HK03: de pie en el estudio, el balcón al fondo · «Tu plata en el banco pierde valor cada mes. Este estudio de 24 metros cuadrados en Laureles ya está generando dólares.» |
| 3 | 11,1-20,7 | Recorrido | lo que se alquila | el estudio | el baño (RC16) → la cocina equipada (RC05) → el escritorio con los portátiles (RC09) · solo música, cortes secos en golpes |
| 4 | 20,7-29,3 | Mitad | los números, dichos | Isabella | MD05: de pie entre la estantería y la cocina, la cama delante · «La renta tradicional deja el 0,5 % de rentabilidad mensual. Esta inversión deja más del 1 %. Ven, te muestro cómo.» |
| 5 | 29,2-47,4 | Recorrido + infografía | lo que paga el huésped y cómo sale la cuenta | la infografía | **tras «ven, te muestro cómo»**: la infografía de la cuenta durante 14 s sobre un velo negro del 80 % (la cuenta: tarifa → ocupación → noches → ingresos · los gastos · la utilidad estimada, que al final cae sobre la vista con su pie), con cuatro planos de fondo que se funden (la cama RC13, la tele RC03, el sofá RC15 y el coworking ZC01) y la vista del rooftop (ZC11: del borde del jacuzzi a la ciudad y las montañas, 4,2 s, a corte en un golpe; el plano más largo) · cada cifra entra COMPLETA en un golpe medido, sin recuentos |
| 6 | 47,4-54,7 | CTA y cierre | la acción | Isabella | CT03: sentada en el escritorio junto a la cocina · «Si deseas que te envíe la rentabilidad mensual, haz clic en el enlace y escríbeme un mensaje.» · funde a negro y tarjeta oscura con el logo y la web |

## B-roll

No hay: todo es material de la propiedad (inmueble real: **nada generado**, regla del reparto).

## Decisiones tomadas (y las descartadas)

- **Hook, mitad y CTA del reparto**; MEDIO7 (la mejor de las tres tomas de la mitad). MEDIO6 es otra versión de la frase (cambia el orden: «…vente muestro cómo. Esta inversión te puede dejar más del 1 %») y MEDIO8 tiene la misma pero acaba 0,05 s más tarde: MEDIO7 se queda.
- **Rooftop en la apertura y en la vista**, con clips distintos y encuadres distintos (ZC07: agua y cielo; ZC11: del borde del jacuzzi al horizonte). **Lo que se coordinó** con las otras dos sesiones (notas en la carpeta compartida de notas, `060-tramos-de-recorrido.md`): 061 usa ZC22, RC01, RC17, RC07, RC10, ZC05, ZC18; 062 usa ZC29, ZC10, ZC21, ZC06, RC12, RC04, RC18; ninguna comparte un segundo con esta (puerta 7b).
- **El hook entra disolviendo con el golpe 4 f ANTES del final de la disolvencia** (la imagen de Isabella al 67 %): la voz de HK03 arranca a los 0,64 s, y con la disolvencia mínima (`desde` 12 f) su primera sílaba suena a los 7,2 f del `en`; la bajada de la música (10 f) tiene que acabar antes.
- **La mitad deja solo 6 f de aire** entre «cómo» y el golpe del plano siguiente (el clip de MEDIO7 acaba 0,3 s después de la última sílaba): la música empieza a subir en cuanto acaba ella y el golpe suena a −1,4 dB de su nivel.
- **Coworking: ZC01** y no ZC03 (la dirección del giro: el bloque 5 gira a la izquierda en los tres planos, medido con flujo óptico); **cocina: RC05 desde 1,20 s** (los primeros 0,5 s enseñan el cartel de «prohibido fumar»).
- **La infografía (rev. 1 → rev. 2):** la rev. 1 la puso encima de los planos del bloque 5 existentes (10 s, sin tocar la duración, los cortes ni la música) con recuentos en las cifras; el usuario respondió que **«pasan muy rápido»** y pidió que **no se animen los números** y que se pongan **«uno a uno con el valor completo»** para que estén más tiempo. Rev. 2: cada cifra entra completa con un fundido de 8 f (sin recuento, subida ni latido), una cada 1,3-1,5 s dentro de su panel, y cada héroe se queda 2,5-3,2 s entero. Para darle tiempo la infografía dura **14 s** (+3,7 s con la utilidad sobre la vista) y el bloque 5 se rehace: cuatro planos de fondo de 3,5 s bajo el velo (que se funden a un frame libre: no necesitan golpe) y la vista, a corte en el golpe de 10,7 dB que cierra la infografía; el CTA entra en un frame libre (la canción no tiene golpes ≥ 10 dB entre 197,7 y 204,8 s). **La pieza pasa de 47,4 a 54,7 s** (bajo el tope de 55). Se descartó un bloque de infografía a pantalla completa (rehacía la rejilla y alargaba más). Paneles 1 y 2 sobre un velo negro del 80 %; panel 3 sobre la vista (el clímax sigue siendo la vista) con un degradado ligero. Cada panel CENTRADO en vertical sobre y 960 (la mitad del fotograma y del cuadrado 1:1 del feed, y 420-1500) y todo dentro de y 570-1350 (rev. 2026-10-22, encargo del usuario: «centralo a la mitad verticalmente para que en el 1x1 no se recorte arriba»; antes y 440-1200 y la primera etiqueta quedaba a 28 px del borde del recorte). La ficha de la versión 1:1 sale mientras salen las cifras. Letra del canal: Montserrat 500/700 y Playfair itálica para el nombre del héroe; filete dorado `#c6a878`. Sin sonidos añadidos (las piezas del canal no llevan whooshes ni impactos).
- **Descartado:** un rótulo con el precio · un acento en «1 %» (convertiría la voz en titular) · b-roll generado · el baño en el bloque 5 (sentido contrario) · MEDIO6 · la infografía como un bloque nuevo de 9 s (rehace la rejilla y alarga la pieza) · colores por significado (verde/rojo) para ganancias y gastos (el canal es blanco y oro: el signo menos basta).
