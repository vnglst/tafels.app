<script>
  import { tables4 } from "./questions";
  import Game from "../components/Game.svelte";
  let questions = process.browser ? tables4 : [];
</script>

<svelte:head>
  <title>Tables 4</title>
</svelte:head>

<Game {questions} table={4} />
