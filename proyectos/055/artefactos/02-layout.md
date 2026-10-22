# 02 · Layout — proyecto 055 · Casa en Condominio Los Bravos (La Ceja), V37 «Las mañanas»

> Paso 2 de 3. Dónde vive cada cosa en pantalla, con el [01-plan.md](01-plan.md) delante y sin pensar todavía en frames.
> Siguiente: [03-timeline.md](03-timeline.md).

## Reparto del espacio (9:16 · 1080×1920)

| Banda | y (px) | Quién la ocupa | Regla |
|---|---|---|---|
| Arriba | 0-1430 | la imagen (aérea, recorridos, Isabella) | **Arriba no hay texto en ningún momento** (regla fija del canal). El logo vive solo sobre la tarjeta oscura |
| Subtítulos | 1430-1640 (nunca por debajo de 1690) | los subtítulos editoriales de Isabella, a 90 % de opacidad, sin sombra | solo mientras habla; borde superior al 74,5 % del alto; el bloque crece hacia abajo hasta tres líneas y no pasa del 88 % |
| Velo | 0-780 desde el borde inferior | degradado propio de los subtítulos (`VeloSubtitulos`), solo mientras hay texto | Luxur no lleva sombra: el velo es lo único que sostiene el blanco sobre un ventanal o un cielo; se mide en el fotograma (R25) |
| Cierre | y ≈ 795-1085 | tarjeta oscura: logo (440 px de ancho, 60 % de opacidad) y `PropiedadesLuxur.com` (Montserrat 500, 54 px, blanco), centrados | nada se congela; sin `@propiedadesluxur`; sin el sello «PROPIEDADES LUXUR» |
| Márgenes | 118 px | zona segura | nada de contenido fuera |

## Tipos de plano (no se mezclan)

- **Isabella a cámara** (hook, mitad, CTA): su imagen es la capa de abajo y su texto va debajo de ella (nunca `arriba` ni `centro`: le taparía la cara). Entra siempre **a corte** sobre un golpe de la canción, con su primera sílaba 8 f después.
- **Recorrido y aérea**: mudos, a pantalla completa, cámara en movimiento propio (nada de zoom añadido: `QUIETO`). Solo hay texto cuando habla Isabella; en los recorridos no hay ninguno (ni siquiera un dato: no hay cifras).
- **Tarjeta del cierre**: fondo negro liso con el logo y la web; la imagen de Isabella funde a negro en los 6 últimos fotogramas de su toma y llega a negro exacto en el último.

## Z-order de la composición (de atrás a delante)

1. `PistaMetraje` — los planos mudos, con la tarjeta oscura al final (look neutro: una viñeta suave; el color va en el `color` de cada plano, R32).
2. `FundidoACierre` — el fundido a negro de la imagen de Isabella entre su última palabra y la tarjeta.
3. `VeloSubtitulos` — solo mientras hay subtítulos (se apaga con `sinSubtitulos`).
4. `SubtitulosEditoriales` — overlay fijo, dentro de un grupo a 90 % de opacidad y con la cursiva 8 px más pequeña (`ACENTO_MENOS_055`).
5. `LogoCierre` y `WebCierre` — sobre la tarjeta.
6. `PistaAudio` — voz de las tres tomas + música, en la raíz.

## Lo que NO hay (decisiones declaradas)

- **Sin `PistaGraficos`**: con subtítulos editoriales, los moldes `sello` y `cta` quedan fuera (R14): la banda inferior es de los subtítulos.
- **Sin cámara virtual** (`camara-avatar`): no hay avatar generado; Isabella es una toma real y los recorridos ya se mueven.
- **Sin SFX**: whooshes e impactos no son de este formato; la transición es el golpe de la propia canción.
- **Sin voz en off**: las tres frases son las de sus tomas.
- **Sin cifras**: ni dichas ni escritas (la ficha — precio, áreas, alcobas — va en el caption). La versión con ficha (`ficha-luxur`) añade tipo · lugar · precio abajo del cuadrado 1:1 durante todo el vídeo, **sin subtítulos**.
