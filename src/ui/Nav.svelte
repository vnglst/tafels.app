<script lang="typescript">
  import IconBack from "./IconBack.svelte";
  import IconUserCircle from "./IconUserCircle.svelte";

  export let segment;
</script>

<nav>
  <ul>
    {#if segment && process.browser}
      <li class="back-link">
        <a rel="prefetch" href="../">
          <IconBack />
          <span>Back</span>
        </a>
      </li>
    {/if}
    {#if !segment}
      <li class="right nav-link">
        <a rel="prefetch" href="/account">
          <IconUserCircle />
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
    min-height: 57px;
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

  .right {
    float: right;
  }

  a {
    display: flex;
    text-decoration: none;
    padding: 1rem;
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
      transform: translateX(-10px);
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
    transform: scale(1.3);
  }
</style>
