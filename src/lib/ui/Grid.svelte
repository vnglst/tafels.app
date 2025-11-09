<div class="grid">
  <slot />
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 5rem);
    grid-template-rows: repeat(3, 5rem);
    grid-auto-rows: 5rem;
    grid-gap: 2rem;
    margin: 3rem auto;
  }
</style>
