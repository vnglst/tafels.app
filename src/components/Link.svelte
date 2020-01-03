<script>
  import IconLock from "./IconLock.svelte";
  import IconCorrect from "./IconCorrect.svelte";

  export let link;
  export let locked = true;
  export let completed;

  let active = !locked && !completed;
</script>

<style>
  a {
    position: relative;
  }
  .active {
    background-color: var(--blue-400);
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

<a
  rel="prefetch"
  class="button"
  class:locked
  class:active
  href={locked ? '#' : link}>
  {#if completed}
    <span class="icon-correct">
      <IconCorrect />
    </span>
  {/if}
  {#if locked}
    <IconLock />
  {:else}
    <slot />
  {/if}
</a>
