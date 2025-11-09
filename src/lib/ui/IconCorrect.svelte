<script lang="ts">
  export let size = 28;
</script>

<svg
  fill="currentColor"
  height={size}
  width={size}
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  class="icon-check"
>
  <circle fill="currentColor" cx="12" cy="12" r="10" class="primary" />
  <path
    fill="currentColor"
    class="secondary"
    d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1
    1.4-1.42l2.3 2.3z"
  />
</svg>

<style>
  .primary {
    color: var(--green-050);
  }

  .secondary {
    color: var(--green-1000);
  }
</style>
