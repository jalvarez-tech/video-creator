// Imprime las palabras de un JSON de whisper --palabras: texto, inicio (reparto) y fin DTW (t_dtw, centésimas), con confianza media.
import { readFileSync } from 'node:fs';
const j = JSON.parse(readFileSync(process.argv[2], 'utf8'));
for (const t of j.transcription) {
  const txt = t.text.trim();
  if (!txt || /^\[.*\]$/.test(txt)) continue;
  const toks = (t.tokens || []).filter((k) => !k.text.startsWith('[_'));
  const p = toks.length ? toks.reduce((a, k) => a + k.p, 0) / toks.length : 0;
  const dtw = toks.length ? Math.max(...toks.map((k) => k.t_dtw)) / 100 : -1;
  console.log(`${(t.offsets.from / 1000).toFixed(2)}-${(t.offsets.to / 1000).toFixed(2)}  dtw_fin ${dtw.toFixed(2)}  p ${p.toFixed(2)}  ${txt}`);
}
