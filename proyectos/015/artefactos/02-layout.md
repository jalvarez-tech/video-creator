# 015 · Layout

> Con el [01-plan.md](01-plan.md) delante. Siguiente: [03-timeline.md](03-timeline.md).

## Reparto del espacio (9:16 · 1080×1920)

| banda | y (px) | quién | por qué |
|---|---|---|---|
| sello | 84–130 | `<SelloCampana>` · PROPIEDADES LUXUR con el punto verde | el watermark del canal, en todos los frames (como el 013) |
| ella | 150–1300 | los nueve planos, a sangre | de cuerpo entero en casi todas las tomas: la cara cae entre el 15 y el 45 % del alto |
| texto | 1340–1760 | los doce rótulos (moldes `sello` y `cta`, ancla 69,8 %) | R14: sin subtítulos, el texto va donde el ojo espera leer en un vertical; cae sobre el pantalón y el suelo, nunca sobre la cara |
| márgenes | 118 px | zona segura | ningún rótulo toca los dos bordes (R18: el más ancho, «Detrás de cada problema», ~750 de 844 px) |

No hay tomas a pantalla completa: ella es la protagonista de los 52 s y el
texto nunca la desmonta.

## Z-order (`Apex015.tsx`)

1. `<PistaMetraje>` — los nueve planos mudos, con su empuje (1,00 → 1,04) y sus
   disolvencias. Look NEUTRO (`LOOK_METRAJE_015`): sin velo cálido ni grano,
   solo una viñeta de 0,16 desde el 60 % del radio (`look-015.ts`).
2. `<PistaGraficos>` — el velo de la banda y los textos, overlay fijo.
3. `<SelloCampana>` — el sello del canal.
4. `<Voz015>` — la voz de cada toma (audio).
5. `<PistaSonido>` — los 21 efectos, sin ducking (audio).

## El velo de la banda, medido (R25)

`{ alto: 900, rampa: 0 }` en las doce tomas: la primera empieza en el f0 (la
miniatura) y las once siguientes son relevos CONTIGUOS, así que el velo nace
una vez y no se mueve en 52 s. Opacidad 1 (R13: sobre una persona, solo capas
que resten luz).

Medido **sin el texto** (una composición temporal con el vídeo y el velo, los
mismos frames), mediana por fila del ancho útil (`x = 118…962`). La primera
medida, sobre el render final, salía contaminada: en las filas donde un
titular largo y grueso ocupa más de medio ancho, la «mediana» es el propio
texto (f197 daba luma 225). Con el texto fuera:

| frame | qué es | fila 1340 | filas 1400-1750 | blanco | verde `#34D399` |
|---|---|---|---|---|---|
| f0 | la miniatura | 23 | 18-19 | 17,9 : 1 | **9,3 : 1** |
| f100 | relevo · entra c02 | 33 | 21-25 | 16,1 : 1 | 8,4 : 1 |
| f197 | relevo dentro de c02 | 24 | 19-20 | 17,8 : 1 | 9,2 : 1 |
| f294 | relevo · entra c03 | 34 | 22-25 | 15,9 : 1 | 8,3 : 1 |
| f401 | entra c04 (sin relevo) | 36 | 23-25 | 15,5 : 1 | 8,1 : 1 |
| f537 | relevo · entra c05 | 32 | 23-24 | 16,3 : 1 | 8,5 : 1 |
| **f689** | relevo · entra c06 (fachada) | **38** | 26-27 | **15,1 : 1** | **7,9 : 1** ← el peor |
| f825 | relevo · entra c07 | 22 | 17-18 | 18,1 : 1 | 9,4 : 1 |
| f976 | relevo dentro de c07 | 31 | 19-23 | 16,5 : 1 | 8,6 : 1 |
| f1122 | relevo · entra c08 | 19 | 15-17 | 18,6 : 1 | 9,7 : 1 |
| f1240 | relevo dentro de c08 | 27 | 16-20 | 17,2 : 1 | 9,0 : 1 |
| f1376 | relevo · entra c09 | 36 | 23-25 | 15,5 : 1 | 8,1 : 1 |
| f1464 | relevo al cierre | 32 | 24-25 | 16,3 : 1 | 8,5 : 1 |
| f1562 | el último frame | 34 | 23-26 | 15,9 : 1 | 8,3 : 1 |

El verde nunca baja de **7,9 : 1** (AA pide 4,5). La fila 1340 es siempre la
más clara porque ahí el degradado todavía se está cerrando; con los 830 px del
molde sería peor (lo midió el 013) y por eso va a 900.

## Texto

| toma | molde | kicker | titular / ítems | tinta |
|---|---|---|---|---|
| g01 | sello | lo que aprendí en apex | Lo más valioso / **no fueron las propiedades** (56 px) | verde: el giro |
| g02 | sello | — | Fueron las **ideas** / y las **oportunidades** (58) | verde: lo que sí fue valioso |
| g03 | sello | — | Detrás de cada problema / hay una **oportunidad** (56) | verde: la lección |
| g04 | sello | hoy aprendimos | ✗ Solo resolver problemas · ✓ Crear estrategias (46) | rojo solo en el ✗, verde en el ✓ |
| g05 | sello | algo todavía más importante | Tu **red** cambia / tus oportunidades (60) | |
| g06 | sello | relaciónate con estrategia | Tus posibilidades (60) / **escalan** (76) | |
| g07 | sello | una frase que me marcó | «No siempre gana / el mejor producto» (58) | blanco: es una cita |
| g08 | sello | (el mismo) | «Gana el que el mercado / **entiende mejor**» (58) · IMPORTA CÓMO COMUNICAS (chip 30) | |
| g09 | sello | — | La lección / **más importante** (58) | |
| g10 | sello | la pregunta correcta | ✗ ¿Qué vendo? · ✓ ¿Cómo puedo ayudar? (50) | |
| g11 | sello | — | Isabella Cadavid (64) | blanco: el hecho |
| g12 | cta | escríbeme y hablamos | **@propiedadesluxur** (62) · Instagram · TikTok · Facebook (glifos de 60) | verde: la cuenta del canal |

Tabla de color completa (R15) en `look-015.ts`.

## Los tres iconos

Entraron en el banco del motor (`motor/graficos/Glifos.tsx`: `instagram`,
`tiktok`, `facebook`) con la convención de la casa —trazo 1,9 sobre viewBox 24,
un solo color, `currentColor`—: la silueta de cada logotipo, no el logotipo.
Así toman la tinta del texto de al lado y no meten los colores de tres marcas
ajenas en un cierre de Luxur. La nota de TikTok se redibujó más grande tras el
primer render: ocupaba bastante menos caja que los otros dos.
