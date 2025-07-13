import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const parentData = await event.parent();

	if (!event.locals.user) {
		return redirect(303, '/');
	}

	return {
		...parentData,
		launchMonthly: `${env.NODE_ENV === 'production' ? 'https://api.devmatter.app' : env.API_URL}/checkout?products=${
			env.NODE_ENV === 'production'
				? '1d27c985-b51e-4776-a7ab-0d0e2525cef3'
				: '0d284306-c82b-4668-9a93-db436dcbcaca'
		}&customerExternalId=${event.locals.user.id}&customerEmail=${event.locals.user.email}&customerName=${event.locals.user.name}`
	};
};
