import { Firebase } from '#lib/common/public.ts';
import PackageConfig from '#pkg' with { type: 'json' };
import { IsProduction } from '@yp/common/core.ts';
import { handleClientError } from '@yp/web.app/client/errors.ts';
import { initClient } from '@yp/web.firebase/client/init.ts';

export const handleError = handleClientError();

export const init = initClient({
  appName: 'minimal-app-2',
  version: PackageConfig.version,
  firebase: Firebase,
  reportErrors: IsProduction,
});
