# 03 · Timeline — proyecto 030

> Paso 3 de 3. Una fila por plano, con los números del plan (`metraje-030.ts`). Anterior: [02-layout.md](02-layout.md). Frames de la composición a 30 fps; `desde` en segundos de la fuente.

El paseo, leído de arriba abajo: el lote entero → ella → la explanada → la loma a pie → los taludes → ella → el camino entre palmas → el portón → la vista → ella → la tarjeta. Cada plano contesta «¿por qué se ve ahora?» en su `reason`.

| plano | bloque | espacio | función | clip | `en` | `dur` | `desde` (s) | entra | voz |
|---|---|---|---|---|---|---|---|---|---|
| c01-lote | 1 | LOTE | la promesa | DR97 | 0 | 100 | 10,700 | corte | — |
| c02-hook | 2 | LOMA-CASA | el filtro | HK04 (hk04-voz.wav) | 100 | 160 | 0,200 | corte | «Si te gusta la seguridad de una parcelación, pero no te gusta sentirse encerrado, mira este lote.» 0,47-5,10 s |
| c03-explanada | 3 | EXPLANADA | la primera mirada | DR96 | 260 | 70 | 6,500 | corte | — |
| c04-loma | 3 | LOMA | estar ahí | RC01 | 330 | 131 | 1,800 | corte | — |
| c05-taludes | 3 | TALUDES | la medida | DR98 | 461 | 100 | 13,000 | corte | — |
| c06-mitad | 4 | LOMA-TALUD | el dato | MD02 (md02-voz.wav) | 561 | 138 | 0,000 | corte | «Dos accesos para un mismo lote, uno por la parcelación y otro por la vía veredal.» 0,25-4,40 s |
| c07-palmas | 5 | ENTRADA-PARCELACIÓN | la primera entrada | DR99 | 699 | 71 | 18,400 | corte | — |
| c08-porton | 5 | ENTRADA-VEREDAL | la segunda entrada | RC04 | 770 | 70 | 0,000 | corte | — |
| c09-vista | 5 | VISTA | el clímax | DR109 | 840 | 140 | 28,000 | corte | — |
| c10-cta | 6 | LOMA-CIPRESES | la invitación | CT01 (ct01-voz.wav) | 980 | 120 | 0,400 | corte | «Si quieres conocerlo, escríbeme lote y te envío toda la información.» 0,69-3,98 s |
| c11-cierre | 6 | TARJETA | el cierre | cierre-oscuro.png | 1100 | 60 | — | corte | — |

## Los golpes de la música (cada corte seco, sobre un golpe medido)

| golpe | canción (s) | dB | frame | plano que entra |
|---|---|---|---|---|
| apertura | 128,144 | 15,0 | 3 | c01-lote |
| hook | 131,388 | 20,3 | 100 | c02-hook (a corte; 1.ª sílaba +8,1 f) |
| explanada | 136,721 | 8,3 | 260 | c03-explanada |
| loma | 139,056 | 14,9 | 330 | c04-loma |
| taludes | 143,406 | 20,4 | 461 | c05-taludes |
| mitad | 146,760 | 25,9 | 561 | c06-mitad (a corte; 1.ª sílaba +7,5 f) |
| palmas | 151,353 | 8,6 | 699 | c07-palmas |
| portón | 153,720 | 9,6 | 770 | c08-porton |
| vista | 156,046 | 13,6 | 840 | c09-vista |
| CTA | 160,726 | 13,2 | 980 | c10-cta (a corte; 1.ª sílaba +8,7 f) |
| caída | 164,000 | −18,8 → −28,1 → −40,4 LUFS | 1079 | dentro de «…toda la información» |

En el audio del render (`herramientas/golpes-render.py`) los diez golpes se detectan a 0,9-1,5 f de su corte con 8,8-25,4 dB.

## El texto (frames absolutos)

| bloque | f | líneas | acento |
|---|---|---|---|
| h01 | 108-168 | «Si te gusta» · «la seguridad» · «de una parcelación,» | |
| h02 | 168-252 | «pero no te gusta sentirse» · «encerrado,» · «mira este lote.» | **encerrado,** |
| m01 | 568-624 | «Dos accesos» · «para un mismo lote,» | **Dos accesos** |
| m02 | 624-697 | «uno por la parcelación» · «y otro por la» · «vía veredal.» | **vía veredal.** |
| c01 | 989-1044 | «Si quieres conocerlo,» · «escríbeme lote» | **escríbeme lote** |
| c02 | 1044-1090 | «y te envío» · «toda la información.» | |
