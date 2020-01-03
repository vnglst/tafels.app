<script context="module">
  import Game from "../../components/Game.svelte";
  import { getAdditions } from "./addQuestions";
  import { getAddId } from "../categories";

  export async function preload(page) {
    const { n } = page.params;
    const addId = getAddId(n);
    if (!addId) return this.error(404, "Not found");
    let questions = getAdditions(n);
    return { questions, addId, n };
  }
</script>

<script>
  export let questions;
  export let addId;
  export let n;
</script>

<svelte:head>
  <title>Additions {n}</title>
</svelte:head>

<Game {questions} id={addId} />
