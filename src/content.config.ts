// Articles de la section Ressources : un fichier Markdown par article dans src/content/ressources/.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const ressources = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ressources' }),
  schema: z.object({
    // H1 de l'article.
    titre: z.string().min(10).max(110),
    // Balise <title>, sans « | Deliview » (ajouté automatiquement) : 60 caractères au plus en tout.
    titreSeo: z.string().min(10).max(49),
    description: z.string().min(110).max(160),
    theme: z.enum(['prix-et-concurrence', 'carte-et-marge', 'reputation', 'commandes']),
    // Réponse directe en tête d'article (40 à 60 mots).
    enBref: z.string().min(120).max(520),
    publieLe: z.coerce.date(),
    misAJourLe: z.coerce.date(),
    auteur: z.string().default('Tom Voisin'),
    // Photo de l'article (6 octobre 2026) : photo Unsplash (licence Unsplash, gratuite), sans visage ni marque
    // reconnaissable, recadrée en 16:9 et déclinée en WebP (public/images/ressources/<slug>-<largeur>.webp).
    // Depuis le 6 octobre 2026 (10 h 40) : ou visuel créé par Deliview aux couleurs de la charte, sans crédit.
    image: z
      .object({
        src: z.string().regex(/^\/images\/ressources\/[a-z0-9-]+$/),
        largeurs: z.array(z.number().int().min(400).max(2000)).min(1),
        alt: z.string().min(15).max(220),
        credit: z.object({ nom: z.string().min(2), profil: z.url(), page: z.url() }).optional(),
      })
      .optional(),
    sources: z
      .array(z.object({ titre: z.string(), url: z.url(), editeur: z.string(), consulteLe: z.string() }))
      .min(1),
    brouillon: z.boolean().default(false),
  }),
});

export const collections = { ressources };
