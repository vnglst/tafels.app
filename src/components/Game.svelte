<script>
  import Card from "./Card.svelte";
  import Grid from "./Grid.svelte";
  import Page from "./Page.svelte";
  import GameButton from "./GameButton.svelte";
  import GameScore from "./GameScore.svelte";
  import GameKitten from "./GameKitten.svelte";
  import { nock, squakk, yeah } from "./soundFx";
  import { tables } from "../routes/store.js";
  import { fly, fade } from "svelte/transition";
  import Badge from "../components/BadgeIcon.svelte";

  export let table;
  export let questions;

  let total = questions.length;
  let results = new Array(total);
  let currentIdx = 0;

  $: current = questions[currentIdx];
  $: rights = results.filter(r => r === true).length;
  $: wrongs = results.filter(r => r === false).length;
  $: isDone = currentIdx === total;
  $: if (isDone) {
    tables.updateCompleted(table, rights / total);
    yeah.play();
  }

  function handleCorrect() {
    nock.play();
    setTimeout(() => {
      results[currentIdx] = true;
      currentIdx++;
    }, 500);
  }

  function handleWrong() {
    squakk.play();
    setTimeout(() => {
      results[currentIdx] = false;
      currentIdx++;
    }, 500);
  }
</script>

<style>
  .header {
    padding: 1em;
    margin: 0;
    font-variant: small-caps;
  }

  ul {
    font-family: menlo inconsolate, monospace;
    font-size: 1.25rem;
    margin: 2.5em 0 0 0;
    padding: 0;
    text-align: center;
  }
</style>

<Page>
  {#if current}
    <Card>
      <p class="header" slot="header">{`${current.q} = ?`}</p>
      <Grid>
        {#each current.options as option, index (`${current.q}-${option}-${index}`)}
          <GameButton
            expected={current.answer}
            value={option}
            on:correct={handleCorrect}
            on:wrong={handleWrong}>
            {option}
          </GameButton>
        {/each}
      </Grid>
      <div slot="footer">
        <GameScore {results} {total} {rights} size={1} />
      </div>
    </Card>
  {:else}
    <Card>
      <p class="header" slot="header">Report {rights} / {total}</p>
      <ul>
        {#each questions as question, idx}
          <li>{question.q} = {question.answer} {results[idx] ? '✅' : '❌'}</li>
        {/each}
      </ul>
      <GameScore {results} {total} {rights} size={2} showLabel={false} />
    </Card>
    <GameKitten />
  {/if}
</Page>
