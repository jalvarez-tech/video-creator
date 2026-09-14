# 01 · Plan narrativo — proyecto 008

> «La tragedia no termina cuando deja de ser noticia.»
> Campaña de ayuda humanitaria para las familias afectadas por el terremoto en
> Chocó (Quibdó). Canal: **Juan Papita** (dos sedes como puntos de recolección);
> el camión lo pone la familia de Juan Pablo Rico y sale ~3 semanas después de
> la emergencia, cuando la atención ya bajó. Brief completo del cliente en el
> chat del 2026-08-13 (guion literal respetado).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Clip fuente | no hay avatar — **voz en off** (voz clonada del canal, ElevenLabs `eleven_v3`) |
| Composición | `Noticia008` · 1080×1920 · **30 fps** · duración = lo mayor de plan y voz |
| Formato | 9:16 vertical — ruta del formato editorial (tomas `papel`/`cine`, `PistaGraficos` + dialecto editorial) |
| Estilo | **cinematográfico documental** (§4 director): pocos golpes, risers contados, silencios a propósito |
| Destino | Instagram Reels (90–220 s; esta pieza ≈ 130–140 s) |
| Objetivo del vídeo | que quien lo ve entienda que la ayuda de verdad es la que llega DESPUÉS de los titulares — y lleve algo a una sede o aporte a la cuenta |
| Marca | **nueva**: `src/marcas/choco.ts` (campaña «Ayudemos a Chocó» de Juan Papita). No es Luxur y no se hereda su naranja: acento ámbar tierra que sí pasa contraste sobre papel |

## Promesa y CTA

- **Promesa (primeros 8 s):** «En unos días dejaremos de hablar del terremoto. Para ellos no habrá terminado.»
- **Acción final:** llevar donaciones a las dos sedes de Juan Papita · aportar a la cuenta para cemento y varillas · fecha de salida del camión.
- **Lo que NO se cuenta:** cifras de muertos o damnificados, imágenes de sufrimiento explícito, magnitud del sismo, política. Nada de urgencia artificial: la tesis es la CALMA del que llega después.

## Criterio editorial (pieza con víctimas — hereda el criterio del 006/007)

1. **Sin sensacionalismo:** no cuerpos, no llanto en primer plano, no escombros dramáticos. El daño se muestra por metonimia: una grieta, una colchoneta, unas manos.
2. **Sonido sobrio:** sin `sparkle`/`coin`/`chime` (sonidos de premio). Dos `impact deep` en toda la pieza (el granito / la frase final). Silencios estratégicos reales (tomas sin cue).
3. **Rostros:** ninguna cara de archivo se presenta como víctima (la licencia de banco lo prohíbe y el criterio editorial también). Los rostros solo pueden ser ilustrativos generados (IA) y van SIEMPRE **enmarcados como ilustración**, nunca a sangre como si fueran documento.
4. **Los datos operativos van en pantalla, no en la voz:** direcciones, banco, cuenta, fecha — como en el 007 con los artículos de ley.
5. **Placeholders visibles:** el cliente aún no pasa direcciones/cuenta/fecha → en pantalla van como `POR CONFIRMAR`, imposibles de publicar por accidente.

## La voz (decisión)

- `elevenlabs.py guion` con la **voz clonada del canal** (`ELEVENLABS_VOICE_ID` del `.env`, la misma del 006/007) · modelo `eleven_v3` (rango emocional; sin stitching — las junturas las cubren las pausas del propio guion) · preset `narracion`.
- El guion se parte en **28 líneas con voz + 14 líneas en silencio** (2 s cada una: los silencios del brief son tomas, no huecos). `generar-vo.sh` cronometra y su tabla ES la ventana de cada toma.
- Coste estimado ≈ 1.500 caracteres de los 31.695 disponibles.

## Los dos registros = el concepto

La gramática del formato ya cuenta esta historia: **cine (negro + metraje real)** = «esto está pasando»; **papel (cálido + texto/fotos enmarcadas)** = «esto pensamos hacer». La paleta desaturada→cálida se hace con `grado` por toma (metraje frío al principio, `calido` positivo desde la sección de solidaridad) sobre el look documental base de la marca (`metraje.saturacion 0.82`).

## B-roll — el reparto por honestidad (§3h)

**Regla aplicada:** lo real se trae del banco; los rostros/escenas de Chocó que no existen en banco se generan PERO entran **enmarcados como ilustración** (nunca a sangre: ni afirman documento ni arriesgan resolución); los datos (direcciones, cuenta, toneladas) son gráficos.

| Toma | Plano (intención) | Motor | Va |
|---|---|---|---|
| g01 | grieta real en una pared — el daño por metonimia | banco (vídeo) | sangre/cine |
| g02 | el lugar real: Quibdó/Chocó (calle, río, techos de zinc) | banco (retrato) | enmarcada/papel |
| c01 | manos pasando bolsas de ayuda — la solidaridad de HOY | banco (vídeo) | sangre/cine |
| c03 | pulgar pasando noticias en un celular | banco (vídeo) | sangre/cine |
| c04 | cámara de TV / set que se apaga | banco (vídeo) | sangre/cine |
| sil1 | colchoneta en el suelo de un interior humilde | banco (retrato) | enmarcada/papel |
| c06a | mano de niño en mano de adulto (sin rostros) | banco (vídeo) | sangre/cine |
| d01 | camión de carga vacío / puertas traseras | banco (vídeo) | sangre/cine |
| n01a | alimentos no perecederos / mercado empacado | banco (vídeo) | sangre/cine |
| n04 | bultos de cemento / obra | banco (vídeo) | sangre/cine |
| m01 | mano haciendo una transferencia en el celular (sin marcas visibles) | banco (vídeo) | sangre/cine |
| m03 | varillas de acero | banco (vídeo) | sangre/cine |
| f01 | cajas entrando a un camión | banco (vídeo) | sangre/cine |
| f02 | otra vista real del Chocó (río Atrato, embarcadero) | banco (retrato) | enmarcada/papel |
| sil5/f06 | una persona dejando UNA bolsa/caja (el granito) | banco (vídeo) | sangre/cine |
| f05 | carretera entre verde (el viaje a Chocó) | banco (vídeo) | sangre/cine |
| sil8 | **la foto del cliente** (niños saludando) — cierre esperanzador | **archivo del cliente** | enmarcada/papel |

## Ajustes tras frames de control (R17 — lo que la hoja no enseñó)

| Toma | v1 (rechazada) | Por qué | Final |
|---|---|---|---|
| g01 | *(hueco: no hubo grieta digna)* | — | foto real: cuarto humilde en penumbra, a sangre |
| sil1 | colchoneta enmarcada | la foto del cuarto ya abría la pieza | respiro en NEGRO (hermano de sil5) |
| c03 v1 | scroll con rostro | bufanda/gorro de invierno + rostro protagonista | — |
| c03 v2 | foto pulgar a oscuras | pantalla con app de Biblia LEGIBLE (inglés) | foto: manos pasando página de prensa |
| c06a v1 | mano niño-adulto | CRUZ desenfocada al fondo — leía funeral | vídeo: dedo de bebé en mano adulta (sin cruz) |
| a02 v1 | ropa donada clasificándose | lentejuelas + anillos: leía tienda vintage | vídeo: cobijas dobladas apiladas |
| d01/f02/f03/m01 | *(huecos honestos del banco)* | camión vacío / río Chocó / transferencia sin marca no existen dignos | texto editorial |

- **Descartado — generar el sismo con IA a sangre:** precedente del 006 (fabricar prueba documental). Los stills IA van enmarcados y con `grado` de ilustración.
- **Descartado — rostros de banco como damnificados:** license rule + R16.6.
- **Descartado — metraje de archivo de terremotos:** saldría de Asia/Turquía/Siria, exactamente lo que el brief prohíbe.
- **Pendiente del cliente:** la foto de los niños aún no está en disco → `proyectos/008/broll/cliente/final-ninos.jpg`. Hasta que llegue, el marco mostrará «pendiente».

## Mapa de tomas (borrador — las ventanas exactas las da generar-vo.sh)

| id | molde | beat | voz (línea del guion) | en pantalla |
|---|---|---|---|---|
| g00 | cine | gancho | *(silencio 2 s)* | negro con velo, solo ambiente |
| g01 | cine | gancho | «En unos días… dejaremos de hablar del terremoto.» | grieta a sangre + velo, sin texto |
| g02 | papel | gancho | «Pero para ellos… la tragedia no habrá terminado.» | foto familia enmarcada + kicker QUIBDÓ — CHOCÓ |
| c01 | cine | contexto | «Hoy Colombia está volcada a ayudar.» | manos pasando bolsas + velo |
| c02 | papel | contexto | «Pero sabemos cómo funciona el tiempo.» | titular: «Sabemos cómo funciona el tiempo.» |
| c03 | cine | contexto | «Las noticias cambian.» | scroll de noticias + velo + titular corto |
| c04 | cine | contexto | «Las cámaras se van.» | cámara de TV + velo + titular corto |
| c05 | papel | contexto | «La ayuda comienza a disminuir…» | titular 2 líneas |
| sil1 | papel | contexto | *(silencio)* | colchoneta enmarcada, sin texto — respiro |
| c06a | cine | contexto | «Pero hay familias que todavía tendrán que levantarse cada mañana…» | mano niño-adulto + velo |
| c06b | papel | contexto | «…frente a una casa que ya no pueden habitar.» | titular 2 líneas |
| d01 | cine | conflicto | «Por eso nosotros queremos llegar después.» | camión vacío + velo |
| d02 | papel | conflicto | «Cuando la emergencia ya no esté ocupando todos los titulares…» | titular |
| d03 | papel | conflicto | «pero la necesidad siga ahí.» | titular hero |
| sil2 | cine | conflicto | *(silencio)* | kicker TENEMOS UN CAMIÓN + cifra 8 «toneladas» (golpe) |
| sil2b | cine | conflicto | *(silencio)* | titular «Y queremos llenarlo.» |
| n01a | cine | explicacion | «Vamos a recolectar alimentos… cobijas y carpas…» | mercado/alimentos + velo |
| n01b | papel | explicacion | «…y todo aquello que haga más llevaderos estos días.» | kicker VAMOS A RECOLECTAR + titular lista condensada |
| n03 | papel | explicacion | «Y también queremos ayudarles con algo que vendrá después…» | titular |
| n04 | cine | explicacion | «Volver a construir.» | cemento + velo + titular «Volver a construir.» |
| a01 | papel | datos | «Desde hoy, las dos sedes de Juan Papita serán puntos de recolección.» | kicker PUNTOS DE RECOLECCIÓN + titular |
| a02 | cine | datos | «Puedes traer una bolsa de arroz, una lata…» | manos con bolsas 2 + velo |
| a03 | papel | datos | «Lo que puedas.» | titular hero px grande |
| sil3 (×2) | papel | datos | *(silencio 4 s)* | tarjeta sedes: SEDE 1 / SEDE 2 + direcciones POR CONFIRMAR |
| m01 | cine | datos | «También habilitaremos una cuenta exclusivamente para esta campaña.» | transferencia móvil + velo |
| m02a | cine | datos | «El dinero será para materiales, especialmente cemento y varillas…» | varillas + velo |
| m02b | papel | datos | «…las ayudas más costosas de transportar y conseguir.» | titular |
| sil4 (×2) | papel | datos | *(silencio 4 s)* | tarjeta cuenta: BANCO/CUENTA/TITULAR POR CONFIRMAR + destino |
| f01 | cine | climax | «La familia de Juan Pablo Rico ya puso el camión.» | cajas entrando + velo |
| f02 | papel | climax | «Nosotros ya tenemos el contacto en Chocó.» | calle Quibdó enmarcada + titular |
| f03 | cine | climax | «Ahora solo falta llenarlo.» | camión + titular «Solo falta llenarlo.» |
| f04 | papel | climax | «Sabemos que en un camión de ocho toneladas no cabe todo…» | titular 2 líneas |
| sil5 | cine | climax | *(silencio)* | una persona deja UNA bolsa + velo, sin texto |
| f05 | cine | climax | «Pero ocho toneladas se llenan…» | carretera + velo |
| f06 | cine | climax | «un granito de arena a la vez.» | la bolsa única + titular «Un granito a la vez.» *(impact deep 1/2)* |
| f07 | papel | climax | «Hoy ese granito puede ser el tuyo.» | titular hero |
| sil6 | cine | cierre | *(silencio)* | titular «Cuando la ayuda disminuya, queremos seguir ahí.» |
| sil7 | papel | cierre | *(silencio)* | tarjeta CTA: sedes · aportes · salida del camión POR CONFIRMAR |
| sil8 | papel | cierre | *(silencio)* | **foto del cliente** (niños) enmarcada + kicker AYUDEMOS A CHOCÓ |
| sil9 (×2) | cine | cierre | *(silencio 4 s)* | frase final en 4 líneas *(impact deep 2/2, luego nada)* |

Techo de 6 s por toma ✓ (la más larga son las tarjetas de 4 s). `≤3 cine` seguidas ✓ (máximo: sil2→sil2b→n01a).

## Simbología de color

| Color | Significa | Se usa en |
|---|---|---|
| ámbar tierra (acento de marca) | la solidaridad / lo que se hace | kickers de la campaña, cifra 8t, sello |
| carbón sobre papel / blanco sobre cine | la voz editorial | titulares |
| ninguno más | — | el dolor no lleva color: lleva silencio |

## Decisiones tomadas

- **Ruta editorial (papel/cine) y no una comp a mano:** la gramática, el velo obligatorio, R08/R09 y los validadores ya existen; el look de campaña entra por la marca.
- **30 fps** (no-avatar 9:16, §3a director).
- **Subtítulos fuera** (como 004–007): los titulares condensan la voz; un carril literal duplicaría texto.
- **Música:** piano minimalista → cuerdas cálidas, generada con ElevenLabs Music si el plan lo permite (~135 s); si no, ambiente + risers del banco y se anota. La música NUNCA compite con la voz (volumen bajo constante + sube solo en los silencios finales).
- **Descartado — HeyGen para la voz:** genera vídeo, no audio; para voz en off es pagar un render que se tira (nota de elevenlabs.py).
- **Descartado — seedance-20:** sin suscripción (2026-08-05).
- **Grok sin créditos (403, 2026-08-13):** el equipo de xAI no tiene créditos; los 3 planos ilustrativos que iban generados pasaron al banco en modo retrato, y si no hay material auténtico del Pacífico quedan en texto editorial. Reactivar IA = comprar créditos en console.x.ai.
- **Música bloqueada por permiso de la API key** (`music_generation`): plan de composición y comando listos en `proyectos/008/musica/README.md`; la comp tiene el interruptor `HAY_MUSICA`.
