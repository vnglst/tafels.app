<script>
  import Page from "../components/Page.svelte";
  import Card from "../components/Card.svelte";
  import { store } from "./store.js";
</script>

<style>
  div {
    margin: 5rem;
  }
  button {
    width: 15rem;
    height: 3rem;
    background-color: inherit;
  }
</style>

<svelte:head>
  <title>About Tafels</title>
</svelte:head>

<Page>
  <div>
    <h1>About</h1>
    <p>Tafels.app was made by Koen van Gilst using Sapper and Svelte.</p>
    <button
      on:click={() => {
        const sure = confirm('Cannot be undone, are you sure?');
        if (sure) {
          store.reset();
          localStorage.clear();
        }
      }}>
      Reset game state
    </button>
  </div>
</Page>
