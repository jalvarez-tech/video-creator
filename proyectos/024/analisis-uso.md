# 024 · One Living (Envigado) — análisis previo a elegir (2026-10-06)

> Primer entregable de la V8 (tercer reel de One Living). Catálogo del material: `proyectos/022/catalogo-material.md` (no se rehace). Lo medido lo digo; lo que no pude verificar, también. **Estado: a la espera de las decisiones del usuario sobre el CTA y la canción; nada reservado todavía.**

## 0. Dónde estoy (lo leído, 2026-10-06)

- `origin` = `git@github.com:jalvarez-tech/video-creator.git` (el del registro). El checkout es el del estudio (`/Users/nicecode/Work/jalvarez/video-creator`, rama `feat/reel-019-altura-sin-torre`, 7 archivos modificados que no son míos: no los toco). Registro leído en las 6 ramas remotas de reel/main y en los árboles de trabajo: el más avanzado es **`origin/feat/reel-023-sala-y-balcon` (e97790f)**: V1-V7, V7 «en prueba», **V8 · 024 libre**. `reel-022` lleva V1-V6; `main`, `reel-019`, `reel-020` y `reel-021` van atrasados. Los PR #1-#12 están fusionados; no hay PR de reel abierto ni reservas sin publicar de otra sesión (los worktrees `reel-022` y `reel-023` traen el mismo registro que su rama).
- Base de mi rama: `origin/feat/reel-023-sala-y-balcon`, en un worktree propio `.claude/worktrees/reel-024` (se crea al reservar). Los worktrees `reel-022` y `reel-023` (proyectos 022 y 023 SIN commit) quedan intactos; los leo de ahí.
- Material, música y skills de estudio: presentes (`/Volumes/SSK SSD/…/One Living…/Videos/`, `…/Propiedades Luxur/Music/`, `.claude/skills/recorrido-luxur` y `guion-luxur`). Disco: 52 GB libres.

## A. Lo que queda tras la V6 y la V7

| Bloque | Libre y limpio | Libre pero condicionado | Gastado / no se usa |
|---|---|---|---|
| Hook | — | **HK1** (cifra 76: el usuario ya la permitió) | HK2 (V6), HK3 (V7), HK4 (plusvalía segura) |
| Mitad | **MD2** | — | MD1 (V6), MD3 (V7) |
| CTA | **ninguno** | repetir CT1 (V6) o CT2 (V7), entera o recortada | CT3 (rentabilidad) |
| Recorridos | los 16 siguen disponibles; lo gastado por la V6/V7 se resta (ver §D) | | |

**Parejas hook → mitad → CTA: 1 pareja de hook y mitad (HK1 · MD2) × 3 posibles CTA = 3 ternas.** Sitios de Isabella (donde está ELLA): HK1 SALA (ella cruza la sala hacia la cámara, que está en la puerta del balcón) · MD2 BALCON (ella en el balcón; la cámara, en la sala: es el contraplano de HK1) · CT1 ALCOBA-PPAL o CT2 BALCON.
- HK1 · MD2 · **CT1** (entera o recortada): SALA · BALCON · ALCOBA-PPAL = **3 sitios distintos**, 1 cifra (76), sentido I (entrada → balcón → alcobas).
- HK1 · MD2 · **CT2**: SALA · BALCON · BALCON = **2 sitios** (MD2 y CT2 son los dos con ella en el balcón); hay que volver a pedir el visto bueno de «dos sitios» que el usuario dio una vez en la V7.
**El cuello de botella es el CTA** (ninguno limpio) y, esta vez, también el hook y la mitad (uno solo de cada).

## B. Cumplimiento (solo lo nuevo; el resto es `proyectos/022/analisis-uso.md` §B y `proyectos/023/analisis-uso.md` §B)

| Toma | La toma dice | La ficha dice | Qué falta |
|---|---|---|---|
| HK1 | «76 metros pueden sentirse muy diferentes cuando están bien distribuidos» (voz 0,36-4,55 s) | 76 m² de ESTA unidad ✓ (la tipología publica 71-75; «confirma en el contrato el área») | OK del usuario ya dado (2026-10-06). Será la ÚNICA cifra. «pueden» [0,46] a cerrar |
| MD2 | «Aquí el balcón se convierte en una extensión de la zona social» (voz 0,65-4,34 s) | balcón 1,40 × 3,30 m, zona social en el centro del plano ✓ | Limpia (opinión de diseño). «balcón» [0,43] a cerrar |
| CT1 entera | «Estamos en la Loma del Escobero, en Envigado. Si quieres más información, contáctame.» (voz 0,66-5,37 s) | Loma del Escobero, Envigado ✓ | «Escobero» sigue sin cerrar (medida más /a/ que /o/, sin oír; la V6 final la lleva) |
| CT1 recortada | «Si quieres más información, contáctame.» (voz 3,52-5,37 s = 1,85 s; entre las dos frases hay 0,38 s de silencio real, 3,14-3,52 s, con un clic de 40 ms en 3,40 s) | — | Quedan 5 palabras: «Si» [0,60], «quieres» [0,97], «más» [0,95], «información» [0,70], «contáctame» (la última sílaba «me/mi» con confianza 0,05-0,57: se mide con `formantes.py`). Ninguna duda de nombres propios |
| CT2 | «Si te gusta esta vista, contáctanos y agendemos una visita.» | formulario de visita presencial o videollamada ✓; Luxur agenda (OK dado) | «contáctanos» [0,34] y «agendemos» [0,35]: cerradas por vocal en la V7, sin oír |
| CT3 | «…maximizar tu rentabilidad, te explico cómo» | — | NO (promete rentabilidad); recortada no cabe: la palabra está en medio |

## C. Canciones

Libres (no usadas, no reservadas), no playeras. Detector de golpes = el de `medir-pista.py`; caída medida en LUFS por tramos de 5 s (`lufs-caida.py`): ≥ 9 dB en 5 s y ≥ 20 en 10 s desde el instante en que cae. Buscador de cortes = `rejilla-cortes.py` reescrito como programación dinámica (validado contra la V7: *Yeshua* cae a 452,75 s y entra en 424,837 s; *Isla Bonita* cae a 219,0 s) con la estructura de la V7 (4 planos de paseo · mitad · 3 planos · vista · CTA) y la **mitad de MD2** (par de golpes a 131-154 f, no 158-167: su voz acaba antes), la vista de ≥ 3 s, disolvencias ≥ 9 dB y cortes secos ≥ 7,4 dB.

| Canción (catálogo) | Cae a (LUFS: antes → +5 s → +10 s) | Soluciones (CTA a ≤ 2,5 s / ≤ 4,5 s de la caída) | Golpe más débil (disolv. / seco) | Plano más corto | Pulso |
|---|---|---|---|---|---|
| **Emilio Piano ft. Lucie – Maison** (neoclásico / piano †, «hogar, intimidad, romanticismo, nostalgia») | 168,5 s: −17,6 → −30,1 → silencio (12,5 dB) | 54 / 54 | 10,3 / 8,1 dB | 59 f (2,0 s) | no (por golpes medidos) |
| **ByErik – desolate (Slowed)** (lo-fi slowed + reverb †, «soledad, melancolía») | 118,0 s: −11,6 → −20,8 → −31,8 (9,2 / 20,2) | 418 / 2.533 | 9,1 / 10,4 dB | 67 f (2,2 s) | no: 62 % de los fuertes a ≤ 15 ms de 0,7155 s, desvío 106 ms (la corchea, 79 %, desvío 25,6 ms) |
| **Heaven on Earth** (lounge / chill †, «sereno, cálido, celestial») | 209,5 s: −13,8 → −24,1 → silencio (10,3 dB); la pista acaba a 213,0 s: la música se acaba 3,5 s después de caer | 2.920 / 5.656 | 10,4 / 8,1 dB | 73 f (2,4 s) | no (63 %, desvío 49 ms) |
| Nils Frahm – Familiar | −40,4 → −51,3 → −57,2 (10,9 / 16,8): NO llega a 20 dB | 149 | 11,2 / 12,4 | 78 f | no |
| Ivory Skyline Reverie (lounge) | 194,5 s, la pista acaba a 197,0 s | 4.678 | 9,3 / 15,8 | 80 f | — (se parece a *Heaven*) |
| Resto (Overcoming…, Becoming I, Softly I, Tony Anderson, Einaudi Experience/Fly, Silver Skies, In This Together, Light Fills, Fortitude, Spring is Coming, Here For You, Luxury, Cornfield, Nils Frahm Says) | o no tienen caída completa o dejan 0 soluciones (Spring is Coming cae solo 5,4 dB en 5 s) | | | | |

Extractos (para oír el género): `1-maison-136s-a-175s.mp3`, `2-desolate-80s-a-126s.mp3`, `3-heaven-on-earth-173s-a-213s.mp3`. La caída de las tres es un fundido que no se recupera (`curva.py` de los últimos 20-30 s: baja sin volver).
No oída ninguna: el género sale del catálogo (†: inferido, sin identificar).

## D. Propuesta (a falta de las dos respuestas)

| Pieza | Elección | Por qué |
|---|---|---|
| Apertura | el hook (excepción declarada, `ABRE_CON_EL_HOOK`) | pedido para esta propiedad (sin dron) |
| Hook | **HK1** (SALA, 5,30 s; voz 0,36-4,55 s) | el único libre; `desde` ≈ 4 f (primera palabra a ≈ 6,8 f); como dura 0,7 s menos que HK3, el golpe del paseo cae a ≈ 4,9-5,1 s, no a 5,5 |
| Paseo (sentido I: cocina → sala → balcón) | RC05 0-3,0 s (isla y estufa) · RC09 22,5-25,5 s (la isla de cerca) · RC06 13,5-15,5 s (sala y corredera) · RC09 28-31 s (la corredera y el balcón) | todo recorrido sin usar o tramo libre; RC09 28-31 es el plano de la sala hacia el balcón que la V7 dejó |
| Mitad | **MD2** (BALCON) | la única libre; cierra el paseo en el balcón |
| Bloque 5 (alcobas) | RC09 10,5-13 s (vestier con cajones) · RC03 0-2,5 s (baño con ducha de vidrio) · RC07 7-8,6 s (alcoba principal) · **vista: RC08 0-3,3 s** (cielo y ciudad desde el ventanal de la alcoba principal) | la vista ≥ 3 s sin repetir el cierre de la V6 y la V7 (RC12) y que desemboca en la alcoba de CT1; RC08 solo la usó la V7 en 4,2-6,8 s: mismo clip, otros fotogramas. Alternativas: RC13 0-3,2 s (ventanal con montañas) o RC09 28-32 s |
| CTA | a decidir (§B) | |
| Canción | a decidir (§C) | |
| Lo que comparte con la V6 y la V7 | solo el clip de RC08, RC09, RC05, RC06 (otros tramos); ni un segundo de cierre repetido | |
