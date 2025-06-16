import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';

export async function load(event) {
	const appId = event.params.appId;

	if (!event.locals.session) {
		return redirect(302, '/login');
	}

	const res = await event.fetch(`${env.API_URL}/apps/${appId}`, {
		headers: {
			Authorization: `Bearer ${event.cookies.get('session')}`
		}
	});

	const data = await res.json();

	return { app: data };
}
