<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-sm">
		<a href="/" class="mx-auto" aria-label="logo">
			<enhanced:img
				class="mx-auto size-10"
				src="../../lib/images/devmatter-rounded.png?w=100"
				alt="logo"
			/>
		</a>
		<h2 class="mt-10 text-center text-2xl/9 font-semibold tracking-tight text-gray-900">
			Sign up for an account
		</h2>
	</div>

	{#if form?.error}
		<div
			class="mt-10 rounded-lg bg-red-100/50 p-2 text-sm text-red-900 sm:mx-auto sm:w-full sm:max-w-sm"
		>
			{form.message}
		</div>
	{/if}

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
		<form class="space-y-6" method="POST" use:enhance>
			<div>
				<label for="name" class="block text-sm/6 font-medium text-gray-900">Name</label>
				<div class="mt-2">
					<input
						type="name"
						name="name"
						id="name"
						autocomplete="name"
						required
						class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-1 focus:outline-blue-600 sm:text-sm/6"
					/>
				</div>
			</div>
			<div>
				<label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
				<div class="mt-2">
					<input
						type="email"
						name="email"
						id="email"
						autocomplete="email"
						required
						class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-blue-600 sm:text-sm/6"
					/>
				</div>
			</div>

			<div>
				<div class="flex items-center justify-between">
					<label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
				</div>
				<div class="mt-2">
					<input
						type="password"
						name="password"
						id="password"
						autocomplete="new-password"
						required
						class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-blue-600 sm:text-sm/6"
					/>
				</div>
			</div>

			<div>
				<button
					type="submit"
					class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-medium text-white shadow-xs transition hover:bg-blue-600/90 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
					>Sign up</button
				>
			</div>
		</form>

		<p class="mt-10 text-center text-sm/6 text-gray-500">
			Already have an account?
			<a href="/login" class="font-medium text-blue-600 hover:text-blue-600/90">Log in</a>
		</p>
	</div>
</div>
