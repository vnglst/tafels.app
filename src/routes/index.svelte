<script>
  import Button from "../components/Button.svelte";
  import { fade } from "svelte/transition";
  import { onMount, afterUpdate } from "svelte";
  import { nock, squakk } from "./soundFx";
  import { game } from "./store";

  game.useLocalStorage();

  function handleClick({ detail }) {
    const { value, id } = detail;
    if (value === $game.expected) {
      nock.play();
      game.correct(id);
      setTimeout(() => {
        game.reset();
      }, 500);
    } else {
      game.wrong(id);
      squakk.play();
    }
  }
</script>

<style>
  .container {
    display: grid;
    grid-template-columns: repeat(3, 5em);
    grid-template-rows: repeat(3, 5em);
    grid-gap: 1em;
  }
</style>

<svelte:head>
  <title>Tables App</title>
</svelte:head>

{#if process.browser}
  <p>Score {$game.score}</p>

  <h1>{$game.n1} x {$game.n2} = ?</h1>

  <div class="container">
    {#each $game.choices as choice, index (choice)}
      <Button
        correct={$game.grid[index] === 'correct'}
        wrong={$game.grid[index] === 'wrong'}
        id={index}
        value={choice}
        on:click={handleClick} />
    {/each}
  </div>
{/if}
