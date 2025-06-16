<script lang="ts">
	import { enhance } from '$app/forms';
	import Header from '$lib/ui/Header.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Header user={data.user} />

<div class="mx-auto w-full max-w-sm pt-10 pb-32">
	<h1 class="pb-10 text-3xl font-semibold tracking-tight">Create app</h1>
	<form method="POST" use:enhance class="flex flex-col gap-6">
		<div class="flex flex-col gap-2">
			<label for="name" class="text-sm font-medium">Name</label>
			<input
				id="name"
				name="name"
				type="text"
				class="appearance-none rounded-md border border-zinc-300 focus-visible:border-blue-600"
			/>
		</div>
		<div class="flex flex-col gap-2">
			<label for="url" class="text-sm font-medium">URL</label>
			<input
				id="url"
				name="url"
				type="url"
				class="appearance-none rounded-md border-zinc-300 focus-visible:border-blue-600"
			/>
		</div>
		<div class="flex justify-end gap-2">
			<a
				href="/"
				class="rounded-xl px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
				>Cancel</a
			>
			<button
				class="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600/90"
				>Create</button
			>
		</div>
	</form>
</div>
