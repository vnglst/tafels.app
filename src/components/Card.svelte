<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";

  export let duration = null;
  export let onTimeout = null;
  export let completed = false;

  let timedOut = false;
</script>

<div class="card">
  {#if duration && !timedOut && !completed}
    <div
      class="progress animated"
      on:animationend={() => {
        timedOut = true;
        setTimeout(() => {
          timedOut = false;
        }, 200);
        onTimeout();
      }}
      style="animation-duration: {duration}s"
    />
  {/if}
  {#if timedOut}
    <div class="progress ended" />
  {/if}
  <div class="header">
    <slot name="header" />
  </div>
  <slot />
  <div class="footer">
    <slot name="footer" />
  </div>
</div>

<style>
  .card {
    border-top: 10px solid var(--blue-050);
    display: grid;
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

  .header {
    font-size: 28px;
    text-align: center;
  }

  .footer {
    margin: 0;
    padding: 0;
  }
</style>
