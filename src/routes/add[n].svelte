<script context="module">
  import Game from "../components/Game.svelte";
  import { getAdditions } from "./addQuestions";
  import { isLegalAdd } from "./store.js";

  export async function preload(page, session) {
    const { n } = page.params;
    if (!isLegalAdd(n)) return this.error(404, "Not found");
    let questions = getAdditions(n);
    return { questions, n };
  }
</script>

<script>
  export let questions;
  export let n;
</script>

<svelte:head>
  <title>Additions {n}</title>
</svelte:head>

<Game {questions} id={'add' + n} />
