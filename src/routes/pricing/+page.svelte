<script lang="ts">
	import Header from '$lib/ui/Header.svelte';
	import Check from '@lucide/svelte/icons/check';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Header user={data.user} />

<svelte:head>
	<title>Pricing | DevMatter</title>
</svelte:head>

<div class="mx-auto w-full max-w-xl px-4 pt-10 pb-32 lg:max-w-3xl xl:max-w-5xl">
	<p class="mb-3 text-center text-3xl font-semibold tracking-tight text-balance">
		The best way to collect form submissions; made for developers
	</p>
	<p class="mx-auto w-full max-w-3xl text-center font-medium text-balance text-zinc-500">
		Generous free tier to support your early projects, with a simple and cost-effective plan for
		your growing business.
	</p>

	<div class="mx-auto mt-20 grid w-full max-w-2xl grid-cols-2 gap-2">
		<div class="col-span-2 rounded-xl border border-zinc-300 p-4 px-8 pb-8 shadow-sm sm:col-span-1">
			<div class="flex items-center justify-between">
				<p class="text-lg font-semibold tracking-tight">Free</p>
				<div>
					<p class="text-3xl font-bold">
						<span class="text-2xl font-normal text-zinc-500">$</span>0
					</p>
					<p class="text-sm text-zinc-500">per month</p>
				</div>
			</div>
			<div class="flex justify-stretch">
				<a
					href="/signup"
					class="mt-10 w-full rounded-lg bg-zinc-800 py-2 text-center text-sm font-medium text-white transition hover:bg-zinc-800/90"
					>Get started</a
				>
			</div>
			<div class="mt-10 flex flex-col gap-4 text-sm">
				<div class="flex items-center gap-2">
					<Check size={16} class="stroke-blue-600" />
					<p>1 app</p>
				</div>
				<div class="flex items-center gap-2">
					<Check size={16} class="stroke-blue-600" />
					<p>2 forms</p>
				</div>
				<div class="flex items-center gap-2">
					<Check size={16} class="stroke-blue-600" />
					<p>100 submissions/month</p>
				</div>
			</div>
		</div>
		<div class="col-span-2 rounded-xl border border-zinc-300 p-4 px-8 pb-8 shadow-sm sm:col-span-1">
			<div class="flex items-center justify-between">
				<p class="text-lg font-semibold tracking-tight">Launch</p>
				<div>
					<p class="text-3xl font-bold">
						<span class="text-2xl font-normal text-zinc-500">$</span>9
					</p>
					<p class="text-sm text-zinc-500">per month</p>
				</div>
			</div>
			<div class="flex justify-stretch">
				<a
					href="/signup"
					class="mt-10 w-full rounded-lg bg-blue-600 py-2 text-center text-sm font-medium text-white transition hover:bg-blue-600/90"
					>Get started</a
				>
			</div>
			<div class="mt-10 flex flex-col gap-4 text-sm">
				<div class="flex items-center gap-2">
					<Check size={16} class="stroke-blue-600" />
					<p>5 apps</p>
				</div>
				<div class="flex items-center gap-2">
					<Check size={16} class="stroke-blue-600" />
					<p>20 forms</p>
				</div>
				<div class="flex items-center gap-2">
					<Check size={16} class="stroke-blue-600" />
					<p>1000 submissions/month</p>
				</div>
			</div>
		</div>
	</div>

	<div
		class="mx-auto mt-10 w-full max-w-2xl rounded-xl border border-zinc-300 p-4 text-center text-sm shadow-md"
	>
		Need more features or limits? <a href="/contact" class="underline">Contact us</a> for a custom plan!
	</div>
</div>
