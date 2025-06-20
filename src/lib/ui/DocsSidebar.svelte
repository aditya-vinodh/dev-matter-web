<script lang="ts">
	let { url }: { url: string } = $props();
</script>

<div class="flex flex-col">
	<a
		href="/docs/getting-started"
		class="rounded-lg px-2 py-1 {url.startsWith('/docs/getting-started')
			? 'bg-zinc-100 font-medium '
			: ''}text-zinc-700 transition hover:bg-zinc-100">Getting started</a
	>
</div>
<div class="flex flex-col">
	<a
		href="/docs/apps"
		class="{url.startsWith('/docs/apps')
			? 'bg-zinc-100 font-medium '
			: ''}rounded-lg px-2 py-1 text-zinc-700 transition hover:bg-zinc-100">Apps</a
	>
	<a
		href="/docs/forms"
		class="{url.startsWith('/docs/forms')
			? 'bg-zinc-100 font-medium '
			: ''}rounded-lg px-2 py-1 text-zinc-700 transition hover:bg-zinc-100">Forms</a
	>
</div>
<div class="flex flex-col">
	<a
		href="/docs/integrations"
		class="{url.startsWith('/docs/integrations')
			? 'bg-zinc-100 font-medium '
			: ''}rounded-lg px-2 py-1 text-zinc-700 transition hover:bg-zinc-100">Integrations</a
	>
	<a
		href="/docs/mobile-app"
		class="{url.startsWith('/docs/mobile-app')
			? 'bg-zinc-100 font-medium '
			: ''}rounded-lg px-2 py-1 text-zinc-700 transition hover:bg-zinc-100">Mobile App</a
	>
	<a
		href="/docs/limits"
		class="{url.startsWith('/docs/limits')
			? 'bg-zinc-100 font-medium '
			: ''}rounded-lg px-2 py-1 text-zinc-700 transition hover:bg-zinc-100">Limits</a
	>
</div>
