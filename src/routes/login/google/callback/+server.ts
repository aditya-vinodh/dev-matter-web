import { env } from '$env/dynamic/private';
import { setSessionTokenCookie } from '$lib/server/session';

import { redirect, type RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('google_oauth_state') ?? null;
	const codeVerifier = event.cookies.get('google_code_verifier') ?? null;
	const mobileAuth = event.cookies.get('mobileAuth') ?? null;

	console.log('mobileAuth', mobileAuth);

	if (code === null || state === null || storedState === null || codeVerifier === null) {
		return new Response(null, {
			status: 400
		});
	}
	if (state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	const res = await event.fetch(`${env.API_URL}/login/google`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			code,
			codeVerifier
		})
	});

	const data = await res.json();

	if (event.cookies.get('mobileAuth')) {
		console.log('attempting redirect to app');
		return redirect(
			303,
			`devmatter://auth?token=${data.sessionToken}&userId=${data.user.id}&email=${data.user.email}&name=${data.user.name}&emailVerified=${data.user.emailVerified}&expiresAt=${data.expiresAt}`
		);
	} else {
		console.log('normal redirect');
		setSessionTokenCookie(event, data.sessionToken, new Date(data.expiresAt));
		return redirect(303, '/');
	}
}
