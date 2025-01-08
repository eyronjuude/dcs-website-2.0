/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import { directusLaboratories } from '$lib/server/schema.js';

export async function load({ fetch }) {
	const directus = await getDirectusInstance(fetch);
	const laboratories = await directusLaboratories(directus);

	return { laboratories };
}
