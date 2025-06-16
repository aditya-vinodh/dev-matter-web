import { env } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		if (!event.locals.session) {
			return fail(401, { error: 'unauthorized' });
		}

		const secretKeyId = event.params.secretKeyId;

		const res = await event.fetch(`${env.API_URL}/secret-keys/${secretKeyId}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${event.cookies.get('session')}`
			}
		});

		const data = await res.json();
		if (!res.ok) {
			return fail(res.status, data.error);
		}

		return { success: true };
	}
};
