<script lang="ts">
	import { enhance } from '$app/forms';
	import Header from '$lib/ui/Header.svelte';
	import Zap from '@lucide/svelte/icons/zap';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Header user={data.user} />

<div class="mx-auto w-full max-w-xl px-4 pt-10 pb-32 lg:max-w-3xl xl:max-w-5xl">
	<p class="pb-2 text-lg font-semibold tracking-tight">Limit reached</p>
	<p class="text-balance text-zinc-600">
		You can only have 2 forms on the free plan. Please upgrade your plan to continue.
	</p>

	<a
		href="/upgrade"
		class="mt-10 flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600/90"
		><Zap size={16} />Upgrade</a
	>
</div>
