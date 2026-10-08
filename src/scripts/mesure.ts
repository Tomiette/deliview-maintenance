// Mesure des visites (8 octobre 2026) : page vue à l'arrivée, temps passé et défilement en quittant la page, clics sur
// les boutons marqués data-cta. Anonyme sans accord ; avec accord, identifiants et campagne (src/lib/suivi.ts).
// Rien n'est envoyé depuis l'aperçu, un serveur local, ou un navigateur qui s'est opposé à la mesure.
import { envoyer, identifiants, mesureActive, nouvelId, retenirUtm, utmAdresse, utmVisite } from '../lib/suivi';

if (mesureActive()) {
  const chemin = location.pathname.slice(0, 200) || '/';
  let hote = '';
  try {
    hote = document.referrer ? new URL(document.referrer).hostname.toLowerCase() : '';
  } catch {
    hote = '';
  }
  // Première page d'une visite : arrivée depuis un autre site, un lien direct ou une application.
  const entree = !/(^|\.)deliview\.fr$/.test(hote);
  const provenance = entree && hote ? hote.replace(/^www\./, '') : undefined;
  const largeur = window.innerWidth;
  const appareil = largeur < 768 ? 'mobile' : largeur < 1024 ? 'tablette' : 'ordinateur';
  const titre = document.title.replace(/\s*\|\s*Deliview\s*$/i, '').slice(0, 120);
  let vue = nouvelId();

  // Identifiants et campagne, avec accord seulement (la campagne de l'adresse d'arrivée est gardée pour la visite).
  const suivi = () => {
    const ids = identifiants();
    if (!ids) return null;
    retenirUtm(utmAdresse());
    return { ...ids, vue, ...utmVisite() };
  };

  const page = (rattrapage: boolean) => {
    const s = suivi();
    envoyer({ type: 'page', chemin, titre, entree, provenance, appareil, consentement: !!s, ...(s ? { ...s, rattrapage } : {}) });
  };
  page(false);

  // Accord donné pendant la visite : la page en cours rejoint le parcours (elle est déjà comptée de façon anonyme).
  window.addEventListener('dv-consentement', (e) => {
    if ((e as CustomEvent<string>).detail === 'oui') page(true);
  });

  // Temps passé, onglet visible seulement, et défilement le plus bas atteint : envoyés une fois en quittant la page.
  let cumul = 0;
  let depuis = document.visibilityState === 'visible' ? performance.now() : 0;
  let defilement = 0;
  let parti = false;
  const mesurerDefilement = () => {
    const hauteur = document.documentElement.scrollHeight;
    const vu = hauteur > 0 ? Math.min(100, Math.round(((window.scrollY + window.innerHeight) / hauteur) * 100)) : 100;
    if (vu > defilement) defilement = vu;
  };
  mesurerDefilement();
  let enAttente = false;
  window.addEventListener(
    'scroll',
    () => {
      if (enAttente) return;
      enAttente = true;
      requestAnimationFrame(() => {
        enAttente = false;
        mesurerDefilement();
      });
    },
    { passive: true },
  );
  const quitter = () => {
    if (parti) return;
    if (depuis) cumul += performance.now() - depuis;
    depuis = 0;
    parti = true;
    const ids = identifiants();
    envoyer({
      type: 'duree',
      chemin,
      duree: Math.min(1800, Math.round(cumul / 1000)),
      defilement,
      consentement: !!ids,
      ...(ids ? { ...ids, vue } : {}),
    });
  };
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') quitter();
    else if (!parti) depuis = performance.now();
  });
  window.addEventListener('pagehide', quitter);
  // Retour sur la page par le bouton Précédent (page gardée en mémoire par le navigateur) : une nouvelle page vue.
  window.addEventListener('pageshow', (e) => {
    if (!e.persisted) return;
    vue = nouvelId();
    cumul = 0;
    defilement = 0;
    parti = false;
    depuis = performance.now();
    mesurerDefilement();
    page(false);
  });

  // Clics sur les boutons marqués data-cta (« Demander une démo », offres…).
  document.addEventListener(
    'click',
    (e) => {
      const el = (e.target as Element | null)?.closest?.('[data-cta]');
      if (!el) return;
      const cible = (el.getAttribute('data-cta') || '').slice(0, 60);
      if (!/^[A-Za-z0-9:_-]+$/.test(cible)) return;
      const ids = identifiants();
      envoyer({ type: 'clic', chemin, cible, consentement: !!ids, ...(ids ?? {}) });
    },
    { capture: true },
  );
}
