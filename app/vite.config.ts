import { sveltekit } from '@sveltejs/kit/vite';
import type { PluginOption, UserConfig } from 'vite';
import { mergeConfig } from 'vite';
import { defineConfig as defineVitestConfig } from 'vitest/config';

const plugins: PluginOption[] = [];
plugins.push(sveltekit());

const viteConfig: UserConfig = {
  plugins,
  cacheDir: '.built/vite',
  build: {
    sourcemap: true,
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts'],
  },
};

const vitestConfig = defineVitestConfig({
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
});

export default mergeConfig(viteConfig, vitestConfig);
