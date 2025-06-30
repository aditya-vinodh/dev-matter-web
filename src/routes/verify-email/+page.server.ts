import { env } from '$env/dynamic/private';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	verify: async (event) => {
		if (!event.locals.session) {
			return fail(401, { error: 'unauthorized' });
		}

		const formData = await event.request.formData();
		const code = formData.get('code');

		const res = await event.fetch(`${env.API_URL}/verify-email`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${event.cookies.get('session')}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ code })
		});

		const data = await res.json();
		if (!res.ok) {
			return fail(res.status, data);
		}

		return redirect(303, '/');
	},
	resend: async (event) => {
		if (!event.locals.session) {
			return fail(401, { error: 'unauthorized' });
		}

		const res = await event.fetch(`${env.API_URL}/verify-email/resend`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${event.cookies.get('session')}`
			}
		});

		if (!res.ok) {
			return fail(res.status);
		}

		return { success: true };
	}
};
