<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { elasticOut } from "svelte/easing";

  export let elementType = "button";
  export let href = null;

  export let primary = false;
  export let blue = false;
  export let success = false;
  export let green = false;
  export let danger = false;
  export let red = false;
  export let warning = false;
  export let orange = false;

  export let disabled = false;
  export let pill = false;
  export let animate = false;
  export let delay = null;

  let class_name = "";
  export { class_name as class };

  const dispatch = createEventDispatcher();

  function pop(node, { duration, delay }) {
    if (!animate) return;

    return {
      delay,
      duration,
      css: (t) => {
        const eased = elasticOut(t);
        return `transform: scale(${eased});`;
      },
    };
  }

</script>

{#if elementType === 'button' || disabled}
  <button
    in:pop={{ duration: 750, delay }}
    class={class_name}
    class:primary={primary || blue}
    class:success={success || green}
    class:danger={danger || red}
    class:orange={warning || orange}
    class:pill
    {disabled}
    {href}
    on:click|preventDefault={(e) => dispatch('click', e)}
  >
    <slot />
  </button>
{:else if elementType === 'link'}
  <a
    in:pop={{ duration: 750, delay }}
    rel="prefetch"
    class:primary={primary || blue}
    class:success={success || green}
    class:danger={danger || red}
    class:orange={warning || orange}
    class:pill
    {href}
    on:click={(e) => dispatch('click', e)}
  >
    <slot />
  </a>
{/if}

<style>
  .primary {
    background-color: var(--blue-100);
  }

  .success {
    background-color: var(--green-100);
  }

  .danger {
    background-color: var(--red-100);
  }

  .orange {
    background-color: var(--orange-100);
  }

  .pill {
    font-size: 20px;
    width: max-content;
    min-width: 6em;
    padding: 0.5em 1em;
  }

  a,
  button {
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
    text-decoration: none;
    border-radius: 1rem;
    font-weight: 500;
    font-size: 24px;
    box-shadow: var(--shadow-2);
    background-color: var(--grey-100);
    color: var(--grey-900);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s cubic-bezier(0, 1.2, 0.2, 1.5);
    outline: none;
  }

  a {
    position: relative;
  }
  a:hover:not([disabled]),
  button:hover:not([disabled]) {
    transform: scale(1.15);
  }

  a:hover:not([disabled]),
  button:active:not([disabled]) {
    transform: scale(1.15);
  }

  button[disabled] {
    background-color: var(--grey-100);
    cursor: not-allowed;
  }

</style>
