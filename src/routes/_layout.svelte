<script>
  import { stores } from "@sapper/app";
  import Nav from "../components/Nav.svelte";
  import PageLoadingBar from "../components/PageLoadingBar.svelte";

  export let segment;

  const { preloading, page, session } = stores();
</script>

<PageLoadingBar {preloading} />

<Nav {segment} />

<slot />
