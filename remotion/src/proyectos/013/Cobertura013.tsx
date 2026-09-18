import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { MONTADORES_BASE, PistaGraficos } from "../../motor/graficos/PistaGraficos";
import { PistaSonido } from "../../motor/sound/PistaSonido";
import { SelloCampana } from "../../motor/SelloCampana";
import { graficos013 } from "./graficos-013";
import { cues013 } from "./cues-013";
import { LOOK_013 } from "./look-013";

/**
 * Proyecto 013 — «Estamos en el APEX».
 *
 * Cobertura de Propiedades Luxur desde APEX · El Wall Street Inmobiliario
 * (Cartagena, 17 y 18 de septiembre de 2026), el mismo evento al que convocaba
 * el 012. Clip REAL de iPhone con rotación en la matriz: 1080×1920 · 30 fps ·
 * 383 f, normalizado con `proyectos/013/normalizar.sh` (R19).
 *
 * Ensamblado por director-video; artefactos en proyectos/013/artefactos/.
 *
 * CON MARCA, y es lo que la separa del 012 (director §5b). Aquella pieza era un
 * mensaje personal del cliente a su red y salía a propósito sin sello; ésta es
 * contenido de canal, así que lleva `<SelloCampana>` con el perfil de Luxur en
 * todos los frames. El único valor que la pieza cambia del canal es
 * `acentoOscuro` —el VERDE que pidió el cliente, el mismo del 012—, y está
 * medido en `look-013.ts`. Ese valor mueve a la vez el texto de acento de los
 * rótulos y el punto del `<SelloCampana>`, a propósito (R15).
 *
 * SIN SUBTÍTULOS (decisión de cliente) — y eso DECIDE el molde de las cuatro
 * tomas, no es una capa que se quita al final (R14). Con la pista fuera, el
 * tercio bajo queda libre y todo el texto vive ahí (`sello` y `cta`). Tampoco
 * se deja un `.srt` para los captions de plataforma, y esa sí es una renuncia
 * declarada: el audio es de evento y whisper-small no lo transcribe con
 * garantías —oscila entre lecturas incompatibles del apellido de ella—, así que
 * publicar esa pista sería publicar errores. Los rótulos, en cambio, no citan:
 * por eso no dependen de la transcripción.
 *
 * SIN CÁMARA VIRTUAL, y también es una decisión declarada. El plano es de mano
 * y ya se mueve solo —la encuadre deriva visiblemente en los 12,8 s—; un
 * punch-in encima pelearía con ese movimiento en vez de sumarle. Por eso el
 * clip se normaliza a 1080×1920 NATIVOS y no a 1296 como el 011 y el 012: el
 * ×1,2 de aquéllos era el techo del punch-in, y sin punch-in sería ampliar por
 * ampliar.
 *
 * Z-ORDER (director §3b), de atrás a delante:
 *   1. el clip a sangre — nada lo reencuadra
 *   2. PistaGraficos — overlay FIJO, en la banda inferior (R14), scrim acoplado
 *   3. SelloCampana — el watermark del canal, en la franja ALTA
 *   4. PistaSonido — tres whooshes por debajo de la voz, con ducking
 *
 * LA VOZ NO SE CORTA NUNCA (R10). El <OffthreadVideo> está montado en los 383
 * frames y no hay nada condicional alrededor: ninguna toma lo desmonta, porque
 * ninguna cubre (los cuatro rótulos son de banda, no de pantalla completa).
 */
export const Cobertura013: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "black" }}>
    <OffthreadVideo
      src={staticFile("clip-013.mp4")}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
    {/*
      `scrimColor` explícito y no por defecto: el contraste de `look-013.ts`
      está medido componiendo el vídeo contra ESTE color (#0E1015). Dejarlo al
      defecto de la capa sería medir una cosa y renderizar otra.
    */}
    <PistaGraficos
      plan={graficos013}
      montadores={MONTADORES_BASE}
      scrimColor={LOOK_013.color.fondoOscuro}
    />
    <SelloCampana marca={LOOK_013} />
    <PistaSonido cues={cues013} duckDb={-4.5} />
  </AbsoluteFill>
);
