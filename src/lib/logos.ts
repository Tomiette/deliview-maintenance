// Logos officiels des plateformes : affichés seulement si leurs fichiers (fournis par Tom le 2 octobre 2026)
// sont déposés dans src/assets/logos/ (voir LISEZMOI.md). Sans fichier, le nom s'affiche en texte.
// Deliview ne redessine jamais ces logos.
const images = import.meta.glob<{ default: ImageMetadata }>('../assets/logos/*.{png,webp,jpg,jpeg}', { eager: true });
const vectoriels = import.meta.glob<string>('../assets/logos/*.svg', { eager: true, query: '?url', import: 'default' });

export interface LogoPlateforme {
  src: string;
  largeur: number;
  hauteur: number;
}

export function logoPlateforme(slug: string): LogoPlateforme | null {
  for (const [chemin, mod] of Object.entries(images)) {
    if (chemin.split('/').pop()?.replace(/\.(png|webp|jpe?g)$/, '') === slug) {
      return { src: mod.default.src, largeur: mod.default.width, hauteur: mod.default.height };
    }
  }
  for (const [chemin, url] of Object.entries(vectoriels)) {
    if (chemin.split('/').pop()?.replace(/\.svg$/, '') === slug) return { src: url, largeur: 112, hauteur: 112 };
  }
  return null;
}
