<script>
	import FacebookIcon from '$lib/assets/FacebookIcon.svelte';

	export let address;
	export let contact_number;
	export let contact_email;
	export let quick_links;
	export let facebook_link;
</script>

<div class="flex justify-center text-primary-foreground">
	<div
		class="flex w-full flex-col space-y-10 pb-5 pt-10 text-[16px] md:flex-row md:items-baseline md:space-x-24 md:space-y-0 md:pb-8 md:pl-1"
	>
		<div>
			<p class="pb-5 text-xl font-bold">Department of Computer Science</p>
			{#each address as { address_line }}
				<p>{address_line}</p>
			{/each}
			<p>
				{contact_number} |
				<a href="mailto:{contact_email}" class="transition-colors duration-300 hover:text-gray-300"
					>{contact_email}</a
				>
			</p>
		</div>
		<div>
			<p class="pb-5 text-xl font-bold">Quick Links</p>
			{#each quick_links as { name, link }}
				<a href={link} class="transition-colors duration-300 hover:text-gray-300">{name}</a>
				<br />
			{/each}
		</div>
		<div>
			<p class="pb-5 text-xl font-bold">Follow Us On</p>
			<div class="flex items-center">
				<a
					href={facebook_link}
					target="_blank"
					rel="noopener noreferrer"
					class="mr-3 h-10 pb-[2px] transition-colors duration-300 hover:text-gray-300"
				>
					<FacebookIcon />
				</a>
			</div>
		</div>
	</div>
</div>
<div class="flex justify-center bg-background-dark text-gray-300">
	<p class="my-6 text-sm">&copy; 2024 UP Department of Computer Science</p>
</div>
