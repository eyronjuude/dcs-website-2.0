/** @type {import('./$types').LayoutServerLoad} */
import getDirectusInstance from '$lib/directus';
import { directusGlobal } from '$lib/server/schema';

export async function load({ fetch }) {
	const directus = await getDirectusInstance(fetch);
	const global = await directusGlobal(directus);

	return { global };
}
