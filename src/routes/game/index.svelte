<script>
  import { quintOut } from "svelte/easing";
  import { crossfade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { useMachine } from "@xstate/svelte";

  import Page from "../../ui/Page.svelte";
  import Card from "../../ui/Card.svelte";
  import Button from "../../ui/Button.svelte";

  import { gameMachine, MAX_NUMBERS } from "./machine";
  import { onMount } from "svelte";

  const { state, send } = useMachine(gameMachine);

  // $: console.log($state.value, $state.context, $state.event);
  $: ({ numbers, inputs, score, highscore } = $state.context);
  $: [firstIdx, secondIdx, outcomeIdx] = inputs;
  $: [first, second, outcome] = inputs.map((idx) => numbers[idx]);

  function handleClick(index) {
    send({ type: "TOGGLE_INPUT", value: index });
  }

  onMount(() => {
    send({ type: "LOAD_HIGHSCORE" });
    send({ type: "ADD_NUMBER" });
  });

  const [sendFade, receiveFade] = crossfade({
    duration: (d) => Math.sqrt(d * 150),
    fallback(node) {
      const style = getComputedStyle(node);
      const transform = style.transform === "none" ? "" : style.transform;
      return {
        duration: 200,
        easing: quintOut,
        css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
      };
    },
  });
</script>

<Page>
  <div class="container">
    {#if $state.value === "gameover"}
      <Card>
        <h1 class="my-10" slot="header">GAME OVER</h1>
        <div class="my-auto text-center text-xl">
          You scored <br />
          {score} points
        </div>
        {#if score > highscore}
          <div class="my-auto text-center text-xl">🎉 New highscore! 🎉</div>
        {/if}
        <div class="flex justify-center p-8 mb-4 w-full" slot="footer">
          <Button
            pill
            primary
            animate
            delay={100}
            on:click={() => send({ type: "NEW_GAME" })}
          >
            New game
          </Button>
        </div>
      </Card>
    {:else}
      <Card progress={(numbers.length / MAX_NUMBERS) * 100}>
        <h1 slot="header" class="text-4xl my-12 font-bold text-center">
          {first?.v ?? "?"}
          x
          {second?.v ?? "?"}
          =
          {outcome?.v ?? "?"}
        </h1>
        <div class="field">
          {#each numbers as number, i (number.id)}
            <button
              in:receiveFade={{ key: i }}
              out:sendFade={{ key: i }}
              animate:flip
              class:blue={firstIdx === i}
              class:green={secondIdx === i}
              class:orange={outcomeIdx == i}
              on:click={() => handleClick(i)}
              on:touchstart={(e) => {
                e.preventDefault();
                handleClick(i);
              }}
            >
              {number.v}
            </button>
          {/each}
        </div>
        <div
          slot="footer"
          class="mt-10 mb-6 px-10 text-xs w-full flex justify-between"
        >
          <span>score: {score}</span>
          <span>highscore: {highscore}</span>
        </div>
      </Card>
    {/if}
  </div>
</Page>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .field {
    height: 100%;
    display: flex;
    flex-wrap: wrap-reverse;
    align-content: flex-start;
    justify-content: center;
    gap: 1rem;
    min-height: 23rem;
  }

  button {
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
    text-decoration: none;
    border-radius: 1rem;
    font-weight: 500;
    font-size: 20px;
    box-shadow: var(--shadow-2);
    background-color: var(--grey-100);
    color: var(--grey-900);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s cubic-bezier(0, 1.2, 0.2, 1.5);
    outline: none;
    width: 4rem;
    height: 4rem;
  }

  button:hover:not([disabled]) {
    transform: scale(1.15);
  }

  button:active:not([disabled]) {
    transform: scale(1.15);
  }

  .blue {
    background-color: var(--blue-100);
  }

  .green {
    background-color: var(--green-100);
  }

  .orange {
    background-color: var(--orange-100);
  }
</style>
