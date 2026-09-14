/**
 * STREET CATS (@streetcats.food) — comida callejera en Caldas, Antioquia.
 * «Las mejores papas y alitas.» · Cra 48 # 132A sur-24 · domicilios por WhatsApp.
 *
 * Es el negocio que en el 008 aparecía como punto de recolección («el negocio
 * de mi hermana»). Aquí deja de ser un dato dentro de otra pieza y pasa a ser
 * el canal: su primer vídeo propio (proyecto 009).
 *
 * LA PALETA SALE DEL PERFIL, MEDIDA, NO IMAGINADA. Cuantizando los posts de la
 * cuenta, el negro se lleva el 35-47 % de los píxeles y el resto es un ámbar
 * que cae entre #A86000 y #C07800 en un JPEG ya oscurecido por el grado del
 * propio post. El logo es un sello circular negro con el gato y «ALITAS Y
 * PAPAS». Así que la marca son DOS colores: negro y ámbar. No hay un tercero.
 *
 * EL ACENTO AQUÍ SÍ ES TINTA DE TEXTO, y por eso se elige claro: #FFB020 da
 * ≈11:1 sobre el negro del scrim, muy por encima del 4,5:1 de texto. Es la
 * corrección del canal Luxur aprendida al derecho (memoria
 * `acento-luxur-contraste`): allí el naranja daba 2,62:1 porque iba sobre
 * PAPEL; aquí no hay papel — esta pieza es toda registro oscuro sobre metraje.
 * Contrapartida declarada: este ámbar sobre blanco daría 2,04:1, así que no se
 * pone nunca sobre claro. Este canal no tiene registro claro y por eso no pasa.
 *
 * `acentoOscuro` es EL MISMO ámbar a propósito. La deuda que `marca.ts` declara
 * —dos acentos conviviendo, teal de plantilla y el del canal— no se hereda aquí:
 * un canal que nace hoy y vive entero sobre vídeo oscuro no tiene por qué
 * arrastrarla.
 *
 * EL METRAJE VA AL REVÉS QUE EN CHOCÓ. Allí el look era documental: desaturado,
 * con grano, para que no pareciera publicidad. Esto ES publicidad de comida, y
 * la comida se vende SATURADA: saturación por encima de 1, contraste alto para
 * que el dorado de la papa separe del negro de la plancha, y viñeta fuerte
 * porque en 9:16 la mirada tiene que caer en el centro del plato. El grano se
 * queda bajo: aquí no aporta verdad, solo ensucia el dorado.
 *
 * Tipografía: la del dialecto de gráficos (Inter), NO la del sistema. La letra
 * real de la marca es una display con goteo de graffiti que no está instalada,
 * y declararla sin tabla medida en `plan/avances.ts` apagaría R09 en silencio
 * (motor/marca.ts). Se deja para cuando se mida con `generar-avances.mjs`.
 */
import { MARCA_BASE } from "../motor/marca";
import type { Marca } from "../motor/marca";

export const STREETCATS: Marca = {
  ...MARCA_BASE,
  nombre: "Street Cats (@streetcats.food)",
  /** El watermark: el nombre del negocio, que es lo que se busca luego. */
  sello: { texto: "STREET CATS" },
  color: {
    ...MARCA_BASE.color,
    /** Ámbar de papa frita. 11:1 sobre el scrim negro — es tinta de titular. */
    acento: "#FFB020",
    /** El mismo ámbar con cuerpo, para el relleno de los chips. */
    acentoChip: "#E08900",
    /** Registro oscuro = registro único en este canal: mismo acento, sin deuda. */
    acentoOscuro: "#FFB020",
    /** Negro cálido, no azulado: el de la plancha y el del sello del logo. */
    fondoOscuro: "#0B0906",
    negro: "#000000",
    blanco: "#FFFFFF",
    /** No hay registro claro en este canal; quedan definidos por contrato. */
    papel: "#F2ECE0",
    hueso: "#FAF6EE",
    tinta: "#14100A",
    tintaSuave: "#5A5245",
    linea: "rgba(255,176,32,0.22)",
  },
  /** Publicidad de comida: se sube la saturación en vez de bajarla. */
  metraje: { saturacion: 1.08, contraste: 1.14, calido: 0.06, grano: 0.028, vineta: 0.32 },
};
