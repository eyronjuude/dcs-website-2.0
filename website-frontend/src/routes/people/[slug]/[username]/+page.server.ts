/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import {
	directusLaboratories,
	directusPeople,
	directusPeopleLaboratories
} from '$lib/server/schema.js';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	const directus = await getDirectusInstance(fetch);
	const person = await directusPeople(directus, {
		filter: {
			username: { _eq: params.username }
		},
		limit: 1
	})
		.then((res) => res[0])
		.catch(() => {
			throw error(404, 'Person not found');
		});
	const people_laboratories = await directusPeopleLaboratories(directus, {
		filter: {
			people_id: { _eq: person.id }
		}
	}).then((res) => res.map((item) => item.laboratories_id));
	const laboratories =
		people_laboratories.length > 0
			? await directusLaboratories(directus, {
					filter: {
						id: { _in: people_laboratories }
					}
				})
			: [];

	return {
		person,
		laboratories
	};
}
