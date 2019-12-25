<script>
  import { tables10 } from "./questions";
  import TableTemplate from "../components/Game.svelte";
  let questions = process.browser ? tables10 : [];
</script>

<svelte:head>
  <title>Tables 10</title>
</svelte:head>

<TableTemplate {questions} />
