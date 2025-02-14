const elementClassMap = {
	p: 'mb-4',
	h1: 'text-4xl font-bold mb-8',
	h2: 'text-3xl font-bold mb-6',
	h3: 'text-2xl font-bold mb-4',
	strong: 'text-red-600 font-bold',
	em: 'text-green-600 italic',
	img: 'rounded-xl shadow-lg max-w-full h-auto mb-6 mx-auto',
	a: 'text-blue-600 hover:text-blue-800 underline',
	ul: 'list-disc list-inside pl-4 mb-4',
	ol: 'list-decimal list-inside pl-4 mb-4',
	li: 'mb-2',
	blockquote: 'border-l-4 border-gray-300 pl-4 italic mb-4',
	iframe: 'rounded-xl shadow-lg  mb-6 mx-auto'
};

export function enhanceWysiwygContent(htmlContent: string): string {
	// Prevent DOMParser usage during SSR by checking for browser environment
	// Return unchanged content if we're not in browser environment
	if (typeof window === 'undefined') {
		return htmlContent;
	}

	const parser = new DOMParser();
	const doc = parser.parseFromString(htmlContent, 'text/html');

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

	return doc.body.innerHTML;
}
