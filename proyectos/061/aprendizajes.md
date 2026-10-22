# Aprendizajes — proyecto 061 (V43 · Apartaestudio Quadrato, «Pocos permiten rentas cortas»)

Lo que funcionó y lo que no al montar este reel (el segundo del apartaestudio, con la estructura de la 056/059, sin dron y con una canción sin pulso). Para la siguiente versión de este apartaestudio o de otra con material parecido.

## 1. `limites-voz.py` puede contar un ruido como voz: mira la envolvente antes de decidir cómo entra la toma

`limites-voz.py` dio «voz 0,15 → 4,86 s» en HK04 y «0,26 → 4,91 s» en CT01. Pero de 0,14 a 0,31 s (HK04) y de 0,18 a 0,45 s (CT01) hay un ruido a −45 dB (una respiración, un roce del micro de solapa) y la primera SÍLABA está en 0,58 y 0,57 s (subida de ≥ 56 dB desde −76: `envolvente-voz.py` y `onsets-voz.py`). Con 0,15 s de aire parecía imposible disolver; con 0,58 s hay 17 f de clip antes de la primera palabra: más que el cruce de 12 f de una disolvencia, **pero no los 12 + 10 f que piden una disolvencia y la bajada de la música antes de la palabra**. Por eso el hook y el CTA entran a corte en un golpe (`desde` de 6 f: la palabra suena a 11,4 y 11,1 f del golpe, la música baja en 10 f). Y la ventana de la voz tratada empieza a 0,07 s antes de la primera sílaba, así que ese ruido no se sube +19 dB con la ganancia.

## 2. El DTW de whisper iba de 2 a 8 f mal en estas tomas: la SÍLABA manda

`trozos-editoriales.mjs` puso «en Laureles,» en el f127 (2,00 s) cuando «en» arranca a 2,240 s (f134); «rentas cortas» en el f173 cuando «rentas» arranca a 3,800 s (f181); «y agendemos» en el f976 (DTW 1,78 s) cuando la «y» arranca a 1,505 s (f968); «proyectos» en el f520 cuando arranca a 2,165 s (f524). `onsets-voz.py` da los arranques (valle profundo → subida) y `palabras-desde.py` dice qué palabra es la primera desde cada instante: el valle de −61 dB antes de «rentas» es la /r/ de «pa-**ra** | **ren**-tas», no una pausa. Todas las líneas quedaron a +0,1…+1,3 f de su palabra sobre la voz sola.

## 3. «Pero» y «pocos permiten» a 8 f: un trozo no cabe, así que van en una línea

«pero» arranca a 3,59 s y «pocos» a 3,86 s (8 f); el mínimo entre trozos es de 12 f. Se resolvió con **una sola línea de acento, «pero pocos permiten»** (se encoge al 93 %), y «rentas cortas.» debajo en base. Igual con «Puede ser virtual o presencial.»: «Puede» (3,34 s) y «virtual» (3,55 s) están a 6 f y van en una línea.

## 4. Una canción sin pulso: la rejilla son los golpes MEDIDOS, y los rangos los fija el clip

*La Isla Bonita (Saxophone 80 Mix)* (406 golpes de ≥ 6 dB, 240 de ≥ 12 dB, meseta de −10,2 a −14,4 LUFS por tramos de 5 s, caída natural desde 217,6 s) no tiene recta de pulso: `buscar-cortes-061.py` (la 059 con los rangos de esta pieza) busca entradas donde cada corte caiga en un golpe de ≥ 12,5 dB. Los rangos de duración del hook (150-162 f) y de la mitad (170-181 f) **no se eligen: los da el clip** (la voz acaba a los 140 y 159 f tras `desde` y la toma deja 168 y 195 f), y con ellos hay 26 entradas posibles. Se eligió la de 15,207 s porque su sección no es la de la V7 (179,4 s), todos sus planos caen entre 71 y 175 f, y los golpes miden 13,2-31,5 dB (los ocho cortes secos suenan a ≤ 0,4 f del corte en el render). El catálogo marca la canción «arranque flojo» (el nivel tarda 4,5 s en llegar): entrando a mitad de pista, ya en la meseta, el problema desaparece. Una caída natural cerca del CTA no se pudo aprovechar (solo una entrada, 188,5 s, la tenía y con golpes de 11 dB): la música se apaga con curva bajo la tarjeta, como en la 059.

## 5. Una palabra dudosa que el catálogo «arregla»: medir el tiempo, no solo el timbre

El catálogo suponía «[apartaestudio]» y whisper oye «estudiante». Los formantes no distinguen entre «estudio» y «estudiante» (las vocales de la palabra se mezclan con coarticulación), pero **el tiempo sí**: en «Te presento este» la voz va a ≈ 0,2 s por sílaba, y entre «este» y «en» solo caben 0,48 s (tres sílabas, no seis). Y la distancia DTW sobre MFCC a una «estudio» de otra toma (HOOK3, la misma voz) es la de la misma palabra y no la de palabras distintas. Es una medida más para el kit de `formantes.py` (R31) y no un oído: la nota «POR CONFIRMAR AL OÍDO» se queda.

## 6. Lo que se vio al mirar el material

- **La tarjeta «2X1» de un restaurante** (marca ajena) sale en cuadro desde el frame 0 de varias tomas de las mesas de la terraza (ZC14, ZC15, ZC20, ZC21, ZC22 y ZC24, sobre todo en 0-3 s): la apertura usa ZC22 desde los 3,4 s, donde la mesa queda lejos y no se lee.
- **Las tres tomas de Isabella están en el estudio de 24 m²** (el hook en el pasillo, la mitad entre el escritorio y la cama, el CTA de pie al fondo): cambia el rincón y la pose; se declara en la puerta (2a).
- **Todo es 1080×1920 SDR BT.709 a 30 / 29,97 fps**: sin HLG, sin rotación, sin recortes; los de 29,97 llevan `setpts=PTS*1000/1001` (menos las tomas de Isabella).

## 7. Coordinación con las otras dos sesiones del apartaestudio

Una nota por sesión en la carpeta compartida (`06x-tramos-de-recorrido.md`) con los tramos reclamados. La 060 cambió de RC01 a RC05 **en su código** sin tocar su nota: la puerta (sección 7b, que lee los `metraje-060.ts` y `metraje-062.ts` vivos) lo dijo antes de renderizar nada, y cambié yo a RC01 y lo anoté. **Mirar el plan vigente de la otra sesión, no solo su nota, antes de dar por buenos los tramos.**
