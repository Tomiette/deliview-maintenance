// Service worker de l'app Deliview (4 octobre 2026) : rend l'app installable sur l'écran d'accueil du téléphone
// (iPhone et Android, sans passer par les stores) et prépare les notifications (alerte de fermeture, demandes, messages).
// Pas de cache des données : l'app lit toujours la base en direct ; hors connexion, le navigateur affiche son erreur.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {
  /* réseau seulement */
});

// Notification reçue : { titre, texte, lien } (lien relatif à l'app, ex. « #/ »).
self.addEventListener('push', (e) => {
  let d = {};
  try {
    d = e.data ? e.data.json() : {};
  } catch {
    d = { texte: e.data ? e.data.text() : '' };
  }
  e.waitUntil(
    self.registration.showNotification(d.titre || 'Deliview', {
      body: d.texte || '',
      icon: 'icones/icone-192.png',
      badge: 'icones/icone-192.png',
      data: { lien: d.lien || './' },
      tag: d.tag || undefined,
    }),
  );
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const cible = new URL(e.notification.data?.lien || './', self.registration.scope).href;
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((fenetres) => {
      for (const f of fenetres) {
        if (f.url.startsWith(self.registration.scope)) {
          f.navigate(cible);
          return f.focus();
        }
      }
      return self.clients.openWindow(cible);
    }),
  );
});
