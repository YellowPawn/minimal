import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.sv'],

  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors.
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    outDir: '.built',
  },
};

export default config;
