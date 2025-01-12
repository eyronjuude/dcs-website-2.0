import { cleanHtml } from '$lib/models-helpers';
import { array, object, pipe, string, type InferOutput } from 'valibot';

export const AboutPage = object({
	title: string(),
	slug: string(),
	flexible_content: pipe(string(), cleanHtml)
});

export const AboutPages = array(AboutPage);

export type AboutPage = InferOutput<typeof AboutPage>;
export type AboutPages = InferOutput<typeof AboutPages>;