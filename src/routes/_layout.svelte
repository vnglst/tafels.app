<script>
  import Nav from "../components/Nav.svelte";

  export let segment;
</script>

<style>
  main {
    display: flex;
    justify-content: center;
    padding: 2em;
    height: 100vw;
  }
</style>

<Nav {segment} />

<main>
  <slot />
</main>
