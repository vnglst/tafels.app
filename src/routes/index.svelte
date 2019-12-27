<script>
  import Link from "../components/Link.svelte";
  import Badge from "../components/BadgeIcon.svelte";
  import { tables } from "./store.js";
  import { fly, fade } from "svelte/transition";

  tables.useLocalStorage();
</script>

<style>
  .anim {
    position: absolute;
  }
  .container {
    display: grid;
    grid-template-columns: repeat(3, 7rem);
    grid-template-rows: repeat(4, 7rem);
    grid-gap: 1rem;

    background-color: hsla(0, 0%, 0%, 0.6);
    border-radius: 20px;
    padding: 2em;
    margin: 2em 0;
  }
</style>

<svelte:head>
  <title>Tables App</title>
</svelte:head>

<div
  class="anim"
  in:fly={{ x: -200, duration: 150 }}
  out:fly={{ x: -200, duration: 150 }}>
  <div class="container">
    {#each $tables as table}
      <Link link={`/table${table.id}`}>
        <Badge completed={table.completed} passed={table.completed >= 0.7}>
          {table.id}
        </Badge>
      </Link>
    {/each}
  </div>

  <div class="container">
    {#each $tables as table}
      <Link link={`/table${table.id}`}>
        <Badge completed={table.completed} passed={table.completed >= 0.7}>
          {table.id}
        </Badge>
      </Link>
    {/each}
  </div>

</div>
