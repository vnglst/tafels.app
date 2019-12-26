<script>
  import { tables10 } from "./questions";
  import Game from "../components/Game.svelte";
  let questions = process.browser ? tables10 : [];
</script>

<svelte:head>
  <title>Tables 10</title>
</svelte:head>

<Game {questions} table={10} />
