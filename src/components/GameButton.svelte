<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Button from "../ui/Button.svelte";

  export let i: number;
  export let value: string;
  export let expected: string;

  const dispatch = createEventDispatcher();

  let answer = "no answer";

  function handleClick() {
    if (value === expected) {
      answer = "correct";
      dispatch("correct");
    } else {
      answer = "wrong";
      dispatch("wrong");
    }
  }
</script>

<Button
  primary={answer === 'no answer'}
  success={answer === 'correct'}
  danger={answer === 'wrong'}
  class={answer === 'wrong' ? 'wrong' : ''}
  animate
  delay={i * 50}
  on:click|once={handleClick}
  elementType="button"
>
  <slot />
</Button>

<style>
  /* only global classes can be passed to child components in svelte :-(  */
  :global(.wrong) {
    background-color: var(--red-100) !important;
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
