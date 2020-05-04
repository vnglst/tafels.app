<script context="module">
  import Game from "../../components/Game.svelte";
  import { getAddQuestions } from "./addQuestions";
  import { getAddId, getAdd } from "../categories";

  export async function preload(page) {
    const { n } = page.params;
    const addId = getAddId(n);
    if (!addId) return this.error(404, "Not found");
    let questions = getAddQuestions(n);
    let add = getAdd(addId);
    return { questions, addId, n, add };
  }
</script>

<script>
  export let questions;
  export let addId;
  export let n;
  export let add;
</script>

<svelte:head>
  <title>Additions {n}</title>
</svelte:head>

<Game {questions} id={addId} unlocks={add.unlocks} />
