/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import { directusAboutPages } from '$lib/server/schema.js';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	const directus = await getDirectusInstance(fetch);
	const about_page = await directusAboutPages(directus, {
		filter: {
			slug: {
				_eq: params.slug
			}
		}
	})
		.then((res) => res[0])
		.catch(() => {
			throw error(404, 'Page not found');
		});

	return { about_page };
}
