# 023 · One Living (Envigado) — análisis previo a elegir (2026-10-06)

> Primer entregable de la V7 (segundo reel de One Living). Catálogo del material: `proyectos/022/catalogo-material.md` (no se rehace). Lo medido lo digo; lo que no pude verificar, también. **Estado: respondidas las cuatro preguntas (todo sí); montada la prueba rev. 0 (ver el final de este archivo).**

## 0. Dónde estoy (lo leído, 2026-10-06)

- `origin` = `git@github.com:jalvarez-tech/video-creator.git` (el del registro). Registro leído en cada rama remota y en los 4 árboles de trabajo: el más avanzado es **`origin/feat/reel-022-one-living` (4993d94)**: V1-V6, V6 `final` (CRF 16), **V7 · 023 libre**. `origin/main` (ca1fde4) va atrasado (V4 libre); las ramas 019-021 no se contienen. PR #9-#12 fusionados; no hay PR de reel abierto ni reservas sin publicar de otra sesión.
- Mi base: `origin/feat/reel-022-one-living`, en un worktree propio `.claude/worktrees/reel-023` (detached). El worktree `reel-022` (con el proyecto 022 sin commit) queda intacto; lo leo de ahí.
- **Ficha RELEÍDA hoy** (manda ella). Cambios respecto de lo que leyó la V6:
  - **City Plaza**: «contiguo al centro comercial City Plaza» ✓ (MD3 queda confirmada).
  - **Área**: «esta unidad tiene 76 m²» y «el proyecto publica esa tipología de 71 a 75»; la ficha añade «confirma en el contrato el área construida y el área privada».
  - **Renta corta**: ahora SÍ habla: «promocionado para rentas cortas — el sitio oficial presenta One Living como habilitado… y el asesor indica que se permiten. No es una garantía ni una promesa de rentabilidad: depende del reglamento de propiedad horizontal de esta torre y de la normativa y el registro turístico vigentes.»
  - **Visitas**: formulario «Solicita una visita · Visita presencial o videollamada, a tu ritmo» y «compartimos la dirección exacta tras agendar la visita» (asesor: David Figueroa Herrera).
  - **Plano**: «las dos habitaciones en extremos opuestos, con la zona social en el centro» (afina el orden del piso: balcón y sala al centro, una alcoba a cada lado). Ropas 2,10 × 0,90 m; baño social aparte.

## A. Lo que queda tras la V6

| Bloque | Libre y limpio | Libre pero bloqueado | Gastado / no se usa |
|---|---|---|---|
| Hook | — | HK1 (cifra 76), HK3 (renta corta) | HK2 (V6), HK4 (plusvalía segura) |
| Mitad | **MD2**, **MD3** | — | MD1 (V6) |
| CTA | — | CT2 («agendemos una visita») | CT1 (V6), CT3 (rentabilidad) |
| Recorrido | RC01*, RC03, RC04, RC07, RC08, RC09, RC11, RC13, RC14 (ventana 12-17,5 s) | — | usados parcialmente (se pueden repetir declarando): RC02, RC05, RC06, RC10, RC12, RC15, RC16 |

\* RC01 lleva malla negra en la baranda a 3-5 s.

LUGAR de cada toma: HK1 SALA · HK3 COCINA→SALA (arranca en la hornilla, ella en el ventanal de la sala) · MD2 SALA (la cámara, en la sala; ella al fondo, en la puerta del balcón) · MD3 SALA · CT2 BALCON. Vistos los contactos, HK3 y MD2 son el mismo rincón (la sala mirando a la corredera).

**Parejas hook→mitad→CTA:**
- **Sin ningún OK tuyo: 0** (no queda hook ni CTA libre).
- Con OK a un hook + CT2: 2 hooks × 2 mitades = **4** (HK1|HK3 · MD2|MD3 · CT2), una cifra como mucho (la 76 solo con HK1).
- **Con tres sitios distintos: 0, con cualquier OK.** El piso da dos (SALA y BALCON); el tercero (COCINA/ENTRADA) solo lo traían HK4 y CT3, que no se usan. **Cuello de botella: el CTA (solo CT2) y el hook (todos bloqueados); y el tercer sitio no existe** → te lo pregunto como cuarta decisión: si aceptas SALA · SALA · BALCON, con planos y encuadres distintos y recorridos que lleven del uno al otro.

## B. Cumplimiento (solo lo nuevo; el resto es la tabla de `proyectos/022/analisis-uso.md`)

| Toma | La toma dice | La ficha dice | Qué me hace falta saber |
|---|---|---|---|
| **HK1** | «76 metros pueden sentirse muy diferentes cuando están bien distribuidos» | 76 m² de ESTA unidad ✓; la tipología publica 71-75; «confirma el área construida y la privada» | ¿Dices 76 sin más (se leería como área de la unidad) y será la única cifra de la pieza (sin precio ni nada más con número)? |
| **HK3** | «Si quieres un apartamento para vivir o considerar para renta corta, mira esto» | promocionado para renta corta, «el asesor indica que se permiten», «no es garantía ni promesa de rentabilidad; depende del reglamento y del registro turístico» | ¿Confirmas que el reglamento de esta torre la permite (o prefieres no afirmarlo en voz)? La toma no atribuye («según el proyecto») y la ficha sí. |
| **CT2** | «Si te gusta esta vista, contáctanos y agendemos una visita» | formulario de visita presencial o por videollamada ✓ | ¿Luxur agenda visitas de ESTA unidad (para estrenar, cesión de contrato)? La ficha lo sugiere; lo dices tú. |
| **MD2** | «el balcón se convierte en una extensión de la zona social» | balcón 1,40 × 3,30 m (estrecho) | Limpia; «balcón» [0,43] a cerrar. |
| **MD3** | «dos habitaciones independientes, balcón y ubicación junto a City Plaza» | 2 alcobas en extremos opuestos ✓, balcón ✓, City Plaza ✓ | Limpia. «Balcón» [0,29], «ubicación» [0,20], «junto» [0,42] a cerrar. |

## C. Canciones (no repito: *Time*, *Return to Oasis*, *Flying Into the Sun*, *Sax for the Last Customer*, *Amélie*, *Some Say*, *Street Level*, *Somewhere inside of me*, *Utopia*, *Chillin'*)

`buscar-entrada.py --cta 33 40 --top 3` sobre las 43 + `curva.py` (RMS de 1 s cada 2 s) de las cuatro mejores libres:

| Pista | Entrada | Golpe | Curva (relativa, dB) | Lectura |
|---|---|---|---|---|
| **Deep Breath** (Chistilin) | **78,161** | 10,3 dB | meseta −8 a −11 hasta +36; **−10,8 → −19 → −23,5 → −23 (+38 a +42)** | La caída queda DENTRO de la ventana y no se recupera: pieza de ≈ 44 s. Ambient/pads, calma, introspección. Solo 14 golpes en la meseta (pocos donde cortar) y el golpe de entrada es discreto. |
| La Isla Bonita (sax 80 mix) | 179,834 | 9,7 dB | meseta −9 a −12 hasta +38; −12,6 → −17,5 → −27 → −31 → −39 (+40 a +46) | Resolución clara a +40 (pieza de ≈ 48 s) y 52 golpes; pero golpe de entrada flojo y es un segundo saxofón tras la V4. |
| Children (Armin van Buuren, piano) | 170,965 | 10,7 dB | −10 a −13 hasta +40; −12 → −29 → −42 (+42 a +44) y vuelve a −21 a +46 | Cae justo en el borde (+41) y reaparece: la caída no se queda. |
| Begin Again | 145,196 | 12,7 dB | −8 hasta +32; −25/−30 en +34-36 y **vuelve a −12 en +38** | Es un respiro, no una resolución. Descartada. |

Las demás libres puntúan menos (We Are 93,6: épico; Oceans 145,8, Overcoming…, Softly… caen al borde del rango). Licencia sin verificar y nada oído. **Recomiendo *Deep Breath* a 78,161 s**: es la única libre cuya resolución cae dentro de la ventana y se queda abajo bajo un CTA que entra a ≈ 36-37 s, y su timbre ambient contrasta con el pop acústico de la V6. Medida, NO oída. Pendiente: `medir-pista.py` y `rejilla.py` de la elegida al reservar.

## D. Mi propuesta (si dices sí a un hook y a CT2)

| Pieza | Elección | Por qué |
|---|---|---|
| Apertura | el hook (excepción declarada, como la V6) | tú lo pediste para esta propiedad sin dron |
| Hook | **HK3** si el reglamento lo permite; si no, **HK1** | HK3 (COCINA→SALA) es la toma que más avanza y arranca con la cocina; HK1 gasta la única cifra |
| Recorrido 1 | RC03 (baño sec. → alcoba, 7,2 s) → RC11 (alcoba sec., la vista y las puertas) | sentido II (fondo → balcón): el paseo termina donde está CT2 |
| Mitad | **MD3** | confirmada contra la ficha; MD2 repetiría el rincón de HK3 |
| Recorrido 2 | RC07/RC08 (alcoba ppal.) → RC09 (20-26,5 s cocina, 28-32 s sala y balcón) → RC01 (0-3 s, la vista) | la cocina de isla, la mejor imagen del rodaje y sin usar |
| CTA | **CT2** (BALCON) | «si te gusta esta vista» tras un plano de vista; voz desde 0,95 s |
| Canción | *Deep Breath* a 78,161 s | ver §C |
| Comparte con la V6 | nada que no declare | (RC12, RC15, RC05…; los recorridos usados solo si hacen falta) |

---

## Después de las respuestas (2026-10-06): lo que cambió respecto de la propuesta de arriba

- **Respuestas del usuario:** sí a HK1 (76 m²: la ficha lo dice), sí a HK3 (el reglamento permite la renta corta), sí a CT2 (Luxur agenda) y sí a SALA · SALA · BALCON.
- **Elegido:** HK3 · MD3 · CT2 (ver `combinaciones.md`). **La canción cambió:** *Deep Breath* se midió y no sirve (ver `aprendizajes.md` §1); se usó *La Isla Bonita (Saxophone 80 Mix)*, entrada 179,393 s, la segunda opción de §C.
- **El recorrido cambió:** RC01 se descartó para la vista (malla negra desde los 3 s) y se usó RC14 (balcón y cielo) + RC12 (la vista, que repite el cierre de la V6, declarado). RC07 se sustituyó por RC08 para la alcoba principal.
- **La canción cambió otra vez (rev. 3):** *La Isla Bonita* se quitó por «muy playera». Se eligió *Yeshua (Versión Piano)* con un buscador de cortes sobre los golpes de cada canción libre (ver `aprendizajes.md` §12).
