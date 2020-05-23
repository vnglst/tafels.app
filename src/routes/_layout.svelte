<script>
  import { stores } from "@sapper/app";
  import Nav from "../ui/Nav.svelte";
  import PageLoadingBar from "../ui/PageLoadingBar.svelte";

  export let segment;

  const { preloading, page, session } = stores();
</script>

<PageLoadingBar {preloading} />

<Nav {segment} />

<slot />
