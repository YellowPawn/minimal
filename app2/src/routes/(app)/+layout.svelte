<script lang="ts" module>
  import '@tailwindplus/elements';
  import '../../app.css';
</script>

<script lang="ts">
  import { ignore } from '@yp/common/async.ts';
  import { Orientation, screenSize } from '@yp/web.app/client/device.ts';
  import { checkForElementIdUniqueness } from '@yp/web.app/client/util.ts';
  import { initCallbacks } from '@yp/web.app/context/context.svelte.ts';
  import { CbToast, Toaster } from '@yp/web.app/tw/Toaster.ts';
  import { initUserContext } from '@yp/web.firebase/auth/context.svelte.ts';
  import { onMount, type Snippet } from 'svelte';
  import type { PageProps } from './$types.ts';

  initCallbacks();
  const onNotify = CbToast.caller();

  const { data, children }: PageProps & { children: Snippet } = $props();

  const uctx = initUserContext();

  onMount(async () => {
    const screen = screenSize();
    console.log('Display', { screen });

    ignore(
      Orientation.load().then((o) => {
        console.log('orientation', o);
      }),
    );

    checkForElementIdUniqueness();
  });
</script>

{@render children()}

<Toaster />
