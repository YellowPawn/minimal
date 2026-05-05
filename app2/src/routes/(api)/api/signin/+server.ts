import { buildHandler } from '@yp/node.app/routes/api/signin/server.ts';
import type { RouteId } from './$types.ts';

const { PUT, DELETE } = buildHandler<RouteId>({});
export { DELETE, PUT };
