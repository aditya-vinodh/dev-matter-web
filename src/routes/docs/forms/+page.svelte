<script lang="ts">
	import Header from '$lib/ui/Header.svelte';
	import Sidebar from '$lib/ui/DocsSidebar.svelte';
	import DropdownMenu from '$lib/ui/DocsDropdownMenu.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Header user={data.user} />

<svelte:head>
	<title>Forms | DevMatter Docs</title>
</svelte:head>

<div class="mx-auto w-full max-w-xl pt-10 pb-32 lg:max-w-3xl xl:max-w-5xl">
	<div class="grid grid-cols-10">
		<div class="hidden flex-col gap-6 text-sm lg:col-span-2 lg:flex">
			<Sidebar url="/docs/forms" />
		</div>
		<div class="col-span-12 mb-10 px-4 lg:hidden">
			<DropdownMenu url="/docs/forms" name="Forms" />
		</div>
		<div class="col-span-12 px-4 lg:col-span-8 lg:px-10">
			<h1 class="mb-10 text-3xl font-semibold tracking-tight">Forms</h1>
			<div class="flex flex-col gap-8">
				<p class="leading-loose">Forms provide you with an API to collect form submissions.</p>
				<p class="leading-loose">
					Forms can either be public or private. Forms are private by default. Private forms need a
					secret key to be submitted. You can create a secret key from your app's dashboard. Public
					forms can be submitted by anyone on the internet.
				</p>
				<p class="leading-loose">
					You can define the schema of your form. You must choose what fields you need. For each
					field, specify an ID, label, type, and if it must be required. This allows us to perform
					some basic validation for you and store the data.
				</p>
				<p class="leading-loose">Forms can be submitted using multiple methods.</p>
				<p class="leading-loose">
					You can use a regular HTML form element, by providing your unique URL in the action
					attribute. Ensure that the name attribute of each input matches with the field ID.
				</p>
				<p class="leading-loose">
					You can also make a regular HTTP POST request and send the data as a JSON object. Ensure
					that the keys match the field IDs.
				</p>
			</div>
		</div>
	</div>
</div>
