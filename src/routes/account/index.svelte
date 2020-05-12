<script>
  import Page from "../../components/Page.svelte";
  import Card from "../../components/Card.svelte";
  import Grid from "../../components/Grid.svelte";
  import { store } from "../questions-store.js";

  console.log(JSON.stringify($store, null, 4));
</script>

<svelte:head>
  <title>About Tafels</title>
</svelte:head>

<Page>
  <Card>
    <h1 slot="header">About</h1>
    <div>
      <p>
        Tafels.app was created by
        <a href="https://koenvangilst.nl">Koen van Gilst</a>
        using Sapper and Svelte.
      </p>
      <p>🚧 Work in Progress 🚧</p>
      <a href="https://github.com/vnglst/tafels.app">Source code on Github</a>
    </div>

    <button
      slot="footer"
      on:click={() => {
        const sure = confirm('Cannot be undone, are you sure?');
        if (sure) {
          store.reset();
          localStorage.clear();
        }
      }}
    >
      Reset progress
    </button>
  </Card>
</Page>

<style>
  h1 {
    margin: 0;
    padding: 4rem 0 0 0;
    font-weight: 400;
    font-size: 28px;
    text-transform: uppercase;
  }

  div {
    margin: 1rem 2rem;
    text-align: center;
  }

  p {
    font-size: 18px;
  }

  button {
    margin: 0 auto;
    width: 15rem;
    height: 3rem;
    background-color: var(--red-500);
  }
</style>
