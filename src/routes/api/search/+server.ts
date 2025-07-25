import { OPENWEATHER_API_KEY } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';
import { error, isHttpError, json } from '@sveltejs/kit';

interface SearchRequest {
	query: string;
}

export const POST: RequestHandler = async ({ request }) => {
	const SEARCH_API_URL = 'http://api.openweathermap.org/geo/1.0/direct';

	const params = new URLSearchParams({
		appid: OPENWEATHER_API_KEY,
		limit: '5'
	});

	try {
		const body = (await request.json()) as SearchRequest;

		if (body.query) {
			params.set('q', body.query.trim().replace(/\s+/g, ' '));
		}

		const response = await fetch(`${SEARCH_API_URL}?${params}`);

		if (!response.ok) {
			const errorData = await response.json().catch(() => null);
			throw error(response.status, errorData?.message || 'Failed to fetch weather data');
		}

		const data = await response.json();
		return json(data);
	} catch (error) {
		if (isHttpError(error)) {
			throw error;
		}
		throw error;
	}
};
