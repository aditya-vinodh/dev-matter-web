<script lang="ts">
	import Header from '$lib/ui/Header.svelte';
	import Link from '@lucide/svelte/icons/link';
	import KeyRound from '@lucide/svelte/icons/key-round';
	import Pencil from '@lucide/svelte/icons/pencil';
	import Plus from '@lucide/svelte/icons/plus';
	import Lock from '@lucide/svelte/icons/lock';
	import Globe from '@lucide/svelte/icons/globe';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import EllipsisVertical from '@lucide/svelte/icons/ellipsis-vertical';
	import Trash from '@lucide/svelte/icons/trash';
	import RotateCcwKey from '@lucide/svelte/icons/rotate-ccw-key';
	import Copy from '@lucide/svelte/icons/copy';
	import Check from '@lucide/svelte/icons/check';
	import { DropdownMenu, Dialog, AlertDialog } from 'bits-ui';
	import type { PageProps } from './$types';
	import { enhance } from '$app/forms';

	let { data }: PageProps = $props();

	let editAppDialog = $state(false);
	let app = $state(data.app);

	let deleteAppDialog = $state(false);

	let secretKeys = $state(data.app.secretKeys);

	let createSecretKeyDialog = $state(false);
	let newSecretKey = $state('');
	let newSecretKeyName = $state('');
	let newSecretKeyDialog = $state(false);
	let revokeKeyDialog = $state(false);
	let revokeKeyId = $state(null);

	let copied = $state(false);
</script>

<Header user={data.user} />
<div class="pb-32">
	<div class="mx-auto flex w-full max-w-5xl items-center justify-between px-4 pt-10">
		<div>
			<div class="flex items-center gap-4 pb-2 text-sm font-medium text-zinc-500">
				<a href="/">Apps</a>
				<ChevronRight size={16} class="stroke-zinc-500" />
				<a href={`/apps/${app.id}`}>{app.name}</a>
			</div>
			<h1 class="pb-2 text-3xl font-semibold tracking-tight">{app.name}</h1>
			<a
				href={app.url}
				target="_blank"
				class="flex items-center gap-2 text-sm font-medium text-zinc-500"
				><Link size={14} class="stroke-zinc-500" />{app.url}</a
			>
		</div>
		<div class="flex items-center gap-2">
			<Dialog.Root bind:open={editAppDialog}>
				<Dialog.Trigger
					class="flex items-center gap-2 rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
				>
					<Pencil size={16} class="stroke-zinc-700" />Edit
				</Dialog.Trigger>
				<Dialog.Portal>
					<Dialog.Overlay
						class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/30"
					/>
					<Dialog.Content
						class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white shadow-xl outline-hidden sm:max-w-[490px] md:w-full"
					>
						<div class="p-5">
							<h3 class="font-medium">Edit app</h3>
						</div>
						<div>
							<form
								action="/apps/{data.app.id}?/update"
								method="POST"
								use:enhance={() => {
									return async (event) => {
										if (event.result.type === 'success') {
											editAppDialog = false;
											app.name = event.result.data.data.name;
											app.url = event.result.data.data.url;
										}
									};
								}}
								class="flex flex-col gap-6"
							>
								<div class="flex flex-col gap-2 px-5">
									<label for="name" class="text-sm font-medium">Name</label>
									<input
										type="text"
										id="name"
										name="name"
										value={app.name}
										required
										class="w-full appearance-none rounded-md border border-zinc-300 focus-visible:border-blue-600"
									/>
								</div>
								<div class="flex flex-col gap-2 px-5">
									<label for="url" class="text-sm font-medium">URL</label>
									<input
										type="url"
										id="url"
										name="url"
										value={app.url}
										required
										class="w-full appearance-none rounded-md border border-zinc-300 focus-visible:border-blue-600"
									/>
								</div>
								<div
									class="mt-4 flex items-center justify-end gap-3 rounded-b-xl bg-zinc-50 p-5 py-3"
								>
									<button
										onclick={() => (editAppDialog = false)}
										type="button"
										class="rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
										>Cancel</button
									>
									<button
										type="submit"
										class="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600/90"
										>Update</button
									>
								</div>
							</form>
						</div>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
			<AlertDialog.Root bind:open={deleteAppDialog}>
				<AlertDialog.Trigger
					class="flex items-center gap-2 rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50"
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
						<div class="p-5 pb-0">
							<h3 class="font-medium">Delete app</h3>
							<p class="text-sm text-balance text-zinc-500">
								Are you sure you want to delete this app? All data associated with this app will be
								permanently deleted.
							</p>
						</div>
						<div>
							<form
								action="/apps/{data.app.id}?/delete"
								method="POST"
								use:enhance
								class="flex flex-col gap-6"
							>
								<div
									class="mt-5 flex items-center justify-end gap-3 rounded-b-xl bg-zinc-50 p-5 py-3"
								>
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
								</div>
							</form>
						</div>
					</AlertDialog.Content>
				</AlertDialog.Portal>
			</AlertDialog.Root>
		</div>
	</div>
	<div class="mx-auto mt-10 w-full max-w-5xl px-4 pb-10">
		<div class="flex items-center justify-between border-b border-zinc-300 pb-4">
			<h2 class="text-lg font-medium tracking-tight">Forms</h2>
			<form action="/forms/new?appId={data.app.id}" method="POST" use:enhance>
				<button
					class="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600/90"
					><Plus size={16} class="stroke-white" />Create</button
				>
			</form>
		</div>
		<div class="flex flex-col">
			{#each data.app.forms as form (form.id)}
				<a
					href={`/forms/${form.id}`}
					class="flex h-11 w-full items-center gap-4 px-2 py-2 transition hover:bg-zinc-100"
				>
					{#if form.public}
						<Globe size={18} />
					{:else}
						<Lock size={18} />
					{/if}
					{form.name}
				</a>
			{/each}
			{#if data.app.forms.length === 0}
				<div class="flex flex-col items-center gap-1 py-5 text-sm">
					<p class="font-medium">No forms</p>
					<p class="text-zinc-500">Create one to start collecting data</p>
				</div>
			{/if}
		</div>
	</div>
	<div class="mx-auto mt-10 w-full max-w-5xl px-4 pb-10">
		<div class="flex items-center justify-between border-b border-zinc-300 pb-4">
			<h2 class="text-lg font-medium tracking-tight">Secret Keys</h2>
			<Dialog.Root bind:open={createSecretKeyDialog}>
				<Dialog.Trigger
					class="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600/90"
					><Plus size={16} class="stroke-white" />Create
				</Dialog.Trigger>
				<Dialog.Portal>
					<Dialog.Overlay
						class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/30"
					/>
					<Dialog.Content
						class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white shadow-xl outline-hidden sm:max-w-[490px] md:w-full"
					>
						<div class="px-5 pt-5">
							<h3 class="font-medium">Create secret key</h3>
							<p class="mb-5 text-sm text-balance text-zinc-500">
								You can use this key to submit private forms securely. Provide a name so that you
								can identify it later.
							</p>
						</div>
						<form
							action="/apps/{data.app.id}/secret-keys"
							method="POST"
							use:enhance={() => {
								return async (event) => {
									if (event.result.type === 'success') {
										createSecretKeyDialog = false;
										newSecretKey = event.result.data?.key?.key as string;
										newSecretKeyDialog = true;

										secretKeys = [
											...secretKeys,
											{
												id: event.result.data?.key.id,
												name: newSecretKeyName,
												key: newSecretKey,
												createdAt: new Date().toString()
											}
										];

										newSecretKeyName = '';
									}
								};
							}}
						>
							<div class="flex flex-col gap-2 px-5">
								<label for="name" class="text-sm font-medium">Name</label>
								<input
									type="text"
									id="name"
									name="name"
									bind:value={newSecretKeyName}
									required
									class="w-full appearance-none rounded-md border border-zinc-300 focus-visible:border-blue-600"
								/>
							</div>
							<div
								class="mt-5 flex items-center justify-end gap-3 rounded-b-xl bg-zinc-50 p-5 py-3"
							>
								<button
									onclick={() => (createSecretKeyDialog = false)}
									type="button"
									class="rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
									>Cancel</button
								>
								<button
									type="submit"
									class="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600/90"
									>Create</button
								>
							</div>
						</form>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</div>
		{#if secretKeys.length === 0}
			<div class="flex flex-col items-center gap-1 py-5 text-sm">
				<p class="font-medium">No secret keys</p>
				<p class="text-zinc-500">Create one to use private forms</p>
			</div>
		{/if}
		{#each secretKeys as secretKey (secretKey.id)}
			<div class="flex w-full items-center justify-between px-2 py-2 transition hover:bg-zinc-100">
				<span class="flex items-center gap-4">
					<KeyRound size={18} />{secretKey.name}
				</span>
				<span class="flex items-center gap-4">
					<span class="text-sm text-zinc-500"
						>Created on {new Date(secretKey.createdAt).toLocaleDateString()}</span
					>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger class="rounded-xl p-1.5 transition hover:bg-white">
							<EllipsisVertical size={16} class="stroke-zinc-500" />
						</DropdownMenu.Trigger>
						<DropdownMenu.Portal>
							<DropdownMenu.Content
								align="end"
								class="w-48 rounded-lg border border-zinc-100 bg-white p-1 text-sm font-medium text-zinc-700 shadow-md"
							>
								<!-- <DropdownMenu.Group>
									<DropdownMenu.Item
										class="flex w-full items-center gap-2 rounded-lg p-1  transition hover:bg-zinc-100"
										><RotateCcwKey size={16} class="stroke-zinc-700" />Rotate key</DropdownMenu.Item
									>
								</DropdownMenu.Group> -->
								<DropdownMenu.Group>
									<DropdownMenu.Item
										onclick={() => {
											revokeKeyId = secretKey.id;
											revokeKeyDialog = true;
										}}
										class="flex w-full items-center gap-2 rounded-lg p-1 text-red-700 transition hover:bg-zinc-100"
										><Trash size={16} class="stroke-red-700" />Revoke key</DropdownMenu.Item
									>
								</DropdownMenu.Group>
							</DropdownMenu.Content>
						</DropdownMenu.Portal>
					</DropdownMenu.Root>
				</span>
			</div>
		{/each}
	</div>
</div>

<Dialog.Root bind:open={newSecretKeyDialog}>
	<Dialog.Portal>
		<Dialog.Overlay
			class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/30"
		/>
		<Dialog.Content
			escapeKeydownBehavior="ignore"
			class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white shadow-xl outline-hidden sm:max-w-[490px] md:w-full"
		>
			<div class="px-5 pt-5">
				<h3 class="font-medium">Save your secret key</h3>
				<p class="mb-5 text-sm text-balance text-zinc-500">
					Copy and save this key somewhere safe. We will not be able to show it to you again.
				</p>
			</div>

			<div class="flex gap-1 px-5">
				<div
					class="grow overflow-auto rounded-md bg-zinc-700 p-0.5 px-1 font-mono whitespace-nowrap text-white"
				>
					{newSecretKey}
				</div>
				<button
					class="rounded-md p-1 transition hover:bg-zinc-100"
					onclick={() => {
						navigator.clipboard.writeText(newSecretKey);
						copied = true;
						setTimeout(() => (copied = false), 3000);
					}}
				>
					{#if !copied}
						<Copy size={18} class="stroke-zinc-700" />
					{:else}
						<Check size={18} class="stroke-green-700" />
					{/if}
				</button>
			</div>
			<div class="mt-5 flex items-center justify-end gap-3 rounded-b-xl bg-zinc-50 p-5 py-3">
				<button
					onclick={() => (newSecretKeyDialog = false)}
					type="button"
					class="rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
					>Close</button
				>
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>

<Dialog.Root bind:open={revokeKeyDialog}>
	<Dialog.Portal>
		<Dialog.Overlay
			class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/30"
		/>
		<Dialog.Content
			class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white shadow-xl outline-hidden sm:max-w-[490px] md:w-full"
		>
			<div class="px-5 pt-5">
				<h3 class="font-medium">Revoke secret key</h3>
				<p class="mb-5 text-sm text-balance text-zinc-500">
					Are you sure you want to revoke this key? You can't undo this action.
				</p>
			</div>

			<div class="mt-5 flex items-center justify-end gap-3 rounded-b-xl bg-zinc-50 p-5 py-3">
				<button
					type="button"
					onclick={() => (revokeKeyDialog = false)}
					class="rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
					>Cancel</button
				>
				<form
					action={`/apps/${data.app.id}/secret-keys/${revokeKeyId}`}
					method="POST"
					use:enhance={() => {
						return async (event) => {
							if (event.result.type === 'success') {
								revokeKeyDialog = false;
								secretKeys = secretKeys.filter((key) => key.id !== revokeKeyId);
							}
						};
					}}
				>
					<button
						type="submit"
						class="rounded-xl border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600/90"
						>Revoke</button
					>
				</form>
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
