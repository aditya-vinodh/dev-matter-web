export async function load(event) {
	const { url } = event;

	const error = url.searchParams.get('error');

	return {
		error
	};
}
