<script>
  import Link from "../components/Link.svelte";
  import Page from "../components/Page.svelte";
  import Card from "../components/Card.svelte";
  import Grid from "../components/Grid.svelte";
  import { store, tables, adds, hasPassed } from "./store.js";
  import { fly, fade } from "svelte/transition";

  store.useLocalStorage();
</script>

<style>
  p {
    margin: 0;
    padding: 1rem 0 0 0;
  }
</style>

<svelte:head>
  <title>Tables App</title>
</svelte:head>

<Page reverse>
  <Card>
    <p slot="header">VERMENIGVULDIGEN</p>
    <Grid>
      {#each $tables as table}
        <Link
          link={`tafel${table.n}`}
          locked={table.completed <= 0}
          completed={table.completed >= 1}>
          {table.n}
        </Link>
      {/each}
    </Grid>
  </Card>

  <Card>
    <p slot="header">OPTELLEN</p>
    <Grid>
      {#each $adds as add}
        <Link
          link={`add${add.n}`}
          locked={add.completed <= 0}
          completed={add.completed >= 1}>
          {add.n}
        </Link>
      {/each}
    </Grid>
  </Card>
</Page>
