<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="mt-20 flex flex-col gap-10 pb-32 text-center">
	<p class="text-3xl font-semibold tracking-tight">Your response could not be submitted!</p>

	<div class="flex flex-col items-center gap-4">
		<p class="font-medium text-zinc-600">
			Error code: <span class="font-mono">{data.error ?? 'unknown-error'}</span>
		</p>
	</div>
</div>
