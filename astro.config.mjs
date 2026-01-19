// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://jdebenit.github.io',
  base: '/mels',
  integrations: [react()]
});