<script>
  import VisuallyHidden from "../ui/VisuallyHidden.svelte";
  import IconLock from "../ui/IconLock.svelte";
  import IconCorrect from "../ui/IconCorrect.svelte";
  import Page from "../ui/Page.svelte";
  import Card from "../ui/Card.svelte";
  import Grid from "../ui/Grid.svelte";

  import ChallengeLink from "../components/ChallengeLink.svelte";

  import { store } from "./questions-store.js";
  import { subtracts } from "./subtract/subtractQuestions.ts";
  import { adds } from "./add/addQuestions.ts";
  import { tables } from "./table/tableQuestions.ts";

  let categories = [tables, adds, subtracts];
</script>

<svelte:head>
  <title>tafels.app - a math trainer for kids</title>
</svelte:head>

<Page reverse>
  <VisuallyHidden>
    <h1>Categories</h1>
  </VisuallyHidden>
  <p>update!</p>
  {#each categories as category}
    <Card>
      <h2 slot="header">{category.title}</h2>
      <Grid>
        {#each Object.entries($store[category.category]) as [n, challenge]}
          <ChallengeLink
            href={`${category.slug}/${n}`}
            unlocked={challenge.unlocked}
            completed={challenge.completed}
          >
            {n}
          </ChallengeLink>
        {/each}
      </Grid>
    </Card>
  {/each}
</Page>

<style>
  h2 {
    margin: 0;
    padding: 5rem 0 0 0;
    font-weight: 400;
    font-size: 28px;
    text-transform: uppercase;
  }
</style>
