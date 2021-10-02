<script>
  import { onMount } from "svelte";
  import VisuallyHidden from "../ui/VisuallyHidden.svelte";
  import Page from "../ui/Page.svelte";
  import Card from "../ui/Card.svelte";
  import Grid from "../ui/Grid.svelte";
  import ChallengeLink from "../components/ChallengeLink.svelte";
  import { store } from "./questions-store.js";
  import { practiceStore } from "./practice-store";
  import { subtracts } from "./subtract/subtractQuestions.ts";
  import { adds } from "./add/addQuestions.ts";
  import { tables } from "./table/tableQuestions.ts";

  let categories = [tables, adds, subtracts];

  onMount(() => {
    practiceStore.sync();
  });
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
            locked={!challenge.unlocked}
            unlocked={challenge.unlocked}
            completed={challenge.completed}
          >
            {n}
          </ChallengeLink>
        {/each}
      </Grid>
    </Card>
  {/each}
  <Card>
    <h2 slot="header">Practice</h2>
    <Grid>
      <ChallengeLink href="/game" present />
      Play a game
      <span />
      <ChallengeLink
        href="/practice/today"
        unlocked
        completed={$practiceStore.today.length === 0}
      >
        {$practiceStore.today.length}
      </ChallengeLink>
      Questions for today
      <span />
      <ChallengeLink href="/practice/someday" locked>
        {$practiceStore.someday.length}
      </ChallengeLink>
      Questions for later
    </Grid>
  </Card>
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
