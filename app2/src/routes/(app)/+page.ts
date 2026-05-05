import { goto } from '$app/navigation';
import { log } from '@yp/common/core.ts';
import { userSignOut } from '@yp/web.firebase/client/auth.ts';

export async function load({ url }: { url: URL }) {
  if (url.searchParams.get('signOut') === '1') {
    log('Forced sign out.', {}, { level: 'warn' });
    url.searchParams.delete('signOut');
    await userSignOut();
    goto(url.toString(), { replaceState: true, keepFocus: true });
  }

  return {};
}
