import { describe, expect, it } from "vitest";
import { normaliserTelephone, validerLead } from "../src/lib/leadSchema";

const valide = {
  nom: "  Camille   Martin ",
  enseigne: "Burger & Co",
  telephone: "06 12 34 56 78",
  email: " Camille@Exemple.FR ",
  nombre_restaurants: "21-100",
};

describe("normaliserTelephone", () => {
  it.each([
    ["06 12 34 56 78", "+33612345678"],
    ["06.12.34.56.78", "+33612345678"],
    ["+33 6 12 34 56 78", "+33612345678"],
    ["0033612345678", "+33612345678"],
  ])("%s → %s", (brut, attendu) => expect(normaliserTelephone(brut)).toBe(attendu));

  it.each(["0612", "12345678901", "+33012345678", "abc"])("refuse %s", (brut) =>
    expect(normaliserTelephone(brut)).toBeNull(),
  );
});

describe("validerLead", () => {
  it("normalise un envoi valide", () => {
    const res = validerLead(valide);
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.lead.nom).toBe("Camille Martin");
    expect(res.lead.email).toBe("camille@exemple.fr");
    expect(res.lead.telephone).toBe("+33612345678");
    expect(res.lead.utm_source).toBeNull();
  });

  it("renvoie un message par champ en erreur", () => {
    const res = validerLead({ ...valide, telephone: "0612", email: "pas-un-email", nombre_restaurants: "3" });
    expect(res.ok).toBe(false);
    if (res.ok) return;
    expect(res.erreurs.telephone).toContain("10 chiffres");
    expect(res.erreurs.email).toContain("@");
    expect(res.erreurs.nombre_restaurants).toBeDefined();
    expect(res.erreurs.nom).toBeUndefined();
  });

  it("signale les champs manquants", () => {
    const res = validerLead({});
    expect(res.ok).toBe(false);
    if (res.ok) return;
    expect(Object.keys(res.erreurs).sort()).toEqual(
      ["email", "enseigne", "nom", "nombre_restaurants", "telephone"].sort(),
    );
  });

  it("garde les UTM", () => {
    const res = validerLead({ ...valide, utm_source: "linkedin", section_cta: "hero" });
    expect(res.ok && res.lead.utm_source).toBe("linkedin");
  });
});
