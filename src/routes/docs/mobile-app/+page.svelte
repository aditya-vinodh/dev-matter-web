<script lang="ts">
	import Header from '$lib/ui/Header.svelte';
	import Sidebar from '$lib/ui/DocsSidebar.svelte';
	import DropdownMenu from '$lib/ui/DocsDropdownMenu.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Header user={data.user} />

<svelte:head>
	<title>Mobile App | DevMatter Docs</title>
</svelte:head>

<div class="mx-auto w-full max-w-xl pt-10 pb-32 lg:max-w-3xl xl:max-w-5xl">
	<div class="grid grid-cols-10">
		<div class="hidden flex-col gap-6 text-sm lg:col-span-2 lg:flex">
			<Sidebar url="/docs/mobile-app" />
		</div>
		<div class="col-span-12 mb-10 px-4 lg:hidden">
			<DropdownMenu url="/docs/mobile-app" name="Mobile app" />
		</div>
		<div class="col-span-12 px-4 lg:col-span-8 lg:px-10">
			<h1 class="mb-10 text-3xl font-semibold tracking-tight">Mobile app</h1>
			<div class="flex flex-col gap-8">
				<p class="leading-loose">
					We have a native mobile app that you can download from the App Store. The app is in open
					beta and we are looking for feedback. To download the app, join the TestFlight beta
					program.
				</p>

				<a
					href="https://testflight.apple.com/join/MYgv4nYe"
					target="_blank"
					class="flex w-fit items-center gap-2 rounded-lg bg-zinc-100 p-1 pr-2 text-sm font-medium transition hover:bg-zinc-200"
				>
					<enhanced:img src="$lib/images/testflight.png?w=100" class="size-7 rounded-[5.5px]" />
					Join Beta</a
				>

				<p class="leading-loose">
					Currently we only support iOS. We will be adding support for Android if sufficient
					interest exists.
				</p>
			</div>
		</div>
	</div>
</div>
