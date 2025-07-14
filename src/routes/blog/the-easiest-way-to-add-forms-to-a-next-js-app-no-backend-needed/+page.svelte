<script lang="ts">
	import Thumbnail from '$lib/images/blog/the-easiest-way-to-add-forms-to-a-next-js-app-no-backend-needed/thumbnail.png?enhanced';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>The Easiest Way to Add Forms to a Next.js App Without Backend Needed</title>
	<meta
		name="description"
		content="Learn how to handle form submission in Next.js without a server. Explore the easiest way to add forms to your Next.js app using a form API backend like DevMatter—no backend setup needed."
	/>
	<meta
		name="og:title"
		content="The Easiest Way to Add Forms to a Next.js App Without Backend Needed"
	/>
	<meta
		name="og:description"
		content="Learn how to handle form submission in Next.js without a server. Explore the easiest way to add forms to your Next.js app using a form API backend like DevMatter—no backend setup needed."
	/>
	<meta name="og:image" content={Thumbnail.img.src} />
	<meta name="twitter:image" content={Thumbnail.img.src} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta
		name="twitter:description"
		content="Learn how to handle form submission in Next.js without a server. Explore the easiest way to add forms to your Next.js app using a form API backend like DevMatter—no backend setup needed."
	/>
	<meta
		name="twitter:title"
		content="The Easiest Way to Add Forms to a Next.js App Without Backend Needed"
	/>
</svelte:head>

<main class="mx-auto flex w-full max-w-xl flex-col gap-4 px-4 pt-10 pb-32 lg:max-w-2xl">
	<article class="flex flex-col gap-6">
		<a href="/blog" class="mb-4 flex items-center gap-2 text-sm text-zinc-500"
			><ChevronLeft size={16} />All blogs</a
		>

		<p class="text-sm text-zinc-500">Jul 9, 2025 • 3 min read</p>

		<h1 class="mb-2 text-3xl font-semibold tracking-tight text-pretty">
			The Easiest Way to Add Forms to a Next.js App Without Backend Needed
		</h1>

		<div class="flex items-center gap-4">
			<enhanced:img
				src="../../../lib/images/aditya.jpeg?w=100"
				alt="Aditya"
				width="42"
				height="42"
				fetchpriority="high"
				class="aspect-square rounded-full object-cover"
			/>
			<div class="flex flex-col justify-between">
				<p class="text-sm font-medium">Aditya</p>
				<p class="text-sm text-zinc-500">Founder</p>
			</div>
		</div>

		<enhanced:img
			fetchpriority="high"
			src="../../../lib/images/blog/the-easiest-way-to-add-forms-to-a-next-js-app-no-backend-needed/thumbnail.png?w=1000"
			class="rounded-xl"
			alt="Thumbnail"
		/>

		<div class="flex flex-col gap-8 text-zinc-700 *:leading-loose">
			<p>
				Adding forms to your <a href="https://nextjs.org/" target="_blank" class="underline"
					>Next.js</a
				> app doesn’t have to mean spinning up a server, managing a database, or writing backend logic.
				In fact, you can handle form submissions in Next.js without a server at all—especially for simple
				use cases like contact forms, feedback forms, or newsletter signups.
			</p>

			<p>
				In this post, we’ll explore the easiest ways to add forms to your Next.js app using a form
				API backend like <a href="/" class="underline">DevMatter</a>, and when you might want to use
				a server route for more control.
			</p>

			<h2 class="text-xl font-medium tracking-tight text-zinc-900">
				Common Ways to Handle Forms in Next.js
			</h2>

			<p>When it comes to handling forms in Next.js, there are a few typical approaches:</p>

			<h3 class="text-lg font-medium tracking-tight text-zinc-900">1. Use a Full Backend</h3>

			<p>
				You can create an API route (<code class="rounded-md bg-zinc-200 font-mono"
					>/pages/api/submit.js</code
				>) that processes the form, writes to a database, sends emails, etc.
			</p>

			<ul class="pl-3">
				<li>✅ Pros: Full control</li>
				<li>
					❌ Cons: More setup, deployment complexity, requires server functions or edge functions
				</li>
			</ul>

			<h3 class="text-lg font-medium tracking-tight text-zinc-900">
				2. Use a Headless Form Backend
			</h3>

			<p>
				If you don’t want to manage a server, a form API backend like DevMatter handles submissions
				for you. Just send the form data to your DevMatter endpoint using a POST request from the
				frontend
			</p>

			<ul class="pl-3">
				<li>✅ Pros: No server required, works with static sites, easy setup</li>
				<li>❌ Cons: Less flexibility (but still powerful enough for most use cases)</li>
			</ul>

			<hr class="my-8 border-zinc-200" />

			<h2 class="text-xl font-medium tracking-tight text-zinc-900">When to Use Which</h2>

			<table class="table w-full">
				<thead class="table-header-group">
					<tr class="table-row">
						<th class="table-cell px-2 text-left">Use Case</th>
						<th class="table-cell px-2 text-left">Server needed?</th>
						<th class="table-cell px-2 text-left">Recommendation</th>
					</tr>
				</thead>
				<tbody class="table-row-group">
					<tr class="table-row border-t border-zinc-300">
						<td class="table-cell px-2 py-2 leading-normal">Contact form / feedback</td>
						<td class="table-cell px-2 py-2 leading-normal">❌ No</td>
						<td class="table-cell px-2 py-2 leading-normal"
							>Use DevMatter or similar form API backend</td
						>
					</tr>
					<tr class="table-row border-t border-zinc-300">
						<td class="table-cell px-2 py-2 leading-normal">Authenticated user form</td>
						<td class="table-cell px-2 py-2 leading-normal">✅ Yes</td>
						<td class="table-cell px-2 py-2 leading-normal"
							>Use API route or middleware to verify, then send data to DevMatter</td
						>
					</tr>
					<tr class="table-row border-t border-zinc-300">
						<td class="table-cell px-2 py-2 leading-normal">Internal admin tool</td>
						<td class="table-cell px-2 py-2 leading-normal">✅ Yes</td>
						<td class="table-cell px-2 py-2 leading-normal"
							>Backend needed for security and logic, but can be used in addition with DevMatter</td
						>
					</tr>
					<tr class="table-row border-t border-zinc-300">
						<td class="table-cell px-2 py-2 leading-normal">Newsletter signup</td>
						<td class="table-cell px-2 py-2 leading-normal">❌ No</td>
						<td class="table-cell px-2 py-2 leading-normal">Use DevMatter directly from HTML/JS</td>
					</tr>
				</tbody>
			</table>

			<hr class="my-8 border-zinc-200" />

			<h2 class="text-xl font-medium tracking-tight text-zinc-900">
				How to Add a Form Without a Backend
			</h2>

			<p>
				Let’s walk through adding a simple contact form that submits directly to DevMatter—no server
				code needed.
			</p>

			<h3 class="text-lg font-medium tracking-tight text-zinc-900">
				Step 1: Create a DevMatter Form
			</h3>

			<p>Create a form in your DevMatter dashboard. You’ll get a unique form endpoint URL, e.g.</p>

			<code class="w-full rounded-md bg-zinc-700 px-2 py-1 font-mono text-white"
				>https://api.devmatter.app/forms/123</code
			>

			<h3 class="text-lg font-medium tracking-tight text-zinc-900">Step 2: Add the HTML Form</h3>

			<p>Here’s a simple form that sends data directly to the API:</p>

			<div class="overflow-auto rounded-lg bg-[#1f1f1f] px-2 py-1 text-sm">
				<div class="inline-block min-w-full">
					{@html data.exampleHTMLFormHtml}
				</div>
			</div>

			<ul class="pl-3">
				<li>✅ Works even in a static export</li>
				<li>✅ No /api route required</li>
				<li>✅ Fully secure if the form is public</li>
			</ul>

			<h2 class="text-xl font-medium tracking-tight text-zinc-900">
				What About Authenticated Forms?
			</h2>

			<p>
				If your form requires authentication—for example, submitting internal feedback or editing
				user data—you’ll want to verify the user before calling the form API.
			</p>

			<p>Here's how to do it:</p>

			<h3 class="text-lg font-medium tracking-tight text-zinc-900">
				Option 1: Use Next.js API Routes
			</h3>

			<p>You can create a simple API route like this:</p>

			<div class="overflow-auto rounded-lg bg-[#1f1f1f] px-2 py-1 text-sm">
				<div class="inline-block min-w-full">
					{@html data.exampleNextjsAPIRouteHtml}
				</div>
			</div>

			<p>Your frontend form would then submit to /api/secure-submit.</p>

			<h3 class="text-lg font-medium tracking-tight text-zinc-900">
				Option 2: Any other server-side setup
			</h3>

			<p>
				If you don't want to use Next.js API Routes, you can use any other server-side setup that
				supports POST requests. It could be a simple Node.js server running Express.js or a more
				robust solution like Firebase Functions.
			</p>

			<hr class="my-8 border-zinc-200" />

			<h2 class="text-xl font-medium tracking-tight text-zinc-900">Final Thoughts</h2>

			<p>
				If you’re building a modern Next.js app and just want a simple way to collect form
				submissions—without worrying about servers, validation, or email logic—<strong
					class="font-medium text-zinc-800"
					>a form API backend like DevMatter is the easiest and fastest way to go.</strong
				>
			</p>

			<p>You can:</p>

			<ul class="list-disc pl-3">
				<li>Add forms directly in your frontend</li>
				<li>Skip writing API routes</li>
				<li>Handle both simple and advanced use cases</li>
				<li>Easily scale without changing your app architecture</li>
			</ul>

			<hr class="my-8 border-zinc-200" />

			<p>
				<strong class="font-medium text-zinc-800">Try it now</strong> →
				<a href="/" class="font-medium text-blue-600">DevMatter </a>— the form backend that gives
				you full control over the UI, but takes care of everything else.
			</p>
		</div>
	</article>
</main>
