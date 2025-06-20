import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';

export async function load(event) {
	const formId = event.params.formId;

	if (!event.locals.session) {
		return redirect(302, '/login');
	}

	const res = await event.fetch(`${env.API_URL}/forms/${formId}?archived=true`, {
		headers: {
			Authorization: `Bearer ${event.cookies.get('session')}`
		}
	});

	if (res.status === 404) {
		return redirect(302, '/');
	}
	const data = await res.json();

	return { form: data };
}
