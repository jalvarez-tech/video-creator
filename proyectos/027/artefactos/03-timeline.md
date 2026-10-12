# 03 · Timeline — proyecto 027

> Paso 3 de 3. Todo en frames absolutos de la composición, a 30 fps (1077 f = 35,9 s). Los planos son contiguos. Anterior: [02-layout.md](02-layout.md). La fuente de verdad es `remotion/src/proyectos/027/metraje-027.ts`. **Rev. 0** (primera prueba): la rejilla de cortes sale de `herramientas/buscar-cortes.py` sobre los golpes medidos de *Ivory Skyline Reverie* con las ventanas de plano que hay de verdad (descontando los 12 f de clip que pide cada disolvencia): 28 soluciones; se eligió la de entrada más fuerte (168,183 s, 17,1 dB) y el CTA en el golpe de 14,9 dB (192,037 s). Las entradas (corte o disolvencia) y el color de cada plano se fijan al medir los saltos de luma y el color.

## Los planos

Orden físico: **balcón → zona social → alcoba principal**. `desde` en la fuente; `entra`: corte o disolvencia (de 12 f, que acaba en un golpe de la canción). Golpe: dB en la fuente (los del render, R33, se miden en la prueba).

| Plano | Bloque | Espacio · función | Clip · `desde` | `en` | `dur` | Entra | Golpe |
|---|---|---|---|---|---|---|---|
| c02-hook | 2 | Balcón · el hook (Isabella), **abre la pieza** | HK2 · 5 f (0,167 s) | 0 | 150 | corte | — (la música suena desde el f0, baja; su golpe cae en el f150) |
| c03-cocina | 3 | Sala → cocina · la seguimos de espaldas y apoya la mano en la isla (el puente humano) | RC14 · 556 f (18,53 s) | 150 | 122 | disolver | 168,183 s · 17,1 dB |
| c04-estufa | 3 | Cocina · la estufa con su campana y el ventanal | RC06 · 300 f (10,0 s) | 272 | 69 | disolver | 172,241 s · 12,6 dB |
| c05-isla | 3 | Cocina → sala · desde la isla hacia la sala | RC09 · 768 f (25,6 s) | 341 | 50 | disolver | 174,548 s · 13,8 dB |
| c06-corredera | 3 | Sala · la corredera abierta al balcón y la ciudad | RC09 · 912 f (30,4 s) | 391 | 51 | disolver | 176,199 s · 13,4 dB |
| c07-mitad | 4 | Sala · la mitad (Isabella, junto a la corredera) | MD3 · 18 f (0,6 s) | 442 | 158 | disolver | 177,910 s · 14,0 dB |
| c08-alcoba | 5 | Alcoba principal · el mueble blanco (el descanso) | RC07 · 195 f (6,5 s) | 600 | 63 | disolver | 183,165 s · 16,2 dB |
| c09-hacia-bano | 5 | Alcoba principal · hacia su baño | RC09 · 102 f (3,4 s) | 663 | 64 | disolver | 185,293 s · 12,9 dB |
| c10-bano | 5 | Baño principal · cómo se vive | RC02 · 0 f (0,0 s) | 727 | 59 | **corte** (salto de luma −3,9) | 187,422 s · 21,9 dB |
| c11-vista | 5 | Ventanal de esquina · la vista (la más larga) | RC08 · 12 f (0,4 s) | 786 | 80 | disolver | 189,376 s · 12,7 dB |
| c12-cta | 6 | Alcoba principal · el CTA (Isabella, ante el ventanal) | RC14 · 1344 f (44,8 s) | 866 | 151 | disolver | 192,037 s · 14,9 dB |
| c13-cierre | 6 | Tarjeta oscura (logo + web) | `cierre-oscuro.png` | 1017 | 60 | corte | — |

## La voz

| Toma | Voz (s de la fuente) | LUFS (sin tratar → rev. 1) | Ganancia (rev. 1) | Primera palabra | Última palabra |
|---|---|---|---|---|---|
| HK2 (hook) | 0,38 → 4,04 | −18,7 → **−17** (`hk2-alta.wav`) | +2,21 dB + limitador | f6,4 (entra a corte con `desde` 5 f) | f116,2 |
| MD3 (mitad) | 1,09 → 5,38 | −21,6 → **−17** (`md3-alta.wav`) | +5,59 dB + limitador | f456,7 (14,7 f tras el golpe del f442) | f585,4 (14,6 f antes del golpe del f600) |
| CT4 (RC14, CTA) | 45,22 → 49,35 | −22,7 → **−17** (`rc14-alta.wav`) | +6,50 dB + limitador | f878,6 (el soplo; 12,6 f tras el golpe del f866) | f1002,5 (14,5 f de cola) |

## La música (*Ivory Skyline Reverie*, sha 8 `80bf4f33`)

Lounge/downtempo †, sin pulso. **Suena desde el f0** (`INICIO_MUSICA` 4897/30 = 163,233 s; baja bajo el hook, 3 f de entrada) y su golpe de 168,183 s (17,1 dB) suena entero en el f150, donde empieza el paseo. **−11,0 LUFS** en los dos recorridos juntos (−10,4 el paseo, −11,8 el bloque 5) (−10,9 / −13,6 / −16,6 en las ventanas de voz del hook, la mitad y el CTA). **Caída** en LUFS a 194,5 s (f939, a 73 f de la entrada del CTA, con su voz): −12,3 → −22,1 → silencio; la pista acaba a 197,23 s (f1021): la música se apaga sola y la tarjeta queda en silencio. Cada plano entra en un golpe medido (`musica/golpes-027.json`), comprobado sobre el audio del render (`golpes-render.py`, R33).

## Lo que comparte con la V6, la V7, la V8 y la V10 (la puerta, 7b)

| Plano | Comparte | Con |
|---|---|---|
| c02-hook | la toma HK2 entera (clip y voz) | la V6 |
| c07-mitad | la toma MD3 entera (clip y voz) | la V7 |
| c12-cta | RC14 44,4-49,83 s (clip y voz) | la V10 |
| c11-vista | RC08 0,4-3,07 s (≈ 2,7 s opacos) | la V8 (RC08 0,4-4,07 s, su vista) |
| c10-bano | RC02 1,2-1,97 s (≈ 0,8 s) | la V6 (RC02 1,2-4,03 s) |
| c04-estufa | nada opaco (roza la disolvencia de la V8 en RC06 12,1-12,3 s) | — |
| el resto | ni un fotograma | — |
