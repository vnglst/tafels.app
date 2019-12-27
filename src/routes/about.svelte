<script>
  import { tables } from "../routes/store.js";
  import { fly, fade } from "svelte/transition";
</script>

<style>
  .anim {
    position: absolute;
  }

  .container {
    margin: 2em;
  }

  button {
    font-weight: 900;
    font-size: 1em;
    border-radius: 0.5em;
    text-shadow: 0 2px 0 rgba(0, 0, 0, 0.07);
    border: 1px solid #011627;
    background-color: hsl(0, 83%, 47%);
    color: #011627;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
    text-decoration: none;
    padding: 1em;
    text-transform: uppercase;
  }
</style>

<svelte:head>
  <title>About Tafels</title>
</svelte:head>

<div
  class="anim"
  in:fly={{ x: 200, duration: 150 }}
  out:fly={{ x: 200, duration: 150 }}>
  <div class="container">
    <h1>Tafels</h1>

    <p>Tafels.app was made by Koen van Gilst using Sapper and Svelte.</p>

    <button
      on:click={() => {
        tables.reset();
        alert('ok');
      }}>
      Reset game state
    </button>
  </div>
</div>
