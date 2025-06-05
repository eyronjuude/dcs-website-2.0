import { parse } from 'node-html-parser';
import sanitize from 'sanitize-html';
import { transform } from 'valibot';

const elementClassMap = {
	strong: 'font-bold',
	em: 'italic',
	img: 'rounded-xl shadow-lg max-w-full h-auto mx-auto',
	a: 'text-blue-600 hover:text-blue-800 underline',
	ul: 'list-disc',
	ol: 'list-decimal',
	blockquote: 'border-l-4 border-gray-300 italic',
	iframe: 'rounded-xl shadow-lg mx-auto',
	hr: 'my-8',
	th: 'p-2 text-center',
	td: 'p-2'
};

// TODO: Add dark mode implementation
function enhanceWysiwygContent(htmlContent: string, inverted?: boolean): string {
	const doc = parse(htmlContent);

	Object.entries(elementClassMap).forEach(([tag, className]) => {
		const elements = doc.getElementsByTagName(tag);
		Array.from(elements).forEach((element) => {
			const existingClasses = element.getAttribute('class');
			element.setAttribute(
				'class',
				existingClasses ? `${existingClasses} ${className}` : className
			);
		});
	});

	if (inverted) {
		const elements = doc.querySelectorAll('*');
		elements
			.filter((element) => ['img', 'iframe'].includes(element.localName))
			.forEach((element) => element.classList.add('invert'));
	}

	return doc.innerHTML;
}

// TODO: Add explicit filtering for allowed HTML tags and attributes
export const cleanHtml = transform((input: string) =>
	enhanceWysiwygContent(
		sanitize(input, {
			allowedTags: sanitize.defaults.allowedTags.concat(['img', 'iframe'])
		})
	)
);

export const cleanHtmlDark = transform((input: string) =>
	enhanceWysiwygContent(
		sanitize(input, {
			allowedTags: sanitize.defaults.allowedTags.concat(['img', 'iframe'])
		}),
		true
	)
);
