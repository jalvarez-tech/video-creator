# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy"]
# ///
"""emparejar-original.py original.mp4 paso_s clips_dir : para cada instante del original, el clip y el segundo que más se le parecen (MAE de grises 27x48, normalizado por media y desv.)."""
import subprocess, sys, glob, os, numpy as np
W,H=27,48
def frames(path, fps, ss=None, t=None):
    cmd=["ffmpeg","-nostdin","-v","error"]
    if ss is not None: cmd+=["-ss",str(ss)]
    cmd+=["-i",path]
    if t is not None: cmd+=["-t",str(t)]
    cmd+=["-vf",f"fps={fps},scale={W}:{H}:flags=area,format=gray","-f","rawvideo","-"]
    b=subprocess.run(cmd,capture_output=True).stdout
    a=np.frombuffer(b,dtype=np.uint8).reshape(-1,W*H).astype(np.float32)
    return a
def norm(a):
    a=a-a.mean(axis=1,keepdims=True); s=a.std(axis=1,keepdims=True)+1e-3
    return a/s
orig,paso,carpeta=sys.argv[1],float(sys.argv[2]),sys.argv[3]
o=norm(frames(orig,1/paso))
bases=[];meta=[]
for c in sorted(glob.glob(carpeta+"/*.mp4")):
    f=norm(frames(c,6))
    bases.append(f); meta+= [(os.path.basename(c)[:-4], i/6) for i in range(len(f))]
B=np.concatenate(bases)
print("original t | mejor clip@t (mae) | 2º clip distinto")
for i,v in enumerate(o):
    d=np.abs(B-v).mean(axis=1)
    j=np.argsort(d)
    m1=meta[j[0]]
    m2=next(meta[k] for k in j if meta[k][0]!=m1[0])
    d2=d[[k for k in j if meta[k][0]!=m1[0]][0]]
    print(f"{i*paso:5.1f}s | {m1[0]}@{m1[1]:5.2f} ({d[j[0]]:.2f}) | {m2[0]}@{m2[1]:5.2f} ({d2:.2f})")
