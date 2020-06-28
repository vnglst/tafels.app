<script lang="typescript">
  import Card from "../ui/Card.svelte";
  import IconCorrect from "../ui/IconCorrect.svelte";
  import IconWrong from "../ui/IconWrong.svelte";
  import Button from "../ui/Button.svelte";

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
    <Button
      on:click={restart}
      primary
      pill
      href={`/${slug}/${id}`}
      elementType="link"
    >
      {flawless ? 'Again' : 'Try again'}
    </Button>
    {#if passed && unlocks}
      <Button
        on:click={restart}
        success
        pill
        animate
        delay={100}
        href={`/${slug}/${unlocks}`}
        elementType="link"
      >
        Next
      </Button>
    {:else}
      <Button on:click={restart} success pill href={`/`} elementType="link">
        Overview
      </Button>
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

  h1 {
    font-size: 28px;
  }
</style>
