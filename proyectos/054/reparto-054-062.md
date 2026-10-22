# Reparto fijo — 9 reels de propiedad (054-062 · V36-V44)

> Escrito el 2026-10-21 por la sesión madre, **antes** de abrir ninguna sesión de montaje.
> Encargo: «3 vídeos por propiedad, con el vídeo de la ficha y el de redes».
> **Este archivo manda.** Si una sesión quiere salirse de su terna, lo pregunta al usuario; no se la quita a otra.
> El material y los códigos están en el catálogo de cada propiedad:
> [054 La Ceja](catalogo/catalogo-material.md) · [057 Palmazera](../057/catalogo/catalogo-material.md) · [060 Quadrato](../060/catalogo/catalogo-material.md).

## Por qué un reparto

Las tres versiones de una misma propiedad se montan **a la vez y en sesiones distintas**. Hook, mitad y CTA son
**exclusivos**: dos reels del mismo inmueble con la misma frase de Isabella se ven como el mismo vídeo repetido.
Los **recorridos sí se pueden repetir** (es lo normal en el canal), pero se declara en `combinaciones.md` y cada
versión busca su propio hilo. La canción es exclusiva entre los nueve.

## La tabla

| Proy. | V | Propiedad | Ángulo | Hook | Mitad | CTA | Canción reservada |
|---|---|---|---|---|---|---|---|
| **054** | V36 | Casa Los Bravos, La Ceja | **Privacidad**: el lujo es no tener a nadie encima | HK01 `IMG_8815` | MD04 `IMG_8820` (50 min · admin 120.000) | CT06 `IMG_8918` | *Luxury, Elegance, Refined* |
| **055** | V37 | Casa Los Bravos, La Ceja | **Las mañanas**: aire puro del oriente, estilo de vida | HK02 `IMG_8822` | MD03 `IMG_8819` | CT03 `IMG_8914` | *Spring is Coming* |
| **056** | V38 | Casa Los Bravos, La Ceja | **Solo 6 casas**: exclusividad que se valoriza | HK04 `IMG_8825` | MD02 `IMG_8818` | CT01 `IMG_8911` | *Heaven on Earth* |
| **057** | V39 | Palmazera, La Ceja | **Que se respire paz**: llegar y descansar de verdad | HK01 `IMG_8709` | MD06 `IMG_8728` | CT02 `IMG_8726` | *Silver Skies Cinematic Piano* |
| **058** | V40 | Palmazera, La Ceja | **60 m² que rinden**: pequeño no es poco | HK02 `IMG_8713` | MD07 `IMG_8729` | CT01 `IMG_8723` | *Ivory Skyline Reverie* |
| **059** | V41 | Palmazera, La Ceja | **El estrés no viene solo del trabajo**: vivir y trabajar bien | HK04 `IMG_8734` | MD09 `IMG_8738` (zona de trabajo) | CT03 `IMG_8727` | *Light Fills the Room* |
| **060** | V42 | Quadrato, Laureles | **Tu plata en el banco pierde valor**: rentabilidad | HK03 `HOOK3` | MD05 `MEDIO7` (0,5 % → 1 %) | CT03 `CTA3` | *Street Level Sessions on the Green* |
| **061** | V43 | Quadrato, Laureles | **Pocos permiten rentas cortas**: la escasez del permiso | HK04 `HOOK4` | MD04 `MEDIO5` | CT01 `CTA1` | *La Isla Bonita (Saxophone 80 Mix)* |
| **062** | V44 | Quadrato, Laureles | **Medellín, tercer mercado de renta corta**: barrio y ocupación | HK02 `HOOK2` | MD02 `MEDIO3` | CT02 `CTA2` | *In This Together* |

### Lo que queda libre (alternativas, por si una toma no sirve al oído)

- **La Ceja**: HK03 `IMG_8823` (entra cortada) · MD01 `IMG_8817` · CT02 `IMG_8913`, CT04 `IMG_8915`, CT05 `IMG_8917`, CT07 `IMG_8924`, CT08 `IMG_8925`.
- **Palmazera**: HK03 `IMG_8714` (gemela de HK02) · MD01-MD05, MD08, MD10-MD14 · **no hay CTA de repuesto: solo hay 3 y cada versión tiene la suya.**
- **Quadrato**: HK01 `HOOK1` (la peor transcrita: óyela antes) · MD01 `MEDIO1/2`, MD03 `MEDIO4` · CT04 `CTA4`.
- **Música de repuesto**, por orden: *Oceans (Where Feet May Fail)*, *Gary B.B. Coleman - The Sky is Crying*, *deadmau5 - Strobe* (las tres libres del banco) y, si no, cualquiera ya usada en **otra** propiedad que no esté en la tabla de arriba.

### Drones y aéreas, sin pisarse

- **La Ceja** (054-056): solo hay dos clips, pero duran 103 y 120 s. `varias_tomas.MP4` **tiene un corte de escena en 86,05 s**: antes y después son tomas distintas.
  - 054 → `DJI_…0070_D.MP4`, **primer tercio** (0-35 s) · 055 → `DJI_…0070_D.MP4`, **último tercio** (68-103 s) · 056 → `varias_tomas.MP4`, **después del corte** (86-120 s).
  - El tramo de `varias_tomas.MP4` anterior a 86 s queda libre para quien lo necesite: se declara.
- **Palmazera** (057-059): 057 → DR01-DR03 · 058 → DR04-DR06 · 059 → DR07-DR10.
- **Quadrato** (060-062): no hay dron. La apertura aérea se sustituye por el **rooftop con la vista de Medellín** (ZC07-ZC29): 060 abre con una toma de jacuzzi+ciudad, 061 con la pérgola/terraza y 062 con la vista abierta a las montañas. **Que no sean el mismo plano.**

## Lo que entrega cada sesión (los tres «vídeos» del encargo son uno por reel + sus piezas)

Por cada proyecto NNN, en `proyectos/NNN/finales/`:

1. **El reel**: `NNN-recorrido.mp4` (máster CRF 12) y `NNN-recorrido-crf16.mp4`.
2. **Los subtítulos**: `NNN.srt`.
3. **La portada 9:16** (skill `portada-luxur`): el mejor fotograma de la propiedad, oscurecido, locación en Safira March + línea + **VENTA** en Montserrat, isotipo PL abajo. Las tres propiedades son **venta**.
4. **La versión con ficha** (skill `ficha-luxur`): `NNN-recorrido-ficha.mp4`, **sin subtítulos**, con tipo · lugar · precio en Montserrat abajo del 1:1 todo el vídeo, copiando el audio del final. Precios: **054-056 → COP 1.380 M** · **057-059 → COP 429 M** · **060-062 → COP 410 M**.
5. **El caption de Instagram**: 📍 ubicación → esencial → especial → precio → CTA, 2-3 emojis, 5 hashtags, un público por vídeo (versión resumida, que es la que prefiere el usuario). Va en `proyectos/NNN/caption.md`.

## Reglas que no se discuten

- **Estructura del canal**: Dron/aérea · Hook · Recorrido · Mitad · Recorrido · CTA, con **tres frases de Isabella** y ni una más.
- La **primera toma va sin texto y sin voz**; **nunca** el sello «PROPIEDADES LUXUR» sobre la imagen; el cierre es la **tarjeta oscura** con el logo (440 px, 60 %) y PropiedadesLuxur.com, sin congelar el último plano y sin `@propiedadesluxur`.
- **Voz de Isabella a −15 LUFS** (compresor + limitador), al nivel de la música sola; la música baja con curva de coseno y **acaba de bajar antes de la primera palabra**.
- Cifra dicha = **cifra escrita**: si la voz dice «60 metros» o «24 metros», el rótulo lleva el número.
- Ninguna palabra con transcripción dudosa se da por buena: se mide (`formantes.py`) o se oye **antes** de la final, y lo que quede abierto se declara.
- Lo que no existe no se inventa: **nada de b-roll generado** para estas propiedades (son inmuebles reales).
