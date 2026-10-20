# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "pillow"]
# ///
import subprocess, sys, io, numpy as np
from PIL import Image
v=sys.argv[1]; fs=[int(x) for x in sys.argv[2].split(",")]
def luma(n):
    r=subprocess.run(["ffmpeg","-nostdin","-v","error","-i",v,"-vf",f"select=eq(n\\,{n}),scale=270:480","-frames:v","1","-vsync","0","-f","image2pipe","-vcodec","png","-"],capture_output=True)
    a=np.asarray(Image.open(io.BytesIO(r.stdout)).convert("RGB"),dtype=float)[:int(480*.72)]
    return float((0.2126*a[...,0]+0.7152*a[...,1]+0.0722*a[...,2]).mean())
L={f:luma(f) for f in fs}
for a,b,q in [(183,184,"hook→piscina [disolv]"),(255,256,"piscina→SK [CORTE]"),(346,347,"SK→SK2 [disolv]"),(434,435,"SK2→MD02 [disolv]"),(542,543,"MD02→MD03 [disolv]"),(740,741,"MD03→alcoba [disolv]"),(844,845,"alcoba→baño [CORTE]"),(934,935,"baño→terraza [CORTE]"),(1085,1086,"terraza→CTA [disolv]")]:
    print(f"f{a}→f{b} {q:24s} {L[a]:6.1f} → {L[b]:6.1f}  salto {L[b]-L[a]:+6.1f}")
