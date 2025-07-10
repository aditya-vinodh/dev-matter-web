<script lang="ts">
	import Header from '$lib/ui/Header.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Header user={data.user} />

<svelte:head>
	<title>Upgrade Successful | DevMatter</title>
</svelte:head>

<div class="mx-auto w-full max-w-xl px-4 pt-10">
	<h1 class="text-center text-3xl font-semibold tracking-tight">
		You're payment has been processed successfully 🎉
	</h1>

	<p class="mt-10 text-center text-balance text-zinc-600">
		Thank you for being a DevMatter customer! Your experience is most important to us. Please feel
		free to reach out any time.
	</p>

	<div class="mt-10 flex justify-center">
		<a
			href="/"
			class="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600/90"
		>
			Go Home
		</a>
	</div>
</div>
