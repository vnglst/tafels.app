<script context="module">
  import Game from "../../components/Game.svelte";
  import { getTableQuestions } from "./tableQuestions";
  import { getTableId, getTable } from "../categories";

  export async function preload(page) {
    const { n } = page.params;
    const tableId = getTableId(n);
    if (!tableId) return this.error(404, "Not found");
    const questions = getTableQuestions(n);
    const table = getTable(tableId);
    return { questions, tableId, n, table };
  }
</script>

<script>
  export let questions;
  export let tableId;
  export let n;
  export let table;
</script>

<svelte:head>
  <title>Tables {n}</title>
</svelte:head>

<Game {questions} id={tableId} unlocks={table.unlocks} />
