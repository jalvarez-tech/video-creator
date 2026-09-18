import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { MONTADORES_BASE, PistaGraficos } from "../../motor/graficos/PistaGraficos";
import { PistaMetraje } from "../../motor/metraje";
import { PistaSonido } from "../../motor/sound/PistaSonido";
import { graficos014 } from "./graficos-014";
import { cues014 } from "./cues-014";
import { LOOK_014, LOOK_INSERTOS_014 } from "./look-014";
import { insertos014 } from "./metraje-014";

/**
 * Proyecto 014 — «Publica en minutos».
 *
 * El cliente a cámara (selfie de mano, en una nave de evento) presentando su
 * agente de IA para creadores de contenido: subes el vídeo y salen los
 * subtítulos, las imágenes de banco y la publicación en minutos. Clip REAL de
 * iPhone en HDR HLG con rotación en la matriz: 1080×1920 · 30 fps · 1471 f,
 * normalizado con `proyectos/014/normalizar.sh` (R19 + R21).
 *
 * Encargo literal: «agrégale textos al vídeo y efectos de sonido cuando
 * entren». Ensamblado por director-video; artefactos en proyectos/014/artefactos/.
 *
 * SIN MARCA, y es una decisión declarada (director §5b), no un olvido: es un
 * mensaje personal («Hola, mi nombre es…») de su marca propia, que no tiene
 * fichero en `src/marcas/`, y el encargo no pide sello. Por eso no hay
 * <SelloCampana> y `LOOK_014.sello.texto` es `null`. Lo que sí pasa por
 * parámetro es el LOOK (el verde que él pidió en el 012 y el 013).
 *
 * SIN SUBTÍTULOS —preferencia del cliente en sus piezas de avatar— y eso
 * DECIDE el molde de las siete tomas (R14): con la pista fuera, el tercio bajo
 * queda libre y todo el texto vive ahí (`sello`). `subtitulos-014.ts` se queda
 * desconectado y se exporta a `.srt` como captions de plataforma.
 *
 * SIN CÁMARA VIRTUAL, también declarado: el encargo es texto y sonido, y el
 * plano es un selfie de mano que ya se mueve solo (su brazo, su mano entrando
 * en cuadro tres veces). Un punch-in encima pelearía con ese movimiento, y
 * ninguna cámara puede subir por debajo de los rótulos sin que se note (R09).
 * Por eso el clip se normaliza a 1080×1920 NATIVOS, no a 1296 como el 012.
 *
 * 3.ª PASADA — B-ROLL EN CUATRO MOMENTOS (petición del cliente: «imágenes que
 * complementen lo que estoy hablando en momentos estratégicos»). Seis planos de
 * banco, ~13 s de 49, cada uno sobre la frase que ilustra y cortando en los
 * golpes que ya existían (una palabra o el aterrizaje de un ✓/✗). Plan en
 * `metraje-014.ts`, puerta en `proyectos/014/revisar-014.mjs`.
 *
 * Z-ORDER (director §3b), de atrás a delante:
 *   1. el clip a sangre — nada lo reencuadra
 *   2. PistaMetraje — los insertos, a sangre; entre ellos no pinta nada y se
 *      ve él. Van DEBAJO de los gráficos: el velo y el texto de la banda siguen
 *      encima del b-roll, igual que encima de su cara
 *   3. PistaGraficos — overlay FIJO en la banda inferior (R14), velo acoplado
 *   4. PistaSonido — un SFX por entrada de texto, por debajo de la voz, SIN ducking (medido: ver cues-014.ts)
 *
 * LA VOZ NO SE CORTA NUNCA (R10). El <OffthreadVideo> está montado en los 1471
 * frames y no hay nada condicional alrededor: los insertos lo TAPAN, no lo
 * desmontan, y van mudos (`bancos.py` les quita el audio al traerlos).
 */
export const Avatar014: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "black" }}>
    <OffthreadVideo
      src={staticFile("avatar-014.mp4")}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
    <PistaMetraje cortes={insertos014} look={LOOK_INSERTOS_014} />
    {/*
      `scrimColor` explícito y no por defecto: el contraste de la banda se mide
      componiendo el vídeo contra ESTE negro (#08090C, el del 012). Dejarlo al
      defecto de la capa sería medir una cosa y renderizar otra.
    */}
    <PistaGraficos
      plan={graficos014}
      montadores={MONTADORES_BASE}
      scrimColor={LOOK_014.color.fondoOscuro}
    />
    {/*
      `duckDb={0}` y no los −4,5 de las otras piezas con voz: aquí la voz es
      continua y alta (−17,7 LUFS, sin pausas) y con el ducking los SFX no se
      oían (medido: delta ±0,5 dB en las 17 entradas). El encargo es oírlos.
      El nivel sale del RMS medido de cada archivo (`cues-014.ts`) y la voz sigue
      mandando: picos en −3,7 dBFS contra −18 del SFX más alto.
    */}
    <PistaSonido cues={cues014} duckDb={0} />
  </AbsoluteFill>
);
