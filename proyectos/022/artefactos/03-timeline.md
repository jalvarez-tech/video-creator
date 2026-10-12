# 03 · Timeline — proyecto 022

> **Rev. 4: la pieza ABRE con el hook** (pedido del usuario: «como esta propiedad no tiene dron empecemos directamente con el hook»): se quitó el plano de apertura (RC13) y con él la regla fija «la primera toma sin texto ni voz», declarada en la puerta (`ABRE_CON_EL_HOOK`). Paso 3 de 3. Todo en frames absolutos de la composición, a 30 fps (1301 f = 43,37 s). Los planos son contiguos. Anterior: [02-layout.md](02-layout.md). La fuente de verdad es `remotion/src/proyectos/022/metraje-022.ts`.

## Los planos

«Espacio» leído de arriba abajo es el paseo (sentido I: cocina → sala → alcoba secundaria → alcoba principal), con el hook en el balcón y la vista, la última antes del CTA. `desde` en la fuente; `entra`: corte o disolvencia (de 12 f, que acaba en un golpe de la canción).

| Plano | Bloque | Espacio · función | Clip · `desde` | `en` | `dur` | Entra | Golpe (dB) |
|---|---|---|---|---|---|---|---|
| c02-hook | 2 | Balcón · el hook (Isabella), **abre la pieza** | HK2 · 0,00 s | 0 | 173 | corte | f1: 28,9 (apertura) |
| c03-cocina | 3 | Cocina · el umbral | RC06 · 0,00 s | 173 | 153 | corte | 21,9 |
| c04-sala | 3 | Sala · lo social | RC05 · 4,50 s | 326 | 103 | corte | 14,7 |
| c05-alcoba | 3 | Sala → alcoba secundaria · el paso | RC15 · 0,40 s | 429 | 137 | disolver | 20,2 |
| c06-mitad | 4 | Alcoba secundaria · la mitad (Isabella) | MD1 · 0,10 s (f3) | 566 | 206 | corte | 17,0 |
| c07-principal | 5 | Alcoba principal · lo íntimo | RC10 · 0,00 s | 772 | 68 | corte | 17,3 |
| c08-vestier | 5 | Vestier · cómo se vive | RC16 · 0,00 s | 840 | 53 | corte | 24,6 |
| c09-bano | 5 | Baño · lo privado | RC02 · 1,20 s | 893 | 85 | disolver | 11,7 |
| c10-vista | 5 | Ventanal · la vista (la más larga) | RC12 · 7,87 s | 978 | 103 | disolver | 21,4 |
| c11-cta | 6 | Alcoba principal · el CTA (Isabella) | CT1 · 0,40 s (f12) | 1081 | 160 | disolver | 15,0 |
| c12-cierre | 6 | Tarjeta oscura (logo + web) | `cierre-oscuro.png` | 1241 | 60 | corte | — |

## La voz (medida con `limites-voz.py`, no con whisper — R29) · TRATADA a −15 LUFS (rev. 5 / final rev. 1)

| Toma | Voz (s de la fuente) | LUFS crudo | Ganancia tras la cadena | LUFS tratado · pico real | Primera palabra | Última palabra |
|---|---|---|---|---|---|---|
| HK2 | 0,38 → 4,04 | −17,8 (pico −0,6 dBTP) | +13,6 dB | −15,0 · −2,5 dBTP | f11 (a corte, `desde` 0) | f121 |
| MD1 | 0,54 → 6,41 | −23,2 | +15,6 dB | −15,1 · −2,5 dBTP | f579 (a corte, `desde` 3 f) | f755 |
| CT1 | 0,66 → 5,37 | −21,9 | +14,8 dB | −15,1 · −2,5 dBTP | f1089 (disolvencia, `desde` 12 f) | f1230 |

Cadena (`normalizar.mjs`, `VOZ_TRATADA`): paso alto 100 Hz → puerta suave → compresor 3:1 → ganancia (buscada tras el limitador, `afinar-voz.py`) → limitador −2,5 dBFS → apagado a 60 ms tras la última palabra. El plan lee `hk2-voz.wav`, `md1-voz.wav` y `ct1-voz.wav` y no añade ganancia (`OBJETIVO_LUFS` −15). Excepción declarada a R29.

## La música («Some Say – Acoustic Sunsets (Nea Cover)», sha 8 `b652ab54`)

Entra en 139,0 s (`INICIO_MUSICA`; el golpe de 28,9 dB de 139,053 s suena en el f3). Meseta de −14,1 LUFS hasta 175 s, **acorde final en 175,5 s** (f1097: dentro de la toma del CTA) y cola a silencio hacia 184 s, bajo la tarjeta. Sin pulso: cada corte seco cae en un golpe medido (`musica/golpes-022.json`), comprobado después sobre el audio del render (`golpes-render.py`, R33). Envolvente: música sola a −15 LUFS y ≈ −16 dB más abajo mientras habla ella (≈ 10 LU bajo su voz). **Rev. 1 (pedido: «fade-out / fade-in para que no se escuche tan cortado»):** tras el golpe en que entra ella la música baja con una curva de coseno en 10 f y, al callar, sube con otra de 24 f (12 f en la mitad, que no tiene más sitio antes del corte); el corte del hook al paseo pasó del golpe de f175 (21,9 dB) al de f191 (12,3 dB) para dar los 24 f.

## El color (R32)

Cada plano de vídeo lleva `color: color({…})`: la base de Luxur (`COLOR_BASE`, que salió del 017, de material **HLG** tone-mapeado) más un ajuste. Aquí hay **dos fuentes** (tomas de Isabella en HLG tone-mapeado; recorridos en SDR BT.709). Lo medido está en `herramientas/medir-color.py` y en `pruebas-720p/panel-color.png`; los ajustes: Isabella con `saturation` 1,02 (≤ 1,06), el vestier a 1,0 (la madera era el plano más saturado) y la alcoba secundaria a 1,06.

Los saltos de luma entre planos (último fotograma → primero) a corte eran de hasta −58: **se arreglaron entrando con disolvencia** (c05, c09, c10) y no graduando más. Los que se quedan a corte van a un golpe: c01→c02 (+11,6; HK2 no tiene 12 f de clip antes de su palabra), c02→c03 (−8,9) y c06→c07 (−16, tras la mitad de Isabella).

## Metraje compartido

Es la primera pieza de esta propiedad: no comparte nada con nadie. (La sección 9b de la plantilla, que compara con las versiones de Los Patios, **no se usa** aquí: los códigos de clip chocan entre propiedades.)
