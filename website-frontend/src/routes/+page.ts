/** @type {import('./$types').PageLoad} */
export async function load({ data }) {
	return {
		news_limit: data.news_limit,
		news_count: data.news_count,
		news: data.news,
		featured_news: data.featured_news,
		recent_news: data.recent_news,
		recent_events: data.recent_events
	};
}
