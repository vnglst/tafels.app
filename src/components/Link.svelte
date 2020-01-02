<script>
  export let link;
  export let active;
</script>

<style>
  .active {
    background-color: var(--blue-400);
  }
</style>

<a rel="prefetch" class="button" class:active href={link}>
  <slot />
</a>
