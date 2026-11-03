# 02 · Layout — proyecto 069 · «Unidos por Botswana»

> Paso 2 de 3. Dónde vive cada cosa en pantalla. [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

## Reparto del espacio (9:16 · 1080×1920)

No hay avatar ni cara protagonista que reencuadrar: el movimiento ES el montaje (director §3i). Lo único que se coloca a mano es la tarjeta final.

| Banda | y (px) | Quién la ocupa | Regla |
|---|---|---|---|
| Superior | 0–250 | nada | la interfaz de cada app (nombre de cuenta, cerrar) |
| Cuerpo | 250–1640 | los planos a pantalla completa; en la tarjeta, la columna de textos | |
| Inferior | 1640–1920 | nada | botones, descripción y barra de progreso de la app (280 px) |

**Ningún texto sobre las fotos ni sobre los vídeos** (no hay subtítulos todavía): por eso no hay velos (`PistaMetraje velos` sin pasar). La viñeta del look (0,2, desde el 58 %) y un grano de 0,025 igualan fotos de dos fotógrafos, mensajería y MOV de iPhone.

## Cómo se ve cada tipo de plano

| Plano | Cómo llena el cuadro | Por qué |
|---|---|---|
| Foto 4:3 / 3:2 apaisada (la mayoría) | **entera**, a 1296 px de ancho, sobre su propia imagen desenfocada y oscurecida | recortarla a 9:16 dejaría un 43 % de una foto de grupo: caras cortadas |
| Foto centrada (`a03` el beso, `antes-cabanas`, `antes-sala`) | ventana 9:16 de alto completo, con el centro en `fx` | composiciones simétricas: el sujeto cabe y el plano llena la pantalla |
| Vídeo vertical (incendio, el lugar después —`lle01`, `bom01`, `des03`, `des07`—, los 2 MOV) | escala entera a 1296×2304 (los MOV, recortados a ellos: ver abajo) | ya es 9:16 |
| Vídeo apaisado (`ant02`, `des08`; ya no están en el montaje) | **entero** sobre su fondo desenfocado | recortarlo sería un zoom ×3,9 |

Punch-in: ≤ 1,12 en todo, **≤ 1,04 en los clips de mensajería** (el incendio y el lugar después: son 464×832 ampliados ×2,8: más zoom, más blando).

**`mov1` (rev. 2: «un zoom y céntranos un poco»).** Ellos caminan por el 30 % izquierdo del cuadro y son figuras pequeñas (13 % del alto al empezar, 22 % al acabar). El motor solo tiene `pan` vertical, así que el encuadre se **cuece en el archivo**: `normalizar.mjs` recorta una ventana 9:16 de la fuente 4K (2160×3840) con zoom ×1,6 centrada en (31 % del ancho —pegada al borde izquierdo—, 58 % del alto) → 1350×2400 (= 1,25 × el cuadro, sin reescalar). Ellos quedan casi al centro (45 % del ancho) y el plano añade un empuje 1,2 → 1,0: zoom efectivo 1,9 → 1,6 (la rev. 1 era 1,45 → 1,15), ocupando del 25 al 35 % del alto. A ≤ 1,2 el archivo se ve a 1:1 o mejor respecto a la fuente. El resto, un empuje lento de 4-10 %.

## Dos entradas, dos significados

| Entrada | Significado | Dónde |
|---|---|---|
| **corte seco** | duele o sorprende | la foto → el incendio (f107, EN el golpe de 11,3 dB); cada plano del lugar quemado (el muro en el golpe de 12 dB, los bomberos, la cocina, la estructura, los costales: entran siempre a corte); **el fuego del final** (f1558, en el golpe de 8,5 dB) y **el arco ardiendo** (f1673); el lugar «antes» tras ellos (f476) |
| **disolver** (12 f) | pasar de lo que fue a lo que quedó, o de un recuerdo a otro | el salón de antes, la foto de la boda de la escena 5 (la arena), hacia el MOV 2 |
| **fundido a negro** (10-12 f) | respirar | el incendio funde a negro antes de ellos dos (f206-214); el arco ardiendo funde a negro (f1769-1781) antes de la tarjeta |

## La tarjeta final (1781–2081, 300 f)

Columna centrada, anclada a los 1080 px, fuera de los 250 px de arriba y de los 280 de abajo:

| y | Bloque | Letra | Color | Entra (f desde el inicio de la tarjeta) |
|---|---|---|---|---|
| 330 | «EL FUEGO PUEDE / DESTRUIR UN LUGAR.» | Montserrat 700 · 58 px · interletrado 4 | blanco | 8 |
| 520 | «PERO JAMÁS EL **AMOR** / QUE ALLÍ NACIÓ.» | Montserrat 800 · 58 px · interletrado 4 (rev. 7: antes Playfair Display cursiva 66 px) | blanco; AMOR en rojo | 52 |
| 740 | corazón (SVG, 96 px, latido) | — | rojo | 74 |
| 880 | filete de 140 px | — | gris al 40 % | 112 |
| 940 | «Unidos por Botswana. / Unidos por Nelson.» | Montserrat 700 · 58 px | blanco | 112 |
| 1160 | **«Aporta. Comparte.»** y, debajo, «Ayúdanos a reconstruir este sueño.» (rev. 7: resumen del párrafo de 3 líneas del guion) | Montserrat 800 · 66 px · interletrado 2 / Montserrat 500 · 38 px | ámbar / gris | 136 |
| abajo, a 280 px | marco ámbar con «[Información oficial para realizar aportes]» o, con datos, hasta 4 líneas de 38 px | Montserrat 500-600 | ámbar / blanco | 166 |

Cada bloque entra con un fundido de 14 f y una subida de 18 px; nada sale. Todo en pantalla a los 180 f (f1961): la tarjeta se queda 4,0 s con el cuadro completo. **Una sola fuente en toda la tarjeta: Montserrat** (rev. 7). Bajo la tarjeta la música sigue 2 s en su meseta y se apaga.

## Z-order de la composición

```tsx
<AbsoluteFill style={{ backgroundColor: LOOK_069.negro }}>          {/* #0B0908 */}
  <PistaMetraje cortes={metraje069} look={LOOK_069} />               {/* 1 · 19 planos, mudos */}
  <Sequence from={INICIO_TARJETA} durationInFrames={DUR_TARJETA}>
    <TarjetaFinal />                                                  {/* 2 · overlay FIJO */}
  </Sequence>
  <PistaAudio tramos={audio069} />                                    {/* 3 · la canción + voz de los MOV + locuciones, en la RAÍZ */}
</AbsoluteFill>
```

Sin `CamaraVirtual` (no hay sujeto), sin `PistaGraficos` (el único texto va a mano y es de esta pieza), sin `SelloCampana` (pieza personal).
