# Genera img/logo.svg (logo horizontal) e img/logo-icono.svg (solo la insignia, para el ícono de la pestaña).
# Las letras se convierten en trazos (Saira Condensed ExtraBold), así el logo no depende de tener la fuente instalada.
# Uso: python3 tools/generar-logo.py <ruta a SairaCondensed-ExtraBold.ttf> img/
import sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

font = TTFont(sys.argv[1]); OUT = sys.argv[2].rstrip('/') + '/'
gs = font.getGlyphSet(); cmap = font.getBestCmap(); upm = font['head'].unitsPerEm
ROJO, ROJO_OSC, BLANCO = '#e3121b', '#8f0a10', '#ffffff'
INCL = 0.21   # inclinación (tan del ángulo) para dar sensación de velocidad

def texto(t, x, base, alto_mayus, espacio=0.0):
    """Path SVG del texto con su altura de mayúsculas = alto_mayus, inclinado. Devuelve (d, ancho)."""
    cap = font['OS/2'].sCapHeight or 700
    k = alto_mayus / cap
    pen = SVGPathPen(gs); cx = 0
    for ch in t:
        g = cmap[ord(ch)]
        # x' = x + INCL*y (inclinación), y' = -y (SVG va hacia abajo)
        tp = TransformPen(pen, (k, 0, k*INCL, -k, x + cx, base))
        gs[g].draw(tp)
        cx += gs[g].width * k + espacio
    return pen.getCommands(), cx - espacio

def lineas_velocidad(x1, ys, largos, alto, color):
    out = []
    for y, L in zip(ys, largos):
        o = alto * INCL
        out.append(f'<path d="M{x1-L+o:.1f} {y:.1f} H{x1+o:.1f} L{x1:.1f} {y+alto:.1f} H{x1-L:.1f} Z" fill="{color}"/>')
    return ''.join(out)

def insignia(x, y, w, h):
    """Paralelogramo rojo con 'RGK' en blanco y un borde de cuadros abajo."""
    o = h * INCL
    partes = [f'<path d="M{x+o:.1f} {y} H{x+w+o:.1f} L{x+w:.1f} {y+h} H{x} Z" fill="{ROJO}"/>',
              f'<path d="M{x+w+o:.1f} {y} L{x+w:.1f} {y+h} H{x+w-6:.1f} L{x+w-6+o:.1f} {y} Z" fill="{ROJO_OSC}"/>']
    d, ancho = texto('RGK', 0, 0, h*0.62, espacio=h*0.02)
    tx = x + (w - 6 - ancho) / 2 + o*0.18; base = y + h*0.81
    d, _ = texto('RGK', tx, base, h*0.62, espacio=h*0.02)
    partes.append(f'<path d="{d}" fill="{BLANCO}"/>')
    return ''.join(partes)

# ---- Logo horizontal: líneas de velocidad + insignia + SANTAFESINO + franja a cuadros
H = 64
svg = [lineas_velocidad(34, [16, 28.5, 41], [22, 30, 16], 6, ROJO)]
svg.append(insignia(36, 4, 112, 56))
d, ancho = texto('SANTAFESINO', 162, 38, 22, espacio=1.2)
svg.append(f'<path d="{d}" fill="{BLANCO}"/>')
# franja a cuadros debajo del nombre (bandera de llegada)
cuad = 5.5; n = int(ancho // cuad)
fila = []
for i in range(n):
    for j in range(2):
        if (i + j) % 2 == 0:
            x0 = 160 + i*cuad - (45 + j*cuad) * INCL + 45*INCL; y0 = 45 + j*cuad
            fila.append(f'M{x0:.1f} {y0:.1f} h{cuad:.1f} l{-cuad*INCL:.1f} {cuad:.1f} h{-cuad:.1f} Z')
svg.append(f'<path d="{" ".join(fila)}" fill="{ROJO}"/>')
W = 162 + ancho + 6
open(OUT + 'logo.svg', 'w').write(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.0f} {H}" width="{W:.0f}" height="{H}" role="img" aria-label="RGK Santafesino">'
    f'<title>RGK Santafesino</title>{"".join(svg)}</svg>\n')

# ---- Ícono cuadrado: solo la insignia, sobre negro
ic = [f'<rect width="64" height="64" rx="12" fill="#000"/>', insignia(3, 14, 50, 36)]
open(OUT + 'logo-icono.svg', 'w').write(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="RGK">{"".join(ic)}</svg>\n')
print('ok', round(W))
