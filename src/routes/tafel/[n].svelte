<script context="module">
  import Game from "../../components/Game.svelte";
  import { getTable } from "./tableQuestions";
  import { getTableId } from "../categories";

  export async function preload(page) {
    const { n } = page.params;
    const tableId = getTableId(n);
    if (!tableId) return this.error(404, "Not found");
    let questions = getTable(n);
    return { questions, tableId, n };
  }
</script>

<script>
  export let questions;
  export let tableId;
  export let n;
</script>

<svelte:head>
  <title>Tables {n}</title>
</svelte:head>

<Game {questions} id={tableId} />
