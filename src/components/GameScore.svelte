<script>
  import Badge from "../components/BadgeIcon.svelte";

  export let rights;
  export let total;
  export let results;
  export let size = 1;
  export let showLabel = true;
</script>

<style>
  ul {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0;
    padding: 1.5em;
  }
  .label {
    margin: 0;
    padding: 0 0.5em 0 0;
  }

  li {
    display: block;
    padding: 0.1em;
  }
</style>

<ul style={`font-size: ${size}rem`}>
  {#if showLabel}
    <p class="label">{`${rights}/${total}`}</p>
  {/if}
  {#each results as result, index}
    <li>
      <Badge
        completed={result === true ? 1 : 0}
        passed
        wrong={result === false}
        {size} />
    </li>
  {/each}
</ul>
