/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import { directusEvents } from '$lib/server/schema';

export async function load({ fetch }) {
	const directus = await getDirectusInstance(fetch);
	const events = await directusEvents(directus, {
		sort: ['-date_created']
	});

	return {
		events: events
	};
}
