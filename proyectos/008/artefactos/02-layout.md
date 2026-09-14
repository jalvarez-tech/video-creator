# 02 · Layout — proyecto 008

> Formato editorial sin avatar: el reparto del espacio lo dan los DOS moldes del
> dialecto (`papel` / `cine`), no las bandas de talking-head. Referencia viva:
> proyecto 007.

## Los dos registros

| Molde | Fondo | Tinta | Qué lleva aquí |
|---|---|---|---|
| `papel` | papel cálido de la marca (viñeta propia de `FondoPapel`) | carbón | titulares editoriales, tarjetas de datos (sedes/cuenta), fotos IA y la foto del cliente **enmarcadas** |
| `cine` | negro / metraje del banco **a sangre** | blanco | el mundo real: grieta, manos, camión, carretera + `velo` SIEMPRE entre metraje y texto |

- Bloques centrados, caja útil 844 px (margen 118). `altoMax` 1080 (papel) / 900 (cine).
- Metraje a sangre y `velo` entran con `{ como: "ninguna" }` (regla `veloProtege`).
- Fotos enmarcadas: hueco real 662×853 (R16) — las stills IA se piden ≥1080 de lado corto.
- Kickers: techo ~24 caracteres a 44 px; los largos llevan `px: 34` (aprendizaje 007).
- Sello de marca en todos los frames: píldora «AYUDEMOS A CHOCÓ» (SelloNoticia + marca campaña).

## Z-order de la composición (Noticia008.tsx)

```tsx
<AbsoluteFill>
  <PistaGraficos plan={noticia008} montadores={MONTADORES_NOTICIA}
    fondos={fondosNoticiaDe(CHOCO)} scrimColor={CHOCO.color.negro}
    encima={(t) => <SelloNoticia molde={t.molde} marca={CHOCO} />} />
  <Audio src={staticFile("noticias/008-vo.wav")} />          {/* la voz manda */}
  <Audio src={staticFile("noticias/008-musica.mp3")} volume={…} /> {/* cama musical, envolvente manual */}
  <PistaSonido cues={cues008} duckDb={-5} />
</AbsoluteFill>
```

## Grado por sección (desaturado → cálido)

| Sección | grado del metraje | intención |
|---|---|---|
| gancho + contexto (g01–c06) | `saturacion 0.72 · exposicion 0.94` | el mundo apagado tras el sismo |
| decisión (d01–sil2b) | `saturacion 0.85` | transición |
| solidaridad (n01→f07) | `saturacion 0.95 · calido +0.03` | la ayuda trae el color de vuelta |
| cierre (sil6→sil9b) | papel cálido + foto del cliente | esperanza |

## Música (cama, no protagonista)

- 0–22 s: piano solo, casi nada (−26 dB bajo la voz).
- 22–52 s: entra el colchón de cuerdas (−24 dB).
- 52–65 s y silencios de tarjetas: sube suave (−18 dB) — no hay voz.
- Cierre (últimos 16 s): la música respira al frente (−14 dB) y muere en la frase final.
