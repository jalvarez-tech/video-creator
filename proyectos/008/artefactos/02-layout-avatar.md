# 02 · Layout — proyecto 008 · pieza AVATAR

## Z-order (director §3b, de atrás a delante)

```tsx
<AbsoluteFill bg=black>
  <CamaraVirtual cues={camara008a}>            // SOLO el avatar se reencuadra
    <OffthreadVideo avatar-008.mp4 cover />    // con su propio audio (no hay tomas que lo desmonten → sin R10)
  </CamaraVirtual>
  <PistaGraficos plan={graficos008a}           // overlay FIJO — banda inferior
                 montadores={MONTADORES_BASE}
                 scrimColor={CHOCO.tinta} />    // scrim carbón cálido #161310, no negro neutro
  <SelloCampana />                             // watermark propio de la pieza, franja alta
  <PistaSonido cues={cues008a} duckDb={-4.5} />
</AbsoluteFill>
```

## Mapa vertical (1080×1920)

| Zona | px | Qué vive ahí |
|---|---|---|
| 0–180 | franja alta | **watermark** «AYUDEMOS A CHOCÓ» (píldora oscura propia, top 84, centrada) |
| ~350–1050 | centro | LA CARA — nada la toca |
| 1340→ (ancla 69.8 %) | banda inferior | **todas las tarjetas** (moldes `sello`/`cta`, altoMax 500 → borde inferior ≤1840) |
| 1090–1920 | scrim | degradado carbón desde abajo (830/880 px): el contraste lo pone el scrim, no el clip (R13) |

Por qué no hay nada en `franja` (la banda R08 de arriba): el techo del clip es
blanco y el molde `franja` no lleva scrim → texto blanco invisible, texto ámbar
a ~2.4:1. El watermark sí puede porque trae su propia píldora oscura.

## El watermark de campaña (§5b director)

`CHOCO.sello.texto` = «AYUDEMOS A CHOCÓ». El `Sello` del formato noticias vive
en la banda inferior — aquí esa banda es de las tarjetas, así que la pieza trae
su `SelloCampana` propio ARRIBA (mismo lenguaje: píldora borde blanco 0.55 /
fondo negro 0.35, punto ámbar). Fijo todo el vídeo, fuera de la cámara
(un sello que respira delata el zoom).

## Cámara: reposo bajo tarjetas

Ventanas CON tarjeta (la cámara quieta): 63–165 · 171–302 · 308–470 · 477–633 ·
806–955 · 1018–1170 · 1200–1314. Los 4 movimientos van en los huecos:
[0–22] hook · [660–720] súplica · [770–800] alejar · [975–1000] CTA.
Escala de reposo entre movimientos: la que dejó el último cue (1.08 → 1.18 →
1.06 → 1.12). x/y = 0 siempre: la cara ya está centrada y `cover` a 30 fps de
iPhone no da margen que valga la pena (R09: desplazar sin zoom saca la cara).

## Anchos medidos (contra `anchoMax` 844 del molde)

| Texto más ancho | px cuerpo | estimación | ¿cabe? |
|---|---|---|---|
| «Santa Lucía · Calle 47B # 89-24» (lista, peso mixto) | 42 | ~720 | ✓ |
| «Street Cats · Cra 48 # 132A sur-24» | 42 | ~760 | ✓ |
| chip «EL CAMIÓN SALE A FIN DE MES» (+44 padding) | 34 | ~700 | ✓ |
| titular «Granito a granito» | 86 | ~760 | ✓ |

(estimaciones de tabla de avances; la verdad la dicen los stills R05 — si una
línea roza el margen, se baja `px`, no se ensancha el molde)
