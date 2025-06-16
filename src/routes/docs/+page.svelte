<script lang="ts">
	import Header from '$lib/ui/Header.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Header user={data.user} />

<div class="mx-auto w-full max-w-5xl pt-10 pb-32">
	<p class="py-2 text-center text-lg font-medium text-zinc-500 uppercase">Docs</p>
	<p class="text-center text-5xl font-semibold tracking-tight text-zinc-800">Coming soon!</p>
</div>
