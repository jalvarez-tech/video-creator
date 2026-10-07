#!/usr/bin/env python3
"""combinaciones-libres.py — cuenta las ternas hook → mitad → CTA que dejan las ocho versiones (registro de uso, 2026-10-06).
Reglas: tres LUGARES distintos; sentido del paseo coherente (los lugares avanzan en un solo sentido por la línea de la casa: extremo
de la entrada y el ventanal [0] → espacio abierto [1] → terraza, baranda y patio [2], o al revés); una cifra como mucho (la del hook o
la de la mitad: ninguna en el CTA); precio nunca en el CTA. «OK» = lo que hace falta que el usuario permita (ALH, precio, «317»)."""
import itertools
ZONA = {"ENTRADA":0,"INT-BLOQUES":0,"INT-VENTANAL":0,"BALCON":0,"INT-ABIERTO":1,"TERRAZA":2,"BARANDA":2,"PATIO":2}
H = {  # lugar, necesita OK, nota
 "HK01":("INT-ABIERTO",None,"«ven, te enseño» dudosa"),"HK01a":("TERRAZA",None,"«ven, te enseño» dudosa; sin colchón"),"HK01b":("PATIO",None,"«ven, te enseño» dudosa"),
 "HK04":("INT-ABIERTO","«317»","lleva la cifra"),"HK08":("ENTRADA","precio","lleva el precio"),"HK09":("INT-VENTANAL",None,""),"HK10":("TERRAZA",None,"en frío suena raro")}
M = {
 "MD01a":("TERRAZA",None,""),"MD02":("TERRAZA",None,""),"MD03":("PATIO",None,"«piscina»/«cocina» dudosa"),"MD04":("TERRAZA","ALH","nombra a ALH"),
 "MD05":("BARANDA",None,"«lujo»/«luego» dudosa"),"MD06":("TERRAZA",None,"«Diferentes materiales» dudosa"),"MD10":("ENTRADA","ALH+«317»","ALH y cifra"),
 "MD11":("INT-ABIERTO",None,"arranque dudoso"),"MD12":("TERRAZA",None,""),"MD13":("TERRAZA",None,"primera palabra dudosa")}
C = {  # (lugar, OK, qué es)
 "CT03r":("PATIO",None,"CT03 recortada a «escríbeme y ven a conocerlo» (repite la frase de la V5)"),
 "CT04":("PATIO","ALH","nombra a ALH"),
 "CT01":("BALCON",None,"REPITE la V2"),"CT02r":("BALCON",None,"REPITE la V5 (misma toma y misma frase)"),"CT05":("INT-BLOQUES",None,"REPITE la V3"),
 "CT06":("INT-ABIERTO",None,"REPITE la V4"),"CT07":("TERRAZA",None,"REPITE la V1")}
def coherente(lugares):
    z=[ZONA[l] for l in lugares]
    return z==sorted(z) or z==sorted(z,reverse=True)
def cifras(h,m):
    n=0
    if H[h][1] in ("«317»","precio"): n+=1
    if M[m][1] and "317" in M[m][1]: n+=1
    return n
def cuenta(cts, sin_ok):
    res=[]
    for h,m,c in itertools.product(H,M,cts):
        lh,lm,lc=H[h][0],M[m][0],C[c][0]
        if len({lh,lm,lc})<3: continue
        if not coherente([lh,lm,lc]): continue
        if cifras(h,m)>1: continue
        if sin_ok and (H[h][1] or M[m][1] or C[c][1]): continue
        res.append((h,m,c))
    return res
if __name__=="__main__":
    for nombre,cts in [("CT03 recortada",["CT03r"]),("CT04 (ALH)",["CT04"]),("repetir un CTA ya usado",["CT01","CT02r","CT05","CT06","CT07"])]:
        for sin_ok in (True,False):
            r=cuenta(cts,sin_ok)
            print(f"{nombre:26s} {'SIN pedir ningún OK ' if sin_ok else 'con los OK (ALH/precio/317)'}  → {len(r):3d} ternas")
    print()
    for c in C:
        r=cuenta([c],True); print(f"  {c:6s} {C[c][0]:12s} limpias: {len(r):3d}  ", ", ".join(f"{h}+{m}" for h,m,_ in r[:60]) if len(r)<=12 else "")
