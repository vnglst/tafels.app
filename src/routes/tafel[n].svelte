<script context="module">
  import Game from "../components/Game.svelte";
  import { getTable } from "./tableQuestions";
  import { isLegalTable } from "./store.js";

  export async function preload(page) {
    const { n } = page.params;
    if (!isLegalTable(n)) return this.error(404, "Not found");
    let questions = getTable(n);
    return { questions, n };
  }
</script>

<script>
  export let questions;
  export let n;
</script>

<svelte:head>
  <title>Tables {n}</title>
</svelte:head>

<Game {questions} id={'table' + n} />
