#!/usr/bin/env python3
"""lufs-caida.py <ruta> <t0> <t1> [paso=0.25] — para cada t: LUFS de [t-5,t] (antes), [t,t+5] y [t+5,t+10]; caídas a 5 y 10 s. Marca el primer t con ≥ 9 y ≥ 20."""
import subprocess, sys
ruta, t0, t1 = sys.argv[1], float(sys.argv[2]), float(sys.argv[3]); paso = float(sys.argv[4]) if len(sys.argv) > 4 else 0.25
def l5(t):
    r = subprocess.run(["ffmpeg","-nostdin","-hide_banner","-ss",f"{max(t,0):.3f}","-t","5","-i",ruta,"-af","ebur128","-f","null","-"],capture_output=True,text=True).stderr
    f=False
    for ln in r.splitlines():
        if "Integrated loudness" in ln: f=True
        if f and ln.strip().startswith("I:"):
            v=ln.split()[1]; return -70.0 if v in ("-inf",) else float(v)
    return -70.0
t=t0; primero=None
while t<=t1+1e-9:
    a,b,c=l5(t-5),l5(t),l5(t+5)
    ok = (a-b>=9.0 and a-c>=20.0)
    if ok and primero is None: primero=t
    print(f"t={t:8.2f}  antes {a:6.1f} · +5 s {b:6.1f} · +10 s {c:6.1f}   caída {a-b:5.1f} / {a-c:5.1f} {'✓' if ok else ''}")
    t+=paso
print("primer t que cumple:", primero)
