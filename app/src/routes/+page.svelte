<script lang="ts">
  import Thing1 from '$lib/Thing1.svelte';
  import Thing2 from '@pbg.minimal/components/Thing2.svelte';
  import { Config } from '@pbg.minimal/components/util.js';
</script>

<div>
  <Thing1 name="Thing1" />
  <Thing2 name="Thing2" />
  <div>{Config}</div>
</div>
