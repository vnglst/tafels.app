<script>
  import Page from "../components/Page.svelte";
  import Card from "../components/Card.svelte";
  import { tables } from "./store.js";
</script>

<style>
  h1 {
    font-size: 2rem;
    padding: 1.5rem;
  }
  div {
    padding: 1rem 2rem;
    margin-bottom: 1rem;
  }

  p {
    margin: 0 0 2rem 0;
    font-size: 1.25rem;
    line-height: 2;
  }

  button {
    background-color: hsla(0, 100%, 100%, 0.5);
  }
</style>

<svelte:head>
  <title>About Tafels</title>
</svelte:head>

<Page>
  <Card>
    <h1 slot="header">About</h1>
    <div>
      <p>Tafels.app was made by Koen van Gilst using Sapper and Svelte.</p>
      <button
        on:click={() => {
          const sure = confirm('Cannot be undone, are you sure?');
          if (sure) tables.reset();
        }}>
        Reset game state
      </button>
    </div>
  </Card>
</Page>
