<script>
  import Link from "./Link.svelte";
  import BackIcon from "./BackIcon.svelte";
  import GearIcon from "./GearIcon.svelte";
  import HomeIcon from "./HomeIcon.svelte";

  export let segment;
</script>

<style>
  nav {
    font-weight: normal;
    padding: 0 1.5em;
    margin: 0;
    background-color: hsla(0, 0%, 0%, 0.4);
  }

  ul {
    margin: 0;
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
    float: left;
  }

  .selected {
    position: relative;
    display: inline-block;
  }

  .right {
    float: right;
  }

  .selected::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 2px;
    background-color: hsla(47, 100%, 50%, 1);
    display: block;
    bottom: 6px;
  }

  a {
    text-decoration: none;
    padding: 0.75em;
    margin: 0;
    display: block;
  }

  a:hover {
    animation: zoom 100ms ease-in-out 1 forwards;
  }

  a:active {
    animation: zoom 100ms ease-in-out 1 forwards;
  }

  @keyframes zoom {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.4);
    }
  }
</style>

<nav>
  <ul>
    {#if segment && segment.startsWith('table')}
      <li>
        <a rel="prefetch" href=".">
          <BackIcon />
        </a>
      </li>
    {:else}
      <li class:selected={segment === undefined}>
        <a rel="prefetch" href=".">
          <HomeIcon />
        </a>
      </li>
      <li class:selected={segment === 'about'} class="right">
        <a rel="prefetch" href="about">
          <GearIcon />
        </a>
      </li>
    {/if}
  </ul>
</nav>
