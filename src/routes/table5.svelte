<script>
  import { tables5 } from "./questions";
  import Game from "../components/Game.svelte";
  let questions = process.browser ? tables5 : [];
</script>

<svelte:head>
  <title>Tables 5</title>
</svelte:head>

<Game {questions} table={5} />
