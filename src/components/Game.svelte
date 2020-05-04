<script>
  import Card from "./Card.svelte";
  import Grid from "./Grid.svelte";
  import Page from "./Page.svelte";
  import GameButton from "./GameButton.svelte";
  import GameScore from "./GameScore.svelte";
  import GameReport from "./GameReport.svelte";

  import { nock, squakk, yeah } from "./soundFx";
  import { store } from "../routes/store.js";

  export let id;
  export let questions;
  export let unlocks;

  let total = questions.length;
  let results = new Array(total);
  let currentIdx = 0;

  $: current = questions[currentIdx];
  $: rights = results.filter(r => r === true).length;
  $: wrongs = results.filter(r => r === false).length;
  $: isDone = currentIdx === total;
  $: if (isDone) {
    if (wrongs === 0) store.complete(id);
    yeah.play();
  }

  function restart() {
    results = new Array(total);
    currentIdx = 0;
  }

  function handleCorrect() {
    nock.play();
    if (results[currentIdx] === undefined) results[currentIdx] = true;
    setTimeout(() => {
      currentIdx++;
    }, 200);
  }

  function handleWrong() {
    squakk.play();
    results[currentIdx] = false;
  }
</script>

<style>
  h1 {
    font-size: 28px;
    padding: 0;
    margin: 0;
  }
</style>

<Page>
  {#if current}
    <Card>
      <h1 slot="header">{`${current.q} = ?`}</h1>
      <Grid>
        {#each current.options as option, index (`${current.q}-${option}-${index}`)}
          <GameButton
            i={index}
            expected={current.answer}
            value={option}
            on:correct={handleCorrect}
            on:wrong={handleWrong}>
            {option}
          </GameButton>
        {/each}
      </Grid>
      <div slot="footer">
        <GameScore {results} />
      </div>
    </Card>
  {:else}
    <GameReport {questions} {results} {unlocks} {restart} {id} {wrongs} />
  {/if}
</Page>
