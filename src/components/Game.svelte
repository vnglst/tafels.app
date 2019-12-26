<script>
  import Button from "./Button.svelte";
  import { nock, squakk, yeah } from "./soundFx";
  import { tables } from "../routes/store.js";
  import { fly, fade } from "svelte/transition";
  import Badge from "../components/BadgeIcon.svelte";

  export let table;
  export let questions;

  let score = 0;
  let total = questions.length;
  let badges = new Array(total);
  let current = questions.shift();
  let wrongs = [];

  function handleCorrect() {
    score++;
    nock.play();

    setTimeout(() => {
      current = questions.shift();
      questions = questions;
      tables.updateCompleted(table, score / 10);
      if (!current) {
        yeah.play();
        yeah.on("end", function() {
          window.location.assign("/");
        });
      }
    }, 700);
  }

  function handleWrong() {
    if (score > 0) score--;
    squakk.play();
    wrongs.push(current);
  }
</script>

<style>
  .anim {
    position: absolute;
  }
  .container {
    margin: 2em 0;
    display: grid;
    grid-template-columns: repeat(3, 4.5em);
    grid-template-rows: repeat(3, 4.5em);
    grid-gap: 1em;
  }

  p {
    font-size: 1rem;
    margin: 0;
    padding: 0.5em;
  }

  h1 {
    font-size: 3rem;
  }

  ul {
    display: inline-block;
    padding: 0;
    margin: 0;
  }

  li {
    display: block;
    float: left;
    margin: 0;
    padding: 0;
    height: 1.5em;
    width: 1.5em;
  }

  .smile {
    font-size: 12rem;
  }
</style>

<div
  class="anim"
  in:fly={{ x: 200, duration: 150 }}
  out:fly={{ x: 200, duration: 150 }}>
  {#if current}
    <h1>{current.q} = ?</h1>
    <div class="container">
      {#each current.options as option, index (`${current.q}-${option}-${index}`)}
        <Button
          expected={current.answer}
          value={option}
          on:correct={handleCorrect}
          on:wrong={handleWrong} />
      {/each}
    </div>
    <p>{score} / {total}</p>
    <ul>
      {#each badges as badge, index}
        <li>
          <Badge
            id={index}
            completed={index < score ? 1 : 0.3}
            passed={index < score ? true : false} />
        </li>
      {/each}
    </ul>
  {:else}
    <div class="smile">😸</div>
  {/if}
</div>
