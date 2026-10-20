# 02 · Layout y capas — proyecto 053 (V35 «¿Pagarías 14 millones?», réplica de `03.mp4`)

> Paso 2 de 3. Capas, z-order y zonas de pantalla. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido053` (`remotion/src/proyectos/053/`), 1080×1920 a 30 fps, **1376 f (45,87 s)**, sin voz en off (cambio de encargo del 2026-10-20: reparto §5c). Es el montaje del 047 (que ya normaliza bien los clips anamórficos) con los planos, el audio y el texto de esta pieza: lo propio está en `metraje-053.ts`, `audio-053.ts` y `subtitulos-053.ts`. Admite la propiedad `sinSubtitulos` (la base de la versión con ficha, `ficha-luxur`): apaga los subtítulos y su velo y no toca nada más.

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 10 cortes (9 de vídeo mudos y la tarjeta `foto`) | look neutro con viñeta suave; **el color va por plano** (`colorCorrection()`, R32) → render con `--gl=angle`; sin sello ni velos superiores; **todos los planos, salvo el primero, entran con una disolvencia de 12 f**; todo a ×1 y quieto (`zoom` 1,0: más escala ablandaría un material que ya sube ×2,13) |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de la toma del CTA | nada se congela |
| 3 | `VeloSubtitulos` | degradado desde abajo, mientras hay rótulos (casi toda la pieza) | Luxur va sin sombra: el velo es lo único que sostiene el blanco |
| 4 | `SubtitulosEditoriales` | los 10 rótulos (gancho + nueve) y el CTA, UNO a la vez, en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | 12 bloques, 10 acentos |
| 5 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta | centrados, y≈795-1085 |
| 6 | `PistaAudio` | la voz del CTA (WAV tratado, −15 LUFS) + música (*Softly*, arriba a −16,5 LUFS; −26 LUFS bajo la voz del CTA) | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Rótulos:** abajo (borde superior ≈ 74,5 %, nunca por debajo del 88 %; y 1430-1640 px). Arriba **no hay nada** en ningún frame. Se pintan sobre las piernas de Isabella en el gancho y sobre la ropa/la mesa en el CTA: nunca sobre la cara. **En la versión con ficha** la ficha va en y ≈ 1220-1420 y el rótulo debajo (1430-1640): se comprueba en la hoja que no se toquen.
- **Isabella:** HK05 (de pie, de cuerpo entero a torso, caminando hacia cámara) y CT05 (sentada, plano medio). Los dos son anamórficos del 2-sep (chaqueta de flores): una sola pieza entera del mismo vestuario, como pide el catálogo.
- **Recorridos:** los 7 son ANAMÓRFICOS (1920×1080 con SAR 81:256 / DAR 9:16 = verticales de 608×1080 comprimidos a lo ancho) y se escalan ENTEROS a 1296×2304 con `setsar=1`, SIN recorte. El texto de cada tramo es su rótulo.
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.

## Reglas fijas del canal (comprobadas por `revisar-053.mjs`) y excepciones declaradas

1. **La primera toma sale sin texto ni voz → EXCEPCIÓN DECLARADA**: el original abre con Isabella caminando y una voz que pregunta, y la réplica lo conserva (con un rótulo en lugar de la voz). El f0 sale limpio y el rótulo del gancho entra en el f6. Es la excepción por réplica del reparto §2.
2. **Nunca el sello «PROPIEDADES LUXUR»** (se cumple).
3. **El cierre es la tarjeta oscura con el logo y la web** (se cumple; no `@propiedadesluxur`).
4. **Nada se congela** (se cumple: la imagen de Isabella funde a negro en el último fotograma de su toma).
5. **Cifras en pantalla:** «$14.800.000» (acento del gancho: el canon real) y «113 m²» (el rótulo 3, texto del usuario): se declara que son dos.
6. **Transiciones: solo disolvencias** (salvo el frame 0), opacas en el golpe de su cambio: *Softly* no tiene golpes seguidos donde cortar en seco.
7. **Excepciones por réplica, declaradas en la puerta:** abre con Isabella; sin voz en off (los rótulos no acompañan a ninguna voz); el último plano del bloque 5 es el carril de nado y el más largo, el cielo con el jacuzzi (cubre dos rótulos); Isabella solo habla a cámara una vez.

## Lo que decide esta pieza distinto del 047

- **Los bloques son 2-5-6**: gancho (Isabella caminando, rótulo), recorrido con un rótulo por tramo, CTA a cámara. No hay bloque 1 (la casa limpia), ni 3 (recorrido mudo), ni 4 (objeciones).
- **No hay voz salvo la del CTA**: el texto lo llevan nueve rótulos, UNO a la vez, de 3,0 a 4,8 s cada uno (≤ 3 palabras por segundo), cada uno entrando en el frame en que suena un golpe medido de la canción; la puerta comprueba su texto tal cual el reparto §5c.
- **La música pesa más**: arriba casi todo el tiempo y solo baja, con curva y DESPUÉS del golpe en que entra la toma del CTA, bajo su voz.
- **Las mismas tomas en el mismo orden que el original**, comprobado por `ORDEN_DEL_ORIGINAL` en la puerta; la alcoba del original no está en el material y se usa la más parecida (RC05).
- **Imagen algo blanda:** el recorrido son 608×1080 efectivos ×2,13: más blando que Isabella en 4K (se dice, no se filtra: R22), pero con la geometría y el campo correctos.
