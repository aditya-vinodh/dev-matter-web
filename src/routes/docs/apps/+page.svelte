<script lang="ts">
	import Header from '$lib/ui/Header.svelte';
	import Sidebar from '$lib/ui/DocsSidebar.svelte';
	import DropdownMenu from '$lib/ui/DocsDropdownMenu.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Header user={data.user} />

<svelte:head>
	<title>Apps | DevMatter Docs</title>
</svelte:head>

<div class="mx-auto w-full max-w-xl pt-10 pb-32 lg:max-w-3xl xl:max-w-5xl">
	<div class="grid grid-cols-10">
		<div class="col-span-2 hidden flex-col gap-6 text-sm lg:flex">
			<Sidebar url="/docs/apps" />
		</div>
		<div class="col-span-12 mb-10 px-4 lg:hidden">
			<DropdownMenu url="/docs/apps" name="Apps" />
		</div>
		<div class="col-span-12 px-4 lg:col-span-8 lg:px-10">
			<h1 class="mb-10 text-3xl font-semibold tracking-tight">Apps</h1>
			<div class="flex flex-col gap-8">
				<p class="leading-loose">
					Apps are the highest level of organization in DevMatter. Get started by creating your
					first app!
				</p>
				<div class="leading-loose">
					All you need to do is provide the name and URL of your app. Then you can start building on
					DevMatter. Go to <a href="/apps/new" class="underline">devmatter.app/apps/new</a> to create
					one.
				</div>
			</div>
		</div>
	</div>
</div>
