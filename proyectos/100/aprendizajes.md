# 100 · «Lo harás otra vez» — aprendizajes

- **Una canción masterizada fuerte no se baja con una ganancia fija.** «Lo harás otra vez» va a −10,4 LUFS en el pleno y a
  −26,6 en la ruptura (16 dB de arco). Con una sola ganancia, o el pleno tapa a las niñas o la ruptura desaparece. Aquí la
  envolvente es el producto de tres capas (la PARTE de la canción, las VOCES y el FINAL): la parte se iguala a medias
  (sola ≈ −27 · −22,5 · −21 · −22 · −24,5 LUFS) para que el arco se oiga sin tapar a nadie. Las rampas de parte van DENTRO
  del golpe que abre cada parte, donde el cambio de nivel no se oye.
- **El compás manda el reparto.** A 87 BPM el compás cae cada 83,6 f; casi todos los cortes del pleno van a compás o a
  medio compás, y donde el compás no tiene golpe medido ≥ 9 dB (f957) se corta en el pulso de antes, que sí lo tiene (f936).
- **`volumenDe(t, f)` recibe el frame LOCAL del tramo** (0 = su primer frame), aunque la envolvente vaya en frames
  absolutos. La puerta lo comprobaba con el absoluto y daba 222 falsos errores en los trozos 2-4 de la música.
- **Los clips de deseos son cortos (3,0-3,8 s):** la subida (251 f) solo da para los tres y un segundo de HZ28; no hay
  margen para alargar ninguno sin pasar del final del clip (la puerta genérica lo para).
