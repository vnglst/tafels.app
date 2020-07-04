<script lang="ts">
  import IconCorrect from "../ui/IconCorrect.svelte";
  import IconWrong from "../ui/IconWrong.svelte";
  import IconCircle from "../ui/IconCircle.svelte";

  export let results: boolean[];
</script>

<ul>
  {#each results as result}
    <li>
      {#if result === true}
        <IconCorrect />
      {:else if result === false}
        <IconWrong />
      {:else if result === undefined}
        <IconCircle />
      {/if}
    </li>
  {/each}
</ul>

<style>
  ul {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0;
    padding: 1.5em;
  }

  li {
    display: block;
    padding: 0;
    color: var(--grey-200);
  }
</style>
