# 01 · Plan de noticia — proyecto 006

> Guía: [SKILL.md](../../../manuales/video-noticias/SKILL.md) · tomas: [recetario-tomas.md](../../../manuales/video-noticias/recetario-tomas.md).

## Cabecera

| | |
|---|---|
| Noticia / fuente principal | «¿Qué hacer si encuentra grietas en su vivienda luego de un temblor?» · El Colombiano (Antioquia) · Brian Ferney Valencia Ríos · 2026-08-10 · [URL](https://www.elcolombiano.com/antioquia/que-hacer-si-se-encuentra-una-grieta-despues-de-un-terremoto-KE39790497) |
| Hecho que la origina | Sismo de **magnitud 7,4** en el centro y occidente de Colombia, 2026-08-10. **Más de 100 personas fallecidas** (cifra del artículo el día del hecho). |
| Voz en off | **PENDIENTE.** Duración de la comp ESTIMADA, no medida. |
| Composición | 1080×1920 · **30 fps** · **1740 f (58 s) — PROVISIONAL** |
| Formato | 9:16 vertical · sin avatar |
| Marca (`MARCA.sello`) | `PROPIEDADES LUXUR` |
| Destino | Shorts · Reels · TikTok |
| ¿Hay parte 2? | no → el cierre es la ruta oficial, no un CTA de marca |

---

## Decisión editorial: esta pieza NO usa el formato completo

El formato de noticias abre con un **gancho que contradice lo que el espectador
cree** y sube a un **clímax** de tensión. Aquí las dos cosas están mal, y no por
gusto:

- El hecho tiene **muertos de hoy**. Optimizar los tres primeros segundos para la
  retención, con una afirmación que descoloque, es usar un desastre como reclamo.
- El clímax del formato sube la tensión antes del cierre. En una pieza de
  seguridad, lo que toca antes del cierre es **bajarla**: decir lo que el vídeo
  NO puede hacer.

Lo que se conserva del formato es la estructura de tomas y el registro visual.
Lo que cambia es la intención de dos beats:

| beat | en el formato | aquí |
|---|---|---|
| `gancho` | contradice una creencia | enuncia la situación, sin adorno |
| `climax` | sube la tensión | **la baja**: «no hay fórmula exacta a simple vista» |

Es el mismo criterio que el canal ya aplica en lo jurídico —se dice qué exige la
norma, nunca qué debe hacer alguien— trasladado a seguridad estructural.

---

## Los tres límites que la pieza no cruza

1. **El vídeo no dice si una casa es segura.** El artículo cita a los expertos:
   *no hay fórmula exacta para saber a simple vista si una estructura es segura*.
   Esa frase no es un adorno del cierre: es el motivo por el que la pieza existe
   como ruta hacia una inspección, y no como sustituto de ella.
2. **El umbral de 2-3 mm es un disparador, no un aprobado.** El artículo dice que
   por encima de ese ancho hay que contactar YA a ingenieros civiles o a los
   organismos de emergencia. No dice que por debajo no pase nada, y la pieza
   tampoco lo dirá.
3. **Toda clasificación de grietas es la del artículo**, no una interpretación
   nuestra. Si una toma afirma un nivel de riesgo, sale de esa fuente.

---

## Datos que la pieza afirma, y de dónde salen

Todos del artículo de El Colombiano. No se añade ninguna cifra propia.

| dato | uso en la pieza |
|---|---|
| Magnitud **7,4**; centro y occidente de Colombia; **+100 fallecidos** | toma `n02` |
| Fisuras superficiales: grosor de un cabello; solo revoque, estuco o pintura | `n05` |
| Grietas verticales: riesgo bajo a moderado; requieren monitoreo | `n06` |
| Grietas horizontales: empujes, deflexiones o deformaciones; riesgo moderado a alto | `n07` |
| Grietas en X, diagonales o en escalera: riesgo alto; **pueden fallar súbitamente sin previo aviso** | `n08` |
| Ancho **> 2-3 mm** → contactar ingenieros civiles u organismos de emergencia | `n09` |
| Puertas y ventanas que se traban · separación entre muros y marcos · desniveles en placas o techos | `n10` |
| «No hay fórmula exacta para saber a simple vista si una estructura es segura» | `n11` |
| Línea **123** · Medellín: **DAGRD**, inspección técnica **gratuita** · Antioquia: **Dagran** o bomberos | `n12` |

Dato del artículo que la pieza **no** usa: daños en columnas o vigas, concreto
desprendido, óxido y acero expuesto. Es material de una parte 2 si la hay; meterlo
aquí obligaría a recortar la clasificación de grietas, que es el cuerpo del vídeo.

---

## Mapa de tomas (12 · 1740 f · 30 fps)

| # | id | beat | molde | frames | contenido |
|---|---|---|---|---|---|
| 1 | `n01-sismo` | gancho | papel | 0-150 | La situación, enunciada |
| 2 | `n02-magnitud` | contexto | cine | 150-285 | 7,4 · centro y occidente · +100 fallecidos |
| 3 | `n03-fuente` | contexto | papel | 285-420 | Recorte de El Colombiano |
| 4 | `n04-no-iguales` | explicacion | papel | 420-555 | «No todas las grietas dicen lo mismo» |
| 5 | `n05-fisura` | explicacion | papel | 555-700 | Fisura superficial · riesgo bajo |
| 6 | `n06-vertical` | explicacion | papel | 700-845 | Vertical · bajo a moderado |
| 7 | `n07-horizontal` | explicacion | papel | 845-995 | Horizontal · moderado a alto |
| 8 | `n08-diagonal` | conflicto | papel | 995-1160 | X, diagonal, escalera · alto |
| 9 | `n09-umbral` | datos | cine | 1160-1320 | 2-3 mm |
| 10 | `n10-senales` | datos | papel | 1320-1470 | Otras señales |
| 11 | `n11-sin-formula` | climax | papel | 1470-1620 | El límite: no hay fórmula exacta |
| 12 | `n12-ruta` | cierre | cine | 1620-1740 | 123 · DAGRD · Dagran |

Sin huecos ni solapes; ninguna toma baja de 0,8 s ni pasa de 6 s; ninguna racha de
cuatro tomas `cine`. Lo comprueba `dialecto.reglas` al montar.

---

## Pendiente antes de publicar

1. **Locución.** Sin ella, los 1740 f son una estimación (≈2,7 palabras/s sobre el
   guion). El 005 enseñó la regla: **el clip manda**. Al medir el WAV hay que
   recronometrar las 12 ventanas.
2. **Verificar que las cifras siguen vigentes.** Es una noticia del día de un
   sismo: la cifra de fallecidos del artículo (+100) es provisional por
   definición. Si la pieza se publica más tarde, hay que volver a la fuente.
3. **Confirmar los canales oficiales** (123 · DAGRD · Dagran) antes de publicar:
   son la parte accionable y la que más daño hace si está mal.
