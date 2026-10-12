#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy"]
# ///
"""
scan-v8.py — para cada canción: (1) todas las CAÍDAS completas (≥ 9 dB en los 5 s siguientes y ≥ 20 en los 10, sin recuperarse)
y (2) la REJILLA DE CORTES de la V8 sobre los golpes medidos antes de esa caída (la estructura de la V7 con la mitad MD2).

Detector de golpes = el de medir-pista.py (80-3000 Hz, 6 ms/1 ms, subida ≥ 6 dB en 15 ms, distancia 350 ms).
Búsqueda = programación dinámica hacia atrás (alcanzabilidad) + enumeración acotada: 10 cortes
  c0 (entrada del paseo) · c03 | c04 | c05 | c06 | MITAD | c08 | c09 | c10 | VISTA | CTA
tipos de corte (V7): c0 d, c1 c, c2 d, c3 d, c4 d, c5 d, c6 d, c7 d, c8 c, c9 d  (d = disolvencia ≥ MIND, c = corte seco ≥ 7,4 dB)

Uso: uv run scan-v8.py <mitad: md2|md3> <MIND> "ruta.mp3" ...
"""
import subprocess, sys, json, os
import numpy as np
from scipy.signal import butter, find_peaks, sosfilt

MITAD = sys.argv[1]; MIND = float(sys.argv[2]); RUTAS = sys.argv[3:]
R = [(60,130),(80,150),(60,110),(45,110),   # c03 c04 c05 c06 (paseo)
     (131,154) if MITAD == "md2" else (158,167),  # mitad
     (50,110),(50,110),(50,80),             # c08 c09 c10
     (int(__import__('os').environ.get('VMIN','75')),int(__import__('os').environ.get('VMAX','103')))]  # vista
R = json.loads(os.environ["R"]) if os.environ.get("R") else R
TIPOS = list(os.environ.get("TIPOS","dcddddddcd"))
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
    sols=[]; cnt=0
    def rec(k,j,cuts):
        nonlocal cnt
        if cnt>300000: return
        if k==9:
            durs=[fr(G[a][0],G[b][0]) for a,b in zip(cuts,cuts[1:])]
            b5=durs[5:9]; vista=durs[8]
            if vista<=max(durs[5:8]): return
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
        sols.sort(key=lambda s:(-min(s[0],75),-min(s[1],11),-s[2]))
        linea = f"  cae en {t:8.2f} s  pre {pre:6.1f} → {a:6.1f} → {b:6.1f} dB  ({pre-a:4.1f}/{pre-b:4.1f})  golpes≥7,4 en 52 s: {len(G):3d}  soluciones: {cnt}"
        print(linea, flush=True)
        if sols:
            for s in sols[:int(os.environ.get('TOP','3'))]: print(f"      · plano más corto = {s[0]} f · disolvencia más débil {s[1]} dB / corte seco {s[2]} dB · cortes {s[3]} · planos {s[4]} · dB {s[5]}", flush=True)
