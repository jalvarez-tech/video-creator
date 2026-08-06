# 01 · Plan de noticia — proyecto NNN

> Se rellena **antes** de tocar Remotion. Copia este archivo a
> `proyectos/NNN/artefactos/01-noticia.md`.
> Guía: [SKILL.md](../SKILL.md) · tomas: [recetario-tomas.md](../recetario-tomas.md).
>
> Por qué existe: sin este paso salen piezas que **enumeran hechos** en vez de
> mover una creencia. La sección "La creencia" es la que decide si hay vídeo.

## Cabecera

| | |
|---|---|
| Noticia / fuente principal | *(titular + medio + fecha + URL)* |
| Voz en off | `noticias/NNN-vo.mp3` — NN,NN s (`ffprobe`) |
| Composición | 1080×1920 · **30 fps** · NNNN f *(= duración de la voz — la voz manda)* |
| Formato | 9:16 vertical · sin avatar |
| Marca (`MARCA.sello`) | *(nombre del canal, o `null`)* |
| Destino | Shorts · Reels · TikTok |
| ¿Hay parte 2? | sí / no *(si no, el cierre es CTA, no "Parte 2")* |

## La creencia (lo que decide si hay vídeo)

- **La gente cree:** …
- **En realidad:** …
- **Por qué le importa a quien lo ve:** …

> Si no puedes completar estas tres líneas, todavía no tienes un vídeo — tienes
> un artículo. Vuelve a la noticia y busca qué contradice.

## Gancho (los primeros 4 s)

- **Frase literal:** "…"
- **Tipo:** desmentido · cifra imposible · consecuencia oculta
- **Por qué contradice lo que se cree:** …

*(No vale una pregunta, ni presentarse, ni resumir el vídeo antes de darlo.)*

## Fuentes — cada cifra y cada recorte

**Sin esta tabla completa no se renderiza.** El formato vende credibilidad; un
dato sin sostener la quema entera. Si un dato no se puede verificar, **se cae del plan**.

| Dato / titular | Valor exacto | Medio | Fecha | URL | ¿Verificado? |
|---|---|---|---|---|---|
| Demanda de Musk | "…incumplimiento de contrato" | Reuters | AAAA-MM-DD | … | ☐ |
| Tope de beneficio | 100× | … | … | … | ☐ |

- **Datos que se cayeron por no poder sostenerse:** … *(anótalos: evita reintroducirlos)*

## Beats → tomas

Un beat puede ocupar varias tomas. **Una idea por toma**; sin huecos ni solapes.

| # | Frames | Beat | Toma | Registro | Contenido (una frase) | Sonido | Frase de la voz |
|---|---|---|---|---|---|---|---|
| 1 | 0–78 | gancho | titular | cine | … | impact deep | "…" |
| 2 | 78–186 | contexto | comparador | papel | … | pop ×2 | "…" |
| 3 | 186–300 | conflicto | prensa | papel | … | paper + pen | "…" |
| 4 | 300–420 | conflicto | cronologia | papel | … | tick | "…" |
| 5 | … | explicacion | … | papel | … | … | "…" |
| 6 | … | datos | cifra | papel | … | data + chime | "…" |
| 7 | … | climax | medidor | papel | … | ui | "…" |
| 8 | … | cierre | cierre | cine | … | impact deep | "…" |

`beat` ∈ gancho · contexto · conflicto · explicacion · datos · climax · cierre
`toma` ∈ titular · prensa · comparador · cronologia · cifra · medidor · retrato · escenario · cierre
`registro` ∈ papel *(explica)* · cine *(muestra)* — máx. 3 `cine` seguidas

**Comprobación del bloque `explicacion`:** ¿qué **mecanismo** se explica que no
esté en el titular de la noticia? → …
*(Si la respuesta es "ninguno", la pieza es un titular estirado. Rehaz el plan.)*

## Metraje y b-roll

Se genera **antes** de escribir el plan: su duración real condiciona los frames.
Motor y los 4 límites en [director §3h](../../director-video/SKILL.md).

| Toma | Qué plano | Fuente (archivo / Grok / archivo histórico) | Enmarcado o a sangre | Dur. + resolución reales (`ffprobe`) |
|---|---|---|---|---|
| 5 | … | … | retrato *(enmarcado)* | … |

- **Recuerda:** sobre papel el metraje va SIEMPRE enmarcado (`retrato`); a sangre solo sobre negro (`escenario`).
- **Descartado:** … *(por qué)*

## Decisiones tomadas (y lo que NO se cuenta)

- **Lo que se deja fuera a propósito:** … *(para no meterlo luego "porque cabe")*
- **Descartado:** … *(por qué)*

## Validación

- [ ] `revisaNoticia(tomas, 30)` sale limpio *(pega aquí la salida)*
- [ ] Frames clave renderizados: `[…]`
- [ ] Prueba 720p vista y aprobada
- [ ] Todas las fuentes verificadas en la tabla de arriba
