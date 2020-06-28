<script lang="typescript">
  import IconLock from "../ui/IconLock.svelte";
  import IconCorrect from "../ui/IconCorrect.svelte";
  import Button from "../ui/Button.svelte";

  export let href: string;
  export let unlocked = false;
  export let completed = false;
</script>

<Button {href} disabled={!unlocked} primary elementType="link">
  {#if unlocked}
    <slot />
    {#if completed}
      <span class="icon">
        <IconCorrect size={24} />
      </span>
    {/if}
  {:else}
    <IconLock />
  {/if}
</Button>

<style>
  .icon {
    position: absolute;
    top: -0.6rem;
    right: -0.6rem;
  }
</style>
