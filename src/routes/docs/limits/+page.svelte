<script lang="ts">
	import Header from '$lib/ui/Header.svelte';
	import Sidebar from '$lib/ui/DocsSidebar.svelte';
	import DropdownMenu from '$lib/ui/DocsDropdownMenu.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Header user={data.user} />

<svelte:head>
	<title>Limits | DevMatter Docs</title>
</svelte:head>

<div class="mx-auto w-full max-w-xl pt-10 pb-32 lg:max-w-3xl xl:max-w-5xl">
	<div class="grid grid-cols-10">
		<div class="hidden flex-col gap-6 text-sm lg:col-span-2 lg:flex">
			<Sidebar url="/docs/limits" />
		</div>
		<div class="col-span-12 mb-10 px-4 lg:hidden">
			<DropdownMenu url="/docs/limits" name="Limits" />
		</div>
		<div class="col-span-12 px-4 lg:col-span-8 lg:px-10">
			<h1 class="mb-10 text-3xl font-semibold tracking-tight">Limits</h1>
			<div class="flex flex-col gap-8">
				<p class="leading-loose">
					There are general limits applied based on the plan you are on. You can upgrade your plan
					at any time to increase your limits.
				</p>
				<p class="leading-loose">
					If you have any issues with the pricing plans, please contact us.
				</p>
				<p class="leading-loose">We also have rate limits to prevent abuse.</p>
			</div>
		</div>
	</div>
</div>
