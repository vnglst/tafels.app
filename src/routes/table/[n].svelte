<script context="module">
  import Game from "../../components/Game.svelte";
  import { tables } from "./tableQuestions.js";

  export async function preload(page) {
    const { n } = page.params;
    const challenge = tables.challenges[n];
    if (!challenge) return this.error(404, "Not found");
    return { challenge };
  }
</script>

<script>
  export let challenge;
</script>

<svelte:head>
  <title>Tables {challenge.id}</title>
</svelte:head>

<Game {challenge} />
