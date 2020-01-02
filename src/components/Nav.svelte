<script>
  import Link from "./Link.svelte";
  import BackIcon from "./BackIcon.svelte";
  import GearIcon from "./GearIcon.svelte";

  export let segment;
</script>

<style>
  nav {
    font-weight: normal;
    color: var(--grey-1000);
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
    display: block;
    text-decoration: none;
    padding: 1rem;
  }
</style>

<nav>
  <ul>
    {#if !segment}
      <!-- <li class:selected={segment === 'about'} class="right">
        <a rel="prefetch" href="about">
          <GearIcon />
        </a>
      </li> -->
    {:else}
      <li>
        <a rel="prefetch" href=".">
          <BackIcon />
        </a>
      </li>
    {/if}
  </ul>
</nav>
