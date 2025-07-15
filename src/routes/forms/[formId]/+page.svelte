<script lang="ts">
	import Header from '$lib/ui/Header.svelte';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import NotebookPen from '@lucide/svelte/icons/notebook-pen';
	import Lock from '@lucide/svelte/icons/lock';
	import Globe from '@lucide/svelte/icons/globe';
	import Archive from '@lucide/svelte/icons/archive';
	import Trash from '@lucide/svelte/icons/trash';
	import Image from '@lucide/svelte/icons/image';
	import File from '@lucide/svelte/icons/file';
	import X from '@lucide/svelte/icons/x';
	import type { PageProps } from './$types';
	import { Toaster, toast } from 'svelte-sonner';
	import { enhance } from '$app/forms';
	import { AlertDialog, Toggle, Dialog } from 'bits-ui';
	import { onMount } from 'svelte';
	import { formatBytes } from '$lib/format-bytes';

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

	onMount(() => {
		for (let i = 0; i < fields.length; i++) {
			if (successUrl.includes(`@${fields[i].id}`)) {
				successUrlInput.innerHTML = successUrl.replaceAll(
					`@${fields[i].id}`,
					`<span style="background-color: #f4f4f5; font-weight: 500; border-radius: 5px; padding-left: 0.5px; padding-right: 0.5px;">@${fields[i].id}</span>`
				);
			}
		}
	});

	let nameForm: HTMLFormElement | undefined = $state();

	let redirectOnSubmitForm: HTMLFormElement | undefined = $state();
	let redirectUrlFormDirty = $state(false);

	let redirectOnSubmit = $state(data.form.redirectOnSubmit);
	let successUrl = $state(data.form.successUrl);
	let failureUrl = $state(data.form.failureUrl);
	let successUrlInput: HTMLDivElement | undefined = $state();

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

	async function updateRedirectOnSubmit() {
		if (redirectOnSubmitForm) {
			redirectOnSubmitForm.submit();
		}
	}

	function setCursorPosition(element, position) {
		const range = document.createRange();
		const selection = window.getSelection();

		let charIndex = 0;
		let nodeStack = [element];
		let node,
			foundStart = false;

		range.setStart(element, 0);
		range.collapse(true);

		// Find the text node and offset for the position
		while (!foundStart && (node = nodeStack.pop())) {
			if (node.nodeType === Node.TEXT_NODE) {
				const nextCharIndex = charIndex + node.textContent.length;
				if (position >= charIndex && position <= nextCharIndex) {
					range.setStart(node, position - charIndex);
					foundStart = true;
				}
				charIndex = nextCharIndex;
			} else {
				for (let i = node.childNodes.length - 1; i >= 0; i--) {
					nodeStack.push(node.childNodes[i]);
				}
			}
		}

		selection.removeAllRanges();
		selection.addRange(range);
	}
</script>

<Header user={data.user} />
<div class="pb-32">
	<div
		class="mx-auto flex w-full max-w-5xl flex-col items-start justify-between gap-10 px-4 pt-10 lg:flex-row"
	>
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
				<span class="font-semibold text-green-600">POST</span>https://api.devmatter.app/forms/{data
					.form.id}
			</div>
		</div>
		<div class="flex flex-col items-start gap-2 lg:items-end">
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
	<div class="mx-auto mt-10 w-full max-w-5xl px-4">
		<div class="flex w-full grid-cols-12 flex-col gap-20 md:grid md:gap-4">
			<div class="md:col-span-3">
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
									<option value="files">files</option>
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
				<h2 class="mt-10 mb-3 flex items-center gap-2 text-lg font-medium tracking-tight">
					Response Handling
				</h2>
				<Toggle.Root
					onPressedChange={updateRedirectOnSubmit}
					bind:pressed={redirectOnSubmit}
					aria-label="Toggle redirect on submit"
					class="flex items-center gap-2 rounded-xl bg-zinc-100 px-1.5 py-1 text-sm"
				>
					<div class="rounded-lg transition {redirectOnSubmit ? '' : 'bg-zinc-200'} p-1">JSON</div>
					<div class="rounded-lg p-1 transition {redirectOnSubmit ? 'bg-zinc-200' : ''}">
						Redirect
					</div>
				</Toggle.Root>
				<form
					use:enhance
					bind:this={redirectOnSubmitForm}
					method="POST"
					action="/forms/{data.form.id}?/updateRedirectOnSubmit"
					class="hidden"
				>
					<input type="text" name="redirectOnSubmit" value={redirectOnSubmit ? 'false' : 'true'} />
				</form>

				{#if redirectOnSubmit}
					<form
						use:enhance={() => {
							return async (event) => {
								if (event.result.type === 'success') {
									redirectUrlFormDirty = false;
								}
							};
						}}
						method="POST"
						action="/forms/{data.form.id}?/updateRedirectUrls"
						class="mt-2 flex flex-col gap-4"
					>
						<div>
							<label for="success-url" class="text-xs font-medium">Success URL</label>
							<input
								type="text"
								id="success-url"
								name="successUrl"
								value={successUrl}
								class="hidden"
								placeholder="https://yourapp.com/form/success"
							/>
							<div
								bind:this={successUrlInput}
								contenteditable="plaintext-only"
								oninput={() => {
									redirectUrlFormDirty = true;

									successUrl = successUrlInput?.textContent;

									// save cursor position
									const selection = window.getSelection();
									const range = selection?.getRangeAt(0);
									const preCaretRange = range?.cloneRange();
									preCaretRange?.selectNodeContents(successUrlInput);
									preCaretRange?.setEnd(range?.endContainer, range?.endOffset);
									const cursorPosition = preCaretRange?.toString().length;

									successUrlInput.innerHTML = successUrl;

									for (let i = 0; i < fields.length; i++) {
										if (successUrl.includes(`@${fields[i].id}`)) {
											successUrlInput.innerHTML = successUrl.replaceAll(
												`@${fields[i].id}`,
												`<span style="background-color: #f4f4f5; font-weight: 500; border-radius: 5px; padding-left: 0.5px; padding-right: 0.5px;">@${fields[i].id}</span>`
											);
										}
									}

									// restore cursor position
									setCursorPosition(successUrlInput, cursorPosition);
								}}
								class="w-full overflow-hidden rounded-sm border border-zinc-300 p-0.5 text-sm placeholder:text-zinc-400 focus-visible:border-blue-600"
							>
								{data.form.successUrl}
							</div>
							{#if successUrl === ''}
								<!-- Placeholder -->
								<div
									class="pointer-events-none absolute translate-x-[3px] translate-y-[-23px] text-sm text-zinc-400 select-none"
								>
									https://yourapp.com/form/success
								</div>
							{/if}
						</div>
						<div>
							<label for="failure-url" class="text-xs font-medium">Failure URL</label>
							<input
								type="text"
								id="failure-url"
								name="failureUrl"
								value={data.form.failureUrl}
								oninput={() => (redirectUrlFormDirty = true)}
								class="w-full rounded-sm border border-zinc-300 p-0.5 text-sm placeholder:text-zinc-400 focus-visible:border-blue-600"
								placeholder="https://yourapp.com/form/failure"
							/>
						</div>
						{#if redirectUrlFormDirty}
							<button
								class="w-fit rounded-lg border border-transparent bg-blue-600 px-2 py-1 text-xs font-medium text-white transition hover:bg-blue-600/90 disabled:bg-zinc-300"
								>Update redirect URLs</button
							>
						{/if}
					</form>
				{/if}
			</div>
			<div class="md:col-span-9">
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
									{@const value = response.response[field.id]}
									<div>
										<p class="mb-1 text-xs font-medium text-zinc-500">
											{field.label}
										</p>
										{#if typeof value === 'string' || typeof value === 'number'}
											<p class="py-0.5 text-sm">{response.response[field.id]}</p>
										{:else}
											<div class="flex flex-wrap items-center gap-4">
												{#each value.files as file (file.key)}
													<Dialog.Root>
														<Dialog.Trigger
															class="flex items-center gap-2 rounded-sm border border-blue-950/10 bg-blue-100 p-1"
														>
															<div class="row-span-6 flex flex-col items-center justify-center">
																{#if file.content_type.startsWith('image')}
																	<Image size={24} strokeWidth={1.5} class="stroke-blue-950" />
																{:else}
																	<File size={24} strokeWidth={1.5} class="stroke-blue-950" />
																{/if}
															</div>
															<div class="flex flex-col gap-1">
																<div class="row-span-3 text-left text-sm text-blue-950">
																	{file.name}
																</div>
																<div
																	class="row-span-3 flex flex-col justify-end text-left text-xs text-blue-900/50"
																>
																	{formatBytes(file.size)}
																</div>
															</div>
														</Dialog.Trigger>
														<Dialog.Portal>
															<Dialog.Overlay
																class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/30"
															/>
															<Dialog.Content
																class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 h-[90vh] w-[90vw] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white shadow-xl outline-hidden"
															>
																<div class="flex h-full flex-col items-center justify-center">
																	<div
																		class="flex w-full shrink-0 items-center justify-between rounded-t-xl bg-zinc-100 p-2 text-left"
																	>
																		<div class="flex flex-col text-sm">
																			<span>{file.name}</span>
																			<span class="text-xs text-zinc-500"
																				>{formatBytes(file.size)}</span
																			>
																		</div>
																		<div class="flex items-center gap-4 pr-2">
																			<a
																				href={file.url}
																				target="_blank"
																				download
																				class="rounded-xl bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800/90"
																				>Download</a
																			>
																			<Dialog.Close><X size={16} /></Dialog.Close>
																		</div>
																	</div>
																	<div
																		class="flex h-max w-full grow flex-col justify-center overflow-hidden py-4"
																	>
																		{#if file.content_type.startsWith('image')}
																			<img
																				src={file.url}
																				alt="preview"
																				class="mx-auto h-full max-h-[calc(90vh-82px)] w-full max-w-max object-contain object-center"
																			/>
																		{:else if file.content_type === 'application/pdf'}
																			<iframe
																				title="PDF Preview"
																				src={file.url}
																				class="h-full max-h-[calc(90vh-82px)] w-full"
																			></iframe>
																		{:else}
																			<p class="mt-20 px-10 text-center text-balance text-zinc-600">
																				We can't show a preview of this file. Please download to
																				view it.
																			</p>
																		{/if}
																	</div>
																</div>
															</Dialog.Content>
														</Dialog.Portal>
													</Dialog.Root>
												{/each}
											</div>
										{/if}
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
