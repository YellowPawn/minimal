<script lang="ts" module>
  import '../../app.css';
  import '@tailwindplus/elements';
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  const { children }: { children: Snippet } = $props();
</script>

{@render children()}
