<script lang="ts">
	import Header from '$lib/ui/Header.svelte';
	import Sidebar from '$lib/ui/DocsSidebar.svelte';
	import DropdownMenu from '$lib/ui/DocsDropdownMenu.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Header user={data.user} />

<div class="mx-auto w-full max-w-xl pt-10 pb-32 lg:max-w-3xl xl:max-w-5xl">
	<div class="grid grid-cols-10">
		<div class="hidden flex-col gap-6 text-sm lg:col-span-2 lg:flex">
			<Sidebar url="/docs/integrations" />
		</div>
		<div class="col-span-12 mb-10 px-4 lg:hidden">
			<DropdownMenu url="/docs/integrations" name="Integrations" />
		</div>
		<div class="col-span-12 px-4 lg:col-span-8 lg:px-10">
			<h1 class="mb-10 text-3xl font-semibold tracking-tight">Integrations</h1>
			<div class="flex flex-col gap-8">
				<p class="leading-loose">
					We currently don't have any integrations available. However, we are working on adding more
					integrations in the future.
				</p>
				<p class="leading-loose">Let us know if you have any requests for integrations.</p>
			</div>
		</div>
	</div>
</div>
