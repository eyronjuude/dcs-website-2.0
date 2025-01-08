/** @type {import('./$types').PageServerLoad} */
import { directusPeople, directusPeopleOverview } from '$lib/server/schema';
import getDirectusInstance from '$lib/directus';

export async function load({ fetch }) {
	const directus = await getDirectusInstance(fetch);
	const people = await directusPeople(directus);
	const people_overview = await directusPeopleOverview(directus);

	return {
		people: people,
		people_overview: people_overview
	};
}
