# 023 · One Living (Envigado) — qué se eligió y cómo cambiarlo

> V7 del registro de reels, segunda de One Living. Los planos están en `remotion/src/proyectos/023/metraje-023.ts`; la puerta, en `proyectos/023/revisar-023.mjs`.

## Lo elegido

| Pieza | Elección |
|---|---|
| Hook | **HK3** «Si quieres un apartamento para vivir o considerar para renta corta, mira esto.» (SALA; abre la pieza, excepción declarada) |
| Mitad | **MD3** «Cuenta con dos habitaciones independientes, balcón y ubicación junto a City Plaza.» (SALA) |
| CTA | **CT2** «Si te gusta esta vista, contáctanos y agendemos una visita.» (BALCON) |
| Canción | **Yeshua (Versión Piano)**: suena desde el f0 (se usa desde 419,37 s); su golpe de 424,837 s abre el paseo; caída final en 452,9 s bajo el CTA. Sin pulso: cortes en golpes medidos |
| Recorrido 1 | RC15 (ventanal) · RC11 (puertas baño y vestier) · RC15 (vestier) · RC04 (baño) |
| Recorrido 2 | RC08 (alcoba principal) · RC09 (cocina) · RC14 (balcón y cielo) · RC12 (la vista) |
| Duración | 1189 f · 39,6 s |

OK del usuario (2026-10-06): HK3 (el reglamento permite la renta corta), CT2 (Luxur agenda visitas), la cifra 76 (HK1, que no se usa) y SALA · SALA · BALCON.

## Cómo cambiarlo

- **Otro hook** (HK1 «76 metros…» con la cifra): copia `voz/hk3.*`, genera su transcripción con `transcribir.mjs --palabras`, cambia `src`/`audio`/`voz` de `c02-hook` y sus subtítulos. HK1 dura 5,30 s (159 f) y entra su voz a 0,36 s: no cabe la entrada a corte con la curva de la música (la primera palabra suena a 10,8 f del golpe, justo): el plan de cortes cambia.
- **Otra mitad** (MD2): mismo rincón que el hook; cambiaría `c07-mitad` y los golpes del par 546 → 709 (163 f).
- **Otra canción:** la canción ya cambió dos veces (Deep Breath → La Isla Bonita → Yeshua). Cambia `GOLPE`, `INICIO_MUSICA`, `DECAE` y `normalizar.mjs`; todos los `en` salen de `golpe(...)`. `buscar-entrada.py --cta 33 40` y `curva.py` para elegirla.
- **Quitar la repetición de la vista:** RC12 (c12-vista) comparte 3,1 s con el cierre de la V6; el plano alternativo (RC14, 2,7 s limpios) no puede ser el más largo del bloque.

## Lo que comparte con la V6

Solo la vista (RC12, 8,2-11,3 s: 3,1 s) y RC15 en otro tramo. Ver `artefactos/01-plan.md`.
