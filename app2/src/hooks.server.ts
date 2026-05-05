import { initFirebase } from '#lib/server/firebase.ts';
import type { ServerInit } from '@sveltejs/kit';
import { handleServerRequest } from '@yp/node.firebase/appInit.ts';

export const init: ServerInit = async () => {
  // __registerGlobalInspect();
  await initFirebase({ useServiceAccount: false });
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const handle = handleServerRequest({
  debug: true,
});
