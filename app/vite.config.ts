import { sveltekit } from '@sveltejs/kit/vite';
import type { PluginOption, UserConfig } from 'vite';

const plugins: PluginOption[] = [];
plugins.push(sveltekit());

const Config: UserConfig = {
  plugins,
  cacheDir: '.built/vite',
  build: {
    sourcemap: true,
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts'],
  },
};

export default Config;
