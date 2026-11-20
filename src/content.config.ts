import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    service: z.string(),
    category: z.string(),
    benefit: z.string(),
    code: z.string().optional(),
    url: z.string().url().optional(),
    officialSite: z.string().url().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    dateModified: z.string(),
    featured: z.boolean().default(false),
    rank: z.number().optional(),
    points: z.array(z.string()).optional(),
    prNote: z.string().optional(),
  }),
});

export const collections = { articles };
