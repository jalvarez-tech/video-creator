/**
 * LAS PIEZAS VERTICALES DE LAS HISTORIAS DE MAS (101-104): el papel recortado y el trazo a mano del 097, recolocados en
 * 9:16 (`proyectos/101/artefactos/02-layout.md`). Lo que no cambia se importa del 097 tal cual (identidad, letra, borde
 * rasgado, texto con acento, estrellas): las historias se leen como la misma campaña que el vídeo largo.
 *
 * ZONAS SEGURAS de Reels/TikTok/Shorts en 1080×1920 (02-layout §2): arriba, hasta y = 230, va la cabecera de la app;
 * abajo, desde y ≈ 1500, el pie de foto y los botones; a la derecha, desde x ≈ 960 entre y = 1000 y 1700, la columna de
 * iconos. El texto que se lee vive entre y = 240 y y = 1420, y centrado en 880 px de ancho como mucho.
 *
 * Todo depende solo del frame y de semillas fijas.
 */
import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { EASE } from "../../motor/motion";
import { C, DOSIS, EstrellaSvg, MONTSERRAT, PAPEL_URL, TextoAcento, bordeRasgado, rampa, useMuelle } from "../097/piezas-097";
import { CUENTA } from "../097/textos-097";
import type { TiraHistoria } from "./historia";

/**
 * El papel en vertical: la textura del 097 es 16:9 (2208×1242); aquí cubre el ALTO (3414×1920) y va anclada a la
 * pantalla, así que la tira de arriba, la de abajo y la hoja del cierre comparten las mismas arrugas, sin costura.
 */
export const fondoPapelV = (color: string = C.papel): React.CSSProperties => ({
  backgroundColor: color,
  backgroundImage: color === C.papel ? `url(${PAPEL_URL})` : undefined,
  backgroundSize: "3414px 1920px",
  backgroundPosition: "-1167px 0px",
  backgroundAttachment: "fixed",
});

/**
 * La tira en vertical: la `TiraPapel` del 097 (se despega en 8 f, la frase sube 6 px y aparece en 10 f, sale con un
 * fundido de 6 f, el texto no se mueve mientras se lee), centrada y anclada ARRIBA o ABAJO.
 */
export const TiraV: React.FC<{
  t: TiraHistoria;
  zona: "arriba" | "abajo";
  px: number;
  peso?: number;
  maxAncho?: number;
}> = ({ t, zona, px, peso = 600, maxAncho = 880 }) => {
  const frame = useCurrentFrame();
  if (frame < t.en || frame >= t.sale) return null;
  // La que entra en f0 ya está ENTERA en f0: es la miniatura y el gancho (en una red, el primer frame es la portada).
  const entera = t.en === 0;
  const abre = entera ? 100 : rampa(frame, t.en, t.en + 8, 0, 100, EASE.outCubic);
  const textoOp = entera ? 1 : rampa(frame, t.en + 3, t.en + 13);
  const textoY = entera ? 0 : rampa(frame, t.en + 3, t.en + 13, 6, 0);
  const fuera = rampa(frame, t.sale - 6, t.sale, 1, 0, EASE.inOutCubic);
  const indigo = t.piel === "indigo";
  const giro = zona === "arriba" ? -1.2 : 0.8;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        ...(zona === "arriba" ? { top: 300 } : { bottom: 560 }),
        display: "flex",
        justifyContent: "center",
        opacity: fuera,
        pointerEvents: "none",
      }}
    >
      <div style={{ transform: `rotate(${giro}deg)` }}>
        <div style={{ clipPath: `inset(-20px ${(100 - abre).toFixed(2)}% -20px -20px)` }}>
          <div
            style={{
              ...(indigo ? { backgroundColor: C.tinta } : fondoPapelV()),
              clipPath: bordeRasgado(t.id),
              padding: `${Math.round(px * 0.34)}px ${Math.round(px * 0.6)}px ${Math.round(px * 0.42)}px`,
              maxWidth: maxAncho,
            }}
          >
            <div
              style={{
                ...DOSIS,
                fontWeight: peso,
                fontSize: px,
                lineHeight: 1.16,
                color: indigo ? C.blanco : C.tinta,
                opacity: textoOp,
                transform: `translateY(${textoY.toFixed(2)}px)`,
                textAlign: "center",
                textWrap: "balance",
              }}
            >
              <TextoAcentoV texto={t.texto} marcas={t.marcas ?? []} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PUNTUACION = /^[,.;:!?…»”]+/;

/**
 * El `TextoAcento` del 097 con la puntuación que sigue a un acento PEGADA a él: el acento es `inline-block` y, en
 * columnas estrechas, la coma saltaba sola a la línea siguiente («hogar / , donde yo vivo», rev. 1). No se toca el del
 * 097 (movería sus piezas ya exportadas): se le pasa cada acento suelto, envuelto con su puntuación en `nowrap`.
 */
const TextoAcentoV: React.FC<{ texto: string; marcas?: (TiraHistoria["marcas"] extends (infer M)[] | undefined ? M : never)[] }> = ({ texto, marcas = [] }) => {
  const trozos = texto.split("*");
  let k = -1;
  return (
    <>
      {trozos.map((t, i) => {
        if (i % 2 === 0) {
          const resto = i > 0 ? t.replace(PUNTUACION, "") : t;
          return <React.Fragment key={i}>{resto}</React.Fragment>;
        }
        k++;
        const pegada = (trozos[i + 1] ?? "").match(PUNTUACION)?.[0] ?? "";
        return (
          <span key={i} style={{ whiteSpace: "nowrap" }}>
            <TextoAcento texto={`*${t}*`} marcas={[marcas[k] ?? null]} />
            {pegada}
          </span>
        );
      })}
    </>
  );
};

/** La etiqueta de la campaña, arriba, sobre la pregunta: en f0 ya está (es la miniatura) y se va con el metraje. */
export const KickerV: React.FC<{ sale: number }> = ({ sale }) => {
  const frame = useCurrentFrame();
  if (frame >= sale) return null;
  const op = rampa(frame, sale - 8, sale, 1, 0);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 232, display: "flex", justifyContent: "center", opacity: op }}>
      <div style={{ transform: "rotate(1.5deg)" }}>
        <div style={{ backgroundColor: C.tinta, clipPath: bordeRasgado("kicker-v", 12, 3), padding: "6px 20px 8px", display: "flex", alignItems: "center", gap: 10 }}>
          <EstrellaSvg tam={30} />
          <span style={{ ...DOSIS, fontWeight: 700, fontSize: 30, color: C.blanco, letterSpacing: 0.5 }}>MAS Estrellitas 2026</span>
        </div>
      </div>
    </div>
  );
};

/**
 * EL CIERRE EN PAPEL, el mismo en las cuatro: la frase de la campaña («Miles de corazones unidos por amor.», 097 rev. 10),
 * cómo ayudar con los datos EXACTOS de `CUENTA` (los del 097, que su puerta y la de la serie comparan dígito a dígito),
 * las fechas y la firma CSR | MAS. Todos los textos son los ya aprobados en el 097: aquí no se inventa ninguno.
 * La hoja sube desde abajo en 12 f y lo demás entra escalonado; nada se queda congelado (la hoja deriva).
 */
export const CierreV: React.FC<{ en: number }> = ({ en }) => {
  const frame = useCurrentFrame();
  const titulo = useMuelle(en + 10, { damping: 18, mass: 0.8 });
  if (frame < en) return null;
  const sube = rampa(frame, en, en + 12, 1920, 0, EASE.outCubic);
  const dx = Math.sin(frame / 95) * 4;
  const dy = Math.cos(frame / 120) * 3;
  const op = (a: number) => rampa(frame, en + a, en + a + 12);
  const y = (a: number) => (1 - op(a)) * 14;
  return (
    <AbsoluteFill style={{ transform: `translateY(${sube}px)`, overflow: "hidden", backgroundColor: C.papel }}>
      <Img src={PAPEL_URL} style={{ position: "absolute", left: -1167 + dx, top: dy - 6, width: 3414, height: 1932 }} />
      <div style={{ position: "absolute", left: 90, right: 90, top: 300, ...DOSIS, color: C.tinta }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, opacity: op(4) }}>
          <EstrellaSvg tam={58} />
          <span style={{ fontWeight: 700, fontSize: 40, letterSpacing: 0.5 }}>MAS Estrellitas 2026</span>
        </div>
        <div style={{ marginTop: 26, fontWeight: 800, fontSize: 100, lineHeight: 1.04, opacity: Math.min(1, titulo * 1.4), transform: `translateY(${(1 - titulo) * 24}px)` }}>
          Miles de corazones
          <br />
          unidos por amor.
        </div>
        <div style={{ marginTop: 70, fontWeight: 800, fontSize: 58, lineHeight: 1.1, opacity: op(30), transform: `translateY(${y(30)}px)` }}>Haz tu donación</div>
        <div
          style={{
            marginTop: 20,
            backgroundColor: C.blanco,
            padding: "20px 30px 20px 24px",
            display: "flex",
            alignItems: "center",
            gap: 26,
            opacity: op(38),
            transform: `translateY(${y(38)}px)`,
          }}
        >
          <Img src={staticFile("mas-097/logo-bancolombia.svg")} style={{ width: 96, height: 96 }} />
          <div style={{ ...MONTSERRAT, color: C.tinta, fontVariantNumeric: "tabular-nums" }}>
            <div style={{ fontWeight: 600, fontSize: 30, lineHeight: 1.2 }}>
              {CUENTA.banco} · {CUENTA.tipo}
            </div>
            <div style={{ fontWeight: 800, fontSize: 62, lineHeight: 1.08, letterSpacing: 1 }}>{CUENTA.numero}</div>
            <div style={{ fontWeight: 600, fontSize: 30, lineHeight: 1.2 }}>NIT: {CUENTA.nit}</div>
          </div>
        </div>
        <div style={{ marginTop: 26, ...MONTSERRAT, fontWeight: 600, fontSize: 36, lineHeight: 1.3, opacity: op(50), transform: `translateY(${y(50)}px)`, fontVariantNumeric: "tabular-nums" }}>
          Envía el comprobante al
          <br />
          <span style={{ fontWeight: 800, fontSize: 44 }}>Cel: {CUENTA.celular}</span>
        </div>
        <div style={{ marginTop: 34, ...MONTSERRAT, fontWeight: 700, fontSize: 34, lineHeight: 1.25, opacity: op(62) }}>Del 15 de noviembre al 20 de diciembre</div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1330, display: "flex", justifyContent: "center", alignItems: "center", gap: 36, opacity: op(72) }}>
        <Img src={staticFile("mas-097/logo-csr-indigo.png")} style={{ height: 62 }} />
        <div style={{ width: 3, height: 104, backgroundColor: C.tinta, borderRadius: 2 }} />
        <Img src={staticFile("mas-097/logo-mas-indigo.png")} style={{ height: 104 }} />
      </div>
    </AbsoluteFill>
  );
};
