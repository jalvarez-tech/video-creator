# 097 · Identidad visual — Fundación MAS

> Investigación de iconografía y color a partir de la pieza de campaña
> `material/referencias/estrellitas-2026.jpg` (2000×667, «MAS Estrellitas 2026»,
> Casa Sobre la Roca + Fundación Misericordia Amor y Servicio). Es la base para
> escribir `remotion/src/marcas/mas.ts` cuando se apruebe.
> Medido el 2026-11-21 con k-means + muestras por zona (mediana de la tinta, sin el fondo).

## 1. Qué es la marca y qué es la campaña

| Capa | Qué es | Color |
|---|---|---|
| **Institucional (MAS)** | Logo: rejilla de puntos + «MAS» geométrica + filetes + «fundación misericordia amor y servicio». Va siempre junto al de Casa Sobre la Roca (monograma CR con cruz), separados por un filete vertical. | índigo `#382A74` |
| **Campaña (Estrellitas 2026)** | Papel amarillo, estrellas azules, letras «MAS» de papel recortado (verde · lavanda · rojo), regalo en línea, foto recortada con borde blanco. | amarillo + azul + trío |

El índigo es el único color que comparten las dos capas (logo y fechas del póster): es el ancla de marca. Lo demás es de la campaña.

No hay manual de marca público: la web no devuelve nada de MAS más allá de su relación con Casa Sobre la Roca (fundada en 2009). Si la fundación tiene el archivo de Canva o un manual, que lo pasen: confirma letras y logos en vectorial.

## 2. Paleta medida

| Token propuesto | Hex | Dónde aparece | Cubre |
|---|---|---|---|
| `papel` | `#FFE400` | fondo (papel arrugado, textura muy sutil: σ luma 1,5) | ≈ 77 % |
| `tinta` | `#382A74` | fechas, logos MAS y CSR | ≈ 4 % |
| `acento` | `#419AFF` | estrellas, titular, «estrellitas», «2026», pasos | ≈ 8 % |
| `verde` | `#0CD175` | la M | puntual |
| `lavanda` | `#A5A6E7` | la A | puntual |
| `rojo` | `#FB0A3F` | la S | puntual |
| `crema` | `#FFFEC0` | regalo en línea | puntual |
| `blanco` | `#FFFFFF` | números en las estrellas, borde de la foto, corazón, camino punteado | puntual |
| `negro` | `#130900` | cuerpo de texto de los pasos | puntual |

### Contraste (WCAG) — qué puede ser texto y qué solo dibujo

| Par | Contraste | Uso |
|---|---|---|
| índigo sobre amarillo | **9,33:1** | todo texto que se tenga que leer |
| negro sobre amarillo | 15,33:1 | cuerpo (el póster lo usa; en vídeo, mejor índigo) |
| blanco sobre índigo | 11,99:1 | tarjetas oscuras, cierre |
| amarillo sobre índigo | 9,33:1 | cifras sobre tarjeta índigo |
| índigo sobre azul | 4,16:1 | texto dentro de una estrella o chip azul |
| azul sobre amarillo | 2,24:1 | **solo display grande** (≥ 90 px a 1080p), nunca cuerpo ni subtítulo |
| rojo sobre amarillo | 3,13:1 | solo display grande |
| blanco sobre azul | 2,88:1 | solo números gruesos dentro de la estrella (como el póster) |
| lavanda / verde / crema sobre amarillo | 1,78 / 1,57 / 1,23 | **nunca texto**: dibujo y confeti |

## 3. Iconografía (inventario)

1. **Estrella de 5 puntas rellena, azul, con número blanco** (pasos 1-2-3). Es el icono protagonista y además un **objeto real**: la «estrellita» que se toma en la oficina es una estrella azul de cartón («Bono»). En vídeo, el icono y el objeto filmado son la misma cosa.
2. **Estrella de contorno dibujada a mano**, azul, con rayitas de brillo.
3. **Regalo en línea** (crema), con rayas diagonales y lazo.
4. **Corazón de contorno** pequeño, blanco.
5. **Camino punteado curvo** blanco que une los pasos: en movimiento, se dibuja de una estrella a la siguiente.
6. **Foto recortada con borde blanco** tipo sticker (troquel), sobre el amarillo.
7. **Letras «MAS» de papel recortado** (verde · lavanda · rojo) con textura de papel: es el lockup de la campaña; se usa como imagen, no se redibuja.
8. **«estrellitas» manuscrita** monolínea + «2026» redonda, en azul.
9. **Firma**: logos CSR | MAS en índigo, con filete vertical.

Estilo general: **dibujo a mano y collage de papel** (cálido, infantil, sin sombras ni degradados), trazo redondeado.

## 4. Letra (por confirmar con el archivo fuente)

| Rol | Lo que se ve | Propuesta |
|---|---|---|
| Titular | redonda, condensada, monolínea gruesa, «a» y «g» de un piso | sin identificar (§4b) → **Dosis ExtraBold (800) con `ss03`**, decidido el 2026-11-22 (§4c) |
| Pasos («Toma una estrellita») | la misma familia en peso fino | ídem |
| Cuerpo y fechas | geométrica tipo **Poppins** Regular / SemiBold | Poppins (añadir y medir) o **Montserrat**, que ya está en el motor |
| «estrellitas» | manuscrita | solo dentro del lockup |

## 4b. Búsqueda de la letra del titular (2026-11-22)

Rasgos medidos en «regalos entregados» (binarizado): ancho de línea = 15,97 × altura x, asta = 0,257 × x, alto total = 1,94 × x. Cualitativos: M de astas rectas con la V corta, «a» y «g» de un piso, «o» y «0» cuadradas redondeadas, terminales planos, y la letra tiene «á» y «ñ» propias.

Descartado, con la silueta pintada a la misma altura x y comparada (IoU; una coincidencia real pasaría de ~0,8):

- **Google Fonts entero**, 1.640 cortes de 1.437 familias (latín, sin serifas ni mono, los dos pesos más gruesos): la mejor es Glory 700 con 0,64; Dosis 800 la más parecida de aspecto, pero con «a» de dos pisos.
- **Do Hyeon y Jua** (Google, de Woowa Brothers): esqueleto parecido, pero no tienen «á» ni «ñ».
- **Familia Hanna de Woowa Brothers** (Pro, Air y 11yrs, del servidor oficial): misma «a» y «g», más cuadrada, y tampoco tiene «á» ni «ñ».
- **Fontshare**: Pally, Chubbo, Roundo, Pilcrow Rounded, Pramukh Rounded, Comico, Kola, Styro, Bonny, Neco, Nippo, Paquito y Telma.

Comparativa en `material/referencias/comparativa-titular.png`. Lo más probable es que sea una letra de la biblioteca de Canva (de pago o con licencia de Canva), que no está en los catálogos libres.

## 4c. Letra elegida: Dosis ExtraBold (decisión del 2026-11-22)

- **Archivo:** `remotion/public/fuentes/dosis/Dosis-Variable.ttf` (Dosis 3.002, variable, eje `wght` 200-800; ExtraBold = 800), descargado de `google/fonts` (`ofl/dosis/Dosis[wght].ttf`), sha256 `b2238eef0b3464904fed097ef274c704bc63d21407369b7d7a5be7b0821a0e82`. Licencia SIL OFL 1.1 en `OFL.txt` al lado: uso comercial libre.
- **Cobertura:** todo el español (á é í ó ú ü ñ, mayúsculas, ¿ ¡ « » € …).
- **Con `ss03` (la «g» de un piso):** es la «g» del póster. En CSS, `font-feature-settings: "ss03"`. La `ss01` cambia el remate de la «a», pero sigue siendo de dos pisos: no se usa.
- **Medido contra el póster** a la misma altura x: el mismo ancho de línea y el mismo grosor de asta (`material/referencias/titular-dosis-extrabold.png`).
- **Diferencias que quedan:** la «a» es de dos pisos, las mayúsculas y las cifras son algo más altas, y **el cero lleva un punto dentro** («3.000»), sin alternativa en la fuente. En una cifra grande se ve.
- **Pesos intermedios:** el mismo archivo da Medium o SemiBold para los textos finos de los pasos («Toma una estrellita»), que en el póster son de la misma familia del titular en peso fino.
- **Aún no está en el motor:** falta empaquetarla (`empaquetar-fuentes.mjs`), registrarla en `motor/fuentes.ts`, darle su pila en `motor/marca.ts` y medir su tabla de avances. Se hace junto con `marcas/mas.ts`.

## 5. El material frente a la paleta

Las fotos de `Downloads/MAS/Fotos` son cálidas: ladrillo, madera, verde de montaña y atardeceres rosa-lavanda, con camisetas blancas y ropa negra. El azul y el amarillo complementan ese metraje sin pelearse, y la lavanda y el rojo del lockup riman con los atardeceres. Aparecen menores: confirmar que MAS tiene la autorización de imagen.

## 6. Propuesta de uso en el vídeo (pendiente de acuerdo)

- **Registro claro** = papel amarillo `#FFE400` (con la textura del póster); **registro oscuro** = índigo `#382A74`.
- **Texto legible siempre en índigo** (o blanco sobre índigo). El azul solo para display grande, estrellas y cifras.
- **Un hero a la vez**: la estrella azul es el marcador de pasos y de transición; el trío verde-lavanda-rojo solo en el lockup «MAS» y como confeti puntual.
- **Fotos de los niños** como recortes con borde blanco sobre el amarillo; vídeo a pantalla completa sin marco.
- **Cierre**: firma CSR | MAS en índigo sobre amarillo + fechas y dirección (Calle 103 No. 14-63).
