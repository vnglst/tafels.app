<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let duration = null;
  export let showTimer = false;

  let timedOut = false;

  const dispatch = createEventDispatcher();
</script>

{#if duration && showTimer && !timedOut}
  <div
    class="progress animated"
    on:animationend={() => {
      timedOut = true;
      setTimeout(() => {
        timedOut = false;
      }, 200);
      dispatch('timeout');
    }}
    style="animation-duration: {duration}s"
  />
{:else if timedOut}
  <div class="progress ended" />
{/if}

<style>
  .progress {
    margin-top: -10px;
    border-top: 10px solid var(--blue-300);
    border-radius: 20px 0 0 0;
    width: 100%;
  }

  .ended {
    border-radius: 20px 20px 0 0;
    border-color: var(--red-1000);
  }

  .animated {
    animation: countdown;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-timing-function: linear;
  }

  @keyframes countdown {
    0% {
      width: 0%;
    }
    70% {
      border-color: var(--blue-300);
    }
    /* start flashing red */
    71% {
      border-color: var(--red-500);
    }
    74% {
      border-color: var(--red-1000);
    }
    76% {
      border-color: var(--red-500);
    }
    78% {
      border-color: var(--red-1000);
    }
    81% {
      border-color: var(--red-500);
    }
    84% {
      border-color: var(--red-1000);
    }
    81% {
      border-color: var(--red-500);
    }
    84% {
      border-color: var(--red-1000);
    }
    87% {
      border-color: var(--red-500);
    }
    90% {
      border-color: var(--red-1000);
    }
    93% {
      border-color: var(--red-500);
    }
    96% {
      border-color: var(--red-1000);
    }
    99% {
      border-color: var(--red-500);
      border-radius: 20px 0 0 0;
    }
    100% {
      width: 100%;
      /* end count down with rounded corner */
      border-radius: 20px 20px 0 0;
      border-color: var(--red-1000);
    }
  }
</style>
