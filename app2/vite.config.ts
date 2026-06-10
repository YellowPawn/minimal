// N.B. vite can only load .ts files with configLoader: https://vite.dev/config/#configuring-vite
// However, firebase web frameworks only runs vite without any parameters. So, we need to import
// as a .js file.
import BaseConfig from '@yp/web.config/app/vite.base-config.js';
import { defineConfig, mergeConfig } from 'vite';

const projectConfig = defineConfig({
  server: {
    allowedHosts: ['localhost'],
  },
});
console.log('vite @yp.extra/lh', { projectConfig: JSON.stringify(projectConfig, null, 2) });
export default mergeConfig(BaseConfig, projectConfig);

// Note: If firebase has problems loading this file, check firebase-debug.log for details.
