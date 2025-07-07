import { env } from '$env/dynamic/private';
import { generateSessionToken, createSession, setSessionTokenCookie } from '$lib/server/session';

import { redirect, type RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('google_oauth_state') ?? null;
	const codeVerifier = event.cookies.get('google_code_verifier') ?? null;
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

	setSessionTokenCookie(event, data.sessionToken, new Date(data.expiresAt));

	return redirect(303, '/');
}
