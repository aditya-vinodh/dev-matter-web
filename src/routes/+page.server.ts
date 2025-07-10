import { env } from '$env/dynamic/private';
import { highlighter } from '$lib/server/highlighter';
import type { PageServerLoad } from './$types';

const exampleHTMLFormCode = `
<form action="https://api.devmatter.app/forms/123" method="post">
	<label for="name">Name:</label>
	<input type="text" id="name" name="name" required>
	<button type="submit">Submit</button>
</form>
`;

const exampleHTMLFormHtml = highlighter.codeToHtml(exampleHTMLFormCode, {
	lang: 'html',
	theme: 'min-dark'
});

const exampleCurlRequest = `
curl -X POST \\
  -H "Content-Type: application/json" \\
  -d '{"name": "John Doe"}' \\
  https://api.devmatter.app/forms/123
`;

const exampleCurlRequestCode = highlighter.codeToHtml(exampleCurlRequest, {
	lang: 'bash',
	theme: 'min-dark'
});

const exampleFetchRequest = `
fetch('https://api.devmatter.app/forms/123', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'John Doe' })
});
`;

const exampleFetchRequestCode = highlighter.codeToHtml(exampleFetchRequest, {
	lang: 'javascript',
	theme: 'min-dark'
});

export const load: PageServerLoad = async ({ locals, cookies, fetch, parent }) => {
	let apps = [];
	if (locals.user) {
		const token = cookies.get('session');
		const res = await fetch(`${env.API_URL}/apps`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		apps = await res.json();
	}

	const parentData = await parent();

	return {
		...parentData,
		apps,
		forms: {
			html: exampleHTMLFormHtml,
			curl: exampleCurlRequestCode,
			js: exampleFetchRequestCode
		}
	};
};
