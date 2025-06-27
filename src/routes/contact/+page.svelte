<script lang="ts">
	import Header from '$lib/ui/Header.svelte';
	import Send from '@lucide/svelte/icons/send';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let name = $state('');
	let email = $state('');
	let organization = $state('');
	let message = $state('');

	let messageSent = $state(false);

	async function sendMessage(event) {
		event.preventDefault();

		const res = await fetch('https://api.devmatter.app/forms/1', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer YOUR_API_KEY'
			},
			body: JSON.stringify({
				'full-name': name,
				email,
				organization,
				message
			})
		});

		if (res.ok) {
			messageSent = true;
			resetForm();
		} else {
			alert('Failed to send message');
		}
	}

	function resetForm() {
		name = '';
		email = '';
		organization = '';
		message = '';
	}
</script>

<Header user={data.user} />

<div class="mx-auto w-full max-w-xl px-4 pt-10 pb-32 lg:max-w-3xl xl:max-w-5xl">
	<div class="grid w-full grid-cols-2 gap-6">
		<div class="col-span-2 sm:col-span-1">
			<h1 class="mb-5 text-3xl font-semibold tracking-tight">Contact us</h1>
			<p class="font-medium text-balance text-zinc-600">
				Have any questions about the product, features, or pricing? Contact us any time. We'll get
				back to you within 24 hours.
			</p>
		</div>
		<div class="col-span-2 sm:col-span-1">
			{#if !messageSent}
				<form class="flex flex-col gap-6" onsubmit={sendMessage}>
					<div class="flex flex-col gap-1">
						<label for="name" class="text-sm font-medium text-zinc-600">Name*</label>
						<input
							type="text"
							id="name"
							name="name"
							bind:value={name}
							required
							class="rounded-md border-zinc-300 focus-visible:border-blue-600"
						/>
					</div>
					<div class="flex flex-col gap-1">
						<label for="email" class="text-sm font-medium text-zinc-600">Email*</label>
						<input
							type="email"
							id="email"
							required
							name="email"
							bind:value={email}
							class="rounded-md border-zinc-300 focus-visible:border-blue-600"
						/>
					</div>
					<div class="flex flex-col gap-1">
						<label for="org" class="text-sm font-medium text-zinc-600">Organization</label>
						<input
							type="text"
							id="org"
							name="org"
							bind:value={organization}
							class="rounded-md border-zinc-300 focus-visible:border-blue-600"
						/>
					</div>
					<div class="flex flex-col gap-1">
						<label for="msg" class="text-sm font-medium text-zinc-600">Message*</label>
						<textarea
							id="msg"
							name="msg"
							rows="5"
							bind:value={message}
							required
							class="rounded-md border-zinc-300 focus-visible:border-blue-600"
						></textarea>
					</div>
					<div>
						<button
							class="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600/90"
							><Send size={16} />Send message</button
						>
					</div>
				</form>
			{:else}
				<div class="flex flex-col items-center">
					<p class="text-center text-xl font-medium text-zinc-800">Thank you for your message!</p>
					<p class="text-center text-zinc-500">We will get back to you as soon as possible.</p>

					<button
						onclick={() => (messageSent = !messageSent)}
						class="mt-10 flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white"
					>
						<Send size={16} />Send another message</button
					>
				</div>
			{/if}
		</div>
	</div>
</div>
