import { env } from '$env/dynamic/private';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email');

		const res = await event.fetch(`${env.API_URL}/forgot-password`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
		});

		const data = await res.json();

		if (!res.ok) {
			return fail(400, data);
		}

		event.cookies.set('resetPasswordSession', data.emailVerificationRequestId, {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 // 24 hours
		});

		return redirect(303, '/forgot-password/verify');
	}
};
