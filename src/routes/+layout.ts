import posthog from 'posthog-js';
import { browser } from '$app/environment';

export const load = async () => {
	if (browser) {
		posthog.init('phc_PV9CTyvyh15l481JHkebN38iIG5LIFZOrbAi9fGam31', {
			api_host: 'https://us.i.posthog.com',
			defaults: '2025-05-24',
			person_profiles: 'always' // or 'always' to create profiles for anonymous users as well
		});
	}

	return;
};
