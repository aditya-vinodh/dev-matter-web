<script lang="ts">
	import Header from '$lib/ui/Header.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Header user={data.user} />

<div class="mx-auto flex w-full max-w-xl flex-col gap-4 px-4 pt-10 pb-32 lg:max-w-3xl xl:max-w-5xl">
	<h1 class="mb-2 text-3xl font-semibold">Privacy policy</h1>

	<p>Last updated: June 27, 2025</p>

	<p>
		DevMatter (“we”, “our”, or “us”) respects your privacy. This Privacy Policy explains how we
		collect, use, and protect your information.
	</p>

	<h2 class="mt-8 text-xl font-semibold">1. Information we collect</h2>

	<p>We may collect:</p>

	<ul class="flex list-disc flex-col gap-2 *:ml-3">
		<li>Your email address and name (if you sign up)</li>
		<li>Usage data (like pages visited or features used)</li>
	</ul>

	<h2 class="mt-8 text-xl font-semibold">How we use Your information</h2>

	<p>We use your information to:</p>

	<ul class="flex list-disc flex-col gap-2 *:ml-3">
		<li>Provide and improve our services</li>
		<li>Communicate with you if needed</li>
		<li>Monitor usage to ensure reliability and performance</li>
	</ul>

	<h2 class="mt-8 text-xl font-semibold">Sharing Your Information</h2>

	<p>
		We do not sell your data. We may share it with trusted service providers to help run the app
		(e.g., hosting, analytics), but only as needed.
	</p>

	<h2 class="mt-8 text-xl font-semibold">Data Security</h2>

	<p>We use standard security practices to protect your information.</p>

	<h2 class="mt-8 text-xl font-semibold">Your Rights</h2>

	<p>You can contact us anytime to:</p>

	<ul class="flex list-disc flex-col gap-2 *:ml-3">
		<li>View or update your data</li>
		<li>Delete your account</li>
		<li>Ask questions about this policy</li>
	</ul>

	<h2 class="mt-8 text-xl font-semibold">Changes</h2>

	<p>We may update this policy. If we make significant changes, we’ll let you know.</p>

	<h2 class="mt-8 text-xl font-semibold">Contact</h2>

	<p>
		If you have any questions, email us at <a
			class="italic underline"
			href="mailto:adityavinodh22@gmail.com">adityavinodh22@gmail.com</a
		>.
	</p>
</div>
