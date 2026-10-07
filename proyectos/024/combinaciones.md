# 024 · One Living (Envigado) — qué se eligió y cómo cambiarlo

> V8 del registro de reels, tercera de One Living. Los planos están en `remotion/src/proyectos/024/metraje-024.ts`; la puerta, en `proyectos/024/revisar-024.mjs`.

## Lo elegido

| Pieza | Elección |
|---|---|
| Hook | **HK1** «76 metros pueden sentirse muy diferentes cuando están bien distribuidos.» (SALA; abre la pieza, excepción declarada). La ÚNICA cifra de la pieza |
| Mitad | **MD2** «Aquí el balcón se convierte en una extensión de la zona social.» (BALCON: ella en el balcón y la cámara en la sala, el contraplano de HK1) |
| CTA | **CT1 recortada a su 2.ª frase** «Si quieres más información, contáctame.» (ALCOBA-PPAL; la V6 usó la toma entera) |
| Canción | **Emilio Piano ft. Lucie – Maison** (piano neoclásico †): suena desde el f0 (se usa desde 137,97 s); su golpe de 142,95 s abre el paseo a los 5,0 s; cae a silencio desde 168,5 s bajo el CTA. Sin pulso: cortes en golpes medidos |
| Recorrido 1 | RC09 (la isla y la estufa) · RC06 (de la cocina a la sala) · RC09 (la sala hacia la corredera) · RC01 (el balcón) |
| Recorrido 2 | RC09 (el pasillo hacia el baño) · RC09 (el vestier) · RC10 (la alcoba principal) · RC08 (la vista, la más larga) |
| Duración | 1019 f · 34,0 s |

Decisiones del usuario (2026-10-06): CTA = CT1 recortada y canción = *Maison* (entre *Maison*, *desolate* y *Heaven on Earth*, con extractos de audio). OK previos del mismo día: la cifra 76 (HK1), Luxur agenda visitas (CT2, que no se usa) y el reglamento permite la renta corta (HK3, V7).

## El final (2026-10-06, orden «renderiza»)

`proyectos/024/finales/024-recorrido.mp4` (CRF 16 `slow`, 1080×1920, 1019 f · 34,0 s, 52 MB, −16,3 LUFS en toda la pieza) y `024.srt` (13 cues). Etiquetas de color arregladas sin pérdida (bt709/bt709/bt709, átomo `colr`), color medido contra stills a escala 1 (`finales/medir-final.txt`: 0 fotogramas fuera de tolerancia). **Exportada con TRES palabras sin oír** (cerradas por medida; la nota «POR CONFIRMAR AL OÍDO» sigue en `subtitulos-024.ts` y `--final` falla solo por ella): «pueden» (HK1, f44 ≈ 1,5 s), «balcón» (MD2, f432-458 ≈ 14,4 s) y la última sílaba de «contáctame» (CT1, f924 ≈ 30,8 s). Para cambiar una: el texto del trozo en `subtitulos-024.ts`, `voz/<toma>.txt`, el `dice` del plano en `metraje-024.ts`, el `.srt` y volver a renderizar (≈ 6 min).

## Cómo cambiarlo

- **Otro CTA.** (a) *CT2 entera* (V7; «si te gusta esta vista, contáctanos y agendemos una visita»): sería BALCON dos veces (MD2 y CT2) y V7 y V8 acabarían idénticas; copia `voz/ct2.*` de `proyectos/023`, cambia `c12-cta` (`desde` 12 f, entra con disolvencia, 133 f) y su subtítulo. (b) *CT1 entera* («Estamos en la Loma del Escobero, en Envigado. Si quieres más información, contáctame.»): `desde` 0,50 s y `dur` 175 − 15 f, `voz.s0` 0,66, y dos bloques más de subtítulos; «Escobero» sigue sin cerrar al oído.
- **Otra mitad / otro hook:** no quedan libres (MD1 y MD3, HK2 y HK3 están usados; HK4 promete valorización). Repetirlos sería una decisión (declarada) de la V9.
- **Otra canción:** *desolate (Slowed)* es el plan B (418-2.533 soluciones de rejilla; ánimo más triste) y *Heaven on Earth* el C (puede sonar «playera»). Cambia `GOLPE`, `INICIO_MUSICA`, `DECAE` y `normalizar.mjs`; todos los `en` salen de `golpe(...)`. `rejilla-cortes.py` (con la mitad de MD2: par de golpes a 131-154 f) y `curva.py` para elegirla; la tabla de lo medido está en `analisis-uso.md` §C.
- **Quitar la entrada a corte del CTA:** no se puede con CT1: 0,38 s de aire (11,6 f) no dan los 12 f de clip anteriores a la primera palabra que pide una disolvencia.

## Lo que comparte con la V6 y la V7

El CLIP de CT1 (la toma de la V6 de la que aquí solo suena la 2.ª frase: 2,5 s de imagen opaca solapada, declarado). **Ni un segundo de recorrido** (la puerta, sección 7b, lo mide).
