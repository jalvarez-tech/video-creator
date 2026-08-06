import { AbsoluteFill, Audio, staticFile } from "remotion";
import { PistaNoticia } from "./noticias";
import { noticia004 } from "./noticia-004";
import { cues004 } from "./cues-004";
import { PistaSonido } from "./sound/PistaSonido";

/**
 * PROYECTO 004 — Valle de San Nicolás (El Colombiano, 2026-07-25).
 * Plan y decisiones: proyectos/004/artefactos/01-noticia.md
 *
 * Tres capas hermanas, en el orden de z del director (§3b):
 *   1. <PistaNoticia>  las 17 tomas con su fondo (papel / cine)
 *   2. <Audio>         la voz en off — manda sobre todo lo demás
 *   3. <PistaSonido>   los SFX, por debajo, con ducking de −5 dB
 *
 * La voz va a volumen 1 y los SFX ya vienen calibrados por pico (TARGET_DBFS)
 * más el ducking global: por eso aquí no hay ningún número de mezcla suelto.
 *
 * ⚠️ La pista de voz es una GUÍA generada con la voz de sistema (Paulina, es_MX)
 * porque la cuenta de HeyGen no tiene clave cargada. Para publicar, sustituye
 * `public/noticias/004-vo.wav` por la locución definitiva y vuelve a correr
 * `generar-vo.sh` con el mismo guion: los frames del plan se recalculan solos.
 *
 * PENDIENTE: subtítulos sincronizados (`subtitulos-004.ts` + <SubtitulosSync
 * yPct={78}>). El guion ya está segmentado por toma en proyectos/004/guion-vo.txt.
 */
export const Noticia004: React.FC = () => (
  <AbsoluteFill>
    <PistaNoticia tomas={noticia004} />
    <Audio src={staticFile("noticias/004-vo.wav")} />
    <PistaSonido cues={cues004} duckDb={-5} />
  </AbsoluteFill>
);
