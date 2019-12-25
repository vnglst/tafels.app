<script>
  import IconLink from "../components/IconLink.svelte";

  let tables = [
    { completed: 0.1, id: "1" },
    { completed: 0.0, id: "2" },
    { completed: 0.0, id: "3" },
    { completed: 1.0, id: "4" },
    { completed: 0.0, id: "5" },
    { completed: 0.5, id: "6" },
    { completed: 1.0, id: "7" },
    { completed: 0.7, id: "8" },
    { completed: 0.5, id: "9" },
    { completed: 1.0, id: "10" }
  ];
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
  {#each tables as table}
    <IconLink
      label={table.id}
      link={`/table${table.id}`}
      completed={table.completed}
      passed={table.completed >= 0.7} />
  {/each}
</div>
