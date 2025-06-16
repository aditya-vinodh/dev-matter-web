<script lang="ts">
	import { enhance } from '$app/forms';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import CircleUser from '@lucide/svelte/icons/circle-user';
	import UserCog from '@lucide/svelte/icons/user-cog';
	import LogOut from '@lucide/svelte/icons/log-out';
	import { DropdownMenu } from 'bits-ui';

	let { user } = $props();
</script>

<div
	id="header"
	class="mx-auto flex w-full max-w-5xl items-center justify-between py-4 text-sm font-medium text-zinc-700"
>
	<a href="/" class="flex items-center gap-2 tracking-tight"
		><img alt="logo" class="size-10" src="/devmatter-rounded.png" /> DevMatter</a
	>
	<div class="flex items-center gap-10">
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
									><UserCog size={16} class="stroke-zinc-700" /> Account Settings</a
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
			<a href="/login" class="flex items-center gap-2">Log in <ArrowRight size={18} /></a>
		{/if}
	</div>
</div>
{#if user}
	<div class="w-full border-b border-zinc-200"></div>
{/if}
