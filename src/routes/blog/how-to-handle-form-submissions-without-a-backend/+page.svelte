<script lang="ts">
	import Thumbnail from '$lib/images/blog/how-to-handle-form-submissions-without-a-backend/thumbnail.png?enhanced';
	import FormDashboard from '$lib/images/blog/how-to-handle-form-submissions-without-a-backend/form-dashboard.png?enhanced';
	import MobileScreenshot from '$lib/images/screenshot.webp?enhanced';
	import Aditya from '$lib/images/aditya.jpeg?enhanced';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';

	import { highlighter } from '$lib/index';

	const exampleHTMLFormCode = `<form action="https://api.devmatter.app/forms/<your-form-id>" method="POST">
  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <button type="submit">Submit</button>
</form>`;
	const exampleHTMLFormHtml = highlighter.codeToHtml(exampleHTMLFormCode, {
		lang: 'html',
		theme: 'min-dark'
	});

	const exampleJavascriptFormCode = `fetch("https://api.devmatter.app/forms/<your-form-id>", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Jane", email: "jane@example.com" }),
});`;
	const exampleJavascriptFormHtml = highlighter.codeToHtml(exampleJavascriptFormCode, {
		lang: 'javascript',
		theme: 'min-dark'
	});
</script>

<svelte:head>
	<title>How to Handle Form Submissions Without a Backend</title>
	<meta
		name="description"
		content="Learn about the different options for handling form submissions without managing your own backend."
	/>
	<meta name="og:title" content="Welcome to DevMatter" />
	<meta
		name="og:description"
		content="Learn about the different options for handling form submissions without managing your own backend."
	/>
	<meta name="og:image" content={Thumbnail.img.src} />
	<meta name="twitter:image" content={Thumbnail.img.src} />
</svelte:head>

<main class="mx-auto flex w-full max-w-xl flex-col gap-4 px-4 pt-10 pb-32 lg:max-w-2xl">
	<article class="flex flex-col gap-6">
		<a href="/blog" class="mb-4 flex items-center gap-2 text-sm text-zinc-500"
			><ChevronLeft size={16} />All blogs</a
		>

		<p class="text-sm text-zinc-500">Jul 3, 2025 • 2 min read</p>

		<h1 class="mb-2 text-3xl font-semibold tracking-tight">
			How to Handle Form Submissions Without a Backend
		</h1>

		<div class="flex items-center gap-4">
			<enhanced:img
				src={Aditya}
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

		<enhanced:img src={Thumbnail} class="rounded-xl" alt="Thumbnail" />

		<div class="flex flex-col gap-8 text-zinc-700 *:leading-loose">
			<p>
				If you’re building a modern web app or landing page, there’s a good chance you’ve needed a
				simple way to handle form submissions. But what if you don’t want to spin up a backend just
				to receive some data?
			</p>
			<p>
				In this post, we’ll explore your options—and show you one of the easiest ways to get
				real-time push notifications for form submissions, without relying on email or managing your
				own server.
			</p>

			<h2 class="text-xl font-medium tracking-tight text-zinc-900">
				✅ Common Options for Handling Form Submissions
			</h2>

			<ol class="flex list-decimal flex-col gap-4 pl-5">
				<li><h3 class="font-medium text-zinc-900">Email-Based Form Services</h3></li>
				<p>
					There are tools that send form data to your inbox. These are simple to set up but come
					with drawbacks:
				</p>

				<ul class="list-disc pl-3">
					<li>You’re stuck with email for notifications</li>
					<li>Not ideal for fast-moving teams or mobile-first workflows</li>
					<li>Could end up cluttering your inbox</li>
				</ul>

				<li><h3 class="font-medium text-zinc-900">Slack-Based Form Services</h3></li>
				<p>
					These tools send form data to your Slack channels. They are great if you already have a
					team that uses Slack. However, it may be hard to read through submissions on a slack
					channel and manage them efficiently.
				</p>

				<li><h3 class="font-medium text-zinc-900">Custom Backend</h3></li>
				<p>
					You could build your own backend with Node, Python, or PHP, hook it to a database, and
					deploy it somewhere. This gives you full control, but it also means:
				</p>

				<ul class="list-disc pl-3">
					<li>Writing and maintaining code</li>
					<li>Handling spam, storage, and performance</li>
					<li>Handling your own notifications service</li>
				</ul>

				<li><h3 class="font-medium text-zinc-900">Third-Party No-Code Tools</h3></li>
				<p>
					Platforms like Google Forms, Airtable, or Typeform let you set up forms fast. But they
					limit your UI and often feel clunky when you want deep customization or a native feel.
				</p>
			</ol>
			<h2 class="text-xl font-medium text-zinc-900">
				🚀 A Simpler, Developer-Friendly Alternative: DevMatter
			</h2>

			<p>
				If you want <strong class="font-medium text-zinc-900"
					>form notifications without email</strong
				> and hate the overhead of backend code, DevMatter might be exactly what you’re looking for.
			</p>

			<h3 class="text-lg font-medium text-zinc-900">What it is:</h3>

			<p>
				DevMatter is a lightweight form backend built for developers. You design the form however
				you want—React, Vue, Svelte, plain HTML, anything—and simply POST data to our API.
			</p>

			<h3 class="text-lg font-medium text-zinc-900">Key features:</h3>

			<ul class="list-disc pl-3">
				<li>No backend required: Just send a fetch() request or use a regular HTML form</li>
				<li>Customizable response: Choose between JSON or a redirect after submission</li>
				<li>
					Push notifications: Get real-time alerts on your phone when someone submits your form
				</li>
				<li>Mobile app: View submissions and reply on the go</li>
				<li>Developer-first: You own the UI, we just handle the backend plumbing</li>
			</ul>

			<h4 class="font-medium text-zinc-900">Example:</h4>
			<div class="overflow-auto rounded-lg bg-[#1f1f1f] px-2 py-1 text-sm">
				<div class="inline-block min-w-full">
					{@html exampleHTMLFormHtml}
				</div>
			</div>

			<p>Or use javascript:</p>

			<div class="overflow-auto rounded-lg bg-[#1f1f1f] px-2 py-1 text-sm">
				<div class="inline-block min-w-full">
					{@html exampleJavascriptFormHtml}
				</div>
			</div>

			<p>Once a user submits a form, you can view the responses from your dashboard</p>

			<enhanced:img src={FormDashboard} alt="DevMatter form dashboard" />

			<p>
				You can also download our mobile app to receive push notifications and view responses over
				there.
			</p>

			<enhanced:img src={MobileScreenshot} alt="DevMatter mobile app" width="250" class="mx-auto" />

			<h2 class="text-xl font-medium text-zinc-900">📱 Get Started in Minutes</h2>

			<p>
				You can start using DevMatter for free. Just create a form endpoint, integrate it into your
				frontend, and start collecting data — <strong class="font-medium text-zinc-900"
					>no backend, no email, no stress.</strong
				>
			</p>

			<p>
				🔗 <a href="/" class="font-medium text-blue-600">Try DevMatter →</a>
			</p>

			<h2 class="text-xl font-medium text-zinc-900">Final Thoughts</h2>

			<p>
				Whether you’re building a feedback form, contact form, or early-access waitlist, you don’t
				need a full backend to handle form data. And if you’re tired of managing email
				notifications, try our API and our mobile app for a seamless experience.
			</p>

			<p>Stop overengineering your forms. Start focusing on what matters.</p>
		</div>
	</article>
</main>
