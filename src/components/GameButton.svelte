<script>
  import { createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";

  import { elasticOut } from "svelte/easing";

  const dispatch = createEventDispatcher();

  export let i;
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

  function spin(node, { duration, delay }) {
    return {
      delay,
      duration,
      css: t => {
        const eased = elasticOut(t);
        return `transform: scale(${eased});`;
      }
    };
  }
</script>

<style>
  button {
    background-color: var(--blue-300);
  }

  .correct {
    background-color: var(--green-500);
  }

  .wrong {
    background-color: var(--red-500);
  }
</style>

<button
  in:spin={{ duration: 1000, delay: i * 75 }}
  class:correct
  class:wrong
  on:click|preventDefault|once={handleClick}>
  <slot />
</button>
