<script lang="ts">
	import Header from '$lib/ui/Header.svelte';
	import Send from '@lucide/svelte/icons/send';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Header user={data.user} />

<div class="mx-auto w-full max-w-5xl pt-10 pb-32">
	<div class="grid w-full grid-cols-2 gap-6">
		<div>
			<h1 class="mb-5 text-3xl font-semibold tracking-tight">Contact us</h1>
			<p class="font-medium text-balance text-zinc-600">
				Have any questions about the product, features, or pricing? Contact us any time. We'll get
				back to you within 24 hours.
			</p>
		</div>
		<div>
			<form class="flex flex-col gap-6">
				<div class="flex flex-col gap-1">
					<label for="name" class="text-sm font-medium text-zinc-600">Name*</label>
					<input
						type="text"
						id="name"
						name="name"
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
						class="rounded-md border-zinc-300 focus-visible:border-blue-600"
					/>
				</div>
				<div class="flex flex-col gap-1">
					<label for="org" class="text-sm font-medium text-zinc-600">Organization</label>
					<input
						type="text"
						id="org"
						name="org"
						class="rounded-md border-zinc-300 focus-visible:border-blue-600"
					/>
				</div>
				<div class="flex flex-col gap-1">
					<label for="msg" class="text-sm font-medium text-zinc-600">Message*</label>
					<textarea
						id="msg"
						name="msg"
						rows="5"
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
		</div>
	</div>
</div>
