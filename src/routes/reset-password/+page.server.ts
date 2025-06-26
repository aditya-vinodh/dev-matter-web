import { env } from '$env/dynamic/private';
import { setSessionTokenCookie } from '$lib/server/session.js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const password = formData.get('password');
		const confirmPassword = formData.get('confirmPassword');

		if (password !== confirmPassword) {
			return fail(400, { error: 'password-not-matching', message: 'Passwords do not match' });
		}

		const res = await event.fetch(`${env.API_URL}/reset-password`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				token: event.cookies.get('resetPasswordToken'),
				newPassword: password
			})
		});

		const data = await res.json();
		console.log(data);

		if (!res.ok) {
			return fail(400, data);
		}

		event.cookies.delete('resetPasswordToken', { path: '/' });
		setSessionTokenCookie(event, data.sessionToken, new Date(data.expiresAt));

		return redirect(302, '/');
	}
};
