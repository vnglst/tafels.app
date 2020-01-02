<script>
  import Card from "./Card.svelte";
  import Grid from "./Grid.svelte";
  import Page from "./Page.svelte";
  import GameButton from "./GameButton.svelte";
  import GameScore from "./GameScore.svelte";
  import { nock, squakk, yeah } from "./soundFx";
  import { store, tables } from "../routes/store.js";

  export let id;
  export let questions;

  let total = questions.length;
  let results = new Array(total);
  let currentIdx = 0;

  $: current = questions[currentIdx];
  $: rights = results.filter(r => r === true).length;
  $: wrongs = results.filter(r => r === false).length;
  $: isDone = currentIdx === total;
  $: if (isDone) {
    store.updateCompleted(id, rights / total);
    yeah.play();
  }

  function handleCorrect() {
    nock.play();
    if (results[currentIdx] === undefined) results[currentIdx] = true;
    setTimeout(() => {
      currentIdx++;
    }, 500);
  }

  function handleWrong() {
    squakk.play();
    results[currentIdx] = false;
  }
</script>

<style>
  p {
    font-size: 38px;
    padding: 0;
    margin: 0;
  }

  ul {
    margin: 2.5em 0 0 0;
    padding: 0;
    text-align: center;
  }
</style>

<Page>
  {#if current}
    <Card>
      <p slot="header">{`${current.q} = ?`}</p>
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
        <GameScore {results} {total} {rights} />
      </div>
    </Card>
  {:else}
    <Card>
      <p slot="header">RAPPORT</p>
      <ul>
        {#each questions as question, idx}
          <li>{question.q} = {question.answer} {results[idx] ? '✅' : '❌'}</li>
        {/each}
      </ul>
    </Card>
  {/if}
</Page>
