<script>
  import { createEventDispatcher } from "svelte";
  import { fly, fade } from "svelte/transition";

  const dispatch = createEventDispatcher();

  export let value;
  export let id;
  export let wrong;
  export let correct;

  function handleClick() {
    dispatch("click", { value, id });
  }
</script>

<style>
  button {
    font-weight: 900;
    font-size: 1.5em;
    padding: 1em;
    border-radius: 0.5em;
    text-shadow: 0 2px 0 rgba(0, 0, 0, 0.07);
    background: #ffd332;
    border: 1px solid #011627;
    color: #011627;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
    text-decoration: none;
    height: 100%;
    width: 100%;
  }

  button:disabled {
    background: grey;
    color: #002747;
  }

  button:disabled {
    cursor: default;
  }

  button:hover:not([disabled]) {
    animation: zoom 100ms ease-in-out 1 forwards;
  }

  button:active:not([disabled]) {
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
      transform: scale(1.2);
    }
    100% {
      transform: scale(1.05);
    }
  }
</style>

<button class:correct class:wrong on:click|preventDefault={handleClick}>
  {value}
</button>
