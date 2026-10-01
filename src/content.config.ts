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
    titreSeo: z.string().min(10).max(52),
    description: z.string().min(110).max(160),
    theme: z.enum(['prix-et-concurrence', 'carte-et-marge', 'reputation', 'commandes']),
    // Réponse directe en tête d'article (40 à 60 mots).
    enBref: z.string().min(120).max(520),
    publieLe: z.coerce.date(),
    misAJourLe: z.coerce.date(),
    auteur: z.string().default('Tom Voisin'),
    sources: z
      .array(z.object({ titre: z.string(), url: z.url(), editeur: z.string(), consulteLe: z.string() }))
      .min(1),
    brouillon: z.boolean().default(false),
  }),
});

export const collections = { ressources };
