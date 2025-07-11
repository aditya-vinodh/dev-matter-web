<script lang="ts">
	import Header from '$lib/ui/Header.svelte';
	import Zap from '@lucide/svelte/icons/zap';
	import ExternalLink from '@lucide/svelte/icons/external-link';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Header user={data.user} />

<div class="mx-auto w-full max-w-5xl px-4 pt-10 pb-32">
	<h1 class="text-3xl font-semibold tracking-tight">Account settings</h1>
	<div class="mt-10 flex flex-col gap-8">
		<div class="flex flex-col gap-2">
			<div class="text-sm font-medium text-zinc-500">Name</div>
			<div>{data.user?.name}</div>
		</div>
		<div class="flex flex-col gap-2">
			<div class="text-sm font-medium text-zinc-500">Email address</div>
			<div>{data.user?.email}</div>
		</div>
		<div class="flex flex-col gap-2">
			<div class="text-sm font-medium text-zinc-500">Pricing plan</div>
			<div class="capitalize">{data.user?.pricingPlan}</div>

			{#if data.user?.pricingPlan === 'free'}
				<a
					href="/upgrade"
					class="mt-5 flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600/90"
					><Zap size={16} />Upgrade</a
				>
			{/if}
		</div>

		{#if data.user?.pricingPlan !== 'free'}
			<div class="flex flex-col gap-2">
				<div class="text-sm font-medium text-zinc-500">Subscription and Billing</div>
				<a
					href="/customer-portal"
					target="_blank"
					class="mt-1 flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600/90"
					>Launch Customer Portal <ExternalLink size={16} /></a
				>
			</div>
		{/if}
	</div>
</div>
