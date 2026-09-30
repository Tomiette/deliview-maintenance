import { chargerMatomo, suivre } from "./analytics";
import { memoriserSection, memoriserUtm } from "./utm";

memoriserUtm();
chargerMatomo();

document.addEventListener("click", (e) => {
  const cta = (e.target as Element | null)?.closest<HTMLElement>("[data-cta]");
  if (!cta) return;
  const section = cta.dataset.cta ?? "inconnue";
  memoriserSection(section);
  suivre("cta_demo_clic", { section });
});

// Barre démo mobile : visible une fois le bouton du hero passé, masquée quand le formulaire est à l'écran.
const barre = document.querySelector<HTMLElement>("[data-barre-demo]");
if (barre) {
  const repere = document.querySelector("[data-repere-barre]");
  const formulaire = document.querySelector("#demo");
  let herosPasse = !repere;
  let formulaireVisible = false;
  const maj = () => {
    const visible = herosPasse && !formulaireVisible;
    barre.dataset.visible = String(visible);
    barre.inert = !visible;
  };
  if ("IntersectionObserver" in window) {
    if (repere) {
      new IntersectionObserver(([e]) => {
        herosPasse = !e.isIntersecting && e.boundingClientRect.top < 0;
        maj();
      }).observe(repere);
    }
    if (formulaire) {
      new IntersectionObserver(([e]) => {
        formulaireVisible = e.isIntersecting;
        maj();
      }).observe(formulaire);
    }
  }
  maj();
}
