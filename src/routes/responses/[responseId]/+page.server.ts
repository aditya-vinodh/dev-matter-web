import { env } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';

export const actions = {
	archive: async (event) => {
		if (!event.locals.session) {
			return fail(401, { error: 'unauthorized' });
		}
		const responseId = event.params.responseId;

		const res = await event.fetch(`${env.API_URL}/responses/${responseId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${event.cookies.get('session') ?? ''}`
			},
			body: JSON.stringify({ archived: true })
		});

		const data = await res.json();
		if (!res.ok) {
			return fail(res.status, { error: data.message });
		}

		return { success: true };
	}
};
