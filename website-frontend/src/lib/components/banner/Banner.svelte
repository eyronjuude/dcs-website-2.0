<script lang="ts">
	import { deslugify } from '$lib/utils';
	import { PUBLIC_APIURL } from '$env/static/public';

	export let title: string;
	export let background_image: string = '';
	export let flexible_content: string;
	export let from_bottom: number = NaN;

	$: text_bottom = from_bottom;

	$: if (from_bottom !== from_bottom) {
		text_bottom = ((flexible_content) ? 24 : 9);
	}

	$: height = ((flexible_content) ? 45 : 40);
	$: max_height = ((flexible_content) ? 60 : 50);
	$: font_size = ((flexible_content) ? 4 : 5);

	$: deslugify_title = deslugify(title);
</script>

<div class="relative z-0">
	<div
		class="h-[{height}vh] bg-cover bg-center md:h-[{max_height}vh]"
		style="background-image: linear-gradient(to top, hsl(var(--primary)), transparent), url('{PUBLIC_APIURL}/assets/{background_image}')"
	></div>

	<div
		class="absolute bottom-{text_bottom} left-1/2
        -translate-x-1/2 transform text-center text-primary-foreground
        md:left-0 md:max-w-[60vw] md:translate-x-0 md:px-32 md:text-start"
	>
		<h1 class="text-3xl font-bold md:text-{font_size}xl">{deslugify_title}</h1>
		{#if flexible_content}
			<h4 class="hidden text-muted md:block md:mt-4">{@html flexible_content}</h4>
		{/if}
	</div>
</div>
