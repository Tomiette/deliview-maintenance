import { z } from "zod";

export const POINTS_DE_VENTE = ["1", "2-5", "6-10", "11-19", "20+"] as const;

const espaces = (v: string) => v.replace(/\s+/g, " ").trim();

/** Convertit un numéro français en E.164 (+33…). Renvoie null si le format n'est pas reconnu. */
export function normaliserTelephone(brut: string): string | null {
  const chiffres = brut.replace(/[\s.\-()]/g, "");
  let national: string | null = null;
  if (/^0\d{9}$/.test(chiffres)) national = chiffres.slice(1);
  else if (/^\+33\d{9}$/.test(chiffres)) national = chiffres.slice(3);
  else if (/^0033\d{9}$/.test(chiffres)) national = chiffres.slice(4);
  if (!national || national.startsWith("0")) return null;
  return `+33${national}`;
}

const texte = (min: number, max: number, vide: string, court: string) =>
  z
    .string({ error: vide })
    .transform(espaces)
    .pipe(z.string().min(1, vide).min(min, court).max(max, `Ce champ est limité à ${max} caractères.`));

const optionnel = z
  .string()
  .max(200)
  .transform((v) => espaces(v) || null)
  .nullish()
  .transform((v) => v ?? null);

export const leadSchema = z.object({
  nom: texte(2, 120, "Indiquez votre prénom et votre nom.", "Indiquez votre prénom et votre nom."),
  restaurant: texte(2, 160, "Indiquez le nom de votre restaurant.", "Le nom du restaurant semble trop court."),
  ville: texte(2, 120, "Indiquez la ville de votre restaurant.", "Le nom de la ville semble trop court."),
  telephone: z
    .string({ error: "Indiquez votre numéro pour que Tom vous rappelle." })
    .transform((v, ctx) => {
      if (!v.trim()) {
        ctx.addIssue({ code: "custom", message: "Indiquez votre numéro pour que Tom vous rappelle." });
        return z.NEVER;
      }
      const e164 = normaliserTelephone(v);
      if (!e164) {
        ctx.addIssue({
          code: "custom",
          message: "Ce numéro semble incomplet. Vérifiez qu’il a bien 10 chiffres.",
        });
        return z.NEVER;
      }
      return e164;
    }),
  email: z
    .string({ error: "Indiquez votre adresse email." })
    .transform((v) => v.trim().toLowerCase())
    .pipe(
      z
        .string()
        .min(1, "Indiquez votre adresse email.")
        .max(254)
        .pipe(z.email("Cette adresse email semble incomplète. Vérifiez qu’elle contient un @ et un domaine.")),
    ),
  points_de_vente: z.enum(POINTS_DE_VENTE, {
    error: "Choisissez votre nombre de points de vente.",
  }),
  utm_source: optionnel,
  utm_medium: optionnel,
  utm_campaign: optionnel,
  utm_content: optionnel,
  page_origine: optionnel,
  section_cta: optionnel,
});

export type Lead = z.output<typeof leadSchema>;
export type ChampLead = keyof z.input<typeof leadSchema>;

/** Valide un envoi et renvoie soit le lead normalisé, soit un message par champ. */
export function validerLead(
  donnees: Record<string, unknown>,
): { ok: true; lead: Lead } | { ok: false; erreurs: Partial<Record<ChampLead, string>> } {
  const res = leadSchema.safeParse(donnees);
  if (res.success) return { ok: true, lead: res.data };
  const erreurs: Partial<Record<ChampLead, string>> = {};
  for (const issue of res.error.issues) {
    const champ = issue.path[0] as ChampLead | undefined;
    if (champ && !erreurs[champ]) erreurs[champ] = issue.message;
  }
  return { ok: false, erreurs };
}
