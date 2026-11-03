// Vuelca la envolvente de la música de audio-067.ts (los trozos y su ganancia en frames de la comp) para depurar la puerta.
import { cargaTs, RAIZ } from "../../../remotion/src/motor/metraje/revisar-metraje.mjs";
import { join } from "node:path";
const m = await cargaTs({ a: join(RAIZ, "remotion/src/proyectos/067/audio-067.ts"), t: join(RAIZ, "remotion/src/motor/sound/tramos.ts") });
const musica = m.a.audio067.filter((x) => /^musica/.test(x.id));
for (const t of musica) console.log(t.id, "en", t.en, "dur", t.dur, "desde", t.desde.toFixed(3), JSON.stringify(t.ganancia.map(([f, v]) => [f, Number(v.toFixed(3))])));
const nivel = (f) => { const t = musica.find((x) => f >= x.en && f < x.en + x.dur); return t ? m.t.volumenDe(t, f - t.en) : 0; };
for (const f of [0, 1, 3, 86, 87, 92, 97, 98, 99, 218, 225, 231, 233, 450, 453, 463, 465, 657, 672, 674, 938, 940, 945, 950, 951, 952, 953, 1000, 1056, 1070, 1078, 1079, 1080, 1081]) console.log("f", f, nivel(f).toFixed(3));
