<script lang="ts">
  import IconWrong from "../../ui/IconWrong.svelte";
  import Page from "../../ui/Page.svelte";
  import Card from "../../ui/Card.svelte";
  import Button from "../../ui/Button.svelte";
  import { store } from "../questions-store.js";
  import { practiceStore } from "../practice-store";
  import { accountStore } from "../account-store";
</script>

<svelte:head>
  <title>Account - tafels.app</title>
</svelte:head>

<Page>
  <Card>
    <h1 slot="header">Account</h1>
    <div class="img">
      <img
        src={`https://bigheads.io/svg?seed=${$accountStore.name}`}
        alt="user"
        height="300"
        width="300"
      />
    </div>
    <input slot="footer" bind:value={$accountStore.name} />
  </Card>
  <Card>
    <h2 slot="header">Stats</h2>
    <div>
      <table>
        <tr>
          <th>Question</th>
          <th>Mistakes</th>
          <th>Interval</th>
        </tr>
        {#each $practiceStore.today as question}
          <tr>
            <td>
              <pre>{question.q}</pre>
            </td>
            <td>{question.mistakes}</td>
            <td>{question.interval}</td>
          </tr>
        {/each}
      </table>
    </div>
  </Card>
  <Card>
    <h2 slot="header">About</h2>
    <div>
      <p>
        Tafels.app was created by
        <a href="https://koenvangilst.nl">Koen van Gilst</a>
        using Sapper and Svelte.
      </p>
      <div>
        <a href="https://www.buymeacoffee.com/vnglst" target="_blank">
          <img
            src="https://cdn.buymeacoffee.com/buttons/default-green.png"
            alt="Buy Me A Coffee"
            style="height: 51px !important;width: 217px !important;"
          />
        </a>
      </div>

    </div>

    <div class="footer" slot="footer">
      <p>🚧 Work in Progress 🚧</p>
      <a href="https://github.com/vnglst/tafels.app">Source code on Github</a>
      <div>
        <a
          href="/"
          on:click={(e) => {
            const sure = confirm('Cannot be undone, are you sure?');
            if (sure) {
              store.reset();
              practiceStore.reset();
              localStorage.clear();
            } else {
              e.preventDefault();
            }
          }}
        >
          Reset progress
        </a>
      </div>
    </div>
  </Card>
</Page>

<style>
  .footer {
    margin-top: 4em;
  }
  table {
    width: 100%;
  }

  td {
    padding: 0;
    margin: 0;
    text-align: center;
  }

  input {
    text-align: center;
    font-weight: 400;
    font-size: 28px;
    margin: 1em;
    padding: 0.5em;
    width: 24rem;
    border-radius: 1em;
    border: 1px solid var(--grey-100);
  }

  input:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--blue-100);
  }

  .img {
    flex-direction: row;
  }

  h1,
  h2 {
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
</style>
