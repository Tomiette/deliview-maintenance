const CLES = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;
const PREFIXE = "dv_";

function stockage(): Storage | null {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

/** Garde les UTM de l'URL d'arrivée pour la session (pas de cookie). */
export function memoriserUtm() {
  const s = stockage();
  if (!s) return;
  const params = new URLSearchParams(location.search);
  if (!CLES.some((cle) => params.has(cle))) return;
  for (const cle of CLES) {
    const valeur = params.get(cle);
    if (valeur) s.setItem(PREFIXE + cle, valeur.slice(0, 200));
    else s.removeItem(PREFIXE + cle);
  }
}

export function memoriserSection(section: string) {
  stockage()?.setItem(`${PREFIXE}section_cta`, section);
}

/** Remplit les champs cachés du formulaire de démo. */
export function remplirChampsCaches(form: HTMLFormElement) {
  const s = stockage();
  const valeurs: Record<string, string | null> = {
    page_origine: location.pathname,
    section_cta: s?.getItem(`${PREFIXE}section_cta`) ?? null,
  };
  for (const cle of CLES) valeurs[cle] = s?.getItem(PREFIXE + cle) ?? null;
  for (const [nom, valeur] of Object.entries(valeurs)) {
    const champ = form.elements.namedItem(nom);
    if (champ instanceof HTMLInputElement && valeur) champ.value = valeur;
  }
}
