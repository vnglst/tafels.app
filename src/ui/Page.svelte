<script>
  import { fly, fade } from "svelte/transition";
  export let reverse = false;
</script>

<div
  class="animated"
  in:fly={{ x: reverse ? -200 : 200, duration: 100 }}
  out:fly={{ x: reverse ? -200 : 200, duration: 100 }}
>
  <main>
    <slot />
  </main>
  <footer>
    Made with
    <span>♥️</span>
    by
    <a href="https://koenvangilst.nl">Koen van Gilst</a>
    <br />
    Source code on
    <a href="https://github.com/vnglst/tafels.app">Github</a>
    <br />
    v. {process.env.APP_VERSION} git {process.env.COMMIT_HASH}
  </footer>
</div>

<style>
  .animated {
    position: absolute;
    width: 100vw;
  }

  main {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  footer {
    color: var(--grey-300);
    margin: 4rem 0 2rem 0;
    font-size: 10px;
    text-align: center;
  }

  span {
    color: var(--red-050);
  }
</style>
