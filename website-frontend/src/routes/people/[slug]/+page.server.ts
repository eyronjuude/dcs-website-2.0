/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import { directusPeople, directusPeopleCategories } from '$lib/server/schema.js';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	const directus = await getDirectusInstance(fetch);
	const category = await directusPeopleCategories(directus, {
		filter: {
			title: {
				_eq: params.slug
			}
		}
	})
		.then((res) => res[0])
		.catch(() => {
			throw error(404, 'Category not found');
		});

	const people = await directusPeople(directus, {
		filter: {
			category: {
				_eq: category.title
			}
		}
	});

	return {
		category,
		people
	};
}
