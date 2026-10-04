# 02 · Layout — proyecto 017

> Paso 2 de 3. Anterior: [01-plan.md](01-plan.md). Siguiente: [03-timeline.md](03-timeline.md).

## Reparto del cuadro (1080×1920)

| Banda | y (px) | Quién la ocupa | Regla |
|---|---|---|---|
| Superior | 240–… | **nada, en ningún momento**: ni hook escrito (la primera toma sale sin texto), ni cuenta de texto, ni sello. (Hasta la rev. 5 iba aquí el logo, sobre el fotograma congelado; ahora va en la tarjeta del cierre) | por encima del 12,5 % tapa la interfaz de las plataformas |
| Sello | 84–150 | **vacía, siempre**: el sello «PROPIEDADES LUXUR» (`SelloCampana`) no se pone en esta pieza ni en ninguna de este formato (pedido del usuario, rev. 4: «NUNCA LO PONGAS») | nada ahí |
| Centro | 340–1300 | la imagen: el edificio, el recorrido, Isabella | sin texto: ningún bloque `centro` (no hay dato en el bloque 3) y **el primer plano (el dron, f0-60) sin ningún texto** |
| Inferior | 1430–1640 | **los subtítulos de lo que dice Isabella** (borde superior al 74,5 %), a **90 % de opacidad** | un solo modo de texto (R14/R30): ni `PistaGraficos` ni banda |
| Tarjeta del cierre | 795–1085 | **solo en f1339-f1399, sobre fondo oscuro**: el **logo** (440 px de ancho, 60 % de opacidad; el logo en sí, y 795–963) y, debajo, la **web** `PropiedadesLuxur.com` (Montserrat 500, 54 px, blanco, y 1019–1085), centrados; el bloque, centrado en y=940 | dentro de las zonas seguras (por debajo del 12,5 % y por encima del 88 %), con la web más estrecha que el ancho útil (≈ 651 de 842 px); ni subtítulos ni nada más sobre ella |
| Suelo | 1690 | nada por debajo del 88 % del alto | R14: ahí está la interfaz de las plataformas |

## Lo que sostiene la legibilidad

Luxur pinta el texto en blanco **sin sombra ni borde**: lo único que lo sostiene es un velo. Los velos de `<PistaMetraje velos>` son de la pista entera y aquí oscurecerían 12 planos cuyo texto solo aparece en 19 de los 46 s (los subtítulos de Isabella: hook, mitad y CTA); por eso va **un velo propio de la pieza** (como el `VeloTitular` del 016) que vive lo que vive el texto y funde con él. (El logo ya no necesita el suyo: desde la rev. 6 va en blanco sobre la tarjeta negra.)

| Velo | Sobre | Vive | Forma |
|---|---|---|---|
| `VeloSubtitulos` | los subtítulos de Isabella | la unión de sus bloques (los huecos de menos de 1 s no lo apagan: un velo que bombea se ve) | degradado desde el borde inferior (780 px) |

Los alfas son de partida: se miden en el frame contra cada plano (R25) y se bajan todo lo que el contraste aguante.

## La cursiva, 8 px más pequeña (revisión 5)

Las líneas de acento (Playfair Display itálica) miden **91 px** en vez de los 99 del motor: `ACENTO_MENOS_017 = 8` (en `subtitulos-017.ts`) se le pasa a `<SubtitulosEditoriales acentoMenos>`. La
altura de esas líneas baja de 95 a 87 px y el bloque, de 207 a 199 px (151 → 143 el de «Tienes 317 metros»); el borde de arriba (y=1430) y las líneas que van por encima de la cursiva no se mueven (en `c02`, donde la cursiva va en medio, la línea de debajo sube 8 px). Es un ajuste de la pieza: el canal y las demás piezas
no cambian.

## Opacidad de los subtítulos

`<SubtitulosEditoriales>` no tiene parámetro de opacidad y no se toca el motor por esto: la composición lo envuelve en un `<AbsoluteFill style={{ opacity: OPACIDAD_SUBTITULOS }}>` (0,9; una constante exportada que lee la puerta). El 90 % multiplica el de cada línea (que ya entra con su fundido de 5 f), así que en régimen el blanco se pinta a 0,9.

## El color (revisión 7)

El color de cada plano de vídeo es una pasada de `colorCorrection()` sobre el fotograma de su clip, dentro del propio plano: va **por debajo** de la viñeta, de los velos, del fundido a negro, de los subtítulos, del logo y de la web, y **no mueve nada del reparto del cuadro**. Lo que sí cambia es qué se lee sobre qué: el velo de los subtítulos (`VELO_SUBTITULOS`, alfas de partida de 0,62/0,34) se midió contra los planos SIN graduar y los alfas no se han vuelto a medir; los planos que más cambian bajo el texto son c02 (hook) y c11 (CTA), con luma media de 126,5 → 125,9 y 112,9 → 119,4 en los fotogramas de a mitad de plano. Si un bloque de texto deja de leerse sobre uno de ellos, es el velo (R25), no el color: se mide en el frame.

## Z-order (de atrás a delante)

```
<PistaMetraje cortes look />        los 12 planos, mudos (look neutro: viñeta 0,16), cada uno de vídeo con su `color` (rev. 7: `colorCorrection()` sobre el fotograma, ANTES de la viñeta y de todo lo de abajo); el último, la tarjeta de negro liso
<FundidoACierre />                  la imagen de Isabella funde a negro (6 f) y llega a negro exacto en su último fotograma
<VeloSubtitulos />                  solo mientras habla Isabella
<SubtitulosEditoriales />           dentro de un grupo a opacidad 0,9 y con la cursiva 8 px menor
<LogoCierre />                      el logo (440 px, 60 % de opacidad), en la tarjeta (fundido de 10 f)
<WebCierre />                       «PropiedadesLuxur.com», debajo del logo, en la tarjeta (fundido de 10 f)
<PistaAudio tramos />               voz de las tres tomas + música, en la RAÍZ
```

## Encuadre por plano

| Plano | Encuadre | Motivo |
|---|---|---|
| dron de apertura | empuje 1,00 → 1,05 | el único movimiento que no trae el clip: el dron sube muy despacio y a 2 s se nota poco |
| Isabella (3 tomas) | empuje 1,00 → 1,04 (el hook, 1,02 → 1,14: ella es una figura pequeña en una sala enorme) | la persona se acerca; el hook la acerca más para que la voz tenga cara |
| recorrido y dron del bloque 5 | sin empuje (1,00) | «la cámara ya avanza»; el clip se ve a su máxima definición (1296 px sobre 1080) |
| tarjeta del cierre | sin empuje: negro liso | nada se congela (rev. 6): la imagen funde a negro y el cierre es un fondo oscuro con texto, no un fotograma detenido |
