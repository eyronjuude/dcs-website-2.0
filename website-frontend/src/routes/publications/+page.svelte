<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banner/Banner.svelte';
	import LoadMore from '$lib/components/load_more/LoadMore.svelte';
	import { PUBLIC_APIURL } from '$env/static/public';

	export let data;
	const { publications } = data;

	const inc = 12;
	let shown = inc;

	let sortMethod: 'date' | 'author' = 'date';

	$: sortedPublications = [...publications].sort((a, b) => {
		if (sortMethod === 'author') {
			const aLastName = a.authors[0]?.last_name || '';
			const bLastName = b.authors[0]?.last_name || '';
			return aLastName.localeCompare(bLastName);
		} else {
			return (b.publish_date ?? '1970-01-01').localeCompare(a.publish_date ?? '1970-01-01');
		}
	});

	$: publicationsList = sortedPublications?.slice(0, shown);
</script>

<body>
	<div class="relative z-0">
		<Banner title="Publications" />
	</div>

	<div class="mx-auto my-4 flex justify-center gap-4">
		<button
			class="rounded px-4 py-2 {sortMethod === 'date' ? 'bg-blue-600 text-white' : 'bg-gray-200'}"
			on:click={() => (sortMethod = 'date')}
		>
			Sort by Date
		</button>
		<button
			class="rounded px-4 py-2 {sortMethod === 'author' ? 'bg-blue-600 text-white' : 'bg-gray-200'}"
			on:click={() => (sortMethod = 'author')}
		>
			Sort by Author
		</button>
	</div>

	<div
		class="mx-auto my-3 grid
        max-w-[94vw] grid-cols-2 gap-2 pb-20
        md:my-8 md:max-w-[80vw] md:grid-cols-4 md:gap-4"
	>
		{#each publicationsList as publication}
			<a href="/publications/{publication.id}">
				<img
					src="{PUBLIC_APIURL}/assets/{publication.hero_image}"
					alt={publication.title}
					class="h-48 w-full rounded-lg object-cover"
				/>
				<p>{publication.title}</p>
				<p>{publication.publication_tag}</p>
				{#each publication.authors as author}
					<p>{author.last_name}, {author.first_name}</p>
				{/each}
			</a>
		{/each}
	</div>
	{#if shown < publications.length}
		<div class="flex items-center justify-center">
			<LoadMore {inc} bind:shown />
		</div>
	{/if}
</body>
