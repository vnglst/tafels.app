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
    padding: 0.5em 1.5em;
    background-color: hsla(0, 0%, 0%, 0.6);
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
    bottom: 0px;
  }

  a {
    text-decoration: none;
    margin: 0.5em;
    height: 1.5em;
    width: 1.5em;
    display: block;
  }

  a:hover {
    animation: zoom 100ms ease-in-out 1 forwards;
  }

  a:active {
    animation: press 200ms ease-in-out 1 forwards;
  }

  @keyframes zoom {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.2);
    }
  }

  @keyframes press {
    0% {
      transform: scale(1);
    }
    20% {
      transform: scale(0.9);
    }
    80% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
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
