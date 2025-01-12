/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import { directusAbout } from '$lib/server/schema.js';

export async function load({ fetch }) {
	const directus = await getDirectusInstance(fetch);
	const about = await directusAbout(directus);

	return { about };
}
