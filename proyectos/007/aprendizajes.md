# Aprendizajes — proyecto 007

La pieza pasó por tres versiones en dos días (deuda→ruta de reclamación→hook
nuevo). Lo que queda para el siguiente:

## Editorial

1. **Un how-to también necesita creencia que mover.** «Cómo reclamar» solo se
   volvió pieza cuando apareció la tesis: *los plazos atan a las dos partes*
   (3 días tuyos, 1 mes de ellos con mora, 2 años de prescripción, defensor
   gratis). Sin eso era una lista.

2. **Los números de artículo van en pantalla, nunca en la voz.** La voz dice
   «la ley da tres días»; la etiqueta dice «art. 1075 del Código de Comercio».
   Es la misma regla de las siglas, aplicada a la cita legal — y deja cada
   afirmación auditable sin sonar a notario.

3. **La escalera de pasos como ley de sonido.** Cinco pasos, cinco clicks
   distintos y motivados (ui→camera→mouse→pen→tick), con `tick` reservado a
   los plazos legales. El oído cuenta los pasos sin leer los kickers — es la
   escalera de riesgo del 006, reutilizada como patrón.

4. **Verificar la prensa contra la norma antes de citarla.** El «30 días para
   reclamar» que circuló en medios era simplificación de una consultora y
   choca con el art. 1075: se cayó. Deep research = fuentes primarias
   (leyes.co / Secretaría del Senado / SFC), no la nota que las resume.

5. **Cuando el canal fija el hook literal, su condición cabe en el kicker.**
   «Si tu inmueble está hipotecado» es alcance (kicker), «así se reclama el
   seguro» es mensaje (display): el hook entero queda en la voz y la pantalla
   no lo repite en bloque. Y el hook fija el TRATAMIENTO: tuteo en toda la
   pieza («Tu póliza»), no mezclar con usted.

## Trampas de herramienta (las nuevas)

- **Audios huérfanos corrompen el cronometraje.** `generar-vo.sh` avisó
  («sobran 2») pero montó igual, emparejando mal audio↔toma: al cambiar ids u
  orden del guion hay que LIMPIAR `vo/partes/` de los archivos de la versión
  anterior antes de re-montar. El aviso de «sobran N» es un stop, no un detalle.
- **El sidecar sí ahorra dinero en reescrituras parciales**: v3 solo re-facturó
  4 líneas de 13 — merece la pena conservar ids y textos idénticos en las
  líneas que no cambian.
- **Los kickers nativos pintan a 44 px** (rol por defecto `apoyo`, no
  `contexto`): por encima de ~24 caracteres parten en dos líneas y R09 no lo
  ve (mide la palabra más larga). O texto corto o `px` explícito (el hook usó
  `px: 34`). Tercera vez que lo cazan los frames de control, nunca el validador.
- **El manifiesto de b-roll se poda por clave de toma** (`assets` es un dict):
  al re-mapear una foto a otra toma, `traer` con el id nuevo + borrar la
  entrada vieja + `gradar`, o los créditos listan material que ya no está.

## Deuda que queda anotada

- **Subtítulos del formato noticias**: `T.subtitulo` sigue sin componente que
  lo consuma; el genérico `SubtitulosSync` (blanco con sombra) rompe el
  registro papel. Si el canal los quiere: componente del motor con color por
  molde y palabra clave en acento — no un apaño por proyecto.
- **`CifraContada` no formatea miles**: 442.514 tuvo que escribirse como
  `valor: 442` + `sufijo: " mil"`. Si algún día una pieza necesita el número
  completo, el componente necesita separadores.
