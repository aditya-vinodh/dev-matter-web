<script lang="ts">
	import Header from '$lib/ui/Header.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const versions = [
		{
			tag: 'v0.4',
			title: 'File support',
			description:
				'Added support for uploading files to forms. Any format or number: up to total response size of 20MB.',
			date: 'Jul 14, 2025'
		},
		{
			tag: 'v0.3',
			title: 'Form redirects',
			description:
				'Added support for controlling submission response: JSON or Redirect. Users can set redirect URLs along with parameters.',
			date: 'Jul 8, 2025'
		},
		{
			tag: 'v0.2',
			title: 'OAuth Sign-In',
			description:
				'Added support for sign-in using Google and GitHub for a frictionless experience.',
			date: 'Jul 7, 2025'
		},
		{
			tag: 'v0.1',
			title: 'Initial Release',
			description:
				'Core form feature: accept submissions on private/public forms, view results and receive realtime push notifications on our app.',
			date: 'Jun 27, 2025'
		}
	];
</script>

<Header user={data.user} />

<svelte:head>
	<title>Changelog | DevMatter</title>
</svelte:head>

<div class="mx-auto flex w-full max-w-xl flex-col gap-4 px-4 pt-10 pb-32 lg:max-w-3xl xl:max-w-5xl">
	<h1 class="mb-2 text-3xl font-semibold tracking-tight">Changelog</h1>

	<div class="flex flex-col">
		{#each versions as version (version.tag)}
			<div class="grid grid-cols-12 border-t border-zinc-300 py-4">
				<div
					class="col-span-12 mb-6 flex items-center gap-3.5 pl-2 sm:col-span-2 sm:mb-0 sm:flex-col sm:justify-center sm:pl-0"
				>
					<div>
						<span
							class="rounded-xl border border-blue-500 bg-blue-600 p-1 px-2 text-sm text-white shadow-md"
							>{version.tag}</span
						>
					</div>
					<div class="text-xs text-zinc-500 italic">{version.date}</div>
				</div>
				<div class="col-span-12 px-2 sm:col-span-10">
					<h2 class="mb-2 text-lg font-medium">{version.title}</h2>
					<p class="text-sm text-pretty text-gray-500">{version.description}</p>
				</div>
			</div>
		{/each}
	</div>
</div>
