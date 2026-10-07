#!/usr/bin/env python3
"""Photo d'un post LinkedIn pour la frise de Qui sommes-nous (src/lib/chronologie.ts).

Écrit public/images/linkedin/<nom>-360.webp et <nom>-720.webp, puis affiche les proportions à reporter dans la
chronologie. Source : la photo d'origine du post, ou sa capture d'écran avec --recadrage pour n'en garder que la photo.

  python3 scripts/photo-linkedin.py ~/post.png premier-ecran
  python3 scripts/photo-linkedin.py capture.png premier-ecran --recadrage 0,412,1080,1350   (x,y,largeur,hauteur)
"""
import argparse
import pathlib

from PIL import Image, ImageOps

DOSSIER = pathlib.Path(__file__).resolve().parent.parent / 'public' / 'images' / 'linkedin'

p = argparse.ArgumentParser()
p.add_argument('source')
p.add_argument('nom', help='minuscules et tirets, sans extension')
p.add_argument('--recadrage', help='x,y,largeur,hauteur en pixels de la source')
a = p.parse_args()

im = ImageOps.exif_transpose(Image.open(a.source)).convert('RGB')
if a.recadrage:
    x, y, l, h = (int(v) for v in a.recadrage.split(','))
    im = im.crop((x, y, x + l, y + h))
DOSSIER.mkdir(parents=True, exist_ok=True)
for largeur in (360, 720):
    if im.width < largeur:
        print(f'attention : la source fait {im.width} px de large, moins que {largeur} px (image agrandie)')
    hauteur = round(im.height * largeur / im.width)
    im.resize((largeur, hauteur), Image.LANCZOS).save(DOSSIER / f'{a.nom}-{largeur}.webp', 'WEBP', quality=82, method=6)
print(f"photo: {{ fichier: '{a.nom}', largeur: {im.width}, hauteur: {im.height}, alt: '…' }}")
