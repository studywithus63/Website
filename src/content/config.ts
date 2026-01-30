import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string().transform((str) => new Date(str)),
    heroImage: z.array(z.string()), // Changed to accept multiple images
    imageAlt: z.string().optional(),
    author: z.string().default('Admin'),
    slug: z.string(),
    tableOfContents: z.string(), // Changed from tagline to tableOfContents
  }),
});

export const collections = {
  'blog': blogCollection,
};
