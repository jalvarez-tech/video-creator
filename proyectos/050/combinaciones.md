# Combinaciones — proyecto 050 · Tierra Grata Bosque Santo (ARRIENDO), V32 «14,8»

Registro de esta versión y mapa de «cómo cambiar cada pieza». Las otras cinco de arriendo (V27-V31, proyectos 045-049) se montan a la vez en worktrees hermanos, sin commit al escribir esto; lo que usó cada una está en `archivos/musica/registro-de-uso.md` (§1, §2 y §7) y en el reparto `proyectos/044/reparto-045-050.md`.

## Versiones de esta pieza

| Rev. | Fecha | Estado | Qué es |
|---|---|---|---|
| 0 | 2026-10-19 | prueba | HK02 · RC17 · RC14 · RC12 · MD04 · RC06 · RC09 · **RC02 final (camas)** · CT02 · *Spring is Coming* desde 34,1 s · 35,4 s · recorridos recortados al centro (erróneo) |
| 1 | 2026-10-19 | prueba (el usuario la vio) | idéntica con RC02 en x=500 y la línea «de los seres humanos» a su palabra |
| 2 | 2026-10-19 | prueba | **el usuario pide RC20, RC22 y RC10**: sala · bar · alcoba · baño · **jacuzzi (RC10)**; sin RC02 · entrada de la canción en 39,2 s · 38,3 s (aún recortada al centro: «ampliada») |
| **3** | 2026-10-19 | **FINAL (CRF 12 y CRF 16) + versión con ficha** | la misma montada con los recorridos **a cuadro entero** (eran anamórficos, SAR 81:256 / DAR 9:16: ver `aprendizajes.md` 1); 4 palabras sin oír |

## Lo que lleva (rev. 3 = la final exportada el 2026-10-19)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Hook | HK02 `IMG_4272` (voz 0,465-6,52 s), **abre la pieza a corte en el f0** | asignado: el tiempo es lo más valioso; excepción declarada a la regla fija 1 (encargo del usuario, como el 021 y el 023). **Repetida de la V29** |
| Mitad | MD04 `IMG_4296` (voz 0,555-4,17 s) | asignada: el precio (`$14.800.000`, la única cifra de la serie). **Repetida de la V29** |
| CTA | CT02 `IMG_4294` (voz 0,78-4,99 s) | asignada: apartamento amoblado + acompañamiento personalizado → «escríbeme». **Repetida de la V28** |
| Canción | *Spring is Coming* (`fe252090`) desde el 39,2 s | asignada; medida (216 golpes de ≥ 6 dB, pulso de 0,47 s, plana); la rejilla sale a ≥ 10,3 dB con los nueve recorridos |
| Paseo de la unidad (bloque 3) | RC17 piscina 3,20-6,03 · RC14 gimnasio 0,00-2,43 · RC12 Social Kitchen 0,00-2,87 | elegidos para no repetir el plano que más usan las hermanas (RC16, RC05, RC13) |
| Paseo del apartamento (bloque 5) | RC20 sala 5,60-8,17 · RC22 bar 1,53-3,20 · RC06 alcoba 0,00-2,43 · RC09 baño 2,40-4,73 · **RC10 balcón con el jacuzzi 7,87-10,73 (clímax)** | pedido del usuario: RC20, RC22 y RC10 (RC20 era la apertura de la V29; RC10, el clímax de la V30) |
| Voz | −15 LUFS tratada (+17,2 · +18,5 · +17,7 dB tras el compresor 3,5:1; limitador −2,5 dBFS) | pedido permanente: «a −15 LUFS sin saturar» |
| Música sola | ≈ −15 LUFS (−16,4 bajo el hook · −14,9 paseo unidad · −15,1 apartamento · −13,9 bajo el CTA); ≈ −31 bajo la voz | la canción es plana: una sola ganancia (0 dB) |
| Color | `COLOR_BASE` (la del 017) + el ajuste de cada plano (medido) | ver abajo |
| Texto | editorial: 5 bloques, 5 acentos (`más valioso` · `aseo semanal.` · `$14.800.000` · `experiencias` · `escríbeme.`), cursiva 8 px menor, 90 % | la cifra solo en la mitad |

## Lo medido en la prueba y en la final (rev. 3)

| Qué | Medida |
|---|---|
| Cortes secos sobre golpes | los 10 cortes a −0,4…+0,3 f en el AAC de la prueba (`golpes-render.py`), de 9,7 a 17,3 dB (el del baño mide 9,7 en el render, 10,3 en la canción: el más flojo de la pieza) |
| Voz | −15,0 LUFS en su ventana (WAV tratado), pico real −2,5 dBFS, silencio en su cola (ventana de voz con fundido) |
| Música sola | −15,0 LUFS de media en los 38 s que se usan; picos de −1,4 dBFS en la prueba (los de la canción, −1,3) |
| Pieza (prueba) | −15,2 LUFS integrado, pico −1,4 dBFS, LRA 2,3 LU |
| Subtítulos | 13 líneas a −0,5…+1,6 f de su palabra sobre la voz sola (`lineas-vs-onsets.py`) |
| Color (`medir-color.py`) | σ de luma entre planos 24,3 (sin graduar, rev. 0) → 12,9 (rev. 3 a cuadro entero); saltos de luma en los cortes: el mayor +34 (bar → alcoba) y −18 (jacuzzi → CTA); saturación media 0,31; quemado máx. 1,6 %, aplastado máx. 10,3 % (la sala, el pilar de madera); piel: tono 10,4° / 13,9° / 13,4° |
| Cierre | tarjeta de 2,0 s con el logo y la web; negro exacto en el f1089 (la puerta) |
| **Final (CRF 12 `slower`)** | `finales/050-recorrido.mp4`: 87,5 MB, 1080×1920, 1150 f, H.264 + AAC 320 kbps (317 kbps), −15,2 LUFS integrado, pico −1,4 dBFS, LRA 2,3 LU. Etiquetas BT.709 arregladas sin pérdida (R22: VUI y átomo `colr`); `framemd5` DECODIFICADO (1150 fotogramas) y MD5 del audio, idénticos antes y después. Color contra stills a escala 1 (`medir-final.py`, 11 fotogramas, `medidas/medir-final-crf12.txt`): color medio ≤ 0,34 niveles, PSNR de baja frecuencia 49,0-53,3 dB (medio 51,6), bruto 42,9-47,3 dB. Render: 12 min 30 s con otras tres sesiones renderizando |
| **Final (CRF 16 `slow`)** | `finales/050-recorrido-crf16.mp4`: 45,3 MB, misma imagen y MISMO audio (MD5 del PCM idéntico al del master); etiquetas arregladas igual; color medio ≤ 0,44 niveles, PSNR de baja frecuencia 48,5-51,9 dB (5 fotogramas, `medidas/medir-final-crf16.txt`); render 4 min 35 s |
| **Con ficha** (funnel) | `finales/050-recorrido-ficha.mp4`: 92,2 MB, 1150 fotogramas (los mismos que la final), SIN subtítulos y con `APARTAMENTO EN RENTA · El Poblado · Tierra Grata · $ 14,8 M COP / MES` en el tercio bajo del 1:1 hasta la tarjeta (se va en 35,87-36,27 s); audio COPIADO de la final (MD5 idéntico). Base: `Recorrido050 --props={"sinSubtitulos":true} --muted --crf=6`: mitad de arriba contra la final, PSNR medio 50,0 dB (mín 46,9). `ficha.mjs hoja` revisada: sin subtítulos, la ficha no choca con nada y se va antes del logo |
| **Portada** | `finales/050-portada.png` (receta en `portada.json`): fotograma de 20,3 s (el más nítido de la sala a la hora azul, 16,8), `EL POBLADO` · `RENTA` (según la ficha); contraste 8,7:1 el texto y 7,7:1 el isotipo. No es el jacuzzi (el clímax): varias piezas hermanas lo usan de clímax y la cuadrícula del perfil pide planos distintos (`portada-luxur` §3, punto 5) |
| `.srt` | `finales/050.srt`: 13 cues, 0,13-35,97 s (`exportar-srt.mjs`) |

## Cómo cambiar cada pieza

- **Otro hook / mitad / CTA:** añade su fila a `MATERIAL` de `normalizar.mjs` (con su sha) y su ventana a `VENTANA_VOZ` (¡mira el centroide antes de fiarte de la energía!: HK02 «empieza» a 0,67 s según `limites-voz.py` y a 0,465 según los onsets), la ganancia con `herramientas/probar-voz.py --umbral 0.0316 --razon 3.5` (editar su `TOMAS`) → `GANANCIA_VOZ_DB`. Luego `voz.s0/s1/lufs/dice` del corte, el guion marcado `voz/<toma>.txt`, cada línea llevada a su palabra con `onsets-voz.py` + `palabras-desde.py` (tabla de `lineas-vs-onsets.py`). Si cambia la duración del plano cambia la rejilla: `rejilla-050.py` con `R='[[60,105],[54,100],[54,100],[126,141],[54,83],[40,83],[54,83],[54,83],[84,115]]' VISTA_VS=4 MINC=10`.
- **Otra canción:** reservarla en el registro; `medir-pista.py … --json musica/golpes-050.json`; `rejilla-050.py`; los `GOLPE` de `metraje-050.ts`, `INICIO_MUSICA` y los niveles de `audio-050.ts` (`LUFS_MESETA`). Alternativa reservada: *Nils Frahm - Says* (último tercio, desde ≈ 372 s): no medida.
- **Otro plano de recorrido:** los clips son ANAMÓRFICOS (se escalan enteros); el `desde` va en segundos del MP4 normalizado (los mismos que el original); mira la ventana en una hoja de contactos con la geometría correcta (`scale=180:320,setsar=1`) y que no salga gente de cerca (gimnasio, Social Kitchen) ni la cruz de pared de RC06 a partir de 2,5 s.
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `contrast` ≤ 1,15, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella). Stills antes/después: `stills-multiples.mjs` y `stills-antes.mjs`; `medir-color.py` (sus tablas son las de esta pieza).
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-050.ts`; las voces siguen a −15 LUFS.
- **Versión con ficha** (funnel): `Recorrido050` con `--props={"sinSubtitulos":true}` + `ficha.mjs video tierra-grata` (receta en `finales/` y en este documento más abajo).

## Lo por confirmar

- **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto —4 notas en el plan y los guiones—, y la final se exportó con ellas abiertas por orden del usuario, §7c de `recorrido-luxur`; las notas SE QUEDAN): «**aseo**» (HK02, f166 = **5,5 s** de la pieza; whisper: p 0,68 · 0,24 · 0,98, y en otra pasada «asesor») · «**incluyéndote**» (f137 = **4,6 s**; p 0,72 · 0,62: ¿«incluyendo»?) · «catorce millones **(de)** ochocientos» (MD04, f459 = **15,3 s**; whisper con contexto oye «de», sin contexto «14 millones 800») · «**amoblado**» (CT02, ≈ f973 = **32,4 s**; whisper: «movilado», «movelado», «moblado»).
- Si el hook, la mitad y el CTA repetidos de las V28 y V29 valen (no hay otros del 17-oct).
- La canción (medida, no oída; plana; licencia sin verificar).
- Que la rejilla más floja (el baño, 9,7 dB en el render) se oiga como un golpe: se miró y se midió, no se oyó.
