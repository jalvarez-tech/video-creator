# Catálogo — Apartamento en Palmazera, La Ceja («Apto Ninson»)

> Rodaje de Isabella Cadavid. Material en `/Volumes/SSK SSD/Work/Propiedades Luxur/Apto Ninson /Videos/` (ojo al **espacio al final** del nombre de la carpeta).
> Catalogado el 2026-10-21 (ffprobe + whisper small). Lo usan **V39 (057)**, **V40 (058)** y **V41 (059)**.
> El reparto manda: [`reparto-054-062.md`](../../054/reparto-054-062.md).

## La ficha (web, 2026-10-21)

| Campo | Valor |
|---|---|
| Título | Apartamento en Venta en Palmazera, La Ceja, con Balcón y Garaje |
| Negocio | **Venta** |
| Precio | **COP 429 M** |
| Área | 60 m² |
| Alcobas | 2 |
| Baños | 2 |
| Parqueadero | 1 cubierto (celdas 73 y 74 en el sótano, según la galería) |
| Lo que la hace especial | balcón, **zona de trabajo**, cocina integral equipada, alcoba principal con baño y vestier, condominio cerrado con gimnasio, salón social y portería 24 h, a ~5 min del parque principal |

## Formato de los clips

Tomas de Isabella y recorridos: **1080×1920 verticales, 60 o 59,94 fps, audio AAC**, sin rotación ni SAR raro.
Drones: **3840×2160 a 29,97 fps con `rotation=90`** (verticales al rotar), **sin audio** → R21 + `setpts=PTS*1000/1001` antes de `fps=30`.

## Hooks (`1 Hooks`)

| Código | Clip | Dura | Dice (whisper small) | Ángulo |
|---|---|---|---|---|
| HK01 | `IMG_8709.MOV` | 7,2 s | «¿Buscas un lugar donde realmente se respire paz? Este apartamento es eso.» | calma |
| HK02 | `IMG_8713.MOV` | 6,9 s | «Este es un apartamento pensado para descansar, no para sobrevivir al caos.» | descanso |
| HK03 | `IMG_8714.MOV` | 8,9 s | **la misma frase que HK02**, otra toma | alternativa de HK02 |
| HK04 | `IMG_8734.MOV` | 9,5 s | «Sabes que el estrés a veces no viene solo del trabajo, a veces viene de donde vives…» | el estrés de la casa |

⚠️ **HK04**: la cola que whisper transcribe («No sé por qué no lo tiene») es basura de reconocimiento; hay que **oír dónde acaba la frase de verdad** y cortar ahí. **POR CONFIRMAR AL OÍDO** las cuatro.

## Mitades (`2 Mitad`) — 20 tomas, **14 frases distintas**

Las tomas repetidas son dobles del mismo texto: elige la mejor y deja constancia.

| Código | Clips | Dura | Dice |
|---|---|---|---|
| MD01 | `IMG_8711.MOV` | 5,8 s | «No es solo un apartamento, es tranquilidad todos los días.» |
| MD02 | `IMG_8712.MOV` | 6,9 s | «Vivir sin ruido, sin estrés: así se siente este espacio.» |
| MD03 | `IMG_8718.MOV` | 5,4 s | «Este es el tipo de lugar donde llegas y todo está en calma y orden.» |
| MD04 | `IMG_8720.MOV` (mejor) · `IMG_8719.MOV` | 4,6 / 4,5 s | «Ideal para quienes buscan un ambiente tranquilo y seguro para vivir.» |
| MD05 | `IMG_8722.MOV` · `IMG_8721.MOV` | 8,6 / 5,1 s | «Este apartamento no es para cualquiera: es para quien valora la tranquilidad.» |
| MD06 | `IMG_8728.MOV` | 6,9 s | «¿Cuándo fue la última vez que llegaste a casa y sentiste que de verdad descansaste?» |
| MD07 | `IMG_8729.MOV` · `IMG_8732.MOV` | 5,4 / 7,0 s | «Lo que cabe en 60 metros cuadrados en **Palmazera** te va a cambiar la idea del apartamento pequeño.» |
| MD08 | `IMG_8737.MOV` | 6,3 s | «Cocina equipada y lista: no tienes que conseguir nada extra para cocinar desde el primer día.» |
| MD09 | `IMG_8738.MOV` (mejor) · `IMG_8739.MOV` | 7,8 / 5,6 s | «Zona de trabajo separada, porque trabajar desde la cama ya no es una opción.» |
| MD10 | `IMG_8741.MOV` · `IMG_8744.MOV` | 7,4 / 7,0 s | «60 metros cuadrados con todo lo que necesitas, sin pagar por lo que no vas a usar.» |
| MD11 | `IMG_8742.MOV` · `IMG_8743.MOV` | 4,3 / 3,5 s | «Un balcón para ese cafecito de la mañana.» |
| MD12 | `IMG_8753.MOV` (entera) · `IMG_8749.MOV` | 11,1 / 5,1 s | «Un espacio bien distribuido en un conjunto tranquilo donde la mayoría son parejas y adultos.» |
| MD13 | `IMG_8797.MOV` | 3,6 s | «Contamos con garaje para que tu carro no duerma en la calle.» |
| MD14 | `IMG_8798.MOV` | 4,9 s | «Contamos con parqueadero privado para que tu carro o moto esté protegido.» |

⚠️ whisper oye «Puel Mazera» / «Palmacera» en MD07 (es **Palmazera**), «Graje» en MD13 (**garaje**) y «Parque Aero Privado» en MD14 (**parqueadero privado**). **MD07 y MD10 llevan la cifra 60 m²** → si va en pantalla, se escribe (R33).

## CTA (`5 Cta`) — solo 3: **una por versión, sin repetir**

| Código | Clip | Dura | Dice |
|---|---|---|---|
| CT01 | `IMG_8723.MOV` | 4,8 s | «Escríbeme y te cuento por qué este lugar se siente diferente desde que entras.» |
| CT02 | `IMG_8726.MOV` | 8,8 s | «Agenda tu visita y vive la experiencia de la tranquilidad en persona.» |
| CT03 | `IMG_8727.MOV` | 4,6 s | «Si estás buscando paz y comodidad, escríbeme y te doy todos los detalles.» |

## Drones (`3 Dron`, 10 clips)

Índice: [`indice-drones.txt`](indice-drones.txt) · hoja (parcial): [`hoja-drones.png`](hoja-drones.png).
Se ve el **edificio en ladrillo** desde el aire, la **vista al casco urbano de La Ceja con las montañas** y la zona verde del conjunto. Ninguno está medido: la versión que use uno mira el clip y anota el tramo.

| Código | Clip | Dura |
|---|---|---|
| DR01…DR10 | `DJI_…0077`, `0078`, `0079`, `0080`, `0081`, `0082`, `0083`, `0084`, `0088`, `0089` | 6,4 · 21,4 · 9,9 · 12,5 · 7,4 · 17,1 · 16,0 · 7,0 · 13,0 · 11,8 s |

## Recorridos (`4 Recorrido`, 28 clips)

Hoja: [`hoja-recorridos.png`](hoja-recorridos.png) (7 por fila = RC01…RC28, en el orden de [`indice-recorridos.txt`](indice-recorridos.txt)).

| Códigos | Qué se ve |
|---|---|
| RC01-RC07 | cocina integral (gas, microondas, nevera), **alcoba principal** con varios ángulos y la ventana a la ciudad, el pasillo de la cocina |
| RC08-RC14 | **sala-comedor** con el ventanal, el **balcón** con la vista a los edificios y el verde, el comedor, el pasillo, la sala con el TV y las plantas, la cocina |
| RC15-RC21 | sala desde otro ángulo, **el balcón abierto**, el rincón de trabajo y la estantería, el pasillo (sale **un gato**), **los dos baños** (uno con mueble de madera y plantas) |
| RC22-RC28 | baños en detalle (ducha de vidrio), **la alcoba 2 con el escritorio y el computador** = la «zona de trabajo» de la ficha, el clóset de puertas corredizas |

Los recorridos se pueden repetir entre versiones; se declara.
