# Vérification du site généré (dist/) : balises, liens, images, typographie, mots interdits.
# Usage : python3 scripts/verifier.py [base]   (base = /apercu/ pour l'aperçu)
import json, os, re, sys
from html.parser import HTMLParser

DIST = os.path.join(os.path.dirname(__file__), '..', 'dist')
BASE = sys.argv[1] if len(sys.argv) > 1 else '/'
INTERDITS = ['just eat', 'dashboard', 'saas', 'tout-en-un', 'booster', 'révolution', 'incontournable', 'crucial', 'game changer', "n’hésitez pas", "n'hésitez pas", 'en conclusion', 'en résumé', 'synergie', 'insights', 'onboarding', 'dans un monde où']

class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.titre = None; self.desc = None; self.h1 = 0; self.canon = None; self.liens = []; self.imgs = []; self.jsonld = []
        self.texte = []; self.pile = []; self._t = False; self._ld = False; self.robots = None
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        self.pile.append(tag)
        if tag == 'title': self._t = True
        if tag == 'meta' and a.get('name') == 'description': self.desc = a.get('content')
        if tag == 'meta' and a.get('name') == 'robots': self.robots = a.get('content')
        if tag == 'link' and a.get('rel') == 'canonical': self.canon = a.get('href')
        if tag == 'h1': self.h1 += 1
        if tag == 'a' and a.get('href'): self.liens.append(a['href'])
        if tag == 'img': self.imgs.append(a.get('src'))
        if tag == 'source' and a.get('srcset'): self.imgs += [x.strip().split(' ')[0] for x in a['srcset'].split(',')]
        if tag == 'img' and a.get('srcset'): self.imgs += [x.strip().split(' ')[0] for x in a['srcset'].split(',')]
        if tag == 'script' and a.get('type') == 'application/ld+json': self._ld = True
    def handle_endtag(self, tag):
        if self.pile and self.pile[-1] == tag: self.pile.pop()
        if tag == 'title': self._t = False
        if tag == 'script': self._ld = False
    def handle_data(self, d):
        if self._t: self.titre = (self.titre or '') + d
        elif self._ld: self.jsonld.append(d)
        elif 'script' not in self.pile and 'style' not in self.pile: self.texte.append(d)

def existe(chemin):
    c = chemin.split('#')[0].split('?')[0]
    if not c.startswith(BASE): return True  # lien hors site (app, autre)
    rel = c[len(BASE):]
    p = os.path.join(DIST, rel)
    return os.path.isfile(p) or os.path.isfile(os.path.join(p, 'index.html'))

problemes = []
pages = []
for racine, _, fichiers in os.walk(DIST):
    for f in fichiers:
        if f.endswith('.html'): pages.append(os.path.join(racine, f))
for chemin in sorted(pages):
    nom = os.path.relpath(chemin, DIST)
    p = Page(); p.feed(open(chemin, encoding='utf-8').read())
    texte = ' '.join(p.texte)
    t = (p.titre or '').strip()
    if not t: problemes.append((nom, 'title manquant'))
    elif len(t) > 62: problemes.append((nom, f'title long ({len(t)}) : {t}'))
    d = p.desc or ''
    if not (110 <= len(d) <= 160): problemes.append((nom, f'description {len(d)} car.'))
    if p.h1 != 1: problemes.append((nom, f'{p.h1} h1'))
    if not p.canon: problemes.append((nom, 'canonical manquant'))
    for j in p.jsonld:
        try: json.loads(j)
        except Exception as e: problemes.append((nom, 'JSON-LD invalide'))
    for l in p.liens:
        if l.startswith('/') and not existe(l): problemes.append((nom, 'lien cassé ' + l))
    for i in p.imgs:
        if i and i.startswith('/') and not existe(i): problemes.append((nom, 'image absente ' + i))
    bas = texte.lower()
    for m in INTERDITS:
        if re.search(r'(?<![a-zà-ÿ])' + re.escape(m) + r'(?![a-zà-ÿ])', bas): problemes.append((nom, 'mot interdit : ' + m))
    for motif, lib in [(r'\S :', 'espace normale avant :'), (r' [;?!]', 'espace normale avant ; ? !'), (r'« ', 'espace normale après «'), (r' »', 'espace normale avant »'), (r'\d (€|%|h\b|min\b|km\b|cm\b|cl\b)', 'espace normale nombre-unité'), (r'\d{1,3} \d{3}\b', 'espace normale dans un millier'), (r"[a-zà-ÿ]'[a-zà-ÿ]", "apostrophe droite")]:
        for m in re.finditer(motif, texte):
            extrait = texte[max(0, m.start() - 25): m.end() + 15].replace('\n', ' ')
            problemes.append((nom, f'{lib} : «{extrait}»'))
print(len(pages), 'pages')
vus = {}
for nom, pb in problemes:
    vus.setdefault(pb.split(' : ')[0] if 'espace' in pb or 'apostrophe' in pb else pb, []).append((nom, pb))
for cle, liste in vus.items():
    print(f'\n== {cle} ({len(liste)})')
    for nom, pb in liste[:12]: print('  ', nom, '|', pb[:160])
