<script context="module">
  import Game from "../../components/Game.svelte";
  import { subtracts } from "./subtractQuestions.js";

  export async function preload(page) {
    const { n } = page.params;
    const challenge = subtracts.challenges[n];
    if (!challenge) return this.error(404, "Not found");
    return { challenge };
  }
</script>

<script lang="ts">
  import { Challenge } from "../question-utils";
  export let challenge: Challenge;
</script>

<svelte:head>
  <title>Subtractions {challenge.id}</title>
</svelte:head>

<Game {challenge} />
