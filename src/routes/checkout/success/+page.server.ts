export const load = async (event) => {
	const parentData = await event.parent();
	return {
		...parentData
	};
};
