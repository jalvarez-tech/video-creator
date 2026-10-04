import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { APEX_012 } from "./look-012";

/**
 * LAS DOS TOMAS A PANTALLA COMPLETA — las «imágenes de transición» del encargo.
 *
 * POR QUÉ ES JSX A MANO. El plan de gráficos monta OVERLAYS sobre un vídeo que
 * ya existe: no tiene `media` (eso vive en el dialecto editorial, que trae su
 * propio mundo por toma). El molde `pantalla` sí pinta un fondo, pero lo hace
 * a través del mapa `fondos` y su componente se monta SIN PROPS y dentro de la
 * Sequence de la toma — o sea que no puede saber en cuál de las dos está. Por
 * eso la composición le pasa un fondo transparente (`FONDOS_012`) y el fondo
 * real lo pinta esto, que sí razona en frames ABSOLUTOS.
 *
 * POR QUÉ EL AVATAR NO SE DESMONTA. Estas dos capas son opacas y lo tapan, pero
 * el <OffthreadVideo> sigue montado debajo. Es la alternativa de una sola
 * fuente que da R10: desmontarlo se llevaría LA VOZ con él y la pieza se
 * quedaría muda 4,4 s — un fallo que no se ve en ningún still y que solo
 * aparece al reproducir. Aquí no puede pasar porque no hay nada condicional
 * alrededor del vídeo.
 *
 * Ventanas en frames ABSOLUTOS, medidas sobre la transcripción por palabra:
 *   · f297-368  «el APEX inmobiliario en Cartagena»  → la foto
 *   · f470-532  «de más de 5 países»                 → el negro del evento
 */

/** Foto de banco: Pexels · Andres Villamizar · crédito en broll/manifiesto.json. */
const CARTAGENA = "broll/012/t01-cartagena-cartagena-bocagrande-skyscrapers-waterfr.jpg";

const T1 = { de: 297, a: 368 } as const;
const T2 = { de: 470, a: 532 } as const;

/** Cruce de entrada y salida. 8 f (0,27 s): el estilo de la pieza es «lujo»
 *  (director §4), donde las cosas aterrizan, no golpean. */
const CRUCE = 8;

/** Opacidad de una ventana con sus dos cruces. */
const velo = (f: number, de: number, a: number): number =>
  interpolate(f, [de, de + CRUCE, a - CRUCE, a], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const TomasApex012: React.FC = () => {
  const frame = useCurrentFrame();
  const enT1 = frame >= T1.de && frame < T1.a;
  const enT2 = frame >= T2.de && frame < T2.a;
  if (!enT1 && !enT2) return null;

  return (
    <AbsoluteFill>
      {enT1 ? <TomaCartagena frame={frame} /> : null}
      {enT2 ? (
        <AbsoluteFill style={{ backgroundColor: APEX_012.color.fondoOscuro, opacity: velo(frame, T2.de, T2.a) }} />
      ) : null}
    </AbsoluteFill>
  );
};

/**
 * Cartagena, con Ken Burns lento y el encuadre SUBIDO.
 *
 * El desplazamiento no es un gesto, es lo que hace legible la toma. En el
 * recorte 9:16 a sangre el skyline de Bocagrande cae justo en el centro
 * (y ≈ 50 %), que es exactamente donde el molde `pantalla` ancla su texto: el
 * primer still salió con «APEX» encima de las grúas del puerto y el subtítulo
 * sobre el propio skyline.
 *
 * Subiendo la imagen un 15 % el skyline se va al tercio ALTO —donde se ve
 * entero, con el cielo detrás— y el bloque de texto cae sobre el AGUA, que es
 * la zona más uniforme y oscura de la foto y por tanto el mejor fondo posible
 * para tipografía blanca. La primera versión hacía lo contrario (bajarla) y por
 * eso hubo que oscurecer el velo hasta que Cartagena dejó de verse.
 */
const TomaCartagena: React.FC<{ frame: number }> = ({ frame }) => {
  const t = frame - T1.de;
  const dur = T1.a - T1.de;
  // Punch-in corto: de 1.30 a 1.42. Con la foto a 8829×11773, incluso a 1.42 la
  // ventana visible son ~4600 px de fuente para 1080 de salida (R16: la medida
  // real del hueco, no la del marco).
  const zoom = interpolate(t, [0, dur], [1.3, 1.42], { extrapolateRight: "clamp" });
  const bajada = interpolate(t, [0, dur], [-0.15, -0.132], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: velo(frame, T1.de, T1.a), backgroundColor: "#000" }}>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={staticFile(CARTAGENA)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${zoom}) translateY(${bajada * 100}%)`,
          }}
        />
      </AbsoluteFill>
      {/*
        EL VELO. Sin él el titular blanco se pierde contra el cielo claro de la
        foto (luma 152, medido por el banco al traerla). Es un degradado y no un
        plano, y va al REVÉS que el de la primera versión: SUAVE arriba (0,30),
        que es donde están el cielo y las torres y lo único que hay que hacer es
        asentarlas; más DENSO de la mitad para abajo (0,66), sobre el agua, que
        es donde se lee el bloque de texto.
        Con el velo plano y denso de la primera versión la foto se leía como un
        fondo gris y daba igual que fuera Cartagena. R13: solo capas que RESTAN
        luz sobre la imagen.

        ACLARADO en la misma pasada que el de la banda (petición del cliente) y
        en la misma proporción, ~0,72 del anterior, para que las dos tomas no
        acaben con dos criterios distintos de velo. Medido en el frame f330:
        la zona del texto sube de luma 65 a ~82 y la ciudad de 107 a ~124, y el
        verde #34D399 sobre 82 sigue en 4,2:1 — por encima del 3:1 que pide un
        titular de 124 px.
      */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(4,5,8,0.30) 0%, rgba(4,5,8,0.33) 26%, rgba(4,5,8,0.60) 46%, rgba(4,5,8,0.66) 70%, rgba(4,5,8,0.62) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

/**
 * El fondo que la pista de gráficos monta para `molde.fondo === "toma"`.
 * Transparente a propósito: el fondo real lo pinta `TomasApex012` (ver arriba).
 * Sin esto, el degradado de fábrica de `FONDOS_BASE` taparía la foto.
 */
export const FONDOS_012: Record<string, React.FC> = { toma: () => null };
