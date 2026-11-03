/**
 * Las LOCUCIONES entregadas (john-1 … isabella-2), con su duración medida. GENERADO por `node proyectos/069/normalizar.mjs --voz`: no se edita a mano.
 * `audio-069.ts` pone cada una en el frame de su hueco (`voz-069.ts`) y `revisar-069.mjs` comprueba que cabe.
 */
export interface VozEntregada {
  /** Ruta dentro de remotion/public/. */
  src: string;
  /** Segundos que dura. */
  dur: number;
  /** Sonoridad con la que llegó (LUFS). */
  lufsOriginal: number;
  /** Ganancia que se le aplicó para llegar a −15 LUFS. */
  gananciaDb: number;
}

export const VOCES_ENTREGADAS: Readonly<Record<string, VozEntregada>> = {};
