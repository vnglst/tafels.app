<script>
  import Card from "./Card.svelte";
  import IconCorrect from "./IconCorrect.svelte";
  import IconWrong from "./IconWrong.svelte";

  export let results;
  export let restart;
  export let flawless = false;
  export let passed = false;
  export let challenge;

  const { slug, id, questions, unlocks } = challenge;
</script>

<Card>
  <h1 slot="header">REPORT CARD</h1>
  {#if flawless}
    <p>Flawless! 🎉</p>
  {:else}
    {#if passed}
      <p>Passed! 🚀</p>
    {/if}
    <ul>
      {#each questions as question, idx}
        {#if !results[idx]}
          <li>
            {question.q} = {question.answer}
            <span>
              <IconWrong />
            </span>
          </li>
        {/if}
      {/each}
    </ul>
  {/if}
  <div class="call-to-actions">
    <a on:click={restart} class="button link again" href={`/${slug}/${id}`}>
      Try again
    </a>
    {#if passed && unlocks}
      <a on:click={restart} class="button link" href={`/${slug}/${unlocks}`}>
        Next
      </a>
    {:else if flawless && !unlocks}
      <a class="button link" href="/">Overview</a>
    {/if}
  </div>
</Card>

<style>
  h1 {
    margin-top: 4rem;
  }
  ul {
    font-size: 18px;
    margin: 1em 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  li {
    display: flex;
    align-items: center;
  }

  span {
    line-height: 1em;
    padding-left: 1em;
    padding: 0.5em;
  }

  p {
    font-size: 24px;
    text-align: center;
  }

  .call-to-actions {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 2em 0;
  }

  .link {
    background-color: var(--blue-100);
    font-size: 20px;
    width: max-content;
    padding: 0.5em 1em;
    min-width: 6em;
  }

  .again {
    background-color: var(--green-100);
  }

  h1 {
    font-size: 28px;
  }
</style>
