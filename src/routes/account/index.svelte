<script lang="ts">
  import type { Question } from "../../types";
  import Page from "../../ui/Page.svelte";
  import Card from "../../ui/Card.svelte";
  import { practiceStore } from "../practice-store";
  import { accountStore } from "../account-store";

  let stats: Question[];
  $: stats = $practiceStore.today
    .concat($practiceStore.someday)
    .sort((q1, q2) => q2.mistakes - q1.mistakes);
</script>

<svelte:head>
  <title>Account - tafels.app</title>
</svelte:head>

<Page>
  <Card>
    <img
      class="object-contain w-full pb-8"
      src={`.netlify/functions/bigheads/?seed=${$accountStore.name}`}
      alt={$accountStore.name}
    />
    <div slot="footer" class="m-8">
      <label
        class="block text-gray-700 text-lg font-bold mb-2 center"
        for="name"
      >
        Your name
      </label>
      <input
        id="name"
        type="text"
        class="text-2xl p-4 font-bold text-center bg-white focus:outline-none
        focus:shadow-outline border border-gray-300 py-2 px-4 block w-full
        appearance-none leading-normal rounded-full"
        bind:value={$accountStore.name}
      />
    </div>
  </Card>
  <Card>
    <div class="overflow-y-auto stats p-8 m-4">
      <table class="table-fixed w-full">
        <thead>
          <tr>
            <th class="text-left w-1/2 p-4">Question</th>
            <th class="text-right w-1/4 p-4">Mistakes</th>
          </tr>
        </thead>
        {#each stats as question, i}
          <tr class={i % 2 ? "bg-gray-100" : ""}>
            <td class="p-4 text-left">
              <pre>{question.q} = {question.answer}</pre>
            </td>
            <td class="p-4 text-right">{question.mistakes}</td>
          </tr>
        {/each}
      </table>
    </div>
  </Card>
  <Card>
    <h2 slot="header" class="m-8 text-4xl">About</h2>
    <div class="p-10 text-lg text-center">
      <p>
        Tafels.app was created by
        <a href="https://koenvangilst.nl">Koen van Gilst</a>
        using Sapper and Svelte.
      </p>
      <p class="mt-2">
        The avatars are from
        <a href="https://bigheads.io" target="_blank">bigheads.io</a>
        made by
        <a href="https://twitter.com/robertbrosma">@robertbrosma</a>
      </p>
      <div class="m-12">
        <a href="https://www.buymeacoffee.com/vnglst" target="_blank">
          <img
            src="https://cdn.buymeacoffee.com/buttons/default-green.png"
            alt="Buy Me A Coffee"
          />
        </a>
      </div>

      <p class="my-4">🚧 Work in Progress 🚧</p>
      <p>
        <a href="https://github.com/vnglst/tafels.app">Source code on Github</a>
      </p>
    </div>
    <div slot="footer" class="p-5 text-center bg-red-100 rounded-b-lg">
      <button
        on:click={(e) => {
          const sure = confirm("Cannot be undone, are you sure?");
          if (sure) {
            localStorage.clear();
            window.location.reload();
          } else {
            e.preventDefault();
          }
        }}
      >
        Reset progress
      </button>
    </div>
  </Card>
</Page>

<style>
  .stats {
    max-height: 40rem;
  }
</style>
