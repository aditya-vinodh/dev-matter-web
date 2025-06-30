<script lang="ts">
	import Header from '$lib/ui/Header.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Header user={data.user} />

<div class="mx-auto w-full max-w-5xl px-4 pt-10 pb-32">
	<h1 class="text-3xl font-semibold tracking-tight">Account settings</h1>
	<div class="mt-10 flex flex-col gap-8">
		<div class="flex flex-col gap-2">
			<div class="text-sm font-medium text-zinc-500">Name</div>
			<div>{data.user.name}</div>
		</div>
		<div class="flex flex-col gap-2">
			<div class="text-sm font-medium text-zinc-500">Email address</div>
			<div>{data.user.email}</div>
		</div>
		<div class="flex flex-col gap-2">
			<div class="text-sm font-medium text-zinc-500">Pricing plan</div>
			<div>Free</div>
		</div>
	</div>
</div>
