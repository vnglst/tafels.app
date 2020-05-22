<script>
  import ChallengeLink from "../components/ChallengeLink.svelte";
  import VisuallyHidden from "../ui/VisuallyHidden.svelte";
  import IconLock from "../ui/IconLock.svelte";
  import IconCorrect from "../ui/IconCorrect.svelte";
  import Page from "../components/Page.svelte";
  import Card from "../components/Card.svelte";
  import Grid from "../components/Grid.svelte";
  import { store } from "./questions-store.js";
  import { subtracts } from "./subtract/subtractQuestions.js";
  import { adds } from "./add/addQuestions.js";
  import { tables } from "./table/tableQuestions.js";

  let categories = [tables, adds, subtracts];
</script>

<svelte:head>
  <title>tafels.app - a math trainer for kids</title>
</svelte:head>

<Page reverse>
  <VisuallyHidden>
    <h1>Categories</h1>
  </VisuallyHidden>
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
