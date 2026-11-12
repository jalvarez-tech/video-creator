# 074 · Suite Go Living — «Las zonas sociales» — aprendizajes (rev. 0, prueba)

Lo que costó encontrar en esta pieza y que no estaba en `proyectos/070/aprendizajes.md`.

1. **`limites-voz.py --margen 40` corta el final de la frase en las tres tomas** (HK09: 3,85 s y acaba a 4,03; MD09: 4,81 y acaba a 5,48 —se comía «turísticos»—; CT12: 2,51 y acaba a 3,16 —cortaba «Suites»). Las colas son sílabas átonas a −36…−40 dB. Siempre mirar el perfil de energía de la cola (`perfil.py`) hasta que baje de −55 dB antes de fijar `VENTANA_VOZ`.
2. **Un clip puede ser más corto que lo que pide la rejilla.** HK09 dura 132 f y la voz acaba en el f121: solo caben 11 f tras la última palabra, así que el plano del hook tiene que acabar en f130 de su clip y la música sube con curva en 7 f (la 070 tenía 29). La rejilla se busca con esa restricción (`R` del hook = 117-120 f), no al revés.
3. **Si la mitad entra a corte con el clip entero, la disolvencia de salida no cabe** (MD09: 184 f, voz hasta el f164): el siguiente plano entra también a corte. `TIPOS=ddcccccccc` en `buscar-cortes-lp.py` (la 070 usaba `ddcccddccc`).
4. **El DTW adelanta las líneas 5-10 f** («empiezan con», «y cercanía», «destinos»): se llevaron a la sílaba con `onsets-voz.py` y `palabras-desde.py` (re-transcribir desde cada arranque dice qué palabra es la primera).
5. **El alineador rechaza un guion que no casa con lo que oye whisper** (CT12: «esto» → «eso», «Go Living Suites» → «Goblin en Suiz»: 44 % sin pareja, tope 25 %). Se escribió a mano con los tiempos medidos; si se quiere usar la herramienta, hay que poner entre llaves lo que oye whisper.
6. **La canción más fuerte de la biblioteca para esta estructura**: *Some Say* admite 366 rejillas con todos los golpes ≥ 13,1 dB. Su ventana (140,7-175,7 s) es una meseta de −13 a −15 LUFS casi en el nivel final: se baja 0,4-1,7 dB, no hay que subirla.
7. **Si el CTA entra 4,7 s antes de la caída de la canción**, la caída cae bajo la tarjeta del cierre y no bajo la voz: la ventana de voz es una meseta constante y la ganancia bajo la voz (−26 LUFS) se calcula sin distorsión.

## Medido sobre la prueba

Prueba de 540×960, 1094 f, 36,5 s (`medidas/audio-prueba.txt`):

- Pieza entera: **−15,2 LUFS · pico −1,3 dBFS · LRA 1,9 LU**. Voces + música bajo ellas: −14,8 · −14,6 · −14,7 LUFS; música sola: −15,1 · −15,0 · −15,1 (apertura, paseo, bloque 5); cola bajo la tarjeta: −28 LUFS.
- Cortes secos sin voz sobre el audio del render (`golpes-render.py`): f208, f277, f346, f621, f723 y f810 a **≤ 0,4 f** de su golpe (15,5 · 15,3 · 22,7 · 15,1 · 17,5 · 14,4 dB). Los cortes de la mitad (f440) y del CTA (f929) no se miden: en ellos entra la voz.
- El primer render lanzado con `render-prueba.sh` murió con una traza de React (`updateFunctionComponent`) sin mensaje legible porque el script recortaba la salida con `tail -8`; repetido con el log completo (`scratchpad/render-074.log`) terminó sin error y sin cambiar nada: causa sin identificar (probablemente otra pieza escribiendo `remotion/public` o `src` a la vez).
- La prueba NO se ha oído: la voz, la música que baja antes de cada frase (sobre todo la subida de 7 f tras el hook) y la caída de la canción bajo la tarjeta se confirman oyendo.
