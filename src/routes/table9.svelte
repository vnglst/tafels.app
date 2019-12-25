<script>
  import { tables9 } from "./questions";
  import TableTemplate from "../components/Game.svelte";
  let questions = process.browser ? tables9 : [];
</script>

<svelte:head>
  <title>Tables 9</title>
</svelte:head>

<TableTemplate {questions} />
