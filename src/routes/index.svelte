<script>
  import Link from "../components/Link.svelte";
  import Badge from "../components/BadgeIcon.svelte";
  import { tables } from "./store.js";

  tables.useLocalStorage();
</script>

<style>
  .container {
    display: grid;
    grid-template-columns: repeat(3, 7rem);
    grid-template-rows: repeat(4, 7rem);
    grid-gap: 1rem;
  }
</style>

<svelte:head>
  <title>Tables App</title>
</svelte:head>

<div class="container">
  {#each $tables as table}
    <Link link={`/table${table.id}`}>
      <Badge
        label={table.id}
        completed={table.completed}
        passed={table.completed >= 0.7} />
    </Link>
  {/each}
</div>
