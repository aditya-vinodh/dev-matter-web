import { env } from '$env/dynamic/private';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { setSessionTokenCookie } from '$lib/server/session';

export const load = async (event) => {
	const url = event.url;
	const searchParams = url.searchParams;
	const mobileAuth = searchParams.get('mobileAuth');

	if (mobileAuth) {
		event.cookies.set('mobileAuth', mobileAuth, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 60 * 10 // 10 minutes
		});
	} else {
		event.cookies.delete('mobileAuth', {
			path: '/'
		});
	}
};

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const name = formData.get('name');
		const email = formData.get('email');
		const password = formData.get('password');

		const res = await event.fetch(`${env.API_URL}/users`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
				email,
				password
			})
		});

		const data = await res.json();
		if (!res.ok) {
			return fail(res.status, data);
		}

		if (event.cookies.get('mobileAuth')) {
			return redirect(
				303,
				`devmatter://auth?token=${data.sessionToken}&userId=${data.user.id}&email=${data.user.email}&name=${data.user.name}&emailVerified=${data.user.emailVerified}&expiresAt=${data.expiresAt}`
			);
		} else {
			setSessionTokenCookie(event, data.sessionToken, new Date(data.expiresAt));
			return redirect(302, '/');
		}
	}
} satisfies Actions;
