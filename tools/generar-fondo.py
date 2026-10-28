# Genera img/fondo-wire.svg: figuras de karting en 3D, solo contorno rojo, sin líneas ocultas.
# Uso: python3 tools/generar-fondo.py img/fondo-wire.svg
#
# Cada figura es un modelo 3D hecho de sólidos convexos (cajas, cilindros, conos).
# Se proyecta con una cámara en perspectiva y se dibuja de atrás para adelante:
# cada cara visible se rellena con el color del fondo (así tapa lo que queda detrás)
# y solo se trazan los bordes reales: aristas vivas y contornos.
import math, sys

BG = '#0c0b0d'
ROJO = '#ff1e28'

def sub(a, b): return (a[0]-b[0], a[1]-b[1], a[2]-b[2])
def add(a, b): return (a[0]+b[0], a[1]+b[1], a[2]+b[2])
def mul(a, k): return (a[0]*k, a[1]*k, a[2]*k)
def dot(a, b): return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]
def cross(a, b): return (a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0])
def norm(a):
    l = math.sqrt(dot(a, a)) or 1
    return (a[0]/l, a[1]/l, a[2]/l)
def media(pts):
    n = len(pts)
    return (sum(p[0] for p in pts)/n, sum(p[1] for p in pts)/n, sum(p[2] for p in pts)/n)
def f(v): return f'{v:.1f}'

class Camara:
    def __init__(s, yaw, pitch, dist=700, foco=700):
        y, p = math.radians(yaw), math.radians(pitch)
        s.pos = (dist*math.sin(y)*math.cos(p), dist*math.sin(p), dist*math.cos(y)*math.cos(p))
        s.fwd = norm(mul(s.pos, -1))
        s.der = norm(cross(s.fwd, (0, 1, 0)))
        s.arr = cross(s.der, s.fwd)
        s.foco = foco
    def prof(s, p): return dot(sub(p, s.pos), s.fwd)
    def P(s, p):
        d = s.prof(p); q = sub(p, s.pos)
        return (s.foco*dot(q, s.der)/d, -s.foco*dot(q, s.arr)/d)

class Solido:
    """Sólido convexo: lista de caras (polígonos 3D). `marcas`: líneas pintadas sobre la superficie."""
    def __init__(s, caras, orden=0):
        s.caras = caras
        s.centro = media([p for c in caras for p in c])
        s.marcas = []   # (lista de puntos, normal de la superficie en ese tramo)
        s.orden = orden
    def normal(s, cara):
        n = norm(cross(sub(cara[1], cara[0]), sub(cara[2], cara[0])))
        if dot(n, sub(media(cara), s.centro)) < 0: n = mul(n, -1)
        return n

def caja(x0, y0, z0, x1, y1, z1, orden=0):
    v = [(x0,y0,z0),(x1,y0,z0),(x1,y1,z0),(x0,y1,z0),(x0,y0,z1),(x1,y0,z1),(x1,y1,z1),(x0,y1,z1)]
    return hexa(v, orden)

def hexa(v, orden=0):
    """Hexaedro de 8 vértices: 0-3 abajo/atrás, 4-7 la cara opuesta, en el mismo orden."""
    I = [(0,1,2,3),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)]
    return Solido([[v[i] for i in c] for c in I], orden)

def base_eje(eje):
    eje = norm(eje)
    otro = (0, 1, 0) if abs(eje[1]) < .9 else (1, 0, 0)
    u = norm(cross(eje, otro)); w = cross(eje, u)
    return eje, u, w

def tronco(c0, c1, r0, r1, n=28, orden=0):
    """Cilindro o tronco de cono entre los centros c0 y c1."""
    eje, u, w = base_eje(sub(c1, c0))
    def anillo(c, r): return [add(c, add(mul(u, r*math.cos(2*math.pi*k/n)), mul(w, r*math.sin(2*math.pi*k/n)))) for k in range(n)]
    a, b = anillo(c0, r0), anillo(c1, r1)
    caras = [[a[k], a[(k+1) % n], b[(k+1) % n], b[k]] for k in range(n)]
    caras.append(a[::-1]); caras.append(b)
    s = Solido(caras, orden)
    s.eje, s.u, s.w, s.c0, s.c1, s.r0, s.r1 = eje, u, w, c0, c1, r0, r1
    return s

def barra(p0, p1, r, orden=0): return tronco(p0, p1, r, r, n=6, orden=orden)

class Esfera:
    def __init__(s, c, r, orden=0): s.c, s.r, s.orden, s.centro, s.marcas = c, r, orden, c, []

def anillo_en(s, t, r, n=40):
    """Marca circular sobre un tronco a la altura relativa t (0..1)."""
    c = add(s.c0, mul(sub(s.c1, s.c0), t)); out = []
    for k in range(n+1):
        a = 2*math.pi*k/n; d = add(mul(s.u, math.cos(a)), mul(s.w, math.sin(a)))
        out.append((add(c, mul(d, r)), d))
    return out

def dibujar(solidos, cam):
    salida = []
    for s in sorted(solidos, key=lambda s: -(cam.prof(s.centro)) + s.orden * 1000):
        if isinstance(s, Esfera):
            cx, cy = cam.P(s.c)
            borde = cam.P(add(s.c, mul(cam.der, s.r)))
            r = math.hypot(borde[0]-cx, borde[1]-cy)
            salida.append(f'<circle class="r" cx="{f(cx)}" cy="{f(cy)}" r="{f(r)}"/>')
        else:
            vis = [dot(s.normal(c), sub(cam.pos, media(c))) > 0 for c in s.caras]
            rell = ' '.join('M' + ' L'.join(f'{f(x)} {f(y)}' for x, y in (cam.P(p) for p in c)) + ' Z'
                            for c, v in zip(s.caras, vis) if v)
            if rell: salida.append(f'<path class="r" d="{rell}"/>')
            aristas = {}
            for i, c in enumerate(s.caras):
                for k in range(len(c)):
                    a, b = c[k], c[(k+1) % len(c)]
                    clave = tuple(sorted([tuple(round(x, 3) for x in a), tuple(round(x, 3) for x in b)]))
                    aristas.setdefault(clave, []).append(i)
            lineas = []
            for (a, b), cs in aristas.items():
                if len(cs) == 1:
                    ok = vis[cs[0]]
                else:
                    v1, v2 = vis[cs[0]], vis[cs[1]]
                    angulo = math.degrees(math.acos(max(-1, min(1, dot(s.normal(s.caras[cs[0]]), s.normal(s.caras[cs[1]]))))))
                    ok = (v1 or v2) and (v1 != v2 or angulo > 30)
                if ok:
                    pa, pb = cam.P(a), cam.P(b)
                    lineas.append(f'M{f(pa[0])} {f(pa[1])} L{f(pb[0])} {f(pb[1])}')
            if lineas: salida.append(f'<path d="{" ".join(lineas)}"/>')
        # Marcas sobre la superficie: solo los tramos que miran a la cámara
        for puntos in s.marcas:
            tramo, d = [], []
            for p, n in puntos:
                if dot(n, sub(cam.pos, p)) > 0: tramo.append(cam.P(p))
                else:
                    if len(tramo) > 1: d.append(tramo)
                    tramo = []
            if len(tramo) > 1: d.append(tramo)
            if d: salida.append('<path d="' + ' '.join('M' + ' L'.join(f'{f(x)} {f(y)}' for x, y in t) for t in d) + '"/>')
    return ''.join(salida)

def marca_esfera(e, lat0, lat1, lon0, lon1, n=30):
    """Visera: borde de una franja sobre la esfera (latitud/longitud en grados, 0 = mirando a +z)."""
    def pt(lat, lon):
        la, lo = math.radians(lat), math.radians(lon)
        d = (math.cos(la)*math.sin(lo), math.sin(la), math.cos(la)*math.cos(lo))
        return add(e.c, mul(d, e.r)), d
    borde = [pt(lat0, lon0 + (lon1-lon0)*k/n) for k in range(n+1)]
    borde += [pt(lat0 + (lat1-lat0)*k/8, lon1) for k in range(9)]
    borde += [pt(lat1, lon1 - (lon1-lon0)*k/n) for k in range(n+1)]
    borde += [pt(lat1 - (lat1-lat0)*k/8, lon0) for k in range(9)]
    e.marcas.append(borde)

# ---------------------------------------------------------------- figuras
def kart():
    S = []
    # x: costado, y: arriba, z: hacia adelante (la trompa mira a la cámara)
    for lado in (-1, 1):
        S.append(tronco((lado*47, 14, -58), (lado*66, 14, -58), 14, 14))     # ruedas traseras
        S.append(tronco((lado*45, 12, 54), (lado*58, 12, 54), 12, 12))       # ruedas delanteras
        S.append(tronco((lado*66, 14, -58), (lado*68, 14, -58), 6, 6))
        S.append(tronco((lado*58, 12, 54), (lado*60, 12, 54), 5, 5))
        x0, x1 = sorted((lado*40, lado*54))
        S.append(hexa([(x0,5,-26),(x1,5,-26),(x1,17,-22),(x0,17,-22),(x0,5,34),(x1,5,34),(x1,15,30),(x0,15,30)]))   # pontones
    S.append(caja(-40, 3, -66, 40, 6, 64))                                     # chasis
    S.append(caja(-66, 9, -80, 66, 14, -74))                                   # paragolpes trasero
    S.append(hexa([(-40,4,62),(40,4,62),(40,20,60),(-40,20,60),(-34,4,88),(34,4,88),(34,12,86),(-34,12,86)]))   # trompa
    S.append(hexa([(-18,6,44),(18,6,44),(18,30,40),(-18,30,40),(-18,6,47),(18,6,47),(18,30,43),(-18,30,43)]))   # panel frontal
    S.append(caja(22, 8, -54, 42, 30, -32))                                    # motor
    S.append(hexa([(-15,6,-38),(15,6,-38),(15,46,-48),(-15,46,-48),(-15,6,-32),(15,6,-32),(15,46,-42),(-15,46,-42)]))  # butaca
    S.append(hexa([(-14,8,-30),(14,8,-30),(17,50,-36),(-17,50,-36),(-14,8,-8),(14,8,-8),(17,50,-22),(-17,50,-22)]))   # torso
    for lado in (-1, 1):
        S.append(barra((lado*16, 46, -28), (lado*10, 32, 18), 3.5))             # brazos
        S.append(barra((lado*8, 12, -10), (lado*10, 12, 40), 4))               # piernas
    S.append(barra((0, 8, 40), (0, 30, 24), 1.8))                              # columna
    S.append(tronco((0, 32, 21), (0, 33.5, 23), 11, 11, n=24))                 # volante
    casco = Esfera((0, 63, -26), 13)
    marca_esfera(casco, -8, 12, -45, 45)
    S.append(casco)
    return S

def cubierta():
    s = tronco((0, 30, -11), (0, 30, 11), 30, 30, n=36)
    for k in range(18):
        a = 2*math.pi*k/18; d = add(mul(s.u, math.cos(a)), mul(s.w, math.sin(a)))
        s.marcas.append([(add(add(s.c0, mul(d, 30)), (0, 0, 2)), d), (add(add(s.c1, mul(d, 30)), (0, 0, -2)), d)])
    return [s, tronco((0, 30, 11), (0, 30, 15), 17, 17, n=28), tronco((0, 30, 15), (0, 30, 17), 7, 7, n=20)]

def cono():
    base = caja(-30, 0, -30, 30, 5, 30)
    c = tronco((0, 5, 0), (0, 75, 0), 22, 3, n=32)
    for t in (.3, .58):
        c.marcas.append(anillo_en(c, t, 22 + (3-22)*t))
    return [base, c]

def copa():
    return [caja(-20, 0, -20, 20, 10, 20), tronco((0, 10, 0), (0, 14, 0), 12, 5), tronco((0, 14, 0), (0, 34, 0), 4, 4, n=16),
            tronco((0, 34, 0), (0, 40, 0), 5, 12), tronco((0, 40, 0), (0, 72, 0), 12, 25),
            barra((-24, 66, 0), (-34, 60, 0), 2.5), barra((-34, 60, 0), (-24, 46, 0), 2.5),
            barra((24, 66, 0), (34, 60, 0), 2.5), barra((34, 60, 0), (24, 46, 0), 2.5)]

def crono():
    s = tronco((0, 0, -6), (0, 0, 6), 30, 30, n=40)
    for k in range(12):
        a = 2*math.pi*k/12; d = (math.cos(a), math.sin(a), 0)
        s.marcas.append([(add((0, 0, 6), mul(d, 22)), (0, 0, 1)), (add((0, 0, 6), mul(d, 26)), (0, 0, 1))])
    s.marcas.append([((0, 0, 6), (0, 0, 1)), ((0, 17, 6), (0, 0, 1))])
    s.marcas.append([((0, 0, 6), (0, 0, 1)), ((11, -7, 6), (0, 0, 1))])
    return [s, tronco((0, 30, 0), (0, 36, 0), 4, 4, n=12), tronco((0, 36, 0), (0, 40, 0), 7, 7, n=16),
            barra((21, 21, 0), (27, 27, 0), 3)]

def podio():
    S = [caja(-24, 0, -22, 24, 42, 22), caja(-72, 0, -22, -24, 28, 22), caja(24, 0, -22, 72, 18, 22)]
    z = 22.1; n = (0, 0, 1)
    S[0].marcas.append([((-2, 30, z), n), ((3, 34, z), n), ((3, 10, z), n)])                                   # 1
    S[1].marcas.append([((-55, 21, z), n), ((-50, 24, z), n), ((-44, 21, z), n), ((-55, 8, z), n), ((-43, 8, z), n)])   # 2
    S[2].marcas.append([((42, 13, z), n), ((53, 13, z), n), ((47, 9, z), n), ((53, 7, z), n), ((48, 3, z), n), ((42, 4, z), n)])   # 3
    return S

def casco():
    e = Esfera((0, 0, 0), 30)
    marca_esfera(e, -14, 16, -50, 50)
    return [e, hexa([(-26,-22,-14),(26,-22,-14),(28,-12,-26),(-28,-12,-26),(-22,-26,14),(22,-26,14),(24,-14,22),(-24,-14,22)])]

def bandera(cam):
    # Bandera a cuadros flameando: tela fina (se ve de los dos lados) y mástil
    W, H, N, M = 84, 48, 6, 4
    def pt(i, j):
        u = i/N
        return (12 + u*W, 92 - j/M*H, math.sin(u*math.pi*1.7)*10)
    caras = []
    for i in range(N):
        for j in range(M):
            caras.append([pt(i, j), pt(i+1, j), pt(i+1, j+1), pt(i, j+1)])
    out = []
    mastil = barra((8, 0, 0), (8, 96, 0), 2.5)
    out.append(dibujar([mastil], cam))
    trazos, rell = [], []
    for k, c in enumerate(caras):
        q = [cam.P(p) for p in c]
        rell.append('M' + ' L'.join(f'{f(x)} {f(y)}' for x, y in q) + ' Z')
        i, j = divmod(k, M)
        if (i + j) % 2 == 0:   # cuadro "negro": rayado diagonal fino
            trazos.append(f'M{f(q[0][0])} {f(q[0][1])} L{f(q[2][0])} {f(q[2][1])}')
    borde = [pt(i, 0) for i in range(N+1)] + [pt(N, j) for j in range(M+1)] + [pt(i, M) for i in range(N, -1, -1)] + [pt(0, j) for j in range(M, -1, -1)]
    grilla = []
    for i in range(1, N): grilla.append('M' + ' L'.join(f'{f(x)} {f(y)}' for x, y in (cam.P(pt(i, j)) for j in range(M+1))))
    for j in range(1, M): grilla.append('M' + ' L'.join(f'{f(x)} {f(y)}' for x, y in (cam.P(pt(i, j)) for i in range(N+1))))
    out.append(f'<path class="r" d="{" ".join(rell)}"/>')
    out.append('<path d="M' + ' L'.join(f'{f(x)} {f(y)}' for x, y in (cam.P(p) for p in borde)) + ' Z ' + ' '.join(grilla) + '"/>')
    out.append(f'<path class="t" d="{" ".join(trazos)}"/>')
    return ''.join(out)

if __name__ == '__main__':
    cam = Camara(yaw=24, pitch=20)          # de frente, apenas de costado y desde arriba
    cam2 = Camara(yaw=-28, pitch=18)        # el otro karting, desde el otro lado
    piezas = [
        (dibujar(kart(), cam), 150, 210, 1.25),
        (dibujar(casco(), cam), 470, 150, 1.0),
        (bandera(cam), 600, 160, 1.15),
        (dibujar(cubierta(), cam), 130, 470, 1.05),
        (dibujar(podio(), cam), 410, 470, 1.0),
        (dibujar(crono(), cam), 690, 440, 1.0),
        (dibujar(cono(), cam), 110, 750, 1.0),
        (dibujar(kart(), cam2), 400, 720, 0.95),
        (dibujar(copa(), cam), 680, 760, 1.0),
    ]
    g = ''.join(f'<g transform="translate({x} {y}) scale({s})">{svg}</g>' for svg, x, y, s in piezas)
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
  <!-- Fondo: figuras de karting en 3D, solo contorno rojo, sin líneas ocultas. Generado con tools/generar-fondo.py -->
  <defs>
    <filter id="neon" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <style>path,circle{{fill:none;stroke:{ROJO};stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}} .r{{fill:{BG};stroke:{BG};stroke-width:.8}} circle.r{{stroke:{ROJO};stroke-width:1.5}} .t{{stroke-opacity:.5;stroke-width:1}}</style>
  </defs>
  <g filter="url(#neon)">{g}</g>
</svg>
'''
    open(sys.argv[1], 'w').write(svg)
