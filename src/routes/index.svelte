<script>
  import Link from "../components/Link.svelte";
  import Page from "../components/Page.svelte";
  import Card from "../components/Card.svelte";
  import Grid from "../components/Grid.svelte";
  import Badge from "../components/BadgeIcon.svelte";
  import { store, tables, adds, hasPassed } from "./store.js";
  import { fly, fade } from "svelte/transition";

  store.useLocalStorage();
</script>

<style>
  p {
    padding: 1em;
    margin: 0;
  }
</style>

<svelte:head>
  <title>Tables App</title>
</svelte:head>

<Page reverse>
  <Card>
    <p slot="header">Additions</p>
    <Grid>
      {#each $adds as add}
        <Link link={`/add${add.n}`}>
          <Badge completed={add.completed} passed={hasPassed(add.completed)}>
            {add.n}
          </Badge>
        </Link>
      {/each}
    </Grid>
  </Card>
  <Card>
    <p slot="header">Multiplications</p>
    <Grid>
      {#each $tables as table}
        <Link link={`tafel${table.n}`}>
          <Badge
            completed={table.completed}
            passed={hasPassed(table.completed)}>
            {table.n}
          </Badge>
        </Link>
      {/each}
    </Grid>
  </Card>
</Page>
