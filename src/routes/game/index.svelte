<script>
  import Button from "../../ui/Button.svelte";
  import Page from "../../ui/Page.svelte";
  import Card from "../../ui/Card.svelte";

  import { useMachine } from "@xstate/svelte";

  import { gameMachine, MAX_NUMBERS } from "./machine";

  const { state, send, service } = useMachine(gameMachine);

  // $: console.log($state.value, $state.context, $state.event);
  $: ({ numbers, inputs, score } = $state.context);
  $: [first, second, outcome] = inputs;

  function handleClick(index) {
    send({ type: "TOGGLE_INPUT", value: index });
  }

</script>

<Page>
  <div class="container">
    <Card progress={(numbers.length / MAX_NUMBERS) * 100}>
      <h2 slot="header" class="text-4xl my-12 font-bold text-center">
        {numbers[first] ?? '?'}
        x
        {numbers[second] ?? '?'}
        =
        {numbers[outcome] ?? '?'}
      </h2>
      <div class="grid">
        {#each numbers as number, i}
          <Button
            animate
            blue={first === i}
            green={second === i}
            orange={outcome == i}
            on:click={() => handleClick(i)}
          >
            {number}
          </Button>
        {/each}
      </div>
      <div slot="footer" class="my-8 text-center">{$state.value} / {score}</div>
    </Card>
  </div>
</Page>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .grid {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(5, 4rem);
    grid-auto-rows: 4rem;
    grid-gap: 1rem;
    width: 100%;
  }

</style>
