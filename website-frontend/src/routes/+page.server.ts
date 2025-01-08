/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import { directusGlobal, directusEvents } from '$lib/server/schema';

export async function load({ fetch }) {
	const directus = await getDirectusInstance(fetch);
	const global = await directusGlobal(directus);
	const events = await directusEvents(directus, {
		sort: ['-date_created']
	});

	return {
		global: global,
		events: events
	};
}
