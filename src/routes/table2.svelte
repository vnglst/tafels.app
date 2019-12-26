<script>
  import { tables2 } from "./questions";
  import Game from "../components/Game.svelte";
  let questions = process.browser ? tables2 : [];
</script>

<svelte:head>
  <title>Tables 2</title>
</svelte:head>

<Game {questions} table={2} />
