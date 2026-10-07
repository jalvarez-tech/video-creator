# 02 · Layout — proyecto 020

> Paso 2 de 3. Anterior: [01-plan.md](01-plan.md). Siguiente: [03-timeline.md](03-timeline.md).
> Es el mismo reparto del cuadro que el 017, el 018 y el 019 (mismo formato y mismas reglas fijas del canal); lo que cambia es dónde
> cae cada cosa en el tiempo y lo medido sobre ESTA pieza.

## Reparto del cuadro (1080×1920)

| Banda | y (px) | Quién la ocupa | Regla |
|---|---|---|---|
| Superior | 240–… | **nada, en ningún momento**: ni hook escrito (la primera toma sale sin texto), ni cuenta de texto, ni sello | por encima del 12,5 % tapa la interfaz de las plataformas |
| Sello | 84–150 | **vacía, siempre**: el sello «PROPIEDADES LUXUR» (`SelloCampana`) no se pone en esta pieza ni en ninguna de este formato (pedido del usuario en el 017, rev. 4: «NUNCA LO PONGAS») | nada ahí |
| Centro | 340–1300 | la imagen: la calle, el recorrido, el dron, Isabella | sin texto: ningún bloque `centro` (no hay dato) y **el primer plano (la calle y la entrada, f0-76) sin ningún texto**; en él se lee el rótulo «PATIOS» **del propio edificio** (está pintado en el ladrillo: no es texto de la pieza) |
| Inferior | 1430–1640 | **los subtítulos de lo que dice Isabella** (borde superior al 74,5 %), a **90 % de opacidad** | un solo modo de texto (R14/R30): ni `PistaGraficos` ni banda |
| Tarjeta del cierre | 795–1085 | **solo desde f1193, sobre fondo oscuro**: el **logo** (440 px de ancho, 60 % de opacidad; el logo en sí, y 795–963) y, debajo, la **web** `PropiedadesLuxur.com` (Montserrat 500, 54 px, blanco, y 1019–1085), centrados; el bloque, centrado en y=940 | dentro de las zonas seguras (por debajo del 12,5 % y por encima del 88 %), con la web más estrecha que el ancho útil (≈ 651 de 842 px); ni subtítulos ni nada más sobre ella |
| Suelo | 1690 | nada por debajo del 88 % del alto | R14: ahí está la interfaz de las plataformas |

Los números del cierre son los del 017, el 018 y el 019 (`cierre-020.ts` los copia: el logo a 440 px y 60 %, la web a 54 px, la tarjeta de 60 f): las cuatro versiones tienen que terminar igual.

## Lo que sostiene la legibilidad

Luxur pinta el texto en blanco **sin sombra ni borde**: lo único que lo sostiene es un velo. Un velo propio de la pieza (`VeloSubtitulos`, como en las versiones anteriores) vive lo que vive el texto y funde con él; los huecos de menos de 1 s entre bloques no lo apagan (un velo que bombea se ve más que el texto).

| Velo | Sobre | Vive | Forma |
|---|---|---|---|
| `VeloSubtitulos` | los subtítulos de Isabella | la unión de sus bloques (h01-h02: f78-240 · m01-m02: f566-727 · c01-c02: f1091-1182) | degradado desde el borde inferior (780 px), alfas 0,62 / 0,34 |

**Los alfas son los de las versiones anteriores** (0,62 / 0,34) y no se han bajado ni subido. La legibilidad se mide como en la V3 (`herramientas/legibilidad.py`): el resultado de esta pieza está en `03-timeline.md` («Legibilidad»).

## La cursiva, 8 px más pequeña

Igual que el 017, el 018 y el 019: las líneas de acento (Playfair Display itálica) miden **91 px** en vez de los 99 del motor. `ACENTO_MENOS_020 = 8` (en `subtitulos-020.ts`) se le pasa a `<SubtitulosEditoriales acentoMenos>`. Es un ajuste de la pieza: `luxur.ts` y las demás piezas no cambian. Los cuatro acentos de esta pieza, «terminado,», «para ti.», «definir.» y «escríbeme», son de una sola palabra o dos: caben sin que el motor los encoja (el primer intento, «totalmente terminado,» en una línea de acento, medía 83 px en vez de 75 y no cabía).

## Opacidad de los subtítulos

`<SubtitulosEditoriales>` no tiene parámetro de opacidad y no se toca el motor por esto: la composición lo envuelve en un `<AbsoluteFill style={{ opacity: OPACIDAD_SUBTITULOS }}>` (0,9; una constante exportada que lee la puerta).

## El color

El color de cada plano de vídeo es una pasada de `colorCorrection()` (Remotion 4.0.509) sobre el fotograma de su clip, dentro del propio plano: va **por debajo** de la viñeta, de los velos, del fundido a negro, de los subtítulos, del logo y de la web, y **no mueve nada del reparto del cuadro**. Detalle por plano en `01-plan.md` («El color»).

## Z-order (de atrás a delante)

```
<PistaMetraje cortes look />        los 11 planos, mudos (look neutro: viñeta 0,16), cada uno de vídeo con su `color` (`colorCorrection()` sobre el fotograma, ANTES de la viñeta y de todo lo de abajo); el último, la tarjeta de negro liso
<FundidoACierre />                  la imagen de Isabella funde a negro (6 f) y llega a negro exacto en su último fotograma (f1192)
<VeloSubtitulos />                  solo mientras habla Isabella
<SubtitulosEditoriales />           dentro de un grupo a opacidad 0,9 y con la cursiva 8 px menor
<LogoCierre />                      el logo (440 px, 60 % de opacidad), en la tarjeta (fundido de 10 f, 2 f después de empezar)
<WebCierre />                       «PropiedadesLuxur.com», debajo del logo, en la tarjeta (fundido de 10 f, 8 f después de empezar)
<PistaAudio tramos />               voz de las tres tomas + música, en la RAÍZ
```

## Encuadre por plano

| Plano | Encuadre | Motivo |
|---|---|---|
| calle (RC22) | empuje 1,00 → 1,04 | el clip ya sube por la fachada; el empuje solo suma una pizca de profundidad en 2,5 s |
| Isabella (3 tomas) | hook 1,00 → 1,04 · mitad 1,00 → 1,04 · CTA 1,00 → 1,03 | las tres se acercan caminando; el empuje es mínimo para no recortar el cuerpo entero, que es lo que enseña el sitio |
| recorrido (RC02, RC05, RC09, RC13, RC04) | quieto (1,00) | la cámara ya avanza o gira |
| dron (DR156) | empuje 1,00 → 1,04 | el dron ya sube; el empuje es muy leve y no recorta los pilares blancos |
| tarjeta | quieto | un negro liso |

Todos los planos cubren el cuadro con holgura (clips a 1296×2304 = 1080 × 1,2: el techo del zoom).
