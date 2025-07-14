<script lang="ts">
	import Thumbnail from '$lib/images/blog/best-way-to-build-forms-with-tailwind-and-a-form-api/thumbnail.png?enhanced';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Best Way to Build Forms with Tailwind and a Form API</title>
	<meta
		name="description"
		content="Learn the best way to build custom forms using Tailwind CSS and a form API backend. Easily style professional forms and handle submissions with DevMatter — get real-time push notifications and manage responses on the go."
	/>
	<meta name="og:title" content="Best Way to Build Forms with Tailwind and a Form API" />
	<meta
		name="og:description"
		content="Learn the best way to build custom forms using Tailwind CSS and a form API backend. Easily style professional forms and handle submissions with DevMatter — get real-time push notifications and manage responses on the go."
	/>
	<meta name="og:image" content={Thumbnail.img.src} />
	<meta name="twitter:image" content={Thumbnail.img.src} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Best Way to Build Forms with Tailwind and a Form API" />
	<meta
		name="twitter:description"
		content="Learn the best way to build custom forms using Tailwind CSS and a form API backend. Easily style professional forms and handle submissions with DevMatter — get real-time push notifications and manage responses on the go."
	/>
</svelte:head>

<main class="mx-auto flex w-full max-w-xl flex-col gap-4 px-4 pt-10 pb-32 lg:max-w-2xl">
	<article class="flex flex-col gap-6">
		<a href="/blog" class="mb-4 flex items-center gap-2 text-sm text-zinc-500"
			><ChevronLeft size={16} />All blogs</a
		>

		<p class="text-sm text-zinc-500">Jul 4, 2025 • 3 min read</p>

		<h1 class="mb-2 text-3xl font-semibold tracking-tight text-pretty">
			Best Way to Build Forms with Tailwind and a Form API
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
			src="../../../lib/images/blog/best-way-to-build-forms-with-tailwind-and-a-form-api/thumbnail.png?w=1000"
			class="rounded-xl"
			alt="Thumbnail"
		/>

		<div class="flex flex-col gap-8 text-zinc-700 *:leading-loose">
			<p>
				If you’re a developer, you’ve probably run into this situation: <br />
				You need a simple form — maybe a contact form, feedback box, or a lead capture form — but you
				don’t want to mess with setting up a whole backend just to handle submissions.
			</p>

			<p>
				There are a bunch of form builders like Typeform, Google Forms, Tally, and so on. But they
				restrict how much control you have over the user interface and how it integrates with the
				rest of your site.
			</p>

			<p>It ends up looking very disconnected from the rest of your site.</p>

			<p>
				That’s where <strong class="font-medium text-zinc-900">Tailwind + a Form API</strong>
				backend comes in. And if you’re using
				<strong class="font-medium text-zinc-900">DevMatter</strong>, it becomes even simpler.
			</p>

			<p>
				Let’s walk through the best way to build custom forms with Tailwind CSS and handle
				submissions through DevMatter — so you can go from idea to working form in minutes.
			</p>

			<h2 class="text-xl font-medium tracking-tight text-zinc-900">
				Why Use Tailwind for Custom Forms?
			</h2>

			<p>
				<a
					class="font-medium text-zinc-900 underline"
					target="_blank"
					href="https://tailwindcss.com/">Tailwind</a
				> makes it incredibly easy to build beautiful, clean forms. You can customize everything — spacing,
				fonts, colors — without ever writing a line of CSS.
			</p>

			<p>Here’s a quick example of a styled form using Tailwind:</p>

			<div class="overflow-auto rounded-lg bg-[#1f1f1f] px-2 py-1 text-sm">
				<div class="inline-block min-w-full">
					{@html data.exampleHTMLFormHtml}
				</div>
			</div>

			<enhanced:img
				loading="lazy"
				src="../../../lib/images/blog/best-way-to-build-forms-with-tailwind-and-a-form-api/tailwind-form.png?w=1200"
				class="rounded-xl"
				alt="Tailwind form"
			/>

			<p>
				Looks professional, works everywhere, and loads fast. No CSS frameworks or design systems to
				fight with.
			</p>

			<p>
				With a couple of easy to learn utility classes, you can get your form pages looking amazing
				and exactly how you like it.
			</p>

			<h2 class="text-xl font-medium tracking-tight text-zinc-900">Why Use a Form API Backend?</h2>

			<p>
				Instead of building your own backend or using a bloated form builder, a form API backend
				gives you:
			</p>

			<ul class="list-disc pl-3">
				<li>🔄 Instant integration with your front-end</li>
				<li>🔔 Real-time notifications when you get submissions</li>
				<li>📱 A mobile app (with DevMatter) to view submissions on the go</li>
				<li>✅ Full control over how the form looks, works, and behaves</li>
			</ul>

			<p>You write the form. DevMatter handles the backend.</p>

			<h2 class="text-xl font-medium tracking-tight text-zinc-900">
				Hooking Up DevMatter to Your Form
			</h2>

			<p>Once you’ve styled your form, you just need to hook it up to DevMatter. Here’s how:</p>

			<h3 class="text-lg font-medium tracking-tight text-zinc-900">
				1. Get your DevMatter Form API URL
			</h3>

			<p>
				Create a new form in your DevMatter dashboard. Copy the form URL (e.g.
				https://api.devmatter.app/form/123).
			</p>

			<h3 class="text-lg font-medium tracking-tight text-zinc-900">
				2. Add JavaScript to Send the Form
			</h3>

			<p>Here’s a basic example using fetch:</p>

			<div class="overflow-auto rounded-lg bg-[#1f1f1f] px-2 py-1 text-sm">
				<div class="inline-block min-w-full">
					{@html data.exampleFetchCodeHtml}
				</div>
			</div>

			<p>
				That’s it. No backend needed. You’ll see new submissions instantly in the DevMatter mobile
				app — with push notifications if you want.
			</p>

			<p>
				If you wanted, you could make it even simpler! Instead of using JavaScript as shown above,
				you can add the form URL in the action attribute of the form. This will automatically submit
				the form when a user clicks submit.
			</p>

			<p>
				You can even configure your form to redirect to a success page upon successful submission!
			</p>

			<h2 class="text-xl font-medium tracking-tight text-zinc-900">Why Devs Love This Setup</h2>

			<ul class="list-disc pl-3">
				<li>
					<strong class="font-medium text-zinc-900">Total control</strong>: You write your form
					using Tailwind. No iframe embeds, no weird UI.
				</li>
				<li>
					<strong class="font-medium text-zinc-900">Super fast</strong>: Just drop in an endpoint
					and you’re done.
				</li>
				<li>
					<strong class="font-medium text-zinc-900">Real-time</strong>: Get notified the moment
					someone submits.
				</li>
				<li>
					<strong class="font-medium text-zinc-900">Mobile-first</strong>: View all your submissions
					and leads on the go using the DevMatter app.
				</li>
			</ul>

			<h2 class="text-xl font-medium tracking-tight text-zinc-900">
				Explore More: Building Robust Forms
			</h2>

			<p>
				If you’re building something more complex — think multi-step forms, conditional logic, field
				validation, or complex schemas — there are great tools in the ecosystem you might want to
				check out:
			</p>

			<ul class="list-disc pl-3">
				<li>
					<a
						class="font-medium text-zinc-900 underline"
						target="_blank"
						href="https://tanstack.com/form/latest">TanStack Form (react-form)</a
					>: Headless form logic for React, built by the creators of TanStack Table & Query.
				</li>
				<li>
					<a
						class="font-medium text-zinc-900 underline"
						target="_blank"
						href="https://react-hook-form.com/">React Hook Form</a
					>: Minimal yet powerful form library with great performance and DX.
				</li>
				<li>
					<a class="font-medium text-zinc-900 underline" target="_blank" href="https://zod.dev/"
						>Zod</a
					>: A TypeScript-first schema validation library that pairs well with any form setup.
				</li>
				<li>
					<a class="font-medium text-zinc-900 underline" target="_blank" href="https://formik.org/"
						>Formik</a
					>: A classic form library for React apps, good for enterprise use cases.
				</li>
			</ul>

			<p>
				These tools work great with Tailwind too — giving you even more power while keeping your
				styling consistent.
			</p>

			<h2 class="text-xl font-medium tracking-tight text-zinc-900">Final Thoughts</h2>

			<p>
				If you’re building a <strong class="font-medium text-zinc-900">custom UI</strong> with
				<strong class="font-medium text-zinc-900">Tailwind</strong>, don’t waste time building a
				backend from scratch just to collect form data. With
				<a href="/" class="font-medium text-blue-600">DevMatter</a>, you get an instant tailwind
				form API backend,
				<strong class="font-medium text-zinc-900">real-time submission handling</strong>, and a
				clean
				<strong class="font-medium text-zinc-900">mobile-first dashboard</strong> — all while keeping
				full control of your form’s experience.
			</p>

			<p>
				<strong class="font-medium text-zinc-900"
					>Start using DevMatter for your next form — and ship faster with less friction.</strong
				>
			</p>
		</div>
	</article>
</main>
