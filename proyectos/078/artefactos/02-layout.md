# 02 · Layout — proyecto 078

> Paso 2 de 3. 9:16 · 1080×1920 · 30 fps. Nada se mueve a mano: la composición es `Recorrido078.tsx` (PistaMetraje + PistaAudio + SubtitulosEditoriales + tarjeta del cierre), la misma del 070-075.

| Capa (de atrás a delante) | Qué es | Dónde |
|---|---|---|
| Vídeo | los planos mudos, cada uno con su `color` (R32) y un empuje 1,00 → 1,04 solo en Isabella | `metraje-078.ts` |
| Velo de subtítulos | degradado bajo el texto (se apaga con `sinSubtitulos`) | `Recorrido078.tsx` |
| Subtítulos editoriales | abajo, a 90 %, Montserrat + Playfair itálica en el acento (91 px) | `subtitulos-078.ts` |
| Fundido a negro + tarjeta | la imagen de Isabella funde en 6 f; tarjeta oscura de 2,0 s con el logo (440 px, 60 %) y `PropiedadesLuxur.com` | `cierre-078.ts` |
| Audio | voz tratada a −15 LUFS por toma + la canción con envolvente (baja 11 LU bajo la voz, sube en los recorridos, se apaga bajo la tarjeta) | `audio-078.ts` |

Zonas libres: sin texto arriba (R08), sin sello, sin cuenta. La primera toma (f0-81) sin texto ni voz.
