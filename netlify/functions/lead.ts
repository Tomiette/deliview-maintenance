import type { Config, Context } from "@netlify/functions";
import { validerLead, type Lead } from "../../src/lib/leadSchema";

const TAILLE_MAX = 10_000;
const CHAMP_PIEGE = "site_web";

const env = (nom: string) => process.env[nom] ?? "";

function masquer(lead: Pick<Lead, "email" | "telephone">) {
  return `${lead.email.replace(/^(.).*@/, "$1***@")} ${lead.telephone.slice(0, 5)}****`;
}

function veutDuHtml(req: Request) {
  return !(req.headers.get("accept") ?? "").includes("application/json");
}

function json(status: number, corps: unknown) {
  return new Response(JSON.stringify(corps), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

function rediriger(chemin: string) {
  return new Response(null, { status: 303, headers: { location: chemin } });
}

function succes(req: Request) {
  return veutDuHtml(req) ? rediriger("/demande-envoyee") : json(201, { ok: true });
}

async function lireCorps(req: Request): Promise<Record<string, string> | null> {
  const brut = await req.text();
  if (brut.length > TAILLE_MAX) return null;
  const type = req.headers.get("content-type") ?? "";
  if (type.includes("application/json")) {
    try {
      const objet = JSON.parse(brut);
      return objet && typeof objet === "object" ? (objet as Record<string, string>) : null;
    } catch {
      return null;
    }
  }
  return Object.fromEntries(new URLSearchParams(brut));
}

function supabase(chemin: string, init: RequestInit = {}) {
  const cle = env("SUPABASE_SERVICE_ROLE_KEY");
  return fetch(`${env("SUPABASE_URL")}/rest/v1/${chemin}`, {
    ...init,
    headers: { apikey: cle, authorization: `Bearer ${cle}`, "content-type": "application/json", ...init.headers },
  });
}

/** Un double envoi (même email et même enseigne en moins de 10 minutes) ne crée pas de second lead. */
async function dejaRecu(lead: Lead) {
  const depuis = new Date(Date.now() - 10 * 60_000).toISOString();
  const params = new URLSearchParams({
    select: "id",
    email: `eq.${lead.email}`,
    enseigne: `eq.${lead.enseigne}`,
    created_at: `gte.${depuis}`,
    limit: "1",
  });
  const res = await supabase(`leads?${params}`);
  if (!res.ok) throw new Error(`lecture leads ${res.status}`);
  return ((await res.json()) as unknown[]).length > 0;
}

async function enregistrer(lead: Lead) {
  const res = await supabase("leads", { method: "POST", body: JSON.stringify(lead), headers: { prefer: "return=minimal" } });
  if (!res.ok) throw new Error(`insertion lead ${res.status}`);
}

async function envoyerEmail(to: string, sujet: string, texte: string, replyTo?: string) {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": env("BREVO_API_KEY"), "content-type": "application/json" },
    body: JSON.stringify({
      sender: { name: "Deliview", email: env("EMAIL_FROM") },
      to: [{ email: to }],
      ...(replyTo ? { replyTo: { email: replyTo } } : {}),
      subject: sujet,
      textContent: texte,
    }),
  });
  if (!res.ok) throw new Error(`email ${res.status}`);
}

async function notifier(lead: Lead) {
  const lignes = [
    `Nom : ${lead.nom}`,
    `Enseigne : ${lead.enseigne}`,
    `Téléphone : ${lead.telephone}`,
    `Email : ${lead.email}`,
    `Nombre de restaurants : ${lead.nombre_restaurants}`,
    `Page : ${lead.page_origine ?? "-"} · Bouton : ${lead.section_cta ?? "-"}`,
    `UTM : ${[lead.utm_source, lead.utm_medium, lead.utm_campaign, lead.utm_content].map((v) => v ?? "-").join(" / ")}`,
  ];
  const envois = await Promise.allSettled([
    envoyerEmail(env("LEAD_NOTIFICATION_EMAIL"), `Nouvelle demande de démo : ${lead.enseigne} (${lead.nombre_restaurants})`, lignes.join("\n"), lead.email),
    envoyerEmail(
      lead.email,
      "Votre demande de démo Deliview",
      [
        "Bonjour,",
        "",
        "C’est noté. Tom, fondateur de Deliview, vous rappelle sous 24 h pour fixer votre démo de 15 min.",
        "",
        "Pour toute question, répondez simplement à cet email.",
        "",
        "Tom",
        "Deliview",
      ].join("\n"),
      env("LEAD_NOTIFICATION_EMAIL"),
    ),
  ]);
  for (const envoi of envois) {
    if (envoi.status === "rejected") console.error("lead: email non envoyé", String(envoi.reason), masquer(lead));
  }
}

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return new Response("Méthode non autorisée", { status: 405, headers: { allow: "POST" } });
  }

  const origine = req.headers.get("origin");
  if (origine && origine !== env("SITE_ORIGIN") && origine !== new URL(req.url).origin) {
    return json(403, { ok: false });
  }

  const corps = await lireCorps(req);
  if (!corps) return json(413, { ok: false });

  // Robot : on répond comme si tout allait bien, sans rien enregistrer.
  if (corps[CHAMP_PIEGE]) return succes(req);

  const validation = validerLead(corps);
  if (!validation.ok) {
    return veutDuHtml(req) ? rediriger("/demande-non-envoyee") : json(422, { ok: false, erreurs: validation.erreurs });
  }
  const { lead } = validation;

  // L'enregistrement passe avant les emails : un email perdu ne fait jamais perdre un lead.
  try {
    if (await dejaRecu(lead)) return succes(req);
    await enregistrer(lead);
  } catch (e) {
    console.error("lead: enregistrement impossible", String(e), masquer(lead));
    return veutDuHtml(req) ? rediriger("/demande-non-envoyee") : json(500, { ok: false });
  }

  context.waitUntil(notifier(lead));
  return succes(req);
};

export const config: Config = {
  path: "/api/lead",
  rateLimit: { windowLimit: 5, windowSize: 60, aggregateBy: ["ip", "domain"] },
};
