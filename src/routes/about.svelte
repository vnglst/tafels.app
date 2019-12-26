<script>
  import Button from "../components/Button.svelte";
  import { tables } from "../routes/store.js";
  import { fly, fade } from "svelte/transition";
</script>

<style>
  .anim {
    position: absolute;
  }
</style>

<svelte:head>
  <title>About Tafels</title>
</svelte:head>

<div
  class="anim"
  in:fly={{ x: 200, duration: 150 }}
  out:fly={{ x: 200, duration: 150 }}>
  <h1>Tafels</h1>

  <p>Tafels.app was made by Koen van Gilst using Sapper and Svelte</p>

  <button
    on:click={() => {
      tables.reset();
      alert('ok');
    }}>
    Reset
  </button>
</div>
