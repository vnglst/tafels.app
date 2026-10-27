<script lang="ts">
  import Game from "$lib/components/Game.svelte";
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<svelte:head>
  <title>Subtractions {data.challenge.id} - tafels.app</title>
</svelte:head>

{#key data.challenge.id}
  <Game challenge={data.challenge} />
{/key}
