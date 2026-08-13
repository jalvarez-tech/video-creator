# 01 · Plan de noticia — proyecto 007 (v3)

> Guía: [SKILL.md](../../../manuales/video-noticias/SKILL.md) · tomas: [recetario-tomas.md](../../../manuales/video-noticias/recetario-tomas.md).
>
> **v2 (2026-08-11):** por pedido editorial se retiró el bloque de magnitud
> (7,4 · «el más fuerte desde 1979») y la pieza se reenfocó: ya no es «qué pasa
> con la deuda», es **la ruta de reclamación del seguro**, con la normativa
> colombiana verificada en fuentes primarias (deep research abajo). La v1 y su
> prueba quedaron obsoletas; la voz se relocutó entera.
>
> **v3 (2026-08-11):** hook pedido LITERAL en la voz — «Si tu inmueble está
> hipotecado, así se reclama el seguro» — seguido directo de las zonas
> golpeadas. Consecuencias: el amparo obligatorio pasa DETRÁS de la cifra; el
> **recorte de prensa sale de la pieza** (acompañaba a «la ruta ya la escribió
> la ley», la frase que el nuevo hook elimina — la atribución queda en el
> kicker FASECOLDA y las referencias de norma en pantalla); y el tratamiento
> personal pasa a **tuteo** («tu inmueble», «Tu póliza»), el del hook. Solo se
> relocutaron 4 líneas (las 9 intactas se reutilizaron sin re-facturar).

## Cabecera

| | |
|---|---|
| Tema | **Cómo reclamar el seguro de incendio y terremoto** de una vivienda hipotecada dañada por el sismo |
| Disparador | Sismo de Chocó (2026-08-10) y la nota de La República «¿Qué hacer si un terremoto daña una vivienda que todavía está pagando al banco?» (Bárbara Andreina Orozco Ostos, 2026-08-11) · [URL](https://www.larepublica.co/especiales/catastrofe-nacional/que-hacer-si-un-terremoto-dana-una-vivienda-que-todavia-esta-pagando-al-banco-4455769) |
| Voz en off | **ElevenLabs · voz clonada del canal** (`John Stevans v 0.1`) · `eleven_v3` · `--idioma es` · preset `noticias` · 13 líneas · **80,54 s = 2417 f** medidos (v3) |
| Composición | `Noticia007` · 1080×1920 · 30 fps · **25 tomas** |
| Marca | `PROPIEDADES LUXUR` · sin CTA de marca (hecho con víctimas) |
| ¿Parte 2? | no → el cierre remite a la póliza de cada quien |

## Decisión editorial

Hereda las dos renuncias del 006 (mismo hecho de fondo, con víctimas): el
gancho **enuncia el servicio** sin optimizar retención, y el clímax **baja la
tensión** (remedios gratuitos y la letra pequeña, no una amenaza). Sin sonidos
de premio. Y el criterio jurídico del canal: **se dice qué exige la norma,
nunca qué debe hacer alguien** — los pasos son de Fasecolda y los plazos del
Código de Comercio, siempre atribuidos; los números de artículo van EN
PANTALLA (etiquetas), nunca en la voz.

## La creencia (lo que decide si hay vídeo)

- **La gente cree:** reclamar el seguro es un laberinto sin reglas — la
  aseguradora responde si quiere, cuando quiere, y pelear es carísimo.
- **En realidad:** la reclamación tiene una ruta escrita y los plazos atan a
  las **dos** partes: tres días para avisar (del asegurado, ampliables), un
  mes para pagar (de la aseguradora, con mora automática si se pasa), dos años
  de prescripción, y un defensor **gratuito** si objetan o callan.
- **Por qué importa hoy:** solo en las zonas de alta afectación hay 442.514
  inmuebles asegurados (Fasecolda) — cientos de miles de hogares van a hacer
  esta reclamación por primera vez en su vida.

## Gancho (v3 — literal del canal)

**«Si tu inmueble está hipotecado, así se reclama el seguro.»** — la voz lo
dice literal sobre el aéreo residencial; en pantalla la condición va de kicker
(SI TU INMUEBLE ESTÁ HIPOTECADO — es el alcance, no el mensaje) y el mensaje
en display («Así se reclama / el seguro.»). Sigue directo con «En las zonas
más golpeadas por el sismo…» → la cifra 442 mil. Enunciado de servicio, sin
pregunta y sin drama.

## Los límites que la pieza no cruza

1. **Nada prescriptivo en voz propia**: pasos de Fasecolda, plazos del Código,
   norma del EOSF — todo atribuido.
2. **No se promete que el seguro pague**: hay deducibles, exclusiones y suma
   asegurada por póliza; la pieza remite al certificado individual.
3. **No se ilustra el daño del sismo**: metraje neutro (edificio intacto,
   recibos, contrato). Sin rostros identificables junto a «objetan o callan».
4. **Sin datos que la fuente no sostenga**: se descartó el «30 días para
   reclamar» que circuló en prensa (es simplificación de una consultora y
   choca con el art. 1075); los plazos de la pieza son los del Código.
5. **Sin balance de víctimas y sin magnitud** (v2): el sismo se nombra como
   hecho, no como espectáculo.

## Fuentes — deep research 2026-08-11, cada afirmación verificada

### Normativa (fuentes primarias)

| Afirmación en la pieza | Norma | Texto verificado |
|---|---|---|
| El seguro ya existe: obligatorio en todo inmueble hipotecado con entidad vigilada | **EOSF art. 101, num. 2** (D. 663/1993) | los inmuebles hipotecados a entidades vigiladas «deberán asegurarse contra los riesgos de incendio y terremoto», en su parte destructible, por su valor comercial y durante la vigencia del crédito |
| Tres días para avisar, desde que se conoce el daño | **C. de Comercio art. 1075** | aviso «dentro de los tres días siguientes a la fecha en que lo hayan conocido o debido conocer»; el término «podrá ampliarse, mas no reducirse por las partes» |
| La prueba del daño y su valor es del asegurado | **C. de Comercio art. 1077** | «Corresponderá al asegurado demostrar la ocurrencia del siniestro, así como la cuantía de la pérdida»; al asegurador, «los hechos o circunstancias excluyentes de su responsabilidad» |
| Un mes para pagar; demorarse genera mora (interés bancario corriente + mitad) | **C. de Comercio art. 1080** | pago «dentro del mes siguiente» a acreditarse el derecho (aun extrajudicialmente, per art. 1077); vencido, mora al «interés bancario corriente aumentado en la mitad» |
| La acción prescribe en dos años | **C. de Comercio art. 1081** | prescripción ordinaria de **2 años** desde que el interesado conoció o debió conocer; extraordinaria de 5 |
| Defensor del Consumidor Financiero, gratuito | **Ley 1328 de 2009** | toda entidad vigilada (aseguradoras incluidas) debe tener defensor; resuelve quejas «en forma objetiva y gratuita»; la Superfinanciera supervisa y sanciona |

### Hecho y cifras (prensa del mismo sismo)

| Dato | Fuente | Fecha |
|---|---|---|
| 442.514 inmuebles asegurados en 105 municipios de 7 departamentos de alta afectación (277.308 hogares) | Fasecolda, vía [La República](https://www.larepublica.co/finanzas/mas-de-442-000-inmuebles-asegurados-estan-en-las-zonas-mas-afectadas-por-el-sismo-4455458) | 2026-08-11 |
| 2.258.594 riesgos asegurados contra terremoto en el país | Fasecolda, vía La República e [Infobae](https://www.infobae.com/colombia/2026/08/11/como-reclamar-el-seguro-de-su-propiedad-si-resulto-afectada-por-el-terremoto-en-colombia-fasecolda-explico/) | 2026-08-11 |
| Pasos recomendados (seguridad → contactar aseguradora por canales oficiales → documentar con fotos/video → conservar facturas y soportes → sin reparaciones definitivas salvo proteger vida/evitar más daño → dejar avanzar la evaluación) | Fasecolda (presidente: Gustavo Morales), vía Infobae/RCN/El Espectador | 2026-08-11/12 |
| Reclamación ante la aseguradora, no el banco; banco beneficiario «a título oneroso» hasta el saldo; excedente del deudor | La República (nota disparadora) | 2026-08-11 |

- **En pantalla, la cifra va como «442 mil»** (seis dígitos sin separador no
  se leen en una toma de 4 s); la voz dice «más de cuatrocientos cuarenta y
  dos mil».
- **Descartado a propósito:** el «30 días para reclamar» (ver límite 4); la
  profundidad y magnitud del sismo (v2); el desglose de riesgos
  privados/públicos (no cambia ninguna decisión del espectador).

## Mapa de tomas (25 · 2417 f · 30 fps — v3)

| # | id | beat | molde | frames | dur | contenido | cue |
|---|---|---|---|---|---|---|---|
| 1 | `n01-gancho` | gancho | cine | 0–105 | 3,5 s | Aéreo + kicker SI TU INMUEBLE ESTÁ HIPOTECADO + «Así se reclama el seguro.» | `s01-abre` |
| 2 | `n02a-zonas` | contexto | papel | 105–188 | 2,8 s | «En las zonas más golpeadas por el sismo…» | `s05-zonas` |
| 3 | `n02b-cifra` | contexto | cine | 188–311 | 4,1 s | **Cifra 442 mil** inmuebles asegurados (Fasecolda) | `s06-cifra` |
| 4 | `n03a-amparo` | contexto | papel | 311–479 | 5,6 s | EOSF art. 101: asegurado contra incendio y terremoto | `s03-amparo` |
| 5 | `n03b-obligatorio` | contexto | papel | 479–529 | 1,7 s | «Un amparo obligatorio.» | `s04-obligatorio` |
| 6 | `n04-pasos` | conflicto | papel | 529–605 | 2,5 s | «Cinco pasos.» — el cambio de marcha | `s07-pasos` (sharp) |
| 7 | `n05a-avisar` | explicacion | papel | 605–736 | 4,4 s | PASO 1 · avisar a la aseguradora, no al banco | `s08-paso1` (ui) |
| 8 | `n05b-tres-dias` | explicacion | papel | 736–835 | 3,3 s | «Tres días para avisar» · art. 1075 | `s09-tres-dias` (tick) |
| 9 | `n06a-documentar` | explicacion | papel | 835–907 | 2,4 s | PASO 2 · documentar con fotos y video | `s10-paso2` (camera) |
| 10 | `n06b-conservar` | explicacion | papel | 907–1041 | 4,5 s | **Retrato recibos** · conservar facturas y soportes | `s11-facturas` |
| 11 | `n07a-reparaciones` | explicacion | papel | 1041–1172 | 4,4 s | PASO 3 · sin reparaciones definitivas | `s12-paso3` (mouse) |
| 12 | `n07b-salvo` | explicacion | papel | 1172–1266 | 3,1 s | Salvo proteger la vida o evitar más daños | `s13-salvo` |
| 13 | `n08a-reclamacion` | explicacion | papel | 1266–1405 | 4,6 s | PASO 4 · presentar la reclamación: daño y valor | `s14-paso4` (pen) |
| 14 | `n08b-prueba` | explicacion | papel | 1405–1491 | 2,9 s | La prueba es del asegurado · art. 1077 | `s15-prueba` |
| 15 | `n09a-mes` | datos | papel | 1491–1595 | 3,5 s | PASO 5 · «Un mes para pagar» · art. 1080 | `s16-paso5` (tick) |
| 16 | `n09b-mora` | datos | papel | 1595–1680 | 2,8 s | Demorarse cuesta: mora (IBC aumentado en la mitad) | `s17-mora` |
| 17 | `n10a-saldo` | datos | papel | 1680–1788 | 3,6 s | El banco cobra primero, hasta el saldo | `s18-saldo` |
| 18 | `n10b-excedente` | datos | papel | 1788–1857 | 2,3 s | El excedente es del propietario | `s19-excedente` |
| 19 | `n11a-objetan` | climax | papel | 1857–1894 | 1,2 s | «¿Objetan o callan?» | `s20-objetan` |
| 20 | `n11b-defensor` | climax | papel | 1894–2044 | 5,0 s | Defensor del Consumidor Financiero · Ley 1328 · y la SFC | `s21-defensor` |
| 21 | `n11c-prescribe` | climax | papel | 2044–2113 | 2,3 s | «La acción prescribe en dos años» · art. 1081 | `s22-prescribe` (**deep 1/2**) |
| 22 | `n12a-certificado` | climax | papel | 2113–2266 | 5,1 s | **Retrato contrato** · el certificado individual | `s23-certificado` |
| 23 | `n12b-copia` | climax | papel | 2266–2312 | 1,5 s | Se puede pedir copia | `s24-copia` |
| 24 | `n13a-ruta` | cierre | cine | 2312–2363 | 1,7 s | «La ruta ya está escrita.» | **silencio** |
| 25 | `n13b-poliza` | cierre | cine | 2363–2417 | 1,8 s | «Tu póliza.» | `s25-cierre` (**deep 2/2**) |

**Sonido — la escalera de pasos:** cada paso aterriza con un click distinto y
motivado (ui → camera → mouse → pen → tick); `tick` queda reservado a los
plazos legales. Un solo `sharp` («Cinco pasos», el cambio de marcha), dos
`deep` (prescripción y cierre), un silencio (la tesis).

**Subtítulos:** fuera en esta pasada, como en 004/005/006 — los titulares
condensan la voz y un carril literal duplicaría texto (SKILL §8). La vía
correcta si el canal los quiere: componente propio del formato (`T.subtitulo`
existe sin consumidor), anotado como mejora del motor.

## Metraje y b-roll

| Toma | Qué plano | Motor | Hueco | Por qué ESE plano |
|---|---|---|---|---|
| n01-gancho (escenario) | Vídeo aéreo de conjunto residencial denso, intacto | banco | 1080×1920 (fuente 1080×1920 · 18,8 s) | El sujeto (la vivienda asegurada) sin señalar un inmueble concreto; ilustra la escala, no el desastre |
| n06b-conservar (retrato) | Manos con recibos y calculadora, sin rostro | banco | 640×700 | El objeto **literal** del paso 2 de Fasecolda: «conservar facturas y soportes». Billetes al borde y recibos extranjeros: ilegibles a tamaño de tarjeta (anotado en manifiesto) |
| n12a-certificado (retrato) | Dos manos sobre un contrato; el dedo en la cláusula | banco | 640×700 | El gesto de leer el certificado individual y su letra pequeña, sin rostros |

- Licencias y `grado` medido: `broll/manifiesto.json` (v2 podado: fuera las
  entradas de la v1 `n05a-cuotas`/`n11a-poliza`, mismos archivos re-traídos
  bajo sus tomas nuevas).
- **Descartado:** metraje de daños/escombros (límite 3); el gesto «documentar
  con el teléfono» sigue sin existir en el banco (v1) — el paso 2 se cubre con
  el titular y el retrato de facturas.

## Validación

- [x] `revisar-plan.mjs` limpio (25 tomas · 2417 f) — v3
- [x] `revisar-broll.mjs` limpio (3 archivos, crédito y medida) — v3
- [x] `tsc --noEmit` + `eslint` limpios — v3
- [x] Frames de control renderizados — v3 (cazaron el kicker del hook a 2 líneas → px 34)
- [x] Prueba 720p con voz y SFX — v3
- [x] Fuentes verificadas en primarias (tablas de arriba) ✅ 2026-08-11
- [x] **Render final 1080p** ✅ 2026-08-12 (OK del canal sobre la prueba v3) → `finales/007-como-reclamar-el-seguro.mp4` · 80,62 s · 19,5 MB · pico −3,8 dB
- [ ] Créditos del metraje pegados en la descripción al publicar (bloque abajo)
- [ ] Escucha de la pista montada antes de publicar (junturas v3 sin stitching)

### Créditos para la descripción (bancos.py creditos)

```
Metraje de archivo (Pexels License · https://www.pexels.com/license/):
· Kishan Rahul Jose — https://www.pexels.com/video/an-aerial-view-of-a-large-apartment-complex-16466810/
· kaboompics.com — https://www.pexels.com/photo/hands-holding-receipt-and-notes-5900135/
· kaboompics.com — https://www.pexels.com/photo/people-doing-their-paperwork-7681200/
```

> **Ojo v3:** `eleven_v3` sigue sin request stitching: escuchar la pista
> montada antes de publicar. Si alguna juntura salta de tono, se relocuta con
> `eleven_multilingual_v2` y se recronometra (aprendizaje del 006).
