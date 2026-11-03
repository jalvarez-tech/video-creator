#!/bin/bash
# La base muda (`--props={"sinSubtitulos":true} --muted --crf=6`) contra la final: mismos fotogramas y la mitad de ARRIBA (donde nunca hubo subtítulos) casi idéntica (PSNR > 30 dB).
# Uso: proyectos/068/herramientas/base-vs-final.sh <base.mp4> <final.mp4>
base="$1"; final="$2"; tmp="$(mktemp -d)"
echo "fotogramas: base $(ffprobe -v error -select_streams v:0 -count_frames -show_entries stream=nb_read_frames -of csv=p=0 "$base") · final $(ffprobe -v error -select_streams v:0 -count_frames -show_entries stream=nb_read_frames -of csv=p=0 "$final")"
for zona in "arriba:crop=iw:ih/2:0:0" "abajo:crop=iw:ih/2:0:ih/2"; do
  nombre="${zona%%:*}"; filtro="${zona#*:}"
  ffmpeg -nostdin -v error -i "$base" -i "$final" -filter_complex "[0:v]${filtro},format=yuv420p[a];[1:v]${filtro},format=yuv420p[b];[a][b]psnr=stats_file=$tmp/$nombre.txt" -f null - 2>/dev/null
  python3 - "$tmp/$nombre.txt" "$nombre" <<'PY'
import re,sys
v=[]
for l in open(sys.argv[1]):
    m=re.search(r'psnr_avg:(\S+)',l)
    if m: v.append(float(m.group(1)) if m.group(1)!='inf' else 99.0)
print(f"mitad de {sys.argv[2]}: {len(v)} fotogramas · PSNR medio {sum(v)/len(v):.1f} dB · mínimo {min(v):.1f} dB (en el fotograma {v.index(min(v))}) · fotogramas < 30 dB: {sum(1 for x in v if x<30)}")
PY
done
rm -rf "$tmp"
