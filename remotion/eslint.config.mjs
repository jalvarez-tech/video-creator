import { config } from "@remotion/eslint-config-flat";

/**
 * EL LÍMITE ENTRE MOTOR Y PROYECTOS, en el linter.
 *
 * `src/motor/` es lo reutilizable; `src/proyectos/00N/` es un vídeo concreto.
 * La dependencia va en UNA dirección: un proyecto usa el motor, nunca al revés.
 *
 * Esto no es teoría. Antes de separar había seis imports en la dirección mala,
 * y el peor era el tipo `Segmento` —el contrato de todo el sistema de
 * subtítulos— definido dentro de `subtitulos-001.ts`, los datos del vídeo 001:
 * no se podía borrar ese proyecto sin romper el motor. Con la carpeta sola no
 * basta, porque el fallo se cuela con un autocompletado; con esta regla, no
 * compila el lint.
 *
 * Un proyecto tampoco importa de otro: si el 005 necesita algo del 003, eso es
 * la señal de que ese algo pertenece al motor. Súbelo, no lo enlaces.
 */
export default [
  ...config,
  {
    files: ["src/motor/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["**/proyectos/**", "../proyectos/*", "../../proyectos/*"],
              message:
                "El motor no puede depender de un proyecto. Si lo necesitas en varios vídeos, súbelo a src/motor/; si es de un vídeo solo, va en src/proyectos/00N/.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/proyectos/*/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              // Solo las carpetas NUMERADAS (001, 002…): `../../motor/*` es la
              // dirección buena y tiene que seguir pasando.
              // `../001/x` desde 002/ y `../../001/x` desde 002/sub/.
              group: ["../[0-9]*/**", "../../[0-9]*/**", "**/proyectos/[0-9]*/**"],
              message:
                "Un proyecto no importa de otro proyecto. Lo que compartan dos vídeos pertenece a src/motor/.",
            },
          ],
        },
      ],
    },
  },
];
