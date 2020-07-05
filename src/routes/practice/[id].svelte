<script context="module">
  import Game from "../../components/Game.svelte";
  export async function preload(page) {
    const { id } = page.params;
    if (!id) return this.error(404, "Not found");
    return { id };
  }
</script>

<script>
  import { store } from "../practice-store";
  export let id = "loading";

  const challenge = {
    id,
    title: "Practice",
    category: "practice",
    slug: "practice",
    questions: $store[id],
  };
</script>

<svelte:head>
  <title>tafels.app - tafels.app</title>
</svelte:head>

<Game {challenge} />
