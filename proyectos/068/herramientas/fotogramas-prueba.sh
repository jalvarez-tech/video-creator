#!/bin/bash
# Extrae del MP4 de la prueba los fotogramas clave (frame de la composición → PNG) y arma la hoja de contactos de un fotograma cada 1,5 s.
cd "$(dirname "$0")/../pruebas-720p" || exit 1
for f in 0 100 270 450 540 620 685 832 960 1045 1065 1090; do
  ffmpeg -nostdin -y -v error -i 068-recorrido.mp4 -vf "select=eq(n\,$f)" -vsync 0 -frames:v 1 "fotogramas/f$(printf %04d $f).png"
done
ffmpeg -nostdin -y -v error -i 068-recorrido.mp4 -vf "fps=1/1.5,scale=216:-1,tile=5x5" -frames:v 1 hoja.png
ls fotogramas
