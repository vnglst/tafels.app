<script lang="ts">
  import IconBack from "./IconBack.svelte";
  import { accountStore } from "../routes/account-store";
  export let segment: string;

</script>

<nav>
  <ul>
    {#if segment && process.browser}
      <li class="back-link float-left">
        <a rel="prefetch" href="../" class="p-5">
          <IconBack />
          <span>Back</span>
        </a>
      </li>
    {/if}
    {#if !segment}
      <li class="nav-link float-right">
        <a rel="prefetch" href="/account" class="p-0 pr-5">
          <img
            src={`.netlify/functions/bigheads?seed=${$accountStore.name}`}
            alt="Account"
            height="50"
            width="50"
          />
        </a>
      </li>
    {/if}
  </ul>
</nav>

<style>
  nav {
    font-weight: normal;
    color: var(--grey-800);
    background-color: var(--white);
    box-shadow: var(--shadow-3);
    min-height: 60px;
  }

  ul {
    max-width: 50rem;
    margin: 0 auto;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    /* float: left; */
  }

  a {
    display: flex;
    text-decoration: none;
    align-items: center;
  }

  span {
    padding-left: 0.5em;
    line-height: 1em;
  }

  @keyframes bounce-left {
    0% {
      transform: translateX(0px);
    }
    25% {
      transform: translateX(-5px);
    }
    100% {
      transform: translateX(0px);
    }
  }

  .back-link:hover {
    animation: bounce-left 800ms ease 0s 1 normal;
  }

  .nav-link:hover {
    transition: 0.75s cubic-bezier(0, 1.2, 0.2, 1.5);
    transform: scale(1.2);
  }

</style>
