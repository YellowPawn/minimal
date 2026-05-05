<script>
  import { page } from '$app/state';
  // import '../app.css';

  // TODO: Consider rendering src/error.html with this data, so we don't have to have two error
  // templates.

  const contactEmail = 'brian@mcbarron.net';
</script>

<div class="flex flex-col gap-2 items-center mt-[25%] text-center h-dvh p-4 text-lg">
  <h1 class="text-4xl font-meatball text-m-dp">Oh no, something went wrong!</h1>
  {#if page.error}
    <div class="my-4">
      <div class="italic text-md">The error message was:</div>
      <div class="font-bold">"{page.error.message}"</div>
    </div>
  {:else}
    <div>We're not exactly sure what happened.</div>
  {/if}
  <div>
    For assistance, contact<br /><a class="text-info underline" href="mailto:{contactEmail}"
      >{contactEmail}</a>
  </div>
</div>
