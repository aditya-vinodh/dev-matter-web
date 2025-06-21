import { env } from '$env/dynamic/private';
import { fail, redirect } from '@sveltejs/kit';

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

export const actions = {
	update: async (event) => {
		if (!event.locals.session) {
			return fail(401, { error: 'unauthorized' });
		}

		const formData = await event.request.formData();
		const name = formData.get('name');
		const url = formData.get('url');

		const appId = event.params.appId;

		const res = await event.fetch(`${env.API_URL}/apps/${appId}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${event.cookies.get('session')}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, url })
		});

		const data = await res.json();
		console.log(data.error);
		if (!res.ok) {
			return fail(res.status, { error: 'failed to update app' });
		}

		return {
			success: true,
			data: {
				name,
				url
			}
		};
	},
	delete: async (event) => {
		if (!event.locals.session) {
			return fail(401, { error: 'unauthorized' });
		}

		const appId = event.params.appId;

		const res = await event.fetch(`${env.API_URL}/apps/${appId}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${event.cookies.get('session')}`
			}
		});

		const data = await res.json();
		console.log(data);
		if (!res.ok) {
			return fail(res.status, { error: 'failed to delete app' });
		}

		return redirect(301, '/');
	}
};
