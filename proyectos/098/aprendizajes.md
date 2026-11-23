# 098 · aprendizajes

- **Elegir el tramo de una pieza de piano sin pulso.** `rejilla.py` no encuentra recta (rubato): los cortes van a los
  arranques de frase medidos (≥ 6 dB en 15 ms). El tramo de 1 minuto se eligió buscando dos RESPIROS de la pieza (la
  sonoridad a 100 ms cae a −33/−34 dBFS): 26,55 s y 86,35 s. Empezar y acabar donde la pieza respira deja el fundido
  final casi sin trabajo.
- **La puerta de audio no deja subir una toma más de +6 dB.** Las respuestas de las niñas llegan a −29/−30 LUFS: a −18
  (el objetivo del 097) pedían +12 dB y la puerta (`revisar-audio.mjs`) no pasaba (el 097 tampoco la pasa: 6 avisos).
  Bajar el objetivo de TODAS las voces a −23 LUFS las deja parejas (≤ 1,3 dB) dentro de +6 dB, y la sonoridad de entrega
  la pone el masterizado (−14 LUFS), que sube todo por igual.
- **Las franjas 16:9 de los mapas no siempre valen para lo que pide el plano.** FT43: la franja del mapa (20-62 %)
  cortaba la mano que señala el cielo, que es el gesto; se subió a 2-44 %. Mirar la foto recortada antes de montarla.
- **Un bundle por proceso.** `render-prueba.mjs` y `exportar-final.mjs` empaquetan UNA vez y borran SU bundle al acabar;
  con tres sesiones renderizando en el mismo Mac no se pueden borrar los bundles ajenos del tmp.
