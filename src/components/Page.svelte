<script>
  import { fly, fade } from "svelte/transition";
  export let reverse = false;
</script>

<style>
  .animated {
    position: absolute;
    width: 100vw;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>

<div
  class="animated"
  in:fly={{ x: reverse ? -200 : 200, duration: 100 }}
  out:fly={{ x: reverse ? -200 : 200, duration: 100 }}>
  <slot />
</div>
