<script>
  import Link from "../components/Link.svelte";
  import VisuallyHidden from "../components/VisuallyHidden.svelte";
  import Page from "../components/Page.svelte";
  import Card from "../components/Card.svelte";
  import Grid from "../components/Grid.svelte";
  import { store } from "./store.js";

  store.useLocalStorage();
  store.useUnlocking();

  $: tables = Object.values($store).filter(t => t.type === "table");
  $: adds = Object.values($store).filter(t => t.type === "add");
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
  <VisuallyHidden>
    <h1>Categoriën</h1>
  </VisuallyHidden>
  <Card>
    <p slot="header">VERMENIGVULDIGEN</p>
    <Grid>
      {#each tables as table}
        <Link
          link={`tafel/${table.n}`}
          unlocked={table.unlocked}
          completed={table.completed}>
          {table.n}
        </Link>
      {/each}
    </Grid>
  </Card>
  <Card>
    <p slot="header">OPTELLEN</p>
    <Grid>
      {#each adds as add}
        <Link
          link={`optellen/${add.n}`}
          unlocked={add.unlocked}
          completed={add.completed}>
          {add.n}
        </Link>
      {/each}
    </Grid>
  </Card>
</Page>
