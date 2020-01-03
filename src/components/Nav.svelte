<script>
  import Link from "./Link.svelte";
  import IconBack from "./IconBack.svelte";
  import IconCog from "./IconCog.svelte";

  export let segment;
</script>

<style>
  nav {
    font-weight: normal;
    color: var(--grey-800);
    background-color: var(--white);
    box-shadow: var(--shadow-3);
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

  /* .right {
    float: right;
  } */

  li {
    display: block;
    float: left;
  }

  a {
    display: flex;
    text-decoration: none;
    padding: 1rem;
    align-items: center;
  }

  a:hover {
    animation: bounce-left 800ms ease 0s 1 normal;
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
      transform: translateX(-10px);
    }
    100% {
      transform: translateX(0px);
    }
  }
</style>

<nav>
  <ul>
    {#if !segment}
      <!-- <li class:selected={segment === 'about'} class="right">
        <a rel="prefetch" href="about">
          <IconCog />
        </a>
      </li> -->
    {:else}
      <li>
        <a rel="prefetch" href=".">
          <IconBack />
          <span>Terug</span>
        </a>
      </li>
    {/if}
  </ul>
</nav>
