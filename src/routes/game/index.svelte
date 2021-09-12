<script>
  import Button from "../../ui/Button.svelte";
  import Page from "../../ui/Page.svelte";

  import { useMachine, useSelector } from "@xstate/svelte";

  import { gameMachine, resultSelector } from "./machine";

  const { state, send, service } = useMachine(gameMachine);
  const result = useSelector(service, resultSelector);

  $: console.log($state.value, $state.context, $state.event);
  $: ({ numbers, inputs, score } = $state.context);

  function handleClick(index) {
    send({ type: "TOGGLE_INPUT", index });
  }

</script>

<Page>
  <div class="container">
    <h1 class="text-4xl m-5 p-0 mt-16 font-bold text-center">
      {numbers[inputs[0]] ?? '?'}
      x
      {numbers[inputs[1]] ?? '?'}
      =
      {$result ?? '?'}
    </h1>

    <span class="m-4 text-center">{$state.value} / {score}</span>

    <div class="grid">
      {#each numbers as number, i}
        <Button
          animate
          delay={1}
          primary={inputs[0] === i}
          success={inputs[1] === i}
          danger={inputs[2] == i || inputs[3] === i}
          on:click={() => handleClick(i)}
        >
          {number}
        </Button>
      {/each}
    </div>
  </div>
</Page>

<style>
  .container {
    display: flex;
    flex-direction: column;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(5, 5rem);
    grid-auto-rows: 5rem;
    grid-gap: 2rem;
    margin: 2rem auto;
    min-height: 50vh;
  }

</style>
