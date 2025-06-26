import { env } from '$env/dynamic/private';
import { setSessionTokenCookie } from '$lib/server/session.js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	verify: async (event) => {
		const formData = await event.request.formData();
		const code = formData.get('code');

		const res = await event.fetch(
			`${env.API_URL}/forgot-password/verify/${event.cookies.get('resetPasswordSession')}`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${event.cookies.get('session')}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ code })
			}
		);

		const data = await res.json();
		if (!res.ok) {
			return fail(res.status, data);
		}

		event.cookies.delete('resetPasswordSession', { path: '/' });
		event.cookies.set('resetPasswordToken', data.token, {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 7 // 7 days
		});

		return redirect(302, '/reset-password');
	},
	resend: async (event) => {
		const res = await event.fetch(
			`${env.API_URL}/forgot-password/resend/${event.cookies.get('resetPasswordSession')}`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${event.cookies.get('session')}`
				}
			}
		);

		const data = await res.json();
		if (!res.ok) {
			return fail(res.status);
		}

		event.cookies.set('resetPasswordSession', data.emailVerificationRequestId, {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 7 // 7 days
		});

		return { success: true };
	}
};
