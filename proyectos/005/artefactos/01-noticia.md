# 01 · Plan de noticia — proyecto 005

> Guía: [SKILL.md](../../../manuales/video-noticias/SKILL.md) · tomas: [recetario-tomas.md](../../../manuales/video-noticias/recetario-tomas.md).

## Cabecera

| | |
|---|---|
| Noticia / fuente principal | "Paso a paso para legalizar un inmueble en Colombia antes de venderlo" · Ciencuadras (Redacción) · 2026-07-14 · [URL](https://www.ciencuadras.com/blog/guia-para-vender-inmuebles/paso-a-paso-para-legalizar-un-inmueble-en-colombia-antes-de-venderlo) |
| Fuentes normativas | Código Civil art. 756 · Ley 223 de 1995 arts. 230 y 231 |
| Voz en off | `noticias/005-vo.wav` — **63,62 s** · 16 tomas · voz clonada `John Stevans v 0.1` (ElevenLabs, es-colombian) |
| Composición | 1080×1920 · **30 fps** · **1911 f (63,7 s)** *(medido sobre la voz DEFINITIVA)* |
| Formato | 9:16 vertical · sin avatar |
| Marca (`MARCA.sello`) | `PROPIEDADES LUXUR` |
| Destino | Shorts · Reels · TikTok |
| ¿Hay parte 2? | no → el cierre es CTA |

> ⚠️ **La pieza NO se sostiene sobre el artículo de Ciencuadras.** Es una guía de
> servicio sin cifras: su único dato duro es la frase de que sin registro no eres
> propietario ante terceros. Todo lo que se afirma con número en este plan sale de
> la NORMA, no del blog. El artículo queda como disparador y como fuente de la
> lista de trámites, no como respaldo de las cifras.

## La creencia (lo que decide si hay vídeo)

- **La gente cree:** que cuando firma la escritura en la notaría ya es dueña del inmueble.
- **En realidad:** la notaría no transfiere la propiedad. La transfiere el REGISTRO.
  El art. 756 del Código Civil dice que la tradición del dominio de los bienes
  raíces se efectúa por la inscripción del título en la Oficina de Registro de
  Instrumentos Públicos. Sin esa inscripción, frente a terceros el dueño sigue
  siendo el vendedor — **y puede volver a vender el mismo inmueble.**
- **Por qué le importa a quien lo ve:** hay un plazo de **2 meses** para registrar,
  pasarse cuesta intereses de mora, y el que no registra puede perder un inmueble
  que ya pagó.

## Gancho (los primeros 4 s)

- **Frase literal:** "Firmaste la escritura en la notaría. Todavía no eres el dueño."
- **Tipo:** desmentido
- **Por qué contradice lo que se cree:** la firma ante notario es el momento que
  todo el mundo vive como "ya es mío" — se celebra, se entregan llaves. El vídeo
  dice que ese momento no transfiere nada.

## Fuentes — cada cifra y cada recorte

| Dato / titular | Valor exacto | Medio | Fecha | URL | ¿Verificado? |
|---|---|---|---|---|---|
| La tradición del dominio de inmuebles se efectúa por la inscripción del título en la ORIP | Código Civil, **art. 756** | Secretaría del Senado (texto oficial) | vigente | [secretariasenado.gov.co](http://www.secretariasenado.gov.co/senado/basedoc/codigo_civil_pr023.html) | ☑ |
| Plazo para registrar un documento otorgado **en el país** | **2 meses** | Ley 223 de 1995, art. 231 · Gerencie | 1995 | [gerencie.com](https://www.gerencie.com/plazo-para-registrar-una-escritura-publica.html) | ☑ |
| Plazo si el documento se otorgó **en el exterior** | **3 meses** | Ley 223 de 1995, art. 231 | 1995 | ídem | ☑ |
| Plazo especial de hipoteca y patrimonio de familia | **90 días hábiles** | Ley 1579 de 2012, art. 28 | 2012 | [funcionpublica.gov.co](https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49731) | ☑ |
| Sanción por registrar tarde | **intereses moratorios por mes o fracción**, a la tasa del Estatuto Tributario para renta | Ley 223 de 1995, art. 231 | 1995 | ídem Gerencie | ☑ |
| Impuesto de registro para actos **con cuantía** en ORIP | **entre 0,5 % y 1 %** del valor del acto (la asamblea departamental fija el punto) | Ley 223 de 1995, art. 230 | 1995 | [funcionpublica.gov.co](https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=6968) | ☑ |
| "legalmente no eres el propietario ante terceros" (si no se registró) | cita literal | Ciencuadras | 2026-07-14 | [ciencuadras.com](https://www.ciencuadras.com/blog/guia-para-vender-inmuebles/paso-a-paso-para-legalizar-un-inmueble-en-colombia-antes-de-venderlo) | ☑ |
| Los 6 pasos previos a vender | escritura · certificado de tradición y libertad · predial al día · identificación del inmueble · licencia de reconocimiento · asesoría | Ciencuadras | 2026-07-14 | ídem | ☑ |

- **Datos que se cayeron por no poder sostenerse:**
  - El "6 min" del artículo es **tiempo de lectura**, no un plazo. Fuera.
  - El "menos de 30 días" venía de un artículo relacionado sobre arriendos. Nada que ver. Fuera.
  - Coste exacto del certificado de tradición y libertad y de los derechos de
    registro: **no verificados a fecha de hoy** (cambian cada año por resolución
    de la SNR). No entran hasta comprobarlos en la fuente oficial.
  - Recargos "del 50 % al 200 %": aparecieron en una búsqueda pero **no los pude
    confirmar en la norma**. Fuera — la sanción que sí se sostiene es la de
    intereses moratorios.

## Beats → tomas

> Frames MEDIDOS sobre la voz DEFINITIVA (`generar-vo.sh --motor elevenlabs`).
>
> Dos correcciones por el camino, ambas detectadas midiendo:
> 1. El primer reparto en 9 tomas daba 6 por encima del techo de 6 s (una de
>    11,3 s). Partirlas es lo que pide el formato: una idea por toma.
> 2. Ya con la voz real, `n06-tradicion` seguía en 6,47 s. Se acortó la frase
>    («de un inmueble» ya está dicho en la toma 1) y se relocutó: la reanudación
>    por huella refacturó solo 3 tomas de 16 (esa y sus dos vecinas del stitching).

| # | Frames | Beat | Toma | Registro | Contenido (una frase) | Sonido | Frase de la voz |
|---|---|---|---|---|---|---|---|
| 1 | 0–131 | gancho | titular | cine | El desmentido, en seco sobre negro | impact deep | "Firmaste la escritura en la notaría. Todavía no eres el dueño." |
| 2 | 131–202 | contexto | titular | papel | Qué SÍ hace la notaría | pop | "La notaría da fe de que firmaste." |
| 3 | 202–292 | contexto | titular | papel | Y qué no hace | — | "Pero la propiedad no la transfiere una firma." |
| 4 | 292–350 | explicacion | titular | papel | El giro, en tres palabras | click | "La transfiere el registro." |
| 5 | 350–480 | explicacion | prensa | papel | La norma como prueba | paper | "Lo dice el artículo setecientos cincuenta y seis del Código Civil." |
| 6 | 480–646 | explicacion | prensa | papel | El mecanismo, con «inscribiendo el título» resaltado | pen | "La propiedad de un inmueble se traspasa inscribiendo el título en la Oficina de Registro." |
| 7 | 646–809 | conflicto | comparador | papel | Notaría vs Registro, en chips | click ×2 | "Dos oficinas distintas. En una firmas. En la otra te vuelves propietario." |
| 8 | 809–961 | climax | titular | papel | Quién es el dueño mientras tanto | riser low | "Mientras no registres, ante terceros el dueño sigue siendo quien te vendió." |
| 9 | 961–1043 | climax | titular | papel | El golpe | impact sharp | "Y puede volver a vender el mismo inmueble." |
| 10 | 1043–1179 | datos | cifra | papel | El plazo: 2 | data + chime | "Tienes dos meses para registrar si la escritura se otorgó en Colombia." |
| 11 | 1179–1260 | datos | cifra | papel | El otro plazo: 3 | tick | "Tres, si se otorgó en el exterior." |
| 12 | 1260–1433 | datos | medidor | papel | La horquilla 0,5 %–1 % | ui | "El impuesto de registro va del cero coma cinco al uno por ciento, según el departamento." |
| 13 | 1433–1551 | datos | titular | papel | La buena noticia | — | "Pasado el plazo la escritura se sigue pudiendo registrar." |
| 14 | 1551–1651 | datos | titular | papel | La mala | tick | "Pero con intereses de mora por cada mes de retraso." |
| 15 | 1651–1778 | cierre | titular | papel | La acción concreta | chime | "Antes de vender, pide tu certificado de tradición y libertad." |
| 16 | 1778–1901 | cierre | cierre | cine | El remate | impact deep | "Si tu escritura no está ahí, no has vendido nada todavía." |

`beat` ∈ gancho · contexto · conflicto · explicacion · datos · climax · cierre
`toma` ∈ titular · prensa · comparador · cronologia · cifra · medidor · retrato · escenario · cierre
`registro` ∈ papel *(explica)* · cine *(muestra)* — máx. 3 `cine` seguidas

**Comprobación del bloque `explicacion`:** ¿qué **mecanismo** se explica que no
esté en el titular de la noticia? → **La separación entre título y modo.** El
titular del artículo dice "legaliza tu inmueble"; el vídeo explica *por qué* la
firma no basta: la escritura es el TÍTULO y la inscripción es el MODO, y sin modo
no hay transferencia. Ese mecanismo no está en el artículo.

## Metraje y b-roll

| Toma | Qué plano | Fuente | Enmarcado o a sangre | Dur. + resolución reales (`ffprobe`) |
|---|---|---|---|---|
| — | — | — | — | — |

- **Decisión: la pieza va SIN b-roll**, como el 004. Todo se resuelve con las
  tomas de papel y la biblioteca de gráficos. Motivo: los planos que pediría el
  tema (una notaría, un sello, unas llaves) son genéricos, y con el límite de
  resolución sin confirmar de Grok ([director §3h](../../../manuales/director-video/SKILL.md))
  no compensan frente a un `prensa` bien compuesto.
- **Descartado:** foto de fachada / llaves de stock — decorativo, no aporta prueba.

## Decisiones tomadas (y lo que NO se cuenta)

- **Lo que se deja fuera a propósito:**
  - Los 6 pasos completos del artículo. Enumerarlos convertiría la pieza en una
    lista y mataría el gancho. Solo entra el certificado de tradición y libertad,
    y entra al final como acción concreta.
  - Predial, licencia de reconocimiento y curaduría: son otro vídeo.
  - Costes en pesos: no verificados. No se dicen.
- **Descartado:** abrir con "¿sabías que…?" — el formato lo prohíbe (el gancho es
  una afirmación, no una pregunta).
- **Riesgo asumido:** es contenido con carga jurídica. La voz dice qué exige la
  norma, nunca qué debe hacer alguien en su caso concreto. Sin asesoría legal
  disfrazada.

## Validación

- [x] `revisaNoticia(tomas, 30)` sale limpio → «16 tomas · 1911 f · 63.70 s @ 30 fps · Plan limpio»
- [x] Frames clave renderizados: `[60, 170, 320, 420, 580, 750, 900, 1010, 1120, 1350, 1600, 1850]`
  - Defecto corregido: los chips del comparador llevaban `\n` y `ChipIcono` no parte líneas → se leía «Notaría firmas». Ahora una palabra por chip.
- [~] Prueba renderizada: `proyectos/005/pruebas-720p/005-prueba.mp4` (540×960 · 63,7 s) — PENDIENTE de tu OK
- [x] Todas las fuentes verificadas en la tabla de arriba
