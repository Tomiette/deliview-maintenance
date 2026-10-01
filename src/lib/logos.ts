// Logos officiels des plateformes : affichés seulement si les fichiers fournis par Uber et Deliveroo
// sont déposés dans src/assets/logos/ (voir LISEZMOI.md). Sans fichier, le nom s'affiche en texte.
// Deliview ne redessine jamais ces logos.
const fichiers = import.meta.glob<string>('../assets/logos/*.{svg,png,webp}', { eager: true, query: '?url', import: 'default' });

export function logoPlateforme(slug: string): string | null {
  for (const [chemin, url] of Object.entries(fichiers)) {
    const nom = chemin.split('/').pop()?.replace(/\.(svg|png|webp)$/, '');
    if (nom === slug) return url;
  }
  return null;
}
