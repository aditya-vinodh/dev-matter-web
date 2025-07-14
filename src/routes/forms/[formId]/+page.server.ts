import { env } from '$env/dynamic/private';
import { fail, redirect } from '@sveltejs/kit';

export async function load(event) {
	const formId = event.params.formId;

	if (!event.locals.session) {
		return redirect(302, '/login');
	}

	const parentData = await event.parent();

	const res = await event.fetch(`${env.API_URL}/forms/${formId}`, {
		headers: {
			Authorization: `Bearer ${event.cookies.get('session')}`
		}
	});

	if (res.status === 404) {
		return redirect(302, '/');
	}
	const data = await res.json();

	return {
		...parentData,
		form: data
	};
}

export const actions = {
	updateName: async (event) => {
		if (!event.locals.session) {
			return fail(401, { error: 'unauthorized' });
		}

		const formData = await event.request.formData();
		const name = formData.get('name');

		if (!name || name === '') {
			return fail(400, { error: 'Name is required' });
		}

		const formId = event.params.formId;

		const res = await event.fetch(`${env.API_URL}/forms/${formId}`, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${event.cookies.get('session')}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name
			})
		});

		const data = await res.json();
		if (!res.ok) {
			return fail(res.status, data.error);
		}

		return { success: true };
	},
	updateSchema: async (event) => {
		if (!event.locals.session) {
			return fail(401, { error: 'unauthorized' });
		}
		const formData = await event.request.formData();
		const data = formData.entries();

		const groups = [];
		let currentGroup = [];

		for (const item of data) {
			if (currentGroup.length === 3 && item[0] === 'label') {
				groups.push(currentGroup);
				currentGroup = [];
			}
			currentGroup.push(item);

			if (currentGroup.length === 4) {
				groups.push(currentGroup);
				currentGroup = [];
			}
		}

		if (currentGroup.length > 0) {
			groups.push(currentGroup);
		}

		let fields = [];
		for (const item of groups) {
			let field = {};
			for (const i of item) {
				field[i[0]] = i[1];
			}
			fields.push(field);
		}

		const formId = event.params.formId;
		const res = await event.fetch(`${env.API_URL}/forms/${formId}`, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${event.cookies.get('session')}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				fields
			})
		});

		const resData = await res.json();
		if (!res.ok) {
			return fail(res.status, resData.error);
		}

		return { success: true };
	},
	updateVisibility: async (event) => {
		if (!event.locals.session) {
			return fail(401, { error: 'unauthorized' });
		}

		const formData = await event.request.formData();
		const isPublic = formData.get('public');
		const formId = event.params.formId;
		const res = await event.fetch(`${env.API_URL}/forms/${formId}`, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${event.cookies.get('session')}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				public: isPublic === 'true' ? true : false
			})
		});

		const data = await res.json();
		if (!res.ok) {
			return fail(res.status, data.erro);
		}

		return { success: true };
	},
	delete: async (event) => {
		if (!event.locals.session) {
			return fail(401, { error: 'unauthorized' });
		}

		const formId = event.params.formId;
		const res = await event.fetch(`${env.API_URL}/forms/${formId}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${event.cookies.get('session')}`,
				'Content-Type': 'application/json'
			}
		});

		const data = await res.json();
		if (!res.ok) {
			return fail(res.status, data.error);
		}

		return redirect(303, '/');
	},
	updateRedirectOnSubmit: async (event) => {
		if (!event.locals.session) {
			return fail(401, { error: 'unauthorized' });
		}

		const formData = await event.request.formData();
		const redirectOnSubmit = formData.get('redirectOnSubmit');
		const formId = event.params.formId;
		const res = await event.fetch(`${env.API_URL}/forms/${formId}`, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${event.cookies.get('session')}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				redirectOnSubmit: redirectOnSubmit === 'true' ? true : false
			})
		});

		const data = await res.json();
		console.log(data);
		if (!res.ok) {
			return fail(res.status, data.error);
		}

		return { success: true };
	},
	updateRedirectUrls: async (event) => {
		if (!event.locals.session) {
			return fail(401, { error: 'unauthorized' });
		}

		const formData = await event.request.formData();
		const successUrl = formData.get('successUrl');
		const failureUrl = formData.get('failureUrl');

		const formId = event.params.formId;
		const res = await event.fetch(`${env.API_URL}/forms/${formId}`, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${event.cookies.get('session')}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				successUrl: successUrl,
				failureUrl: failureUrl
			})
		});

		const data = await res.json();
		console.log(data);
		if (!res.ok) {
			return fail(res.status, data.error);
		}

		return { success: true };
	}
};
