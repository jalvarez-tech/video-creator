#!/bin/bash
# Copia el material de la 068 del disco del rodaje a proyectos/068/original/ con el CÓDIGO del catálogo como nombre.
set -e
V="/Volumes/SSK SSD/Work/Propiedades Luxur/Lote - San Cristobal/Videos/videos"
O=/Users/nicecode/Work/jalvarez/video-creator/.claude/worktrees/san-cristobal-videos-34b9af/proyectos/068/original
cp "$V/1 Hooks/IMG_0953.MOV" "$O/HK04.MOV"
cp "$V/2 Mitad/IMG_0973.MOV" "$O/MD02.MOV"
cp "$V/5 Cta/IMG_0963.MOV" "$O/CT01.MOV"
cp "$V/4 Recorrido/IMG_0957.MOV" "$O/RC05.MOV"
cp "$V/4 Recorrido/IMG_0968.MOV" "$O/RC06.MOV"
cp "$V/4 Recorrido/IMG_0969.MOV" "$O/RC07.MOV"
cp "$V/3 Dron/DJI_20260718170459_0090_D.MP4" "$O/DR04.MP4"
cp "$V/3 Dron/DJI_20260718170754_0091_D.MP4" "$O/DR05.MP4"
cp "$V/3 Dron/DJI_20260718171109_0092_D.MP4" "$O/DR06.MP4"
echo COPIADO
