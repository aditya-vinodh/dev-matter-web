import { env } from '$env/dynamic/private';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { setSessionTokenCookie } from '$lib/server/session';

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		const res = await event.fetch(`${env.API_URL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email,
				password
			})
		});

		const data = await res.json();
		if (!res.ok) {
			return fail(res.status, data);
		}

		setSessionTokenCookie(event, data.sessionToken, new Date(data.expiresAt));
		return redirect(302, '/');
	}
} satisfies Actions;
