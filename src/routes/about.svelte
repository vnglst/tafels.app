<script>
  import Button from "../components/Button.svelte";
  import { tables } from "../routes/store.js";
</script>

<svelte:head>
  <title>About Tafels.App</title>
</svelte:head>

<h1>Tafels</h1>

<p>Tafels.app was made by Koen van Gilst using Sapper and Svelte</p>

<button
  on:click={() => {
    tables.reset();
    alert('ok');
  }}>
  Reset
</button>
