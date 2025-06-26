<script lang="ts">
	import { enhance } from '$app/forms';
	import { PinInput, REGEXP_ONLY_DIGITS_AND_CHARS, type PinInputRootSnippetProps } from 'bits-ui';
	import cn from 'clsx';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();

	let value = $state('');
	type CellProps = PinInputRootSnippetProps['cells'][0];

	function onComplete() {}
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-sm">
		<a href="/" class="mx-auto" aria-label="logo">
			<img class="mx-auto size-10" src="/devmatter-rounded.png" alt="logo" />
		</a>
		<h2 class="mt-10 text-center text-2xl/9 font-semibold tracking-tight text-gray-900">
			Verify your email address
		</h2>
	</div>

	{#if form?.error}
		<div
			class="mt-10 rounded-lg bg-red-100/50 p-2 text-sm text-red-900 sm:mx-auto sm:w-full sm:max-w-sm"
		>
			{form.message}
		</div>
	{/if}

	{#if form?.success}
		<div
			class="mt-10 rounded-lg bg-green-100/50 p-2 text-sm text-green-900 sm:mx-auto sm:w-full sm:max-w-sm"
		>
			A new code has been resent to your email address.
		</div>
	{/if}

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
		<form class="space-y-6" action="/forgot-password/verify?/verify" method="POST" use:enhance>
			<div>
				<label for="code" class="block text-sm/6 font-medium text-gray-900"
					>Enter the code sent to your email</label
				>
				<div class="mt-2">
					<PinInput.Root
						bind:value
						id="code"
						name="code"
						class="flex items-center justify-center text-zinc-800 has-disabled:opacity-30"
						maxlength={6}
						{onComplete}
						pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
					>
						{#snippet children({ cells })}
							<div class="flex">
								{#each cells.slice(0, 3) as cell, i (i)}
									{@render Cell(cell)}
								{/each}
							</div>

							<div class="flex w-10 items-center justify-center">
								<div class="bg-border h-1 w-3 rounded-full"></div>
							</div>

							<div class="flex">
								{#each cells.slice(3, 6) as cell, i (i)}
									{@render Cell(cell)}
								{/each}
							</div>
						{/snippet}
					</PinInput.Root>

					{#snippet Cell(cell: CellProps)}
						<PinInput.Cell
							{cell}
							class={cn(
								// Custom class to override global focus styles
								'focus-override',
								'relative mx-auto h-14 w-10 text-[2rem]',
								'flex items-center justify-center',
								'transition-all duration-75',
								'border-y border-r border-l border-zinc-900/20 first:rounded-l-md first:border-l last:rounded-r-md',
								'text-foreground group-hover/pininput:border-foreground/40 group-focus-within/pininput:border-zinc-900/40',
								'outline-0',
								'data-active:border-black data-active:outline-1 data-active:outline-black'
							)}
						>
							{#if cell.char !== null}
								<div>
									{cell.char}
								</div>
							{/if}
							{#if cell.hasFakeCaret}
								<div class="pointer-events-none absolute inset-0 flex items-center justify-center">
									<div class="h-8 w-px bg-black"></div>
								</div>
							{/if}
						</PinInput.Cell>
					{/snippet}
				</div>
			</div>

			<div>
				<button
					type="submit"
					class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-medium text-white shadow-xs transition hover:bg-blue-600/90 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
					>Verify</button
				>
			</div>
		</form>

		<div class="mt-10 flex items-center justify-center gap-2 text-center text-sm/6 text-gray-500">
			Didn't receive the email?
			<form action="/forgot-password/verify?/resend" use:enhance method="POST">
				<button class="font-medium text-blue-600 hover:text-blue-600/90">Resend</button>
			</form>
		</div>
	</div>
</div>
