<script>
  import { tables8 } from "./questions";
  import Game from "../components/Game.svelte";
  let questions = process.browser ? tables8 : [];
</script>

<svelte:head>
  <title>Tables 8</title>
</svelte:head>

<Game {questions} table={8} />
