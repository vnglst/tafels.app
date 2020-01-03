<script>
  import IconLock from "./IconLock.svelte";
  import IconCorrect from "./IconCorrect.svelte";
  import { tik } from "../components/soundFx.js";

  export let link;
  export let unlocked = false;
  export let completed;

  let active = unlocked && !completed;
</script>

<style>
  a {
    position: relative;
  }
  .active {
    background-color: var(--blue-300);
  }

  .locked {
    cursor: initial;
  }

  .icon-correct {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
  }
</style>

{#if unlocked}
  <a rel="prefetch" class="button" class:active href={link}>
    {#if completed}
      <span class="icon-correct">
        <IconCorrect />
      </span>
    {/if}
    <slot />
  </a>
{:else}
  <button
    on:click={() => {
      tik.play();
    }}
    class="locked">
    <IconLock />
  </button>
{/if}
