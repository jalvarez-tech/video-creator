# 02 · Layout — proyecto 097 · «Lo más bonito de un regalo»

> Paso 2 de 3. Dónde vive cada cosa en pantalla. Se escribe con el
> [01-plan.md](01-plan.md) delante y **sin pensar todavía en frames**.
> Siguiente: [03-timeline.md](03-timeline.md).

## 1. Reparto del espacio (16:9 · 1920×1080)

| Banda | y (px) | Quién la ocupa | Regla |
|---|---|---|---|
| Superior | 54–330 | kicker, fecha, **pegatinas de deseos**, la columna de cualidades (a la derecha) | Va sobre el cielo o la pared, nunca sobre una cara. Se fija mirando el still de cada plano |
| Centro | 330–830 | **las caras**. Solo entran en el centro los heroes que van sobre papel (HZ17, HZ32, el puente) y siempre en el hueco del plano | Un hero a la vez. Si tapa una cara, se cambia de lado, no se encoge |
| Inferior | 850–1000 | **la tira de las citas** (lo que dicen las niñas) | Una o dos líneas. Base de la última línea ≈ 930 (86 %, como `TutorialYT`) |
| Márgenes | 96 px a los lados, 54 arriba y abajo | zona segura (5 % del 16:9, `presets.ts`) | Nada fuera |

- **Alineación dominante: izquierda.** La tira, el kicker y los pasos del CTA arrancan en x = 96. Solo el hero del clímax (HZ32) y el puente (DR07) van centrados, porque son el centro del vídeo.
- **Recortes de seguridad para redes:** lo importante del CTA (pasos, fechas, dirección) queda dentro del 4:5 central (x 312–1608), para que el derivado cuadrado o 4:5 salga recortando y no recomponiendo.

## 2. Dos tipos de toma (no se mezclan)

- **Toma de metraje:** el plano a pantalla completa (HZ, DR, o VT recortado) con, como mucho, **una tira abajo y una pegatina o un hero de papel**. Manda la persona que habla.
- **Toma de papel:** el amarillo del cartel a pantalla completa, con su textura de papel arrugado muy suave (σ de luma 1,5, como el cartel). Aquí no hay metraje, salvo fotos-pegatina. Es el molde `pantalla` de la capa de gráficos.

| Toma de papel | Tramo | Por qué a pantalla completa |
|---|---|---|
| P28 · la meta | 90,6–96,6 s | La cifra y el «+1» son el argumento y necesitan el ancho |
| P29 · los tres pasos y «desde lejos» | 96,6–110,6 s | Es el cartel en movimiento, con la página y el QR: tiene que poder leerse, escanearse y hacerse captura |
| P30 · el cierre | 110,6–116,1 s | La foto del grupo, la firma, la última frase y el QR; el último frame se queda quieto |

## 3. Los planos verticales en un vídeo 16:9

**Decisión: los verticales que entran van RECORTADOS a 16:9 y a pantalla completa.** Los mapas confirman, plano a plano, que en esos tramos cabe la franja de la cabeza a la cintura. Un VT de 4K girado mide 2160×3840. La franja 16:9 a todo el ancho mide 2160×1215 y se reduce a 1920×1080 (×0,89), así que llega nítida y deja margen para un acercamiento de hasta ×1,12.

| Plano | Tramo | Qué cabe en la franja (del mapa) | Encuadre |
|---|---|---|---|
| VT13 | 0,6–3,6 | las dos niñas, el micro y el árbol, de la cabeza a la cintura | franja centrada en las cabezas; **y POR MEDIR** en el still |
| VT11 | 4,8–6,9 | plano medio a dos (adulto y niña de perfil), con el árbol entre ellos | a la altura del pecho |
| VT10 | 4,3–7,4 | de la cabeza a la cadera, plano medio largo | cabeza en el tercio superior |
| VT07 | 3,8–5,0 y 5,3–18,5 | de la cabeza a la cintura, con el micro entrando por la derecha | cabeza en el tercio superior; acercamiento lento 1,00→1,06 en el testimonio |
| VT06 | 2,7–4,4 y 4,7–8,3 | planos medios; la cara y el pecho caben | la que responde, de perfil ante el árbol iluminado |
| VT36 | 0,4–2,6 | la franja dorada con montañas y palmeras | la franja del horizonte |

- **Si un vertical no cabe** (los selfis, el final de VT33, VT28), no se fuerza el recorte: **se monta como foto-pegatina sobre el papel amarillo** (borde blanco de 14 px, giro de ±2°, como la foto recortada del cartel). Nunca con relleno difuminado a los lados: se lee como un vídeo de móvil mal pasado.
- **Pantalla partida: descartada.** La única candidata era pregunta | respuesta de VT06, y el momento de la respuesta pide intimidad, no simetría.
- **Fotos (FT) en 16:9:** solo como pegatina sobre el papel (P30: FT35, el grupo al atardecer). Son 4K y aguantan.

## 4. Sistema de motion graphics

**Un estilo: papel recortado y trazo a mano** (preset `organic` de motion-graphics; en sonido, la familia «orgánico»). Es el lenguaje del cartel: collage de papel, dibujo a mano, sin sombras ni degradados, trazo redondeado. Nada de glitch, rebotes cómicos ni brillos de tecnología.

### 4.1 Letra

| Rol | Letra | Peso | Cuerpo a 1080p | Color |
|---|---|---|---|---|
| Hero (titular grande) | Dosis con `ss03` | 800 (ExtraBold) | 96–120 px | índigo; **una** palabra en azul solo si va ≥ 90 px |
| Cita en la tira | Dosis `ss03` | 600 (SemiBold); la palabra acentuada en 800 | 54 px | índigo |
| Kicker y fecha | Dosis `ss03` | 600, versalitas o minúsculas | 34–38 px | índigo |
| Pasos del CTA: título · línea | Dosis `ss03` | 800 · 500 | 64 px · 40 px | índigo (el número, blanco dentro de la estrella azul) |
| Cifra «3.000» | Dosis 800 **o Montserrat 800** (ver abajo) | 800 | 220 px | azul (display) |

- **Una sola familia** (Dosis) en tres pesos: 800, 600 y 500. Montserrat entra solo si se cambian las cifras.
- **El cero de Dosis lleva un punto dentro** («3.000» se lee «3.0̣0̣0̣»). Se ve en una cifra grande. Dos salidas: aceptarlo, o pintar **solo los dígitos** en Montserrat 800, que ya está en el motor. **Decisión abierta para el usuario**; propuesta: Montserrat en la cifra.
- **Falta en el motor:** empaquetar Dosis, registrarla en `motor/fuentes.ts`, medir su tabla de avances (`generar-avances.mjs`) y escribir `remotion/src/marcas/mas.ts`. Sin la tabla, R09 (el ancho) no se comprueba.

### 4.2 Las piezas del sistema

| Pieza | Qué es | Dónde | Animación | ¿Existe? |
|---|---|---|---|---|
| **Tira de cita** (las niñas) | tira amarilla de papel con el borde rasgado (giro −1°), cita en índigo entre «», una palabra acentuada en 800 con **subrayado a mano** azul | banda inferior, x = 96 | la tira se despega de izquierda a derecha (barrido de 8 f, sin muelle); la frase entra entera, sube 6 px y aparece en 10 f; sale con un fundido de 6 f. **El texto no se mueve mientras se lee.** | **nueva, del proyecto** (`CitaPapel`). El módulo `editorial` del motor pinta blanco sin caja y no sirve para la marca. Decidir si sube al motor como piel `caja: "papel"` |
| **Tira de la voz en off** (MAS) | la misma tira, pero **índigo con letra blanca y sin comillas** (11,99 : 1): sin sonido, se sabe que habla la fundación y no una niña | banda inferior, x = 96 | igual que la tira de cita | la misma pieza, con `piel: "indigo"` |
| **Pegatina de deseo** | trozo de papel amarillo con borde blanco y la palabra («una radio») en 800, más un regalo en línea dibujado en índigo | banda superior, y se van acumulando de izquierda a derecha | muelle suave (`entrada`) con un giro de ±3° que se asienta; las anteriores se quedan | nueva, del proyecto (`PegatinaDeseo`): `piel` de papel + `glifo` regalo |
| **La estrellita** | estrella de 5 puntas rellena, azul `#419AFF`, la del cartel (el objeto real de la campaña) | aparece en los seis momentos-ancla (ver 03 §Anclas) | escala 0→1 con `SPRING.entrada`, un destello y un leve giro de 8° que se asienta; en el CTA lleva el número en blanco | nueva, del proyecto (`Estrellita`): un path propio; el catálogo no tiene estrella |
| **Camino punteado** | línea blanca punteada y curva que une las estrellas del CTA | P29 | se dibuja de una estrella a la siguiente (`extiende`), lineal | **existe:** `pieza: "enlace"` con recorrido 1,0 |
| **Subrayado a mano** | trazo de rotulador azul bajo una palabra | «perdonar», «la verdad de Cristo», «cariño y amor» | se dibuja en 12–14 f | **existe:** `pieza: "subrayado"` (una `semilla` distinta cada vez) |
| **Óvalo de rotulador** | óvalo azul alrededor de «Cristo» | HZ17 | se dibuja en 16 f con un exceso al cerrar | **existe:** `pieza: "rodea"` (una sola vez en la pieza: si se repite, deja de señalar) |
| **Columna de cualidades** | cada palabra entra grande (hero) y, al llegar la siguiente, se encoge y se coloca en una columna a la derecha | P11–P15 | la grande entra con muelle suave; el paso a la columna con `atenua` + traslado en 8 f | se compone: `titular` + `lista` (sin marca) + `atenua` |
| **Trío M·A·S** | tres subrayados en verde, lavanda y rojo bajo «Misericordia», «Amor» y «Servicio» | HZ08 | uno por palabra, a la vez que el grito | existe (`subrayado` con `tinta`); los colores, solo como dibujo |
| **Corazones** | corazón de contorno blanco (icono 4 del cartel) | HZ19, junto a las manos | tres corazones con 4 f de escalonado, suben 20 px y se apagan | nuevo, del proyecto (path) |
| **Contador** | «3.000» que se forma; al lado, un «+1» azul con la estrella («Uno puede ser el tuyo») | P28 | `outCubic`, 48 f, aterriza con campanilla en la palabra «tres mil» de la voz; el «+1» entra con muelle suave 1,6 s después | **existe:** `pieza: "contador"`; el «+1», `titular` + `Estrellita` |
| **QR a la página de donación** | código QR índigo sobre blanco, 240 px, con marco blanco de papel y la dirección escrita debajo («Dona en …») | P29 abajo a la derecha; P30 pequeño (160 px) y quieto hasta el último frame | fundido de 10 f, sin escala ni giro (un QR que se mueve no se escanea) | **nueva, del proyecto** (`QrPapel`), generado a partir de la dirección **[POR CONFIRMAR CON MAS]**. Se prueba con un móvil en la pantalla y a 3 m |
| **Paso de CTA** | estrella numerada + título + línea | P29 | estrella, título y línea con 3 f de escalonado | se compone: `Estrellita` + `titular` + `etiqueta` en una `fila` |
| **Foto-pegatina** | foto con borde blanco de 14 px, giro −3° | P30 (FT35) | entra deslizando desde abajo con muelle suave y se asienta | nueva, del proyecto (troquel); la imagen es la foto real |
| **Firma** | logos CSR \| MAS con filete vertical, en índigo; lockup «MAS estrellitas 2026» | P30 (y el CTA) | fundido de 12 f, sin rebote (un logo no rebota) | **imagen de MAS** **[POR CONFIRMAR CON MAS: archivos]**; se usa como imagen, no se redibuja |

### 4.3 Reglas de la capa

- **Un hero a la vez** (`revisaPlan` lo comprueba). Cuando hay hero de papel (HZ17, la columna, HZ08, HZ32, el puente), **la tira no está**: el hero es la cita.
- **Dos tiras, dos voces:** amarilla con «comillas» = una niña; índigo sin comillas = la voz en off. No se mezclan nunca en la misma tira.
- **Nunca texto en azul, verde, lavanda ni rojo por debajo de 90 px.** El azul es para la estrella y para una palabra grande.
- **Dirección con sentido:** las pegatinas se acumulan de izquierda a derecha (antes → después). La estrella del clímax sube con los brazos (arriba = gratitud). La del puente baja del cielo al centro del círculo (llega a ellas). En el CTA, la estrella del círculo se convierte en la estrella 1 (continuidad causal: la misma estrella).
- **Entradas con muelle suave y nada de rebote visible** en texto que se lee (`SPRING.entrada` o `contador`). El único «juego» de escala es «muy GRANDE» en HZ17.
- **Movimiento ambiente:** ninguno sobre el metraje. En el papel, una deriva lentísima de la textura (±4 px en 10 s) para que el amarillo no se lea como imagen congelada.

## 5. Z-order de la composición (montaje)

```tsx
import { PistaMetraje } from "../../motor/metraje";
import { MONTADORES_BASE, PistaGraficos } from "../../motor/graficos/PistaGraficos";
import { PistaAudio } from "../../motor/sound/PistaAudio";
import { PistaSonido } from "../../motor/sound/PistaSonido";
import { MAS as CANAL } from "../../marcas/mas";          // por escribir (fase de código)

<AbsoluteFill style={{ backgroundColor: "#FFE400" }}>         {/* fondo = el papel de la marca (en mas.ts): lo que no tapa el metraje es papel */}
  <PistaMetraje cortes={metraje097} marca={CANAL} />           {/* 1 · los planos, mudos; sin velos: la tira es su propia caja */}
  <PapelCTA097 />                                               {/* 2 · tomas de papel (P28-P30): textura + fotos-pegatina */}
  <PistaGraficos plan={graficos097} montadores={MONTADORES_097} /> {/* 3 · overlay FIJO: tiras, pegatinas, estrella, CTA.
                                                                     MONTADORES_097 = MONTADORES_BASE + CitaPapel,
                                                                     PegatinaDeseo, Estrellita, Corazon, FotoPegatina, QrPapel */}
  <PistaSonido cues={cues097} duckDb={-4.5} />                  {/* 4 · SFX bajo las voces */}
  <PistaAudio tramos={audio097} />                              {/* 5 · voces de las niñas + música, en la RAÍZ */}
</AbsoluteFill>
```

- **Sin `<SubtitulosEditoriales>`:** las citas son la tira, una pieza del plan de gráficos. Así comparten la regla del hero único con las pegatinas.
- **Sin velos:** la tira lleva su papel, y no hace falta oscurecer el metraje para leer.
- **Sin sello de canal flotando:** la firma solo sale en el cierre. Una marca de agua durante el documental lo convertiría en anuncio.

## 6. Gráficos por escena

| Escena | Qué se ve | Pieza (catálogo o nueva) | Zona | ¿Nuevo componente? |
|---|---|---|---|---|
| 1 · hook | la pregunta, ya puesta en el frame 0; un subrayado avanza bajo cada palabra mientras ella la dice; la estrella se pega junto a «regalo»; después, la tira índigo de VO1 | `CitaPapel` + `subrayado` + `Estrellita` · `CitaPapel` índigo | inferior (la tira) | sí, del proyecto |
| 2 · bienvenida | fecha «20 de noviembre de 2026» y cita «¡Bienvenidos a la Nuestra!» | `kicker` + `CitaPapel` | superior izquierda · inferior | — |
| 3 · deseos | tres pegatinas que se acumulan: «una radio», «un conejito», «un bafle» | `PegatinaDeseo` ×3 | superior | sí, del proyecto |
| 4 · HZ17 | las pegatinas se apagan; hero de papel «a Cristo en mi vida» con óvalo azul en «Cristo» y la estrella; después «y una Biblia muy grande» con «grande» que crece | hero en `piel` de papel + `rodea` + `Estrellita` + `atenua` | centro-superior, sobre el cielo | — (piel de papel, la misma que la tira) |
| 5 · sueños | cita «¿Cuáles son tus sueños?» → «Ser policía.» | `CitaPapel` | inferior | — |
| 6 · lo aprendido | cita de la pregunta → «Es saber a **perdonar** a las demás personas.» con subrayado | `CitaPapel` + `subrayado` | inferior | — |
| 7 · cualidades | kicker «Ellas mismas hacían las preguntas.» + cita de la pregunta → cinco palabras que entran grandes y se van a la columna | `kicker` + `CitaPapel` → `titular` + `lista` + `atenua` | inferior → centro-derecha → columna derecha | — |
| 8 · VT07 | solo la tira, trozo a trozo, lenta; subrayado bajo «la verdad de Cristo» | `CitaPapel` + `subrayado` | inferior | — |
| 9 · alegría | trío M·A·S bajo el grito de HZ08; tiras de «¡Feliz Navidad para todos!» y «¡Dios es bueno!»; corazones en HZ19; nada en HZ28 y DR04; hero «¡Gracias a Dios por la Navidad!» en HZ32 con la estrella que sube | `titular` + `subrayado` ×3 · `CitaPapel` · `Corazon` · hero de papel + `Estrellita` | centro-inferior · inferior · junto a las manos · centro | `Corazon`, del proyecto |
| 10 · respuesta | la tira **en el mismo sitio y con el mismo estilo que en el hook** (para que se reconozca la pregunta); «cariño y amor» subrayado y un destello | `CitaPapel` + `subrayado` + `Estrellita` (destello) | inferior | — |
| 11 · revelación y puente | tira índigo «Ellas reciben su regalo gracias a MAS Estrellitas.» (VO2a); después, hero «Esta Navidad, esa persona puedes ser **tú**.» (VO2b); la estrella baja del cielo y cae en el centro vacío del círculo | `CitaPapel` índigo · hero de papel + `Estrellita` | inferior · inferior centrada · el centro del círculo | — |
| 12 · CTA | la hoja amarilla entra; la estrella pasa a la izquierda; «Este año queremos entregar más de» + contador «3.000» + «+1» y «Uno puede ser el tuyo.»; tres pasos unidos por el camino punteado, al ritmo de VO4; fechas; «¿Estás lejos? Dona en …» con el QR | molde `pantalla` · `contador` · `Estrellita` + `titular` + `etiqueta` · `enlace` · `QrPapel` | papel | `QrPapel`, del proyecto |
| 13 · cierre | foto-pegatina FT35 con pie de foto («Gracias por acompañarme en este viaje.»); «Toma una estrellita.» en azul display; firma CSR \| MAS y lockup; «Compártelo con quien pueda llevar un regalo.»; el QR pequeño, quieto | `FotoPegatina` · `titular` · imagen · `etiqueta` · `QrPapel` | papel | `FotoPegatina`, del proyecto |

> Las seis piezas nuevas (`CitaPapel`, `PegatinaDeseo`, `Estrellita`, `Corazon`, `FotoPegatina` y `QrPapel`) viven en `remotion/src/proyectos/097/`. Si una segunda pieza de MAS las pide, `CitaPapel` y `Estrellita` son candidatas a subir a `motor/graficos/` con su ficha en `PIEZAS`.

## 7. Encuadre por plano (la «cámara» de un montaje)

No hay cámara virtual: el movimiento es el montaje. Solo tres gestos, lentos:

| Plano | Gesto | Motivo |
|---|---|---|
| P06 HZ17 | el acercamiento que ya trae el plano | da intención al deseo; no se añade nada |
| P17 VT07 | acercamiento 1,00 → 1,06 en 13,2 s, lineal | intimidad sin que se note; que 13 s de plano fijo no se lean como foto |
| P24 VT36 | la panorámica lenta que ya trae el plano | el respiro tras el clímax |
| P29–P30 papel | deriva de la textura ±4 px | nada congelado |

El resto, plano tal cual (`zoom` 1,0). Con los verticales, la franja ya es un encuadre. Para cualquier `pan` sobre un recorte, la puerta comprueba la franja negra (`|pan| ≤ 50·(zoom − 1)`).
