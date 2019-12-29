<script>
  import { onMount, onDestroy } from "svelte";

  let showKitten = false;

  onMount(() => {
    setTimeout(() => {
      showKitten = true;
    }, 100);
  });

  onDestroy(() => {
    showKitten = false;
  });
</script>

<style>
  img {
    position: absolute;
    left: -50px;
    bottom: -200px;
    transform: translate(-80%, 0) rotate(-30deg);
    transform-origin: 100% 100%;
    transition: transform 0.4s;
  }

  .curious {
    transform: translate(-15%, 0) rotate(0deg);
  }
</style>

<img
  on:click|preventDefault={() => {
    showKitten = false;
  }}
  class:curious={showKitten}
  alt="Kitten wants to tell you good job!"
  src="./kitten-happy.png" />
