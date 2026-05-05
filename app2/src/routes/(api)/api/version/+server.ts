import PackageConfig from '#pkg' with { type: 'json' };
import type { VersionData } from '@yp/web.app/api/version.ts';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.ts';

export const GET: RequestHandler = async () => {
  const result: VersionData = { version: PackageConfig.version };
  return json(result);
};
