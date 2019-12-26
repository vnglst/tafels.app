<script>
  import { tables1 } from "./questions";
  import Game from "../components/Game.svelte";
  let questions = process.browser ? tables1 : [];
</script>

<svelte:head>
  <title>Tables 1</title>
</svelte:head>

<Game {questions} table={1} />
