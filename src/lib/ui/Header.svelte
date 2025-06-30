<script lang="ts">
	import { enhance } from '$app/forms';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import CircleUser from '@lucide/svelte/icons/circle-user';
	import UserCog from '@lucide/svelte/icons/user-cog';
	import LogOut from '@lucide/svelte/icons/log-out';
	import Menu from '@lucide/svelte/icons/menu';
	import X from '@lucide/svelte/icons/x';
	import { DropdownMenu } from 'bits-ui';
	import { fade } from 'svelte/transition';

	let { user } = $props();

	let mobileMenuOpen = $state(false);

	$effect(() => {
		if (mobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else if (document) {
			document.body.style.overflow = 'auto';
		}
	});
</script>

<div
	id="header"
	class="mx-auto flex w-full max-w-xl items-center justify-between px-4 py-4 text-xs font-medium text-zinc-700 lg:max-w-3xl lg:text-sm xl:max-w-5xl"
>
	<a href="/" class="flex items-center gap-2 tracking-tight"
		><img alt="logo" class="size-10" src="/devmatter-rounded.png" />
		<span class="block sm:hidden lg:block">DevMatter</span></a
	>
	<div class="hidden items-center gap-10 sm:flex">
		{#if user}
			<a href="/docs">Docs</a>
			<a href="/support">Support</a>
			<a href="/feedback">Feedback</a>
		{:else}
			<a href="/features">Features</a>
			<a href="/docs">Docs</a>
			<a href="/pricing">Pricing</a>
			<a href="/contact">Contact</a>
		{/if}
	</div>
	<div class="flex items-center gap-4">
		{#if user}
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<CircleUser />
				</DropdownMenu.Trigger>
				<DropdownMenu.Content
					align="end"
					class="w-48 rounded-lg border border-zinc-100 bg-white p-1 text-sm font-medium shadow-md"
				>
					<DropdownMenu.Group>
						<DropdownMenu.Item>
							{#snippet child()}
								<a
									href="/account-settings"
									class="flex w-full items-center gap-2 rounded-lg p-1 transition hover:bg-zinc-100"
									><UserCog size={16} class="stroke-zinc-700" /> Account settings</a
								>
							{/snippet}
						</DropdownMenu.Item>
					</DropdownMenu.Group>
					<DropdownMenu.Group>
						<form action="/logout" use:enhance method="post">
							<DropdownMenu.Item>
								{#snippet child()}
									<button
										class="flex w-full cursor-default items-center gap-2 rounded-lg p-1 text-left transition hover:bg-zinc-100"
										><LogOut size={16} class="stroke-zinc-700" /> Log out</button
									>
								{/snippet}
							</DropdownMenu.Item>
						</form>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		{:else}
			<div class="hidden sm:block">
				<a href="/login" class="flex items-center gap-2">Log in <ArrowRight size={18} /></a>
			</div>
			<div class="block pr-2 sm:hidden">
				<button
					onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
					aria-label="Open menu"
					aria-expanded={mobileMenuOpen}><Menu size={16} /></button
				>
			</div>
		{/if}
	</div>
</div>
{#if user}
	<div class="w-full border-b border-zinc-200"></div>
{/if}

{#if mobileMenuOpen}
	<div transition:fade class="absolute inset-0 z-50 h-screen w-screen bg-white/70 backdrop-blur-xl">
		<div class="flex items-center justify-between px-4 py-4">
			<a href="/" class="flex items-center gap-2 tracking-tight"
				><img alt="logo" class="size-10 rounded-xl shadow-sm" src="/devmatter-rounded.png" />
				<span class="block text-xs font-medium tracking-tight text-zinc-700 sm:hidden lg:block"
					>DevMatter</span
				></a
			>
			<button
				class="pr-2"
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
				aria-label="Close menu"><X size={16} /></button
			>
		</div>
		<div class="mt-10 flex flex-col gap-6 px-6">
			<a href="/features" class="text-2xl font-medium text-zinc-600">Features</a>
			<a href="/docs" class="text-2xl font-medium text-zinc-600">Docs</a>
			<a href="/pricing" class="text-2xl font-medium text-zinc-600">Pricing</a>
			<a href="/contact" class="text-2xl font-medium text-zinc-600">Contact</a>
		</div>
		<div class="mt-20 flex flex-col gap-6 border-t border-zinc-300 p-4 px-6">
			<a href="/login" class="text-2xl font-medium text-zinc-600">Log in</a>
		</div>
	</div>
{/if}
