# 070 · Suite Go Living — aprendizajes (rev. 0, prueba)

Lo que costó encontrar y que las otras cinco piezas (071-075) heredan.

1. **La carpeta del encargo no era la del material.** El usuario dio `Apartamento - Los Patios - El Poblado/Videos` (el apto 501, obra gris) y la suite está en `Suite Go Living/Videos/` (con `6 Zonas Sociales`). Se detectó porque la carpeta correcta tenía fecha de hoy y el anuncio describía otra propiedad. Antes de catalogar, `find` por «suite / social / zona» en la raíz de Propiedades Luxur.
2. **«3 Dron» no era dron.** Son planos del exterior con el iPhone desde el suelo, mirando hacia arriba. Valen como apertura sin texto, pero no hay vistas aéreas.
3. **Todo el rodaje es HLG con rotación −90** (iPhone 4K). Las piezas 054-062 eran SDR y no habían ejercitado la rama HDR de `normalizar.mjs`: funciona con VideoToolbox (`scale_vt` + `transpose_vt`), sale vertical y con color de verdad (medido: luma 99-139, 0 % quemado).
4. **Whisper pone la primera palabra en 0,00 s; la energía dice otra cosa** (1,17 · 0,65 · 0,50 s). Sin medirla, ninguna toma habría tenido su aire antes de la voz.
5. **`limites-voz.py --margen 40` cortó 0,3 s antes la mitad** (dio 4,49 s y el «-mente» de «turísticamente» llega a 4,78 s): hay que mirar el perfil de energía de la cola (`perfil.py`) antes de fijar la ventana de la voz tratada.
6. **El DTW de whisper adelanta las líneas de 3 a 11 f** en esta voz («para operar», «activa.», «Go Living»): se llevaron a la sílaba con `onsets-voz.py` y `palabras-desde.py`.
7. **Una canción se elige también por la FORMA de su ventana, no solo por sus golpes.** *Flying Into the Sun* daba 40.860 rejillas pero su ventana arrancaba a −10 LUFS y caía a −23 a los 1,3 s: igualar la meseta a −15 habría saturado el arranque. *Somewhere inside of me* es una meseta uniforme y alta (−9,5 a −10,4 LUFS, picos de +0,2 dBFS): hay que BAJARLA 5 dB, no subirla.
8. **Un clip puede no dar para una disolvencia ni para el fundido de la música.** MD02 dura 166 f y el plano pide 166: entra ENTERO y a corte, y la música sube en 20 f en vez de los 22-24 habituales.
9. **La puerta de la pieza anterior se copia pero hay que leerla entera**: 2a (lugares), 2e (CTA), 2f (ángulo), la tabla `DE` de golpes y `VERSIONES_ANTERIORES` son de la propiedad. El resto (estructura, reglas fijas, cierre, color, voz, subtítulos) vale tal cual y pasó a la primera.
10. **zsh no separa `set -- $t`** ni admite `echo =====`: para bucles con varios argumentos, un script con `bash`.

## Medido sobre la prueba (540×960, 1164 f, 38,8 s)

- Pieza entera: **−15,1 LUFS · pico real −3,4 dBFS**. Voz + música bajo ella: −14,7 LUFS en las tres ventanas; música sola: −15,1 (apertura, paseo, bloque 5); tarjeta: −37 LUFS (la cola de la canción).
- Cortes secos sobre el audio del render (`golpes-render.py`): f217, f324, f409, f770 y f859 a **≤ 0,4 f** de su golpe (12,6 · 16,9 · 15,4 · 10,1 · 13,6 dB). Los cortes de la mitad (f515) y del CTA (f966) no se miden: en ellos entra la voz.
- La prueba NO se ha oído: la voz, la música que baja antes de cada frase y la caída de la canción bajo el CTA se confirman oyendo.
