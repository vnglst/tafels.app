<script context="module">
  import Game from "../../components/Game.svelte";
  import { adds } from "./addQuestions.js";

  export async function preload(page) {
    const { n } = page.params;
    const challenge = adds.challenges[n];
    if (!challenge) return this.error(404, "Not found");
    return { challenge };
  }
</script>

<script lang="typescript">
  import { Challenge } from "../question-utils";
  export let challenge: Challenge;
</script>

<svelte:head>
  <title>Additions {challenge.id}</title>
</svelte:head>

<Game {challenge} />
