<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import LayoutGrid from '@lucide/svelte/icons/layout-grid';
	import Plus from '@lucide/svelte/icons/plus';
	import Header from '$lib/ui/Header.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Header user={data.user} />
{#if !data.user}
	<div class="mx-auto grid w-full max-w-5xl grid-cols-12 py-20">
		<div class="col-span-8 flex flex-col justify-center">
			<a
				href="/changelog"
				class="flex w-fit items-center gap-4 rounded-full border border-zinc-300 px-3 py-1.5 text-sm"
			>
				<span class="font-medium text-blue-600">Just shipped v0.1</span>
				<span class="h-5 border border-r-0 border-zinc-300"></span>
				<div class="flex items-center gap-2 text-zinc-700">
					See what's new <ChevronRight size={16} class="stroke-zinc-700" />
				</div>
			</a>
			<h1 class="py-4 text-7xl font-semibold tracking-tighter text-balance">
				A better way to manage your apps
			</h1>
			<p class="py-4 text-xl font-medium text-balance text-zinc-500">
				Collect data from contact, feedback, and support forms. Get notified and respond to your
				users on time and on the go!
			</p>
			<div class="my-4 flex items-center gap-4">
				<a
					href="/signup"
					class="rounded-xl bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-600/90"
					>Start building</a
				>
				<a
					href="/docs"
					class="flex items-center gap-2 rounded-xl px-4 py-2 font-medium transition hover:bg-zinc-100"
					>Learn more <ArrowRight size={16} /></a
				>
			</div>
		</div>
		<div class="col-span-4">
			<div class="mx-auto h-96 w-72 border"></div>
		</div>
	</div>
{:else}
	<div class="mx-auto w-full max-w-5xl pt-10 pb-32">
		<div class="flex items-center justify-between">
			<h1 class="text-3xl font-semibold tracking-tight">Apps</h1>
			<a
				href="/apps/new"
				class="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white"
				><Plus size={16} class="stroke-white" strokeWidth={2.5} />Create</a
			>
		</div>
		<div class="mt-10 flex flex-wrap gap-4">
			{#each data.apps as app (app.id)}
				<a
					href="/apps/{app.id}"
					class="h-24 w-64 rounded-xl border border-zinc-200 bg-zinc-50 p-2 text-xl font-medium tracking-tight text-zinc-700 shadow-sm"
				>
					{app.name}
				</a>
			{/each}
		</div>
		{#if data.apps.length === 0}
			<div class="mt-10 flex flex-col items-center gap-6">
				<LayoutGrid size={36} class="stroke-zinc-700" />
				<div class="flex flex-col items-center gap-1">
					<p class="font-medium text-zinc-800">No apps</p>
					<p class="text-zinc-500">Create an app to get started</p>
				</div>
				<a
					href="/apps/new"
					class="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white"
					><Plus size={16} class="stroke-white" strokeWidth={2.5} />Create app</a
				>
			</div>
		{/if}
	</div>
{/if}
