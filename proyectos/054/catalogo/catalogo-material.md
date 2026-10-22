# Catálogo — Casa en Condominio Los Bravos, La Ceja

> Rodaje de Isabella Cadavid. Material en `/Volumes/SSK SSD/Work/Propiedades Luxur/Casa - La Ceja/Videos/`.
> Catalogado el 2026-10-21 (ffprobe + whisper small). Lo usan las versiones **V36 (054)**, **V37 (055)** y **V38 (056)**.
> El reparto de quién usa qué está en [`reparto-054-062.md`](../reparto-054-062.md) y manda sobre este archivo.

## La ficha (web, 2026-10-21)

| Campo | Valor |
|---|---|
| Título | Casa en Venta en Condominio Los Bravos, La Ceja, con Lote de 500 m² |
| Negocio | **Venta** |
| Precio | **COP 1.380 M** |
| Área construida | 220 m² |
| Lote | 500 m² |
| Alcobas | 4 (una en el primer piso) |
| Baños | 4 |
| Parqueaderos | 2 + visitantes |
| Año | 2016 |
| Administración | «de bajo costo» en la web; **la voz de MD04 dice 120.000** |
| Lo que la hace especial | condominio de **solo 6 casas**, zona BBQ, área verde privada, 3 balcones, alcoba en primer piso, pet friendly |

⚠️ La web se contradice sola: en «Lo que la hace especial» dice «500 m² construidos» y en la ficha 220 m² construidos + 500 m² de lote. **Vale la ficha** (220 / 500). Si una cifra va en pantalla, esa.

## Formato de los clips

Todas las tomas de Isabella y los recorridos: **1080×1920 verticales, 60 o 59,94 fps, con audio AAC**. Sin rotación ni SAR raro (no son anamórficos: se usan tal cual).
Los dos drones son **3840×2160 a 29,97 fps con `rotation=90`** (verticales reales de 2160×3840 al rotar), **sin audio** → R21 y la nota de `dji-2997-fotograma-repetido` (`setpts=PTS*1000/1001` antes de `fps=30`).

## Hooks (`1 Hooks`)

| Código | Clip | Dura | Dice (whisper small) | Ángulo |
|---|---|---|---|---|
| HK01 | `IMG_8815.MOV` | 7,9 s | «El lujo real no es tener una torre con vista, es no tener vecinos encima.» | privacidad / anti-torre |
| HK02 | `IMG_8822.MOV` | 9,9 s | «Imagina tus mañanas en este espacio, disfrutando del aire puro del oriente antioqueño.» | sensorial / mañanas |
| HK03 | `IMG_8823.MOV` | 4,6 s | «…cansada con[n] dominios gigantes, donde tú eres un número más.» | anti-masificación |
| HK04 | `IMG_8825.MOV` | 7,0 s | «Descubre la [privacidad] de vivir en un condominio de solo seis casas.» | exclusividad |

⚠️ **HK01**: whisper oye «una torre con visa» y «vecinas encima»; lo correcto casi seguro es «vista» y «vecinos». **HK03** entra cortada («cansada con…»): es media frase, úsala solo si el montaje la arropa. **HK04**: whisper oye «la prioridad» y «condomínio»; casi seguro «la privacidad» y «condominio». Las cuatro **POR CONFIRMAR AL OÍDO** antes de la final.

## Mitades (`2 Mitad`)

| Código | Clip | Dura | Dice | Para qué sirve |
|---|---|---|---|---|
| MD01 | `IMG_8817.MOV` | 7,1 s | «Si estás cansado del ruido y del caos, esta casa puede cambiarte la vida.» | repite la idea de HK01/HK03: no las juntes |
| MD02 | `IMG_8818.MOV` | 8,9 s | «Los condominios de menos de 10 unidades privadas se valorizan diferente.» | **inversión / valorización** |
| MD03 | `IMG_8819.MOV` | 11,9 s | «No es solo una casa, es una declaración de estilo.» | estilo de vida |
| MD04 | `IMG_8820.MOV` | 14,7 s | «[Está] a los 50 minutos de Medellín con una administración de 120.000.» | **los datos que resuelven la objeción** |

⚠️ **MD02**: whisper oye «conominos»; es «condominios». **MD04**: whisper oye «Hace los 50 minutos»; la frase real empieza por «Está a 50 minutos» o «A 50 minutos». Lleva **dos cifras** (50 minutos, 120.000) → si van en pantalla, se escriben las dos (R33 del canal: cifra dicha = cifra escrita).

## CTA (`5 Cta`) — hay 8, sobran

| Código | Clip | Dura | Dice |
|---|---|---|---|
| CT01 | `IMG_8911.MOV` | 6,8 s | «Si realmente buscas tranquilidad, esta casa es para ti. Escríbeme.» |
| CT02 | `IMG_8913.MOV` | 5,5 s | «Si conectaste con esta propiedad, escríbeme.» |
| CT03 | `IMG_8914.MOV` | 7,2 s | «Si estás pensando en cambiar tu estilo de vida, ¡hablemos!» |
| CT04 | `IMG_8915.MOV` | 6,3 s | = CT01, otra toma |
| CT05 | `IMG_8917.MOV` | 6,6 s | «Si estás cansada de la ciudad y buscas tranquilidad, escríbeme.» |
| CT06 | `IMG_8918.MOV` | 8,6 s | «Si valoras espacio y privacidad, este espacio te va a encantar. Escríbeme y agendemos una visita.» |
| CT07 | `IMG_8924.MOV` | 7,5 s | «Si quieres cambiarte de estilo de vida, escríbeme.» |
| CT08 | `IMG_8925.MOV` | 4,7 s | = CT07/CT03, otra toma |

## Drones (`3 Dron`)

| Código | Clip | Dura | Qué es |
|---|---|---|---|
| DR01 | `DJI_20260330163940_0070_D.MP4` | 103,3 s | una sola toma larga |
| DR02 | `varias_tomas.MP4` | 119,7 s | **dos tomas**: el corte está en **86,05 s** (detección de escena) |

Los dos son 4K 29,97 con `rotation=90`: hay que **mirarlos y elegir el tramo** (ninguna sesión los ha medido todavía). Al ser tan largos, cada versión puede sacar su propio tramo sin pisar a las otras: **el reparto da a cada versión un rango de tiempo distinto**.

## Recorridos (`4 Recorrido`, 28 clips)

Hoja de contactos: [`hoja-recorridos.png`](hoja-recorridos.png) (7 por fila, en el orden de `indice-recorridos.txt` = RC01…RC28).
Índice con nombre de archivo y duración: [`indice-recorridos.txt`](indice-recorridos.txt).

De un vistazo, por filas de la hoja:

| Códigos | Qué se ve |
|---|---|
| RC01-RC07 | **la zona social**: sala-comedor a doble altura con entrepiso y vigas, sala de TV, el ventanal al jardín con la escalera metálica, el comedor, la cocina, el paso a la alcoba |
| RC08-RC14 | **la alcoba principal**: varios ángulos con el techo de vigas, el ventanal corredizo al balcón, el muro de piedra del baño, la vista al verde |
| RC15-RC21 | **las otras alcobas y los servicios**: alcoba con TV, alcoba 2 y 3, los clósets, el paso y las puertas, el detalle de la cocina (cafetera), la zona de ropas |
| RC22-RC28 | **el exterior**: la terraza con la pérgola y las sillas, el corredor cubierto, la **fachada desde el jardín** y el jardín con la casa (tres tomas con cielo) |

Los recorridos **se pueden repetir entre versiones** (como en el resto del canal), pero se declara en `combinaciones.md` y conviene que cada versión tenga su propio hilo.
