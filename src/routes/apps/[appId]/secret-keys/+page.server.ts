import { env } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		if (!event.locals.session) {
			return fail(401, { error: 'unauthorized' });
		}

		const appId = event.params.appId;
		const formData = await event.request.formData();
		const name = formData.get('name');

		const res = await event.fetch(`${env.API_URL}/apps/${appId}/secret-keys`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${event.cookies.get('session')}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name
			})
		});

		const data = await res.json();
		if (!res.ok) {
			return fail(res.status, data.error);
		}

		return { success: true, key: data };
	}
};
