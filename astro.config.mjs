import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://studywithuswebsite--studywithus-web-site-96b3a.asia-southeast1.hosted.app',
  integrations: [mdx(), sitemap()],
  output: 'server',

  adapter: node({
    mode: 'standalone'
  }),

  server: {
    host: true
  },

  security: {
    checkOrigin: true
  },

  vite: {
    plugins: [tailwindcss()]
  }
});