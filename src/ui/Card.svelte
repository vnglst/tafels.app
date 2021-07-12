<script lang="ts">
  export let progress = null;
</script>

<div class="card">
  <slot name="progress">
    {#if progress !== null}
      <div
        class="progress"
        style="width: {progress}%; border-radius: 20px {progress > 97 ? '20px' : '0'}
        0 0;"
      />
    {/if}
  </slot>
  <div class="header">
    <slot name="header" />
  </div>
  <slot />
  <div class="footer mt-auto">
    <slot name="footer" />
  </div>
</div>

<style>
  .card {
    border-top: 10px solid var(--blue-050);
    display: flex;
    flex-direction: column;
    background-color: var(--white);
    color: var(--grey-900);
    border-radius: 10px;
    margin: 3rem 1rem 0.5rem 1rem;
    padding: 0;
    box-shadow: var(--shadow-2);
    width: 28rem;
    min-height: 35rem;
  }

  .progress {
    margin-top: -10px;
    border-bottom: 10px solid var(--blue-300);
    border-radius: 20px 0 0 0;
  }

  .header {
    font-size: 28px;
    text-align: center;
  }
</style>
