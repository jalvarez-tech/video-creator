import { Composition } from "remotion";
import { Avatar012 } from "./Avatar012";
import { framesDelMedio } from "../../motor/duracion";

/**
 * REGISTRO del proyecto 012. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no lo importa. El bloque es el mismo que registraba
 * `Root.tsx` (id, fps, tamaño, duración y respaldo): moverlo aquí no cambia
 * ningún píxel. (En `Root.tsx` este comentario había quedado encima del bloque
 * del 013; aquí vuelve con su composición.)
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 012 · CONVOCATORIA APEX ── (src/proyectos/012/)
        «Las grandes oportunidades necesitan las conexiones correctas»: el
        cliente convoca a su red antes de APEX (Cartagena, 17 y 18 de
        septiembre de 2026), pidiendo que quien tenga un lote o una
        oportunidad le escriba.

        SIN SUBTÍTULOS por petición del cliente, y eso MUEVE TODO EL TEXTO a
        la banda inferior (moldes `sello`/`cta`, R14): con la pista fuera, ese
        carril queda libre y es donde el ojo espera leer en un vertical. Los
        `subtitulos-012.ts` siguen en el proyecto, desconectados, por si se
        quieren subir como captions a la plataforma.

        SIN MARCA, y es una decisión del cliente declarada en la cabecera de
        `Avatar012.tsx`: el mensaje es personal, no de canal. El look lo pone
        el evento (`look-012.ts`), que NO vive en `src/marcas/` justamente
        porque no es un canal.

        Clip real de iPhone con las dos trampas que no se ven en un frame:
        `rotation=-90` en la matriz (R19) y HDR **HLG** (R21, medido: YAVG 143
        sin tone-map contra 122 con él). Se repone con
        `bash proyectos/012/normalizar.sh`. Clip: avatar-012.mp4 · 1296×2304 ·
        30 fps · 835 f — el fps ORIGINAL manda (R01).
        Artefactos: proyectos/012/artefactos/0{1,2,3}-*.md */}
    <Composition
      id="Avatar012"
      component={Avatar012}
      durationInFrames={835}
      fps={30}
      width={1080}
      height={1920}
      calculateMetadata={async () => ({
        durationInFrames: await framesDelMedio("avatar-012.mp4", 30, 835),
      })}
    />
  </>
);
