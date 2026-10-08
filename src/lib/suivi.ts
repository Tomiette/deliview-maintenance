// Suivi des visites du site (8 octobre 2026, demande de Tom : « un suivi des leads entrants, leur navigation, un outil
// d'analytics complet des visiteurs dans mon admin »). Module du navigateur : choix du visiteur (bandeau
// Consentement.astro), identifiants et envoi des mesures à la fonction Supabase « mesure ».
// - Sans accord (refus, ou pas encore de choix) : mesure anonyme ; rien n'est gardé sur l'appareil pour la mesure.
// - Avec accord : identifiant de visiteur (13 mois, jamais prolongé), de session (30 minutes sans activité), paramètres
//   utm_ et dernier bouton démo cliqué (le temps de la visite), joints aux mesures et à la demande de démo.
// Le choix lui-même est gardé 6 mois (dv_consentement), puis le bandeau revient. « Ne plus être compté » (page
// Confidentialité, ou l'admin pour Tom, même adresse www.deliview.fr) coupe toute mesure sur ce navigateur.

export const ENDPOINT_MESURE = 'https://osczxtxtxrjbjnozreun.supabase.co/functions/v1/mesure';
const CLE_CHOIX = 'dv_consentement';
const CLE_OPPOSITION = 'dv_mesure_ignorer';
const CLE_VISITEUR = 'dv_visiteur';
const CLE_SESSION = 'dv_session';
const CLE_UTM = 'dv_utm';
const CLE_BOUTON = 'dv_section_cta';
const JOUR = 86_400_000;
export const DUREE_CHOIX = 182 * JOUR; // 6 mois
export const DUREE_VISITEUR = 395 * JOUR; // 13 mois
export const PAUSE_SESSION = 30 * 60_000;

export type Choix = 'oui' | 'non';
export interface ChoixEnregistre {
  choix: Choix;
  le: number;
}

function local(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}
function onglet(): Storage | null {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}
function lireJson<T>(s: Storage | null, cle: string): T | null {
  try {
    const v = s?.getItem(cle);
    return v ? (JSON.parse(v) as T) : null;
  } catch {
    return null;
  }
}
function ecrire(s: Storage | null, cle: string, valeur: string): void {
  try {
    s?.setItem(cle, valeur);
  } catch {
    /* stockage plein ou refusé */
  }
}
function effacer(s: Storage | null, cle: string): void {
  try {
    s?.removeItem(cle);
  } catch {
    /* stockage indisponible */
  }
}

export function nouvelId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  const b = new Uint8Array(16);
  crypto.getRandomValues(b);
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = Array.from(b, (x) => x.toString(16).padStart(2, '0')).join('');
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

// Choix du visiteur, s'il date de moins de 6 mois.
export function choixEnregistre(maintenant = Date.now()): ChoixEnregistre | null {
  const c = lireJson<ChoixEnregistre>(local(), CLE_CHOIX);
  if (!c || (c.choix !== 'oui' && c.choix !== 'non') || typeof c.le !== 'number') return null;
  if (maintenant - c.le > DUREE_CHOIX || c.le > maintenant + JOUR) return null;
  return c;
}
export const suiviAccepte = (): boolean => choixEnregistre()?.choix === 'oui';

// Refus : tout ce qui servait au suivi est effacé tout de suite.
export function enregistrerChoix(choix: Choix): void {
  ecrire(local(), CLE_CHOIX, JSON.stringify({ choix, le: Date.now() }));
  if (choix === 'non') {
    effacer(local(), CLE_VISITEUR);
    [CLE_SESSION, CLE_UTM, CLE_BOUTON].forEach((k) => effacer(onglet(), k));
  }
  window.dispatchEvent(new CustomEvent<Choix>('dv-consentement', { detail: choix }));
}

// Opposition à toute mesure, même anonyme, sur ce navigateur.
export function oppose(): boolean {
  try {
    return local()?.getItem(CLE_OPPOSITION) === '1';
  } catch {
    return false;
  }
}
export function opposer(oui: boolean): void {
  if (oui) ecrire(local(), CLE_OPPOSITION, '1');
  else effacer(local(), CLE_OPPOSITION);
}

// Identifiants, avec accord seulement : visiteur (13 mois, jamais prolongé), session (30 minutes sans activité).
export function identifiants(maintenant = Date.now()): { visiteur: string; session: string } | null {
  if (!suiviAccepte()) return null;
  let v = lireJson<{ id: string; cree: number }>(local(), CLE_VISITEUR);
  if (!v || typeof v.id !== 'string' || typeof v.cree !== 'number' || maintenant - v.cree > DUREE_VISITEUR || v.cree > maintenant + JOUR) {
    v = { id: nouvelId(), cree: maintenant };
    ecrire(local(), CLE_VISITEUR, JSON.stringify(v));
  }
  let s = lireJson<{ id: string; derniere: number }>(onglet(), CLE_SESSION);
  if (!s || typeof s.id !== 'string' || typeof s.derniere !== 'number' || maintenant - s.derniere > PAUSE_SESSION) {
    s = { id: nouvelId(), derniere: maintenant };
  }
  s.derniere = maintenant;
  ecrire(onglet(), CLE_SESSION, JSON.stringify(s));
  return { visiteur: v.id, session: s.id };
}

// Paramètres de campagne de l'adresse en cours (lire l'adresse ne garde rien sur l'appareil).
export const UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;
export function utmAdresse(search = location.search): Record<string, string> {
  const p = new URLSearchParams(search);
  const r: Record<string, string> = {};
  UTM.forEach((k) => {
    const v = (p.get(k) || '').trim().slice(0, 100);
    if (v) r[k] = v;
  });
  return r;
}

// Campagne de la visite : celle de l'adresse d'arrivée, gardée pour la visite avec accord seulement ; sinon celle de
// l'adresse en cours.
export function retenirUtm(utm: Record<string, string>): void {
  if (Object.keys(utm).length && suiviAccepte()) ecrire(onglet(), CLE_UTM, JSON.stringify(utm));
}
export function utmVisite(): Record<string, string> {
  const ici = utmAdresse();
  if (Object.keys(ici).length || !suiviAccepte()) return ici;
  const garde = lireJson<Record<string, string>>(onglet(), CLE_UTM) || {};
  const r: Record<string, string> = {};
  UTM.forEach((k) => {
    if (typeof garde[k] === 'string' && garde[k]) r[k] = garde[k].slice(0, 100);
  });
  return r;
}

// Dernier bouton « Demander une démo » cliqué : en mémoire pour la page en cours, gardé pour la visite avec accord.
let boutonEnMemoire = '';
export function retenirBouton(cible: string): void {
  boutonEnMemoire = cible.slice(0, 60);
  if (suiviAccepte()) ecrire(onglet(), CLE_BOUTON, boutonEnMemoire);
}
export function dernierBouton(): string {
  if (boutonEnMemoire) return boutonEnMemoire;
  if (!suiviAccepte()) return '';
  try {
    return onglet()?.getItem(CLE_BOUTON) || '';
  } catch {
    return '';
  }
}

// Mesures envoyées seulement depuis le site en ligne (ni l'aperçu ni un serveur local), sauf opposition.
export function mesureActive(): boolean {
  return import.meta.env.BASE_URL === '/' && /(^|\.)deliview\.fr$/.test(location.hostname) && !oppose();
}

// Envoi sans attendre de réponse, même en quittant la page (sendBeacon, sinon fetch keepalive).
export function envoyer(evenement: Record<string, unknown>): void {
  if (!mesureActive()) return;
  const corps = JSON.stringify(evenement);
  try {
    if (typeof navigator.sendBeacon === 'function' && navigator.sendBeacon(ENDPOINT_MESURE, new Blob([corps], { type: 'text/plain' }))) return;
  } catch {
    /* envoi refusé : on essaie autrement */
  }
  try {
    void fetch(ENDPOINT_MESURE, { method: 'POST', body: corps, keepalive: true, headers: { 'Content-Type': 'text/plain' } }).catch(() => undefined);
  } catch {
    /* réseau indisponible : la mesure est perdue, sans gêner la visite */
  }
}
