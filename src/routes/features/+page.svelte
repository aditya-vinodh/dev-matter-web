<script lang="ts">
	import Header from '$lib/ui/Header.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Header user={data.user} />

<div class="mx-auto w-full max-w-xl px-4 pt-10 pb-32 lg:max-w-3xl xl:max-w-5xl">
	<p class="mb-10 text-3xl font-semibold tracking-tight text-balance">
		A suite of tools for developers to manage their apps
	</p>

	<h2 class="mb-4 text-xl font-semibold tracking-tight">Forms</h2>
	<div class="flex flex-col gap-4">
		<p class="font-medium tracking-tight text-zinc-500">The form API built for developers.</p>
		<p class="font-medium tracking-tight text-zinc-500">
			Build custom forms that integrate seamlessly with your app.
			<br />
			Send them to our endpoints to handle the data.
		</p>
		<p class="font-medium tracking-tight text-zinc-500">
			Get notified instantly when a form is submitted.
		</p>
		<p class="font-medium tracking-tight text-zinc-500">
			Receive push notifications in our clean mobile app
		</p>
		<p class="font-medium tracking-tight text-zinc-500">
			Perfect for contact forms, surveys, feedback and support requests.
		</p>
	</div>
</div>
