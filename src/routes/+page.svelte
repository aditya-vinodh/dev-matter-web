<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import GitHub from '@lucide/svelte/icons/github';
	import LayoutGrid from '@lucide/svelte/icons/layout-grid';
	import Plus from '@lucide/svelte/icons/plus';
	import Header from '$lib/ui/Header.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>DevMatter</title>
	<meta
		name="description"
		content="DevMatter is a better way to manage your apps. A form API built for developers with a mobile app for real-time notifications."
	/>
</svelte:head>

<Header user={data.user} />
{#if !data.user}
	<div class="mx-auto grid w-full max-w-xl grid-cols-12 px-4 py-20 lg:max-w-3xl xl:max-w-5xl">
		<div class="col-span-12 flex flex-col justify-center lg:col-span-8">
			<a
				href="/changelog"
				class="flex w-fit items-center gap-4 rounded-full border border-zinc-300 px-2 py-1 text-xs xl:px-3 xl:py-1.5 xl:text-sm"
			>
				<span class="font-medium text-blue-600">Just shipped v0.2</span>
				<span class="h-5 border border-r-0 border-zinc-300"></span>
				<div class="flex items-center gap-2 text-zinc-700">
					See what's new <ChevronRight size={16} class="stroke-zinc-700" />
				</div>
			</a>
			<h1 class="py-4 text-6xl font-semibold tracking-tighter text-balance xl:text-7xl">
				A better way to manage your apps
			</h1>
			<p class="py-4 text-lg font-medium text-balance text-zinc-500 xl:text-xl">
				Collect data from contact, feedback, and support forms. Get notified and respond to your
				users on time and on the go!
			</p>
			<div class="my-4 flex items-center gap-4">
				<a
					href="/signup"
					class="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600/90 xl:text-base"
					>Start building</a
				>
				<a
					href="/docs"
					class="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition hover:bg-zinc-100 xl:text-base"
					>Check out the docs <ArrowRight size={16} /></a
				>
			</div>
		</div>
		<div class="col-span-12 lg:col-span-4">
			<div class="mx-auto">
				<enhanced:img
					src="../lib/images/screenshot.webp?w=540"
					alt="screenshot"
					class="mx-auto mt-10 w-72 lg:mt-0 lg:w-full"
				/>
			</div>
		</div>

		<div class="col-span-12 mt-24">
			<h2 class="mb-10 text-3xl font-semibold tracking-tight">Frequently Asked Questions</h2>
			<div class="grid grid-cols-3 gap-8 gap-y-12">
				<div class="col-span-3 lg:col-span-2 xl:col-span-1">
					<h3 class="mb-3 font-medium">What is DevMatter?</h3>
					<p class="leading-loose text-zinc-600">
						DevMatter is a developer-first form backend and submission dashboard. It lets you easily
						create flexible forms, send data via API, view submissions, and get real-time mobile
						notifications — all without relying on rigid tools like Google Forms.
					</p>
				</div>
				<div class="col-span-3 lg:col-span-2 xl:col-span-1">
					<h3 class="mb-3 font-medium">
						How is DevMatter different from Google Forms or Typeform?
					</h3>
					<p class="leading-loose text-zinc-600">
						DevMatter isn't a form builder like Google Forms or Typeform. DevMatter is designed for
						developers who want control. You can fully customize the front-end, integrate it into
						your product seamlessly, and send data via API — no locked-in UI or embedded branding.
					</p>
				</div>
				<div class="col-span-3 lg:col-span-2 xl:col-span-1">
					<h3 class="mb-3 font-medium">Can I use my own frontend or framework?</h3>
					<p class="leading-loose text-zinc-600">
						Yes! DevMatter is frontend-agnostic. Whether you’re using React, Svelte, Vue, plain
						HTML, or something else, you can build your form however you like and just POST the data
						to our API.
					</p>
				</div>
				<div class="col-span-3 lg:col-span-2 xl:col-span-1">
					<h3 class="mb-3 font-medium">How do I view form submissions?</h3>
					<p class="leading-loose text-zinc-600">
						You get access to a clean, real-time dashboard where you can view and search through all
						your form submissions. You can also export them if needed.
					</p>
				</div>
				<div class="col-span-3 lg:col-span-2 xl:col-span-1">
					<h3 class="mb-3 font-medium">Will I get notified when someone submits a form?</h3>
					<p class="leading-loose text-zinc-600">
						Yes! You can enable real-time mobile push notifications with our mobile app to get
						alerts when someone submits a form.
					</p>
				</div>
				<div class="col-span-3 lg:col-span-2 xl:col-span-1">
					<h3 class="mb-3 font-medium">Is DevMatter free?</h3>
					<p class="leading-loose text-zinc-600">
						DevMatter has a generous free plan that should get you started. For higher limits and
						features, consider our paid plans starting at $9/month.
					</p>
				</div>
				<div class="col-span-3 lg:col-span-2 xl:col-span-1">
					<h3 class="mb-3 font-medium">Can I use DevMatter in production apps?</h3>
					<p class="leading-loose text-zinc-600">
						Absolutely. DevMatter is built to be reliable, secure, and production-ready from day
						one.
					</p>
				</div>
				<div class="col-span-3 lg:col-span-2 xl:col-span-1">
					<h3 class="mb-3 font-medium">Can I self-host it?</h3>
					<p class="leading-loose text-zinc-600">
						Yes, you can self-host DevMatter using Docker or by building it from source. You can
						find instructions on how to do so in our <a href="/docs" class="underline"
							>documentation</a
						>.
					</p>
				</div>
				<div class="col-span-3 lg:col-span-2 xl:col-span-1">
					<h3 class="mb-3 font-medium">Is the API open-source?</h3>
					<p class="leading-loose text-zinc-600">
						Yes, the entire application, including the API, is open-source and available on
						<a href="https://github.com/aditya-vinodh/dev-matter" class="underline">GitHub</a>.
					</p>
				</div>
				<div class="col-span-3 lg:col-span-2 xl:col-span-1">
					<h3 class="mb-3 font-medium">What kind of data can I collect?</h3>
					<p class="leading-loose text-zinc-600">
						You can collect any kind of structured form data — names, emails, messages, dropdowns,
						checkboxes, file uploads, and more. We only care about the raw data type: string,
						number, boolean, file.
					</p>
				</div>
				<div class="col-span-3 lg:col-span-2 xl:col-span-1">
					<h3 class="mb-3 font-medium">What happens to my data?</h3>
					<p class="leading-loose text-zinc-600">
						Your data is encrypted in transit using industry-standard encryption algorithms. It is
						stored securely on our servers until it is deleted by you.
					</p>
				</div>
			</div>
		</div>
	</div>
{:else}
	<div class="mx-auto w-full max-w-5xl px-4 pt-10 pb-32">
		<div class="flex items-center justify-between">
			<h1 class="text-3xl font-semibold tracking-tight">Apps</h1>
			<a
				href="/apps/new"
				class="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white"
				><Plus size={16} class="stroke-white" strokeWidth={2.5} />Create</a
			>
		</div>
		<div class="mt-10 flex flex-wrap gap-4">
			{#each data.apps as app (app.id)}
				<a
					href="/apps/{app.id}"
					class="h-24 w-64 rounded-xl border border-zinc-200 bg-zinc-50 p-2 text-xl font-medium tracking-tight text-zinc-700 shadow-sm"
				>
					{app.name}
				</a>
			{/each}
		</div>
		{#if data.apps.length === 0}
			<div class="mt-10 flex flex-col items-center gap-6">
				<LayoutGrid size={36} class="stroke-zinc-700" />
				<div class="flex flex-col items-center gap-1">
					<p class="font-medium text-zinc-800">No apps</p>
					<p class="text-zinc-500">Create an app to get started</p>
				</div>
				<a
					href="/apps/new"
					class="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white"
					><Plus size={16} class="stroke-white" strokeWidth={2.5} />Create app</a
				>
			</div>
		{/if}
	</div>
{/if}
