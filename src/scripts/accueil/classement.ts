// Accueil (aperçu validé par Tom le 10 octobre 2026) : animation « Avant, après » du classement, calculée image par
// image à partir d'une seule progression p (0 = avant, 1 = après). Pizza Démo double les restaurants un par un, le
// compteur descend de 6 à 1. Boucle quand la scène est visible ; un clic sur Avant / Après ou la pause l'arrête. Si le
// visiteur réduit les animations : pas de boucle, l'état « Après » s'affiche, mais un clic joue une transition courte,
// puisqu'il l'a demandée.
// Repris d'accueil-classement.js (aperçu fait à la main), même logique, avec les types de TypeScript.
// Le HTML (components/accueil/AccueilClassement.astro) porte data-classement, data-classement-voir,
// data-classement-pause et data-classement-annonce ; ce script pose dvc-js, dvc-choix-js, dvc-choix-curseur,
// dvc-pos-n, dvc-pos-premier, dvc-tic, dvc-fondu, data-etape, data-etat et data-choix ; styles/accueil/classement.css
// fait le reste.
const scene = document.querySelector<HTMLElement>('[data-classement]');
if (scene) {
  const calme = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const choix = document.querySelector<HTMLElement>('.dvc-choix') as HTMLElement;
  const boutons = Array.from(document.querySelectorAll<HTMLElement>('[data-classement-voir]'));
  const pause = document.querySelector<HTMLElement>('[data-classement-pause]');
  const annonce = scene.querySelector<HTMLElement>('[data-classement-annonce]') as HTMLElement;
  const rangs = Array.from(scene.querySelectorAll<HTMLElement>('.dvc-rang'));
  const cosy = scene.querySelector<HTMLElement>('.dvc-cosy') as HTMLElement;
  const concurrents = rangs.filter((r) => r !== cosy);
  const compteur = scene.querySelector<HTMLElement>('.dvc-position b') as HTMLElement;
  const R = parseFloat(getComputedStyle(scene).getPropertyValue('--rang')) || 68;
  const N = concurrents.length; // Pizza Démo part de la place N + 1

  scene.classList.add('dvc-js');
  compteur.innerHTML = '<span class="dvc-pos-n"></span>';
  const nombre = compteur.firstChild as HTMLElement;
  let rangAffiche = 0;
  const curseur = document.createElement('span');
  curseur.className = 'dvc-choix-curseur';
  curseur.setAttribute('aria-hidden', 'true');
  choix.insertBefore(curseur, choix.firstChild);
  choix.classList.add('dvc-choix-js');

  const borne = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
  const douce = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  let p = 0,
    tourne = false;
  const rendre = (v: number) => {
    p = v;
    const etape = v > 0.32 ? 3 : v > 0.2 ? 2 : v > 0.08 ? 1 : 0;
    scene.setAttribute('data-etape', String(etape));
    // La remontée occupe la seconde moitié : position continue de N (en bas) à 0 (en tête).
    const c = douce(borne((v - 0.42) / 0.55));
    const y = N - N * c;
    cosy.style.transform = 'translateY(' + (y * R).toFixed(1) + 'px) scale(' + (1 + 0.045 * Math.sin(Math.PI * c)).toFixed(3) + ')';
    // Chaque restaurant descend d'une place au moment précis où Pizza Démo le dépasse.
    concurrents.forEach((r, k) => {
      const d = borne(k + 1 - y);
      r.style.transform = 'translateY(' + ((k + d) * R).toFixed(1) + 'px)';
    });
    scene.setAttribute('data-etat', c > 0.985 ? 'apres' : 'avant');
    // En lecture automatique, le sélecteur bascule sur « Après » quand la remontée commence.
    if (tourne && v >= 0.42 && choix.getAttribute('data-choix') !== 'apres') placer('apres');
    const rang = Math.min(N + 1, Math.round(y) + 1);
    if (rang !== rangAffiche) {
      rangAffiche = rang;
      nombre.innerHTML = rang + '<sup>' + (rang === 1 ? 're' : 'e') + '</sup>';
      nombre.classList.toggle('dvc-pos-premier', rang === 1);
      nombre.classList.remove('dvc-tic');
      void nombre.offsetWidth;
      nombre.classList.add('dvc-tic');
    }
  };

  const placer = (etat: string) => {
    boutons.forEach((b) => {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-classement-voir') === etat));
    });
    const b = boutons.filter((x) => x.getAttribute('data-classement-voir') === etat)[0];
    curseur.style.width = b.offsetWidth + 'px';
    curseur.style.transform = 'translateX(' + b.offsetLeft + 'px)';
    choix.setAttribute('data-choix', etat);
  };
  const annoncer = (etat: string) => {
    annonce.textContent = etat === 'apres' ? 'Après : Pizza Démo apparaît en 1re position.' : 'Avant : Pizza Démo apparaît en 6e position.';
  };

  // Animation de p vers une cible ; renvoie une promesse, annulée si une autre animation démarre.
  let jeton = 0;
  const animer = (cible: number, duree: number) => {
    const mien = ++jeton,
      depart = p;
    let debut = 0;
    return new Promise<boolean>((fini) => {
      if (duree <= 0 || depart === cible) {
        rendre(cible);
        fini(true);
        return;
      }
      const pas = (t: number) => {
        if (mien !== jeton) {
          fini(false);
          return;
        }
        if (!debut) debut = t;
        const k = borne((t - debut) / duree);
        rendre(depart + (cible - depart) * k);
        if (k < 1) requestAnimationFrame(pas);
        else fini(true);
      };
      requestAnimationFrame(pas);
    });
  };
  const attendre = (ms: number) => {
    const mien = jeton;
    return new Promise<boolean>((fini) => {
      setTimeout(() => {
        fini(mien === jeton);
      }, ms);
    });
  };

  let auto = !calme,
    visible = false;
  const boucle = () => {
    if (tourne || !auto || !visible) return;
    tourne = true;
    const tour = () => {
      if (!auto || !visible) {
        tourne = false;
        return;
      }
      attendre(700)
        .then((ok) => {
          if (!ok) throw 0;
          return animer(1, 4400);
        })
        .then((ok) => {
          if (!ok) throw 0;
          annoncer('apres');
          return attendre(2600);
        })
        .then((ok) => {
          if (!ok) throw 0;
          scene.classList.add('dvc-fondu');
          return attendre(380);
        })
        .then((ok) => {
          if (!ok) throw 0;
          rendre(0);
          placer('avant');
          scene.classList.remove('dvc-fondu');
          return attendre(500);
        })
        .then((ok) => {
          if (!ok) throw 0;
          tour();
        })
        .catch(() => {
          tourne = false;
          scene.classList.remove('dvc-fondu');
        });
    };
    tour();
  };
  const arreter = () => {
    auto = false;
    jeton++;
    tourne = false;
    scene.classList.remove('dvc-fondu');
    if (pause) {
      pause.setAttribute('aria-pressed', 'true');
      (pause.querySelector('.sr-only') as HTMLElement).textContent = 'Relancer l’animation';
    }
  };

  boutons.forEach((b) => {
    b.addEventListener('click', () => {
      const etat = b.getAttribute('data-classement-voir') as string;
      arreter();
      placer(etat);
      const vers = etat === 'apres' ? 1 : 0;
      const duree = Math.abs(vers - p) * (vers ? (calme ? 1500 : 3200) : calme ? 700 : 1100);
      animer(vers, duree).then((ok) => {
        if (ok) annoncer(etat);
      });
    });
  });
  if (pause) {
    if (calme) pause.hidden = true;
    pause.addEventListener('click', () => {
      if (auto) {
        arreter();
        return;
      }
      auto = true;
      pause.setAttribute('aria-pressed', 'false');
      (pause.querySelector('.sr-only') as HTMLElement).textContent = 'Mettre l’animation en pause';
      if (p > 0) {
        animer(0, 900).then((ok) => {
          if (ok) {
            placer('avant');
            boucle();
          }
        });
      } else boucle();
    });
  }
  window.addEventListener('resize', () => {
    placer(choix.getAttribute('data-choix') || 'avant');
  });
  if (document.fonts)
    document.fonts.ready.then(() => {
      placer(choix.getAttribute('data-choix') || 'avant');
    });

  if (calme) {
    rendre(1);
    placer('apres');
    annoncer('apres');
  } else {
    rendre(0);
    placer('avant');
  }

  if (!calme && 'IntersectionObserver' in window) {
    new IntersectionObserver(
      (e) => {
        visible = e[0].isIntersecting;
        if (visible) boucle();
        else if (auto) {
          jeton++;
          tourne = false;
          scene.classList.remove('dvc-fondu');
          rendre(0);
          placer('avant');
        }
      },
      { threshold: 0.35 },
    ).observe(scene);
  }
}
