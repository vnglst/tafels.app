<script>
  export let link;
</script>

<style>
  a {
    height: 6rem;
    width: 6rem;
    background-color: unset;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
    text-decoration: none;
  }

  a:hover {
    animation: zoom 100ms ease-in-out 1 forwards;
  }

  a:active {
    animation: press 100ms ease-in-out 1 forwards;
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
      transform: scale(1.2);
    }
    100% {
      transform: scale(1.05);
    }
  }
</style>

<a href={link}>
  <slot />
</a>
