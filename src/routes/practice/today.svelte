<script>
  import Game from "../../components/Game.svelte";
  import { practiceStore } from "../practice-store";

  const challenge = {
    id: "today",
    title: "Practice",
    category: "practice",
    slug: "practice",
    questions: $practiceStore.today,
  };
</script>

<svelte:head>
  <title>Practice today's questions - tafels.app</title>
</svelte:head>

<Game
  {challenge}
  onCorrect={practiceStore.practiced}
  onWrong={practiceStore.add}
/>
