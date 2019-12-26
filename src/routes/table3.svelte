<script>
  import { tables3 } from "./questions";
  import Game from "../components/Game.svelte";
  let questions = process.browser ? tables3 : [];
</script>

<svelte:head>
  <title>Tables 3</title>
</svelte:head>

<Game {questions} table={3} />
