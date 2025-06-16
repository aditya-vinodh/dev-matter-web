import type { RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
	event.cookies.set('session', token, {
		httpOnly: true,
		path: '/',
		secure: import.meta.env.PROD,
		sameSite: 'lax',
		expires: new Date(expiresAt)
	});
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
	event.cookies.set('session', '', {
		httpOnly: true,
		path: '/',
		secure: import.meta.env.PROD,
		sameSite: 'lax',
		maxAge: 0
	});
}

export async function validateSessionToken(
	event: RequestEvent,
	token: string
): Promise<SessionValidationResult> {
	const res = await event.fetch(`${env.API_URL}/sessions/validate`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	if (!res.ok) {
		return { user: null, session: null };
	}

	const data = (await res.json()) as SessionValidationResult;
	console.log(data);
	return data;
}

export interface Session {
	id: string;
	expiresAt: Date;
	userId: number;
}

type SessionValidationResult = { session: Session; user: User } | { session: null; user: null };
