import { env } from '$env/dynamic/private';
import { redirect, type RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent): Promise<Response> {
	const res = await event.fetch(`${env.API_URL}/login/github`);
	const data = await res.json();

	const { url, state } = data;

	event.cookies.set('github_oauth_state', state, {
		path: '/',
		httpOnly: true,
		maxAge: 60 * 10, // 10 minutes
		sameSite: 'lax'
	});

	return redirect(303, url);
}
