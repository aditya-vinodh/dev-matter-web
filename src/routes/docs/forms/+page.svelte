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
				<!-- Overview -->
				<div>
					<p class="leading-loose">
						Forms provide you with a powerful API to collect and manage form submissions from your
						applications.
					</p>
				</div>

				<!-- Getting Started -->
				<div>
					<h2 class="mb-4 text-xl font-semibold">Getting Started</h2>
					<p class="mb-4 leading-loose">
						To create a form, navigate to your app's dashboard and click "Create Form". You'll be
						able to configure your form's settings and define its schema.
					</p>
					<enhanced:img
						src="$lib/images/docs/forms/create-form.png"
						alt="Screenshot of app dashboard"
						class="mx-auto max-w-xl"
					/>
				</div>

				<!-- Form Privacy & Security -->
				<div>
					<h2 class="mb-4 text-xl font-semibold">Form Privacy & Security</h2>
					<p class="mb-4 leading-loose">
						Forms can be configured as either <strong>public</strong> or <strong>private</strong>:
					</p>
					<div class="mb-4 ml-4">
						<h3 class="mb-2 text-lg font-medium">Private Forms (Default)</h3>
						<p class="mb-2 leading-loose">
							Private forms require a secret key to be submitted. This provides an additional layer
							of security and prevents unauthorized submissions.
						</p>
						<p class="mb-4 leading-loose">
							You need to pass the secret key in the Authorization header using the Bearer scheme.
							You can generate a secret key from your app's dashboard. For example:
							<code class="rounded-md bg-gray-100 px-2 py-1"
								>Authorization: Bearer YOUR_SECRET_KEY</code
							>
						</p>
					</div>
					<div class="mb-4 ml-4">
						<h3 class="mb-2 text-lg font-medium">Public Forms</h3>
						<p class="mb-2 leading-loose">
							Public forms can be submitted by anyone on the internet without authentication.
						</p>
					</div>
					<enhanced:img
						src="$lib/images/docs/forms/form-visibility.png"
						alt="Screenshot of configuring form visibility"
					/>
				</div>

				<!-- Form Schema Definition -->
				<div>
					<h2 class="mb-4 text-xl font-semibold">Defining Your Form Schema</h2>
					<p class="mb-4 leading-loose">
						Every form requires a schema that defines its structure and validation rules. For each
						field in your form, you need to specify:
					</p>
					<ul class="mb-4 ml-6 list-disc space-y-2">
						<li>
							<strong>Field ID:</strong> A unique identifier for the field (e.g., "full-name", "email")
						</li>
						<li><strong>Label:</strong> The display name for the field</li>
						<li><strong>Type:</strong> The data type (string, number, file)</li>
						<li><strong>Required:</strong> Whether the field is mandatory</li>
					</ul>
					<p class="mb-4 leading-loose">
						This schema enables automatic validation and proper data storage. DevMatter will
						validate submissions against your schema and reject invalid data.
					</p>
					<enhanced:img
						src="$lib/images/docs/forms/form-schema.png"
						alt="Screenshot of configuring form's schema"
						class="mx-auto max-w-xl"
					/>
				</div>

				<!-- Submission Methods -->
				<div>
					<h2 class="mb-4 text-xl font-semibold">Submission Methods</h2>
					<p class="mb-4 leading-loose">
						DevMatter Forms supports multiple submission methods to fit your application's needs. It
						accepts JSON, FormData, and URL-encoded data. This makes it easy to integrate in any
						manner.
					</p>

					<div class="mb-6 ml-4">
						<h3 class="mb-3 text-lg font-medium">1. HTML Form Submission</h3>
						<p class="mb-3 leading-loose">
							Use a standard HTML form element by setting your unique form URL in the action
							attribute. Make sure the <code>name</code> attribute of each input matches your field ID.
						</p>
						<div class="mb-3 rounded-lg bg-gray-50 p-4">
							<code class="text-sm">
								&lt;form action="https://api.devmatter.com/forms/your-form-id" method="POST"&gt;<br
								/>
								&nbsp;&nbsp;&lt;input type="text" name="full-name" required&gt;<br />
								&nbsp;&nbsp;&lt;input type="email" name="email" required&gt;<br />
								&nbsp;&nbsp;&lt;button type="submit"&gt;Submit&lt;/button&gt;<br />
								&lt;/form&gt;
							</code>
						</div>
					</div>

					<div class="mb-6 ml-4">
						<h3 class="mb-3 text-lg font-medium">2. JSON API Submission</h3>
						<p class="mb-3 leading-loose">
							Make a direct HTTP POST request with JSON data. Ensure that the JSON keys match your
							field IDs.
						</p>
						<div class="mb-3 rounded-lg bg-gray-50 p-4">
							<code class="text-sm">
								POST https://api.devmatter.com/forms/your-form-id<br />
								Content-Type: application/json<br /><br />
								&lbrace;<br />
								&nbsp;&nbsp;"full-name": "John Doe",<br />
								&nbsp;&nbsp;"email": "john@example.com"<br />
								&rbrace;
							</code>
						</div>
					</div>
				</div>

				<!-- Response Handling -->
				<div>
					<h2 class="mb-4 text-xl font-semibold">Response Handling</h2>
					<p class="mb-4 leading-loose">
						After a form submission, you can choose how users should be handled - either with a JSON
						response or a redirect.
					</p>

					<div class="mb-6 ml-4">
						<h3 class="mb-3 text-lg font-medium">JSON Response (Default)</h3>
						<p class="mb-3 leading-loose">
							By default, successful submissions return a JSON response with the submission ID:
						</p>
						<div class="mb-3 rounded-lg bg-gray-50 p-4">
							<code class="text-sm">
								&lbrace;<br />
								&nbsp;&nbsp;"responseId": 123<br />
								&rbrace;
							</code>
						</div>
						<p class="leading-loose">
							This is ideal for fetch submissions or when you want to handle the response
							programmatically.
						</p>
					</div>

					<div class="mb-6 ml-4">
						<h3 class="mb-3 text-lg font-medium">Redirect Response</h3>
						<p class="mb-3 leading-loose">
							You can configure your form to redirect users after submission instead of returning
							JSON. This is perfect for traditional HTML forms.
						</p>

						<h4 class="mb-2 text-base font-medium">Setting Up Redirects</h4>
						<ul class="mb-4 ml-6 list-disc space-y-2">
							<li><strong>Success URL:</strong> Where to redirect after successful submission</li>
							<li><strong>Failure URL:</strong> Where to redirect if submission fails</li>
							<li>
								<strong>Default Pages:</strong> If URLs are left blank, we'll redirect to our default
								success/failure pages
							</li>
						</ul>

						<h4 class="mb-2 text-base font-medium">Dynamic Parameters</h4>
						<p class="mb-3 leading-loose">
							You can include submitted form data in your redirect URLs using the <code>@</code> symbol
							followed by the field ID. For example:
						</p>
						<div class="mb-3 rounded-lg bg-gray-50 p-4">
							<code class="text-sm">
								Success URL: https://myapp.com/forms/success?name=@full-name&email=@email<br />
							</code>
						</div>
						<p class="mb-3 leading-loose">
							If a user submits a form with "John Doe" in the <code>full-name</code> field, the redirect
							would become:
						</p>
						<div class="mb-3 rounded-lg bg-gray-50 p-4">
							<code class="text-sm">
								https://myapp.com/forms/success?name=John%20Doe&email=john@example.com
							</code>
						</div>
					</div>

					<enhanced:img
						src="$lib/images/docs/forms/form-redirect.png"
						alt="Screenshot of configuring form redirect URLs"
						class="mx-auto max-w-xs"
					/>
				</div>

				<!-- Best Practices -->
				<div>
					<h2 class="mb-4 text-xl font-semibold">Best Practices</h2>
					<ul class="ml-6 list-disc space-y-2 *:leading-loose">
						<li>
							<strong>Field IDs:</strong> Use descriptive, kebab-case field IDs (e.g., "full-name", "phone-number")
						</li>
						<li>
							<strong>Validation:</strong> Define appropriate field types and requirements to ensure
							data quality (Add additional custom validation in your app if required)
						</li>
						<li>
							<strong>Security:</strong> Use private forms with secret keys for sensitive data (Don't
							expose your secret keys)
						</li>
						<li>
							<strong>User Experience:</strong> Provide clear success and error messages through redirects
							or custom handling
						</li>
						<li>
							<strong>Testing:</strong> Always test your forms with both valid and invalid data
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
