# 01 · Plan narrativo — proyecto 071 · Suite Go Living (El Poblado, Medellín), V52 del registro («Tu inversión no debería convertirse en otro trabajo → los operadores»)

> Paso 1 de 3. Escrito con el reparto aprobado por el usuario el 2026-11-07 (`proyectos/070/reparto-070-075.md`, que manda), el catálogo del rodaje (`proyectos/070/catalogo/catalogo-material.md`) y lo aprendido en la 070 (`proyectos/070/aprendizajes.md`), de la que este proyecto copia el andamio (puerta, receta de normalizado, herramientas).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | «Ayúdame a hacer 6 videos» de la suite hotelera en venta; aprobado el reparto y la prueba de la 070 («Sí, monta 071-075»). Este es el segundo (**V52 / 071**). |
| La propiedad | Suite hotelera en **venta** en Go Living Suites, El Poblado: 28,5 m², piso 9, vista al oriente, se vende a puerta cerrada (con muebles y enseres), matrícula independiente, operación hotelera activa en el edificio. **El precio no consta** (no va en el reel). |
| Material | `Suite Go Living/Videos/` del SSD, copiado a `proyectos/071/original/` con el CÓDIGO del catálogo como nombre: HK08 `0e8f0565`, MD06 `f0dc3dea`, CT09 `c10ccc56`, DR08 `b8717161`, RC09 · RC03 · RC08 · RC11 · RC05 · RC06 · RC07 · RC10 · RC13 (los que usa el plan: RC09, RC03, RC08, RC05, RC10 y RC13). Todo iPhone 4K HEVC HLG con rotación −90 → BT.709 con VideoToolbox. |
| Composición | `Recorrido071` · 1080×1920 · **30 fps** · 950 f (**31,7 s**). Clips normalizados a 1296×2304 y 30 fps. |
| Formato | 9:16 vertical · `recorrido-luxur` (EXTERIOR · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA) |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor); **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` |
| Destino | Reels · Shorts · TikTok · y la versión con ficha para anuncios (1:1), cuando haya precio |
| Presentadora | Isabella Cadavid |

## El ángulo: «Tu inversión no debería convertirse en otro trabajo → los operadores»

**La idea en una línea:** quien invierte en una suite de renta corta no quiere un segundo empleo; el edificio ya tiene **operadores turísticos** a los que se puede delegar la operación (el anuncio: «delegar la operación a alguno de los operadores hoteleros presentes actualmente en el edificio»). El hook dice lo que el inversor rechaza, la mitad pone nombre a la solución y el CTA invita a hablar.

**Lo que NO se dice ni se escribe, y la puerta lo comprueba:** valorización, rentabilidad ni ganancia; precio ni cifras; qué dice el POT ni que la suite lo cumple.

## Promesa y CTA

- **Promesa (primeros 2,9 s):** la torre del edificio entre las hojas de monstera y platanillo, con el cielo nublado, **sin texto ni voz** (regla fija); golpe de la canción en el f3. Isabella entra disolviendo y su imagen es opaca en el f86.
- **Acción final:** «hablemos y conoce tus opciones de inversión»: UNA acción; el enlace lo cierra la tarjeta (`PropiedadesLuxur.com`).

## Escenas (los seis bloques)

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-2,9 | El edificio | la promesa | la torre | DR08 0,50-3,37 s · solo música: golpe de 10,2 dB en el f3 |
| 2 | 2,9-6,9 | Hook | lo que se rechaza | Isabella | HK08: de pie frente al ventanal, la ciudad detrás · «Tu inversión no debería convertirse en otro trabajo.» (disolvencia que acaba en un golpe de 11,5 dB) |
| 3 | 6,9-15,2 | Recorrido | lo que ya está puesto | el escritorio | de la cama al escritorio (RC09) → el escritorio y el televisor (RC03) → el mueble con su planta y su cortina (RC08) · solo música, tres cortes secos en golpes de 11,6 · 10,8 · 14,7 dB |
| 4 | 15,2-19,7 | Mitad | la solución | Isabella | MD06: frente al ventanal con la cortina gris · «Una suite hotelera con operadores turísticos listos para ti.» (a corte en un golpe de 13,3 dB) |
| 5 | 19,7-26,3 | Recorrido | cómo se vive | la vista | la cama con su cabecero (RC05) → de la cama a la ventana (RC10) → la ciudad desde el ventanal (RC13, el plano más largo) |
| 6 | 26,3-31,7 | CTA | invitar | Isabella | CT09: sentada en la silla del escritorio · «Hablemos y conoce tus opciones de inversión.» → funde a negro → tarjeta con el logo y la web |

## Decisiones tomadas (y las descartadas)

- **Hook = HK08.** La voz habla de **0,90 a 4,26 s** (perfil de energía; `limites-voz.py` daba 4,18 y la cola débil de «trabajo», −31 a −37 dB, llega hasta 4,26) y el clip dura 4,47 s (134 f): **solo hay 6,2 f entre la última palabra y el final del clip**. Entra disolviendo (`desde` 13 f; primera palabra a los 14 f del golpe) y su plano dura exactamente lo que da el clip (121 f). Consecuencia: la música solo tiene 4 f para subir antes del golpe del paseo (excepción declarada en la puerta, 4b).
- **Mitad = MD06.** La voz habla de **0,53 a 4,10 s**; el clip dura 4,50 s (135 f) y se usa ENTERO: entra a corte en el golpe de 13,3 dB (primera palabra a los 15,9 f), tiene 12 f de aire tras la última palabra, y por eso **el bloque 5 entra también a corte** (con una disolvencia, la última palabra caía dentro: fallo de la puerta, sección 3).
- **CTA = CT09.** La voz habla de **0,58 a 2,96 s** (la más corta de las tres: 2,4 s): entra a corte (`desde` 5 f; primera palabra a los 12,4 f del golpe). El plano dura 100 f.
- **Recorrido = un solo cuarto, sin repetir plano con la 070:** RC09 2,80-5,10 · RC03 2,20-5,30 · RC08 2,10-5,03 · RC05 5,00-7,00 · RC10 0,00-2,17 · RC13 2,00-4,43. La 070 usa RC12 · RC02 · RC01 · RC06 · RC04 · RC07 · DR02: **ningún segundo compartido**. La vista son DOS ventanas distintas (RC10 → RC13) porque no hay otro plano de ventana de más de 3 s que no sea el RC07 de la 070.
- **Canción: «Heaven on Earth»** (lounge/chill; repetida de la V9/025 y la V38/056, otras propiedades, declarada). Entrada en 178,043 s (golpe de 10,2 dB; el mismo que usó la 056), meseta de −13 LUFS (se BAJA ≈ 1,5 dB) y **caída desde 207,5 s, justo cuando acaba la toma del CTA**: la cola queda bajo la tarjeta. La búsqueda con las duraciones que piden estas voces (hook 117-122 f, mitad 128-135 f) solo dio solución con esa entrada: probando entradas de 160 a 177 s no hubo ninguna, y con una vista de 100 f en el bloque 5 tampoco. Tiene un **remanso** (187,3-192,0 s) que cae en el paseo.
- **Acentos:** uno por toma, a más de 10 s entre sí: «otro trabajo.» (lo que se rechaza), «operadores» (lo que se ofrece) y «opciones» (la acción). Los acentos largos («operadores turísticos», «opciones de inversión.») salían encogidos al 85-89 %: se partieron.
- **Excepción declarada de la puerta:** hook y mitad son ambas «de pie frente al ventanal» (el reparto aprobado las junta); cambian el encuadre (el hook, con la cama al pie y la ciudad entera; la mitad, a un lado de la ventana con la cortina).

## Lo que queda por confirmar al oído (R31)

1. **«Una suite hotelera»** (MD06, ≈ 15,8-17,2 s del vídeo): whisper oyó «Un asfito atelera» (confianza baja); de «con operadores…» en adelante lo entiende con confianza alta.
2. **«todo» en el hook** (HK08, ≈ 5,5 s): el corte final de whisper oye «convertirse en todo otro trabajo» y los parciales «en otro trabajo»; se pintó «en otro trabajo».
