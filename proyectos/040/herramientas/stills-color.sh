#!/bin/zsh
# Los fotogramas de la medida del color: a mitad de cada plano y el último/primero de cada corte seco, a escala 1, con graduar y sin graduar.
cd "$(dirname "$0")/../../.." || exit 1
export NODE_OPTIONS="--require $PWD/proyectos/040/herramientas/clonar-al-copiar.cjs"
F=54,200,356,455,543,650,730,775,867,1000,107,108,304,305,406,407,501,502,584,585,708,709,750,751,798,799,934,935
node proyectos/040/herramientas/stills-multiples.mjs Recorrido040 1 proyectos/040/pruebas-720p/stills-despues "$F" angle
node proyectos/040/herramientas/stills-antes.mjs 1 proyectos/040/pruebas-720p/stills-antes "$F"
