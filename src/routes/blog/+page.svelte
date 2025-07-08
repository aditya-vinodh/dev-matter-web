<script lang="ts">
	const adityaPicture = '../../lib/images/aditya.jpeg?w=100';

	const blogs = [
		{
			slug: 'how-to-collect-form-data-from-static-sites-using-a-simple-api',
			title: 'How to Collect Form Data from Static Sites Using a Simple API',
			description:
				'Learn how to easily collect form data from static sites without a backend. Explore options, use cases, and how form APIs like DevMatter simplify the process and let you scale later.',
			date: 'Jul 8, 2025',
			author: {
				name: 'Aditya',
				picture: adityaPicture,
				title: 'Founder'
			}
		},
		{
			slug: 'why-developers-are-moving-away-from-google-forms-for-production-apps',
			date: 'Jul 7, 2024',
			title: 'Why Developers Are Moving Away from Google Forms for Production Apps',
			description:
				'Many developers are moving away from Google Forms for production apps. Learn why and explore better Google Forms alternatives built for developers with full backend control and flexibility.',
			author: {
				name: 'Aditya',
				picture: adityaPicture,
				title: 'Founder'
			}
		},
		{
			slug: 'best-way-to-build-forms-with-tailwind-and-a-form-api',
			date: 'Jul 4, 2024',
			title: 'Best Way to Build Forms with Tailwind and a Form API',
			description:
				'Learn the best way to build custom forms using Tailwind CSS and a form API backend. Easily style professional forms and handle submissions with DevMatter — get real-time push notifications and manage responses on the go.',
			author: {
				name: 'Aditya',
				picture: adityaPicture,
				title: 'Founder'
			}
		},
		{
			slug: 'how-to-handle-form-submissions-without-a-backend',
			date: 'Jul 3, 2024',
			title: 'How to Handle Form Submissions Without a Backend',
			description:
				'Learn about the different options for handling form submissions without managing your own backend.',
			author: {
				name: 'Aditya',
				picture: adityaPicture,
				title: 'Founder'
			}
		},
		{
			slug: 'welcome-to-devmatter',
			date: 'Jul 2, 2024',
			title: 'Welcome to DevMatter',
			description:
				'A suite of tools for developers to manage their projects. The first feature: a forms API with a nice mobile app!',
			author: {
				name: 'Aditya',
				picture: adityaPicture,
				title: 'Founder'
			}
		}
	];
</script>

<main
	class="mx-auto flex w-full max-w-xl flex-col gap-4 px-4 pt-10 pb-32 lg:max-w-3xl xl:max-w-5xl"
>
	<div class="border-b border-zinc-300 pb-12">
		<h1 class="mb-2 text-3xl font-semibold tracking-tight">From the Blog</h1>
		<p class="text-zinc-500">Insightful content from the DevMatter team</p>
	</div>

	<div class="mt-10 flex flex-col gap-8">
		{#each blogs as blog (blog.slug)}
			<article>
				<a
					href="/blog/{blog.slug}"
					class="flex flex-col gap-4 rounded-xl p-2 transition hover:bg-zinc-100"
				>
					<p class="text-sm text-zinc-500">{blog.date}</p>
					<h2 class="text-xl font-medium">{blog.title}</h2>
					<p class="text-sm text-pretty text-zinc-500">{blog.description}</p>
					<div class="flex items-center gap-4 pt-2">
						<enhanced:img
							src="../../lib/images/aditya.jpeg?w=100"
							alt="Aditya"
							width="42"
							height="42"
							class="aspect-square rounded-full object-cover"
						/>
						<div class="flex flex-col justify-between">
							<p class="text-sm font-medium">{blog.author.name}</p>
							<p class="text-sm text-zinc-500">{blog.author.title}</p>
						</div>
					</div>
				</a>
			</article>
		{/each}
	</div>
</main>
