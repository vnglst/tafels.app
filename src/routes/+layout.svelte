<script>
	import { page, navigating } from '$app/stores';
	import Nav from '$lib/ui/Nav.svelte';
	import PageLoadingBar from '$lib/ui/PageLoadingBar.svelte';
	import '../app.css';

	$: segment = $page.url.pathname.split('/')[1];
</script>

<PageLoadingBar preloading={navigating} />

<Nav {segment} />

<slot />
