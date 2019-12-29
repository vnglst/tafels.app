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
    height: 100%;
    width: 100%;
  }

  button:hover {
    animation: zoom 100ms ease-in-out 1 forwards;
  }

  button:active {
    animation: press 100ms ease-in-out 1 forwards;
  }

  .correct {
    background-color: green;
  }

  .wrong {
    background-color: red;
  }

  @keyframes zoom {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.2);
    }
  }

  @keyframes press {
    0% {
      transform: scale(1);
    }
    20% {
      transform: scale(0.9);
    }
    80% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
</style>

<button class:correct class:wrong on:click|preventDefault|once={handleClick}>
  <slot />
</button>
