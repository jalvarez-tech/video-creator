# Avisos de terceros

video-creator se publica bajo la licencia MIT (`LICENSE`). Este archivo dice lo que **no** es nuestro: qué va dentro del repositorio tal cual, qué descarga el instalador en la máquina de cada usuario y bajo qué licencia va cada cosa. Si redistribuyes el producto, estos avisos viajan con él.

## 1. Incluido en el repositorio

| Componente | Versión | Licencia | Dónde | Notas |
|---|---|---|---|---|
| **GSAP** (GreenSock Animation Platform) | 3.14.2 | GreenSock Standard License | `manuales/motor-hyperframes/plantilla/vendor/gsap-3.14.2.min.js` | Copia vendorizada a propósito, con su cabecera de licencia intacta, para que una pieza del segundo motor siga renderizando dentro de un año. Copyright 2025 GreenSock. Términos completos: <https://gsap.com/standard-license>. |
| **Inter** (familia tipográfica) | 3.019 | SIL Open Font License 1.1 | `remotion/public/fuentes/inter/` (nueve `.otf` + `OFL.txt`) | Copyright (c) 2016 The Inter Project Authors (<https://github.com/rsms/inter>). El motor la registra con `FontFace` a partir de una copia en base64 de esos mismos archivos (`remotion/src/motor/fuentes.ts` y `fuentes-inter.datos.ts`), sin pedir nada por red. La OFL permite empaquetar y redistribuir la fuente con el software; no permite venderla sola. |
| **Quicksand** (familia tipográfica, variable: eje `wght` 300-700) | 3.006 | SIL Open Font License 1.1 | `remotion/public/fuentes/quicksand/` (`Quicksand-Variable.ttf` + `OFL.txt`) | Copyright 2011 The Quicksand Project Authors (<https://github.com/andrew-paglinawan/QuicksandFamily>), with Reserved Font Name «Quicksand». Es el `Quicksand[wght].ttf` de <https://github.com/google/fonts> (`ofl/quicksand/`, commit `9710da1eacb3be272583c3224dcb70f9da6eadbb`), **sin modificar**: solo cambia el nombre del archivo, porque los corchetes son comodines en PowerShell. La usa la pista de subtítulos editoriales; el motor la registra igual que Inter, desde una copia en base64 de los mismos bytes (`fuentes-subtitulos.datos.ts`, con el sha256 de cada archivo). |
| **Lato** (familia tipográfica; solo *Italic* y *Bold Italic*) | 2.015 | SIL Open Font License 1.1 | `remotion/public/fuentes/lato/` (`Lato-Italic.ttf`, `Lato-BoldItalic.ttf` + `OFL.txt`) | Copyright (c) 2010-2014 by tyPoland Lukasz Dziedzic, with Reserved Font Name «Lato». Son los archivos de <https://github.com/google/fonts> (`ofl/lato/`, el mismo commit), **sin modificar**. La usa la pista de subtítulos editoriales, para el acento; mismo registro en base64. |
| **Montserrat** (familia tipográfica, variable: eje `wght` 100-900) | 9.000 | SIL Open Font License 1.1 | `remotion/public/fuentes/montserrat/` (`Montserrat-Variable.ttf` + `OFL.txt`) | Copyright 2011 The Montserrat Project Authors (<https://github.com/JulietaUla/Montserrat>). Es `ofl/montserrat/Montserrat[wght].ttf` de <https://github.com/google/fonts> (commit `9710da1`), **sin modificar**; solo se renombra el archivo (los corchetes son comodines en PowerShell). La pista de subtítulos editoriales la usa cuando un canal la declara; mismo registro en base64. |
| **Playfair Display** (familia tipográfica; solo la *Italic* variable: eje `wght` 400-900) | 1.203 | SIL Open Font License 1.1 | `remotion/public/fuentes/playfair/` (`PlayfairDisplay-Italic-Variable.ttf` + `OFL.txt`) | Copyright 2017 The Playfair Display Project Authors (<https://github.com/clauseggers/Playfair-Display>), with Reserved Font Name «Playfair Display». Es `ofl/playfairdisplay/PlayfairDisplay-Italic[wght].ttf` de <https://github.com/google/fonts> (el mismo commit), **sin modificar**; solo se renombra el archivo. La pista de subtítulos editoriales la usa para el acento cuando un canal la declara. |

## 2. Dependencias de npm (`remotion/package.json`, instaladas por `npm ci`)

| Componente | Versión | Licencia | Notas |
|---|---|---|---|
| **Remotion** (`remotion`, `@remotion/cli`, `@remotion/bundler`, `@remotion/renderer`, `@remotion/media`, `@remotion/effects`, `@remotion/media-parser`, `@remotion/paths`, `@remotion/shapes`, `@remotion/eslint-config-flat`) | 4.0.509 | **Remotion License** (no es una licencia libre) | Es la única pieza con condiciones de uso propias: gratis para personas físicas, proyectos sin ánimo de lucro y empresas de **hasta 3 personas**; una empresa mayor necesita una *Company License*. Léela antes de usar el sistema en una empresa: <https://remotion.dev/license> · <https://github.com/remotion-dev/remotion/blob/main/LICENSE.md>. **Dos paquetes nuevos (4.0.509): `@remotion/media` y `@remotion/effects`** —el efecto `colorCorrection()` del color por plano y el `<Video>` que lo admite—. Salen del mismo repositorio de Remotion, pero su `package.json` no dice lo mismo que el resto: `@remotion/media` no declara licencia y `@remotion/effects` declara `UNLICENSED` (en npm: ninguna licencia concedida por sí mismo). Aquí se tratan como parte de Remotion, bajo la Remotion License de arriba; si redistribuyes el producto o lo usas en una empresa, confirma esos dos con Remotion antes de dar por buena esa lectura. |
| React, react-dom | 19.2.3 | MIT | |
| TypeScript | 5.9.3 | Apache-2.0 | |
| ESLint, Prettier, esbuild, `@types/*` | las de `package-lock.json` | MIT | Solo en desarrollo. |

El árbol completo con su licencia sale con `npm ls --all` dentro de `remotion/`.

## 3. Lo que descarga el instalador en la carpeta del usuario

No están en el repositorio: `herramientas/setup.mjs` (y `instalar.sh` / `instalar.ps1` para Node) los bajan de su origen oficial con **versión fija y suma sha256**, sin administrador, a la carpeta de herramientas del usuario. Cada uno conserva su licencia y no se redistribuye con el producto.

| Componente | Versión | Licencia | Origen | Para qué |
|---|---|---|---|---|
| **uv** | 0.12.18 | Apache-2.0 OR MIT | <https://github.com/astral-sh/uv> | Ejecuta los scripts `.py` y trae su propio Python. |
| **Python** (vía `uv python install`) | ≥ 3.10 | PSF License | <https://www.python.org> | Los scripts son de librería estándar. |
| **FFmpeg / FFprobe** | 9.0.2 | LGPL 2.1+ / GPL 2+ (los builds descargados están compilados como **GPL**) | macOS: builds de Martin Riedl (<https://ffmpeg.martin-riedl.de>) · Windows: builds de Gyan Doshi (<https://www.gyan.dev/ffmpeg/builds/>) · fuente: <https://ffmpeg.org> | Medir, normalizar, sintetizar SFX, cortar, tone-map. Se invoca como proceso externo; el sistema no lo enlaza ni lo empaqueta. |
| **auto-editor** | 31.6.0 | Unlicense (dominio público) | <https://github.com/WyattBlue/auto-editor> | Corte de silencios. |
| **whisper.cpp** (opcional, `--whisper`) | b5130 | MIT | <https://github.com/ggml-org/whisper.cpp> | Transcripción local. El modelo `ggml-small.bin` deriva de los pesos de Whisper de OpenAI (MIT) y se sirve desde Hugging Face (`ggerganov/whisper.cpp`). |
| **Chrome Headless Shell** (Chrome for Testing) | la que fija Remotion 4.0.509 | Chromium: BSD-3-Clause; los binarios de Chrome for Testing, bajo los términos de Google | lo descarga `npx remotion browser ensure` | El navegador con el que Remotion renderiza. |
| **Node.js** (solo si falta) | ≥ 22 LTS | MIT (licencia de Node.js, con los avisos de sus dependencias) | <https://nodejs.org> · en macOS/Linux a través de **fnm** (GPL-3.0, <https://github.com/Schniz/fnm>); en Windows con winget o el zip portable de nodejs.org | El runtime de todo el sistema. |
| **HyperFrames** | 0.8.47 | Apache-2.0 | <https://github.com/heygen-com/hyperframes> (npm: `hyperframes`) | El segundo motor. Se ejecuta bajo demanda con `npx hyperframes@0.8.47` desde `render-hf.mjs`; no se vendoriza. |

## 4. Servicios externos (nivel 1 y 2)

Pexels, HeyGen, ElevenLabs y xAI (Grok Imagine) se usan a través de sus API con una clave que el usuario escribe en `.env`. Sus condiciones de uso, precios y licencias del material generado o descargado son las de cada servicio y aplican a quien tiene la clave. El b-roll de archivo lleva su crédito y su licencia en `proyectos/NNN/broll/manifiesto.json` porque así lo exige el sistema, no este aviso.

## 5. Lo que es nuestro aunque no lo parezca

- Los efectos de sonido de `manuales/diseno-sonoro/sfx-base/` están **sintetizados con FFmpeg** para este proyecto (`node manuales/diseno-sonoro/scripts/sfx.mjs sintetizar`): son obra propia y van bajo MIT como el resto.
- Las skills de terceros que cada usuario instale en `.agents/skills/` o `.claude/skills/` (por ejemplo las de ElevenLabs con `npx skills add`, o las de HyperFrames con `instalar-skill-hf.mjs`) conservan su propia licencia y no se versionan en este repositorio.
- Las claves, las marcas, los proyectos, los medios y el banco de sonido de cada usuario son del usuario y no salen de su máquina.
