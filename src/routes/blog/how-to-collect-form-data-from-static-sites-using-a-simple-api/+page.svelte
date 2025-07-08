<script lang="ts">
	import Thumbnail from '$lib/images/blog/how-to-collect-form-data-from-static-sites-using-a-simple-api/thumbnail.png?enhanced';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>How to Collect Form Data from Static Sites Using a Simple API</title>
	<meta
		name="description"
		content="Learn how to easily collect form data from static sites without a backend. Explore options, use cases, and how form APIs like DevMatter simplify the process and let you scale later."
	/>
	<meta name="og:title" content="How to Collect Form Data from Static Sites Using a Simple API" />
	<meta
		name="og:description"
		content="Learn how to easily collect form data from static sites without a backend. Explore options, use cases, and how form APIs like DevMatter simplify the process and let you scale later."
	/>
	<meta name="og:image" content={Thumbnail.img.src} />
	<meta name="twitter:image" content={Thumbnail.img.src} />
</svelte:head>

<main class="mx-auto flex w-full max-w-xl flex-col gap-4 px-4 pt-10 pb-32 lg:max-w-2xl">
	<article class="flex flex-col gap-6">
		<a href="/blog" class="mb-4 flex items-center gap-2 text-sm text-zinc-500"
			><ChevronLeft size={16} />All blogs</a
		>

		<p class="text-sm text-zinc-500">Jul 8, 2025 • 3 min read</p>

		<h1 class="mb-2 text-3xl font-semibold tracking-tight text-pretty">
			How to Collect Form Data from Static Sites Using a Simple API
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
			src="../../../lib/images/blog/how-to-collect-form-data-from-static-sites-using-a-simple-api/thumbnail.png?w=1000"
			class="rounded-xl"
			alt="Thumbnail"
		/>

		<div class="flex flex-col gap-8 text-zinc-700 *:leading-loose">
			<p>
				Static sites are fast, secure, and easy to deploy — but what do you do when you need to add
				a contact form, newsletter signup, or feedback form? Static sites don't have a backend, so
				handling form submissions can be tricky. That's where using a form backend for static sites
				comes in.
			</p>

			<p>In this post, we'll walk through:</p>

			<ul class="list-disc pl-3">
				<li>Why forms on static sites are tricky</li>
				<li>When you do (or don't) need your own backend</li>
				<li>How to start simple with a form API for static sites</li>
				<li>How you can scale your logic later if needed</li>
			</ul>

			<hr class="my-8 border-zinc-200" />

			<h2 class="text-xl font-medium tracking-tight text-zinc-900">
				Why Forms Are a Challenge in Static Sites
			</h2>

			<p>
				Static sites are built with HTML, CSS, and JavaScript and served directly from a CDN or
				storage bucket. They load fast and are easy to host — but they don't have server-side code.
			</p>

			<p>That means:</p>

			<ul class="list-disc pl-3">
				<li>You can't run code on form submissions</li>
				<li>You can't store data or send emails on your own</li>
				<li>You're stuck unless you connect the form to something external</li>
			</ul>

			<p>
				Still, forms are critical for almost every website — whether it's for collecting leads,
				getting feedback, or supporting users.
			</p>

			<hr class="my-8 border-zinc-200" />

			<h2 class="text-xl font-medium tracking-tight text-zinc-900">What Are Your Options?</h2>

			<p>Here's how developers typically handle form submissions on static sites:</p>

			<h3 class="text-lg font-medium tracking-tight text-zinc-900">1. Use a Form API Backend</h3>

			<p>
				This is the easiest and most developer-friendly approach. You point your form to a hosted
				API that handles submissions for you — storing data, sending notifications, and optionally
				triggering integrations.
			</p>

			<p>
				<strong class="font-medium text-zinc-900">✅ Great for:</strong> no backend required, easy
				setup<br />
				<strong class="font-medium text-zinc-900">🚫 Limitations:</strong> can't run custom logic unless
				the platform supports it
			</p>

			<h3 class="text-lg font-medium tracking-tight text-zinc-900">2. Build Your Own Backend</h3>

			<p>
				If you need more control, you can write your own API (e.g. with Node.js, Go, or serverless
				functions) to receive and process form data.
			</p>

			<p>
				<strong class="font-medium text-zinc-900">✅ Great for:</strong> advanced validation,
				business logic<br />
				<strong class="font-medium text-zinc-900">🚫 Takes time</strong> to build and maintain, and adds
				complexity
			</p>

			<h3 class="text-lg font-medium tracking-tight text-zinc-900">
				3. Use Prebuilt Tools (Google Forms, Typeform, etc.)
			</h3>

			<p>
				These tools let you drop in a working form with zero code — but they can look out of place
				in your custom site, and you lose flexibility.
			</p>

			<p>
				<strong class="font-medium text-zinc-900">✅ Great for:</strong> fast internal forms<br />
				<strong class="font-medium text-zinc-900">🚫 Not ideal</strong> for public-facing production
				sites
			</p>

			<hr class="my-8 border-zinc-200" />

			<h2 class="text-xl font-medium tracking-tight text-zinc-900">Start Simple, Scale Later</h2>

			<p>
				You don't have to commit to a complex backend on day one. A smart approach is to start with
				a form API like DevMatter, then incrementally add features as your needs grow.
			</p>

			<p>Here's how that can work:</p>

			<h3 class="text-lg font-medium tracking-tight text-zinc-900">1. Start with DevMatter</h3>

			<p>Add a form to your static site in minutes. No backend needed.</p>

			<div class="overflow-auto rounded-lg bg-[#1f1f1f] px-2 py-1 text-sm">
				<div class="inline-block min-w-full">
					{@html data.exampleHTMLFormHtml}
				</div>
			</div>

			<h3 class="text-lg font-medium tracking-tight text-zinc-900">
				2. Later, add your own backend
			</h3>

			<p>
				If you want custom logic — say, spam filtering or rate limiting — you can point your form to
				your own backend, process the submission, and then forward it to DevMatter using their API.
				You get the best of both worlds.
			</p>

			<h3 class="text-lg font-medium tracking-tight text-zinc-900">
				3. Eventually, move everything in-house
			</h3>

			<p>
				If you outgrow the form API entirely, you can replace it piece by piece with your own logic.
				But many teams never need to.
			</p>

			<p>This progressive model gives you speed now and flexibility later.</p>

			<hr class="my-8 border-zinc-200" />

			<h2 class="text-xl font-medium tracking-tight text-zinc-900">Common Use Cases</h2>

			<ul class="list-disc pl-3">
				<li>Contact or inquiry forms</li>
				<li>Beta waitlists and lead collection</li>
				<li>Bug report or feedback forms</li>
				<li>Simple internal tools</li>
			</ul>

			<hr class="my-8 border-zinc-200" />

			<h2 class="text-xl font-medium tracking-tight text-zinc-900">Why DevMatter?</h2>

			<p>
				DevMatter is built for developers who want a form backend for static sites without the
				hassle. It gives you:
			</p>

			<ul class="list-disc pl-3">
				<li>A clean API endpoint to post to</li>
				<li>A dashboard to view submissions</li>
				<li>Webhooks, notifications, and integrations</li>
				<li>Zero backend setup</li>
			</ul>

			<p>
				Whether you're building a landing page or a documentation site, DevMatter lets you go live
				quickly — and evolve your stack when you're ready.
			</p>

			<hr class="my-8 border-zinc-200" />

			<h2 class="text-xl font-medium tracking-tight text-zinc-900">Conclusion</h2>

			<p>
				Static sites are great — but forms don't work out of the box. Thankfully, you don't need to
				spin up your own backend just to collect a few fields. With a form API for static websites
				like DevMatter, you can start collecting data in minutes.
			</p>

			<p>
				And if your needs grow? You can build on top of it — gradually adding validation, custom
				workflows, or your own APIs. You're never locked in.
			</p>

			<hr class="my-8 border-zinc-200" />

			<p>
				<strong class="font-medium text-zinc-900"
					>Ready to start collecting form submissions from your static site?</strong
				><br />
				Try <a href="/" class="font-medium text-blue-600">DevMatter</a> — the simplest form backend for
				developers.
			</p>
		</div>
	</article>
</main>
