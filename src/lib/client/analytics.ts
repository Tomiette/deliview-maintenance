type Proprietes = Record<string, string>;

declare global {
  interface Window {
    _paq?: unknown[][];
  }
}

/** Envoie un événement de conversion à Matomo (ignoré tant que Matomo n'est pas branché). */
export function suivre(evenement: string, proprietes: Proprietes = {}) {
  const nom = Object.entries(proprietes)
    .map(([cle, valeur]) => `${cle}=${valeur}`)
    .join(";");
  window._paq?.push(["trackEvent", "conversion", evenement, nom || undefined]);
}

export function chargerMatomo() {
  const url = import.meta.env.PUBLIC_MATOMO_URL as string | undefined;
  const site = import.meta.env.PUBLIC_MATOMO_SITE_ID as string | undefined;
  if (!url || !site) return;
  const base = url.replace(/\/$/, "");
  window._paq = window._paq ?? [];
  window._paq.push(["setTrackerUrl", `${base}/matomo.php`], ["setSiteId", site], ["trackPageView"], ["enableLinkTracking"]);
  const script = document.createElement("script");
  script.async = true;
  script.src = `${base}/matomo.js`;
  document.head.append(script);
}
