import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import handler from "../netlify/functions/lead";
import type { Context } from "@netlify/functions";

const lead = {
  nom: "Camille Martin",
  restaurant: "Chez Camille",
  ville: "Lyon",
  telephone: "06 12 34 56 78",
  email: "camille@exemple.fr",
  points_de_vente: "1",
};

let appels: string[];
let promesses: Promise<unknown>[];
const contexte = () => ({ waitUntil: (p: Promise<unknown>) => promesses.push(p) }) as unknown as Context;

function requete(corps: unknown, options: { json?: boolean; methode?: string; origine?: string } = {}) {
  const { json = true, methode = "POST", origine = "https://deliview.fr" } = options;
  return new Request("https://deliview.fr/api/lead", {
    method: methode,
    headers: {
      origin: origine,
      "content-type": json ? "application/json" : "application/x-www-form-urlencoded",
      accept: json ? "application/json" : "text/html",
    },
    body: methode === "POST" ? (json ? JSON.stringify(corps) : new URLSearchParams(corps as Record<string, string>).toString()) : undefined,
  });
}

function simuler({ doublon = false, insertionOk = true, emailOk = true } = {}) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init?: RequestInit) => {
      const methode = init?.method ?? "GET";
      if (url.includes("/rest/v1/leads") && methode === "GET") {
        appels.push("lecture");
        return new Response(JSON.stringify(doublon ? [{ id: "x" }] : []), { status: 200 });
      }
      if (url.includes("/rest/v1/leads")) {
        appels.push("insertion");
        return new Response(null, { status: insertionOk ? 201 : 500 });
      }
      appels.push("email");
      return new Response("{}", { status: emailOk ? 201 : 500 });
    }),
  );
}

beforeEach(() => {
  appels = [];
  promesses = [];
  process.env.SUPABASE_URL = "https://projet.supabase.co";
  process.env.SITE_ORIGIN = "https://deliview.fr";
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => vi.unstubAllGlobals());

describe("/api/lead", () => {
  it("refuse les méthodes autres que POST", async () => {
    simuler();
    expect((await handler(requete(null, { methode: "GET" }), contexte())).status).toBe(405);
  });

  it("refuse une autre origine", async () => {
    simuler();
    expect((await handler(requete(lead, { origine: "https://pirate.example" }), contexte())).status).toBe(403);
  });

  it("enregistre le lead avant d'envoyer les emails", async () => {
    simuler();
    const res = await handler(requete(lead), contexte());
    await Promise.all(promesses);
    expect(res.status).toBe(201);
    expect(appels).toEqual(["lecture", "insertion", "email", "email"]);
  });

  it("confirme au prospect même si les emails échouent", async () => {
    simuler({ emailOk: false });
    const res = await handler(requete(lead), contexte());
    await Promise.all(promesses);
    expect(res.status).toBe(201);
    expect(appels).toContain("insertion");
  });

  it("ne crée pas de doublon", async () => {
    simuler({ doublon: true });
    const res = await handler(requete(lead), contexte());
    expect(res.status).toBe(201);
    expect(appels).toEqual(["lecture"]);
  });

  it("ignore silencieusement le champ piège", async () => {
    simuler();
    const res = await handler(requete({ ...lead, site_web: "spam" }), contexte());
    expect(res.status).toBe(201);
    expect(appels).toEqual([]);
  });

  it("renvoie les erreurs par champ en 422", async () => {
    simuler();
    const res = await handler(requete({ ...lead, email: "x" }), contexte());
    expect(res.status).toBe(422);
    const corps = (await res.json()) as { erreurs: Record<string, string> };
    expect(Object.keys(corps.erreurs)).toEqual(["email"]);
  });

  it("sans JavaScript : redirige vers la confirmation", async () => {
    simuler();
    const res = await handler(requete(lead, { json: false }), contexte());
    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toBe("/demande-envoyee");
  });

  it("signale un échec d'enregistrement sans détail technique", async () => {
    simuler({ insertionOk: false });
    const res = await handler(requete(lead), contexte());
    expect(res.status).toBe(500);
    expect(await res.text()).toBe('{"ok":false}');
    expect(appels).not.toContain("email");
  });
});
