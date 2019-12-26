<script>
  import { tables6 } from "./questions";
  import Game from "../components/Game.svelte";
  let questions = process.browser ? tables6 : [];
</script>

<svelte:head>
  <title>Tables 6</title>
</svelte:head>

<Game {questions} table={6} />
