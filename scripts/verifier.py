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
    # Lien canonique obligatoire, sauf sur une page non indexée (la 404 n'en a pas depuis le 8 octobre 2026 : elle est
    # servie à toute adresse inconnue).
    if not p.canon and 'noindex' not in (p.robots or ''): problemes.append((nom, 'canonical manquant'))
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
# Charte « le passe » (cahier du 2 octobre 2026) : 5 couleurs seulement (Bleu 1 et 2, Gris, Blanc, Gris 2, avec ou
# sans opacité), aucun dégradé, aucune image IA, aucune bibliothèque d'icônes, aucun émoji, aucun téléphone hors
# mentions légales.
CHARTE = {'5282ff', '5a8bf9', 'f5f5f7', 'ffffff', '4c4c4c'}
RGB_CHARTE = {(82, 130, 255), (90, 139, 249), (245, 245, 247), (255, 255, 255), (76, 76, 76)}
NOMMEES = {'transparent', 'currentcolor', 'inherit', 'initial', 'none', 'white'}

def couleurs_hors_charte(css):
    css = re.sub(r'@supports[^{]*\{', '{', css)  # tests de prise en charge de Tailwind (« color-mix(in lab, red, red) »)
    css = re.sub(r'url\("data:image/svg\+xml[^"]*"\)', '', css)  # masques SVG (forme seule, sans couleur affichée)
    fautes = []
    for h in re.findall(r'#([0-9a-fA-F]{3,8})\b', css):
        h = h.lower()
        if len(h) in (3, 4):
            rgb, alpha = ''.join(c * 2 for c in h[:3]), (h[3] * 2 if len(h) == 4 else 'ff')
        elif len(h) in (6, 8):
            rgb, alpha = h[:6], (h[6:] or 'ff')
        else:
            continue
        if rgb not in CHARTE and alpha != '00':
            fautes.append('#' + h)
    for r, g, b_ in re.findall(r'rgba?\(\s*(\d+)[ ,]+(\d+)[ ,]+(\d+)', css):
        if (int(r), int(g), int(b_)) not in RGB_CHARTE:
            fautes.append(f'rgb({r},{g},{b_})')
    for f in re.findall(r'\b(hsla?|oklch|oklab|lab|lch|hwb)\(', css):
        fautes.append(f + '()')
    # Couleurs nommées (« red », « black »…) dans les propriétés de couleur ; les fonctions (var(), calc()…) sont ignorées.
    proprietes = r'(?<![a-z-])(?:color|background(?:-color)?|fill|stroke|border(?:-(?:top|right|bottom|left))?(?:-color)?|outline(?:-color)?|text-decoration-color|accent-color|caret-color)'
    for m in re.findall(proprietes + r'\s*:\s*([a-z]+)(?![a-z(-])', css, re.I):
        if m.lower() not in NOMMEES and m.lower() not in ('solid', 'dashed', 'dotted', 'none', 'unset', 'revert', 'auto'):
            fautes.append(m)
    return sorted(set(fautes))

css_final = ''
for racine, _, fichiers in os.walk(DIST):
    for f in fichiers:
        if f.endswith('.css'):
            css_final += open(os.path.join(racine, f), encoding='utf-8').read()
html_final = {os.path.relpath(c, DIST): open(c, encoding='utf-8').read() for c in pages}
styles_html = ''.join(''.join(re.findall(r'<style[^>]*>(.*?)</style>', h, re.S)) + ' '.join(re.findall(r'style="([^"]*)"', h)) + ' '.join(re.findall(r'(?:fill|stroke)="([^"]*)"', h)) for h in html_final.values())
for c in couleurs_hors_charte(css_final + styles_html):
    problemes.append(('CSS', 'couleur hors charte : ' + c))
if re.search(r'\b(repeating-)?(linear|radial|conic)-gradient\(', css_final + styles_html):
    problemes.append(('CSS', 'dégradé'))
EMOJI = re.compile('[\U0001F000-\U0001FAFF\U00002600-\U000027BF\U0001F900-\U0001F9FF\uFE0F]')
TELEPHONE = re.compile(r'(?:\+33|\b0)[\s.\u00a0-]?[1-9](?:[\s.\u00a0-]?\d{2}){4}\b')
for nom, h in html_final.items():
    if '/images/ia/' in h:
        problemes.append((nom, 'image du dossier ia référencée'))
    visible = re.sub(r'<(script|style)[^>]*>.*?</\1>', ' ', h, flags=re.S)
    if EMOJI.search(re.sub(r'<[^>]+>', ' ', visible)):
        problemes.append((nom, 'émoji'))
    if not nom.startswith('mentions-legales') and (TELEPHONE.search(re.sub(r'<[^>]+>', ' ', visible)) or 'href="tel:' in h):
        problemes.append((nom, 'numéro de téléphone hors mentions légales'))
SRC = os.path.join(os.path.dirname(__file__), '..', 'src')
for racine, _, fichiers in os.walk(SRC):
    for f in fichiers:
        if re.search(r'lucide|heroicons|react-icons|font-?awesome', open(os.path.join(racine, f), encoding='utf-8', errors='ignore').read(), re.I):
            problemes.append((os.path.relpath(os.path.join(racine, f), SRC), "bibliothèque d'icônes"))
if re.search(r'lucide|heroicons|react-icons|fontawesome', open(os.path.join(os.path.dirname(__file__), '..', 'package.json'), encoding='utf-8').read(), re.I):
    problemes.append(('package.json', "bibliothèque d'icônes"))

print(len(pages), 'pages')
vus = {}
for nom, pb in problemes:
    vus.setdefault(pb.split(' : ')[0] if 'espace' in pb or 'apostrophe' in pb else pb, []).append((nom, pb))
for cle, liste in vus.items():
    print(f'\n== {cle} ({len(liste)})')
    for nom, pb in liste[:12]: print('  ', nom, '|', pb[:160])
