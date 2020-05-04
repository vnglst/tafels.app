<script>
  import Card from "./Card.svelte";
  import IconCorrect from "./IconCorrect.svelte";
  import IconWrong from "./IconWrong.svelte";

  export let id;
  export let questions;
  export let results;
  export let unlocks;
  export let wrongs;
  export let restart;
</script>

<style>
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
  }

  .again {
    background-color: var(--green-100);
  }

  h1 {
    font-size: 28px;
  }
</style>

<Card>
  <h1 slot="header">REPORT CARD</h1>
  {#if wrongs === 0}
    <p>Flawless! 🎉</p>
  {:else}
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
    <a
      on:click={restart}
      class="button link again"
      href={`/${id.replace('-', '/')}`}>
      Try again
    </a>
    {#if wrongs === 0}
      <a
        on:click={restart}
        class="button link"
        href={`/${unlocks.replace('-', '/')}`}>
        Next
      </a>
    {/if}
  </div>
</Card>
