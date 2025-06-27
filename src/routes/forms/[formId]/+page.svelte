<script lang="ts">
	import Header from '$lib/ui/Header.svelte';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import NotebookPen from '@lucide/svelte/icons/notebook-pen';
	import Lock from '@lucide/svelte/icons/lock';
	import Globe from '@lucide/svelte/icons/globe';
	import Archive from '@lucide/svelte/icons/archive';
	import Trash from '@lucide/svelte/icons/trash';
	import X from '@lucide/svelte/icons/x';
	import type { PageProps } from './$types';
	import { Toaster, toast } from 'svelte-sonner';
	import { enhance } from '$app/forms';
	import { AlertDialog } from 'bits-ui';

	let { data }: PageProps = $props();
	let formResponses = $state(data.form.responses);
	let responseCount = $state(data.form.responseCount);

	let formNameChanged = $state(false);

	// eslint-disable-next-line
	let fields = $state(getLatestVersion(data.form.versions).fields);
	let formDirty = $state(false);
	let formInvalid = $derived(isFormInvalid(fields));

	$effect(() => {
		fields = getLatestVersion(data.form.versions).fields;
	});

	let nameForm: HTMLFormElement | undefined = $state();

	function isFormInvalid(fields: { id: string }[]) {
		const set = new Set();
		for (const field of fields) {
			set.add(field.id);
		}

		if (set.size !== fields.length) {
			return true;
		} else {
			return false;
		}
	}

	function getLatestVersion(
		versions: {
			versionNumber: number;
			fields: { id: string; label: string; required: boolean; type: string }[];
		}[]
	) {
		return versions.reduce((latest, current) =>
			current.versionNumber > latest.versionNumber ? current : latest
		);
	}

	function generateUniqueId(baseLabel: string, excludeIndex: number = -1) {
		const baseId = baseLabel.toLowerCase().trim().replaceAll(' ', '-');

		// Start with the base ID
		let uniqueId = baseId;
		let counter = 1;

		// Keep incrementing counter until we find a unique ID
		while (fields.some((field, i) => i !== excludeIndex && field.id === uniqueId)) {
			uniqueId = `${baseId}-${counter}`;
			counter++;
		}

		return uniqueId;
	}

	function addFields() {
		const newField = {
			id: generateUniqueId('New Field'),
			type: 'string',
			label: 'New Field',
			required: false
		};
		fields.push(newField);
		formDirty = true;
	}

	function labelInput(index: number) {
		const labelValue = fields[index].label;
		fields[index].id = generateUniqueId(labelValue, index);
		formDirty = true;
	}

	function deleteField(index: number) {
		fields.splice(index, 1);
		formDirty = true;
	}

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
			<form action="?/updateName" method="POST" use:enhance bind:this={nameForm}>
				<input
					value={data.form.name}
					onblur={() => formNameChanged && nameForm.submit()}
					name="name"
					oninput={() => (formNameChanged = true)}
					aria-label="Form name"
					class="mb-2 cursor-text appearance-none rounded-lg border-transparent p-0 text-3xl font-semibold tracking-tight transition hover:bg-zinc-100 focus-visible:border focus-visible:border-blue-600 focus-visible:ring-1 focus-visible:ring-blue-600 focus-visible:outline-none"
				/>
			</form>
			<div class="flex items-center gap-2 text-sm font-medium text-zinc-500">
				<span class="font-semibold text-green-600">POST</span>https://api.devmatter.com/forms/{data
					.form.id}
			</div>
		</div>
		<div class="flex flex-col items-end gap-2">
			<p class="flex items-center gap-2 text-sm font-medium text-zinc-500">
				{#if data.form.public}
					<Globe size={16} class="stroke-zinc-500" /><span
						>This is a public form. It can be submitted by anyone on the internet.</span
					>
				{:else}
					<Lock size={16} class="stroke-zinc-500" /><span
						>This is a private form. It needs a
						<u>secret key</u> to be submitted.</span
					>
				{/if}
			</p>
			<div class="flex items-center gap-2">
				<form action="?/updateVisibility" use:enhance method="POST">
					<input type="hidden" name="public" value={!data.form.public} />
					<button
						type="submit"
						class="flex w-fit items-center gap-2 rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
					>
						{#if data.form.public}
							<Lock size={16} class="stroke-zinc-700" />Make private
						{:else}
							<Globe size={16} class="stroke-zinc-700" />Make public{/if}
					</button>
				</form>
				<AlertDialog.Root>
					<AlertDialog.Trigger
						class="flex w-fit items-center gap-2 rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50"
					>
						<Trash size={16} class="stroke-red-700" />Delete
					</AlertDialog.Trigger>
					<AlertDialog.Portal>
						<AlertDialog.Overlay
							class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/30"
						/>
						<AlertDialog.Content
							class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white shadow-xl outline-hidden sm:max-w-[490px] md:w-full"
						>
							<div class="px-5 pt-5">
								<h3 class="font-medium">Delete form</h3>
								<p class="mb-5 text-sm text-balance text-zinc-500">
									Are you sure you want to delete this form? This is action can not be undone. It
									will delete all the responses associated with it.
								</p>
							</div>
							<div
								class="mt-5 flex items-center justify-end gap-3 rounded-b-xl bg-zinc-50 p-5 py-3"
							>
								<form action="/forms/{data.form.id}?/delete" method="POST" use:enhance>
									<AlertDialog.Cancel
										type="button"
										class="rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
										>Cancel</AlertDialog.Cancel
									>
									<AlertDialog.Action
										type="submit"
										class="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600/90"
										>Delete</AlertDialog.Action
									>
								</form>
							</div>
						</AlertDialog.Content>
					</AlertDialog.Portal>
				</AlertDialog.Root>
			</div>
		</div>
	</div>
	<div class="mx-auto mt-10 w-full max-w-5xl">
		<div class="grid w-full grid-cols-12 gap-4">
			<div class="col-span-3">
				<h2 class="mb-3 text-lg font-medium tracking-tight">Schema</h2>

				<form
					action="?/updateSchema"
					method="POST"
					use:enhance={() => {
						return async ({ result }) => {
							if (result.type === 'success') {
								formDirty = false;
							}
						};
					}}
				>
					{#each fields as field, i (i)}
						<div
							class="relative mb-5 flex flex-col gap-4 rounded-sm border border-zinc-300 bg-zinc-100 p-1"
						>
							{#if fields.length > 1}
								<button
									type="button"
									onclick={() => deleteField(i)}
									class="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-400 text-white transition hover:bg-zinc-500"
									aria-label="Delete field"
								>
									<X size={12} />
								</button>
							{/if}
							<div class="flex flex-col gap-1">
								<label for="label" class="text-xs font-medium">Label</label>
								<input
									type="text"
									id="label"
									name="label"
									bind:value={field.label}
									oninput={(e) => {
										labelInput(i);
									}}
									pattern="[a-zA-Z0-9 ]+"
									class="appearance-none rounded-sm border-zinc-300 p-0.5 text-sm focus-visible:border-blue-600 focus-visible:ring-blue-600"
								/>
							</div>
							<div class="flex flex-col gap-1">
								<label for="id" class="text-xs font-medium">ID</label>
								<input
									type="text"
									id="id"
									name="id"
									bind:value={field.id}
									oninput={(e) => (formDirty = true)}
									class="appearance-none rounded-sm border-zinc-300 p-0.5 text-sm focus-visible:border-blue-600 focus-visible:ring-blue-600"
								/>
							</div>
							<div class="flex flex-col gap-1">
								<label for="type" class="text-xs font-medium">Type</label>
								<select
									id="type"
									name="type"
									bind:value={field.type}
									oninput={(e) => (formDirty = true)}
									class="appearance-none rounded-sm border-zinc-300 p-0.5 text-sm focus-visible:border-blue-600 focus-visible:ring-blue-600"
								>
									<option value="string">string</option>
									<option value="number">number</option>
								</select>
							</div>
							<div class="flex items-center gap-2">
								<label for="required" class="text-xs font-medium">Required</label>
								<input
									type="checkbox"
									bind:checked={field.required}
									id="required"
									name="required"
									oninput={(e) => (formDirty = true)}
									value={field.required}
									class="appearance-none rounded-sm border-zinc-300 p-0.5 text-sm focus-visible:border-blue-600 focus-visible:ring-blue-600"
								/>
							</div>
						</div>
					{/each}

					<div class="flex items-center gap-2">
						<button
							type="button"
							class="rounded-lg border border-zinc-300 px-2 py-1 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100"
							onclick={addFields}>Add field</button
						>
						{#if formDirty}
							<button
								type="submit"
								class="rounded-lg border border-transparent bg-blue-600 px-2 py-1 text-xs font-medium text-white transition hover:bg-blue-600/90 disabled:bg-zinc-300"
								disabled={formInvalid}>Update schema</button
							>
						{/if}
					</div>
				</form>
			</div>
			<div class="col-span-9">
				<div class="mb-3 flex items-center justify-between">
					<h2 class="flex items-center gap-2 text-lg font-medium tracking-tight">
						Responses <span
							class="rounded-lg border border-blue-300 bg-blue-100 p-0.5 px-2 text-sm text-blue-900"
							>{responseCount}</span
						>
					</h2>
					<a
						href="/forms/{data.form.id}/archive"
						class="flex items-center gap-2 text-sm text-zinc-500 underline"
						><Archive size={16} /> View archive</a
					>
				</div>
				<div class="flex flex-col gap-4">
					{#each formResponses as response (response.id)}
						{@const version = data.form.versions.find(
							(version) => version.id === response.formVersionId
						)}
						<div class="flex flex-col gap-2 rounded-sm border border-zinc-300 bg-zinc-100 p-1">
							<div
								class="mb-2 flex items-center justify-between border-b border-zinc-300 pb-1 text-xs"
							>
								<span class="italic">{formatDate(response.createdAt)}</span>
								<div class="flex items-center gap-1">
									<form
										action="/responses/{response.id}?/archive"
										use:enhance={() => {
											return async (event) => {
												if (event.result.type === 'success') {
													toast.success('Response has been archived!');
													formResponses = formResponses.filter(
														(_response) => _response.id !== response.id
													);
												}
											};
										}}
										method="POST"
									>
										<button
											title="Archive response"
											type="submit"
											class="rounded-md border border-zinc-300 bg-white p-0.5 shadow-sm"
											><Archive size={14} /></button
										>
									</form>
									<AlertDialog.Root>
										<AlertDialog.Trigger
											class="rounded-md border border-zinc-300 bg-white p-0.5 text-red-800 shadow-sm"
											title="Delete response"
										>
											<Trash size={14} />
										</AlertDialog.Trigger>
										<AlertDialog.Portal>
											<AlertDialog.Overlay
												class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/30"
											/>
											<AlertDialog.Content
												class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white shadow-xl outline-hidden sm:max-w-[490px] md:w-full"
											>
												<div class="px-5 pt-5">
													<h3 class="font-medium">Delete response</h3>
													<p class="mb-5 text-sm text-balance text-zinc-500">
														Are you sure you want to delete this response? This action cannot be
														undone.
													</p>
												</div>
												<div
													class="mt-5 flex items-center justify-end gap-3 rounded-b-xl bg-zinc-50 p-5 py-3"
												>
													<AlertDialog.Cancel
														type="button"
														class="rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm
														font-medium text-zinc-700 transition hover:bg-zinc-100">Cancel</AlertDialog.Cancel
													>
													<form
														action="/responses/{response.id}?/delete"
														method="POST"
														use:enhance={() => {
															return async (event) => {
																if (event.result.type === 'success') {
																	toast.success('Response deleted!');
																	formResponses = formResponses.filter((r) => response.id !== r.id);
																	responseCount = responseCount - 1;
																}
															};
														}}
													>
														<AlertDialog.Action
															type="submit"
															class="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600/90"
															>Delete</AlertDialog.Action
														>
													</form>
												</div>
											</AlertDialog.Content>
										</AlertDialog.Portal>
									</AlertDialog.Root>
								</div>
							</div>
							<!-- {#each Object.entries(response.response) as field (field[0])}
								<div>
									<p class="mb-1 text-xs font-medium text-zinc-500">
										{version.fields.find((_field) => _field.id === field[0]).label}
									</p>
									<p class="py-0.5 text-sm">{field[1]}</p>
								</div>
							{/each} -->
							{#each version.fields as field (field.id)}
								{#if response.response[field.id]}
									<div>
										<p class="mb-1 text-xs font-medium text-zinc-500">
											{field.label}
										</p>
										<p class="py-0.5 text-sm">{response.response[field.id]}</p>
									</div>
								{/if}
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
		</div>
	</div>
</div>

<Toaster />
