import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string().transform((str) => new Date(str)),
    heroImage: z.string(),
    imageAlt: z.string().optional(), // Added optional imageAlt
    author: z.string().default('Admin'), // Added author with a default value
    slug: z.string(),
  }),
});

export const collections = {
  'blog': blogCollection,
};
