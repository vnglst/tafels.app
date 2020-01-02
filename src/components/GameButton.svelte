<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let value;
  export let expected;

  let wrong = false;
  let correct = false;

  function handleClick() {
    if (value === expected) {
      correct = true;
      dispatch("correct");
    } else {
      wrong = true;
      dispatch("wrong");
    }
  }
</script>

<style>
  button {
    background-color: var(--blue-400);
  }

  .correct {
    background-color: var(--green-500);
  }

  .wrong {
    background-color: var(--red-500);
  }
</style>

<button class:correct class:wrong on:click|preventDefault|once={handleClick}>
  <slot />
</button>
