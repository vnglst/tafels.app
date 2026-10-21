<script>
	import { page, navigating } from '$app/state';
	import Nav from '$lib/ui/Nav.svelte';
	import PageLoadingBar from '$lib/ui/PageLoadingBar.svelte';
	import '../app.css';

	let { children } = $props();
	let segment = $derived(page.url.pathname.split('/')[1]);
	let isNavigating = $derived(navigating !== null);
</script>

<PageLoadingBar preloading={isNavigating} />

<Nav {segment} />

{@render children()}
