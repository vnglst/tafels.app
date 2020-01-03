<script>
  import { createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";
  import { flip } from "svelte/animate";
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

  function pop(node, { duration, delay }) {
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
    animation: fall-down 1000ms ease-in-out 1 forwards;
  }

  .wrong:hover {
    animation: fall-down 1000ms ease-in-out 1 forwards;
  }

  @keyframes fall-down {
    0% {
      opacity: 1;
      transform: translate(0, 0px) rotateZ(0deg);
    }
    100% {
      opacity: 0;
      transform: translate3d(0px, 500px, 0) rotate(-170deg);
    }
  }
</style>

<button
  in:pop={{ duration: 750, delay: i * 50 }}
  class:correct
  class:wrong
  on:click|preventDefault|once={handleClick}>
  <slot />
</button>
