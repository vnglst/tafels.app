<script lang="ts">
	import { page } from '$app/state';
	import { dev } from '$app/env';

	const status = $derived(page.status);
	const message = $derived(page.error?.message);
	const stack = $derived(
		page.error && 'stack' in page.error && typeof page.error.stack === 'string'
			? page.error.stack
			: undefined
	);
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<h1>{status}</h1>

<p>{message}</p>

{#if dev && stack}
	<pre>{stack}</pre>
{/if}

<style>
	h1,
	p {
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>
