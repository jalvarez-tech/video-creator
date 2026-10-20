# Reparto de los seis vídeos de Tierra Grata (arriendo) — proyectos 045-050 · V27-V32

> Escrito el 2026-10-19 por la sesión coordinadora (rama `claude/tierra-grata-promo-videos-0ead0e`). Encargo del usuario: *«voy a empezar a promocionar el arriendo … 6 videos para redes sociales, cada video en 2 formatos: uno para el funnel y el otro para post orgánicos. No tengo videos de dron: haz una combinación de empezar con una toma del apartamento y otros directamente con el hook. Cada video en una sesión diferente con Sonnet 5.5».*
> El material está catalogado en [`catalogo-material.md`](catalogo-material.md) (léelo entero antes de nada: tiene tres sorpresas). El libreto de la propiedad, [`libreto-isabella.md`](libreto-isabella.md), NO se grabó tal cual: vale para el caption (§8) y para el tono, no para las frases.

## 1. Los dos formatos de cada vídeo

| Formato | Para | Qué es | Archivo |
|---|---|---|---|
| **Orgánico** | Reels / TikTok / Shorts | El reel del formato `recorrido-luxur` tal cual: subtítulos editoriales, cierre con la tarjeta oscura (logo + `PropiedadesLuxur.com`), CRF 12 y CRF 16, `.srt`, portada y caption | `proyectos/NNN/finales/NNN-recorrido.mp4` (+ `-crf16`, `.srt`, `NNN-portada.png`, `caption.md`) |
| **Funnel** (anuncios) | Meta Ads / feed 1:1 | La **versión con ficha** (`ficha-luxur`): el mismo vídeo SIN subtítulos y con `APARTAMENTO EN RENTA · El Poblado · Tierra Grata · $ 14,8 M COP / MES` fijo en el tercio bajo del 1:1, hasta la tarjeta oscura; audio del final copiado | `proyectos/NNN/finales/NNN-recorrido-ficha.mp4` |

La ficha de la propiedad ya está en `.claude/skills/ficha-luxur/propiedades/tierra-grata.json` (y `ficha.mjs` pinta decimales y «COP / MES» en renta desde hoy). La portada: `--locacion "EL POBLADO" --negocio renta`.
Las dos versiones y la portada se copian, al acabar, a `/Volumes/SSK SSD/Work/Propiedades Luxur/Apartamento - Tierra Grata - Las Palmas/Videos Social Media/` (carpeta que el usuario creó hoy para esto), con el caption en un `.md` al lado.

## 2. Las seis piezas (tomas, apertura, música: FIJADAS para que las sesiones no se pisen)

Códigos de `catalogo-material.md`. «Abre con APTO» = bloque 1 con la casa limpia (regla fija 1: sin texto ni voz, Isabella entra en un pulso). «Abre con HOOK» = Isabella hablando desde el fotograma 0 (excepción por encargo, como el 021; se declara en el plan y en la puerta). Los recorridos de en medio los elige cada sesión (se pueden repetir entre piezas, declarándolo); **la apertura y el clímax son EXCLUSIVOS de cada pieza**.

| Proyecto · V | Nombre | Apertura | Hook | Mitad | CTA | Clímax (último plano del bloque 5) | Canción (reservada) | Alternativa si la canción no sirve |
|---|---|---|---|---|---|---|---|---|
| **045 · V27** | «El tiempo» | APTO: RC01 (cocina → sala con la vista) | HK01 | MD01 | CT01 | RC21 (atardecer, las luces de la ciudad) | *Fortitude (Light Version)* | *Cornfield Chase* |
| **046 · V28** | «Ciudad nueva» | HOOK | HK03 | MD02 + MD03 (seguidas: «desde el día uno» → «chef privado, tours…») | CT02 | RC18 (terraza al atardecer, pérgola) | *Armin van Buuren - Children (Piano)* | *Here For You (Piano)* |
| **047 · V29** | «Lo que incluye» | APTO: RC20 (sala a la hora azul) | HK02 | MD04 + MD05 (seguidas: «14,8 que incluyen…» → «Además, esta unidad…») | CT03 | RC03 (el balcón con las camas → las torres) | *Tony Anderson - Dreamlife* | *Softly (Judah Earl & Brandon Black)* |
| **048 · V30** | «Chef y experiencias» | HOOK | HK01 | MD03 | CT03 | RC10 (cielo → ciudad → el deck de la terraza) | *Ludovico Einaudi - Einaudi Fly* | *Einaudi - Experience* |
| **049 · V31** | «Amenidades» | APTO: RC04 (sala: sofá, luces, el balcón al fondo) | HK03 | MD05 | CT01 | RC19 (el deck con el jacuzzi comunal) | *In This Together* | *Deep Breath* |
| **050 · V32** | «14,8» | HOOK | HK02 | MD04 | CT02 | RC02, tramo final (sale al balcón: las camas y la palma) | *Spring is Coming* | *Nils Frahm - Says* (último tercio) |

Por qué así: solo hay 3 hooks (HK01 y HK02 son la misma frase), 5 mitades y 3 CTA del 17-oct, así que **cada hook y cada CTA van dos veces** y ninguna pareja hook·CTA se repite; HK03 y CT03 dicen lo mismo y nunca van juntas; MD01 («de esta manera») sigue a HK01; MD05 («además») sigue a MD04 o a un recorrido de la unidad. Las alternativas de música son DISTINTAS entre sí: si todas las sesiones cambiaran a la vez, tampoco chocarían. Las 6 canciones y las 6 alternativas están reservadas en `archivos/musica/registro-de-uso.md` (§1 y §2); **no se elige ninguna otra**.

**Si el jacuzzi privado aparece en algún clip** (catálogo §6, el aviso): la sesión que lo encuentre lo anota en el catálogo y en el registro, y lo usa de clímax en su pieza **en lugar** del clímax asignado; las demás no lo tocan hasta que esa sesión lo declare (es el plano más valioso del material y no se gasta en seis piezas).

## 3. El paseo (orden de los espacios)

Isabella está en la unidad; el apartamento solo existe en el recorrido. Paseo propuesto (`viaje-emocional.md`: sin volver atrás, el clímax al final del bloque 5):

- **Abre con APTO**: sala (bloque 1) → Isabella en la unidad (hook) → **recorrido por la unidad** (piscina, gimnasio, Social Kitchen, sauna: 2-3 planos) → mitad (en la unidad) → **recorrido por el apartamento** (cocina/sala → alcoba → baño → balcón) → clímax → CTA → tarjeta.
- **Abre con HOOK**: Isabella (hook, f0) → recorrido por la unidad → mitad → recorrido por el apartamento → clímax → CTA → tarjeta.
- La ciudad y el atardecer son la recompensa: **no enseñar la vista entera antes del bloque 5**.
- Isabella sale en 2 o 3 sitios distintos (dos de sus tomas suelen caer en la terraza común: se declara).

## 4. Reglas que no se negocian (las de siempre, más las de este material)

1. Las de `recorrido-luxur` §0 (nunca el sello; cierre = tarjeta oscura con el logo a 440 px al 60 % y `PropiedadesLuxur.com`; nada se congela; primera toma sin texto ni voz **salvo** en las tres que abren con el hook, por encargo).
2. Texto `editorial` (Montserrat + Playfair itálica, blanco sin sombra); la cifra `$14.800.000` solo en el subtítulo de MD04; ninguna otra cifra.
3. Voz a **−15 LUFS** tratada (`VOZ_TRATADA` del 025: compresor + limitador, fundido de 40-60 ms tras la última palabra), música a −15 sola y con curva coseno que acaba ANTES de la primera palabra; sin SFX.
4. Color: `COLOR_BASE` + ajuste por plano medido (R32: `--gl=angle`, `vibrance` ≤ 0,05, piel ≤ 1,06). El recorrido es SDR de 608×1080 efectivos: no inventar nitidez.
5. Palabras dudosas (`POR CONFIRMAR AL OÍDO`: «aseo», «amoblado», «asesor/aseo»…) se preguntan ANTES de la final; la puerta falla con `--final` mientras queden.
6. **Nada de drones, nada del libreto 044 como si se hubiera grabado, nada que la ficha no diga** (administración, contrato, qué se paga aparte).
7. Caption según `libreto-isabella.md` §8, con el canon, «aseo semanal incluido» y «apartamento amoblado» (dicho por Isabella), 5 hashtags.

## 5. Protocolo de cada sesión (worktree propio, modelo Sonnet 5.5)

1. **Prepara el worktree** (no vienen de git): `ln -sfn /Users/nicecode/Work/jalvarez/video-creator/remotion/node_modules remotion/node_modules` · `ln -sfn /Users/nicecode/Work/jalvarez/video-creator/archivos/whisper archivos/whisper` · `node herramientas/doctor.mjs` (el Chrome de Remotion se baja en el primer render si falta).
2. **Un TMPDIR propio para Remotion** (seis sesiones renderizan a la vez y cada render deja un bundle de 2-2,5 GB): antes de cada `npx remotion still|render`, `export TMPDIR=/private/tmp/remotion-NNN` (créalo), y al acabar cada render borra `/private/tmp/remotion-NNN/remotion-webpack-bundle-*`. **Nunca** borres bundles fuera de tu TMPDIR: son de otra sesión. Quedan ≈ 75 GB en el disco para las seis.
3. `node manuales/director-video/scripts/artefactos.mjs NNN` → los tres artefactos desde este reparto y el catálogo → `node .claude/skills/recorrido-luxur/scripts/nuevo-recorrido.mjs NNN` → copiar el material a `proyectos/NNN/original/` con los códigos (`hk01.mov`, `rc01.mp4`…) y rellenar `normalizar.mjs` (los recorridos del 2-sep son ANAMÓRFICOS: `scale=1296:2304:flags=lanczos,setsar=1` SIN crop, catálogo §7) → medir voz y canción → planes → puertas → **frames** → prueba 720p → **esperar el OK del usuario** → final (CRF 12 + CRF 16 + `.srt`) → portada → **versión con ficha** (`ficha-luxur` §3: render `sinSubtitulos` + `ficha.mjs video tierra-grata …`) → caption → copiar al SSD (`Videos Social Media/`) → `combinaciones.md`, `aprendizajes.md`, la fila en `.claude/skills/guion-luxur/registro/piezas.csv` y la fila de la versión en `archivos/musica/registro-de-uso.md` (solo TU fila: las demás son de las otras sesiones).
4. **No cambies** tomas, apertura, clímax ni canción sin un motivo técnico declarado; si cambias la canción, SOLO a tu alternativa. Si necesitas un recorrido que otra pieza tiene de apertura o clímax, no lo uses.
5. Commits en tu rama (en español, el porqué); **nada de push** sin que el usuario lo pida. Tu rama parte de `claude/tierra-grata-promo-videos-0ead0e`, que ya trae el catálogo, este reparto, la ficha y las reservas.
6. Al terminar, deja en tu informe: los archivos entregados (ruta en el repo y en el SSD), lo declarado (tomas repetidas, el escalado del material anamórfico (608×1080 efectivos), la apertura con hook), las palabras sin oír con su segundo, y lo que te quedó pendiente.

## 6. Qué puede salir mal (y qué hacer)

| Problema | Qué hacer |
|---|---|
| Un recorrido sale «ampliado» o deformado | el clip es anamórfico (SAR 81:256): va SIN crop, `scale=1296:2304:flags=lanczos,setsar=1` (catálogo §7). El `crop=608:1080` de la primera versión de este reparto era un error |
| HK03 / CT03 a 29,97 fps con `avg_frame_rate` raro | `fps=30` tras el tone-map, contar los frames del MP4 normalizado, nunca los del original |
| La voz empieza en el f0 (HK01) | medir con `onsets-voz.py`; si no hay 12 f de aire, Isabella entra a corte en un golpe (`montaje.md`) |
| El recorrido se ve blando en la prueba | es el material (608×1080 efectivos escalados ×2,13): decirlo; no filtrar |
| Chrome no arranca / render muere | `cd remotion` · `npx remotion browser ensure`; comprobar el TMPDIR propio y el disco (`df -h /`) |
| Quedan menos de 15 GB en el disco | parar, borrar TUS bundles y avisar al usuario antes de seguir |
