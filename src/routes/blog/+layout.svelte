<script lang="ts">
	import Header from '$lib/ui/Header.svelte';
	import type { LayoutProps } from '../$types';

	let { data, children }: LayoutProps = $props();
</script>

<Header user={data.user} />
{@render children()}
