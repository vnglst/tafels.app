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
  $: ({ numbers, inputs, score } = $state.context);
  $: [firstIdx, secondIdx, outcomeIdx] = inputs;
  $: [first, second, outcome] = inputs.map((idx) => numbers[idx]);

  function handleClick(index) {
    send({ type: "TOGGLE_INPUT", value: index });
  }

  onMount(() => {
    send({ type: "ADD_NUMBER", value: 5 });
  });

  const [sendFade, receiveFade] = crossfade({
    duration: (d) => Math.sqrt(d * 200),

    fallback(node) {
      const style = getComputedStyle(node);
      const transform = style.transform === "none" ? "" : style.transform;

      return {
        duration: 600,
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
    <Card progress={(numbers.length / MAX_NUMBERS) * 100}>
      <h1 slot="header" class="text-4xl my-12 font-bold text-center">
        {first?.v ?? '?'}
        x
        {second?.v ?? '?'}
        =
        {outcome?.v ?? '?'}
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
          >
            {number.v}
          </button>
        {/each}
      </div>
      <div slot="footer" class="my-8 text-center">score: {score}</div>
      {#if $state.value === 'gameover'}
        <div class="overlayer">
          <h2 class="text-4xl pb-8 font-bold text-center">Game over</h2>
          <Button pill primary on:click={() => send({ type: 'NEW_GAME' })}>
            New game
          </Button>
        </div>
      {/if}
    </Card>
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

  .overlayer {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    max-width: 40rem;
    padding: 6rem;
    border-radius: 1rem;
    background-color: white;
    box-shadow: var(--shadow-2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
