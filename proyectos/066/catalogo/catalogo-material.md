# Catálogo del material — Lote en San Cristóbal (EOLIA Condominio)

> Rodaje del 2026-07-18 (drones) y de Isabella en el lote. Disco: `/Volumes/SSK SSD/Work/Propiedades Luxur/Lote - San Cristobal/Videos/` (no entra en git).
> Catalogado el 2026-10-24: `ffprobe` de los 40 archivos, transcripción con whisper `small --palabras` (en `transcripciones/`), voz medida por energía (`limites-voz.py`) y hojas de contacto de todo.
> **El reparto de las tres piezas está en [`../reparto-066-068.md`](../reparto-066-068.md) y manda.**

## La propiedad (ficha de la web, 2026-10-24)

[propiedadesluxur.com · Lote en venta en San Cristóbal, Medellín, de 5.170 m²](https://propiedadesluxur.com/es/propiedades/medellin/san-cristobal/lote-en-venta-en-san-cristobal-medellin-de-5170-m2)

| Dato | Valor |
|---|---|
| Negocio | **Venta** (la ficha no habla de renta) |
| Precio | **COP 797 M** |
| Área | **5.170 m²** («más de 5.170 m² para construir») · 1 piso · lote campestre |
| Lugar | Medellín · corregimiento **San Cristóbal** · vereda **La Ilusión** · proyecto **EOLIA Condominio** (dirección exacta «tras agendar la visita») |
| Lo que dice el proyecto | lotes campestres **con matrícula independiente y financiación directa**; construcciones tradicionales que respetan el paisaje; proyecto planificado, organizado y sostenible |
| Servicios | **acueducto veredal** (el único mencionado) |
| Entorno | topografía suave · potreros con cercas vivas, bosque nativo, pinos · vistas abiertas a Medellín y el Valle de Aburrá · «vía pavimentada del condominio» (pie de foto) |
| Distancia | «a pocos minutos de Medellín» (SIN cifra) |
| Gastos de compra | ≈ 19,2 M (2,41 %): estimación de la web, no es del vídeo |

**Lo que la web NO dice y por tanto el vídeo no afirma por su cuenta:** energía, alcantarillado, uso del suelo, normativa de construcción, estado jurídico más allá de «matrícula independiente», condiciones de la financiación, distancias ni tiempos. La ficha menciona «potencial de valorización» sin cifra: **no se promete valorización**.

### Dos cifras de Isabella que NO coinciden con la ficha (se declaran, no se corrigen)

1. **«5.000 metros»** (o «5 mil metros»): la ficha dice **5.170 m²**. Ella redondea hacia abajo (la ficha dice «más de 5.170»). Los subtítulos son lo que ella dice; el caption, la ficha y la portada llevan 5.170 m².
2. **«a solo 20 minutos de Medellín»** (CT01): la web solo dice «a pocos minutos». Es una cifra suya que no está en la ficha: se pregunta al usuario antes de la final.

## Lo que traen los archivos

Todo está en `1080×1920` vertical de verdad (sin SAR anamórfico, rotación 0), `bt709`, con audio AAC; 30 fps salvo los marcados `29,97`. **Los MOV de Isabella NO son HLG** (a diferencia de las casas): sin tone-map, solo se escalan. Los drones son `3840×2160` con `rotation=90` (verticales de verdad) o `rotation=0` (apaisados), SDR, 29,97 fps, sin audio: hay que corregir el 29,97 con `setpts=PTS*1000/1001` antes de `fps=30` (memoria `dji-2997-fotograma-repetido`).

### Hooks (`videos/1 Hooks`) — Isabella camina hacia cámara por el prado

| Código | Clip | Dura | Voz (s0→s1, energía) | Dice (whisper small) | Dónde está / aviso |
|---|---|---|---|---|---|
| HK01 | `IMG_0949` | 8,3 s (29,97) | 0,34 → 7,61 | «En Medellín se construyen miles de apartamentos cada año, lotes como este de 5.000 metros, con estas dimensiones, ninguno.» | ladera de pasto seco con pinos al fondo; lleva la cifra |
| HK02 | `IMG_0951` | 5,1 s | 0,48 → 4,45 | «Si estás buscando lo más barato de la zona, con todo respeto, este no es para ti.» | junto a los pinos, el valle al fondo; **limpia** |
| HK03 | `IMG_0952` | 4,5 s | 0,16 → 4,10 | «El verdadero status no es la fachada que muestras, es la prioridad.» | whisper oye «prioridad» donde HK04 oye «privacidad»: es la misma frase (toma fallida) |
| HK04 | `IMG_0953` | 5,3 s | **~0,36** → 4,68 (hay respiración desde 0,0; la voz sube en el f11) | «El verdadero estatus no es la fachada que muestras, es la privacidad que puedes tener.» | prado con un coche blanco al fondo; **limpia** |
| HK05 | `IMG_0959` | 9,8 s | 0,60 → 7,99 | «En Medellín se construyen miles de apartamentos cada año, lotes de 5.000 metros, con esta vista, muy pocos.» | loma con montañas al horizonte; **limpia**; lleva la cifra; 3 pausas (1,04 · 4,36 · 7,28 s) |
| HK06 | `IMG_0961` | 9,1 s | 0,46 → 7,07 | la misma frase que HK05 | junto a pinos altos, el valle de fondo; **limpia**; más corta |
| HK07 | `IMG_0978` | 5,4 s | 0,48 → 4,61 | «Imagina construir tu casa campestre cerca de la ciudad y alejada del ruido.» | loma abierta, nubes; **limpia** |
| HK08 | `IMG_0979` | 5,4 s | 0,84 → 5,37 (**sin aire después**) | «Con lo que mucho es pagar un apartamento apretado en el Poblado, aquí construyó…» | whisper confuso (**dudosa**) y la voz no acaba limpia |
| HK09 | `IMG_0980` | 5,4 s | 0,17 → 4,83 | «Con lo que muchos compraron un apartamento en el Poblado, aquí compra 5 mil metros de montaña.» | whisper confuso (**dudosa**): ¿«pagan por» o «compraron»?; lleva la cifra |

### Mitades (`videos/2 Mitad`)

| Código | Clip | Dura | Voz (s0→s1) | Dice (whisper small) | Dónde está / aviso |
|---|---|---|---|---|---|
| MD01 | `IMG_0944` | 7,7 s (29,97) | 0,05? → 6,96 (viento de fondo −31/−38 dB) | «Aprendí a reconocer al comprador serio desde la primera frase. No habla de metros, habla de lo que quiere dejar de sentir.» | pasto seco, pinos; **limpia**; la voz sube de verdad hacia 0,5 s |
| MD02 | `IMG_0973` | 6,7 s | 0,10 → 6,08 | «Imagina que el éxito por fin se siente como se ve: en silencio, con la montaña al frente y sin nadie que te apure.» | loma con la cordillera al fondo; **limpia**; poco aire antes |
| MD03 | `IMG_0975` | 6,6 s | 0,50 → 6,24 | «Hay una versión de tu vida donde ya no tienes que salir a buscar paz los fines de semana porque ya vives dentro de ella.» | colina con pinos, nubes; **limpia** |
| MD04 | `IMG_0976` | 4,7 s (29,97) | 0,39 → 4,02 | «5.000 metros cuadrados que tú y tu familia disfrutarán.» | colina; lleva la cifra |
| MD05 | `IMG_0984` | 4,3 s | 0,74 → 3,35 | «5.000 metros, infinitas posibilidades.» | lleva la cifra; **es la primera mitad de CT05** |

### CTA (`videos/5 Cta`)

| Código | Clip | Dura | Voz (s0→s1) | Dice (whisper small) | Dónde está / aviso |
|---|---|---|---|---|---|
| CT01 | `IMG_0963` | 6,2 s (29,97) | 0,34 → 5,45 (pausas 3,29 · 4,24 s) | «Tu **refugio** privado, a solo 20 minutos de Medellín, escríbeme y agendemos una visita.» | **dudosa**: whisper oye «Tu voz que privado» y «hajandemos»; «refugio» y «agendemos» son lo que la frase pide, SIN CERRAR al oído; «20 minutos» no está en la ficha |
| CT02 | `IMG_0964` | 3,3 s | 0,43 → 2,72 | «Si deseas más información, haz clic en el enlace.» | camino de tierra entre árboles; **limpia** |
| CT03 | `IMG_0966` | 3,8 s | 0,44 → 3,15 | «…haz clic en el link así.» | camino con cercas; el «así» es un gesto: no se usa |
| CT04 | `IMG_0967` | 3,8 s | 0,45 → 3,31 | «Si deseas más información, haz clic en el enlace.» | camino con cercas y ganado; **limpia**; la mejor de las tres «enlace» |
| CT05 | `IMG_0986` | 5,1 s | 0,46 → 4,65 | «5.000 metros, infinitas posibilidades. Haz clic en el enlace y hablemos.» | loma, nubes; lleva la cifra |

### Recorrido (`videos/4 Recorrido`) — paneos con el móvil en el prado, **sin voz útil** (el audio es de gente alrededor: se silencia)

| Código | Clip | Dura | Qué se ve |
|---|---|---|---|
| RC01 | `IMG_0941` | 11,8 s | desde el prado: cielo azul con nubes, el valle y la ciudad al fondo; entra un ciprés grande por la derecha |
| RC02 | `IMG_0954` | 11,4 s (29,97) | el grupo de pinos desde el pasto; nubes más oscuras al final |
| RC03 | `IMG_0955` | 5,3 s | cielo con nubes y la cordillera sobre los árboles (alguien comenta de fondo) |
| RC04 | `IMG_0956` | 5,3 s | el árbol con la mesa de madera y la bañera azul → se abre al valle (la risa de fondo) |
| RC05 | `IMG_0957` | 6,9 s | el árbol con el comedero → el valle con la ciudad y los pinos |
| RC06 | `IMG_0968` | 13,7 s (29,97) | paneo largo del prado con cielo muy dramático hasta los árboles secos de la izquierda (en el audio ella repite «imagina que el éxito…») |
| RC07 | `IMG_0969` | 9,6 s (29,97) | paneo de izquierda a derecha por las lomas, nubes con claros azules |

### Dron vertical (`videos/3 Dron`, 3840×2160 con `rotation=90` → 2160×3840)

| Código | Clip | Dura | Qué hace |
|---|---|---|---|
| DR01 | `DJI_…0087_D` | 27,7 s | **el reveal**: arranca sobre el camino en curva con el ciprés, **sube y abre Medellín al horizonte** (≈ 8-22 s) y baja a la loma |
| DR02 | `DJI_…0088_D` | 13,0 s | la ciudad al horizonte, quieta, y luego cabecea hacia el pasto y el bosque |
| DR03 | `DJI_…0089_D` | 10,3 s | del camino con los pinos al horizonte con cielo azul |
| DR04 | `DJI_…0090_D` | 98,5 s | paso largo: cenital del lote y sus cercas · oblicuo con la ciudad (≈ 12-36 s) · cenital del bosque y el camino |
| DR05 | `DJI_…0091_D` | 121,2 s | otro paso: cenital · oblicuo con cielo azul y la ciudad (≈ 8-36 s) · cenital del lote · al final el valle y el cielo (≈ 104-112 s) |
| DR06 | `DJI_…0092_D` | 119,4 s | **la curva del camino de tierra alrededor del grupo de cipreses**, oblicua con cielo y nubes (≈ 8-40 s) y cenital (≈ 76-100 s) · al final el valle |

Los otros cuatro drones están en `Dron/Horizontales` (`0083`-`0086`, `3840×2160` apaisados, `rotation=0`): **no se usan** (el usuario los dejó fuera de la carpeta `videos`; encuadrar un 16:9 a 9:16 es un zoom ×3,2 de la imagen).
