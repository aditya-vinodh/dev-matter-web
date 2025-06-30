import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = ({ locals, url }) => {
	const { user } = locals;

	if (user && !user?.emailVerified && url.pathname !== '/verify-email') {
		return redirect(303, '/verify-email');
	}
	return { user };
};
