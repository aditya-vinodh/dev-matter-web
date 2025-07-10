import { env } from '$env/dynamic/private';
import { error, redirect } from '@sveltejs/kit';

export const GET = async ({ locals, fetch, cookies }) => {
	if (!locals.session) {
		error(401, 'unauthorized');
	}

	if (locals.user?.pricingPlan === 'free') {
		error(400, 'not-applicable');
	}

	const res = await fetch(`${env.API_URL}/portal`, {
		headers: {
			Authorization: `Bearer ${cookies.get('session')}`
		}
	});

	const data = await res.json();

	if (!res.ok) {
		error(res.status, data.error);
	}

	return redirect(303, data.customerPortalUrl);
};
