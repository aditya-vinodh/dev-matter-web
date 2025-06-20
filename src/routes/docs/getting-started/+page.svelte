<script lang="ts">
	import Header from '$lib/ui/Header.svelte';
	import Sidebar from '$lib/ui/DocsSidebar.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Header user={data.user} />

<div class="mx-auto w-full max-w-xl pt-10 pb-32 lg:max-w-3xl xl:max-w-5xl">
	<div class="grid grid-cols-10">
		<div class="col-span-2 flex flex-col gap-6 text-sm">
			<Sidebar url="/docs/getting-started" />
		</div>
		<div class="col-span-8 px-10">
			<h1 class="mb-10 text-3xl font-semibold tracking-tight">Getting started</h1>
			<div class="flex flex-col gap-8">
				<p class="leading-loose">
					DevMatter is an app that started out as a tool to manage all my own software projects.
					Now, you can use it too! The first feature is <a href="/docs/forms" class="underline"
						>Forms</a
					>.
				</p>
				<p class="leading-loose">
					The forms feature provides a simple API to help you collect submissions from your apps.
					Unlike other form builders like Tally, Typeform, or Google forms, we enable you to build
					fully custom forms that integrate seamlessly with your existing infrastructure. You are in
					full control of the tech stack, UI, validations, and any other logic you need.
				</p>
				<p class="leading-loose">
					All we provide is an API to receive submission data to view and analyze later. However, we
					go a step further than traditional form APIs. Download our native mobile app to get
					notified of submissions, and take action on them directly from your phone.
				</p>
			</div>
		</div>
	</div>
</div>
