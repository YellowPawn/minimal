import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const Config = {
  kit: {
    adapter: adapter({
      pages: 'dist',
      fallback: '200.html',
      precompress: false,
      strict: false,
    }),
    outDir: '.built',
  },
  preprocess: [vitePreprocess()],
};

export default Config;
