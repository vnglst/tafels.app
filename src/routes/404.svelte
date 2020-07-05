<script lang="ts">
  import Page from "../ui/Page.svelte";
  import Card from "../ui/Card.svelte";
</script>

<svelte:head>
  <title>tafels.app - oops, page not found</title>
</svelte:head>

<Page>
  <Card>
    <h1 slot="header">
      Could not find the page you're looking for
      <br />
      😢
    </h1>
  </Card>
</Page>

<style>
  h1 {
    margin: 1em;
  }
</style>
