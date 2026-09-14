# 011 · Layout — dónde vive cada cosa en 1080×1920

## El reparto vertical: metraje a pantalla completa y dos momentos de texto

```
   0 ┌──────────────────────────────────┐
  96 │           Y ahora…               │   62 px · Didot itálica     ┐ SOLO f2281–2436
 170 │         ¡LA FIESTA!              │   96 px · Didot negrita     ┘ (RotuloFiesta011)
 460 │   ░░ velo degradado desde arriba │   0,55 → 0 en el 24 % superior
     │                                  │
     │             METRAJE              │   <PistaMetraje> · pantalla completa
     │           (33 planos)            │   punch-in 1,00–1,12 · viñeta 0,20
     │                                  │
 845 │          B  O  D  A              │   40 px · Didot · tracking 0,46→0,56 em
 ~   │       María & Daniel             │   112 px · Didot itálica · ≈760 px de ancho
     │   ░░ elipse oscura 40 % ░░       │   velo propio del título (62 % × 15 %)
     │                                  │   ← SOLO f0–150, sobre el lago de `c01`
     │                                  │
     │   sin sello · sin subtítulos     │
     │   sin velos de franja            │
1920 └──────────────────────────────────┘
```

El bloque del título se centra en el **44 %** del alto (≈845 px). Es la zona
media: el plano de apertura no tiene personas, así que no hay cara que
proteger (R08), y en un Reel la franja media es la que no tapa ninguna UI.

**Zona segura (motion-graphics §8, 11 % por lado → 842 px útiles).** «María &
Daniel» a 112 px mide ≈760 px: cabe con margen y **en una línea**
(`whiteSpace: nowrap`). R18 se comprobó en el frame (f0, f60, f125): sin cortes
ni viudas.

**El rótulo del relevo va ARRIBA y no centrado como el título**, porque su plano
(`r06`, el pastel) no deja otro sitio: caras en el 16–36 % del alto, pastel y
velas en el 64–87 %, y en medio el vestido blanco, donde un texto blanco
desaparece. La franja superior es pared de madera: contraste alto sin tapar nada.

## Por qué no hay más capas

- **No hay sello** porque una boda no es un canal (director §5b). Un watermark
  de Luxur, Chocó o Street Cats sobre la boda de una familia sería absurdo, y
  `MARCA_BASE` no pinta nada por diseño.
- **No hay subtítulos** porque no hay voz, y los únicos textos son los dos que
  pidió el cliente (el título y el rótulo del relevo). La fecha no se añadió.
- **No hay velos de franja** porque en el 009 y el 010 solo existían para que se
  leyera el texto de abajo o de arriba. El título lleva su propia elipse, que se
  va con él: un degradado fijo apagaría el cielo y el vestido blanco durante dos
  minutos para proteger cinco segundos de texto.

## Z-order de la composición

```tsx
<AbsoluteFill style={{ backgroundColor: "#000" }}>
  <PistaMetraje cortes={metraje011} look={LOOK_011} />     {/* 1 · los 33 planos */}
  <Titulo011 />                                             {/* 2 · f0–150 */}
  <RotuloFiesta011 />                                       {/* 2b · f2281–2436 */}
  <Sequence durationInFrames={RELEVO}>                      {/* 3 · Turning Page 0:00–1:18 */}
    <Audio src="boda-011/011-boda-turning-page.wav" />
  </Sequence>
  <Sequence from={RELEVO} durationInFrames={3600 - RELEVO}> {/* 4 · El Preso 1:18–2:00 */}
    <Audio src="boda-011/011-rumba-el-preso.wav" />
  </Sequence>
</AbsoluteFill>
```

Dentro de cada plano (de atrás adelante): el medio con su punch-in y su
exposición → velo cálido (soft-light, 0,05) → grano (0,025) → viñeta (0,20)
→ negro de entrada o de salida, si lo hay.

## Encuadre

**Todo es 9:16 nativo** después de quemar la rotación, así que `objectFit:
cover` no recorta nada en los vídeos. Las dos excepciones:

- `anillos.jpg` es 3:4 → `cover` recorta los lados (queda el 75 % central). Los
  anillos están en el 52 % horizontal: caben enteros.
- `IMG_2270.jpg` es 9:16 → sin recorte.

**Punch-in: techo 1,12.** Los clips se normalizaron a 1296 px (1080 × 1,2); a
1,12 el navegador todavía reduce. Lo verifica `revisar-011.mjs`.

**`pan` y su límite.** `translateY(-pan%)` desplaza el plano ya escalado, así
que el máximo sin enseñar el borde es `(escala mínima − 1) / 2 × 100`. Solo lo
usa `r11` (`pan: 3` con escala mínima 1,06 → límite 3): el still del f3200 era
medio plano de pared y las caras quedaban abajo.

**Zoom según lo que ya se mueve.** Los planos quietos de la boda empujan 4–10 %
en 2-8 s (el beso, 8 %; la foto de los anillos, 10 %). Los de pista, que ya
tiemblan solos, se quedan en 3 %: un zoom encima de un temblor lo multiplica.
