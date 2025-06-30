<script lang="ts">
	import ChevronsUpDown from '@lucide/svelte/icons/chevrons-up-down';
	import { DropdownMenu } from 'bits-ui';
	import { goto } from '$app/navigation';

	let { url, name }: { url: string; name: string } = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class="flex w-full items-center justify-between rounded-lg border border-zinc-300 px-4 py-2 text-left text-sm text-zinc-700"
		>{name}
		<ChevronsUpDown size={16} />
	</DropdownMenu.Trigger>
	<DropdownMenu.Portal>
		<DropdownMenu.Content
			align="end"
			sideOffset={4}
			class="flex flex-col gap-4 rounded-lg border border-zinc-100 bg-white p-2 text-left text-sm text-zinc-700 shadow-md"
		>
			<DropdownMenu.Group>
				<DropdownMenu.Item
					class="cursor-default rounded-lg {url.startsWith('/docs/getting-started')
						? 'bg-zinc-50 font-medium'
						: ''} p-1 px-2 pr-10 hover:bg-zinc-100"
					onSelect={() => {
						goto('/docs/getting-started');
					}}>Getting started</DropdownMenu.Item
				>
			</DropdownMenu.Group>
			<DropdownMenu.Group>
				<DropdownMenu.Item
					class="cursor-default {url.startsWith('/docs/apps')
						? 'bg-zinc-50 font-medium'
						: ''} rounded-lg p-1 px-2 pr-10 hover:bg-zinc-100"
					onSelect={() => {
						goto('/docs/apps');
					}}>Apps</DropdownMenu.Item
				>
				<DropdownMenu.Item
					class="cursor-default {url.startsWith('/docs/forms')
						? 'bg-zinc-50 font-medium'
						: ''} rounded-lg p-1 px-2 pr-10 hover:bg-zinc-100"
					onSelect={() => {
						goto('/docs/forms');
					}}>Forms</DropdownMenu.Item
				>
			</DropdownMenu.Group>
			<DropdownMenu.Group>
				<DropdownMenu.Item
					class="cursor-default {url.startsWith('/docs/integrations')
						? 'bg-zinc-50 font-medium'
						: ''} rounded-lg p-1 px-2 pr-10 hover:bg-zinc-100"
					onSelect={() => {
						goto('/docs/integrations');
					}}>Integrations</DropdownMenu.Item
				>
				<DropdownMenu.Item
					class="cursor-default {url.startsWith('/docs/mobile-app')
						? 'bg-zinc-50 font-medium'
						: ''} rounded-lg p-1 px-2 pr-10 hover:bg-zinc-100"
					onSelect={() => {
						goto('/docs/mobile-app');
					}}>Mobile App</DropdownMenu.Item
				>
				<DropdownMenu.Item
					class="cursor-default {url.startsWith('/docs/limits')
						? 'bg-zinc-50 font-medium'
						: ''} rounded-lg p-1 px-2 pr-10 hover:bg-zinc-100"
					onSelect={() => {
						goto('/docs/limits');
					}}>Limits</DropdownMenu.Item
				>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>
