# /// script
# requires-python = ">=3.10"
# dependencies = ["pillow"]
# ///
"""hoja-mini.py salida.png clip paso ancho [t0 t1] — fotogramas del MP4 NORMALIZADO (1296x2304) cada `paso` s, en filas de 8, con su segundo."""
import subprocess, sys, io
from PIL import Image, ImageDraw
salida, clip, paso, ancho = sys.argv[1], sys.argv[2], float(sys.argv[3]), int(sys.argv[4])
dur = float(subprocess.run(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",clip],capture_output=True,text=True).stdout)
t0 = float(sys.argv[5]) if len(sys.argv) > 5 else 0.0
t1 = float(sys.argv[6]) if len(sys.argv) > 6 else dur
imgs=[]; t=t0
while t < t1:
    r = subprocess.run(["ffmpeg","-v","error","-ss",f"{min(t,dur-0.05):.3f}","-i",clip,"-frames:v","1","-vf",f"scale={ancho}:-1","-f","image2pipe","-vcodec","png","-"],capture_output=True)
    im = Image.open(io.BytesIO(r.stdout)).convert("RGB"); d=ImageDraw.Draw(im); d.rectangle([0,0,44,13],fill=(0,0,0)); d.text((2,1),f"{t:.1f}s",fill=(255,255,0)); imgs.append(im); t+=paso
cols = 8; H=imgs[0].height; filas=(len(imgs)+cols-1)//cols
hoja=Image.new("RGB",(ancho*min(cols,len(imgs)),H*filas),(20,20,20))
for i,im in enumerate(imgs): hoja.paste(im,((i%cols)*ancho,(i//cols)*H))
hoja.save(salida); print(salida, hoja.size)
