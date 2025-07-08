<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

{@render children()}

<footer class="mt-20 flex border-t border-zinc-300 py-8">
	<div
		class="mx-auto flex w-full max-w-5xl flex-col justify-between gap-2 px-4 text-sm text-zinc-500 md:flex-row"
	>
		<div class="flex flex-col gap-2">
			<p>© 2025 DevMatter. All rights reserved.</p>
			<a href="/privacy" class="underline">Privacy Policy</a>
		</div>
		<p>
			Proudly open source! Star us on <a
				class="underline"
				target="_blank"
				href="https://github.com/aditya-vinodh/dev-matter">GitHub</a
			>
		</p>
	</div>
</footer>
