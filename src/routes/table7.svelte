<script>
  import { tables7 } from "./questions";
  import Game from "../components/Game.svelte";
  let questions = process.browser ? tables7 : [];
</script>

<svelte:head>
  <title>Tables 7</title>
</svelte:head>

<Game {questions} table={7} />
