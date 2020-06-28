<script lang="typescript">
  import Page from "../../ui/Page.svelte";
  import Card from "../../ui/Card.svelte";
  import Grid from "../../ui/Grid.svelte";
  import Button from "../../ui/Button.svelte";
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

    <span>
      <Button
        danger
        pill
        on:click={() => {
          const sure = confirm('Cannot be undone, are you sure?');
          if (sure) {
            store.reset();
            localStorage.clear();
          }
        }}
      >
        Reset progress
      </Button>
    </span>
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
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  p {
    font-size: 18px;
  }

  span {
    margin: auto;
  }
</style>
