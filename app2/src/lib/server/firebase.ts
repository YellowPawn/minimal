import { isString, recordEntries, recordFromEntries } from '@yp/common/identity.ts';
import { DownloadedSecret } from '@yp/node.apis.gcloud/secrets.ts';
import { WorkspaceDir } from '@yp/node.core/filesystem.ts';
import { mkdir } from '@yp/node.core/process.ts';
import { initializeAdmin } from '@yp/node.firebase/init.ts';
import { join } from 'node:path';
import { Firebase } from '../common/public.ts';

export async function initFirebase(params?: { useServiceAccount?: boolean }) {
  if (params?.useServiceAccount ?? false) {
    const secretDir = join(WorkspaceDir, 'secrets.local');
    await mkdir(secretDir);
    const client = new DownloadedSecret(
      { context: { project: Firebase.projectId }, secretId: 'sa-key-ludathon-ide' },
      { dir: secretDir, ext: 'json' },
    );
    await client.fetch({ cache: true });
    const serviceAccount = JSON.parse(await client.read());
    initializeAdmin({
      serviceAccount,
      projectId: Firebase.projectId,
    });
  } else {
    initializeAdmin({
      projectId: Firebase.projectId,
      clientId: 'ludathon-ide@comicsans-games.iam.gserviceaccount.com',
    });
  }

  const emu = process.env.VITE_FIREBASE_EMU;
  if (emu === 'TRUE') {
    const debugEnv = recordFromEntries(
      recordEntries(process.env).filter(([k, v]) => {
        if (!isString(k)) {
          return false;
        }
        k = k.toLocaleLowerCase();
        return k.includes('firebase') || k.includes('cloud');
      }),
    );
    console.log('Env', debugEnv);
    const { getFunctions, connectFunctionsEmulator } = await import('firebase/functions');
    const functions = getFunctions();
    connectFunctionsEmulator(functions, '127.0.0.1', 5001);
  }
}
