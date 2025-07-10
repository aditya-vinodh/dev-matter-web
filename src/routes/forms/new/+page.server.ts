import { env } from '$env/dynamic/private';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		if (!event.locals.session) {
			return fail(401, { error: 'unauthorized' });
		}

		const appId = parseInt(event.url.searchParams.get('appId') as string);

		const res = await event.fetch(`${env.API_URL}/forms`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${event.cookies.get('session')}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				appId
			})
		});

		const data = await res.json();
		if (!res.ok) {
			if (data.error === 'limit-reached') {
				return redirect(303, `/forms/limit-reached`);
			}
			return fail(res.status, data.error);
		}

		return redirect(302, `/forms/${data.id}`);
	}
};
