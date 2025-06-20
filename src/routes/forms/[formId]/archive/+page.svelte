<script lang="ts">
	import Header from '$lib/ui/Header.svelte';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import NotebookPen from '@lucide/svelte/icons/notebook-pen';
	import ArchiveRestore from '@lucide/svelte/icons/archive-restore';
	import type { PageProps } from './$types';
	import { enhance } from '$app/forms';

	let { data }: PageProps = $props();

	function formatDate(date: string) {
		const dateObject = new Date(date);
		const normalizedDateObject = new Date(dateObject.getTime() + 4 * 60 * 60 * 1000);
		const intlObj = new Intl.DateTimeFormat('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			hour12: true
		});
		return intlObj.format(normalizedDateObject);
	}
</script>

<Header user={data.user} />
<div class="pb-32">
	<div class="mx-auto flex w-full max-w-5xl items-start justify-between pt-10">
		<div>
			<div class="flex items-center gap-4 pb-2 text-sm font-medium text-zinc-500">
				<a href="/">Apps</a>
				<ChevronRight size={16} class="stroke-zinc-500" />
				<a href={`/apps/${data.form.appId}`}>{data.form.app.name}</a>
				<ChevronRight size={16} class="stroke-zinc-500" />
				<a href={`/forms/${data.form.id}`} class="flex items-center gap-2"
					><NotebookPen size={16} class="stroke-zinc-500" />{data.form.name}</a
				>
			</div>
			<h1 class="pb-2 text-3xl font-semibold tracking-tight">Archived Responses</h1>
		</div>
	</div>
	<div class="mx-auto mt-10 flex w-full max-w-5xl flex-col gap-4">
		{#each data.form.responses as response (response.id)}
			{@const version = data.form.versions.find((version) => version.id === response.formVersionId)}
			<div class="flex flex-col gap-2 rounded-sm border border-zinc-300 bg-zinc-100 p-1">
				<div class="mb-2 flex items-center justify-between border-b border-zinc-300 pb-1 text-xs">
					<span class="italic">{formatDate(response.createdAt)}</span>
					<div>
						<form action="/responses/{response.id}?/restore" use:enhance method="POST">
							<button
								title="Restore response"
								type="submit"
								class="rounded-md border border-zinc-300 bg-white p-0.5 shadow-sm"
								><ArchiveRestore size={14} /></button
							>
						</form>
					</div>
				</div>
				{#each Object.entries(response.response) as field (field[0])}
					<div>
						<p class="mb-1 text-xs font-medium text-zinc-500">
							{version.fields.find((_field) => _field.id === field[0]).label}
						</p>
						<p class="py-0.5 text-sm">{field[1]}</p>
					</div>
				{/each}
			</div>
		{/each}
	</div>
	{#if data.form.responses.length === 0}
		<div class="mt-10 flex justify-center">
			<div class="flex flex-col items-center gap-1 text-sm">
				<p class="font-medium">No responses</p>
				<p class="text-zinc-500">Use our APIs to start collecting responses for your form</p>
			</div>
		</div>
	{/if}
</div>
