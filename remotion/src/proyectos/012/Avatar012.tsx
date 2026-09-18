import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { CamaraVirtual } from "../../motor/CamaraVirtual";
import { MONTADORES_BASE, PistaGraficos } from "../../motor/graficos/PistaGraficos";
import { PistaSonido } from "../../motor/sound/PistaSonido";
import { camara012 } from "./camara-012";
import { graficos012 } from "./graficos-012";
import { cues012 } from "./cues-012";
import { FONDOS_012, TomasApex012 } from "./TomasApex012";
import { APEX_012 } from "./look-012";

/**
 * Proyecto 012 — «Las conexiones correctas».
 *
 * Convocatoria personal del cliente a su red antes de APEX · El Wall Street
 * Inmobiliario (Cartagena, 17 y 18 de septiembre de 2026). Clip REAL de iPhone
 * en HDR HLG con rotación en la matriz: 1296×2304 · 30 fps · 835 f, normalizado
 * con `proyectos/012/normalizar.sh` (R19 + R21).
 *
 * Ensamblado por director-video; artefactos en proyectos/012/artefactos/.
 *
 * SIN MARCA, y es una decisión declarada (director §5b), no un olvido: el
 * cliente pidió que la pieza no firme como canal porque el mensaje es personal
 * («mándame un DM»). Por eso no hay <SelloCampana> y `APEX_012.sello.texto` es
 * `null`. Lo que sí pasa por parámetro es el LOOK, que toma el registro del
 * evento: negro, tipografía fina y un solo color vivo.
 *
 * SIN SUBTÍTULOS, por petición del cliente — y eso MUEVE TODO EL TEXTO. Con la
 * pista de subtítulos fuera, el tercio bajo queda libre y es donde el ojo ya
 * espera leer en un vertical, así que los gráficos bajan de la franja alta a la
 * banda de subtítulos (moldes `sello` y `cta`). Es literalmente R14, y es el
 * camino contrario al que siguió la primera versión de esta pieza: allí había
 * subtítulos en el 72 %, esos moldes anclan al 69,8 % y por eso todo tenía que
 * ir arriba. Quitada la pista, la razón desaparece.
 *
 * Z-ORDER (director §3b), de atrás a delante:
 *   1. avatar dentro de <CamaraVirtual> — solo él se reencuadra (R09)
 *   2. TomasApex012 — las dos pantallas completas (Cartagena · los 5 países)
 *   3. PistaGraficos — overlay FIJO, en la banda inferior (R14)
 *   4. PistaSonido — SFX por debajo de la voz, con ducking
 *
 * LA VOZ NO SE CORTA NUNCA (R10). El <OffthreadVideo> está montado en los 835
 * frames, sin nada condicional alrededor: las dos tomas a pantalla completa lo
 * TAPAN, no lo desmontan. Es la alternativa de una sola fuente que da la regla,
 * y cierra el fallo que ningún still enseña. Se comprueba OYENDO la prueba
 * 720p, no mirándola.
 */
export const Avatar012: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "black" }}>
    <CamaraVirtual cues={camara012}>
      <OffthreadVideo
        src={staticFile("avatar-012.mp4")}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </CamaraVirtual>
    <TomasApex012 />
    {/*
      `fondos={FONDOS_012}` es obligatorio aquí y no un ajuste fino: el molde
      `pantalla` pide un fondo por nombre y el de fábrica es un degradado gris
      opaco que taparía la foto de Cartagena. El mapa de la pieza lo deja
      transparente para que el fondo lo ponga <TomasApex012>, que sí razona en
      frames absolutos y puede distinguir una toma de la otra.
    */}
    <PistaGraficos
      plan={graficos012}
      montadores={MONTADORES_BASE}
      fondos={FONDOS_012}
      scrimColor={APEX_012.color.fondoOscuro}
    />
    <PistaSonido cues={cues012} duckDb={-4.5} />
  </AbsoluteFill>
);
