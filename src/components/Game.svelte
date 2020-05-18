<script>
  import Card from "./Card.svelte";
  import Grid from "./Grid.svelte";
  import Page from "./Page.svelte";
  import GameButton from "./GameButton.svelte";
  import GameScore from "./GameScore.svelte";
  import GameReport from "./GameReport.svelte";
  import { nock, squakk, yeah } from "./soundFx";
  import { store } from "../routes/questions-store.js";

  export let challenge;

  const DURATION = 20;

  let total = challenge.questions.length;
  let results = new Array(total);
  let currentIdx = 0;
  let showTimer = true;

  $: current = challenge.questions[currentIdx];
  $: rights = results.filter(r => r === true).length;
  $: wrongs = results.filter(r => r === false).length;
  $: flawless = wrongs === 0;
  $: passed = wrongs <= Math.round(total * 0.2); // 20% of questions correct
  $: isDone = currentIdx === total;

  $: if (isDone) {
    if (flawless) {
      store.complete({
        category: challenge.category,
        challenge: challenge.id
      });
    }

    if (passed) {
      store.unlockNext({
        category: challenge.category,
        challenge: challenge.id
      });
      yeah.play();
    }
  }

  function restart() {
    results = new Array(total);
    currentIdx = 0;
  }

  function handleCorrect() {
    nock.play();
    if (results[currentIdx] === undefined) results[currentIdx] = true;
    showTimer = false;
    setTimeout(() => {
      showTimer = true;
      currentIdx++;
    }, 200);
  }

  function handleWrong() {
    squakk.play();
    results[currentIdx] = false;
  }

  function handleTimeout() {
    squakk.play();
    results[currentIdx] = false;
    showTimer = false;
    setTimeout(() => {
      showTimer = true;
      currentIdx++;
    }, 200);
  }
</script>

<Page>
  {#if current}
    <Card duration={DURATION} onTimeout={handleTimeout} {showTimer}>
      <h1 slot="header">{`${current.q} = ?`}</h1>
      <Grid>
        {#each current.options as option, index (`${current.q}-${option}-${index}`)}
          <GameButton
            i={index}
            expected={current.answer}
            value={option}
            on:correct={handleCorrect}
            on:wrong={handleWrong}
          >
            {option}
          </GameButton>
        {/each}
      </Grid>
      <div slot="footer">
        <GameScore {results} />
      </div>
    </Card>
  {:else}
    <GameReport {challenge} {results} {restart} {passed} {flawless} />
  {/if}
</Page>

<style>
  h1 {
    font-size: 28px;
    margin: 0;
    padding: 4rem 0 0 0;
  }
</style>
