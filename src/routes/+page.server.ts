import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, cookies, fetch }) => {
	let apps = [];
	if (locals.user) {
		const token = cookies.get('session');
		const res = await fetch(`${env.API_URL}/apps`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		apps = await res.json();
	}

	return { apps };
};
