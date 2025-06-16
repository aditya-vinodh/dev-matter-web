import { env } from '$env/dynamic/private';
import { deleteSessionTokenCookie } from '$lib/server/session.js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		if (!event.locals.session) {
			return fail(401, {
				message: 'Not authenticated'
			});
		}

		await fetch(`${env.API_URL}/sessions/invalidate`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${event.cookies.get('session')}`
			}
		});

		deleteSessionTokenCookie(event);
		return redirect(302, '/');
	}
};
