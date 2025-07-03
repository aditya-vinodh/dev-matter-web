<script lang="ts">
	import Thumbnail from '$lib/images/blog/welcome-to-devmatter/thumbnail.png?enhanced';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
</script>

<svelte:head>
	<title>Welcome to DevMatter</title>
	<meta
		name="description"
		content="A suite of tools for developers to manage their projects. The first feature: a forms API with a nice mobile app!"
	/>
	<meta name="og:title" content="Welcome to DevMatter" />
	<meta
		name="og:description"
		content="A suite of tools for developers to manage their projects. The first feature: a forms API with a nice mobile app!"
	/>
	<meta name="og:image" content={Thumbnail.img.src} />
	<meta name="twitter:image" content={Thumbnail.img.src} />
</svelte:head>

<main class="mx-auto flex w-full max-w-xl flex-col gap-4 px-4 pt-10 pb-32 lg:max-w-2xl">
	<article class="flex flex-col gap-6">
		<a href="/blog" class="mb-4 flex items-center gap-2 text-sm text-zinc-500"
			><ChevronLeft size={16} />All blogs</a
		>

		<p class="text-sm text-zinc-500">Jul 2, 2025 • 1 min read</p>

		<h1 class="mb-2 text-3xl font-semibold tracking-tight">Welcome to DevMatter</h1>

		<div class="flex items-center gap-4">
			<enhanced:img
				src="../../../lib/images/aditya.jpeg?w=100"
				alt="Aditya"
				width="42"
				height="42"
				class="aspect-square rounded-full object-cover"
			/>
			<div class="flex flex-col justify-between">
				<p class="text-sm font-medium">Aditya</p>
				<p class="text-sm text-zinc-500">Founder</p>
			</div>
		</div>

		<enhanced:img
			src="../../../lib/images/blog/welcome-to-devmatter/thumbnail.png?w=1000"
			class="rounded-xl"
			alt="Thumbnail"
		/>

		<div class="flex flex-col gap-8 text-zinc-700 *:leading-loose">
			<p>
				As a solo developer, I’ve often found myself rebuilding the same backend tools over and over
				again — especially for handling user interactions like signups, contact forms, and feedback.
				I wanted a simple way to collect data and get notified when something important happened.
				But existing solutions like email and Slack weren’t cutting it — messages would get lost,
				cluttered, or buried in threads.
			</p>

			<p>
				So I built DevMatter — a modern, developer-focused tool to help manage your apps more
				efficiently, starting with one core feature: Forms.
			</p>

			<h2 class="text-xl font-medium tracking-tight text-zinc-900">
				The Form API Built for Developers
			</h2>

			<p>
				DevMatter makes it simple to collect and manage user-submitted data. Whether it’s a contact
				form, support request, survey, or feedback form, DevMatter helps you stay on top of what
				your users are saying — without rebuilding the backend every time.
			</p>

			<div class="flex flex-col">
				<p>Here’s what you get:</p>
				<ul class="list-disc pl-3 *:text-pretty">
					<li>
						<strong class="font-medium text-zinc-900">Custom forms</strong>: Design and integrate
						your own forms — no bloated UI builders or templates
					</li>
					<li>
						<strong class="font-medium text-zinc-900">Simple API</strong>: Submit form data directly
						to our endpoints. We handle storage and delivery.
					</li>
					<li>
						<strong class="font-medium text-zinc-900">Instant notifications</strong>: Get real-time
						push notifications through our clean mobile app.
					</li>
					<li>
						<strong class="font-medium text-zinc-900">Stay on top of your messages</strong>: View
						and respond to submissions on the go.
					</li>
				</ul>
			</div>

			<p>It’s fast to set up, easy to use, and built with developer experience in mind.</p>

			<h2 class="text-xl font-medium tracking-tight">Why I Built It</h2>

			<p>
				I wanted a tool that fit into my workflow, didn’t overwhelm me with features I didn’t use,
				and made it effortless to stay in the loop when someone reached out through my app.
			</p>

			<p>
				DevMatter is my attempt to fix that — a lightweight backend with real-time mobile alerts and
				a clean UI that respects your time.
			</p>

			<h2 class="text-xl font-medium tracking-tight">What’s Next?</h2>

			<p>
				Forms are just the beginning. I have many features planned — all centered around helping
				developers manage their apps more effectively. But I want to build this alongside other devs
				who feel the same pain I did.
			</p>

			<p>If this sounds useful to you, I’d love for you to try it out and share your feedback.</p>

			<p>👉 Check it out at <a href="/" class="font-semibold text-blue-600">devmatter.app</a></p>

			<p>
				Let me know what you think, and if you’d like access to the mobile app for push
				notifications, DM me or reach out through the <a href="/contact" class="underline"
					>contact form</a
				> — powered by DevMatter, of course.
			</p>
		</div>
	</article>
</main>
