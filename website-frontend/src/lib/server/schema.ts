import { Global } from '$lib/models/global';
import { Events, type Event } from '$lib/models/event';
import { People, type Person } from '$lib/models/people';
import { PeopleOverview } from '$lib/models/people_overview';
import { PeopleCategories, type PeopleCategory } from '$lib/models/people_categories';
import { PeopleLaboratories, type PeopleLaboratory } from '$lib/models/people_laboratories';
import { StudentCouncil } from '$lib/models/student_council';
import { Laboratories, type Laboratory } from '$lib/models/laboratories';
import { Alumni } from '$lib/models/alumni';
import { Linkages } from '$lib/models/linkages';
import { type Schema } from '$lib/models/schema';
import {
	type RestClient,
	type Query,
	type QueryItem,
	readSingleton,
	readItems
} from '@directus/sdk';
import { parse } from 'valibot';

export async function directusGlobal(
	directus: RestClient<Schema>,
	query?: QueryItem<Schema, Global>
) {
	return parse(Global, await directus.request(readSingleton('global', query)));
}

export async function directusEvents(directus: RestClient<Schema>, query?: Query<Schema, Event>) {
	return parse(Events, await directus.request(readItems('events', query)));
}

export async function directusPeople(directus: RestClient<Schema>, query?: Query<Schema, Person>) {
	return parse(People, await directus.request(readItems('people', query)));
}

export async function directusPeopleOverview(
	directus: RestClient<Schema>,
	query?: QueryItem<Schema, PeopleOverview>
) {
	return parse(PeopleOverview, await directus.request(readSingleton('people_overview', query)));
}

export async function directusPeopleCategories(
	directus: RestClient<Schema>,
	query?: Query<Schema, PeopleCategory>
) {
	return parse(PeopleCategories, await directus.request(readItems('people_categories', query)));
}

export async function directusPeopleLaboratories(
	directus: RestClient<Schema>,
	query?: Query<Schema, PeopleLaboratory>
) {
	return parse(PeopleLaboratories, await directus.request(readItems('people_laboratories', query)));
}

export async function directusStudentCouncil(
	directus: RestClient<Schema>,
	query?: QueryItem<Schema, StudentCouncil>
) {
	return parse(StudentCouncil, await directus.request(readSingleton('student_council', query)));
}

export async function directusLaboratories(
	directus: RestClient<Schema>,
	query?: Query<Schema, Laboratory>
) {
	return parse(Laboratories, await directus.request(readItems('laboratories', query)));
}

export async function directusAlumni(
	directus: RestClient<Schema>,
	query?: QueryItem<Schema, Alumni>
) {
	return parse(Alumni, await directus.request(readSingleton('alumni', query)));
}

export async function directusLinkages(
	directus: RestClient<Schema>,
	query?: QueryItem<Schema, Linkages>
) {
	return parse(Linkages, await directus.request(readSingleton('linkages', query)));
}
