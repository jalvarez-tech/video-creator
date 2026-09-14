/**
 * EL SELLO DE CAMPAÑA — watermark persistente en la franja ALTA.
 *
 * Nació dentro de `proyectos/008/Avatar008.tsx` y subió aquí cuando lo pidió una
 * SEGUNDA pieza (el 010). No subió por gusto: el linter del repo prohíbe que un
 * proyecto importe de otro (`no-restricted-imports` en `eslint.config.mjs`), y
 * esa regla existe justamente para forzar esta conversación en vez de dejar que
 * `proyectos/010` dependa de `proyectos/008` para siempre.
 *
 * POR QUÉ NO USA EL `Sello` DEL FORMATO NOTICIAS: aquel vive en la banda
 * INFERIOR, que en estas piezas es de las tarjetas (008) o de los subtítulos
 * bilingües (010). Este dice lo mismo con el mismo lenguaje —píldora traslúcida
 * + punto de acento— pero arriba.
 *
 * VA FUERA DE `<CamaraVirtual>`: un sello que respira delata el zoom.
 *
 * `marca.sello.texto === null` (el suelo `MARCA_BASE`) devuelve `null`, que es
 * el aviso del §5b del director: una composición sin marca sale sin watermark.
 */
import React from "react";
import type { Marca } from "./marca";

export const SelloCampana: React.FC<{ marca: Marca }> = ({ marca }) => {
  const texto = marca.sello.texto;
  if (!texto) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: 84,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 26px",
          borderRadius: 999,
          border: "2px solid rgba(255,255,255,0.55)",
          background: "rgba(0,0,0,0.35)",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
          fontSize: 26,
          fontWeight: 800,
          letterSpacing: 2,
          color: "#FFFFFF",
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: 999,
            background: marca.color.acentoOscuro,
          }}
        />
        {texto}
      </div>
    </div>
  );
};
