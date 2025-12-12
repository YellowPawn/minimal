<script lang="ts">
  import Thing1 from '#lib/Thing1.svelte';
  import Thing2 from '@yp.minimal/components/Thing2.svelte';
  import { Config } from '@yp.minimal/components/util.ts';
</script>

<div>
  <Thing1 name="Thing1" />
  <Thing2 name="Thing2" />
  <div>{Config}</div>
</div>
