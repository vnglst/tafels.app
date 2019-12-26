<script>
  import Button from "./Button.svelte";
  import { nock, squakk, yeah } from "./soundFx";
  import { tables } from "../routes/store.js";

  export let table;
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
      tables.updateCompleted(table, score / 10);
      if (!current) {
        yeah.play();
        yeah.on("end", function() {
          window.location.assign("/");
        });
      }
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

  .smile {
    font-size: 12rem;
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
  <div class="smile">😸</div>
{/if}
