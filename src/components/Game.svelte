<script>
  import Button from "../components/Button.svelte";
  import { fade } from "svelte/transition";
  import { onMount, afterUpdate } from "svelte";
  import { nock, squakk, yeah } from "./soundFx";

  export let questions;

  let score = 0;
  let total = questions.length;
  let current = questions.shift();
  let wrongs = [];

  function handleCorrect() {
    score++;
    nock.play();

    setTimeout(() => {
      current = questions.shift();
      questions = questions;
      if (!current) yeah.play();
    }, 700);
  }

  function handleWrong() {
    if (score > 0) score--;
    squakk.play();
    wrongs.push(current);
  }
</script>

<style>
  .container {
    display: grid;
    grid-template-columns: repeat(3, 4.5em);
    grid-template-rows: repeat(3, 4.5em);
    grid-gap: 1em;
  }
</style>

<p>Score {score}</p>

{#if current}
  <h1>{current.q} = ?</h1>

  <div class="container">
    {#each current.options as option, index (`${current.q}-${option}-${index}`)}
      <Button
        expected={current.answer}
        value={option}
        on:correct={handleCorrect}
        on:wrong={handleWrong} />
    {/each}
  </div>
{:else}
  <div class="container">
    <button>Home</button>
  </div>
{/if}
