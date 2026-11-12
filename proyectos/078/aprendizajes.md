# 078 · Suite Go Living — aprendizajes (rev. 0, prueba)

Lo que costó encontrar al montar el tercer reel del lote 076-078 (los anteriores: `proyectos/070/aprendizajes.md`).

1. **Tres piezas a la vez en un mismo checkout: `estudio.tsx` carga TODAS las composiciones.** Una hermana a medias tumba el bundle de las demás. Se renombra `composiciones.tsx` a `composiciones-078.tsx` mientras se monta y se renderiza con `src/proyectos/078/entrada-solo.tsx` (`ENTRADA=… stills-multiples.mjs`, `render-prueba-solo.sh`); al acabar se devolvió el nombre (`composiciones.tsx`) para que el estudio y `render-final.sh` la vean; `entrada-solo.tsx` sigue sirviendo.
2. **El material de la suite se agota:** el clip de la vista (RC07) lo usan seis piezas, y los recorridos libres de RC no pasan de 1-2 s por clip. Antes de elegir un plano, `node scratchpad/libres.mjs` (carga todos los `metraje-NNN.ts` y lista los tramos usados por clip) o la sección 7b de la puerta con `VERSIONES_ANTERIORES` rellena.
3. **Una canción plana (−11 LUFS, picos de +2,7 dBFS) sale con pocas rejillas:** con cortes secos ≥ 7,4 dB había 34 soluciones y todas con algún corte de 7,5-7,8 dB; hubo que abrir `W` (el CTA puede entrar hasta 12 s antes de los 192 s) y subir el mínimo a 9 dB para tener 8. Con la meseta tan alta, el bloque 5 se baja a −16,2 LUFS para que su pico quede a −1,2 dBFS.
4. **El hook HK07 solo deja 19 f tras su última palabra** (el clip dura 3,54 s y la voz acaba en el 2,86): la música sube en 11 f (retraso de 3 f) en vez de los 15 habituales.
5. **Whisper en cortes sueltos devuelve el final de la palabra anterior o texto inventado** (`palabras-desde.py`): sirve para saber de qué lado cae una palabra; «solo de» / «solo hay que» sigue sin cerrarse.
