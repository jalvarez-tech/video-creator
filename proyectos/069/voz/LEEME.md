# Voces en off del 069 — qué grabar y cómo nombrarlo

Cada frase va en **su propio archivo**, con el nombre de la tabla (`.wav`, `.mp3` o `.m4a`), en esta carpeta. Después:

```bash
node proyectos/069/normalizar.mjs --voz
node proyectos/069/revisar-069.mjs
```

La primera línea las pasa a WAV, las lleva a −15 LUFS con limitador y mide cuánto dura cada una; la segunda dice si **cabe** en su hueco.

| Archivo | Quién | Texto | Hueco (duración que cabe) | Escena |
|---|---|---|---|---|
| `john-1` | John | «En este lugar vivimos uno de los momentos más felices de nuestra vida… Y hoy, verlo así, nos parte el corazón.» | 6,7 s (ver nota) | 1 · De la felicidad al dolor |
| `isabella-1` | Isabella | «Hoy, nuestro amigo Nelson está viviendo uno de los momentos más difíciles de su vida.» | 7,5 s | 3 · El lugar |
| `john-2` | John | «Pero hay algo que el fuego jamás podrá destruir: el amor que nació aquí, las familias que unió y los recuerdos que llevamos en el corazón.» | 11,5 s | 3 |
| `john-3` | John | «Hoy queremos unir nuestros corazones para ayudar a Nelson a reconstruir este sueño.» | 5,7 s | 5 · El mensaje final |
| `isabella-2` | Isabella | «Porque Botswana merece seguir siendo el lugar donde muchas familias comiencen su historia.» | 6,1 s | 5 |

## Para que suene bien

- **Un solo archivo por frase**, sin ruido de fondo y con medio segundo de silencio al principio y al final (el sistema lo recorta con fundidos).
- La voz de los dos videos de ustedes (los MOV) se grabó a unos metros del teléfono y suena baja; las locuciones, grabadas de cerca, quedan al mismo nivel (−15 LUFS) sin tocar nada.
- **El tono sube y baja con el montaje**: la frase 1 abre con alegría y cambia en «Y hoy…» (ahí cae el corte al incendio, hacia el segundo 3,6: un golpe del piano; «Y hoy» suena ya sobre el fuego); las demás van más pausadas.
- Los tiempos de la columna «cabe» son una **estimación** (≈ 14-15 caracteres por segundo). Si una locución sale más larga, no se acelera la voz: se mueve el corte de imagen que la acompaña.
- «Botswana» está escrito con *t*, como el letrero del lugar (el guion decía «Boswana» en tres sitios). Si lo prefieren distinto, se dice y se cambia en los textos.
- **`john-1` es la más justa**: ellos pidieron acortar el hook y la escena 1 dura 7,1 s (hueco de 6,7 s); la frase entera, a ritmo natural, son ≈ 7,5 s. Hay que leerla más ágil o recortarla (por ejemplo «En este lugar fuimos muy felices… Y hoy, verlo así, nos parte el corazón.»); si no cabe, la puerta lo dice con la locución entregada.
