# 02 · Layout — proyecto 065

> Paso 2 de 3. Dónde vive cada cosa en pantalla. Se escribe con el [01-plan.md](01-plan.md) delante y **sin pensar todavía en frames**.
> Siguiente: [03-timeline.md](03-timeline.md).

## Reparto del espacio (9:16 · 1080×1920)

| Banda | y (px) | Quién la ocupa | Regla |
|---|---|---|---|
| Arriba | 0–240 | **nada** (jamás texto ni sello) | regla fija del canal: la primera toma sale sin texto y arriba no hay nada en ningún momento |
| Centro | 240–1430 | la imagen: el dron o Isabella | los subtítulos nunca le tapan la cara |
| Subtítulos | 1430–1640 (nunca por debajo de 1690) | lo que dice Isabella, en trozos de 1-4 palabras · 90 % de opacidad · cursiva 8 px menor | modo `editorial`; velo de abajo (`VELO_SUBTITULOS`: 780 px, 0,72 → 0,52) porque Luxur no lleva sombra |
| Infografía (la ficha) | 590–1328 (centrada en 960) | ÁREA · PRECIO NEGOCIABLE · DERECHO DE ACUEDUCTO · Escrituras 100 %: columna izquierda (x 100, ancho 880), etiquetas en versalitas doradas, cifras Montserrat 700 (88 px; el héroe 132 px) | dentro de y 570-1350 (el cuadrado 1:1 con 150 px de margen); velo negro 60 % sobre el dron; sin subtítulos a la vez |
| Tarjeta del cierre | y ≈ 795–1085 | el logo (440 px de ancho, 60 % de opacidad) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) | sobre negro liso, sin velo; nada se congela |

## Tomas

- **Planos de dron** (apertura, ficha y bloque 5): a pantalla completa, **mudos**, a velocidad 1, sin zoom (el vuelo ya mueve la cámara). DR04 y DR01, verticales (`rotation=90`).
- **Tomas de Isabella** (hook, invitación, pregunta y CTA): ANAMÓRFICAS (SAR 81:256), a pantalla completa, **escaladas enteras sin recortar**. El hook (parte A) no lleva empuje (ella camina hacia cámara); «ven, te muestro» (parte B, a corte) entra con un empuje del 8 al 14 %; la pregunta y el CTA, un empuje lento del 4 %.
- **Sin `PistaGraficos`**: con subtítulos editoriales los moldes `sello` y `cta` quedan fuera (R14). La versión con ficha (`ficha-luxur`) apaga los subtítulos (`sinSubtitulos`).

## Z-order de la composición (de atrás a delante)

```tsx
<AbsoluteFill style={{ backgroundColor: LOOK_065.negro }}>
  <PistaMetraje cortes={metraje065} look={LOOK_065} />        {/* los planos, mudos, y sus disolvencias */}
  <Infografia065 />                                           {/* LA FICHA sobre el dron (velo + cifras sin animar) */}
  <FundidoACierre />                                          {/* la imagen de Isabella funde a negro, exacto en el último fotograma de su toma */}
  <VeloSubtitulos />                                          {/* solo mientras hay subtítulos de Isabella */}
  <AbsoluteFill style={{ opacity: OPACIDAD_SUBTITULOS }}>
    <SubtitulosEditoriales bloques={subtitulos065} marca={LUXUR} acentoMenos={ACENTO_MENOS_065} />
  </AbsoluteFill>
  <LogoCierre /> <WebCierre />                                {/* sobre la tarjeta oscura */}
  <PistaAudio tramos={audio065} />                            {/* voz de las tomas + música, en la RAÍZ */}
</AbsoluteFill>
```

Nunca `SelloCampana` ni `@propiedadesluxur`. Los números del cierre viven en `cierre-065.ts`.
