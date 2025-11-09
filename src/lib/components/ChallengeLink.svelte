<script lang="ts">
  import IconLock from "$lib/ui/IconLock.svelte";
  import IconCorrect from "$lib/ui/IconCorrect.svelte";
  import IconPresent from "$lib/ui/IconPresent.svelte";
  import Button from "$lib/ui/Button.svelte";

  export let href: string;
  export let locked: boolean = false;
  export let unlocked: boolean = false;
  export let completed: boolean = false;
  export let present: boolean = false;
</script>

<Button {href} disabled={locked} primary elementType="link">
  {#if unlocked}
    <slot />
    {#if completed}
      <span class="icon">
        <IconCorrect size={24} />
      </span>
    {/if}
  {/if}
  {#if locked}
    <IconLock />
  {/if}
  {#if present}
    <IconPresent />
  {/if}
</Button>

<style>
  .icon {
    position: absolute;
    top: -0.6rem;
    right: -0.6rem;
  }
</style>
