# 071 · Suite Go Living — aprendizajes (rev. 0, prueba)

Lo que costó encontrar en la 071 y que se suma a `proyectos/070/aprendizajes.md`.

1. **El FINAL DEL CLIP puede mandar sobre toda la rejilla.** HK08 acaba 6,2 f después de su última palabra: el plano del hook no puede durar más de 121 f y el golpe del paseo cae a 6 f de la voz, con 4 f para que la música suba (la puerta pedía 8: excepción declarada en 4b). Antes de buscar rejilla, mide `clip − última palabra` de cada toma: ahí está el rango de su plano (`R` de `buscar-cortes-lp.py`).
2. **`limites-voz.py` volvió a quedarse corto**: dio 4,18 s para el hook y la cola débil de «trabajo» (−31 a −37 dB) llega a 4,26. Mirar siempre `perfil.py` de la cola.
3. **Una disolvencia entre una toma y el plano siguiente se come los 12 f finales de la toma**: con la última palabra de MD06 en el f580 y la disolvencia empezando en el f580, la puerta falló. Si la toma deja ≤ 14 f de cola, el plano siguiente entra A CORTE en el golpe.
4. **Heaven on Earth**: meseta uniforme de −13 LUFS (picos −2,4 a −3,6 dBFS: se baja ≈ 1,5 dB) con un remanso de 187,3 a 192,0 s (8-10 dB menos). Solo la entrada de 178,043 s dio rejilla con estas voces; las demás entradas o duraciones no. El nivel del paseo se toma de su meseta (−13,7), no de su media (−15,6), para que el remanso suene como es y la vuelta no sature.
5. **La vista de una suite de un solo cuarto se agota**: solo hay RC07 (3,6 s, ya de la 070), RC13 (2,5 s útiles) y RC10 (2,3 s). Se hizo con DOS ventanas distintas seguidas (RC10 → RC13) y la rejilla se acortó (b5: 60 · 65 · 73 f).
6. **El validador de subtítulos da «plan limpio» aunque encoja un acento** (al 85-89 % de su tamaño): «operadores turísticos» y «opciones de inversión.» salían más pequeños que los demás acentos. Se partieron (acento en la palabra y el resto en base).
7. **El DTW de whisper vuelve a errar en las dos direcciones**: «otro trabajo.» lo puso en «trabajo» (15 f tarde) y «no debería» y «listos para ti» 6 f pronto. `onsets-voz.py` (arranque de sílaba tras cada pausa) y `palabras-desde.py` lo corrigen.
8. **zsh**: `set -- $spec` no separa y `echo =====` falla (otra vez): un `.sh` con `bash`.
9. **El turno de render** (`proyectos/070/herramientas/render-prueba.sh`) funciona: espera con `mkdir` atómico y libera la carpeta al acabar; con otras piezas en cola la espera fue de varios minutos.

## Medido sobre la prueba (540×960, 950 f, 31,7 s)

- Pieza entera: **−15,6 LUFS · pico real −3,9 dBFS** (el paseo mide −17,1 por el remanso de la canción). Voz + música bajo ella: −14,7 · −14,7 · −14,5 LUFS en las tres ventanas; música sola: −15,0 (apertura) y −15,1 (bloque 5); cola bajo la tarjeta: −32 LUFS.
- Cortes secos sobre el audio del render (`golpes-render.py`): f207 · f276 · f369 · f592 · f652 · f717 a **≤ 0,4 f** de su golpe (11,2 · 11,1 · 16,1 · 11,1 · 13,7 · 10,9 dB). Los de la mitad (f457) y el CTA (f790) no se miden: entra la voz.
- Luma de los stills 90-137 antes del ajuste; se bajó la exposición de RC09 (−0,06), RC05 (−0,10) y RC10 (−0,08). 0 % quemado.
- La prueba NO se ha oído: la voz, la música que baja antes de cada frase, la subida rápida tras el hook (4 f) y la caída de la canción bajo el CTA se confirman oyendo.
