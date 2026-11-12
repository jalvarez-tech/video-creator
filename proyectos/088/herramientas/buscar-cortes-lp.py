#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy"]
# ///
"""
buscar-cortes.py (V9, Los Patios) — para cada canción: (1) todas las CAÍDAS completas (≥ 9 dB en los 5 s siguientes y ≥ 20 en los 10, sin recuperarse)
y (2) la REJILLA DE CORTES de la V9 sobre los golpes medidos antes de esa caída. A diferencia de la V8 (One Living, sin dron ni apertura,
con 4 planos de paseo), la estructura de Los Patios es la de la V4/V5:
  e0 (frame 0 · apertura) | e1 (entra Isabella: hook) | e2 (acaba el hook → paseo) | e3 | e4 | e5 (entra la mitad) | e6 (acaba la mitad → bloque 5) | e7 | e8 (la vista) | e9 (entra el CTA)
  9 planos entre los 10 cortes: apertura · hook · 3 de paseo · mitad · 3 del bloque 5 (el último, la vista, el MÁS LARGO del bloque).

Detector de golpes = el de medir-pista.py (80-3000 Hz, 6 ms/1 ms, subida ≥ 6 dB en 15 ms, distancia 350 ms).
Búsqueda = programación dinámica hacia atrás (alcanzabilidad) + enumeración acotada sobre los 10 cortes.
tipos de corte por defecto (V4): d d c c c d d c c d  (d = disolvencia que acaba en un golpe ≥ MIND, c = corte seco ≥ 7,4 dB)

Uso: R='[[60,105],[110,170],...]' TIPOS=ddcccddccd W=4.5 uv run buscar-cortes.py <MIND> "ruta.mp3" ...
Variables: R (9 pares de rangos de plano en frames), TIPOS (10 letras), W (el CTA entra hasta W s antes de la caída), T_F (instante fijo de la caída),
VISTA_MAS_LARGA (1 por defecto: el último plano del bloque 5 es el más largo), TOP (cuántas soluciones se imprimen), D1/D2 (umbrales de la caída).
"""
import subprocess, sys, json, os
import numpy as np
from scipy.signal import butter, find_peaks, sosfilt

MIND = float(sys.argv[1]); RUTAS = sys.argv[2:]
R = [(60,105),(110,170),                # apertura · hook
     (60,150),(60,150),(60,130),        # paseo
     (110,200),                          # mitad
     (50,120),(50,120),(90,150)]        # bloque 5 (el último es la vista)
R = [tuple(x) for x in json.loads(os.environ["R"])] if os.environ.get("R") else R
TIPOS = list(os.environ.get("TIPOS","ddcccddccd"))
import os
MINC = 7.4; W = float(os.environ.get('W','4.5'))

def decodifica(ruta):
    raw = subprocess.run(["ffmpeg","-nostdin","-v","error","-i",ruta,"-ac","1","-ar","48000","-f","f32le","-"],capture_output=True,check=True).stdout
    return np.frombuffer(raw,dtype=np.float32).astype(np.float64), 48000

def golpes_de(y, sr):
    sos = butter(4,[80,3000],btype="band",fs=sr,output="sos"); b = sosfilt(sos,y)
    win,hop = int(0.006*sr), int(0.001*sr)
    e = np.sqrt(np.convolve(b**2,np.ones(win)/win,mode="valid")[::hop]+1e-12); db = 20*np.log10(e)
    sub = db[15:]-db[:-15]; picos,_ = find_peaks(sub,height=6.0,distance=350)
    out=[]
    for p in picos:
        k=p
        while k>0 and db[k]>db[k-1]-0.05: k-=1
        out.append((k/1000.0,float(sub[p])))
    return out

def p5(y, sr, t0):
    s = y[int(t0*sr):int((t0+5)*sr)]
    if len(s) < sr: return -99.0
    return 10*np.log10(np.mean(s**2)+1e-12)

def caidas(y, sr):
    dur = len(y)/sr; res=[]
    t = 15.0
    while t < dur-4:
        pre = p5(y,sr,t-5); a = p5(y,sr,t); b = p5(y,sr,t+5) if t+10 <= dur else -99.0
        if pre - a >= float(os.environ.get('D1','9.0')) and pre - b >= float(os.environ.get('D2','20.0')) and pre > -45:
            res.append((t,pre,a,b))
        t += 0.25
    # un evento por racha: el PRIMER t que cumple (donde cae la nota); una racha a < 15 s de otra es su cola
    ev=[]
    for c in res:
        if ev and c[0]-ev[-1][-1] < 15.0:
            ev[-1][-1]=c[0]; continue
        ev.append([c[0],c[1],c[2],c[3],c[0]])
    ev=[tuple(e[:4]) if False else (e[0],e[1],e[2],e[3]) for e in ev]
    return ev

def fr(t0,t1): return round((t1-t0)*30)

def buscar(G, t_f):
    # G: golpes (t,db) con db>=MINC dentro de [t_f-52, t_f]
    n=len(G)
    def nxt(i,lo,hi):
        out=[]
        for j in range(i+1,n):
            f=fr(G[i][0],G[j][0])
            if f>hi: break
            if f>=lo: out.append(j)
        return out
    def ok(j,k):  # el golpe j vale para el corte k
        return G[j][1] >= (MIND if TIPOS[k]=="d" else MINC)
    fin = {j for j in range(n) if t_f-W <= G[j][0] <= t_f and ok(j,9)}
    # alcanzabilidad hacia atrás
    reach=[set() for _ in range(10)]; reach[9]=fin
    for k in range(8,-1,-1):
        for j in range(n):
            if ok(j,k) and any(x in reach[k+1] for x in nxt(j,*R[k])): reach[k].add(j)
    if os.environ.get("E0"):  # restringe el golpe de entrada de la canción: E0=lo,hi (segundos de la canción)
        lo,hi=map(float,os.environ["E0"].split(",")); reach[0]={j for j in reach[0] if lo<=G[j][0]<=hi}
    sols=[]; cnt=0
    def rec(k,j,cuts):
        nonlocal cnt
        if cnt>300000: return
        if k==9:
            durs=[fr(G[a][0],G[b][0]) for a,b in zip(cuts,cuts[1:])]
            vista=durs[8]
            if os.environ.get("VISTA_MAS_LARGA","1")=="1" and vista<=max(durs[6:8]): return
            cnt+=1
            mind=min(G[c][1] for c,t in zip(cuts,TIPOS) if t=="d"); minc=min(G[c][1] for c,t in zip(cuts,TIPOS) if t=="c")
            sols.append((min(durs),round(min(mind,99),1),round(minc,1),[float(round(G[c][0],3)) for c in cuts],durs,[round(G[c][1],1) for c in cuts]))
            return
        for j2 in nxt(j,*R[k]):
            if j2 in reach[k+1]: rec(k+1,j2,cuts+[j2])
    for j in sorted(reach[0]): rec(0,j,[j])
    return cnt, sols

for ruta in RUTAS:
    y,sr = decodifica(ruta); nombre = ruta.split("/")[-1][:60]
    ev = caidas(y,sr)
    if os.environ.get('T_F'): ev=[(float(os.environ['T_F']),0.0,0.0,0.0)]
    print(f"\n### {nombre}  ({len(y)/sr:.0f} s)  caídas completas: {len(ev)}", flush=True)
    if not ev: continue
    todos = golpes_de(y,sr)
    for (t,pre,a,b) in ev:
        G=[(tt,d) for tt,d in todos if t-52<=tt<=t and d>=MINC]
        cnt,sols = buscar(G,t)
        if os.environ.get("ORDEN")=="golpe":  # primero el golpe más débil (el corte seco puede medir menos en el render), luego el plano más corto
            sols.sort(key=lambda s:(-min(s[1],s[2],12),-min(s[0],75)))
        else:
            sols.sort(key=lambda s:(-min(s[0],75),-min(s[1],11),-s[2]))
        linea = f"  cae en {t:8.2f} s  pre {pre:6.1f} → {a:6.1f} → {b:6.1f} dB  ({pre-a:4.1f}/{pre-b:4.1f})  golpes≥7,4 en 52 s: {len(G):3d}  soluciones: {cnt}"
        print(linea, flush=True)
        if sols:
            for s in sols[:int(os.environ.get('TOP','3'))]: print(f"      · plano más corto = {s[0]} f · disolvencia más débil {s[1]} dB / corte seco {s[2]} dB · cortes {s[3]} · planos {s[4]} · dB {s[5]}", flush=True)
