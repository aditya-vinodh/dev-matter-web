import { env } from '$env/dynamic/private';
import { fail, redirect } from '@sveltejs/kit';

export async function load(event) {
	if (!event.locals.session) {
		return redirect(302, '/login');
	}

	let apps = [];
	if (event.locals.user) {
		const token = event.cookies.get('session');
		const res = await fetch(`${env.API_URL}/apps`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		apps = await res.json();
	}

	const parentData = await event.parent();

	return {
		...parentData,
		apps
	};
}

export const actions = {
	default: async (event) => {
		if (!event.locals.session) {
			return fail(401, { error: 'unauthorized' });
		}
		const formData = await event.request.formData();
		const name = formData.get('name');
		const url = formData.get('url');

		const res = await event.fetch(`${env.API_URL}/apps`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${event.cookies.get('session')}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, url })
		});

		const data = await res.json();
		if (!res.ok) {
			return fail(res.status, data.message);
		}

		return redirect(302, `/apps/${data.id}`);
	}
};
